import React, { useState } from 'react';
import { Video, Briefcase, Plus, CheckCircle, UploadCloud, RefreshCw, Sparkles, Building2 } from 'lucide-react';

export const PostModal = ({ isOpen, onClose, onAddJob, onAddReel, t }) => {
  const [activeTab, setActiveTab] = useState("job"); // "job" or "skill_reel"

  // Job Form State (HR)
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("TechNova Solutions Ltd.");
  const [category, setCategory] = useState("Tech & Software");
  const [salary, setSalary] = useState("₹35,000 - ₹50,000 / month");
  const [location, setLocation] = useState("Pune / Bangalore / Mumbai");
  const [vacancies, setVacancies] = useState("5");
  const [jobType, setJobType] = useState("Full Time");
  const [workingHours, setWorkingHours] = useState("9:30 AM - 6:30 PM (Mon - Fri)");
  const [education, setEducation] = useState("Graduate / Diploma / Degree");
  const [experience, setExperience] = useState("1 - 3 Years");
  const [description, setDescription] = useState("");
  const [contactPhone, setContactPhone] = useState("+91 72762 93084");

  // Video Reel Form State with Cloudinary Upload
  const [reelTitle, setReelTitle] = useState("");
  const [reelCategory, setReelCategory] = useState("Tech & Software");
  const [reelCaption, setReelCaption] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  if (!isOpen) return null;

  // Real File Upload to Cloudinary using keys
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setVideoFile(file);
    const localUrl = URL.createObjectURL(file);
    setVideoPreviewUrl(localUrl);

    // Upload to Cloudinary (jobreels cloud)
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "jobreels";
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "ew6soz31";

    setIsUploading(true);
    setUploadProgress(10);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      setUploadProgress(40);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
        method: "POST",
        body: formData
      });

      setUploadProgress(85);
      const data = await res.json();

      if (data.secure_url) {
        setVideoPreviewUrl(data.secure_url);
        console.log("Uploaded successfully to Cloudinary:", data.secure_url);
      } else {
        console.log("Cloudinary fallback to local preview:", data.error?.message);
      }
      setUploadProgress(100);
    } catch (err) {
      console.log("Direct upload fallback to local stream:", err.message);
      setUploadProgress(100);
    } finally {
      setTimeout(() => setIsUploading(false), 500);
    }
  };

  const handlePostJob = (e) => {
    e.preventDefault();
    if (!jobTitle) return;

    const newJob = {
      id: `job-${Date.now()}`,
      title: jobTitle,
      company: company,
      category: category,
      salary: salary,
      salaryNumeric: 32000,
      location: location,
      state: "Maharashtra",
      vacancies: parseInt(vacancies) || 5,
      jobType: jobType,
      workingHours: workingHours,
      education: education,
      experience: experience,
      verified: true,
      postedDaysAgo: "Just now",
      description: description || `Urgent hiring for ${jobTitle} at ${location}. 0% Brokerage & direct company placement.`,
      benefits: ["Health Insurance", "Performance Bonus", "Flexible Shifts"],
      googleMapsQuery: "Business+Park+Pune",
      contact: contactPhone
    };

    onAddJob(newJob);
    onClose();
  };

  const handlePostReel = (e) => {
    e.preventDefault();
    if (!reelTitle) return;

    const finalVideoUrl = videoPreviewUrl || "/videos/reel1.mp4";

    const newReel = {
      id: `reel-${Date.now()}`,
      type: "candidate_skill",
      creator: {
        name: "Verified JobReels Specialist",
        handle: "@jobreels_creator",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        verified: true,
        role: "Skill Creator"
      },
      videoUrl: finalVideoUrl,
      poster: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
      caption: reelCaption || `${reelTitle} - Practical site demonstration & walkthrough.`,
      skills: [reelCategory, "Certified", "7/12 Title Verified"],
      location: "Talegaon / Chakan Belt, Pune",
      likes: 1,
      comments: 0,
      shares: 0,
      appliedJobId: null
    };

    onAddReel(newReel);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-3 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl p-5 max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl">
        {/* Header Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("job")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === "job"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              Post Job (Employer / HR)
            </button>
            <button
              onClick={() => setActiveTab("skill_reel")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === "skill_reel"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <Video className="w-4 h-4" />
              Upload Video Reel
            </button>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* TAB 1: POST A REAL ESTATE JOB */}
        {activeTab === "job" && (
          <form onSubmit={handlePostJob} className="space-y-3">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                0% Brokerage • 100% Free Direct Hiring
              </span>
              <h3 className="font-extrabold text-sm text-white">Publish Open Real Estate Position</h3>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Job Title *</label>
              <input
                type="text"
                required
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Plot Sales Consultant, Civil Site Supervisor"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="Plot Sales & Real Estate">Plot Sales & Marketing</option>
                  <option value="Site Supervision & Civil">Civil Site Supervisor</option>
                  <option value="Land Survey & Demarcation">Land Surveyor (Total Station)</option>
                  <option value="Telecalling & Customer Care">Telecaller & CRM</option>
                  <option value="Heavy Machinery & Earthmoving">JCB & Machine Operator</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Monthly Salary *</label>
                <input
                  type="text"
                  required
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Site / Office Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">HR Contact Phone</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Role Description & Perks</label>
              <textarea
                rows="2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mention cab pickup for site visits, incentives per plot, shift timings..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs py-3 rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              Publish Free Job Post (Instant Live)
            </button>
          </form>
        )}

        {/* TAB 2: UPLOAD VIDEO REEL TO CLOUDINARY */}
        {activeTab === "skill_reel" && (
          <form onSubmit={handlePostReel} className="space-y-3">
            <div>
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                Cloudinary Storage Connected (jobreels cloud)
              </span>
              <h3 className="font-extrabold text-sm text-white">Upload 9:16 Site / Skill Video</h3>
            </div>

            {/* Real File Input for Video */}
            <div className="relative border-2 border-dashed border-slate-700 hover:border-rose-500 rounded-2xl p-5 text-center bg-slate-800/40 hover:bg-slate-800/80 transition-all cursor-pointer">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {isUploading ? (
                <div className="py-2">
                  <RefreshCw className="w-8 h-8 text-rose-400 mx-auto mb-2 animate-spin" />
                  <p className="text-xs font-bold text-white">Uploading to Cloudinary: {uploadProgress}%</p>
                  <div className="w-48 h-1.5 bg-slate-700 rounded-full mx-auto mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-rose-500 transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              ) : videoFile ? (
                <div>
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-1.5" />
                  <p className="text-xs font-bold text-emerald-300">{videoFile.name}</p>
                  <p className="text-[10px] text-slate-400">Ready for instant national stream</p>
                </div>
              ) : (
                <div>
                  <UploadCloud className="w-8 h-8 text-rose-400 mx-auto mb-1.5" />
                  <p className="text-xs font-bold text-slate-200">Tap to Select 9:16 Video File</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">MP4 / MOV up to 100MB • Auto-compresses on Cloudinary</p>
                </div>
              )}
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Reel Title *</label>
              <input
                type="text"
                required
                value={reelTitle}
                onChange={(e) => setReelTitle(e.target.value)}
                placeholder="e.g. Talegaon NA Plot Layout Walkthrough, DGPS Demarcation Demo"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Category</label>
              <select
                value={reelCategory}
                onChange={(e) => setReelCategory(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none"
              >
                <option value="Plot Sales & Real Estate">NA Plot Walkthrough / Sales</option>
                <option value="Site Supervision & Civil">Civil Construction & Road Work</option>
                <option value="Land Survey & Demarcation">Land Demarcation & Survey</option>
                <option value="Heavy Machinery & Earthmoving">JCB 3DX & Excavator Action</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Short Caption</label>
              <textarea
                rows="2"
                value={reelCaption}
                onChange={(e) => setReelCaption(e.target.value)}
                placeholder="Mention plot location, 7/12 extract status, RERA number, or machine skills..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 disabled:opacity-50 text-white font-extrabold text-xs py-3 rounded-2xl shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-1.5"
            >
              <Video className="w-4 h-4" />
              Upload & Stream in National Reels Feed
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
