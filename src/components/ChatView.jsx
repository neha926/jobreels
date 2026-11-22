import React, { useState } from 'react';
import { 
  Send, MapPin, Calendar, Clock, User, Phone, CheckCircle, 
  ExternalLink, Sparkles, Paperclip, Briefcase 
} from 'lucide-react';

const initialSeekerChats = {
  'seeker-1': {
    id: 'seeker-1',
    name: 'Neha Pawar',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    phone: '+91 72762 93084',
    jobTitle: 'Frontend React & Web Developer',
    messages: [
      {
        id: 'msg-np-1',
        sender: 'candidate',
        senderName: 'Neha Pawar',
        text: 'Namaste! I submitted my application for the Frontend Developer opening and uploaded my interactive skill reel.',
        time: '10:15 AM',
        type: 'text'
      },
      {
        id: 'msg-np-2',
        sender: 'employer',
        senderName: 'Hiring Team',
        text: 'Namaste Neha! We reviewed your video reel and resume on JobReels. Your frontend demo is very impressive.',
        time: '10:18 AM',
        type: 'text'
      },
      {
        id: 'msg-np-3',
        sender: 'employer',
        senderName: 'Hiring Team',
        text: 'We would like to invite you for an in-person practical trial and interview:',
        time: '10:20 AM',
        type: 'interview_card',
        interviewData: {
          role: 'Frontend React & Web Developer',
          company: 'TechNova Solutions Ltd.',
          date: 'Monday, 24 Nov 2026',
          time: '11:30 AM',
          address: 'Tech Hub Tower B, Hinjewadi Phase 1, Pune',
          mapsUrl: 'https://maps.google.com/?q=Hinjewadi+Phase+1+Pune',
          contactPerson: 'HR Team (+91 72762 93084)'
        }
      },
      {
        id: 'msg-np-4',
        sender: 'candidate',
        senderName: 'Neha Pawar',
        text: 'Thank you so much! I have confirmed the schedule and will attend on Monday at 11:30 AM.',
        time: '10:25 AM',
        type: 'text'
      }
    ]
  },
  'seeker-2': {
    id: 'seeker-2',
    name: 'Ganesh Shinde',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    phone: '+91 98221 54321',
    jobTitle: 'Full Stack Node & React Developer',
    messages: [
      {
        id: 'msg-gs-1',
        sender: 'candidate',
        senderName: 'Ganesh Shinde',
        text: 'Hello HR Team, I have 2.5 years of experience in Node.js, Express, and React. Can we discuss the opening?',
        time: 'Yesterday',
        type: 'text'
      },
      {
        id: 'msg-gs-2',
        sender: 'employer',
        senderName: 'Hiring Team',
        text: 'Hello Ganesh, what is your official notice period and current location?',
        time: 'Yesterday',
        type: 'text'
      },
      {
        id: 'msg-gs-3',
        sender: 'candidate',
        senderName: 'Ganesh Shinde',
        text: 'I am based in Kothrud, Pune and have an immediate joining notice period of 15 days.',
        time: 'Yesterday',
        type: 'text'
      }
    ]
  },
  'seeker-3': {
    id: 'seeker-3',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    phone: '+91 99234 11223',
    jobTitle: 'UI/UX & Mobile App Designer',
    messages: [
      {
        id: 'msg-ps-1',
        sender: 'candidate',
        senderName: 'Priya Sharma',
        text: 'Hi HR Team, I applied for the UI/UX Designer role and shared my Figma prototype reel.',
        time: '2 days ago',
        type: 'text'
      },
      {
        id: 'msg-ps-2',
        sender: 'employer',
        senderName: 'Hiring Team',
        text: 'Hi Priya, your mobile flow prototypes look very polished! Our design lead will review it today.',
        time: '2 days ago',
        type: 'text'
      }
    ]
  }
};

