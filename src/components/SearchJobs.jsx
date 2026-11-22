import React, { useState } from 'react';
import { 
  Search, MapPin, CheckCircle, Briefcase, 
  Bookmark, Share2, Filter, AlertTriangle, X, SlidersHorizontal, Sparkles
} from 'lucide-react';

export const SearchJobs = ({ 
  jobs = [], 
  onApplyJob, 
  appliedJobIds = [], 
  savedJobIds = [], 
  onToggleSaveJob, 
  onReport,
  t 
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedJobType, setSelectedJobType] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const categories = [
    { id: "all", label: "All Industries" },
    { id: "Tech & Software", label: "💻 Tech & Software" },
    { id: "Sales & Marketing", label: "📈 Sales & Marketing" },
    { id: "Delivery & Logistics", label: "🚚 Delivery & Logistics" },
    { id: "Customer Support & BPO", label: "🎧 Customer Support" },
    { id: "Accounts & Finance", label: "📊 Accounts & Finance" },
    { id: "Design & Creative", label: "🎨 Design & Media" }
  ];

  const jobTypes = [
    { id: "all", label: "All Types" },
    { id: "Full Time", label: "Full Time" },
    { id: "Hybrid", label: "Hybrid" },
    { id: "Remote", label: "Remote / WFH" }
  ];

  const experienceLevels = [
    { id: "all", label: "All Experience" },
    { id: "fresher", label: "Fresher Friendly" },
    { id: "1-3", label: "1 - 3 Years" },
    { id: "3+", label: "3+ Years" }
  ];

  // Active filters count
  const activeFiltersCount = 
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedJobType !== "all" ? 1 : 0) +
    (selectedExperience !== "all" ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedJobType("all");
    setSelectedExperience("all");
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.category && job.category.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === "all" || job.category === selectedCategory;

    const matchesJobType = 
      selectedJobType === "all" || (job.jobType && job.jobType.includes(selectedJobType));

    const matchesExp = 
      selectedExperience === "all" ||
      (selectedExperience === "fresher" && (job.experience.toLowerCase().includes("fresher") || job.experience.includes("0"))) ||
      (selectedExperience === "1-3" && (job.experience.includes("1") || job.experience.includes("2") || job.experience.includes("3"))) ||
      (selectedExperience === "3+" && (job.experience.includes("3") || job.experience.includes("4") || job.experience.includes("5")));

    return matchesSearch && matchesCategory && matchesJobType && matchesExp;
  });

  const handleShareJobWhatsApp = (job, e) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Job Opening: ${job.title} at ${job.company}\nSalary: ${job.salary}\nLocation: ${job.location}\nApply directly on JobReels: https://jobreels.io/jobs/${job.id}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto">
      {/* Search Bar with Light Purple Filter Icon */}
      <div className="flex items-center gap-2 mb-3.5">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t?.searchPlaceholder || "Search jobs, roles, skills, or city..."}
            className="w-full input-3d rounded-xl pl-10 pr-8 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none transition font-normal"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-zinc-400 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Icon Button (Light Purple with Click Shadow) */}
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className={`h-9 px-3 rounded-xl border flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-95 active:shadow-lg active:shadow-purple-500/40 shrink-0 cursor-pointer ${
            activeFiltersCount > 0
              ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-900/40 font-semibold"
              : "bg-zinc-900 hover:bg-zinc-850 border-zinc-800 text-zinc-300"
          }`}
          title="Filter Openings"
        >
          <Filter className="w-4 h-4" />
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-white text-purple-700 text-xs font-bold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Active Filter Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-2 text-xs">
          <span className="text-zinc-400 font-medium text-xs">Filters:</span>
          {selectedCategory !== "all" && (
            <span className="bg-purple-950/50 border border-purple-800/60 text-purple-300 px-2.5 py-0.5 rounded-lg flex items-center gap-1.5 text-xs">
              {selectedCategory}
              <button onClick={() => setSelectedCategory("all")} className="hover:text-white cursor-pointer">✕</button>
            </span>
          )}
          {selectedJobType !== "all" && (
            <span className="bg-purple-950/50 border border-purple-800/60 text-indigo-300 px-2.5 py-0.5 rounded-lg flex items-center gap-1.5 text-xs">
              {selectedJobType}
              <button onClick={() => setSelectedJobType("all")} className="hover:text-white cursor-pointer">✕</button>
            </span>
          )}
          {selectedExperience !== "all" && (
            <span className="bg-purple-950/50 border border-purple-800/60 text-purple-200 px-2.5 py-0.5 rounded-lg flex items-center gap-1.5 text-xs">
              {selectedExperience}
              <button onClick={() => setSelectedExperience("all")} className="hover:text-white cursor-pointer">✕</button>
            </span>
          )}
          <button 
            onClick={clearAllFilters}
            className="text-xs text-zinc-400 hover:text-rose-400 font-semibold ml-1 cursor-pointer active:scale-95"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Jobs Result Summary */}
      <div className="flex items-center justify-between text-xs text-zinc-400 mb-2.5 px-0.5">
        <span>Showing <strong className="text-white">{filteredJobs.length}</strong> verified openings</span>
        <span className="text-xs text-purple-300 font-semibold">100% Free Apply</span>
      </div>

      {/* Jobs List (TaskBoard Dark Zinc Cards with Light Purple Accents & Click Shadow) */}
      <div className="space-y-3">
        {filteredJobs.length === 0 ? (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 text-center">
            <Briefcase className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
            <h4 className="font-bold text-sm text-white mb-1">No matching openings found</h4>
            <p className="text-xs text-zinc-400 mb-4">Try clearing filters or search with another keyword.</p>
            <button
              onClick={() => { setSearchQuery(""); clearAllFilters(); }}
              className="px-4 py-2 rounded-xl btn-purple text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => {
            const isApplied = appliedJobIds.includes(job.id);
            const isSaved = savedJobIds.includes(job.id);

            return (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="bg-zinc-900 border border-zinc-800 hover:border-purple-500/40 rounded-2xl p-4 shadow-sm transition-all duration-150 active:scale-[0.99] active:shadow-md active:shadow-purple-500/20 cursor-pointer relative"
              >
                {/* Header: Title, Company, Category Tag */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <span className="bg-purple-950/40 border border-purple-800/40 text-purple-300 text-xs font-medium px-2 py-0.5 rounded-md inline-block mb-1.5">
                      {job.category || "General"}
                    </span>
                    <h3 className="font-bold text-sm text-white leading-snug">
                      {job.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-medium flex items-center gap-1.5 mt-0.5">
                      {job.company}
                      {job.verified && (
                        <CheckCircle className="w-3.5 h-3.5 text-purple-400 fill-purple-500 text-white" />
                      )}
                    </p>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSaveJob(job.id);
                    }}
                    className={`p-2 rounded-xl border transition-all active:scale-90 active:shadow-md active:shadow-purple-500/25 cursor-pointer ${
                      isSaved
                        ? "bg-purple-500/15 text-purple-300 border-purple-500/40"
                        : "bg-zinc-950/70 text-zinc-400 border-zinc-800 hover:text-white"
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? "fill-purple-400" : ""}`} />
                  </button>
                </div>

                {/* Salary & Location */}
                <div className="flex items-center gap-3 my-2.5 text-xs">
                  <span className="text-purple-300 font-bold text-xs">
                    {job.salary}
                  </span>
                  <span className="text-zinc-400 text-xs flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    {job.location}
                  </span>
                </div>

                {/* Requirements Pills */}
                <div className="flex flex-wrap gap-1.5 mb-3 text-xs">
                  <span className="bg-zinc-950/70 text-zinc-300 px-2 py-0.5 rounded-md border border-zinc-800 font-medium text-xs">
                    ⏱️ {job.jobType}
                  </span>
                  <span className="bg-zinc-950/70 text-zinc-300 px-2 py-0.5 rounded-md border border-zinc-800 font-medium text-xs">
                    💼 {job.experience}
                  </span>
                  <span className="bg-zinc-950/70 text-zinc-300 px-2 py-0.5 rounded-md border border-zinc-800 font-medium text-xs">
                    👥 {job.vacancies} Openings
                  </span>
                </div>

                {/* Action Buttons with Click Shadow */}
                <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-zinc-800">
                  <button
                    onClick={(e) => handleShareJobWhatsApp(job, e)}
                    className="p-2 px-3 rounded-xl bg-zinc-950/70 hover:bg-zinc-950 border border-zinc-800 text-zinc-300 flex items-center gap-1.5 text-xs font-semibold active:scale-95 active:shadow-md active:shadow-purple-500/20 transition cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onApplyJob(job);
                    }}
                    disabled={isApplied}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                      isApplied
                        ? "bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-default"
                        : "btn-purple"
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Applied ✓</span>
                      </>
                    ) : (
                      <>
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Apply Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* FILTER BOTTOM SHEET / MODAL */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-end justify-center animate-in fade-in">
          <div className="w-full max-w-md bg-zinc-900 border-t border-zinc-800 rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Filter Job Openings</h3>
              </div>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center text-xs font-bold cursor-pointer active:scale-90"
              >
                ✕
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Industry & Role
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-left p-2.5 rounded-xl border text-xs font-medium transition cursor-pointer active:scale-95 ${
                      selectedCategory === cat.id
                        ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-900/40"
                        : "bg-zinc-950/70 text-zinc-300 border-zinc-800 hover:bg-zinc-800"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Type Filter */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Work Mode
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {jobTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedJobType(type.id)}
                    className={`text-center p-2 rounded-xl border text-xs font-medium transition cursor-pointer active:scale-95 ${
                      selectedJobType === type.id
                        ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-900/40"
                        : "bg-zinc-950/70 text-zinc-300 border-zinc-800 hover:bg-zinc-800"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Level Filter */}
            <div className="mb-5">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Experience Level
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {experienceLevels.map((exp) => (
                  <button
                    key={exp.id}
                    onClick={() => setSelectedExperience(exp.id)}
                    className={`text-center p-2 rounded-xl border text-xs font-medium transition cursor-pointer active:scale-95 ${
                      selectedExperience === exp.id
                        ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-900/40"
                        : "bg-zinc-950/70 text-zinc-300 border-zinc-800 hover:bg-zinc-800"
                    }`}
                  >
                    {exp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Modal Action Buttons */}
            <div className="flex gap-2 pt-2 border-t border-zinc-800">
              <button
                onClick={() => { clearAllFilters(); setIsFilterModalOpen(false); }}
                className="flex-1 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold hover:bg-zinc-700 cursor-pointer active:scale-95"
              >
                Reset All
              </button>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl btn-purple text-xs font-semibold cursor-pointer"
              >
                Apply Filters ({activeFiltersCount})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* JOB DETAIL MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center animate-in fade-in">
          <div className="w-full max-w-md bg-zinc-900 border-t border-zinc-800 rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl">
            <div className="flex items-start justify-between pb-3 mb-3 border-b border-zinc-800">
              <div>
                <span className="bg-purple-950/40 border border-purple-800/40 text-purple-300 text-xs font-medium px-2 py-0.5 rounded-md inline-block mb-1">
                  {selectedJob.category || "General"}
                </span>
                <h3 className="text-base font-bold text-white">{selectedJob.title}</h3>
                <p className="text-xs text-zinc-400 font-medium">{selectedJob.company} • {selectedJob.location}</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center text-xs font-bold cursor-pointer active:scale-90"
              >
                ✕
              </button>
            </div>

            {/* Salary Box */}
            <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-3 mb-3">
              <span className="text-xs text-zinc-400 font-medium block">Offered Compensation</span>
              <span className="text-base font-bold text-purple-300 mt-0.5 block">{selectedJob.salary}</span>
            </div>

            {/* Description */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                Job Overview
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {selectedJob.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                Required Qualifications & Skills
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedJob.requirements?.map((req, i) => (
                  <span key={i} className="bg-zinc-950/70 text-zinc-300 border border-zinc-800 text-xs px-2.5 py-1 rounded-lg">
                    ✓ {req}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-2 pt-3 border-t border-zinc-800">
              <button
                onClick={() => {
                  onReport && onReport(selectedJob);
                  setSelectedJob(null);
                }}
                className="py-2.5 px-3 rounded-xl bg-zinc-800 text-zinc-400 hover:text-rose-400 text-xs font-semibold flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Report</span>
              </button>
              <button
                onClick={() => {
                  onApplyJob(selectedJob);
                  setSelectedJob(null);
                }}
                disabled={appliedJobIds.includes(selectedJob.id)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                  appliedJobIds.includes(selectedJob.id)
                    ? "bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-default"
                    : "btn-purple"
                }`}
              >
                {appliedJobIds.includes(selectedJob.id) ? "Applied ✓" : "Apply for Opening"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
