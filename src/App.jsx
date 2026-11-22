import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { translations } from './localization/translations';
import { 
  initialReels, 
  initialJobs, 
  candidateProfile as initialCandidateProfile, 
  initialApplications, 
  initialChatMessages, 
  initialFraudReports 
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ReelsFeed } from './components/ReelsFeed';
import { SearchJobs } from './components/SearchJobs';
import { PostModal } from './components/PostModal';
import { ChatView } from './components/ChatView';
import { ProfileView } from './components/ProfileView';
import { EmployerPanel } from './components/EmployerPanel';
import { AdminPanel } from './components/AdminPanel';
import { ReportModal } from './components/ReportModal';
import { AuthFlow } from './components/auth/AuthFlow';
import { PhoneLogin } from './components/auth/PhoneLogin';
import { RoleSelect } from './components/auth/RoleSelect';
import { ProfileSetup } from './components/auth/ProfileSetup';
import { useClerk } from '@clerk/react';

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const clerk = useClerk();

  // App Global State
  const [currentRole, setCurrentRole] = useState("candidate"); // "candidate", "employer", "admin"
  const [language, setLanguage] = useState("en"); // "en", "hi", "mr"
  const [toastMessage, setToastMessage] = useState(null);

  // Authentication & Onboarding State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authStep, setAuthStep] = useState("phone"); // "phone" | "role" | "profile"
  const [authPhone, setAuthPhone] = useState("");
  const [selectedRole, setSelectedRole] = useState("candidate");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(initialCandidateProfile);

  // Restore authenticated session on app launch
  useEffect(() => {
    try {
      const saved = localStorage.getItem("jobreels_user_session");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.isLoggedIn && parsed.phone) {
          const cleanPhone = parsed.phone.replace(/\D/g, "");
          const lockedRole = localStorage.getItem(`jobreels_role_${cleanPhone}`) || parsed.role || "candidate";
          setIsLoggedIn(true);
          setAuthPhone(cleanPhone);
          setCurrentRole(lockedRole);
          setUserProfile(parsed.profile || initialCandidateProfile);
          return;
        }
      }
    } catch (e) {
      console.warn("Session restore error:", e);
    }
    setIsLoggedIn(false);
  }, []);

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      title: "Interview Scheduled!",
      message: "CloudScale Tech Solutions scheduled your interview on Monday 24 Nov at 11:30 AM.",
      time: "10 mins ago"
    },
    {
      id: "notif-2",
      title: "Reel Trending!",
      message: "Your Interactive Web App reel crossed 5,240 views across the tech hiring feed.",
      time: "2 hours ago"
    }
  ]);

  // Data Collections
  const [reels, setReels] = useState(initialReels);
  const [jobs, setJobs] = useState(initialJobs);
  const [appliedJobIds, setAppliedJobIds] = useState(["job-101"]);
  const [savedJobIds, setSavedJobIds] = useState(["job-102"]);
  const [applications, setApplications] = useState(initialApplications);
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [fraudReports, setFraudReports] = useState(initialFraudReports);

  // Modals
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState(null);

  const t = translations[language] || translations.en;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Login Success Handler (Multi-User Persistence by Mobile Number)
  const handleLoginSuccess = (role, profileData) => {
    setIsLoggedIn(true);
    setCurrentRole(role);
    setUserProfile(profileData);

    const cleanPhone = profileData.phone?.replace(/\D/g, "") || "default";
    localStorage.setItem(`jobreels_user_${cleanPhone}`, JSON.stringify(profileData));
    localStorage.setItem("jobreels_user_session", JSON.stringify({
      isLoggedIn: true,
      phone: cleanPhone,
      role: role,
      profile: profileData
    }));

    showToast(`✓ Welcome ${profileData.name || profileData.companyName}! Logged in as ${profileData.phone}`);
  };

  const finishAuth = (role, customProfile, explicitPhone) => {
    const activePhone = explicitPhone || authPhone;
    const cleanPhone = (activePhone || "").replace(/\D/g, "");
    const lockedRole = localStorage.getItem(`jobreels_role_${cleanPhone}`) || role;
    if (cleanPhone) {
      localStorage.setItem(`jobreels_role_${cleanPhone}`, lockedRole);
    }

    let finalProfile = customProfile;
    if (!finalProfile) {
      if (lockedRole === "employer") {
        finalProfile = {
          companyName: "TechNova Solutions Ltd.",
          companyType: "Technology & Digital Services",
          location: "Hinjewadi Phase 1, Pune",
          hrName: "HR Team",
          hrPhone: `+91 ${cleanPhone}`,
          gstin: "CIN: U72200PN2021PTC19841",
          verified: true
        };
      } else {
        finalProfile = {
          ...initialCandidateProfile,
          phone: `+91 ${cleanPhone}`,
          name: "Verified Candidate"
        };
      }
    }

    setIsLoggedIn(true);
    setCurrentRole(lockedRole);
    setUserProfile(finalProfile);

    if (cleanPhone) {
      localStorage.setItem(`jobreels_profile_${cleanPhone}`, JSON.stringify(finalProfile));
      localStorage.setItem(
        "jobreels_user_session",
        JSON.stringify({
          isLoggedIn: true,
          phone: cleanPhone,
          role: lockedRole,
          profile: finalProfile
        })
      );
    }

    showToast(`✓ Welcome! Logged in as +91 ${cleanPhone} (${lockedRole === 'candidate' ? 'Job Seeker' : lockedRole === 'employer' ? 'Company HR' : 'Admin'})`);

    if (lockedRole === "employer") {
      navigate("/employer");
    } else if (lockedRole === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const handleLogout = async () => {
    try {
      if (clerk && clerk.signOut) {
        await clerk.signOut();
      }
    } catch (err) {
      console.warn("Clerk signOut error:", err);
    }
    localStorage.removeItem("jobreels_user_session");
    setIsLoggedIn(false);
    setAuthStep("phone");
    setAuthPhone("");
    navigate("/");
    showToast("✓ Logged out successfully.");
  };

  // Role Switcher with Multi-Page Navigation
  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
    if (newRole === "employer") {
      navigate("/employer");
    } else if (newRole === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  // One-Tap Apply Action
  const handleApplyJob = (job) => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
      showToast("Please enter your Mobile Number & OTP to submit your application.");
      return;
    }

    if (appliedJobIds.includes(job.id)) return;

    setAppliedJobIds((prev) => [...prev, job.id]);

    const newApp = {
      id: `app-${Date.now()}`,
      candidateName: userProfile.name,
      candidatePhoto: userProfile.avatar,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      status: "Applied",
      appliedDate: "Just now",
      experience: userProfile.experience,
      location: userProfile.location,
      skillReelTitle: "Verified Skill Demonstration",
      interviewDetails: null
    };

    setApplications((prev) => [newApp, ...prev]);

    // Push live notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: "Application Submitted! 🎉",
        message: `Your verified profile was sent directly to HR at ${job.company} for "${job.title}".`,
        time: "Just now"
      },
      ...prev
    ]);

    showToast(`✓ Applied successfully to ${job.company}! HR will review your digital resume.`);
  };

  // Toggle Save Job
  const handleToggleSaveJob = (jobId) => {
    if (savedJobIds.includes(jobId)) {
      setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
      showToast("Job removed from saved bookmarks.");
    } else {
      setSavedJobIds((prev) => [...prev, jobId]);
      showToast("Job bookmarked! View under Profile > Saved Jobs.");
    }
  };

  // Post Modal Handlers (+ Button)
  const handleAddJob = (newJobData) => {
    const createdJob = {
      id: `job-${Date.now()}`,
      postedDaysAgo: "Just now",
      verified: true,
      salaryNumeric: parseInt(newJobData.salary?.replace(/\D/g, "") || "30000"),
      ...newJobData
    };
    setJobs((prev) => [createdJob, ...prev]);
    showToast(`✓ Vacancy for "${createdJob.title}" posted successfully!`);
  };

  const handleAddReel = (newReelData) => {
    const createdReel = {
      id: `reel-${Date.now()}`,
      likes: 1,
      comments: 0,
      shares: 0,
      creator: {
        name: userProfile.name,
        handle: `@${userProfile.name.toLowerCase().replace(/\s+/g, "_")}`,
        avatar: userProfile.avatar,
        verified: true,
        role: currentRole === "employer" ? "Verified Employer" : userProfile.headline
      },
      ...newReelData
    };
    setReels((prev) => [createdReel, ...prev]);
    showToast("✓ Skill video reel published to feed! Visible across India.");
    navigate("/");
  };

  // Employer Pipeline Actions
  const handleUpdateAppStatus = (appId, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
    );
    showToast(`Status updated to: ${newStatus}`);
  };

  const handleScheduleInterview = (appId, interviewData) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? {
              ...app,
              status: "Interview",
              interviewDetails: {
                date: interviewData.date,
                time: interviewData.time,
                address: interviewData.address,
                googleMapsQuery: encodeURIComponent(interviewData.address)
              }
            }
          : app
      )
    );

    const targetApp = applications.find((a) => a.id === appId);

    // Send in-app chat invite
    const interviewChatMsg = {
      id: `msg-${Date.now()}`,
      sender: "employer",
      senderName: `${userProfile.companyName || "Hiring Manager"} (Direct HR)`,
      text: `Hello ${targetApp?.candidateName}! We are pleased to invite you for a direct interview.`,
      timestamp: "Just now",
      isInterviewCard: true,
      interviewDetails: {
        role: targetApp?.jobTitle,
        company: targetApp?.company,
        date: interviewData.date,
        time: interviewData.time,
        address: interviewData.address,
        googleMapsQuery: encodeURIComponent(interviewData.address),
        contactPerson: `${userProfile.hrName || "HR"} (${userProfile.phone || "+91 7276293084"})`
      }
    };

    setChatMessages((prev) => [...prev, interviewChatMsg]);
    showToast(`✓ Interview trial scheduled and invitation sent to candidate.`);
  };

  // Chat message send
  const handleSendMessage = (text) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: currentRole === "employer" ? "employer" : "candidate",
      senderName: userProfile.name,
      text: text,
      timestamp: "Just now",
      isInterviewCard: false
    };
    setChatMessages((prev) => [...prev, newMsg]);
  };

  // Anti-Fraud Actions
  const handleResolveReport = (reportId, action) => {
    setFraudReports((prev) => prev.filter((r) => r.id !== reportId));
    showToast(`Report ${reportId} resolved with action: ${action}`);
  };

  const handleVerifyJob = (jobId) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, verified: true } : j))
    );
    showToast(`Job ${jobId} certified as 100% Free & Verified.`);
  };

  const savedJobsList = jobs.filter((j) => savedJobIds.includes(j.id));

  // Determine if bottom nav should be displayed (pages: /, /jobs, /chat, /profile)
  const isCandidateRoute = ["/", "/jobs", "/chat", "/profile"].includes(location.pathname);

  // Mandatory Login Gate (Phone Login -> Role Select -> Profile [or Skip])
  if (!isLoggedIn) {
    if (authStep === "phone") {
      return (
        <PhoneLogin
          onPhoneVerified={(phone) => {
            const cleanPhone = (phone || "").replace(/\D/g, "");
            setAuthPhone(cleanPhone);
            const lockedRole = localStorage.getItem(`jobreels_role_${cleanPhone}`);
            if (lockedRole) {
              setSelectedRole(lockedRole);
              const savedProfileStr = localStorage.getItem(`jobreels_profile_${cleanPhone}`);
              let savedProfile = null;
              if (savedProfileStr) {
                try {
                  savedProfile = JSON.parse(savedProfileStr);
                } catch (e) {}
              }
              finishAuth(lockedRole, savedProfile, cleanPhone);
            } else {
              setAuthStep("role");
            }
          }}
          language={language}
          t={t}
        />
      );
    }

    if (authStep === "role") {
      return (
        <RoleSelect
          phone={authPhone}
          onRoleSelect={(role) => {
            localStorage.setItem(`jobreels_role_${authPhone}`, role);
            setSelectedRole(role);
            if (role === "admin") {
              finishAuth(
                "admin",
                {
                  name: "System Admin",
                  phone: `+91 ${authPhone}`,
                  role: "admin",
                  verified: true
                },
                authPhone
              );
            } else {
              setAuthStep("profile");
            }
          }}
        />
      );
    }

    if (authStep === "profile") {
      return (
        <ProfileSetup
          role={selectedRole}
          phone={authPhone}
          onComplete={(profile) => finishAuth(selectedRole, profile, authPhone)}
          onSkip={() => finishAuth(selectedRole, null, authPhone)}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-start p-0 sm:py-6 selection:bg-purple-600 selection:text-white">
      {/* Toast Banner with Light Purple Glow */}
      {toastMessage && (
        <div className="fixed top-3 z-50 bg-purple-600 text-white font-semibold text-xs py-2 px-4 rounded-full shadow-xl shadow-purple-900/50 animate-in slide-in-from-top border border-purple-400/40 flex items-center gap-1.5">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Device Mockup Container */}
      <div className="w-full max-w-md min-h-screen sm:min-h-[844px] bg-zinc-950 sm:rounded-[36px] overflow-hidden border sm:border-zinc-800 shadow-2xl relative flex flex-col">
        {/* App Header with Notification Bell, Language, and Multi-User Login */}
        <Header
          currentRole={currentRole}
          language={language}
          setLanguage={setLanguage}
          isLoggedIn={isLoggedIn}
          onOpenLogin={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          userProfile={userProfile}
          notifications={notifications}
          onNavigateProfile={() => navigate("/profile")}
          t={t}
        />

        {/* Main Multi-Page Route Content */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          <Routes>
            {/* Page 1: Reels Feed (/) */}
            <Route
              path="/"
              element={
                <ReelsFeed
                  reels={reels}
                  onApplyJob={handleApplyJob}
                  appliedJobIds={appliedJobIds}
                  onReport={(reel) => setReportTarget(reel)}
                  t={t}
                />
              }
            />

            {/* Page 2: Jobs Search & Filter (/jobs) */}
            <Route
              path="/jobs"
              element={
                <SearchJobs
                  jobs={jobs}
                  onApplyJob={handleApplyJob}
                  appliedJobIds={appliedJobIds}
                  savedJobIds={savedJobIds}
                  onToggleSaveJob={handleToggleSaveJob}
                  onReport={(job) => setReportTarget(job)}
                  t={t}
                />
              }
            />

            {/* Page 3: In-App Chat & Interview Invites (/chat) */}
            <Route
              path="/chat"
              element={
                <ChatView
                  messages={chatMessages}
                  onSendMessage={handleSendMessage}
                  currentRole={currentRole}
                  userProfile={userProfile}
                  t={t}
                />
              }
            />

            {/* Page 4: User Profile & Digital Resume (/profile) */}
            <Route
              path="/profile"
              element={
                <ProfileView
                  profile={userProfile}
                  applications={applications}
                  savedJobs={savedJobsList}
                  onApplyJob={handleApplyJob}
                  appliedJobIds={appliedJobIds}
                  onLogout={handleLogout}
                  onOpenLogin={() => setIsAuthModalOpen(true)}
                  language={language}
                  setLanguage={setLanguage}
                  t={t}
                />
              }
            />

            {/* Page 5: Employer / HR Dashboard (/employer) */}
            <Route
              path="/employer"
              element={
                <EmployerPanel
                  jobs={jobs}
                  applications={applications}
                  onUpdateAppStatus={handleUpdateAppStatus}
                  onOpenPostModal={() => {
                    if (!isLoggedIn) {
                      setIsAuthModalOpen(true);
                    } else {
                      setIsPostModalOpen(true);
                    }
                  }}
                  onScheduleInterview={handleScheduleInterview}
                  t={t}
                />
              }
            />

            {/* Page 6: Admin Anti-Fraud Console (/admin) */}
            <Route
              path="/admin"
              element={
                <AdminPanel
                  fraudReports={fraudReports}
                  onResolveReport={handleResolveReport}
                  jobs={jobs}
                  onVerifyJob={handleVerifyJob}
                  t={t}
                />
              }
            />
          </Routes>
        </main>

        {/* Bottom Nav: Active across candidate pages */}
        {isCandidateRoute && (
          <BottomNav
            onOpenPostModal={() => {
              if (!isLoggedIn) {
                setIsAuthModalOpen(true);
              } else {
                setIsPostModalOpen(true);
              }
            }}
            t={t}
            unreadMessages={1}
          />
        )}
      </div>

      {/* Multi-User Mobile OTP & Profile Creation Wizard */}
      <AuthFlow
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        defaultRole={currentRole}
        language={language}
        t={t}
      />

      {/* Post Modal (+ Button Flow) */}
      <PostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onAddJob={handleAddJob}
        onAddReel={handleAddReel}
        t={t}
      />

      {/* Anti-Fraud Report Modal */}
      <ReportModal
        isOpen={!!reportTarget}
        targetItem={reportTarget}
        onClose={() => setReportTarget(null)}
        onSubmitReport={(r) => {
          setFraudReports((prev) => [r, ...prev]);
          showToast("Report submitted to admin review. Thank you for keeping JobReels safe!");
        }}
        t={t}
      />
    </div>
  );
};

export default App;
