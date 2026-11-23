import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Mic, MicOff, X, Volume2 } from 'lucide-react';
import { answerSwabiee, detectSpeechLanguage } from '../../lib/aiChat';

const AnimeCharacter3D = lazy(() => import('./AnimeCharacter3D'));
const AvatarFallback = ({ className = '' }) => (
  <div className={`flex items-center justify-center bg-gradient-to-br from-sky-200 via-indigo-200 to-purple-300 ${className}`}>
    <span className="text-3xl drop-shadow-md" aria-hidden="true">👩🏻‍💻</span>
  </div>
);

const STRINGS = {
  mr: {
    idle: 'माइक दाबा आणि मला विचारा',
    listening: 'ऐकतेय... बोला!',
    thinking: 'थांबा, माहिती पाहतेय...',
    speaking: 'स्वाबी बोलतेय...',
    unsupported: 'या browser मध्ये voice input उपलब्ध नाही.',
    denied: 'माइकची परवानगी द्या आणि पुन्हा प्रयत्न करा.',
    retry: 'पुन्हा बोलण्यासाठी माइक दाबा',
    open: 'स्वाबीशी बोला',
    close: 'स्वाबी बंद करा',
    stop: 'ऐकणं थांबवा',
    listen: 'बोलण्यासाठी माइक दाबा',
    voice: 'Voice सहाय्यक • मदत हवी असेल तर माइक दाबा'
  },
  hi: {
    idle: 'माइक दबाएँ और पूछें',
    listening: 'सुन रही हूँ... बोलिए!',
    thinking: 'एक पल, जानकारी देख रही हूँ...',
    speaking: 'स्वाबी बोल रही है...',
    unsupported: 'इस browser में voice input उपलब्ध नहीं है।',
    denied: 'माइक की अनुमति दें और फिर कोशिश करें।',
    retry: 'फिर बोलने के लिए माइक दबाएँ',
    open: 'स्वाबी से बात करें',
    close: 'स्वाबी बंद करें',
    stop: 'सुनना बंद करें',
    listen: 'बोलने के लिए माइक दबाएँ',
    voice: 'Voice assistant • मदत चाहिए तो माइक दबाएँ'
  },
  en: {
    idle: 'Tap the mic and ask me',
    listening: "I'm listening... go ahead!",
    thinking: 'One moment, checking the app...',
    speaking: 'Swabiee is speaking...',
    unsupported: 'Voice input is not available in this browser.',
    denied: 'Allow microphone access, then try again.',
    retry: 'Tap the mic to speak again',
    open: 'Talk to Swabiee',
    close: 'Close Swabiee',
    stop: 'Stop listening',
    listen: 'Tap the mic to speak',
    voice: 'Voice guide • tap the mic whenever you need help'
  }
};

const speechLocale = { mr: 'mr-IN', hi: 'hi-IN', en: 'en-IN' };

