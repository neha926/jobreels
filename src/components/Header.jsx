import React, { useState } from 'react';
import { 
  Bell, Building2, User, Shield, LogIn, LogOut,
  Calendar, Sun, Moon
} from 'lucide-react';

export const Header = ({ 
  currentRole, 
  language, 
  setLanguage, 
  isLoggedIn, 
  onOpenLogin, 
  onLogout, 
  userProfile, 
  notifications = [], 
  onNavigateProfile,
  theme = 'dark',
  onToggleTheme,
  t 
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const roleIcons = {
    candidate: User,
    employer: Building2,
    admin: Shield
  };

  const RoleIcon = roleIcons[currentRole] || User;

  return (
    <header className="bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-40 px-3.5 py-2.5">
      <div className="flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-semibold text-white text-xs shadow-md shadow-purple-900/40">
            JR
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm tracking-tight text-white leading-none">
              {t?.appName || "JobReels"}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" title="Live & 100% Free"></span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5">
          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={onToggleTheme}
            className="size-8 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center relative transition-all active:scale-95 active:shadow-md active:shadow-purple-500/20 shadow-xs cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light theme' : 'Switch to Dark theme'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>

          {/* 1. Notification Bell Icon */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
              }}
              className="size-8 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center relative transition-all active:scale-95 active:shadow-md active:shadow-purple-500/20 shadow-xs cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-zinc-400" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 text-white text-[10px] font-medium rounded-full flex items-center justify-center border border-zinc-950 shadow-sm">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notification Drawer */}
            {showNotifications && (
              <div className="absolute right-0 top-10 w-72 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800">
                  <h4 className="font-medium text-xs text-white">Live Notifications ({notifications.length})</h4>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-zinc-400 hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar">
                  {notifications.map((n, i) => (
                    <div key={i} className="bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-800 text-xs hover:border-purple-500/30 transition">
                      <div className="flex items-center gap-1.5 text-purple-300 font-medium text-xs mb-0.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{n.title}</span>
                      </div>
                      <p className="text-zinc-300 text-xs leading-normal">{n.message}</p>
                      <span className="text-[10px] text-zinc-500 mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Profile Avatar & Logout */}
          {isLoggedIn ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onNavigateProfile}
                className="size-8 rounded-xl overflow-hidden border border-zinc-700 hover:border-purple-400 transition-all active:scale-95 active:shadow-md active:shadow-purple-500/30 shadow-xs shrink-0 cursor-pointer"
                title={`${userProfile?.name || "User"} (Tap to view profile)`}
              >
                {userProfile?.avatar ? (
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-purple-300 font-medium text-xs">
                    {userProfile?.name?.charAt(0) || "U"}
                  </div>
                )}
              </button>
              <button
                onClick={onLogout}
                className="size-8 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-rose-400 flex items-center justify-center transition-all cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="size-8 rounded-xl btn-purple flex items-center justify-center cursor-pointer"
              title="Login with Mobile OTP"
            >
              <LogIn className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
