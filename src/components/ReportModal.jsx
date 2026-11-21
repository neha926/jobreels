import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, CheckCircle } from 'lucide-react';

export const ReportModal = ({ isOpen, onClose, targetItem, onSubmitReport, t }) => {
  const [reason, setReason] = useState("Asking for Registration Money / Scam");
  const [details, setDetails] = useState("");
  const [reporterPhone, setReporterPhone] = useState("+91 ");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !targetItem) return null;

  const reasons = [
    "Asking for Registration Money / Scam",
    "Fake Job / Misleading Description",
    "Wrong Salary Promised vs Actual",
    "Fake Company / No Physical Office",
    "Wrong Location Provided",
    "Harassment / Inappropriate Content",
    "Other Fraudulent Activity"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitReport({
      id: `rep-${Date.now()}`,
      jobTitle: targetItem.title || targetItem.jobDetails?.title || "Reported Item",
      companyName: targetItem.company || targetItem.creator?.name || "Company",
      reportedBy: reporterPhone || "Anonymous Worker",
      reason: reason,
      details: details || "Candidate flagged this post for immediate inspection.",
      date: "Today",
      status: "Under Review"
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-3 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl p-5 shadow-2xl">
        {submitted ? (
          <div className="py-8 text-center">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-2 animate-bounce" />
            <h3 className="text-base font-extrabold text-white">Report Submitted to Admin</h3>
            <p className="text-xs text-slate-300 mt-1">
              Thank you for keeping KaamReels 100% free and safe for all workers. Our moderation team will investigate within 2 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">{t.reportFakeJob}</h3>
                  <p className="text-[10px] text-slate-400">Strict action against fake jobs and paid agents</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Reason for Report *
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  {reasons.map((r, i) => (
                    <option key={i} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Explain What Happened *
                </label>
                <textarea
                  required
                  rows="3"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="e.g. The caller asked for ₹1500 for uniform or medical charges before giving the offer letter..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Your Mobile Number (Kept Confidential)
                </label>
                <input
                  type="text"
                  value={reporterPhone}
                  onChange={(e) => setReporterPhone(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="bg-rose-950/40 border border-rose-500/30 rounded-xl p-2.5 text-[11px] text-rose-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>KaamReels will immediately freeze the recruiter account if scam is confirmed.</span>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs py-3 rounded-2xl shadow-lg shadow-rose-600/30 transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <AlertTriangle className="w-4 h-4" />
                Submit Fraud Report to Admin
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
