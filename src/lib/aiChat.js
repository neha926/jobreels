const LANGUAGE_CUES = {
  mr: /(आहे|आहेत|मला|माझे|माझी|माझा|तुम्ही|करायचं|करू|नोकरी|शोधा|सांगा|कसं|कशी|कुठे|किती|मिळेल|हवं|होईल)/,
  hi: /(है|हैं|मुझे|मेरा|मेरी|बताइए|नौकरी|ढूंढो|कहाँ|कितनी|करना|चाहिए|मिलेगी|कैसे|कौन)/
};

const TEXT = {
  mr: {
    greeting: (name) => `नमस्कार${name ? ` ${name}` : ""}! मी स्वाबी, तुमची JobReels assistant. काय मदत हवी? reels, नोकरी, profile किंवा अर्जाबद्दल विचारा.`,
    help: "JobReels वर Reels मधून कौशल्यांचे video पाहता येतात; Jobs मध्ये शहर, industry, कामाचा प्रकार, पगार आणि fresher संधी शोधता येतात. Apply केल्यानंतर Profile मधील Applications मध्ये Applied, Viewed, Shortlisted, Interview किंवा Selected स्थिती पाहा. Profile मध्ये digital resume, शिक्षण, कौशल्यं आणि अनुभव सांभाळा; Chat मध्ये HR शी बोला. Employer vacancy पोस्ट व उमेदवारांचे अर्ज पाहू शकतात; Admin job verification आणि फसवणुकीच्या reports तपासतो.",
    noApps: "तुमच्या profile नावाशी जुळणारा अर्ज मला सध्या दिसत नाही. Profile मधील Applications विभागात तुमची स्थिती तपासा.",
    apps: (items) => `तुमच्या ${items.length} अर्जांची सध्याची स्थिती: ${items.map((app) => `${app.jobTitle}, ${app.company}: ${app.status}`).join("; ")}.`,
    noJobs: "सध्या या शोधाशी जुळणाऱ्या नोकऱ्या दिसत नाहीत. दुसरे कौशल्य किंवा शहर सांगून पाहाल का?",
    jobs: (items) => `मला ${items.length} योग्य संधी दिसल्या: ${items.map((job) => `${job.title}, ${job.company}, ${job.location}${job.salary ? `, पगार ${job.salary}` : ""}`).join("; ")}. नोकऱ्या पेजवर त्या पाहू शकता.`,
    apply: "अर्ज करण्यासाठी नोकऱ्या पेजवर जा, पद निवडा आणि Apply बटण दाबा. तुमच्या स्पष्ट परवानगीशिवाय मी अर्ज सादर करणार नाही.",
    profile: (profile) => `तुमच्या profile मध्ये ${profile.name || "नाव जोडलेले नाही"}${profile.education ? `, शिक्षण ${profile.education}` : ""}${profile.skills?.length ? `, कौशल्यं ${profile.skills.join(", ")}` : ""} अशी माहिती आहे. बदलांसाठी profile वरील पेन्सिल निवडा.`,
    interview: "मुलाखतीपूर्वी job description आणि तुमचे projects वाचा. स्वतःची ओळख, अनुभव आणि त्या पदासाठीची कौशल्यं यांची छोटी उत्तरं तयार ठेवा. अर्जात interview ठरलेली असल्यास Profile मधील Applications विभागात वेळ व पत्ता दिसेल.",
    reel: "Reels पेजवर कौशल्यांचे video पाहता येतात. तुमचा project किंवा काम दाखवणारी reel पोस्ट करण्यासाठी खालील + Post वापरा.",
    safety: "JobReels नोकरी शोधण्यासाठी मोफत आहे. नोकरी किंवा interview मिळवण्यासाठी कोणालाही registration fee किंवा deposit देऊ नका. संशयास्पद job वर Report वापरा.",
    saved: (count) => count ? `तुम्ही ${count} नोकऱ्या जतन केल्या आहेत. Job card वरील bookmark वापरून त्या पुन्हा उघडा.` : "अजून नोकरी जतन केलेली नाही. Job card वरील bookmark दाबून नोकरी जतन करा.",
    employer: "Employer dashboard मध्ये vacancy पोस्ट करता येते, आलेले अर्ज पाहता येतात आणि उमेदवारांसाठी interview ठरवता येते.",
    admin: "Admin dashboard मध्ये job verification आणि संशयास्पद job reports तपासण्याची साधनं आहेत.",
    generic: "मी JobReels मधल्या नोकऱ्या, profile, अर्ज, interview, reels आणि navigation बद्दल मदत करू शकते. नेमकं काय शोधत आहात ते पुन्हा सांगाल का?"
  },
  hi: {
    greeting: (name) => `नमस्ते${name ? ` ${name}` : ""}! मैं स्वाबी, आपकी JobReels assistant. क्या मदत चाहिए? reels, नौकरी, profile या आवेदन के बारे में पूछें।`,
    help: "JobReels पर आप video reels से skills देख सकते हैं, नौकरी खोज सकते हैं, आवेदन की स्थिति देख सकते हैं, digital resume संभाल सकते हैं और chat में interview की जानकारी पा सकते हैं। Candidate, employer और admin के लिए अलग tools हैं।",
    noApps: "मुझे अभी आपकी profile के नाम से मेल खाने वाला आवेदन नहीं दिख रहा। अपनी स्थिति Profile के Applications section में देखें।",
    apps: (items) => `आपके ${items.length} आवेदनों की स्थिति: ${items.map((app) => `${app.jobTitle}, ${app.company}: ${app.status}`).join("; ")}।`,
    noJobs: "अभी इस खोज से मेल खाने वाली नौकरी नहीं दिख रही। कोई दूसरा skill या शहर बताकर देखें।",
    jobs: (items) => `${items.length} अच्छे अवसर मिले: ${items.map((job) => `${job.title}, ${job.company}, ${job.location}${job.salary ? `, वेतन ${job.salary}` : ""}`).join("; ")}। इन्हें Jobs page पर देखें।`,
    apply: "आवेदन के लिए Jobs page खोलें, पद चुनें और Apply दबाएँ। आपकी स्पष्ट अनुमति के बिना मैं आवेदन जमा नहीं करूँगी।",
    profile: (profile) => `आपकी profile में ${profile.name || "नाम नहीं जोड़ा गया"}${profile.education ? `, शिक्षा ${profile.education}` : ""}${profile.skills?.length ? `, skills ${profile.skills.join(", ")}` : ""} है। बदलाव के लिए profile का pencil चुनें।`,
    interview: "Interview से पहले job description और अपने projects पढ़ें। अपना परिचय, अनुभव और जरूरी skills के छोटे जवाब तैयार रखें। तय interview का समय और पता Profile के Applications section में मिलेगा।",
    reel: "Reels page पर skill videos देखें। अपना project दिखाने वाली reel पोस्ट करने के लिए नीचे + Post दबाएँ।",
    safety: "JobReels पर नौकरी खोजना मुफ़्त है। नौकरी या interview के लिए किसी को registration fee या deposit न दें। संदिग्ध job पर Report दबाएँ।",
    saved: (count) => count ? `आपने ${count} jobs save की हैं। उन्हें job card के bookmark से फिर देखें।` : "अभी कोई job save नहीं है। Job card पर bookmark दबाकर save करें।",
    employer: "Employer dashboard में vacancy पोस्ट करें, आवेदन देखें और candidates के interview तय करें।",
    admin: "Admin dashboard में job verification और संदिग्ध job reports के tools हैं।",
    generic: "मैं JobReels की jobs, profile, applications, interview, reels और navigation में मदद कर सकती हूँ। अपना सवाल थोड़ा और बताएँ?"
  },
  en: {
    greeting: (name) => `Hi${name ? ` ${name}` : ""}! I'm Swabiee, your JobReels assistant. How can I help? Ask me about reels, jobs, your profile, or applications.`,
    help: "JobReels lets you discover skills through short video reels, search jobs, track applications, manage your digital resume, and view interview details in chat. Candidates, employers, and admins each have their own tools.",
    noApps: "I can't see an application matching your profile name yet. Check the Applications section on your Profile page.",
    apps: (items) => `You have ${items.length} applications: ${items.map((app) => `${app.jobTitle} at ${app.company}: ${app.status}`).join("; ")}.`,
    noJobs: "I can't find a matching opening right now. Try another skill or city.",
    jobs: (items) => `I found ${items.length} matching openings: ${items.map((job) => `${job.title} at ${job.company}, ${job.location}${job.salary ? `, salary ${job.salary}` : ""}`).join("; ")}. You can view them on the Jobs page.`,
    apply: "To apply, open Jobs, choose a role, and tap Apply. I won't submit an application without your explicit confirmation.",
    profile: (profile) => `Your profile lists ${profile.name || "no name yet"}${profile.education ? `, education: ${profile.education}` : ""}${profile.skills?.length ? `, skills: ${profile.skills.join(", ")}` : ""}. Use the pencil on your profile to edit it.`,
    interview: "Before an interview, review the job description and your projects. Prepare short answers about yourself, your experience, and relevant skills. Scheduled interview details appear in Applications on your Profile page.",
    reel: "Browse skill videos on Reels. Use + Post at the bottom to publish a reel showing your project or work.",
    safety: "JobReels is free for job seekers. Never pay a registration fee or deposit for a job or interview. Use Report on a suspicious opening.",
    saved: (count) => count ? `You have saved ${count} jobs. Tap a job card's bookmark to find them again.` : "You haven't saved any jobs yet. Tap a bookmark on a job card to save it.",
    employer: "On the Employer dashboard, post a vacancy, review applications, and schedule candidate interviews.",
    admin: "The Admin dashboard contains job verification and suspicious-job report tools.",
    generic: "I can help with JobReels jobs, your profile, applications, interviews, reels, and navigation. Could you ask that another way?"
  }
};

