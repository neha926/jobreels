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
    caption: "💻 Software Project Demo: TaskBoard - Full-Stack Agile Management & AI Smart Agenda Platform (live at task-bord-x.vercel.app)! Engineered with React 19, Tailwind CSS, Node.js and real-time collaboration.",
    skills: ["React 19", "Node.js", "Tailwind CSS", "Software Project"],
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
      handle: "@aman_embedded_iot",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      verified: true,
      role: "Embedded Hardware Engineer"
    },
    videoUrl: "/videos/reel2.mp4",
    poster: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    caption: "⚡ Hardware Project Demo: ESP32 IoT Smart Energy Meter with live OLED telemetry, current/voltage sensor calibration, and WiFi MQTT dashboard reporting.",
    skills: ["ESP32", "Hardware Project", "Circuit Design", "Embedded C"],
    location: "Mumbai / Pune, India",
    likes: 5120,
    comments: 215,
    shares: 410,
    jobDetails: {
      id: "job-102",
      title: "IoT & Embedded Hardware Engineer",
      company: "Electronix Innovations Ltd.",
      salary: "₹40,000 - ₹65,000 / month",
      vacancies: 5,
      jobType: "Full Time",
      education: "B.E. / B.Tech / Diploma (Electronics / E&TC)",
      experience: "1 - 3 Years",
      googleMapsQuery: "MIDC+Bhosari+Pune",
      contact: "careers@electronix.in"
    }
  },
  {
    id: "reel-3",
    type: "candidate_skill",
    creator: {
      name: "Amit Deshmukh",
      handle: "@amit_cnc_machinist",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
      verified: true,
      role: "CNC Machine Specialist"
    },
    videoUrl: "/videos/reel3.mp4",
    poster: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
    caption: "⚙️ Machine Project Demo: Operating 3-Axis VMC CNC Milling machine for automotive component turning with ±0.01mm tolerance and Fanuc G-code programming.",
    skills: ["CNC Milling", "VMC Machine", "Fanuc G-Code", "Machine Project"],
    location: "Chakan / Pune MIDC, India",
    likes: 3890,
    comments: 142,
    shares: 340,
    jobDetails: {
      id: "job-103",
      title: "CNC VMC Machine Operator & Programmer",
      company: "Bharat Forge Precision Ltd.",
      salary: "₹32,000 - ₹48,000 / month",
      vacancies: 10,
      jobType: "Full Time",
      education: "ITI / Diploma (Mechanical / Tool & Die)",
      experience: "1 - 4 Years",
      googleMapsQuery: "Chakan+MIDC+Phase+2",
      contact: "hiring@bharatforge.com"
    }
  },
  {
    id: "reel-4",
    type: "candidate_skill",
    creator: {
      name: "Sneha Kulkarni",
      handle: "@sneha_robotics",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      verified: true,
      role: "Robotics & Automation Engineer"
    },
    videoUrl: "/videos/reel4.mp4",
    poster: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
    caption: "🤖 Robotics & Automation Project Demo: 4-DOF Robotic Pick & Place Arm with inverse kinematics trajectory control, Arduino microcontroller, and servo motor drivers.",
    skills: ["Robotics", "Arduino", "Mechatronics", "Automation Project"],
    location: "Hinjewadi / Bangalore / Pune",
    likes: 4230,
    comments: 168,
    shares: 480,
    jobDetails: {
      id: "job-104",
      title: "Robotics & Industrial Automation Engineer",
      company: "TechNova Automation Ltd.",
      salary: "₹50,000 - ₹80,000 / month",
      vacancies: 6,
      jobType: "Full Time",
      education: "B.Tech (Mechatronics / Robotics / Mechanical)",
      experience: "1 - 3 Years",
      googleMapsQuery: "Hinjewadi+Phase+2+Pune",
      contact: "careers@technova-auto.com"
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
    title: "IoT & Embedded Hardware Engineer",
    company: "Electronix Innovations Ltd.",
    category: "Hardware & Electronics",
    salary: "₹40,000 - ₹65,000",
    salaryNumeric: 52500,
    location: "MIDC Bhosari, Pune",
    state: "Maharashtra",
    vacancies: 5,
    jobType: "Full Time",
    workingHours: "9:00 AM - 6:00 PM (Mon - Sat)",
    education: "B.E. / B.Tech / Diploma (Electronics / E&TC)",
    experience: "1 - 3 Years",
    verified: true,
    postedDaysAgo: "Today",
    description: "Designing microcontroller hardware circuits (ESP32 / STM32), debugging PCB telemetry systems, sensor calibration, and embedded firmware programming.",
    benefits: ["Lab Testing Facility", "Health Insurance", "Annual Bonus", "PF & Gratuity"],
    googleMapsQuery: "MIDC+Bhosari+Pune",
    contact: "careers@electronix.in"
  },
  {
    id: "job-103",
    title: "CNC VMC Machine Operator & Programmer",
    company: "Bharat Forge Precision Ltd.",
    category: "Machine & Manufacturing",
    salary: "₹32,000 - ₹48,000",
    salaryNumeric: 40000,
    location: "Chakan MIDC Phase 2, Pune",
    state: "Maharashtra",
    vacancies: 10,
    jobType: "Full Time",
    workingHours: "Rotational Shifts (8 Hours)",
    education: "ITI / Diploma (Mechanical / Tool & Die)",
    experience: "1 - 4 Years",
    verified: true,
    postedDaysAgo: "1 day ago",
    description: "Operating 3-axis & 4-axis VMC CNC milling machines, G-code/M-code programming, tooling offset setup, and precision component quality inspection.",
    benefits: ["Overtime Pay (1.5x)", "Canteen Subsidy", "Safety Gear Provided", "Production Bonus"],
    googleMapsQuery: "Chakan+MIDC+Phase+2",
    contact: "hiring@bharatforge.com"
  },
  {
    id: "job-104",
    title: "Robotics & Industrial Automation Engineer",
    company: "TechNova Automation Ltd.",
    category: "Robotics & Mechatronics",
    salary: "₹50,000 - ₹80,000",
    salaryNumeric: 65000,
    location: "Hinjewadi Phase 2, Pune",
    state: "Maharashtra",
    vacancies: 6,
    jobType: "Full Time",
    workingHours: "9:30 AM - 6:30 PM",
    education: "B.Tech (Mechatronics / Robotics / Mechanical)",
    experience: "1 - 3 Years",
    verified: true,
    postedDaysAgo: "2 days ago",
    description: "Programming industrial robotic arms (KUKA/ABB), PLC automation logic, servo drive tuning, and machine vision inspection systems integration.",
    benefits: ["Robotics R&D Access", "Health Insurance", "Performance Bonus", "Travel Allowance"],
    googleMapsQuery: "Hinjewadi+Phase+2+Pune",
    contact: "careers@technova-auto.com"
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
