let jobs = [
  {
    id: "job-101",
    title: "Senior MIG/TIG Welder",
    company: "Bharat Forge Precision Ltd.",
    category: "Welder / Fabrication",
    salary: "₹24,000 - ₹28,000",
    location: "Chakan MIDC, Pune",
    state: "Maharashtra",
    vacancies: 15,
    jobType: "Full Time",
    workingHours: "8 Hours Shift (Rotational)",
    education: "ITI Welder or 10th Pass",
    experience: "1 - 3 Years",
    verified: true,
    description: "Looking for dedicated MIG/TIG welders for automobile chassis component manufacturing. Subsidized canteen, company transport from Bhosari & Nigdi, PF, and Medical Insurance included.",
    benefits: ["Free Bus Service", "Canteen Facility", "Overtime Pay", "PF & ESI"],
    googleMapsQuery: "Chakan+MIDC+Pune"
  },
  {
    id: "job-102",
    title: "Commercial Heavy Vehicle Driver",
    company: "Mahindra Logistics Fleet",
    category: "Driver",
    salary: "₹26,000 - ₹32,000",
    location: "Bhiwandi, Mumbai",
    state: "Maharashtra",
    vacancies: 25,
    jobType: "Full Time",
    workingHours: "Standard Trips + Rest Days",
    education: "10th Pass + Commercial Badge",
    experience: "2+ Years",
    verified: true,
    description: "Immediate opening for container truck drivers between JNPT Port and Bhiwandi Warehouse hubs.",
    benefits: ["Trip Incentive", "Life Insurance", "Rest Room Facility"],
    googleMapsQuery: "Bhiwandi+Logistics+Hub"
  },
  {
    id: "job-103",
    title: "CNC Machine Operator",
    company: "Apex Precision Auto Parts",
    category: "CNC / Machine Operator",
    salary: "₹20,000 - ₹25,000",
    location: "Pimpri-Chinchwad, Pune",
    state: "Maharashtra",
    vacancies: 8,
    jobType: "Full Time",
    workingHours: "8 Hours (Morning / Evening)",
    education: "ITI Machinist / Diploma Mechanical",
    experience: "Fresher / 0-2 Years",
    verified: true,
    description: "Operating CNC turning machines and quality check with calipers.",
    benefits: ["Skill Training Certificate", "Attendance Bonus ₹1500/mo", "PF + ESIC"],
    googleMapsQuery: "Pimpri+Chinchwad+Pune"
  }
];

export const getJobs = (req, res) => {
  const { search, category, location } = req.query;
  let result = [...jobs];

  if (search) {
    const s = search.toLowerCase();
    result = result.filter(j => 
      j.title.toLowerCase().includes(s) || 
      j.company.toLowerCase().includes(s) || 
      j.category.toLowerCase().includes(s)
    );
  }

  if (category && category !== "all") {
    result = result.filter(j => j.category === category);
  }

  if (location && location !== "all") {
    result = result.filter(j => j.location.includes(location));
  }

  res.json({ success: true, count: result.length, data: result });
};

export const createJob = (req, res) => {
  const { title, company, category, salary, location, vacancies, education, experience, description } = req.body;
  if (!title || !salary) {
    return res.status(400).json({ success: false, message: "Title and Salary are required" });
  }

  const newJob = {
    id: `job-${Date.now()}`,
    title,
    company: company || "Direct Employer",
    category: category || "General",
    salary,
    location: location || "Maharashtra",
    vacancies: parseInt(vacancies) || 1,
    jobType: "Full Time",
    workingHours: "8 Hours Shift",
    education: education || "10th Pass",
    experience: experience || "Fresher",
    verified: true,
    description: description || "Direct company recruitment with zero commission.",
    benefits: ["PF & ESI Included"]
  };

  jobs.unshift(newJob);
  res.status(201).json({ success: true, message: "Job created successfully in 2 minutes", data: newJob });
};

export const verifyJob = (req, res) => {
  const { id } = req.params;
  const job = jobs.find(j => j.id === id);
  if (!job) return res.status(404).json({ success: false, message: "Job not found" });

  job.verified = true;
  res.json({ success: true, message: "Verified badge granted to company", data: job });
};