const normalize = (value = "") => value.toLocaleLowerCase().replace(/[^\p{L}\p{M}\p{N}\s.-]/gu, " ");

export const detectSpeechLanguage = (text, preferredLanguage = "mr") => {
  const hasDevanagari = /[\u0900-\u097F]/.test(text);
  if (LANGUAGE_CUES.mr.test(text)) return "mr";
  if (LANGUAGE_CUES.hi.test(text)) return "hi";
  if (!hasDevanagari && /[a-z]/i.test(text)) return "en";
  return preferredLanguage;
};

export function answerSwabiee(question, context = {}) {
  const language = context.language || "mr";
  const copy = TEXT[language] || TEXT.mr;
  const q = normalize(question);
  const jobs = context.jobs || [];
  const role = context.role || "candidate";

  if (/(hello|hi\b|नमस्कार|नमस्ते|हाय|स्वाबी)/i.test(q) && q.split(/\s+/).length < 8) {
    return { text: copy.greeting(context.profile?.name?.split(" ")[0]) };
  }

  if (/(what can you do|about job.?reels|what is job.?reels|app features|काय करू शक|कशी मदत|अॅप.*काय|अॅप.*माहित|जानकारी|क्या कर सकती|क्या है job.?reels)/i.test(q)) {
    const roleNote = role === "employer" ? ` ${copy.employer}` : role === "admin" ? ` ${copy.admin}` : "";
    return { text: `${copy.help}${roleNote}` };
  }

  if (/(application status|my applications|applied jobs|job status|status of my|माझे अर्ज|माझा अर्ज|माझी स्थिती|अर्जाची स्थिती|अर्ज कुठे|मेरे आवेदन|मेरी application|आवेदन की स्थिति)/i.test(q)) {
    const items = context.myApplications || [];
    return { text: items.length ? copy.apps(items.slice(0, 4)) : copy.noApps };
  }

  if (/(interview|मुलाखत|इंटरव्यू)/i.test(q)) {
    const nextInterview = (context.myApplications || []).find((app) => app.interviewDetails);
    const detail = nextInterview?.interviewDetails;
    if (detail) {
      const when = [detail.date, detail.time].filter(Boolean).join(" at ");
      const address = detail.address ? ` ${language === "en" ? "The address is" : language === "hi" ? "पता है" : "पत्ता"} ${detail.address}.` : "";
      return { text: `${copy.interview} ${when ? `${language === "en" ? "Your scheduled interview is" : language === "hi" ? "आपका तय interview है" : "तुमची ठरलेली मुलाखत आहे"} ${when}.` : ""}${address}` };
    }
    return { text: copy.interview };
  }

  if (/(scam|fraud|fake job|money.*job|report|फसवणूक|बनावट|पैसे.*नोकरी|तक्रार)/i.test(q)) {
    return { text: copy.safety };
  }

  if (/(where am i|this page|what page|सध्या.*(पेज|पान)|कोणतं पेज)/i.test(q)) {
    const page = {
      "/": language === "en" ? "Reels" : language === "hi" ? "Reels" : "Reels",
      "/jobs": language === "en" ? "Jobs search" : language === "hi" ? "Jobs search" : "नोकरी शोध",
      "/profile": language === "en" ? "your Profile and digital resume" : language === "hi" ? "आपकी Profile और digital resume" : "तुमचं Profile आणि digital resume",
      "/chat": language === "en" ? "Chat with employers" : language === "hi" ? "employer के साथ Chat" : "employer सोबतचा Chat",
      "/employer": language === "en" ? "Employer dashboard" : language === "hi" ? "Employer dashboard" : "Employer dashboard",
      "/admin": language === "en" ? "Admin dashboard" : language === "hi" ? "Admin dashboard" : "Admin dashboard"
    }[context.path] || "JobReels";
    return { text: language === "en" ? `You're on ${page}. ${copy.help}` : language === "hi" ? `आप ${page} पर हैं। ${copy.help}` : `तुम्ही ${page} पेजवर आहात. ${copy.help}` };
  }

  const destinations = [
    { pattern: /(open|go to).*(jobs page|job page)|नोकऱ्या.*पेज.*उघड|नोकरी.*पेज.*उघड/i, path: "/jobs", label: { mr: "नोकऱ्या पेज", hi: "Jobs page", en: "Jobs page" } },
    { pattern: /(open|go to|show).*(profile|resume)|प्रोफाइल.*(उघड|दाखव)|रेझ्युम.*(उघड|दाखव)|प्रोफाइल.*(खोल|दिखा)/i, path: "/profile", label: { mr: "प्रोफाइल", hi: "profile", en: "Profile" } },
    { pattern: /(open|go to|show).*(chat|message)|चॅट.*(उघड|दाखव)|संदेश.*(दाखव|उघड)|चैट.*(खोल|दिखा)/i, path: "/chat", label: { mr: "चॅट", hi: "chat", en: "Chat" } },
    { pattern: /(open|go to|show).*(reels|home)|रील्स.*(उघड|दाखव)|मुख्य.*पेज/i, path: "/", label: { mr: "रील्स", hi: "Reels", en: "Reels" } }
  ];
  if (role === "employer") {
    destinations.push({ pattern: /(open|go to|show).*(employer|dashboard)|डॅशबोर्ड.*(उघड|दाखव)/i, path: "/employer", label: { mr: "employer dashboard", hi: "employer dashboard", en: "Employer dashboard" } });
  }
  if (role === "admin") {
    destinations.push({ pattern: /(open|go to|show).*(admin|dashboard)|अॅडमिन.*(उघड|दाखव)/i, path: "/admin", label: { mr: "admin dashboard", hi: "admin dashboard", en: "Admin dashboard" } });
  }
  const destination = destinations.find((item) => item.pattern.test(q));
  if (destination) {
    const labels = destination.label;
    const text = language === "en"
      ? `Sure, opening the ${labels.en} page.`
      : language === "hi"
        ? `ठीक है, ${labels.hi} पेज खोल रही हूँ।`
        : `ठीक आहे, ${labels.mr} पेज उघडते.`;
    return { text, action: { type: "navigate", path: destination.path } };
  }

  if (/(saved jobs|bookmarks|जतन केलेल्या|सेव्ह केलेल्या|सहेजे हुए|बुकमार्क)/i.test(q)) {
    const savedJobs = context.savedJobs || [];
    if (/(how many|किती|कितने)/i.test(q)) return { text: copy.saved(savedJobs.length) };
    if (savedJobs.length) {
      const items = savedJobs.slice(0, 3).map((job) => `${job.title}, ${job.company}`).join("; ");
      return { text: language === "en" ? `You have ${savedJobs.length} saved jobs: ${items}. Find them on your Profile page.` : language === "hi" ? `आपने ${savedJobs.length} jobs save की हैं: ${items}। इन्हें Profile page पर देखें।` : `तुम्ही ${savedJobs.length} नोकऱ्या जतन केल्या आहेत: ${items}. त्या Profile पेजवर पाहा.` };
    }
    return { text: language === "en" ? "You haven't saved any jobs yet. Tap the bookmark on a job to save it." : language === "hi" ? "अभी कोई job save नहीं की है। नौकरी पर bookmark दबाकर save करें।" : "अजून नोकरी जतन केलेली नाही. नोकरीवरील bookmark दाबून ती जतन करा." };
  }

  if (/(notification|alerts|सूचना|नोटिफिकेशन)/i.test(q)) {
    const items = context.notifications || [];
    return { text: items.length ? items.slice(0, 3).map((item) => `${item.title}: ${item.message}`).join(". ") : copy.help };
  }

  if (/(reel|video|रील|व्हिडिओ|पोस्ट)/i.test(q)) return { text: copy.reel };
  if (role === "employer" && /(employer|vacancy|post job|candidate|कंपनी|जाहिरात|नियोक्ता)/i.test(q)) return { text: copy.employer };
  if (role === "admin" && /(admin|report|verify|फसवणूक|तक्रार|अॅडमिन)/i.test(q)) return { text: copy.admin };

  if (/(salary|pay|experience|education|qualification|skills required|पगार|वेतन|अनुभव|पात्रता|शिक्षण|कौशल्यं)/i.test(q) && jobs.length) {
    const matchingJob = jobs.find((job) => {
      const titleTerms = normalize(job.title).split(/\s+/).filter((term) => term.length > 3);
      return titleTerms.some((term) => q.includes(term));
    });
    if (matchingJob) {
      const info = [
        /(salary|pay|पगार|वेतन)/i.test(q) && matchingJob.salary ? `${language === "en" ? "Salary" : language === "hi" ? "वेतन" : "पगार"}: ${matchingJob.salary}` : "",
        /(experience|अनुभव)/i.test(q) && matchingJob.experience ? `${language === "en" ? "Experience" : language === "hi" ? "अनुभव" : "अनुभव"}: ${matchingJob.experience}` : "",
        /(education|qualification|पात्रता|शिक्षण)/i.test(q) && matchingJob.education ? `${language === "en" ? "Education" : language === "hi" ? "शिक्षा" : "शिक्षण"}: ${matchingJob.education}` : "",
        /(skills required|कौशल्यं)/i.test(q) ? matchingJob.description : ""
      ].filter(Boolean);
      if (info.length) return { text: `${matchingJob.title}, ${matchingJob.company}. ${info.join(". ")}.` };
    }
  }

  if (/(profile|resume|रेझ्युम|बायोडाटा|प्रोफाइल|शिक्षण|कौशल्य|skills)/i.test(q)) {
    return { text: copy.profile(context.profile || {}) };
  }

  const searchIntent = /(job|jobs|opening|career|नोकरी|नोकऱ्या|जॉब|काम|कामाची संधी|रोजगार|नौकरी|नौकरियां)/i.test(q);
  if (/(apply|अप्लाय|आवेदन|अर्ज कर)/i.test(q)) return { text: copy.apply };

  if (searchIntent || /(fresher|नवशिक|फ्रेशर|10th|दहावी|दहावीनंतर|शहरात|पुण्यात|मुंबईत)/i.test(q)) {
    const cities = ["Pune", "Mumbai", "Chakan", "Bhosari", "Bhiwandi", "Nashik", "Nagpur"];
    const requestedCity = cities.find((city) => q.includes(city.toLocaleLowerCase()));
    let cityFiltered = requestedCity
      ? jobs.filter((job) => normalize(`${job.location} ${job.state || ""}`).includes(normalize(requestedCity)))
      : jobs;
    if (/(fresher|freshers|नवशिक|फ्रेशर)/i.test(q)) {
      cityFiltered = cityFiltered.filter((job) => /(fresher|0[- ]?2|0 years|no experience)/i.test(job.experience || ""));
    }
    if (/(10th|दहावी|दहावीनंतर)/i.test(q)) {
      cityFiltered = cityFiltered.filter((job) => /(10th|ssc|iti)/i.test(job.education || ""));
    }
    const terms = q.split(/\s+/).filter((word) => word.length > 2 && !/(find|search|show|jobs|job|near|in|fresher|freshers|नोकरी|शोध|दाखव|पुण्यात|मुंबईत|मला|हवी|आहे)/i.test(word));
    const specificMatches = terms.length
      ? cityFiltered.filter((job) => terms.some((term) => normalize(`${job.title} ${job.company} ${job.category} ${job.description} ${job.education} ${job.experience}`).includes(term)))
      : cityFiltered;
    const matches = (specificMatches.length ? specificMatches : cityFiltered).slice(0, 3);
    const wantsToBrowse = /(find|search|show|देख|दाखव|शोध|पाह|खोज)/i.test(q);
    return {
      text: matches.length ? copy.jobs(matches) : copy.noJobs,
      action: wantsToBrowse ? {
        type: "navigate",
        path: "/jobs",
        search: matches[0]?.title || ""
      } : undefined
    };
  }

  if (/(what.*page|where.*(jobs|profile|application)|नेव्हिगेट|कुठे.*(नोकरी|अर्ज|प्रोफाइल)|कैसे.*(खोज|देख)|कहाँ.*(नौकरी|आवेदन))/i.test(q)) {
    return { text: copy.help };
  }

  return { text: copy.generic };
}
