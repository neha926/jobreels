import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Film, Search, Plus, MessageCircle, User } from 'lucide-react';

export const BottomNav = ({ onOpenPostModal, t, unreadMessages = 1 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "reels", path: "/", label: t?.navReels || "Reels", icon: Film },
    { id: "jobs", path: "/jobs", label: t?.navJobs || "Jobs", icon: Search },
    { id: "post", label: t?.navPost || "Post", icon: Plus, isPrimary: true },
    { id: "chat", path: "/chat", label: t?.navChat || "Chat", icon: MessageCircle, badge: unreadMessages },
    { id: "profile", path: "/profile", label: t?.navProfile || "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 z-50 px-3 py-1.5 flex items-center justify-around shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.path ? location.pathname === item.path : false;

        if (item.isPrimary) {
          return (
            <button
              key={item.id}
              onClick={onOpenPostModal}
              className="flex flex-col items-center justify-center -mt-5 focus:outline-none transition-transform active:scale-90 group cursor-pointer"
              title="Post Reel or Vacancy"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 flex items-center justify-center text-white shadow-lg shadow-purple-900/40 active:shadow-purple-500/60 transition-all border-2 border-zinc-950">
                <Plus className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-xs font-semibold text-zinc-300 mt-0.5 tracking-tight group-hover:text-purple-300 transition">
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-150 relative cursor-pointer active:scale-95 active:shadow-sm ${
              isActive
                ? "text-purple-400 font-semibold"
                : "text-zinc-400 hover:text-zinc-200 font-medium"
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? "text-purple-400" : "text-zinc-400"
                } stroke-[2.2]`}
              />
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-2 bg-purple-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-zinc-950 shadow-sm animate-pulse">
                  {item.badge}
                </span>
              )}
            </div>
            <span
              className={`text-xs mt-0.5 tracking-tight ${
                isActive ? "text-purple-400 font-semibold" : "text-zinc-400"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
