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
      desc: 'Post job vacancies in 2 mins, publish video ads, review applicants & schedule interviews.',
      color: 'from-pink-500 to-rose-500',
      badge: 'Hiring Team',
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
      {/* Background Decorations (Matching Taskboard) */}
      <div className="absolute top-[-20%] right-[-10%] w-[55%] h-[55%] bg-purple-600/15 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[55%] h-[55%] bg-pink-600/15 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 bg-purple-950/70 border border-purple-500/30 px-3.5 py-1.5 rounded-full text-purple-300 text-xs font-bold mb-3">
            <span>Verified Phone:</span>
            <span className="text-white">+91 {phone}</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">
            Who are you?
          </h1>
          <p className="text-gray-400 text-xs font-medium">
            Choose your primary role to configure your JobReels workspace
          </p>
        </div>

        <div className="space-y-3.5">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <button
                key={r.id}
                onClick={() => onRoleSelect(r.id)}
                className="group w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1.8rem] p-5 flex items-center gap-4 hover:bg-white/10 hover:border-purple-500/60 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 cursor-pointer text-left shadow-lg"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${r.color} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform shrink-0`}
                >
                  <Icon size={26} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h3 className="text-white font-extrabold text-base truncate">
                      {r.title}
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-gray-400 bg-white/5 px-2 py-0.5 rounded-md shrink-0">
                      {r.badge}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs font-normal leading-relaxed line-clamp-2">
                    {r.desc}
                  </p>
                </div>
                <ArrowRight
                  size={18}
                  className="text-gray-500 group-hover:text-purple-300 group-hover:translate-x-1 transition-all shrink-0"
                />
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs">
            You can also switch workspace mode anytime from the header menu.
          </p>
        </div>
      </div>
    </div>
  );
};
