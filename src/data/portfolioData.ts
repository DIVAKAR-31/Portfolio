import {
  PersonalInfo,
  EducationEntry,
  SkillCategory,
  Project,
  WorkshopEntry,
  HackathonEntry,
  CertificationEntry,
  AchievementItem
} from '../types/portfolio';

export const personalInfo: PersonalInfo = {
  name: "Divakar S.",
  shortName: "Divakar",
  title: "B.Tech IT Student | Technology Enthusiast",
  tagline: "Building Ideas Into Digital Experiences.",
  college: "Sri Krishna College of Engineering and Technology (SKCET)",
  location: "Coimbatore, Tamil Nadu",
  email: "sdivakar052@gmail.com",
  github: "https://github.com/DIVAKAR-31",
  linkedin: "https://linkedin.com/in/divakar-s-123134375",
  bio: "I am a B.Tech Information Technology student passionate about programming, artificial intelligence, software development and innovative technology solutions. I enjoy exploring new technologies, building practical projects and continuously improving my technical skills. My interests include software development, AI-integrated applications, UI/UX design and data analytics.",
  profileImage: "/images/divakar-profile.jpg",
  rotatingTitles: [
    "Information Technology Student",
    "Software Development Enthusiast",
    "AI Explorer",
    "Technology Enthusiast"
  ]
};

