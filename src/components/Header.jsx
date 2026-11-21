import React, { useState } from 'react';
import { 
  Bell, Globe, Building2, User, Shield, LogIn, 
  Calendar, CheckCircle, Sparkles
} from 'lucide-react';

export const Header = ({ 
  currentRole, 
  setCurrentRole, 
  language, 
  setLanguage, 
  isLoggedIn, 
  onOpenLogin, 
  onLogout,
  userProfile,
  notifications = [],
  onNavigateProfile,
  t 
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const roleIcons = {
    candidate: User,
    employer: Building2,
    admin: Shield
  };

  const RoleIcon = roleIcons[currentRole] || User;

  return (
    <header className="bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-40 px-3.5 py-2.5">
      <div className="flex items-center justify-between">
        {/* Brand / Logo (TaskBoard Styled Light Purple) */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-md shadow-purple-900/40">
            JR
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight text-white leading-none">
                {t.appName || "JobReels"}
              </span>
              {/* Semantic Green Dot for Active/Live System */}
              <span className="w-2 h-2 rounded-full bg-emerald-400" title="Live & 100% Free"></span>
            </div>
            <p className="text-xs text-zinc-400 font-medium leading-none mt-1">Video Career Hub • 100% Free</p>
          </div>
        </div>

        {/* Right Icon Actions with Click Shadow Feedback */}
        <div className="flex items-center gap-1.5">
          {/* 1. Role Switcher Icon */}
          <div className="relative">
            <button
              onClick={() => {
                setShowRoleMenu(!showRoleMenu);
                setShowNotifications(false);
              }}
              className="size-8 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-all active:scale-95 active:shadow-md active:shadow-purple-500/20 shadow-xs cursor-pointer"
              title={`Role: ${currentRole}`}
            >
              <RoleIcon className="w-4 h-4 text-purple-300" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 top-10 w-44 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in">
                <div className="px-2.5 py-1 text-xs font-medium text-zinc-400 uppercase tracking-wider border-b border-zinc-800 mb-1">
                  Switch Workspace
                </div>
                {[
                  { id: "candidate", label: "Job Seeker", icon: User },
                  { id: "employer", label: "Company HR", icon: Building2 },
                  { id: "admin", label: "Admin Console", icon: Shield }
                ].map((r) => {
                  const Icon = r.icon;
                  const isActive = currentRole === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        setCurrentRole(r.id);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer active:scale-95 ${
                        isActive
                          ? "bg-purple-600 text-white shadow-sm"
                          : "text-zinc-300 hover:bg-zinc-800"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{r.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Notification Bell Icon */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowLangMenu(false);
                setShowRoleMenu(false);
              }}
              className="size-8 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center relative transition-all active:scale-95 active:shadow-md active:shadow-purple-500/20 shadow-xs cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-zinc-400" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-zinc-950 shadow-sm">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notification Drawer */}
            {showNotifications && (
              <div className="absolute right-0 top-10 w-72 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800">
                  <h4 className="font-semibold text-xs text-white">Live Notifications ({notifications.length})</h4>
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
                      <div className="flex items-center gap-1.5 text-purple-300 font-semibold text-xs mb-0.5">
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

          {/* 4. Profile Avatar / Login Icon Button */}
          {isLoggedIn ? (
            <button
              onClick={onNavigateProfile || onLogout}
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
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-purple-300 font-bold text-xs">
                  {userProfile?.name?.charAt(0) || "U"}
                </div>
              )}
            </button>
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