export const ChatView = ({ 
  messages, 
  onSendMessage, 
  currentRole = 'candidate', 
  userProfile, 
  t 
}) => {
  const isEmployer = currentRole === 'employer';
  const [activeSeekerId, setActiveSeekerId] = useState('seeker-1');
  const [seekerChats, setSeekerChats] = useState(initialSeekerChats);
  const [inputText, setInputText] = useState('');

  const activeSeeker = seekerChats[activeSeekerId] || seekerChats['seeker-1'];

  // Current message feed: if employer, use the selected job seeker's conversation
  const activeMessages = isEmployer ? activeSeeker.messages : messages;

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: isEmployer ? 'employer' : 'candidate',
      senderName: isEmployer ? (userProfile?.companyName || 'Hiring Team') : (userProfile?.name || 'Neha Pawar'),
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    if (isEmployer) {
      setSeekerChats((prev) => ({
        ...prev,
        [activeSeekerId]: {
          ...prev[activeSeekerId],
          messages: [...prev[activeSeekerId].messages, newMsg]
        }
      }));
    } else {
      onSendMessage(inputText.trim());
    }

    setInputText('');
  };

  const handleQuickMessage = (text) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: isEmployer ? 'employer' : 'candidate',
      senderName: isEmployer ? (userProfile?.companyName || 'Hiring Team') : (userProfile?.name || 'Neha Pawar'),
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    if (isEmployer) {
      setSeekerChats((prev) => ({
        ...prev,
        [activeSeekerId]: {
          ...prev[activeSeekerId],
          messages: [...prev[activeSeekerId].messages, newMsg]
        }
      }));
    } else {
      onSendMessage(text);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-h-[820px] max-w-md mx-auto bg-zinc-950 border-x border-zinc-800">
      {/* Chat Contact Header */}
      <div className="bg-zinc-900 p-3.5 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative shrink-0">
            <img
              src={
                isEmployer
                  ? activeSeeker.avatar
                  : 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80'
              }
              alt={isEmployer ? activeSeeker.name : 'HR'}
              className="w-10 h-10 rounded-full object-cover border border-purple-400"
            />
            {/* Semantic Green Dot for Online */}
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full absolute bottom-0 right-0 border-2 border-zinc-950"></span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-sm text-white truncate">
                {isEmployer
                  ? `${activeSeeker.name} (Job Seeker)`
                  : 'Anand Kulkarni (Senior HR)'}
              </h3>
              <CheckCircle className="w-3.5 h-3.5 text-purple-400 fill-purple-500 text-white shrink-0" />
            </div>
            <p className="text-xs text-zinc-400 font-normal truncate">
              {isEmployer
                ? `${activeSeeker.jobTitle} • Online`
                : 'Bharat Forge Precision Ltd. • Online'}
            </p>
          </div>
        </div>

        <a
          href={`tel:${isEmployer ? activeSeeker.phone : '+919822011223'}`}
          className="p-2 rounded-xl bg-zinc-800 text-purple-300 hover:text-white border border-zinc-700 active:scale-95 active:shadow-md active:shadow-purple-500/30 transition-all cursor-pointer shrink-0 ml-2"
          title={isEmployer ? `Call ${activeSeeker.name}` : 'Direct Call HR'}
        >
          <Phone className="w-4 h-4" />
        </a>
      </div>

      {/* HR View: List of Job Seekers / Applicants */}
      {isEmployer && (
        <div className="bg-zinc-900/90 border-b border-zinc-800 px-3 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-medium text-zinc-400 shrink-0">
            Job Seekers:
          </span>
          {Object.values(seekerChats).map((seeker) => {
            const isSelected = activeSeekerId === seeker.id;
            return (
              <button
                key={seeker.id}
                type="button"
                onClick={() => setActiveSeekerId(seeker.id)}
                className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-750'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>{seeker.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar bg-zinc-950/60">
        {activeMessages.map((msg) => {
          // In Employer view, messages from "employer" are mine (right side); from "candidate" are received (left side)
          // In Candidate view, messages from "candidate" are mine (right side); from "employer" are received (left side)
          const isMine = isEmployer ? msg.sender === 'employer' : msg.sender === 'candidate';

          if (msg.type === 'interview_card') {
            const iv = msg.interviewData;
            return (
              <div key={msg.id} className="max-w-[92%] mx-auto my-2">
                <div className="bg-gradient-to-br from-purple-950 via-zinc-900 to-zinc-950 border border-purple-700/60 rounded-2xl p-4 shadow-xl">
                  {/* Interview Header */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-700/30">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <h4 className="font-semibold text-xs text-purple-300 uppercase tracking-wider">
                        {t?.interviewInvite || 'Interview Invitation'}
                      </h4>
                    </div>
                    <span className="text-xs text-zinc-500">{msg.time}</span>
                  </div>

                  <p className="text-xs text-zinc-200 font-normal mb-3">
                    {iv.company} has scheduled practical trial & interview:
                  </p>

                  <div className="space-y-1.5 text-xs text-zinc-300 bg-zinc-950/80 p-3 rounded-xl border border-zinc-800 mb-3 font-normal">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-300 shrink-0" />
                      <span>Date: <strong className="text-white font-medium">{iv.date}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Time: <strong className="text-white font-medium">{iv.time}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-indigo-300 shrink-0" />
                      <span>Contact: <strong className="text-white font-medium">{iv.contactPerson}</strong></span>
                    </div>
                    <div className="flex items-start gap-2 pt-1 border-t border-zinc-800">
                      <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span className="text-xs leading-tight text-zinc-300">{iv.address}</span>
                    </div>
                  </div>

                  <a
                    href={iv.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full btn-purple text-xs font-medium py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{t?.openMaps || 'Open in Maps'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs shadow-sm leading-relaxed font-normal ${
                  isMine
                    ? 'bg-purple-600 text-white rounded-br-none shadow-md shadow-purple-950/50'
                    : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-bl-none'
                }`}
              >
                {!isMine && (
                  <span className="block text-xs font-medium text-purple-300 mb-0.5">
                    {msg.senderName}
                  </span>
                )}
                {msg.text}
              </div>
              <span className="text-[10px] text-zinc-500 mt-1 px-1 font-normal">{msg.time}</span>
            </div>
          );
        })}
      </div>

      {/* Quick Messages Bar */}
      <div className="px-3 py-2 bg-zinc-950/95 border-t border-zinc-800">
        <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Quick Messages:</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {isEmployer ? (
            <>
              <button
                type="button"
                onClick={() => handleQuickMessage('We reviewed your application and would like to schedule an interview.')}
                className="shrink-0 px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-850 border border-zinc-750 text-white text-xs font-normal flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-xs"
              >
                <span>💬</span>
                <span>We reviewed your application & reel.</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickMessage('When are you available for a practical skill trial?')}
                className="shrink-0 px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-850 border border-zinc-750 text-white text-xs font-normal flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-xs"
              >
                <span>💬</span>
                <span>When are you available for interview trial?</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickMessage('Please confirm your expected salary and joining date.')}
                className="shrink-0 px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-850 border border-zinc-750 text-white text-xs font-normal flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-xs"
              >
                <span>💬</span>
                <span>Please confirm expected salary & joining date.</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleQuickMessage('Hello, I am interested in this position.')}
                className="shrink-0 px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-850 border border-zinc-750 text-white text-xs font-normal flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-xs"
              >
                <span>💬</span>
                <span>Hello, I am interested in this position.</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickMessage('I have confirmed the schedule')}
                className="shrink-0 px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-850 border border-zinc-750 text-white text-xs font-normal flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-xs"
              >
                <span>💬</span>
                <span>I have confirmed the schedule</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSend} className="p-3 bg-zinc-900 flex items-center gap-2 border-t border-zinc-800 mb-14">
        <button
          type="button"
          className="p-2 text-zinc-400 hover:text-white rounded-xl bg-zinc-850 border border-zinc-800 active:scale-95 transition cursor-pointer"
          title="Attach certificate or document"
        >
          <Paperclip className="w-4 h-4" />
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isEmployer ? 'Type message to job seeker...' : 'Type message to HR...'}
          className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40 transition font-normal"
        />
        <button
          type="submit"
          className="btn-purple p-2.5 rounded-xl cursor-pointer"
          title="Send Message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
