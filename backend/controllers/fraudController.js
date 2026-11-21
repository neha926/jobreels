let fraudReports = [
  {
    id: "rep-1",
    jobTitle: "Airport Security Supervisor (₹45,000 / month)",
    companyName: "Speedy Star Placement Agency",
    reportedBy: "Vikas Patil (+91 99211 44556)",
    reason: "Asking for Registration Money / Scam",
    details: "The recruiter demanded ₹2,500 security deposit for uniform before interview.",
    date: "21 Nov 2026",
    status: "Under Review"
  }
];

export const getFraudReports = (req, res) => {
  res.json({ success: true, count: fraudReports.length, data: fraudReports });
};

export const submitReport = (req, res) => {
  const { jobTitle, companyName, reason, details, reportedBy } = req.body;
  if (!reason || !details) {
    return res.status(400).json({ success: false, message: "Reason and details are required" });
  }

  const newReport = {
    id: `rep-${Date.now()}`,
    jobTitle: jobTitle || "Reported Item",
    companyName: companyName || "Unknown Company",
    reportedBy: reportedBy || "Confidential Worker",
    reason,
    details,
    date: "Today",
    status: "Under Review"
  };

  fraudReports.unshift(newReport);
  res.status(201).json({ success: true, message: "Fraud report registered. Admin investigating.", data: newReport });
};

export const resolveReport = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const report = fraudReports.find(r => r.id === id);
  if (!report) return res.status(404).json({ success: false, message: "Report not found" });

  report.status = status || "Banned";
  res.json({ success: true, message: `Report marked as ${report.status}. Offending account suspended.`, data: report });
};
