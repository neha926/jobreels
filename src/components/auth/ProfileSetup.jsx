import React, { useState } from 'react';
import { User, Building2, MapPin, ArrowRight } from 'lucide-react';

export const ProfileSetup = ({ role, phone, onComplete, onSkip }) => {
  // Candidate Fields (PRD Section 4)
  const [candidateName, setCandidateName] = useState('');
  const [location, setLocation] = useState('Pune / Mumbai');
  const [education, setEducation] = useState('Graduate / Technical Degree');
  const [workCategory, setWorkCategory] = useState('Tech & Software');
  const [experience, setExperience] = useState('1-3 Years');
  const [expectedSalary, setExpectedSalary] = useState('₹45,000 / month');
  const [preferredLocation, setPreferredLocation] = useState('Pune / Mumbai / Remote');

  // Employer Fields (PRD Section 10)
  const [companyName, setCompanyName] = useState('');
  const [companyType, setCompanyType] = useState('Technology & Digital Services');
  const [companyLocation, setCompanyLocation] = useState('Hinjewadi Phase 1, Pune');
  const [hrName, setHrName] = useState('');
  const [reraNo, setReraNo] = useState('CIN: U72200PN2021PTC19841');

  const handleSaveCandidate = (e) => {
    e.preventDefault();
    const profile = {
      name: candidateName.trim() || 'Verified Candidate',
      phone: `+91 ${phone}`,
      location,
      headline: `${workCategory} Specialist (${education})`,
      education,
      experience,
      expectedSalary,
      preferredLocation,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      verified: true,
      skills: [workCategory, 'Digital Resume', 'Verified Skill Reel'],
      reelsUploadedCount: 1,
      completedProjects: [
        `Verified experience in ${workCategory} across Maharashtra belt.`,
        `Automated digital resume generated via JobReels platform.`
      ]
    };
    onComplete(profile);
  };

  const handleSaveEmployer = (e) => {
    e.preventDefault();
    const profile = {
      companyName: companyName.trim() || 'TechNova Solutions Ltd.',
      companyType,
      location: companyLocation,
      hrName: hrName.trim() || 'HR Team',
      hrPhone: `+91 ${phone}`,
      gstin: reraNo,
      verified: true
    };
    onComplete(profile);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden selection:bg-purple-600 selection:text-white">
      {/* Background Glows */}
      <div className="absolute top-[-15%] left-[-15%] w-[50%] h-[50%] bg-purple-600/15 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-15%] right-[-15%] w-[50%] h-[50%] bg-pink-600/15 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-lg relative z-10">
        {/* Header with Skip Button */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs uppercase font-medium tracking-wider text-purple-400">
                Step 3 of 3
              </span>
              <span className="text-zinc-500">•</span>
              <span className="text-xs font-normal text-zinc-400">
                +91 {phone}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              {role === 'employer' ? 'Company Details' : 'Complete Your Profile'}
            </h2>
          </div>

          {/* Quick Skip Button */}
          <button
            type="button"
            onClick={onSkip}
            className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-medium transition-all cursor-pointer"
          >
            Skip for now &rarr;
          </button>
        </div>

        {/* Profile Card */}
        <div className="card-3d rounded-[2rem] p-6 shadow-2xl max-h-[82vh] overflow-y-auto no-scrollbar">
          {role === 'employer' ? (
            <form onSubmit={handleSaveEmployer} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">
                  Company / Organization Name
                </label>
                <div className="input-3d rounded-xl px-3 py-2.5 flex items-center">
                  <Building2 className="w-4 h-4 text-purple-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Swaraj Tech Enterprises"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-transparent text-sm text-white font-normal outline-none placeholder-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">
                  HR / Recruiter Name
                </label>
                <div className="input-3d rounded-xl px-3 py-2.5 flex items-center">
                  <User className="w-4 h-4 text-purple-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="e.g. Rajesh Patil"
                    value={hrName}
                    onChange={(e) => setHrName(e.target.value)}
                    className="w-full bg-transparent text-sm text-white font-normal outline-none placeholder-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">
                  Company Location / City
                </label>
                <div className="input-3d rounded-xl px-3 py-2.5 flex items-center">
                  <MapPin className="w-4 h-4 text-purple-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={companyLocation}
                    onChange={(e) => setCompanyLocation(e.target.value)}
                    className="w-full bg-transparent text-sm text-white font-normal outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">
                  Business / Industry Category
                </label>
                <select
                  value={companyType}
                  onChange={(e) => setCompanyType(e.target.value)}
                  className="w-full input-3d rounded-xl px-3 py-2.5 text-sm text-white font-normal outline-none"
                >
                  <option value="Technology & Digital Services" className="bg-gray-900">Technology & Digital Services</option>
                  <option value="Manufacturing & Industrial" className="bg-gray-900">Manufacturing & Industrial</option>
                  <option value="Real Estate & Infrastructure" className="bg-gray-900">Real Estate & Infrastructure</option>
                  <option value="Retail & Logistics" className="bg-gray-900">Retail & Logistics</option>
                  <option value="Healthcare & Hospitality" className="bg-gray-900">Healthcare & Hospitality</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onSkip}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-medium text-xs transition cursor-pointer"
                >
                  Skip for now
                </button>
                <button
                  type="submit"
                  className="btn-3d flex-1 py-2.5 rounded-xl text-white font-medium text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Save & Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSaveCandidate} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">
                  Full Name (पूर्ण नाव)
                </label>
                <div className="input-3d rounded-xl px-3 py-2.5 flex items-center">
                  <User className="w-4 h-4 text-purple-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ganesh Tukaram Shinde"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full bg-transparent text-sm text-white font-normal outline-none placeholder-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">
                  Primary Skill / Work Category
                </label>
                <select
                  value={workCategory}
                  onChange={(e) => setWorkCategory(e.target.value)}
                  className="w-full input-3d rounded-xl px-3 py-2.5 text-sm text-white font-normal outline-none"
                >
                  <option value="Tech & Software" className="bg-gray-900">Tech & Software Development</option>
                  <option value="Civil Engineering & Survey" className="bg-gray-900">Civil Engineering & Site Survey</option>
                  <option value="Manufacturing & CNC Operator" className="bg-gray-900">Manufacturing & CNC Operator</option>
                  <option value="Electrician & Technician" className="bg-gray-900">Electrician & Technician</option>
                  <option value="Driver & Heavy Vehicle" className="bg-gray-900">Driver & Heavy Vehicle Transport</option>
                  <option value="Sales & Field Executive" className="bg-gray-900">Sales & Field Executive</option>
                  <option value="Security & Facility" className="bg-gray-900">Security & Facility Operations</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-zinc-300 block mb-1">
                    Education
                  </label>
                  <select
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full input-3d rounded-xl px-3 py-2.5 text-xs text-white font-normal outline-none"
                  >
                    <option value="Below 10th" className="bg-gray-900">Below 10th</option>
                    <option value="10th Pass" className="bg-gray-900">10th Pass</option>
                    <option value="12th Pass" className="bg-gray-900">12th Pass</option>
                    <option value="ITI Certified" className="bg-gray-900">ITI Certified</option>
                    <option value="Diploma" className="bg-gray-900">Diploma</option>
                    <option value="Graduate / Technical Degree" className="bg-gray-900">Graduate</option>
                    <option value="Post Graduate" className="bg-gray-900">Post Graduate</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-zinc-300 block mb-1">
                    Experience
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full input-3d rounded-xl px-3 py-2.5 text-xs text-white font-normal outline-none"
                  >
                    <option value="Fresher" className="bg-gray-900">Fresher</option>
                    <option value="0-1 Year" className="bg-gray-900">0-1 Year</option>
                    <option value="1-3 Years" className="bg-gray-900">1-3 Years</option>
                    <option value="3-5 Years" className="bg-gray-900">3-5 Years</option>
                    <option value="5+ Years" className="bg-gray-900">5+ Years</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-zinc-300 block mb-1">
                    Current Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full input-3d rounded-xl px-3 py-2 text-xs text-white font-normal outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-zinc-300 block mb-1">
                    Expected Salary
                  </label>
                  <input
                    type="text"
                    value={expectedSalary}
                    onChange={(e) => setExpectedSalary(e.target.value)}
                    className="w-full input-3d rounded-xl px-3 py-2 text-xs text-white font-normal outline-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onSkip}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-medium text-xs transition cursor-pointer"
                >
                  Skip for now
                </button>
                <button
                  type="submit"
                  className="btn-3d flex-1 py-2.5 rounded-xl text-white font-medium text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Save & Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
