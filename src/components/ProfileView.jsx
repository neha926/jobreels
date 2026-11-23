import React, { useState } from 'react';
import { useClerk } from '@clerk/react';
import { 
  FileText, Download, Share2, CheckCircle, MapPin, 
  Briefcase, GraduationCap, Award, Bookmark, Phone, QrCode, Clock, ExternalLink,
  LogOut, ShieldCheck, RefreshCw, AlertTriangle, ChevronDown, Settings, Globe, Building2, Sparkles, Check,
  Pencil, Camera
} from 'lucide-react';

export const ProfileView = ({ 
  profile, 
  currentRole = "candidate",
  applications, 
  savedJobs, 
  onApplyJob, 
  appliedJobIds, 
  onLogout,
  onOpenLogin,
  onEditProfile,
  language = "en",
  setLanguage,
  t 
}) => {
  const [activeTab, setActiveTab] = useState("resume"); // "resume", "applications", "saved"
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Settings dropdown state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsSubDropdowns, setSettingsSubDropdowns] = useState({
    language: false,
    auth: false
  });

  const toggleSettingsSub = (sub) => {
    setSettingsSubDropdowns((prev) => ({
      ...prev,
      [sub]: !prev[sub]
    }));
  };

  // Dropdown / Accordion state for resume sections
  const [openDropdowns, setOpenDropdowns] = useState({
    skills: true,
    education: false,
    experience: true
  });

  const toggleDropdown = (section) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // TaskBoard Organizations Dropdown Accordion State
  const [openOrgId, setOpenOrgId] = useState("org-taskboard");

  const toggleOrg = (id) => {
    setOpenOrgId((prev) => (prev === id ? null : id));
  };

  const organizationsList = [
    {
      id: "org-taskboard",
      name: "TaskBoard X Core",
      domain: "task-bord-x.vercel.app",
      status: "Active Workspace",
      totalAccuracy: "98.4%",
      projects: [
        {
          name: "TaskBoard Agile Project Management Platform",
          accuracy: "98.4%",
          accuracyBadge: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
          progress: 98.4,
          progressGradient: "from-purple-600 to-emerald-400",
          sprint: "Sprint 4 • Kanban, AI Smart Agenda & Workspaces",
          status: "✓ Completed & Deployed",
          link: "https://task-bord-x.vercel.app/"
        },
        {
          name: "Real-time Task & Sprint Analytics Engine",
          accuracy: "96.8%",
          accuracyBadge: "bg-purple-500/15 text-purple-300 border border-purple-500/30",
          progress: 96.8,
          progressGradient: "from-purple-600 to-indigo-500",
          sprint: "Sprint 3 • Automated Burndown Charts & Activity Logs",
          status: "✓ High Performance",
          link: "https://task-bord-x.vercel.app/"
        }
      ]
    },
    {
      id: "org-jobreels",
      name: "JobReels Media Hub",
      domain: "jobreels.io",
      status: "Verified Hub",
      totalAccuracy: "96.5%",
      projects: [
        {
          name: "Short Video Reels & Discovery Feed Engine",
          accuracy: "95.2%",
          accuracyBadge: "bg-purple-500/15 text-purple-300 border border-purple-500/30",
          progress: 95.2,
          progressGradient: "from-purple-600 to-indigo-500",
          sprint: "Touch Vertical Swipes • H.264 Stream • Instant 1-Tap Apply",
          status: "✓ Live In Production",
          link: "#"
        },
        {
          name: "Interactive HR Chat & Quick Messages Suite",
          accuracy: "97.8%",
          accuracyBadge: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
          progress: 97.8,
          progressGradient: "from-purple-600 to-emerald-400",
          sprint: "Quick Message Pills • Interview Scheduling • Maps Integration",
          status: "✓ Passed QA",
          link: "#"
        }
      ]
    },
    {
      id: "org-sppu",
      name: "SPPU CareerOS Tech Lab",
      domain: "sppu-creds.gov.in",
      status: "Accredited Lab",
      totalAccuracy: "100%",
      projects: [
        {
          name: "Automated Verified Resume PDF Generator",
          accuracy: "100%",
          accuracyBadge: "bg-teal-500/15 text-teal-300 border border-teal-500/30",
          progress: 100,
          progressGradient: "from-purple-600 to-teal-400",
          sprint: "A4 Portrait Standard • Background Check Verified",
          status: "✓ 100% Passed",
          link: "#"
        },
        {
          name: "QR-Code Digital Verification System",
          accuracy: "99.1%",
          accuracyBadge: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
          progress: 99.1,
          progressGradient: "from-purple-600 to-emerald-400",
          sprint: "Tamper-proof Cryptographic Validation & Badging",
          status: "✓ Verified & Audited",
          link: "#"
        }
      ]
    }
  ];

  const clerk = useClerk();

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      if (clerk && clerk.signOut) {
        await clerk.signOut();
      }
    } catch (err) {
      console.warn("Clerk signOut error:", err);
    } finally {
      setIsLoggingOut(false);
      setShowLogoutConfirm(false);
      if (onLogout) {
        onLogout();
      }
    }
  };

  const handleShareResumeWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out my verified digital resume on JobReels:\nName: ${profile.name}\nRole: ${profile.headline}\nExperience: ${profile.experience}\nVerified Profile: https://jobreels.io/resume/neha-pawar`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  // Foolproof Print to PDF: Triggers window.print()
  // Our dedicated @media print CSS strictly hides all screen UI and renders ONLY #jobreels-printable-resume in pure white A4 format
  const handleDownloadPDF = () => {
    window.print();
  };

  const statusColors = {
    Applied: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    Viewed: "bg-zinc-800 text-zinc-300 border-zinc-700",
    Shortlisted: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    Interview: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 animate-pulse",
    Selected: "bg-teal-500/15 text-teal-300 border-teal-500/30",
    Rejected: "bg-rose-500/15 text-rose-400 border-rose-500/30"
  };

  const languagesList = [
    { code: "en", label: "English", sub: "Default Interface" },
    { code: "hi", label: "हिन्दी", sub: "National Language" },
    { code: "mr", label: "मराठी", sub: "Maharashtra Regional" }
  ];

  const expOrgs = profile.experienceOrganizations || [
    {
      company: "TaskBoard X Technologies",
      role: "Lead Full Stack Engineer",
      duration: "2024 - Present",
      location: "Pune, India (Remote)",
      domain: "task-bord-x.vercel.app",
      projects: [
        {
          name: "TaskBoard Agile Project Management Platform",
          description: "Full-stack Kanban, AI Smart Agenda, workspace organization, role-based access & live deployment on Vercel.",
          accuracy: "98.4% Accuracy",
          link: "https://task-bord-x.vercel.app/"
        },
        {
          name: "Real-time Task & Sprint Analytics Engine",
          description: "Automated burndown tracking, sprint metrics, activity logging and real-time live updates.",
          accuracy: "96.8% Accuracy",
          link: "https://task-bord-x.vercel.app/"
        }
      ]
    },
    {
      company: "JobReels Media Hub",
      role: "Senior Frontend & Video Specialist",
      duration: "2023 - 2024",
      location: "Pune / Mumbai",
      domain: "jobreels.io",
      projects: [
        {
          name: "Real-time Video Reels & Short Form Content Engine",
          description: "Touch vertical swipe gestures, H.264 video feed stream, 1-tap fast apply.",
          accuracy: "95.2% Accuracy",
          link: "#"
        },
        {
          name: "Interactive Candidate-HR Direct Chat & Quick Messages",
          description: "Real-time messaging, interview confirmations, quick message pills, and Google Maps integration.",
          accuracy: "97.8% Accuracy",
          link: "#"
        }
      ]
    },
    {
      company: "SPPU CareerOS Tech Lab",
      role: "Software Development Associate",
      duration: "2022 - 2023",
      location: "Pune, Maharashtra",
      domain: "sppu-creds.gov.in",
      projects: [
        {
          name: "Automated Verified Resume PDF Generator",
          description: "Pure A4 standard printable generator, background verification stamp, and instant PDF download.",
          accuracy: "100% Accuracy",
          link: "#"
        },
        {
          name: "QR-Code Digital Credential Verification Engine",
          description: "Tamper-proof cryptographic candidate certification and skills audit engine.",
          accuracy: "99.1% Accuracy",
          link: "#"
        }
      ]
    }
  ];

  const collegeProjects = profile.collegeProjects || [
    "Campus Placement Portal & Automated Student Assessment System",
    "IoT-Based Smart Energy Meter with Remote Monitoring Dashboard",
    "Real-Time Face Recognition & RFID Automated Attendance System",
    "Digital Library Management & Automated Book Archival System"
  ];

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto">
      {/* 1. Profile Header Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-sm mb-3.5">
        <div className="flex items-start gap-3 mb-3">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-14 h-14 rounded-2xl object-cover border border-purple-500/40 shadow-sm"
            />
            {profile.verified && (
              <span className="absolute -bottom-1 -right-1 bg-purple-600 text-white rounded-full p-0.5 shadow">
                <CheckCircle className="w-3.5 h-3.5 fill-purple-600 text-white" />
              </span>
            )}
            {/* Edit profile picture (pencil) */}
            <button
              type="button"
              onClick={() => onEditProfile?.('photo')}
              className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-zinc-950 border border-purple-500/50 text-purple-300 hover:text-white flex items-center justify-center cursor-pointer active:scale-90 shadow"
              title="Change profile picture"
              aria-label="Change profile picture"
            >
              <Camera className="w-3 h-3" />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                <h2 className="font-bold text-base text-white truncate">
                  {profile.name}
                </h2>
                <CheckCircle className="w-4 h-4 text-purple-400 fill-purple-500 text-white shrink-0" title="Verified" />
                <span className="px-2 py-0.5 rounded-lg bg-zinc-800 border border-zinc-700 text-[11px] font-medium text-zinc-300 flex items-center gap-1 shrink-0">
                  {currentRole === 'employer' ? <Building2 className="w-3 h-3 text-purple-400" /> : <ShieldCheck className="w-3 h-3 text-purple-400" />}
                  <span>{currentRole === 'candidate' ? 'Job Seeker' : currentRole === 'employer' ? 'Company HR' : 'Admin'}</span>
                </span>
              </div>
              {/* Edit Profile Pencil + Settings Icon Button */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => onEditProfile?.('name')}
                  className="w-8 h-8 rounded-xl border bg-zinc-950/70 hover:bg-zinc-850 border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                  title="Edit profile details"
                  aria-label="Edit profile"
                >
                  <Pencil className="w-4 h-4 text-purple-400" />
                </button>
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all active:scale-95 cursor-pointer ${
                    isSettingsOpen
                      ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-900/40"
                      : "bg-zinc-950/70 hover:bg-zinc-850 border-zinc-800 text-zinc-300"
                  }`}
                  title="Settings & Preferences"
                  aria-label="Settings"
                >
                  <Settings className={`w-4 h-4 ${isSettingsOpen ? 'text-white' : 'text-purple-400'}`} />
                </button>
              </div>
            </div>
            {/* Rich Purple Role Headline */}
            <p className="text-xs text-purple-400 font-semibold mt-0.5 truncate">
              {profile.headline}
            </p>
            {profile.organization && (
              <p className="text-[11px] text-zinc-400 font-medium flex items-center gap-1 truncate mt-0.5">
                <Building2 className="w-3 h-3 text-purple-400 shrink-0" />
                <span className="truncate">{profile.organization}</span>
              </p>
            )}
            <div className="flex items-center justify-between gap-1 mt-1">
              <p className="text-xs text-zinc-400 flex items-center gap-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span className="truncate">{profile.location}</span>
              </p>
              <span className="bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
                100% Free
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid with Subtle Click Shadow */}
        <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-zinc-800/80 text-center">
          <div className="bg-zinc-950/60 border border-zinc-800/80 p-2.5 rounded-xl hover:border-purple-500/30 transition">
            <span className="text-xs text-zinc-400 font-medium block">Experience</span>
            <span className="text-sm font-bold text-white mt-0.5 block">{profile.experience || "2.5 Yrs"}</span>
          </div>
          <div className="bg-zinc-950/60 border border-zinc-800/80 p-2.5 rounded-xl hover:border-purple-500/30 transition">
            <span className="text-xs text-zinc-400 font-medium block">Degree</span>
            <span className="text-sm font-bold text-white mt-0.5 block">B.Tech</span>
          </div>
          <div className="bg-zinc-950/60 border border-zinc-800/80 p-2.5 rounded-xl hover:border-purple-500/30 transition">
            <span className="text-xs text-zinc-400 font-medium block">Skill Reels</span>
            <span className="text-sm font-bold text-purple-400 mt-0.5 block">3 Verified</span>
          </div>
        </div>
      </div>

      {/* SETTINGS DROPDOWN ACCORDION (HOUSING LANGUAGE & AUTHENTICATION PREFERENCES) */}
      {isSettingsOpen && (
        <div className="bg-zinc-900 border border-purple-600/40 rounded-2xl p-4 mb-3.5 shadow-xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-purple-900/40 text-purple-300 border border-purple-700/50 flex items-center justify-center shrink-0">
                <Settings className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Settings & Preferences
                </h4>
                <p className="text-[11px] text-zinc-400">Configure language, session & accounts</p>
              </div>
            </div>
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="text-xs text-zinc-400 hover:text-white px-2 py-1 rounded-lg bg-zinc-800 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2.5">
            {/* MINIMAL LANGUAGE PREFERENCES (GLOBE ICON + QUICK PILLS AS PER IMAGE 4) */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-900/40 border border-purple-700/40 flex items-center justify-center text-purple-300 shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-zinc-200 uppercase tracking-wider leading-none">
                    Language
                  </h5>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    {language === "hi" ? "हिन्दी Interface" : language === "mr" ? "मराठी Interface" : "English Interface"}
                  </span>
                </div>
              </div>

              {/* Quick Language Pills (EN, हि, म) */}
              <div className="flex items-center gap-1.5 shrink-0">
                {[
                  { code: "en", label: "EN" },
                  { code: "hi", label: "हि" },
                  { code: "mr", label: "म" }
                ].map((item) => {
                  const isSelected = language === item.code;
                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => setLanguage && setLanguage(item.code)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer active:scale-95 ${
                        isSelected
                          ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-900/50"
                          : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                      }`}
                      title={item.code === "hi" ? "हिन्दी" : item.code === "mr" ? "मराठी" : "English"}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SUB-DROPDOWN 2: AUTHENTICATION & ACCOUNT (SHIELD/KEY ICON) */}
            <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950/70">
              <button
                type="button"
                onClick={() => toggleSettingsSub("auth")}
                className="w-full flex items-center justify-between p-3 text-left hover:bg-zinc-950 transition cursor-pointer select-none"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-900/40 border border-purple-700/40 flex items-center justify-center text-purple-300 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-zinc-200 uppercase tracking-wider leading-none">
                      Authentication & Account
                    </h5>
                    <span className="text-[11px] text-zinc-400 font-medium">
                      Phone: {profile.phone || "+91 7276293084"}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                  settingsSubDropdowns.auth ? "rotate-180 text-purple-400" : ""
                }`} />
              </button>

              {settingsSubDropdowns.auth && (
                <div className="p-3 pt-2 border-t border-zinc-800 bg-zinc-950/40 animate-in fade-in space-y-2.5">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div>
                      <span className="text-[10px] text-zinc-400 block font-medium">Logged in via Mobile OTP:</span>
                      <span className="text-xs font-bold text-white">{profile.phone || "+91 7276293084"}</span>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Active Session
                    </span>
                  </div>

                  {/* Switch Account */}
                  <button
                    onClick={onOpenLogin}
                    className="w-full py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-purple-400" />
                    <span>Switch Account / Login Another Number</span>
                  </button>

                  {/* Logout Button */}
                  {!showLogoutConfirm ? (
                    <button
                      onClick={() => setShowLogoutConfirm(true)}
                      className="w-full py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:text-rose-300 text-xs font-semibold active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out from JobReels</span>
                    </button>
                  ) : (
                    <div className="bg-rose-950/30 border border-rose-500/30 rounded-xl p-2.5 animate-in fade-in">
                      <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold mb-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>Are you sure you want to log out?</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mb-2.5">
                        You will need OTP verification to log back in.
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowLogoutConfirm(false)}
                          className="flex-1 py-1.5 px-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleConfirmLogout}
                          disabled={isLoggingOut}
                          className="flex-1 py-1.5 px-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>{isLoggingOut ? "Logging out..." : "Yes, Log Out"}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Profile Section Tabs */}
      <div className="flex bg-zinc-900 p-1 rounded-2xl border border-zinc-800 mb-3.5">
        <button
          onClick={() => setActiveTab("resume")}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
            activeTab === "resume"
              ? "bg-purple-600 text-white shadow-md shadow-purple-900/40 active:shadow-lg active:shadow-purple-500/40"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Digital Resume
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
            activeTab === "applications"
              ? "bg-purple-600 text-white shadow-md shadow-purple-900/40 active:shadow-lg active:shadow-purple-500/40"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          Applications ({applications.length})
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
            activeTab === "saved"
              ? "bg-purple-600 text-white shadow-md shadow-purple-900/40 active:shadow-lg active:shadow-purple-500/40"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          Saved Jobs ({savedJobs.length})
        </button>
      </div>

      {/* TAB 1: AUTOMATIC DIGITAL RESUME */}
      {activeTab === "resume" && (
        <div className="space-y-3">
          {/* Action Buttons: download resume + share */}
          <div className="flex gap-2">
            <button
              onClick={handleDownloadPDF}
              className="flex-1 btn-purple text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              title={t.downloadPDF || "Download PDF Resume"}
            >
              <Download className="w-4 h-4" />
              <span>{t.downloadPDF || "Download Resume"}</span>
            </button>
            <button
              onClick={handleShareResumeWhatsApp}
              className="bg-zinc-850 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 font-semibold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 active:scale-95 active:shadow-md active:shadow-purple-500/20 transition-all cursor-pointer"
              title={t.shareWhatsApp || "Share on WhatsApp"}
            >
              <Share2 className="w-4 h-4 text-emerald-400" />
            </button>
          </div>

          {/* Formatted Digital Resume Card */}
          <div className="bg-zinc-900 text-zinc-100 rounded-2xl p-4.5 shadow-sm border border-zinc-800 relative">
            {/* Verification Tick Stamp */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5" title="Verified Profile">
              <CheckCircle className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
            </div>

            <div className="border-b border-zinc-800 pb-3 mb-3 pr-28">
              <h3 className="font-bold text-base text-white tracking-tight">{profile.name}</h3>
              <p className="text-xs font-semibold text-purple-400 mt-0.5">{profile.headline}</p>
              <div className="text-xs text-zinc-400 flex flex-wrap gap-x-3 gap-y-1 mt-2">
                <span>📍 {profile.location}</span>
                <span>📞 {profile.phone}</span>
                <span>💰 Expected: {profile.expectedSalary}</span>
              </div>
            </div>

            {/* DROPDOWN 1: CORE SKILLS (VIDEO VERIFIED) */}
            <div className="box-inset-3d overflow-hidden mb-2.5">
              <div className="flex items-center">
              <button
                type="button"
                onClick={() => toggleDropdown("skills")}
                className="flex-1 flex items-center justify-between p-3.5 text-left hover:bg-zinc-950/40 active:scale-[0.99] active:shadow-md active:shadow-purple-500/25 transition-all cursor-pointer select-none"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-purple-900/40 text-purple-300 border border-purple-700/50 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider leading-none">
                      {t?.skills || "Core Skills"} (Video Verified)
                    </h4>
                    <span className="text-xs text-zinc-400 font-medium">
                      {profile.skills?.length || 5} verified technical skills
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                  openDropdowns.skills ? "rotate-180 text-purple-400" : ""
                }`} />
              </button>
              <button
                type="button"
                onClick={() => onEditProfile?.('skills')}
                className="p-2 mr-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 cursor-pointer active:scale-90 shrink-0"
                title="Edit skills"
                aria-label="Edit skills"
              >
                <Pencil className="w-3.5 h-3.5 text-purple-400" />
              </button>
              </div>

              {openDropdowns.skills && (
                <div className="p-3 pt-1 border-t border-zinc-800/80 bg-zinc-950/40 animate-in fade-in duration-150">
                  <p className="text-xs text-zinc-400 mb-2">
                    Verified through live practical video demonstrations on JobReels:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.skills?.map((s, i) => (
                      <span
                        key={i}
                        className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/40 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 active:scale-95 transition"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* DROPDOWN 2: EDUCATION & CERTIFICATIONS */}
            <div className="box-inset-3d overflow-hidden mb-2.5">
              <div className="flex items-center">
              <button
                type="button"
                onClick={() => toggleDropdown("education")}
                className="flex-1 flex items-center justify-between p-3.5 text-left hover:bg-zinc-950/40 active:scale-[0.99] active:shadow-md active:shadow-purple-500/25 transition-all cursor-pointer select-none"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-purple-900/40 text-purple-300 border border-purple-700/50 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider leading-none">
                      {t?.education || "Education & Certifications"}
                    </h4>
                    <span className="text-xs text-zinc-400 font-medium">
                      Degree & Verified Credentials
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                  openDropdowns.education ? "rotate-180 text-purple-400" : ""
                }`} />
              </button>
              <button
                type="button"
                onClick={() => onEditProfile?.('education')}
                className="p-2 mr-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 cursor-pointer active:scale-90 shrink-0"
                title="Edit education"
                aria-label="Edit education"
              >
                <Pencil className="w-3.5 h-3.5 text-purple-400" />
              </button>
              </div>

              {openDropdowns.education && (
                <div className="p-3 pt-1 border-t border-zinc-800/80 bg-zinc-950/40 animate-in fade-in duration-150">
                  <div className="box-inset-3d p-3 text-xs mt-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-white text-xs">{profile.education}</p>
                      <span className="bg-purple-900/40 text-purple-300 font-semibold text-xs px-2 py-0.5 rounded-md border border-purple-600/40">
                        Graduated
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Government ITI Bhosari • First Class with Distinction (84%)
                    </p>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-zinc-800 text-xs text-emerald-400/90 font-medium">
                      <span>✓ Degree Certificate Verified</span>
                      <span>•</span>
                      <span>✓ 100% Background Check Passed</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* DROPDOWN 3: PROJECT & WORK EXPERIENCE (ORGANIZATIONS + COLLEGE PROJECTS) */}
            <div className="box-inset-3d overflow-hidden mb-3">
              <div className="flex items-center">
              <button
                type="button"
                onClick={() => toggleDropdown("experience")}
                className="flex-1 flex items-center justify-between p-3.5 text-left hover:bg-zinc-950/40 active:scale-[0.99] active:shadow-md active:shadow-purple-500/25 transition-all cursor-pointer select-none"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-purple-900/40 text-purple-300 border border-purple-700/50 flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider leading-none">
                      Project & Work Experience
                    </h4>
                    <span className="text-xs text-zinc-400 font-medium">
                      {organizationsList.length} Organizations • {collegeProjects.length} College Projects
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                  openDropdowns.experience ? "rotate-180 text-purple-400" : ""
                }`} />
              </button>
              <button
                type="button"
                onClick={() => onEditProfile?.('projects')}
                className="p-2 mr-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 cursor-pointer active:scale-90 shrink-0"
                title="Edit experience"
                aria-label="Edit experience"
              >
                <Pencil className="w-3.5 h-3.5 text-purple-400" />
              </button>
              </div>

              {openDropdowns.experience && (
                <div className="p-3 pt-2 border-t border-zinc-800/80 bg-zinc-950/40 animate-in fade-in duration-150 space-y-3">
                  {/* PART 1: ORGANIZATIONS (COMPANY PROJECTS - STYLED EXACTLY AS REQUESTED) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-1 px-0.5 border-b border-zinc-800/60">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          Organizations (Company Projects)
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-purple-300 bg-purple-950/80 px-2.5 py-0.5 rounded border border-purple-800/40">
                        3
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-400 px-0.5">
                      Click organization to view production projects & deliverables:
                    </p>

                    <div className="space-y-2 pt-1">
                      {organizationsList.map((org) => {
                        const isOpen = openOrgId === org.id;
                        return (
                          <div
                            key={org.id}
                            className="box-inset-3d overflow-hidden transition-all mb-2"
                          >
                            {/* Organization Clickable Header (Dropdown Toggle) */}
                            <button
                              type="button"
                              onClick={() => toggleOrg(org.id)}
                              className="w-full flex items-center justify-between p-3 text-left hover:bg-zinc-950 transition cursor-pointer select-none"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-7 h-7 rounded-lg bg-purple-900/40 border border-purple-700/40 flex items-center justify-center text-purple-300 shrink-0">
                                  <Building2 className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <h5 className="text-xs font-bold text-white truncate">
                                      {org.name}
                                    </h5>
                                    <span className="text-[9px] font-semibold text-purple-300 bg-purple-950 px-1.5 py-0.2 rounded border border-purple-800/40">
                                      {org.status}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-zinc-400 truncate">
                                    {org.domain} • {org.projects.length} Projects
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 ml-2">
                                <span className="text-[11px] font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                                  {org.totalAccuracy}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                                  isOpen ? "rotate-180 text-purple-400" : ""
                                }`} />
                              </div>
                            </button>

                            {/* Expanded Projects Inside this Organization */}
                            {isOpen && (
                              <div className="p-3 pt-1 border-t border-zinc-800/80 bg-zinc-950/40 space-y-2 animate-in fade-in duration-150">
                                <div className="text-[10px] text-zinc-400 font-medium px-0.5 pb-1 flex items-center justify-between">
                                  <span>Projects in {org.name}:</span>
                                  <span className="text-purple-300 font-semibold">{org.projects.length} Verified Deliverables</span>
                                </div>

                                {org.projects.map((proj, pIdx) => (
                                  <div
                                    key={pIdx}
                                    className="box-inset-3d p-2.5 transition"
                                  >
                                    <div className="flex items-start justify-between gap-2 mb-1.5">
                                      <div className="min-w-0">
                                        <h6 className="text-xs font-bold text-white leading-tight truncate">
                                          {proj.name}
                                        </h6>
                                        <span className="text-[10px] text-zinc-400 block mt-0.5">
                                          {proj.sprint}
                                        </span>
                                      </div>
                                      <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md shrink-0 ${proj.accuracyBadge}`}>
                                        {proj.accuracy}
                                      </span>
                                    </div>

                                    {/* Visual Completion Progress Bar */}
                                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-1.5">
                                      <div
                                        className={`bg-gradient-to-r ${proj.progressGradient} h-full rounded-full transition-all duration-500`}
                                        style={{ width: `${proj.progress}%` }}
                                      ></div>
                                    </div>

                                    <div className="flex items-center justify-between text-[10px] mt-1.5 pt-1 border-t border-zinc-800/60">
                                      <span className="text-emerald-400 font-medium">{proj.status}</span>
                                      {proj.link && proj.link !== "#" && (
                                        <a
                                          href={proj.link}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold"
                                        >
                                          <span>Visit App</span>
                                          <ExternalLink className="w-3 h-3" />
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* PART 2: COLLEGE PROJECTS (ONLY PROJECT NAMES, NO ACCURACY, NO COMPANY) */}
                  <div className="space-y-2 pt-3 mt-3 border-t border-zinc-800/80">
                    <div className="flex items-center justify-between pb-1 px-0.5 border-b border-zinc-800/60">
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          College Projects
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                        Academic Work
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-400 px-0.5">
                      Engineering projects completed during college:
                    </p>

                    <div className="space-y-1.5 pt-1">
                      {collegeProjects.map((pName, pIdx) => (
                        <div
                          key={pIdx}
                          className="box-inset-3d p-2.5 flex items-center gap-2.5 transition"
                        >
                          <span className="w-5 h-5 rounded-md bg-purple-900/40 border border-purple-700/40 text-purple-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                            {pIdx + 1}
                          </span>
                          <span className="text-xs font-medium text-zinc-200">
                            {pName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PART 3: EXPERIENCE ADDED VIA REELS AI ASSISTANT */}
                  {profile.projectExperience && (
                    <div className="space-y-2 pt-3 mt-3 border-t border-zinc-800/80">
                      <div className="flex items-center gap-1.5 pb-1 px-0.5 border-b border-zinc-800/60">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          Added via Reels AI
                        </span>
                      </div>
                      <div className="box-inset-3d p-2.5 text-xs text-zinc-200 leading-relaxed">
                        {profile.projectExperience}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer QR / Scan Note */}
            <div className="bg-zinc-950/60 rounded-xl p-2.5 flex items-center justify-between text-xs text-zinc-400 border border-zinc-800">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-zinc-300 shrink-0" />
                <span className="text-xs">Scan on JobReels to view verified demo video.</span>
              </div>
              <span className="font-semibold text-purple-400 text-xs shrink-0">100% Free</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: APPLICATION STATUS TRACKER */}
      {activeTab === "applications" && (
        <div className="space-y-3">
          <p className="text-xs text-zinc-400">
            Real-time hiring status from HR (Applied ➔ Viewed ➔ Shortlisted ➔ Interview ➔ Selected):
          </p>
          {applications.map((app) => (
            <div
              key={app.id}
              className="box-inset-3d p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-bold text-sm text-white">{app.jobTitle}</h4>
                  <p className="text-xs text-zinc-400">{app.company}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[app.status] || "bg-zinc-800 text-zinc-300 border-zinc-700"}`}>
                  ● {app.status}
                </span>
              </div>

              {/* Status Stepper Progress */}
              <div className="flex items-center justify-between my-3 px-1 text-xs font-semibold text-zinc-500">
                <span className={app.status !== "Rejected" ? "text-purple-400 font-bold" : ""}>1. Applied</span>
                <span>➔</span>
                <span className={["Viewed", "Shortlisted", "Interview", "Selected"].includes(app.status) ? "text-purple-400 font-bold" : ""}>2. Viewed</span>
                <span>➔</span>
                <span className={["Shortlisted", "Interview", "Selected"].includes(app.status) ? "text-indigo-300 font-bold" : ""}>3. Shortlist</span>
                <span>➔</span>
                <span className={["Interview", "Selected"].includes(app.status) ? "text-emerald-400 font-bold animate-pulse" : ""}>4. Interview</span>
                <span>➔</span>
                <span className={app.status === "Selected" ? "text-teal-300 font-bold" : ""}>5. Selected</span>
              </div>

              {app.interviewDetails && (
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 text-xs mt-2">
                  <span className="text-emerald-400 font-bold block mb-1">
                    🎉 Interview Trial Confirmed: {app.interviewDetails.date} at {app.interviewDetails.time}
                  </span>
                  <p className="text-xs text-zinc-300">{app.interviewDetails.address}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: SAVED JOBS */}
      {activeTab === "saved" && (
        <div className="space-y-3">
          {savedJobs.length === 0 ? (
            <div className="text-center py-10 bg-zinc-900/60 rounded-2xl border border-zinc-800">
              <Bookmark className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
              <p className="text-xs text-zinc-400 font-medium">No saved jobs yet.</p>
              <p className="text-xs text-zinc-500 mt-1">Tap the bookmark icon on any job card to save it here.</p>
            </div>
          ) : (
            savedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3.5 flex items-center gap-3 shadow-sm hover:border-purple-500/30 transition"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-900/40 border border-purple-700/50 text-purple-300 flex items-center justify-center shrink-0">
                  <Bookmark className="w-4 h-4 fill-purple-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs text-white truncate">{job.title}</h4>
                  <p className="text-xs text-zinc-400 truncate">{job.company} • {job.location}</p>
                  <p className="text-xs font-bold text-purple-400 mt-0.5">{job.salary}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Footer Branding Note */}
      <div className="mt-6 pt-4 border-t border-zinc-800 text-center text-xs text-zinc-500">
        JobReels • 100% Free Verified Career Discovery Platform
      </div>

      {/* 4. DEDICATED PRINT-ONLY A4 RESUME (HIDDEN ON SCREEN, VISIBLE ONLY IN PRINT/PDF) */}
      <div id="jobreels-printable-resume" className="hidden print:block bg-white text-slate-900 font-sans">
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px', border: '2px solid #7c3aed', borderRadius: '14px', background: '#ffffff', color: '#0f172a' }}>
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #e2e8f0', paddingBottom: '16px', marginBottom: '16px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: '0 0 4px 0' }}>
                {profile.name}
              </h1>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#7c3aed', marginBottom: '8px' }}>
                {profile.headline}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '11px', color: '#475569', fontWeight: '600' }}>
                <span>📍 Location: {profile.location}</span>
                <span>📞 Phone: {profile.phone}</span>
                <span>💰 Expected: {profile.expectedSalary}</span>
                <span>⏱️ Experience: {profile.experience}</span>
              </div>
            </div>
            <div style={{ textAlign: 'center', border: '2px solid #10b981', borderRadius: '8px', padding: '6px 10px', background: '#ecfdf5', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#059669', fontSize: '14px', fontWeight: 'bold' }}>✓</span>
              <span style={{ color: '#059669', fontSize: '11px', fontWeight: '700' }}>Verified</span>
            </div>
          </div>

          {/* Section: Core Skills */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px' }}>
              Core Technical Skills (Video Verified)
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {profile.skills?.map((s, i) => (
                <span key={i} style={{ background: '#faf5ff', color: '#6d28d9', border: '1px solid #e9d5ff', fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '6px' }}>
                  ✓ {s}
                </span>
              ))}
            </div>
          </div>

          {/* Section: Education */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px' }}>
              Education & Certifications
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 14px', borderRadius: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', margin: '0 0 2px 0' }}>
                {profile.education}
              </div>
              <div style={{ fontSize: '11px', color: '#475569' }}>
                Government ITI Bhosari • First Class with Distinction (84%)
              </div>
              <div style={{ fontSize: '10px', color: '#7c3aed', fontWeight: '700', marginTop: '4px' }}>
                ✓ Degree Certificate Verified &bull; 100% Background Check Passed
              </div>
            </div>
          </div>

          {/* Section: Project & Work Experience */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px' }}>
              Project & Work Experience
            </div>

            {/* Organizations (Company Projects) */}
            <div style={{ fontSize: '11px', fontWeight: '800', color: '#6d28d9', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
              Organizations & Company Experience:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
              {organizationsList.map((org, oIdx) => (
                <div key={oIdx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', borderBottom: '1px solid #e2e8f0', paddingBottom: '3px' }}>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a' }}>🏢 {org.name}</span>
                      <span style={{ fontSize: '10px', color: '#64748b', marginLeft: '6px' }}>({org.domain})</span>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: '#059669', background: '#ecfdf5', padding: '1px 6px', borderRadius: '4px', border: '1px solid #a7f3d0' }}>
                      {org.totalAccuracy}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                    {org.projects.map((proj, pIdx) => (
                      <div key={pIdx} style={{ fontSize: '11px', color: '#1e293b', paddingLeft: '4px' }}>
                        <span style={{ fontWeight: '700', color: '#0f172a' }}>&bull; {proj.name}</span>
                        <span style={{ fontSize: '9px', fontWeight: '800', color: '#6d28d9', marginLeft: '6px' }}>({proj.accuracy})</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* College Projects */}
            <div style={{ fontSize: '11px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
              College Projects:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {collegeProjects.map((projName, idx) => (
                <div key={idx} style={{ fontSize: '11px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#7c3aed', fontWeight: '700' }}>&bull;</span>
                  <span style={{ fontWeight: '600' }}>{projName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Note */}
          <div style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: '#64748b' }}>
            <span><strong style={{ color: '#7c3aed' }}>JobReels</strong> &bull; 100% Free Verified Career Discovery Platform</span>
            <span>Issued on {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
