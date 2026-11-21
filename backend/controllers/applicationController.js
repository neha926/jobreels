let applications = [
  {
    id: "app-1",
    candidateName: "Ramesh Tukaram Shinde",
    candidatePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    jobId: "job-101",
    jobTitle: "Senior MIG/TIG Welder",
    company: "Bharat Forge Precision Ltd.",
    status: "Interview",
    appliedDate: "20 Nov 2026",
    experience: "2 Years",
    location: "Bhosari, Pune",
    skillReelTitle: "3G/4G Pipe Welding Demo (Zero Defect)",
    interviewDetails: {
      date: "23 Nov 2026",
      time: "10:30 AM",
      type: "In-Person Practical Test & Interview",
      address: "Gate No. 3, Bharat Forge Precision Plant, Chakan Phase-2 MIDC, Pune - 410501",
      contactPerson: "Mr. Anand Kulkarni (Senior HR)",
      googleMapsQuery: "Bharat+Forge+Chakan+Phase+2"
    }
  }
];

export const getApplications = (req, res) => {
  res.json({ success: true, count: applications.length, data: applications });
};

export const applyJob = (req, res) => {
  const { jobId, jobTitle, company, candidateName, experience, location } = req.body;

  const newApp = {
    id: `app-${Date.now()}`,
    candidateName: candidateName || "Ramesh Tukaram Shinde",
    candidatePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    jobId: jobId || "job-101",
    jobTitle: jobTitle || "Industrial Position",
    company: company || "Direct Hiring Company",
    status: "Applied",
    appliedDate: "Just now",
    experience: experience || "2 Years",
    location: location || "Pune",
    skillReelTitle: "Verified Practical Skill Demonstration",
    interviewDetails: null
  };

  applications.unshift(newApp);
  res.status(201).json({ success: true, message: "Application submitted with Digital Resume with 0 fees", data: newApp });
};

export const updateApplicationStatus = (req, res) => {
  const { id } = req.params;
  const { status, interviewDetails } = req.body;

  const app = applications.find(a => a.id === id);
  if (!app) return res.status(404).json({ success: false, message: "Application not found" });

  if (status) app.status = status;
  if (interviewDetails) app.interviewDetails = interviewDetails;

  res.json({ success: true, message: `Status updated to ${status}`, data: app });
};