export const educationData: EducationEntry[] = [
  {
    id: "skcet-btech",
    institution: "Sri Krishna College of Engineering and Technology (SKCET)",
    degree: "B.Tech Information Technology",
    location: "Coimbatore, Tamil Nadu",
    duration: "2025 – Present",
    score: "9.2 / 10",
    scoreLabel: "CGPA (up to 2nd semester)",
    courseworkOrSubjects: [
      "Database Management Systems",
      "Data Structures and Algorithms",
      "Object Oriented Programming"
    ],
    status: "Currently Pursuing"
  },
  {
    id: "sbk-hse",
    institution: "SBK Boys Higher Secondary School",
    degree: "Higher Secondary (HSE)",
    location: "Aruppukottai, Tamil Nadu",
    duration: "Completed",
    score: "91.83%",
    scoreLabel: "Overall Percentage",
    courseworkOrSubjects: [
      "Mathematics",
      "Physics",
      "Chemistry"
    ],
    status: "Completed"
  },
  {
    id: "sbkkss-sslc",
    institution: "SBKKSS Thiyagarajan Memorial Matriculation School",
    degree: "Secondary School (SSLC)",
    location: "Aruppukottai, Tamil Nadu",
    duration: "Completed",
    score: "93.4%",
    scoreLabel: "Overall Percentage",
    courseworkOrSubjects: [
      "Mathematics",
      "Science",
      "Social Science",
      "English",
      "Tamil"
    ],
    status: "Completed"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    category: "PROGRAMMING",
    description: "Core structured & object-oriented programming foundations",
    skills: [
      { name: "Java", highlight: true },
      { name: "C++", highlight: true },
      { name: "C", highlight: false }
    ]
  },
  {
    title: "Web Development",
    category: "WEB DEVELOPMENT",
    description: "Responsive web interfaces and standards-compliant markup",
    skills: [
      { name: "HTML", highlight: true },
      { name: "CSS", highlight: true }
    ]
  },
  {
    title: "Database Systems",
    category: "DATABASE",
    description: "Relational database modeling and SQL query architecture",
    skills: [
      { name: "MySQL", highlight: true },
      { name: "Database Management Systems", highlight: true }
    ]
  },
  {
    title: "AI & Emerging Tech",
    category: "AI AND TECHNOLOGY",
    description: "Modern generative AI models and API integrations",
    skills: [
      { name: "Google Gemini API", highlight: true }
    ]
  },
  {
    title: "Development Tools",
    category: "TOOLS",
    description: "Modern source control, code editing and developer workflows",
    skills: [
      { name: "Visual Studio Code", highlight: true },
      { name: "GitHub", highlight: true }
    ]
  },
  {
    title: "Academic Coursework",
    category: "ACADEMIC COURSEWORK",
    description: "Core computer science fundamentals and theoretical foundations",
    skills: [
      { name: "Data Structures and Algorithms", highlight: true },
      { name: "Database Management Systems", highlight: true }
    ]
  },
  {
    title: "Professional & Soft Skills",
    category: "SOFT SKILLS",
    description: "Collaborative mindset and analytical execution capabilities",
    skills: [
      { name: "Adaptability", highlight: true },
      { name: "Teamwork and Collaboration", highlight: true },
      { name: "Time Management", highlight: false },
      { name: "Critical Thinking", highlight: true }
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: "civicconnect",
    number: "01",
    title: "CivicConnect",
    subtitle: "AI-Driven Public Grievance Management & Municipal Oversight Platform",
    shortDescription: "An AI-driven public grievance management platform designed for citizen complaint reporting and tracking, administrative complaint management, authority-based escalation, and AI-assisted categorization.",
    problem: "Citizens across urban and rural jurisdictions frequently encounter fragmented complaint channels, lack of visibility into resolution timelines, and delayed administrative follow-up, causing critical civic issues to remain unaddressed.",
    solution: "CivicConnect connects citizens, municipal administrators, and hierarchical government authorities through a unified platform featuring AI-assisted categorization and prioritization, real-time grievance tracking, admin complaint management, and authority-level escalation.",
    technologies: [
      "React 19",
      "TypeScript",
      "Node.js",
      "Express 5",
      "SQLite",
      "Google Gemini API",
      "Tailwind CSS",
      "Leaflet Maps"
    ],
    githubUrl: "https://github.com/DIVAKAR-31/Civic-Connect",
    liveDemoUrl: "https://civic-connect-six-tau.vercel.app/",
    type: "full_stack",
    implementationNote: "Full-stack public grievance management platform built with React 19, an Express 5 REST API, and SQLite persistence. Features citizen complaint reporting with geotagged Leaflet mapping and real-time tracking, an admin dashboard for complaint management and department dispatch, a 3-tier government authority escalation workflow (Village President → Taluk Officer → District Collector), and Google Gemini AI integration for automated category classification and priority assessment.",
    features: [
      "AI-driven public grievance management platform connecting citizens, municipal administrators, and authorities",
      "Citizen complaint reporting and tracking with photo uploads, Leaflet map geotagging, and real-time status updates",
      "Admin dashboard and complaint management with department assignment, resolution status updates, and report generation",
      "Authority-based complaint escalation across 3 governance tiers (Village/City President → Taluk Officer → District Collector)",
      "AI-assisted categorization and prioritization with duplicate grievance matching and automated department routing"
    ],
    architectureOverview: "Modular full-stack architecture featuring a responsive React 19 frontend with Leaflet mapping, an Express 5 REST API gateway with SQLite persistence and JWT authentication, and server-side Google Gemini API integration for automated grievance triage and urgency scoring.",
    accentColor: "#38BDF8",
    tag: "AI & Civic Tech / Full-Stack",
    thumbnailGradient: "from-sky-950 via-slate-900 to-cyan-950"
  },
  {
    id: "uniserve",
    number: "02",
    title: "UniServe",
    subtitle: "AI-Powered Labour Cooperative Services Platform",
    shortDescription: "A comprehensive digital platform concept connecting households and institutions directly with certified tradespersons from Labour Cooperative Societies.",
    problem: "Labour Cooperative Societies represent thousands of certified tradespersons (electricians, plumbers, carpenters) who remain chronically underutilized due to manual paper rosters, lack of digital access, and exploitative 25-35% commissions charged by monopolistic corporate gig platforms.",
    solution: "UniServe designs a multi-tenant, equitable cooperative ecosystem where workers maintain autonomy, fair rates are locked transparently, and clients access verified craftsmanship backed by cooperative federations.",
    technologies: [
      "React Native",
      "Expo SDK",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Redis",
      "Google Maps API"
    ],
    liveDemoUrl: "https://uni-serv.vercel.app/",
    githubUrl: "https://github.com/DIVAKAR-31/Uni-Serve",
    type: "case_study",
    implementationNote: "Detailed architecture design and platform concept based on project documentation. Systems architecture, data schema, and operational protocols are mapped out for multi-tier cooperative rollouts.",
    features: [
      "Multi-tenant role-based portals (Households, Certified Workers, Cooperative Society Admins)",
      "Direct verified cooperative member dispatch eliminating third-party broker cuts",
      "AI-assisted video fault diagnosis to pre-determine spare parts and job complexity",
      "Standardized rate-card locking transparently defined by district cooperative unions",
      "Panchayat cluster routing to minimize travel overhead and prioritize local labor",
      "Offline-first OTP verification ensuring tamper-proof service initiation and completion",
      "Milestone-based escrow settlements with guaranteed fair wage payouts",
      "Administrative federation oversight dashboard with social security & welfare tracking"
    ],
    architectureOverview: "Distributed mobile client (React Native/Expo) communicating with an Express.js API gateway, backed by PostgreSQL for transactional integrity and Redis for geospatial worker clustering and session caching.",
    accentColor: "#22D3EE",
    tag: "Social Impact / Case Study",
    thumbnailGradient: "from-blue-950 via-indigo-950 to-slate-900"
  },
  {
    id: "order-to-audit",
    number: "03",
    title: "Order-to-Audit System for a Small Food Manufacturer",
    subtitle: "Integrated Business Management, Inventory & 5% GST Tax Invoicing Platform",
    shortDescription: "An integrated business management system engineered for a South Indian snacks manufacturer (Murukku, Mixture, Chips, Sweets) to seamlessly unify sales orders, inventory tracking, production batch auditing, 5% GST tax invoicing, payment tracking, and statutory audit reports.",
    problem: "Small food manufacturing enterprises frequently struggle with fragmented offline records: discrepancies between raw material dough mixing and finished packet output, undetected frying yield and packaging losses, unbilled dispatches, and manual tax calculations across intra-state (CGST+SGST) and interstate (IGST) sales.",
    solution: "A full-stack enterprise web application unifying manufacturing and sales operations into a single verifiable audit trail. The system tracks raw material BOM issuance, audits production batch yields and wastage, manages salesman order bookings with multi-tier approval workflows, automates 5% GST billing with PDF invoice generation, and reconciles customer accounts receivable.",
    technologies: [
      "FastAPI",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "SQLAlchemy",
      "SQLite / PostgreSQL",
      "ReportLab PDF",
      "OpenPyXL"
    ],
    githubUrl: "https://github.com/DIVAKAR-31/order-to-audit-system",
    demoVideoUrl: "https://youtu.be/6hrgj-NFUSY",
    type: "full_stack",
    implementationNote: "Engineered as a full-stack system adhering to the NIT Tiruchirappalli (Centre for Digital Infrastructure) manufacturing benchmark specification. Incorporates real-time BOM dough yield calculations (-6% yield variance and +5% oil consumption detection), intra-state (CGST 2.5% + SGST 2.5%) vs inter-state (IGST 5.0%) tax logic with HSN 21069099, and automated multi-tab Excel (.xlsx) / PDF audit exports.",
    features: [
      "Sales order management with responsive mobile order-booking and workflow approvals (Pending → Approved → Dispatched)",
      "Real-time inventory tracking for raw materials (flours, oils, spices) and packaging with FIFO stock ledger audit",
      "Production batch auditing tracking planned vs actual output, yield variances (-6.0%), and process scrap loss (2.4 kg)",
      "Automated 5% GST tax invoicing with CGST/SGST bifurcation for Tamil Nadu and IGST for interstate customers",
      "Customer payment and collections ledger with instant accounts receivable balance reconciliation",
      "Comprehensive monthly audit reports with one-click multi-tab Excel (.xlsx) and print-ready PDF export"
    ],
    architectureOverview: "Decoupled full-stack architecture featuring a React 19 Single Page Application with Tailwind CSS, communicating with a high-concurrency Python FastAPI REST API. Data persistence is managed via SQLAlchemy ORM with SQLite for zero-config local execution and PostgreSQL support for cloud deployments, backed by ReportLab and openpyxl engines for document generation.",
    accentColor: "#38BDF8",
    tag: "Full-Stack / Food Mfg Audit",
    thumbnailGradient: "from-blue-950 via-slate-900 to-indigo-950"
  }
];

export const certificationsAchievementsData: AchievementItem[] = [
  // 1. Workshops & Technical Events
  {
    id: "vibe-coding-2026",
    title: "Vibe Coding Workshop 2026",
    organization: "StartupTN in collaboration with Google for Developers",
    date: "30 October 2026",
    category: "Workshop",
    categoryLabel: "Workshop",
    roleOrEdition: "Hands-on Workshop",
    credentialId: "VCW26-TTBB9",
    certificateImage: "/certificates/vibe-coding-2026.jpg",
    certificateUrl: "/certificates/vibe-coding-2026.jpg",
    skillsOrHighlights: ["AI-Powered Development", "Vibe Coding", "LLM Workflows", "Application Development"],
    description: "Successfully participated in the Vibe Coding Workshop 2026 organized by StartupTN in collaboration with Google for Developers at Noorul Islam Centre for Higher Education, exploring AI-assisted development, LLM engineering, and modern application workflows.",
    badgeColor: "border-electricBlue/40 text-cyanAccent bg-electricBlue/10",
    iconType: "laptop"
  },
  {
    id: "operation-code-heist",
    title: "OPERATION CODE HEIST",
    organization: "Technical Club, Department of IT, SKCET",
    date: "08 August 2026",
    category: "Workshop",
    categoryLabel: "Technical Event",
    roleOrEdition: "Coding Contest",
    certificateImage: "/certificates/operation-code-heist.jpg",
    certificateUrl: "/certificates/operation-code-heist.jpg",
    skillsOrHighlights: ["Competitive Programming", "Algorithms", "Data Structures", "Problem Solving"],
    description: "Actively participated in Operation Code Heist, an intensive collegiate coding contest organized by the Technical Club of the Department of Information Technology at Sri Krishna College of Engineering and Technology (SKCET), Coimbatore.",
    badgeColor: "border-amber-500/30 text-amber-400 bg-amber-950/20",
    iconType: "terminal"
  },

  // 2. Hackathons & Ideathons
  {
    id: "thamizhan-skills-ideathon",
    title: "Thamizhan Skills Ideathon 2026",
    organization: "Tamizhan Skills",
    date: "24 January 2026",
    category: "Ideathon",
    categoryLabel: "Ideathon",
    roleOrEdition: "Social Impact (Open Category)",
    certificateImage: "/certificates/tamizhan-skills-ideathon.jpg",
    certificateUrl: "/certificates/tamizhan-skills-ideathon.jpg",
    skillsOrHighlights: ["Social Impact Innovation", "Rapid Ideation", "Collaborative Problem Solving", "Community Tech"],
    description: "Actively participated in IDEATHON 2026 organized by Tamizhan Skills, submitting an innovative idea under the domain of Social Impact (Open Category) recognized for creativity, problem-solving, and commitment towards social innovation.",
    badgeColor: "border-pink-500/30 text-pink-400 bg-pink-950/20",
    iconType: "lightbulb"
  },
  {
    id: "adobe-hackathon",
    title: "Adobe University Hackathon",
    organization: "Adobe & Unstop",
    date: "9 August 2026",
    category: "Hackathon",
    categoryLabel: "Hackathon",
    roleOrEdition: "Adobe University Hackathon",
    certificateImage: "/certificates/adobe-hackathon.jpg",
    certificateUrl: "/certificates/adobe-hackathon.jpg",
    skillsOrHighlights: ["Competitive Programming", "Algorithmic Efficiency", "Data Structures", "Logical Reasoning"],
    description: "Earned Certificate of Participation from Adobe and Unstop for actively participating in the nationwide Adobe University Hackathon, solving complex computational and algorithmic challenges.",
    badgeColor: "border-rose-500/30 text-rose-400 bg-rose-950/20",
    iconType: "code"
  },
  {
    id: "smart-india-hackathon",
    title: "Smart India Hackathon (SIH)",
    organization: "Ministry of Education / AICTE",
    date: "National Initiative",
    category: "Hackathon",
    categoryLabel: "National Hackathon",
    roleOrEdition: "National Initiative",
    skillsOrHighlights: ["Public Service Innovation", "Citizen-Centric Systems", "National Governance", "Team Collaboration"],
    description: "Engaged in the nationwide Smart India Hackathon initiative, brainstorming national-scale technological interventions to solve governance and societal challenges through open innovation.",
    badgeColor: "border-emerald-500/30 text-emerald-400 bg-emerald-950/20",
    iconType: "trophy"
  },

  // 3. Paper Presentation
  {
    id: "civicconnect-cit-paper-presentation",
    title: "CivicConnect — Paper Presentation (CRYPTERA 2026)",
    organization: "Coimbatore Institute of Technology (CIT)",
    date: "30–31 January 2026",
    category: "Paper Presentation",
    categoryLabel: "Paper Presentation",
    roleOrEdition: "CRYPTERA 2026 Technical Symposium",
    certificateImage: "/certificates/cit-paper-presentation.jpg",
    certificateUrl: "/certificates/cit-paper-presentation.jpg",
    skillsOrHighlights: ["E-Governance Architecture", "Public Grievance Oversight", "AI Triage Routing", "Civic Tech"],
    description: "Participated in the Paper Presentation event conducted during CRYPTERA 2026, a National Level Technical Symposium organized by the Department of Computer Science and Engineering at Coimbatore Institute of Technology (CIT), presenting the CivicConnect e-governance platform.",
    badgeColor: "border-blue-500/30 text-blue-400 bg-blue-950/20",
    iconType: "fileText"
  }
];

// Compatibility exports to prevent breaking external references
export const certificationsData: CertificationEntry[] = [];
export const workshopsData: WorkshopEntry[] = [];
export const hackathonsData: HackathonEntry[] = [];

