let reels = [
  {
    id: "reel-1",
    type: "job",
    creator: {
      name: "Bharat Forge Precision Ltd.",
      handle: "@bharat_forge_hr",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&auto=format&fit=crop&q=80",
      verified: true
    },
    poster: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80",
    caption: "🔥 Urgently Hiring 15 MIG/TIG Welders at Chakan MIDC, Pune! Free bus service & canteen available. Apply right now!",
    skills: ["MIG Welding", "TIG Welding", "ITI Welder", "Fabrication"],
    location: "Chakan MIDC, Pune",
    likes: 1420,
    comments: 89,
    shares: 340,
    jobDetails: {
      id: "job-101",
      title: "Senior MIG/TIG Welder",
      company: "Bharat Forge Precision Ltd.",
      salary: "₹24,000 - ₹28,000 / month",
      vacancies: 15,
      jobType: "Full Time",
      education: "ITI Welder / 10th Pass",
      experience: "1 - 3 Years"
    }
  },
  {
    id: "reel-2",
    type: "candidate_skill",
    creator: {
      name: "Ramesh Tukaram Shinde",
      handle: "@ramesh_welder_pune",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      verified: true
    },
    poster: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
    caption: "3G & 4G Pipe welding joint testing complete with zero defects. Looking for industrial fabrication work near Bhosari or Chakan.",
    skills: ["Pipe Welding", "3G/4G Position", "ARC Welding"],
    location: "Bhosari, Pune",
    likes: 3890,
    comments: 142,
    shares: 210
  }
];

export const getReelsFeed = (req, res) => {
  res.json({ success: true, count: reels.length, data: reels });
};

export const createReel = (req, res) => {
  const { caption, skills, location, type, title } = req.body;
  const newReel = {
    id: `reel-${Date.now()}`,
    type: type || "candidate_skill",
    creator: {
      name: "Candidate / Worker (Verified)",
      handle: "@candidate_skill",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      verified: true
    },
    poster: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80",
    caption: caption || `${title} practical skill demonstration.`,
    skills: skills || ["Skill Verified"],
    location: location || "Maharashtra, India",
    likes: 1,
    comments: 0,
    shares: 0
  };

  reels.unshift(newReel);
  res.status(201).json({ success: true, message: "Skill reel published to national feed", data: newReel });
};

export const likeReel = (req, res) => {
  const { id } = req.params;
  const reel = reels.find(r => r.id === id);
  if (!reel) return res.status(404).json({ success: false, message: "Reel not found" });

  reel.likes += 1;
  res.json({ success: true, likes: reel.likes });
};
