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
  }
];

export const workshopsData: WorkshopEntry[] = [
  {
    id: "fabric-workshop",
    title: "Microsoft Fabric in Action",
    organizer: "Technical Community / Workshop Partner",
    date: "Academic Year 2025 – 2026",
    location: "Hands-on Technical Session",
    description: "Building End-to-End Data Analytics Solutions using the unified Microsoft Fabric enterprise ecosystem.",
    highlights: [
      "Deep exploration of the unified Microsoft Fabric architecture and OneLake data lakehouse concept",
      "Hands-on exposure to modern data engineering pipelines and Lakehouse transformation workflows",
      "Enterprise data warehousing practices and SQL analytics endpoint querying",
      "Real-Time Analytics engine capabilities for high-throughput streaming telemetry",
      "Direct Lake mode Power BI visualization and interactive dashboard construction"
    ],
    skillsGained: [
      "Microsoft Fabric",
      "Data Engineering",
      "Data Warehousing",
      "Real-time Analytics",
      "Power BI Visualization"
    ],
    badgeColor: "border-sky-500/40 text-sky-400 bg-sky-500/10"
  },
  {
    id: "vibe-coding",
    title: "Vibe Coding Workshop",
    organizer: "Developer Community",
    date: "Recent Session",
    location: "Technical Workshop",
    description: "Interactive session exploring AI-first modern software development methodologies, prompt engineering for code generation, and rapid prototyping workflows.",
    highlights: [
      "AI-assisted coding paradigms using next-gen developer tools and LLM code interpreters",
      "Iterative prompt refinement strategies for architectural scaffolding and unit test synthesis",
      "Accelerated ideation-to-prototype workflows reducing development cycle times",
      "Hands-on exploration of developer productivity amplifiers"
    ],
    skillsGained: [
      "AI-Assisted Coding",
      "Rapid Prototyping",
      "Developer Productivity",
      "Workflow Automation"
    ],
    badgeColor: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10"
  },
  {
    id: "aws-event",
    title: "AWS Event Participation",
    organizer: "Amazon Web Services (AWS) Community",
    date: "Technical Session",
    location: "Cloud Computing Forum",
    description: "Immersive exposure to cloud computing foundations, serverless architectures, and AWS ecosystem fundamentals.",
    highlights: [
      "Foundational cloud compute, storage, and networking primitives (EC2, S3, VPC)",
      "Serverless computing concepts and scalable event-driven cloud functions",
      "Modern cloud security standards, IAM role policies, and architectural best practices",
      "Industry case studies on deploying resilient cloud infrastructures"
    ],
    skillsGained: [
      "Cloud Fundamentals",
      "AWS Core Services",
      "Serverless Architecture",
      "Cloud Security Foundations"
    ],
    badgeColor: "border-blue-500/40 text-blue-400 bg-blue-500/10"
  }
];

export const hackathonsData: HackathonEntry[] = [
  {
    id: "samsung-hackathon",
    title: "Samsung Hackathon / Innovation Participation",
    organizer: "Samsung",
    edition: "Innovation Challenge",
    date: "Academic Edition",
    role: "Participant / Innovator",
    participationDescription: "Participated in the Samsung Innovation Challenge, collaborating on technology-driven problem statements addressing real-world user scenarios and device connectivity.",
    problemStatement: "Ideating innovative smart solutions and exploring user-centric mobile and IoT software interventions.",
    projectOrSubmission: "Explored intelligent feature concepts leveraging modern device capabilities and responsive software flows.",
    teamDetails: "Team collaboration emphasizing technical synergy and innovative problem solving.",
    badge: "Samsung Innovation"
  },
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

