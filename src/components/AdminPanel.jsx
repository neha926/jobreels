import React, { useState } from 'react';
import { 
  ShieldAlert, CheckCircle, XCircle, AlertTriangle, 
  Users, Briefcase, Video, Building2, TrendingUp, Search, Eye 
} from 'lucide-react';

export const AdminPanel = ({ 
  fraudReports, 
  onResolveReport, 
  jobs, 
  onVerifyJob, 
  t 
}) => {
  const [activeTab, setActiveTab] = useState("fraud"); // "fraud", "companies", "jobs"
  const [searchFilter, setSearchFilter] = useState("");

  const stats = [
    { label: "Total Workers", count: "14,820", change: "+18% this week", icon: Users, color: "text-blue-400" },
    { label: "Active Jobs", count: "348", change: "100% Free Verified", icon: Briefcase, color: "text-emerald-400" },
    { label: "Active Reels", count: "1,920", change: "Skill Demonstrations", icon: Video, color: "text-rose-400" },
    { label: "Fraud Complaints", count: fraudReports.filter(r => r.status === "Under Review").length, change: "Requires Action", icon: ShieldAlert, color: "text-amber-400" }
  ];

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto">
      {/* Admin Title Banner */}
      <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-4 shadow-xl mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            🛡️
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-white">{t.adminDashboard}</h2>
            <p className="text-[10px] text-slate-400">Zero Scam & Multi-Language Moderation Console</p>
          </div>
        </div>

        {/* Platform KPIs (PRD Section 23) */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-700/60">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[10px]">{s.label}</span>
                  <Icon className={`w-3.5 h-3.5 ${s.color}`} />
                </div>
                <div className="text-base font-black text-white">{s.count}</div>
                <span className="text-[9px] text-slate-400">{s.change}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex bg-slate-800 p-1 rounded-2xl border border-slate-700 mb-4">
        <button
          onClick={() => setActiveTab("fraud")}
          className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "fraud"
              ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          Fraud Queue ({fraudReports.filter(r => r.status === "Under Review").length})
        </button>
        <button
          onClick={() => setActiveTab("companies")}
          className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "companies"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          Verification
        </button>
      </div>

      {/* TAB 1: FRAUD COMPLAINTS REVIEW */}
      {activeTab === "fraud" && (
        <div className="space-y-3">
          <p className="text-[11px] text-slate-400 px-1">
            Complaints submitted by candidates against fraudulent agents or fake job offers:
          </p>

          {fraudReports.map((report) => (
            <div
              key={report.id}
              className={`bg-slate-800/90 border rounded-2xl p-4 shadow-lg transition-all ${
                report.status === "Banned"
                  ? "border-rose-900/50 opacity-60"
                  : "border-slate-700 hover:border-slate-600"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="bg-rose-500/20 text-rose-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-rose-500/40">
                    ⚠️ {report.reason}
                  </span>
                  <h4 className="font-extrabold text-sm text-white mt-1">{report.jobTitle}</h4>
                  <p className="text-xs text-slate-300 font-semibold">{report.companyName}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  report.status === "Banned" ? "bg-rose-950 text-rose-300" : "bg-amber-500/20 text-amber-300"
                }`}>
                  {report.status}
                </span>
              </div>

              <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-700/60 text-xs text-slate-300 mb-3">
                <span className="font-bold text-slate-200 block text-[10px] mb-0.5">Worker Statement:</span>
                "{report.details}"
                <div className="text-[10px] text-slate-400 mt-2 flex justify-between">
                  <span>Reported by: {report.reportedBy}</span>
                  <span>{report.date}</span>
                </div>
              </div>

              {/* Action Buttons */}
              {report.status === "Under Review" && (
                <div className="flex gap-2 pt-1 border-t border-slate-700/60">
                  <button
                    onClick={() => onResolveReport(report.id, "Banned")}
                    className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs py-2 rounded-xl flex items-center justify-center gap-1 shadow-md shadow-rose-600/30 active:scale-95 transition-all"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Ban Recruiter & Delete
                  </button>
                  <button
                    onClick={() => onResolveReport(report.id, "Dismissed")}
                    className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold text-xs px-3 py-2 rounded-xl"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: COMPANY VERIFICATION (Section 17 PRD) */}
      {activeTab === "companies" && (
        <div className="space-y-3">
          <p className="text-[11px] text-slate-400 px-1">
            Companies pending official Verified Badge based on GST / Factory license verification:
          </p>

          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-lg">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h4 className="font-extrabold text-sm text-white">Shree Ganesh Auto Spares</h4>
                <p className="text-xs text-slate-300">Swargate, Pune • Retail & Warehouse</p>
                <p className="text-[11px] text-slate-400 mt-0.5">GST No: 27AABCS1429B1Z4 (Submitted)</p>
              </div>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                Pending Verification
              </span>
            </div>

            <div className="flex gap-2 mt-3 pt-2 border-t border-slate-700/60">
              <button
                onClick={() => onVerifyJob("job-105")}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs py-2 rounded-xl flex items-center justify-center gap-1 shadow-md shadow-blue-600/30 active:scale-95 transition-all"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Grant Official Verified Badge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
