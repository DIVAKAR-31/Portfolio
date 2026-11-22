import {
  PersonalInfo,
  EducationEntry,
  SkillCategory,
  Project,
  WorkshopEntry,
  HackathonEntry,
  CertificationEntry
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
    subtitle: "AI-Powered E-Governance Platform for Public Grievance Tracking",
    shortDescription: "A modern civic technology platform designed to streamline public grievance reporting, categorize complaints, and bridge communication between citizens and urban municipal departments.",
    problem: "Citizens across multiple districts frequently struggle with fragmented reporting channels, lack of real-time grievance tracking, and duplicated submissions that overwhelm administrative departments.",
    solution: "CivicConnect conceptualizes a centralized public grievance management platform with intuitive complaint filing, automated classification via AI, visual progress telemetry, and structured administrative resolution workflows.",
    technologies: ["React", "Google Gemini API", "Custom Analytics", "Tailwind CSS"],
    githubUrl: "https://github.com/DIVAKAR-31/Civic-Connect",
    type: "prototype",
    implementationNote: "Current version is a frontend-focused UI prototype with simulated functionality to demonstrate the UX flow and AI interaction model. Proposed features (automated backend routing, live SMS notifications, and government database integrations) are conceptual blueprints and not yet connected to a production server.",
    features: [
      "Intuitive citizen complaint submission wizard with image and location attachment",
      "Simulated AI classification utilizing Google Gemini API prompt architecture",
      "Interactive status tracker from 'Submitted' to 'Under Review' and 'Resolved'",
      "Custom analytics dashboard demonstrating grievance density by category",
      "Accessible high-contrast UI tailored for desktop and mobile citizens"
    ],
    architectureOverview: "Frontend single-page application built with React, connecting to simulated AI endpoint mockups using structured Gemini API prompts. Real-time updates and analytics visualized through reactive client-side state.",
    accentColor: "#38BDF8",
    tag: "Civic Tech / UI Prototype",
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
    id: "attrition-prediction",
    number: "03",
    title: "Employee Attrition Prediction",
    subtitle: "Data Analytics & Predictive Machine Learning Workflow",
    shortDescription: "An end-to-end data science initiative focused on analyzing workforce retention drivers, examining demographic and satisfaction indicators, and formulating predictive modeling strategies.",
    problem: "Voluntary employee turnover imposes substantial institutional costs and organizational disruption. Organizations need proactive data-driven insights into key attrition predictors rather than reactive exit interviews.",
    solution: "A structured data analysis pipeline exploring employee attributes (compensation, work-life balance, years at company, promotion velocity) to uncover correlation patterns and prepare predictive machine learning models.",
    technologies: ["Python (Planned)", "Data Analytics", "EDA", "Statistical Analysis"],
    githubUrl: "https://github.com/DIVAKAR-31/Employee-attrition-prediction",
    type: "ml_pipeline",
    implementationNote: "This project follows a rigorous 8-stage data science lifecycle. Foundational stages (problem understanding, exploration, preprocessing, and exploratory data analysis) are completed, while model training and tuning are actively being developed. Numerical accuracy metrics are intentionally kept editable pending final model validation.",
    stages: [
      { name: "Problem Understanding", status: "Completed", note: "Defined turnover drivers and evaluation metrics" },
      { name: "Dataset Exploration", status: "Completed", note: "Inspected data schema, missing values, and distribution" },
      { name: "Data Preprocessing", status: "Completed", note: "Handled categorical encoding and data cleaning" },
      { name: "Exploratory Data Analysis (EDA)", status: "Completed", note: "Visualized correlation between job satisfaction and tenure" },
      { name: "Feature Analysis & Selection", status: "In Progress", note: "Evaluating feature importance and collinearity" },
      { name: "Predictive Modelling", status: "Planned", note: "Evaluating logistic regression, random forests, and gradient boosting" },
      { name: "Model Evaluation", status: "Planned", note: "Pending ROC-AUC, precision, and recall benchmarking" },
      { name: "Results Visualization & Reporting", status: "Planned", note: "Interactive dashboard for organizational decision-makers" }
    ],
    features: [
      "Rigorous exploratory analysis identifying critical retention stress points",
      "Correlation matrix mapping tenure, overtime hours, and promotion delays",
      "Modular data preprocessing pipeline ready for scikit-learn model fitting",
      "Transparent project lifecycle clearly tracking completed vs. future stages",
      "Designed with an ethical framework prioritizing fair workforce analytics"
    ],
    architectureOverview: "Data preprocessing and exploratory analysis pipeline with documented Jupyter notebooks, progressing into scikit-learn classification models and reporting dashboards.",
    accentColor: "#38BDF8",
    tag: "Data Science / In Progress",
    thumbnailGradient: "from-slate-950 via-cyan-950 to-blue-950"
  },
  {
    id: "order-to-audit",
    number: "04",
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

export const workshopsData: WorkshopEntry[] = [
  {
    id: "operation-code-heist",
    title: "OPERATION CODE HEIST",
    category: "Coding Contest",
    organizer: "Technical Club, Department of Information Technology",
    institution: "Sri Krishna College of Engineering and Technology (SKCET), Coimbatore",
    date: "8 August 2026",
    location: "SKCET, Coimbatore",
    description: "Participated in Operation Code Heist, a coding contest that provided an opportunity to engage with coding challenges, explore problem-solving, and strengthen programming skills.",
    highlights: [
      "Engaged with competitive coding challenges and problem-solving scenarios",
      "Applied structured algorithmic logic and efficient computational thinking",
      "Strengthened time-boxed programming, debugging, and problem-solving skills"
    ],
    skillsGained: [
      "Competitive Programming",
      "Problem Solving",
      "Algorithm Design",
      "Code Optimization"
    ],
    badgeColor: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10",
    linkUrl: "https://lnkd.in/p/gMiqxnPe"
  },
  {
    id: "vibe-coding",
    title: "Vibe Coding Workshop 2026",
    category: "Workshop",
    organizer: "StartupTN in collaboration with Google for Developers",
    institution: "Noorul Islam Centre for Higher Education, Kumaracoil, Kanniyakumari District",
    date: "30 October 2026",
    location: "Kumaracoil, Kanniyakumari District",
    description: "Participated in Vibe Coding Workshop 2026 and explored AI-powered development, emerging approaches to application development, and the growing role of Artificial Intelligence in software development.",
    highlights: [
      "Explored AI-powered development paradigms and next-generation software workflows",
      "Investigated emerging developer approaches to application development and LLM coding tools",
      "Gained comprehensive insights into the growing role of Artificial Intelligence in software development"
    ],
    skillsGained: [
      "AI-Powered Development",
      "Vibe Coding",
      "LLM Workflows",
      "Application Development"
    ],
    badgeColor: "border-electricBlue/40 text-cyanAccent bg-electricBlue/10",
    linkUrl: "https://lnkd.in/p/g_Mbgfke"
  }
];

export const hackathonsData: HackathonEntry[] = [
  {
    id: "adobe-hackathon",
    title: "Adobe University Hackathon",
    organizer: "Adobe",
    edition: "University Challenge — Online Assessment",
    date: "Online Assessment Round",
    role: "Participant",
    participationDescription: "Successfully completed the rigorous Online Assessment round of the Adobe University Hackathon, solving complex algorithmic challenges and coding problems under strict time constraints.",
    problemStatement: "Advanced problem solving encompassing data structures, algorithmic efficiency, and logical reasoning.",
    projectOrSubmission: "Demonstrated strong computational thinking and competitive programming problem resolution.",
    teamDetails: "Individual Online Assessment",
    badge: "Adobe University"
  },
  {
    id: "smart-india-hackathon",
    title: "Smart India Hackathon (SIH)",
    organizer: "Ministry of Education / AICTE",
    edition: "National Initiative",
    date: "Internal / Ideation Phase",
    role: "Participant & Team Contributor",
    participationDescription: "Engaged in the nationwide Smart India Hackathon initiative, brainstorming national-scale technological interventions to solve governance and societal challenges.",
    problemStatement: "Addressing critical digital infrastructure and public service bottlenecks through open innovation.",
    projectOrSubmission: "Collaborative ideation and prototype architecture aligned with citizen-centric governance workflows.",
    teamDetails: "Interdisciplinary collegiate problem-solving team",
    badge: "National Hackathon"
  },
  {
    id: "thamizhan-skills-ideathon",
    title: "Thamizhan Skills Ideathon",
    organizer: "Thamizhan Skills",
    edition: "Ideation Challenge",
    date: "Ideathon Participation",
    role: "Participant / Ideator",
    participationDescription: "Participated in the Thamizhan Skills Ideathon, engaging in rapid ideation, collaborative problem-solving, and technology innovation sessions.",
    problemStatement: "Ideating innovative technological solutions and software interventions to address real-world community challenges.",
    projectOrSubmission: "Ideathon concept proposal and presentation (details editable / to be updated).",
    teamDetails: "Collaborative Team Participation",
    badge: "Ideathon"
  },
  {
    id: "civicconnect-cit-paper-presentation",
    title: "CivicConnect — Paper Presentation",
    organizer: "Coimbatore Institute of Technology (CIT)",
    edition: "Paper Presentation Symposium",
    date: "31 January 2026",
    role: "Paper Presenter & Team Contributor",
    participationDescription: "Presented a technical paper on CivicConnect (an AI-powered e-governance platform for public grievance tracking) at Coimbatore Institute of Technology (CIT), demonstrating citizen reporting workflows, automated complaint categorization, and administrative resolution pipelines.",
    problemStatement: "Streamlining urban grievance reporting, real-time status telemetry, and automated routing for municipal departments.",
    projectOrSubmission: "Technical Paper Presentation & System Architecture for CivicConnect.",
    teamDetails: "Team Project (Collaborative Presentation)",
    badge: "Paper Presentation"
  }
];

export const certificationsData: CertificationEntry[] = [
  {
    id: "hackerrank-csharp",
    title: "C# (Basic) Certification",
    issuer: "HackerRank",
    issueDate: "Verified Credential",
    credentialId: "HACKERRANK-CSHARP-BASIC",
    skills: ["C#", "Object-Oriented Programming", "Control Structures"],
    category: "Programming",
    iconType: "code"
  },
  {
    id: "hackerrank-css",
    title: "CSS (Basic) Certification",
    issuer: "HackerRank",
    issueDate: "Verified Credential",
    credentialId: "HACKERRANK-CSS-BASIC",
    skills: ["CSS3", "Responsive Layouts", "Flexbox", "Selectors"],
    category: "Web Development",
    iconType: "layout"
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Certification",
    issuer: "Design & UX Training Program",
    issueDate: "Completed",
    skills: ["User Centered Design", "Wireframing", "Visual Hierarchy", "Prototyping"],
    category: "Design",
    iconType: "figma"
  },
  {
    id: "microsoft-fabric-cert",
    title: "Microsoft Fabric in Action Workshop Certificate",
    issuer: "Workshop Learning Partner",
    issueDate: "Workshop Completion",
    skills: ["Microsoft Fabric", "Lakehouse", "Data Pipelines", "Power BI"],
    category: "Data & Analytics",
    iconType: "database"
  }
];

