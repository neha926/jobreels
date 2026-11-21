// Universal Multi-Industry Job & Skill Reels Data
// Platform: JobReels (Short Video Job Discovery & Instant Apply)

export const initialReels = [
  {
    id: "reel-1",
    type: "candidate_skill",
    creator: {
      name: "Neha Pawar",
      handle: "@neha_pawar_dev",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      verified: true,
      role: "Full Stack Developer"
    },
    videoUrl: "/videos/reel1.mp4",
    poster: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    caption: "🚀 Built TaskBoard - Full-Stack Agile Management & AI Smart Agenda Platform (live at task-bord-x.vercel.app)! Engineered with React 19, Tailwind CSS, Node.js and real-time collaboration.",
    skills: ["reactjs", "nodejs", "tailwind", "fullstack", "taskboard"],
    location: "Pune / Remote, India",
    likes: 4920,
    comments: 184,
    shares: 520,
    jobDetails: {
      id: "job-101",
      title: "Frontend & Full Stack Developer Opening",
      company: "CloudScale Tech Solutions",
      salary: "₹45,000 - ₹70,000 / month",
      vacancies: 8,
      jobType: "Full Time (Hybrid)",
      education: "B.Tech / BCA / Any Graduate with Portfolio",
      experience: "1 - 3 Years",
      googleMapsQuery: "Hinjewadi+Phase+1+Pune",
      contact: "hr@cloudscale.io"
    }
  },
  {
    id: "reel-2",
    type: "candidate_skill",
    creator: {
      name: "Aman Sharma",
      handle: "@aman_react_dev",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      verified: true,
      role: "Frontend Developer"
    },
    videoUrl: "/videos/reel2.mp4",
    poster: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    caption: "Built a responsive Kanban Board with drag-and-drop, real-time collaboration, and dark mode in React. Check out the clean component architecture!",
    skills: ["React", "State Management", "UI/UX", "Tailwind"],
    location: "Mumbai / Pune, India",
    likes: 5120,
    comments: 215,
    shares: 410,
    appliedJobId: null
  },
  {
    id: "reel-3",
    type: "job",
    creator: {
      name: "SwiftExpress Logistics",
      handle: "@swiftexpress_jobs",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
      verified: true,
      role: "Operations Manager"
    },
    videoUrl: "/videos/reel3.mp4",
    poster: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
    caption: "📦 Immediate Joining: 25 Delivery Fleet Leads & Logistics Associates. Daily fuel allowance, insurance, and weekly incentives. Apply in 1 tap!",
    skills: ["Route Planning", "Fleet Operations", "Customer Delivery", "Smartphone App"],
    location: "Delhi NCR / Pune / Bangalore",
    likes: 2890,
    comments: 98,
    shares: 340,
    jobDetails: {
      id: "job-102",
      title: "Delivery Fleet Captain & Hub Supervisor",
      company: "SwiftExpress Logistics",
      salary: "₹28,000 - ₹38,000 / month + Incentives",
      vacancies: 25,
      jobType: "Full Time",
      education: "10th / 12th Pass",
      experience: "Fresher / 1+ Year Delivery Experience",
      googleMapsQuery: "Bhiwandi+Logistics+Hub",
      contact: "careers@swiftexpress.in"
    }
  },
  {
    id: "reel-4",
    type: "job",
    creator: {
      name: "GrowthPulse Marketing",
      handle: "@growthpulse_agency",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      verified: true,
      role: "Talent Lead"
    },
    videoUrl: "/videos/reel4.mp4",
    poster: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80",
    caption: "💼 Inside Sales & Business Development Executive! 100% Day Shift, uncapped weekly performance bonuses, and fast-track promotions. Walk-in interviews live.",
    skills: ["B2B Sales", "Client Communication", "Lead Conversion", "CRM"],
    location: "Cyber City / Pune / Noida",
    likes: 3120,
    comments: 130,
    shares: 450,
    jobDetails: {
      id: "job-103",
      title: "Business Development & Inside Sales Executive",
      company: "GrowthPulse Marketing",
      salary: "₹30,000 - ₹50,000 / month + Uncapped Incentives",
      vacancies: 12,
      jobType: "Full Time (Day Shift)",
      education: "Graduate in any stream",
      experience: "6 Months - 3 Years in Sales",
      googleMapsQuery: "Cyber+Hub+Gurgaon",
      contact: "hiring@growthpulse.com"
    }
  }
];

