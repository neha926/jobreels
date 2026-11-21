import React, { useState } from 'react';
import { 
  Send, MapPin, Calendar, Clock, User, Phone, CheckCircle, 
  ExternalLink, Sparkles, Paperclip, MessageSquare 
} from 'lucide-react';

export const ChatView = ({ messages, onSendMessage, t }) => {
  const [inputText, setInputText] = useState("");

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage({
      id: `msg-${Date.now()}`,
      sender: "candidate",
      senderName: "Neha Pawar",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "text"
    });

    setInputText("");
  };

  const handleQuickMessage = (text) => {
    onSendMessage({
      id: `msg-${Date.now()}`,
      sender: "candidate",
      senderName: "Neha Pawar",
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "text"
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-h-[820px] max-w-md mx-auto bg-zinc-950 border-x border-zinc-800">
      {/* Chat Contact Header */}
      <div className="bg-zinc-900 p-3.5 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80"
              alt="HR"
              className="w-10 h-10 rounded-full object-cover border border-purple-400"
            />
            {/* Semantic Green Dot for Online */}
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full absolute bottom-0 right-0 border-2 border-zinc-950"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-white">Anand Kulkarni (Senior HR)</h3>
              <CheckCircle className="w-3.5 h-3.5 text-purple-400 fill-purple-500 text-white" />
            </div>
            <p className="text-xs text-zinc-400">Bharat Forge Precision Ltd. • Online</p>
          </div>
        </div>

        <a
          href="tel:+919822011223"
          className="p-2 rounded-xl bg-zinc-800 text-purple-300 hover:text-white border border-zinc-700 active:scale-95 active:shadow-md active:shadow-purple-500/30 transition-all cursor-pointer"
          title="Direct Call HR"
        >
          <Phone className="w-4 h-4" />
        </a>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar bg-zinc-950/60">
        {messages.map((msg) => {
          const isCandidate = msg.sender === "candidate";

          if (msg.type === "interview_card") {
            const iv = msg.interviewData;
            return (
              <div key={msg.id} className="max-w-[92%] mx-auto my-2">
                <div className="bg-gradient-to-br from-purple-950 via-zinc-900 to-zinc-950 border border-purple-700/60 rounded-2xl p-4 shadow-xl">
                  {/* Interview Header */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-700/30">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <h4 className="font-bold text-xs text-purple-300 uppercase tracking-wider">
                        {t?.interviewInvite || "Interview Invitation"}
                      </h4>
                    </div>
                    <span className="text-xs text-zinc-500">{msg.time}</span>
                  </div>

                  <p className="text-xs text-zinc-200 font-medium mb-3">
                    {iv.company} has scheduled your practical trial & interview:
                  </p>

                  <div className="space-y-1.5 text-xs text-zinc-300 bg-zinc-950/80 p-3 rounded-xl border border-zinc-800 mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-300 shrink-0" />
                      <span>Date: <strong className="text-white">{iv.date}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Time: <strong className="text-white">{iv.time}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-indigo-300 shrink-0" />
                      <span>Contact: <strong className="text-white">{iv.contactPerson}</strong></span>
                    </div>
                    <div className="flex items-start gap-2 pt-1 border-t border-zinc-800">
                      <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span className="text-xs leading-tight text-zinc-300">{iv.address}</span>
                    </div>
                  </div>

                  {/* Open in Google Maps Action Button with Light Purple Click Shadow */}
                  <a
                    href={iv.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full btn-purple text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{t?.openMaps || "Open in Maps"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isCandidate ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs shadow-sm leading-relaxed ${
                  isCandidate
                    ? "bg-purple-600 text-white rounded-br-none shadow-md shadow-purple-950/50"
                    : "bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-bl-none"
                }`}
              >
                {!isCandidate && (
                  <span className="block text-xs font-semibold text-purple-300 mb-0.5">
                    {msg.senderName}
                  </span>
                )}
                {msg.text}
              </div>
              <span className="text-[10px] text-zinc-500 mt-1 px-1">{msg.time}</span>
            </div>
          );
        })}
      </div>

      {/* Quick Messages Bar (from Image 2) */}
      <div className="px-3 py-2 bg-zinc-950/95 border-t border-zinc-800">
        <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Quick Messages:</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            onClick={() => handleQuickMessage("Hello, I am interested in this position.")}
            className="shrink-0 px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-850 border border-zinc-750 text-white text-xs font-medium flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-xs"
          >
            <span>💬</span>
            <span>Hello, I am interested in this position.</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickMessage("I have confirmed the schedule")}
            className="shrink-0 px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-850 border border-zinc-750 text-white text-xs font-medium flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-xs"
          >
            <span>💬</span>
            <span>I have confirmed the schedule</span>
          </button>
        </div>
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSend} className="p-3 bg-zinc-900 flex items-center gap-2 border-t border-zinc-800 mb-14">
        <button
          type="button"
          className="p-2 text-zinc-400 hover:text-white rounded-xl bg-zinc-850 border border-zinc-800 active:scale-95 transition cursor-pointer"
          title="Attach certificate or photo"
        >
          <Paperclip className="w-4 h-4" />
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type message or reply to HR..."
          className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40 transition"
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