export const AIAssistant = ({
  isOpen,
  onClose,
  language = 'mr',
  context = {},
  onNavigate
}) => {
  const [state, setState] = useState('idle');
  const [activeLanguage, setActiveLanguage] = useState(language);
  const [spokenText, setSpokenText] = useState('');
  const recognitionRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const chunkIndexRef = useRef(0);

  const ui = STRINGS[language] || STRINGS.mr;
  const speechUi = STRINGS[activeLanguage] || ui;
  const SpeechRecognition =
    typeof window !== 'undefined' &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  useEffect(() => {
    setActiveLanguage(language);
  }, [language]);

  const stopResumeTimer = () => {
    if (resumeTimerRef.current) {
      clearInterval(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  const minimize = () => {
    recognitionRef.current?.abort();
    stopResumeTimer();
    window.speechSynthesis?.cancel();
    setSpokenText('');
    setState('idle');
    onClose?.();
  };

  useEffect(() => {
    if (isOpen) return undefined;
    recognitionRef.current?.abort();
    stopResumeTimer();
    window.speechSynthesis?.cancel();
    setSpokenText('');
    setState('idle');
    return undefined;
  }, [isOpen]);

  useEffect(() => () => {
    recognitionRef.current?.abort();
    stopResumeTimer();
    window.speechSynthesis?.cancel();
  }, []);

  // Split text into short sentence chunks so browsers don't cut it off.
  const chunkText = (text) => {
    const cleaned = String(text || '').replace(/\s+/g, ' ').trim();
    if (!cleaned) return [];
    const sentences = cleaned.split(/(?<=[.!?।॥])\s+/);
    const chunks = [];
    let buffer = '';
    for (const sentence of sentences) {
      if ((buffer + ' ' + sentence).length > 120) {
        if (buffer) chunks.push(buffer.trim());
        buffer = sentence;
      } else {
        buffer = (buffer ? buffer + ' ' : '') + sentence;
      }
    }
    if (buffer) chunks.push(buffer.trim());
    return chunks.length ? chunks : [cleaned];
  };

  const speak = (text, voiceLanguage) => {
    const synthesis = window.speechSynthesis;
    if (!synthesis || typeof window.SpeechSynthesisUtterance === 'undefined') {
      setState('idle');
      return;
    }

    stopResumeTimer();
    synthesis.cancel();
    setSpokenText(text);

    const chunks = chunkText(text);
    chunkIndexRef.current = 0;
    const locale = speechLocale[voiceLanguage] || speechLocale.mr;

    const speakNextChunk = () => {
      if (chunkIndexRef.current >= chunks.length) {
        stopResumeTimer();
        setState('idle');
        return;
      }
      const chunk = chunks[chunkIndexRef.current];
      const utterance = new window.SpeechSynthesisUtterance(chunk);
      utterance.lang = locale;
      utterance.rate = 1.02;
      utterance.pitch = 1.08;

      const voices = synthesis.getVoices();
      const voice = voices.find((item) => item.lang.toLowerCase().startsWith(voiceLanguage))
        || voices.find((item) => item.lang.toLowerCase().startsWith(locale.split('-')[0]));
      if (voice) utterance.voice = voice;

      utterance.onstart = () => setState('speaking');
      utterance.onend = () => {
        chunkIndexRef.current += 1;
        speakNextChunk();
      };
      utterance.onerror = (e) => {
        if (e.error === 'interrupted' || e.error === 'canceled') return;
        chunkIndexRef.current += 1;
        speakNextChunk();
      };
      synthesis.speak(utterance);
    };

    // Chrome workaround: periodically resume to prevent mid-speech cut-off.
    resumeTimerRef.current = setInterval(() => {
      if (synthesis.speaking && !synthesis.paused) {
        synthesis.pause();
        synthesis.resume();
      }
    }, 8000);

    speakNextChunk();
  };

  const answerQuestion = (question) => {
    const detectedLanguage = detectSpeechLanguage(question, language);
    setActiveLanguage(detectedLanguage);
    setState('thinking');
    const result = answerSwabiee(question, { ...context, language: detectedLanguage });
    if (result.action) onNavigate?.(result.action);
    speak(result.text, detectedLanguage);
  };

  const startListening = () => {
    if (!SpeechRecognition) {
      setState('unsupported');
      return;
    }

    window.speechSynthesis?.cancel();
    const recognition = new SpeechRecognition();
    recognition.lang = speechLocale[language] || speechLocale.mr;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setState('listening');
    recognition.onresult = (event) => {
      const question = event.results?.[0]?.[0]?.transcript?.trim();
      if (question) answerQuestion(question);
      else setState('idle');
    };
    recognition.onerror = (event) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setState('denied');
      } else if (event.error !== 'aborted' && event.error !== 'no-speech') {
        setState('unsupported');
      } else {
        setState('idle');
      }
    };
    recognition.onend = () => {
      recognitionRef.current = null;
      setState((current) => current === 'listening' ? 'idle' : current);
    };
    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setState('unsupported');
    }
  };

  const statusText = {
    idle: ui.idle,
    listening: speechUi.listening,
    thinking: speechUi.thinking,
    speaking: speechUi.speaking,
    unsupported: ui.unsupported,
    denied: ui.denied
  }[state] || ui.retry;

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => {
          setState('idle');
          onNavigate?.({ type: 'open' });
        }}
        className="fixed bottom-20 z-40 flex items-end gap-2 active:scale-95 transition-transform cursor-pointer"
        style={{ right: 'max(12px, calc((100vw - 448px) / 2 + 12px))' }}
        title={ui.open}
        aria-label={ui.open}
      >
        <span className="mb-2 rounded-2xl rounded-br-sm bg-white px-3 py-2 text-xs font-bold text-zinc-900 shadow-xl">
          Swabiee <span className="text-purple-600">•</span> {language === 'mr' ? 'बोला!' : language === 'hi' ? 'बात करें!' : 'Talk to me!'}
        </span>
        <span className="relative block h-[76px] w-[76px] overflow-hidden rounded-[26px] bg-gradient-to-br from-sky-200 via-indigo-200 to-purple-300 shadow-[0_10px_30px_rgba(91,63,180,0.45)] ring-1 ring-white/50">
          <Suspense fallback={<AvatarFallback className="h-full w-full" />}>
            <AnimeCharacter3D className="h-full w-full" />
          </Suspense>
          <span className="absolute right-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
        </span>
      </button>
    );
  }

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-label="Swabiee voice assistant"
      className="fixed bottom-2 z-50 flex h-[min(690px,90dvh)] w-[min(370px,calc(100vw-24px))] flex-col overflow-hidden rounded-[30px] bg-zinc-950/95 shadow-[0_24px_90px_rgba(4,2,15,0.72)] ring-1 ring-white/15 backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-4"
      style={{ right: 'max(12px, calc((100vw - 448px) / 2 + 12px))' }}
    >
      <header className="flex items-center gap-3 px-4 pt-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 text-lg font-black text-white shadow-lg shadow-violet-950/60">
          S
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-extrabold tracking-wide text-white">Swabiee</h2>
          <p className="text-[10px] font-semibold text-violet-200">{ui.voice}</p>
        </div>
        <button
          type="button"
          onClick={minimize}
          className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-zinc-300 transition hover:bg-white/10 hover:text-white"
          aria-label={ui.close}
          title={ui.close}
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/25 blur-[70px]" />
        <Suspense fallback={<AvatarFallback className="relative z-10 h-full w-full" />}>
          <AnimeCharacter3D
            isTalking={state === 'speaking'}
            isListening={state === 'listening'}
            className="relative z-10 h-full w-full"
          />
        </Suspense>
        {state === 'thinking' && (
          <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-zinc-900/90 px-3 py-1.5 text-[11px] font-semibold text-violet-200 shadow-lg">
            {ui.thinking}
          </div>
        )}
      </div>

      {spokenText && (
        <div className="px-4">
          <div className="rounded-2xl rounded-bl-sm bg-white/10 px-3.5 py-2.5 text-xs leading-relaxed text-zinc-100 ring-1 ring-white/10">
            {spokenText}
          </div>
        </div>
      )}

      <footer className="flex flex-col items-center gap-2 px-5 pb-3 pt-2 text-center">
        <div className="flex min-h-6 items-center justify-center gap-2 text-xs font-semibold text-zinc-200" aria-live="polite">
          {state === 'speaking' ? <Volume2 className="h-4 w-4 text-emerald-300" /> : null}
          {state === 'listening' ? <span className="h-2 w-2 animate-pulse rounded-full bg-rose-400" /> : null}
          <span>{statusText}</span>
        </div>
        <button
          type="button"
          onClick={state === 'listening' ? () => recognitionRef.current?.stop() : startListening}
          disabled={state === 'thinking' || state === 'speaking'}
          className={`flex h-[60px] w-[60px] items-center justify-center rounded-full text-white shadow-[inset_0_2px_2px_rgba(255,255,255,0.35),0_12px_32px_rgba(107,59,220,0.5)] transition active:scale-95 disabled:cursor-wait disabled:opacity-60 ${
            state === 'listening'
              ? 'bg-gradient-to-br from-rose-400 to-pink-600'
              : 'bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700'
          }`}
          aria-label={state === 'listening' ? ui.stop : ui.listen}
        >
          {state === 'listening' ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
        </button>
        <p className="text-[10px] font-medium text-zinc-500">
          {language === 'mr' ? 'माइकवर टॅप केल्यावरच ऐकायला सुरुवात करते' : language === 'hi' ? 'माइक दबाने पर ही सुनना शुरू करती है' : 'Microphone starts only when you tap'}
        </p>
      </footer>
    </section>
  );
};

export default AIAssistant;