export const initialJobs = [
  {
    id: "job-101",
    title: "Frontend React & Web Developer",
    company: "CloudScale Tech Solutions",
    category: "Tech & Software",
    salary: "₹45,000 - ₹70,000",
    salaryNumeric: 57500,
    location: "Bangalore / Pune (Hybrid)",
    state: "Karnataka / Maharashtra",
    vacancies: 8,
    jobType: "Full Time",
    workingHours: "10:00 AM - 7:00 PM (Mon - Fri)",
    education: "B.Tech / BCA / Any Graduate with Portfolio",
    experience: "1 - 3 Years",
    verified: true,
    postedDaysAgo: "Today",
    description: "Developing modern web interfaces with React, state management, REST API integration, and responsive Tailwind styling. Great mentorship and rapid growth path.",
    benefits: ["Health Insurance", "Work from Home Allowance", "Flexible Working Hours", "Performance Bonus"],
    googleMapsQuery: "Hinjewadi+Phase+1+Pune",
    contact: "hr@cloudscale.io"
  },
  {
    id: "job-102",
    title: "Delivery Fleet Captain & Hub Supervisor",
    company: "SwiftExpress Logistics",
    category: "Delivery & Logistics",
    salary: "₹28,000 - ₹38,000",
    salaryNumeric: 33000,
    location: "Pune / Mumbai / Delhi NCR",
    state: "Pan India",
    vacancies: 25,
    jobType: "Full Time",
    workingHours: "Flexible Shifts",
    education: "10th / 12th Pass",
    experience: "Fresher / 1+ Year Delivery Experience",
    verified: true,
    postedDaysAgo: "Today",
    description: "Managing last-mile parcel dispatch, supervising rider shifts, ensuring timely deliveries, and coordinating with hub operations team.",
    benefits: ["Daily Fuel Allowance", "Accidental Insurance", "Weekly Payouts", "Joining Bonus"],
    googleMapsQuery: "Bhiwandi+Logistics+Hub",
    contact: "careers@swiftexpress.in"
  },
  {
    id: "job-103",
    title: "Business Development & Inside Sales",
    company: "GrowthPulse Marketing",
    category: "Sales & Marketing",
    salary: "₹30,000 - ₹50,000",
    salaryNumeric: 40000,
    location: "Cyber City / Pune / Noida",
    state: "Haryana / Maharashtra",
    vacancies: 12,
    jobType: "Full Time",
    workingHours: "9:30 AM - 6:30 PM (Day Shift)",
    education: "Any Graduate",
    experience: "6 Months - 3 Years in Sales",
    verified: true,
    postedDaysAgo: "1 day ago",
    description: "Connecting with corporate clients, presenting product offerings over video and phone calls, negotiating contracts, and achieving monthly revenue targets.",
    benefits: ["Uncapped Incentives (Earn up to ₹1 Lakh)", "Weekend Off", "Mobile Bill Reimbursed", "Team Trips"],
    googleMapsQuery: "Cyber+Hub+Gurgaon",
    contact: "hiring@growthpulse.com"
  },
  {
    id: "job-104",
    title: "Customer Support Associate (Day Shift)",
    company: "Zenith Global BPO",
    category: "Customer Support & BPO",
    salary: "₹22,000 - ₹30,000",
    salaryNumeric: 26000,
    location: "Viman Nagar, Pune",
    state: "Maharashtra",
    vacancies: 20,
    jobType: "Full Time",
    workingHours: "9:00 AM - 6:00 PM",
    education: "12th Pass / Graduate",
    experience: "Fresher / Experienced",
    verified: true,
    postedDaysAgo: "2 days ago",
    description: "Assisting customers with inquiries via phone, email, and live chat. Resolving customer issues with empathy and high customer satisfaction.",
    benefits: ["Free Pick & Drop Cab", "Subsidized Cafeteria", "Health Insurance", "Overtime Pay"],
    googleMapsQuery: "Viman+Nagar+Pune",
    contact: "recruitment@zenithglobal.com"
  },
  {
    id: "job-105",
    title: "Junior Accountant (Tally Prime & GST)",
    company: "Nexus Capital Advisors",
    category: "Accounts & Finance",
    salary: "₹24,000 - ₹34,000",
    salaryNumeric: 29000,
    location: "MG Road, Bangalore",
    state: "Karnataka",
    vacancies: 5,
    jobType: "Full Time",
    workingHours: "10:00 AM - 6:30 PM",
    education: "B.Com / M.Com / Inter CA",
    experience: "1 - 3 Years (Tally, GST Returns, TDS)",
    verified: true,
    postedDaysAgo: "2 days ago",
    description: "Managing day-to-day bookkeeping, invoice voucher entries, bank reconciliations, and assisting senior managers in GST filing and auditing.",
    benefits: ["Yearly Bonus", "Paid Leaves", "PF + Gratuity", "Professional Growth"],
    googleMapsQuery: "MG+Road+Bangalore",
    contact: "accounts@nexuscapital.in"
  },
  {
    id: "job-106",
    title: "Graphic & Social Media Designer",
    company: "PixelCraft Media",
    category: "Design & Creative",
    salary: "₹30,000 - ₹45,000",
    salaryNumeric: 37500,
    location: "Andheri West, Mumbai / Remote",
    state: "Maharashtra",
    vacancies: 4,
    jobType: "Full Time",
    workingHours: "10:00 AM - 7:00 PM",
    education: "Diploma / Degree in Design or Self-Taught",
    experience: "1 - 4 Years (Photoshop, Illustrator, Figma)",
    verified: true,
    postedDaysAgo: "3 days ago",
    description: "Creating creative thumbnails, social media reels visuals, marketing banners, and brand graphics for top brands and digital campaigns.",
    benefits: ["MacBook Provided", "Creative Freedom", "Hybrid Work Model", "Annual Retreat"],
    googleMapsQuery: "Andheri+West+Mumbai",
    contact: "creatives@pixelcraft.agency"
  }
];

