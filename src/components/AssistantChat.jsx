import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, X, Send, ImagePlus, Check, SkipForward } from 'lucide-react';

// Downscale an uploaded photo to a small square data URL so it fits in localStorage.
const readPhotoAsDataUrl = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const size = 256;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        const minSide = Math.min(img.width, img.height);
        const sx = (img.width - minSide) / 2;
        const sy = (img.height - minSide) / 2;
        ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = () => resolve(reader.result);
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

export const AssistantChat = ({
  isOpen,
  onClose,
  role = 'candidate',
  profile = {},
  startAt = null,
  onSave,
  onSkip,
  t
}) => {
  const isEmployer = role === 'employer';

  const stepDefs = [
    {
      key: 'name',
      label: isEmployer ? 'Your Name' : 'Full Name',
      question: isEmployer
        ? "Let's set up your company profile. What's your name (HR / recruiter contact)?"
        : "First, what's your full name?",
      placeholder: isEmployer ? 'e.g. Rajesh Patil' : 'e.g. Ganesh Tukaram Shinde'
    },
    {
      key: 'organization',
      label: 'Organization',
      question: isEmployer
        ? 'Great. What is your organization / company name?'
        : 'Which organization, company or college are you associated with?',
      placeholder: isEmployer ? 'e.g. Swaraj Tech Enterprises' : 'e.g. TaskBoard X Technologies'
    },
    {
      key: 'projects',
      label: 'Project / Work Experience',
      question: isEmployer
        ? 'Tell me about your main projects, products or hiring areas.'
        : 'Describe your project or work experience in a line or two.',
      placeholder: 'e.g. Built an agile task board used by 4 teams',
      multiline: true
    },
    {
      key: 'education',
      label: 'Education',
      question: 'What is your education or highest qualification?',
      placeholder: 'e.g. BE / B.Tech Civil'
    },
    {
      key: 'skills',
      label: 'Skills',
      question: "List your key skills, separated by commas. I'll turn them into verified skill tags.",
      placeholder: 'e.g. React, Node.js, MongoDB'
    },
    {
      key: 'photo',
      label: 'Profile Photo',
      question: 'Finally, add a profile picture so employers can recognise you.',
      type: 'photo'
    }
  ];

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const scrollRef = useRef(null);
  const fileRef = useRef(null);

  const greeting = () => {
    const who = isEmployer ? 'company' : 'job-seeker';
    return `Hi! I'm Reels AI, your JobReels assistant. Let's set up your ${who} profile in a few quick questions. You can answer, or tap Skip to do it later with the edit pencil.`;
  };

  // Kick off a fresh conversation whenever the assistant opens.
  useEffect(() => {
    if (!isOpen) return;
    const startIdx = startAt ? Math.max(0, stepDefs.findIndex((s) => s.key === startAt)) : 0;

    setAnswers({
      name: (isEmployer ? profile.hrName || profile.name : profile.name) || '',
      organization: profile.organization || profile.companyName || '',
      projects: profile.projectExperience || '',
      education: profile.education || '',
      skills: (profile.skills || []).join(', '),
      photo: profile.avatar || ''
    });
    setStepIndex(startIdx);
    setIsFinished(false);
    setInput('');
    setMessages([
      { id: 'greet', from: 'ai', text: greeting() },
      { id: `q-${stepDefs[startIdx].key}`, from: 'ai', text: stepDefs[startIdx].question }
    ]);
  }, [isOpen, startAt]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isOpen) return null;

  const currentStep = stepDefs[stepIndex];

  const finish = (finalAnswers) => {
    setIsFinished(true);
    const skills = (finalAnswers.skills || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    setMessages((prev) => [
      ...prev,
      {
        id: 'done',
        from: 'ai',
        text: "Perfect, I've saved your details. You can edit any of it anytime with the pencil icon on your profile."
      }
    ]);
    setTimeout(() => {
      onSave?.({
        name: finalAnswers.name?.trim() || undefined,
        organization: finalAnswers.organization?.trim() || undefined,
        projectExperience: finalAnswers.projects?.trim() || undefined,
        education: finalAnswers.education?.trim() || undefined,
        skills: skills.length ? skills : undefined,
        avatar: finalAnswers.photo?.startsWith('data:') ? finalAnswers.photo : undefined
      });
      onClose?.();
    }, 700);
  };

  const goToNext = (updatedAnswers) => {
    const nextIndex = stepIndex + 1;
    if (nextIndex >= stepDefs.length) {
      finish(updatedAnswers);
      return;
    }
    setStepIndex(nextIndex);
    setMessages((prev) => [
      ...prev,
      { id: `q-${stepDefs[nextIndex].key}`, from: 'ai', text: stepDefs[nextIndex].question }
    ]);
  };

  const submitText = (e) => {
    e?.preventDefault();
    if (isFinished) return;
    const value = input.trim();
    if (!value) return;
    const updated = { ...answers, [currentStep.key]: value };
    setAnswers(updated);
    setMessages((prev) => [...prev, { id: `me-${Date.now()}`, from: 'me', text: value }]);
    setInput('');
    setTimeout(() => goToNext(updated), 350);
  };

  const skipQuestion = () => {
    if (isFinished) return;
    setMessages((prev) => [...prev, { id: `skip-${Date.now()}`, from: 'me', text: 'Skip this' }]);
    setTimeout(() => goToNext(answers), 250);
  };

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await readPhotoAsDataUrl(file);
    const updated = { ...answers, photo: dataUrl };
    setAnswers(updated);
    setMessages((prev) => [...prev, { id: `me-photo-${Date.now()}`, from: 'me', text: '📷 Profile photo added' }]);
    setTimeout(() => goToNext(updated), 350);
  };

  const progress = Math.round(((stepIndex + (isFinished ? 1 : 0)) / stepDefs.length) * 100);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-in fade-in">
      <div className="w-full max-w-md bg-zinc-950 border-t sm:border border-zinc-800 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[88vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2.5 p-4 pb-3 border-b border-zinc-800">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center border-t border-white/30 shadow-lg shadow-purple-900/40 shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white leading-none">Reels AI Assistant</h3>
            <p className="text-[11px] text-purple-300 font-medium mt-0.5">
              Profile setup • {isFinished ? 'Done' : `Question ${stepIndex + 1} of ${stepDefs.length}`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSkip?.()}
            className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-[11px] font-semibold cursor-pointer active:scale-95"
          >
            Skip setup
          </button>
          <button
            type="button"
            onClick={() => onClose?.()}
            className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer active:scale-90 shrink-0"
            aria-label="Close assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress */}
        <div className="h-1 bg-zinc-900">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] px-3.5 py-2.5 text-xs leading-relaxed rounded-2xl ${
                  m.from === 'me'
                    ? 'box-inset-3d text-zinc-100 rounded-br-sm'
                    : 'bg-purple-600/15 border border-purple-500/30 text-purple-50 rounded-bl-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input row / Photo step */}
        <div className="p-3.5 pt-3 border-t border-zinc-800">
          {isFinished ? (
            <div className="flex items-center justify-center gap-2 py-1.5 text-emerald-400 text-xs font-semibold">
              <Check className="w-4 h-4" />
              <span>Profile updated</span>
            </div>
          ) : currentStep.type === 'photo' ? (
            <div className="flex items-center gap-2">
              {answers.photo && (
                <img
                  src={answers.photo}
                  alt="Preview"
                  className="w-11 h-11 rounded-xl object-cover border border-purple-500/40 shrink-0"
                />
              )}
              <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex-1 btn-3d py-2.5 rounded-xl text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ImagePlus className="w-4 h-4" />
                <span>Upload Profile Picture</span>
              </button>
              <button
                type="button"
                onClick={skipQuestion}
                className="px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>Skip</span>
              </button>
            </div>
          ) : (
            <form onSubmit={submitText} className="flex items-end gap-2">
              <div className="flex-1 input-3d rounded-xl px-3 py-2">
                {currentStep.multiline ? (
                  <textarea
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={currentStep.placeholder}
                    className="w-full bg-transparent text-xs text-white placeholder-zinc-500 outline-none resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={currentStep.placeholder}
                    className="w-full bg-transparent text-xs text-white placeholder-zinc-500 outline-none"
                  />
                )}
              </div>
              <button
                type="button"
                onClick={skipQuestion}
                className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white cursor-pointer active:scale-95 shrink-0"
                title="Skip this question"
              >
                <SkipForward className="w-4 h-4" />
              </button>
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 rounded-xl btn-purple disabled:opacity-40 cursor-pointer active:scale-95 shrink-0"
                title="Send answer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
          {!isFinished && (
            <p className="text-[10px] text-zinc-500 mt-2 text-center">
              You can skip any question and fill it later with the edit pencil on your profile.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssistantChat;
