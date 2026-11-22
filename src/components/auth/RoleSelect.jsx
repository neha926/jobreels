import React from 'react';
import { User, Building2, Shield, ArrowRight } from 'lucide-react';

export const RoleSelect = ({ onRoleSelect, phone }) => {
  const roles = [
    {
      id: 'candidate',
      icon: User,
      title: "I'm a Job Seeker",
      subtitle: 'Candidate / Site Worker',
      desc: 'Watch skill reels, 1-tap apply for jobs, auto-generate digital resume.',
      color: 'from-purple-500 to-indigo-500',
      badge: 'Job Seeker',
    },
    {
      id: 'employer',
      icon: Building2,
      title: "I'm an Employer / HR",
      subtitle: 'Company / Recruiter',
      desc: 'Post vacancies, review job seeker applications, and manage candidate chats.',
      color: 'from-pink-500 to-rose-500',
      badge: 'Company HR',
    },
    {
      id: 'admin',
      icon: Shield,
      title: "I'm an Admin",
      subtitle: 'Platform Oversight',
      desc: 'Review fraud reports, verify companies, audit reels & maintain safety.',
      color: 'from-amber-500 to-orange-500',
      badge: 'Admin Console',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden selection:bg-purple-600 selection:text-white">
      {/* Background Decorations */}
      <div className="absolute top-[-20%] right-[-10%] w-[55%] h-[55%] bg-purple-600/15 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[55%] h-[55%] bg-pink-600/15 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-purple-950/70 border border-purple-500/30 px-3 py-1 rounded-full text-purple-300 text-xs font-medium mb-3">
            <span>Verified Phone:</span>
            <span className="text-white">+91 {phone}</span>
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight mb-1.5">
            Select Your Role
          </h1>
          <p className="text-zinc-400 text-xs font-normal">
            Choose your permanent account role to configure your workspace
          </p>
        </div>

        <div className="space-y-3">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <button
                key={r.id}
                onClick={() => onRoleSelect(r.id)}
                className="group w-full card-3d rounded-2xl p-4 flex items-center gap-3.5 hover:border-purple-500/60 hover:-translate-y-0.5 active:translate-y-1 transition-all duration-150 cursor-pointer text-left"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${r.color} rounded-xl flex items-center justify-center badge-3d border-t border-white/35 transform group-hover:rotate-3 transition-transform shrink-0`}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h3 className="text-white font-medium text-sm truncate">
                      {r.title}
                    </h3>
                    <span className="text-[10px] uppercase font-medium text-zinc-300 bg-black/40 border border-white/10 px-2 py-0.5 rounded-md shrink-0 shadow-inner">
                      {r.badge}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-xs font-normal leading-relaxed line-clamp-2">
                    {r.desc}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-zinc-500 group-hover:text-purple-300 group-hover:translate-x-1 transition-all shrink-0"
                />
              </button>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <p className="text-zinc-500 text-xs font-normal">
            Note: Once selected, this role is permanently locked to your mobile number.
          </p>
        </div>
      </div>
    </div>
  );
};
