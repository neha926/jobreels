import React, { useState } from 'react';
import { 
  Building2, Users, Calendar, PlusCircle, CheckCircle, 
  MapPin, Video, Phone, Clock, ShieldCheck 
} from 'lucide-react';

export const EmployerPanel = ({ 
  jobs, 
  applications, 
  onUpdateAppStatus, 
  onOpenPostModal, 
  onScheduleInterview,
  t 
}) => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Schedule form state
  const [interviewDate, setInterviewDate] = useState("2026-11-24");
  const [interviewTime, setInterviewTime] = useState("11:00 AM");
  const [interviewAddress, setInterviewAddress] = useState("Corporate Office, Business Park, Tech Tower B, Pune");
  const [contactPerson, setContactPerson] = useState("Hiring Team (+91 72762 93084)");

  const handleConfirmSchedule = (e) => {
    e.preventDefault();
    if (!selectedApp) return;

    onScheduleInterview(selectedApp.id, {
      date: interviewDate,
      time: interviewTime,
      type: "In-Person Direct Interview & Technical Discussion",
      address: interviewAddress,
      contactPerson: contactPerson,
      googleMapsQuery: "Business+Park+Pune"
    });

    setShowScheduleModal(false);
    setSelectedApp(null);
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto">
      {/* Employer & HR Header Card */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-600/40 rounded-3xl p-4 shadow-xl mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center font-black text-white text-base shadow-md">
              HR
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-extrabold text-sm text-white">Verified Employer & HR Portal</h2>
                <CheckCircle className="w-4 h-4 text-blue-400 fill-blue-500 text-white" />
              </div>
              <p className="text-[11px] text-amber-300 font-semibold">Direct Hiring • Zero Commission</p>
              <p className="text-[10px] text-slate-400">Post Vacancies • Video Resume Screening • Instant Trial Invite</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-blue-500/30">
            <span className="text-[10px] text-slate-300 block">Active Openings</span>
            <span className="text-sm font-extrabold text-emerald-400">{jobs.length} Active Positions</span>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-blue-500/30">
            <span className="text-[10px] text-slate-300 block">Applicants Received</span>
            <span className="text-sm font-extrabold text-amber-400">{applications.length} Candidates</span>
          </div>
        </div>

        <button
          onClick={onOpenPostModal}
          className="mt-3 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 active:scale-95 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          {t.postJobTitle} (Free in 2 Mins)
        </button>
      </div>

      {/* Candidate Pipeline Title */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
          <Users className="w-4 h-4 text-emerald-400" />
          {t.candidateApplicants}
        </h3>
        <span className="text-xs text-slate-400">{applications.length} Received</span>
      </div>

      {/* Applicants List */}
      <div className="space-y-3.5">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-lg"
          >
            <div className="flex items-start gap-3 mb-3">
              <img
                src={app.candidatePhoto}
                alt={app.candidateName}
                className="w-13 h-13 rounded-2xl object-cover border border-slate-600 shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-white">{app.candidateName}</h4>
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/40">
                    {app.status}
                  </span>
                </div>
                <p className="text-xs text-amber-400 font-semibold">{app.jobTitle}</p>
                <div className="text-[11px] text-slate-400 flex items-center gap-3 mt-1">
                  <span>⏱️ {app.experience}</span>
                  <span>📍 {app.location}</span>
                </div>
              </div>
            </div>

            {/* Video Skill Proof */}
            <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-700/60 mb-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Video className="w-4 h-4 text-rose-400" />
                <span className="font-semibold">{app.skillReelTitle}</span>
              </div>
              <span className="text-rose-400 text-[10px] font-bold">Watch Reel ▶</span>
            </div>

            {/* Status Stepper Controls */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-700/60">
              <button
                onClick={() => onUpdateAppStatus(app.id, "Shortlisted")}
                className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold border transition-all ${
                  app.status === "Shortlisted"
                    ? "bg-purple-600 text-white border-purple-500"
                    : "bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600"
                }`}
              >
                Shortlist
              </button>

              <button
                onClick={() => {
                  setSelectedApp(app);
                  setShowScheduleModal(true);
                }}
                className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold border transition-all ${
                  app.status === "Interview"
                    ? "bg-emerald-600 text-white border-emerald-500"
                    : "bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600"
                }`}
              >
                📅 Site Interview
              </button>

              <button
                onClick={() => onUpdateAppStatus(app.id, "Selected")}
                className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold border transition-all ${
                  app.status === "Selected"
                    ? "bg-teal-600 text-white border-teal-500"
                    : "bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600"
                }`}
              >
                ✓ Select
              </button>

              <button
                onClick={() => onUpdateAppStatus(app.id, "Rejected")}
                className="py-1.5 px-2.5 rounded-lg text-[11px] font-bold bg-slate-700 text-rose-400 border border-slate-600 hover:bg-rose-950"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Interview Modal */}
      {showScheduleModal && selectedApp && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-3 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <h3 className="font-extrabold text-sm text-white">Schedule Candidate Site Walkthrough</h3>
                <p className="text-xs text-emerald-400 mt-0.5">Candidate: {selectedApp.candidateName}</p>
              </div>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmSchedule} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Interview Date</label>
                  <input
                    type="date"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Time</label>
                  <input
                    type="text"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Site Office Address (with Google Map Action)
                </label>
                <textarea
                  rows="2"
                  value={interviewAddress}
                  onChange={(e) => setInterviewAddress(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Director / HR Contact</label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-3 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                Confirm & Send Map Pin to Candidate
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