export const candidateProfile = {
  id: "cand-user-1",
  name: "Neha Pawar",
  headline: "Full Stack Developer & Technical Specialist",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  phone: "+91 7276293084",
  verified: true,
  location: "Pune / Mumbai, Maharashtra",
  experience: "2.5 Years",
  education: "B.Tech in Computer Science / Engineering",
  currentSalary: "₹42,000 / month",
  expectedSalary: "₹60,000 / month",
  skills: [
    "React.js & Modern Web",
    "Node.js & REST APIs",
    "Tailwind CSS & Responsive UI",
    "Git & Cloud Deployment",
    "Database Management (SQL/PostgreSQL)"
  ],
  completedProjects: [
    "TaskBoard Project Management Platform (task-bord-x.vercel.app)",
    "Real-time Video Reels & Short Form Content Engine",
    "Automated Resume Generator with Instant PDF Download"
  ],
  experienceOrganizations: [
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
  ],
  collegeProjects: [
    "Campus Placement Portal & Automated Student Assessment System",
    "IoT-Based Smart Energy Meter with Remote Monitoring Dashboard",
    "Real-Time Face Recognition & RFID Automated Attendance System",
    "Digital Library Management & Automated Book Archival System"
  ],
  reels: [
    {
      id: "cand-reel-1",
      title: "Interactive Web Application & Frontend Architecture",
      views: 5240,
      likes: 680,
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format&fit=crop&q=80"
    }
  ]
};

export const initialApplications = [
  {
    id: "app-1",
    candidateName: "Neha Pawar",
    candidatePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    jobId: "job-101",
    jobTitle: "Frontend React & Web Developer",
    company: "CloudScale Tech Solutions",
    status: "Shortlisted",
    appliedDate: "Today",
    experience: "2.5 Years",
    location: "Pune (Hybrid)",
    skillReelTitle: "Interactive Web Application & Frontend Architecture",
    interviewDetails: {
      date: "Monday, 24 Nov 2026",
      time: "11:30 AM",
      address: "CloudScale Tech Center, Hinjewadi Phase 1, Pune",
      googleMapsQuery: "Hinjewadi+Phase+1+Pune"
    }
  },
  {
    id: "app-2",
    candidateName: "Neha Pawar",
    candidatePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    jobId: "job-103",
    jobTitle: "Business Development & Inside Sales",
    company: "GrowthPulse Marketing",
    status: "Viewed",
    appliedDate: "2 days ago",
    experience: "2.5 Years",
    location: "Pune",
    skillReelTitle: "Sales & Client Communication Demo",
    interviewDetails: null
  }
];

export const initialChatMessages = [
  {
    id: "msg-1",
    sender: "employer",
    senderName: "Priya Menon (HR Lead, CloudScale)",
    text: "Namaste Neha! We reviewed your video reel and resume on JobReels. Your frontend demo is very impressive.",
    timestamp: "10:15 AM",
    isInterviewCard: false
  },
  {
    id: "msg-2",
    sender: "candidate",
    senderName: "Neha Pawar",
    text: "Thank you Priya ma'am! I would love to connect and discuss how I can contribute to CloudScale.",
    timestamp: "10:18 AM",
    isInterviewCard: false
  },
  {
    id: "msg-3",
    sender: "employer",
    senderName: "Priya Menon (HR Lead, CloudScale)",
    text: "We have scheduled your in-person technical round. Details are attached below:",
    timestamp: "10:20 AM",
    isInterviewCard: true,
    interviewDetails: {
      role: "Frontend React & Web Developer",
      company: "CloudScale Tech Solutions",
      date: "Monday, 24 Nov 2026",
      time: "11:30 AM",
      address: "Tech Hub Tower B, Hinjewadi Phase 1, Pune",
      googleMapsQuery: "Hinjewadi+Phase+1+Pune",
      contactPerson: "Priya Menon (HR Lead) - 9876543210"
    }
  }
];

export const initialFraudReports = [];
