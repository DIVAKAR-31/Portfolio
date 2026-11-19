# 🌌 Divakar S. — Premium Futuristic Personal Portfolio

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=black)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

An award-winning, premium futuristic personal portfolio designed and engineered for **Divakar S.** (B.Tech Information Technology student at Sri Krishna College of Engineering and Technology, SKCET, Coimbatore).

---

## 🚀 Key Highlights & Architectural Features

### 🌠 1. Signature Cinematic Shooting Star & Comet Intro
- **Visual Sequence**: Starts on a pitch-dark navy space canvas (`#050816`). A tiny white-blue central star sparks to life, pulses and intensifies in brightness, then swoops gracefully across the screen as a blazing **shooting star**. Its tail expands into a brilliant **electric-blue and cyan glowing comet**, showering trailing stardust particles across the viewport before illuminating the screen in a cosmic wipe that smoothly reveals the homepage.
- **Performance & Accessibility**: Built on HTML5 Canvas and mathematical Bézier kinematics (60fps) without heavy video backgrounds. Respects `prefers-reduced-motion`, includes an instant `Skip Intro` control, and uses `sessionStorage` to run once per browsing session (with a dedicated **"Replay Intro"** button in the navigation bar to experience it again anytime).

### 🎨 2. Dark Futuristic Design System
- **Theme**: Dark Futuristic / High-Technology Glassmorphism.
- **Palette**:
  - Background: `#050816`
  - Secondary Background: `#0B1224`
  - Card Background: `#101A30`
  - Electric Blue: `#38BDF8`
  - Primary Blue: `#2563EB`
  - Cyan Accent: `#22D3EE`
  - High-Contrast White: `#F8FAFC`
  - Muted Slate: `#94A3B8`
- **Atmospheric Layering**: Cosmic starfield with periodic micro-comets, electric-blue glowing custom cursor with dynamic particle trail (auto-disabled on touch devices), subtle cyber grids, and magnetic button physics.

### 🧭 3. Comprehensive Sections
1. **Homepage / Hero**:
   - Holographic logo `DIVAKAR S.` with status telemetry pill.
   - Headline: *"Building Ideas Into Digital Experiences."*
   - Typewriter animated rotating focus text: *Information Technology Student*, *Software Development Enthusiast*, *AI Explorer*, *Technology Enthusiast*.
   - Direct CTA buttons (`Explore My Projects`, `Contact Me`) and working GitHub & LinkedIn badges.
   - Holographic geometric profile avatar placeholder with one-click custom photo uploader.
   - **Strictly excludes any resume download button**, as requested.
2. **About Me**:
   - Split-layout narrative covering Divakar's SKCET academic journey, engineering philosophy, and interest in AI-integrated apps.
   - 4 foundational pillars: *Programming & Development*, *AI-Integrated Solutions*, *Problem-Solving Mindset*, and *Adaptability & Teamwork*.
   - Verified stat cards (9.2 CGPA up to 2nd semester, 3 key projects, 3+ hackathons).
3. **Education Timeline**:
   - Vertical glowing timeline with milestone nodes.
   - **SKCET** — B.Tech Information Technology (Coimbatore, Tamil Nadu, 2025 – Present, CGPA: 9.2/10, DBMS coursework).
   - **SBK Boys Higher Secondary School** — HSE (Aruppukottai, Tamil Nadu, 91.83%, Maths, Physics, Chemistry).
   - **SBKKSS Thiyagarajan Memorial Matriculation School** — SSLC (Aruppukottai, Tamil Nadu, 93.4%).
4. **Technical Skills**:
   - Categorized cards with live filter pills:
     - **Programming**: Java, C++, C
     - **Web Development**: HTML, CSS
     - **Database**: MySQL, Database Management Systems
     - **AI & Technology**: Google Gemini API
     - **Tools**: Visual Studio Code, GitHub
     - **Academic Coursework**: Data Structures and Algorithms, Database Management Systems
     - **Soft Skills**: Adaptability, Teamwork and Collaboration, Time Management, Critical Thinking
   - Accurate and unexaggerated.
5. **Projects (Curated & Detailed)**:
   - **01 — CivicConnect**: AI-Powered E-Governance Platform for Public Grievance Tracking (React, Google Gemini API, Custom Analytics). Frontend UI prototype with simulated grievance filing wizard and AI categorization; linked to [GitHub repository](https://github.com/DIVAKAR-31/Civic-Connect).
   - **02 — UniServe**: AI-Powered Labour Cooperative Services Platform (React Native, Expo, Node.js, Express, PostgreSQL, Redis, Google Maps API). Architectural case study detailing 8 cooperative platform features, rate-card locking, and role-based portals.
   - **03 — Employee Attrition Prediction**: Data analytics & predictive modeling lifecycle tracking 8 sequential stages, with completed stages (Problem Understanding, Dataset Exploration, Preprocessing, EDA) distinguished from in-progress/planned stages.
   - **Deep-Dive Modal**: Each card opens a multi-tab case study window with *Overview*, *Capabilities/Stages*, *Architecture Topology*, and *Interactive Showcase*.
6. **Workshops & Technical Experiences**:
   - *Microsoft Fabric in Action: Building End-to-End Data Analytics Solutions* (Fabric ecosystem, OneLake, Lakehouse, Real-time analytics, Power BI).
   - *Vibe Coding Workshop* (AI-assisted rapid prototyping, LLM prompt engineering).
   - *AWS Event Participation* (Cloud primitives, EC2/S3/VPC, serverless architectures).
7. **Hackathons & Innovation**:
   - *Samsung Hackathon / Innovation Participation*
   - *Adobe University Hackathon — Online Assessment*
   - *Smart India Hackathon (SIH)*
   - Verifiable participation details with editable placeholders for dates and teams.
8. **Certifications**:
   - HackerRank C# Basic Certification
   - HackerRank CSS Basic Certification
   - UI/UX Design Certification
   - Microsoft Fabric Workshop Certificate
   - Interactive modal with verified digital credentials and celebratory confetti triggers.
9. **Contact & Communication**:
   - Contact form with client-side validation (Name, Email, Subject, Message).
   - Loading, success, and error state handling.
   - Copy-to-clipboard email trigger for `sdivakar052@gmail.com`.
   - Direct `mailto:` transmission link for native email clients.
   - Verified GitHub and LinkedIn links.

---

## 🛠️ Project Structure

```bash
Portfolio/
├── index.html                    # SEO-optimized HTML5 entry with Space Grotesk & JetBrains Mono
├── package.json                  # Dependencies & build scripts
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.js            # Futuristic color tokens, fonts & animations
├── tsconfig.json                 # TypeScript compiler configuration
├── vite.config.ts                # Vite bundler configuration
├── scripts/
│   └── setup-wasm.cjs            # Rollup WASM compatibility hook for restricted environments
└── src/
    ├── App.tsx                   # Main application layout & session intro logic
    ├── main.tsx                  # React DOM bootstrap
    ├── data/
    │   └── portfolioData.ts      # ⭐ Centralized data source for personal info, projects & education
    ├── types/
    │   └── portfolio.ts          # Strongly-typed TypeScript interfaces
    ├── styles/
    │   └── index.css             # Glassmorphism, cyber neon glows & custom scrollbar
    └── components/
        ├── common/
        │   ├── BackToTop.tsx     # Floating return-to-top button
        │   ├── MagneticButton.tsx# Interactive magnetic spring button with light gleam
        │   └── SectionHeading.tsx# Futuristic glowing section title & tag badge
        ├── intro/
        │   └── CinematicIntro.tsx# 🌠 Signature shooting star to glowing comet intro animation
        ├── layout/
        │   ├── BackgroundStarfield.tsx # Subtle drifting stars & atmospheric nebula glows
        │   ├── CustomCursor.tsx  # Glowing electric-blue cursor with bubble trail
        │   ├── Footer.tsx        # Responsive futuristic footer with system status pill
        │   └── Navbar.tsx        # Glassmorphism navbar with active scroll spy & replay intro
        └── sections/
            ├── About.tsx         # Split-layout narrative & verified academic stats
            ├── Certifications.tsx# Credential gallery with full-screen verification modal
            ├── Contact.tsx       # Contact form with validation & copy email
            ├── Education.tsx     # Vertical glowing milestone timeline
            ├── Hackathons.tsx    # Innovation and hackathon showcase cards
            ├── Hero.tsx          # Dynamic hero section with rotating text & holographic avatar
            ├── ProjectModal.tsx  # Deep-dive multi-tab case study modal & interactive simulation
            ├── Projects.tsx      # Curated 3-project showcase cards
            ├── Skills.tsx        # Categorized interactive technical competencies
            └── Workshops.tsx     # Hands-on technical workshops & applied learnings
```

---

## 💻 Local Development & Build

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+ or v11+)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000` or `http://localhost:5173` in your browser.

### 3. Production Build
```bash
npm run build
```
Generates an optimized production bundle in `/dist` with zero TypeScript or bundling errors.

### 4. Preview Production Build
```bash
npm run preview
```

---

## ⚙️ Customization Guide

### Editing Your Personal Information
All content is centralized in a single, well-documented file:
`src/data/portfolioData.ts`

To update your CGPA, coursework, project descriptions, or add new certifications, simply edit the values in that file.

### Adding Your Profile Photograph
In `src/components/sections/Hero.tsx`, an interactive uploader is provided on the holographic avatar card. Alternatively, to permanently set your photo:
1. Place your image file (e.g. `divakar.jpg`) in the `public/` directory.
2. In `src/components/sections/Hero.tsx`, set the default state:
   ```typescript
   const [profileImage, setProfileImage] = useState<string | null>('/divakar.jpg');
   ```

### Connecting Live Form Submissions (Formspree / EmailJS)
In `src/components/sections/Contact.tsx`, the form is pre-configured with client-side validation and immediate `mailto:` fallback. To connect a service like [Formspree](https://formspree.io/):
1. Create a free Formspree form endpoint (`https://formspree.io/f/your_form_id`).
2. Update the `fetch()` call inside `handleSubmit()` in `Contact.tsx`.

---

## 📜 License
Personal Portfolio developed for **Divakar S.**
Built with precision, futuristic motion, and modern software engineering practices.
