export interface PersonalInfo {
  name: string;
  shortName: string;
  title: string;
  tagline: string;
  college: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  bio: string;
  rotatingTitles: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  location: string;
  duration: string;
  score: string;
  scoreLabel: string;
  courseworkOrSubjects: string[];
  status?: string;
}

export interface SkillCategory {
  title: string;
  category: 'PROGRAMMING' | 'WEB DEVELOPMENT' | 'DATABASE' | 'AI AND TECHNOLOGY' | 'TOOLS' | 'ACADEMIC COURSEWORK' | 'SOFT SKILLS';
  description: string;
  skills: {
    name: string;
    icon?: string;
    level?: string;
    highlight?: boolean;
  }[];
}

export interface ProjectStage {
  name: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  note?: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  problem: string;
  solution: string;
  technologies: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  type: 'prototype' | 'case_study' | 'ml_pipeline';
  implementationNote?: string;
  stages?: ProjectStage[];
  features?: string[];
  architectureOverview?: string;
  accentColor: string;
  tag: string;
  thumbnailGradient: string;
}

export interface WorkshopEntry {
  id: string;
  title: string;
  organizer: string;
  date?: string;
  location?: string;
  description: string;
  highlights: string[];
  skillsGained: string[];
  badgeColor: string;
}

export interface HackathonEntry {
  id: string;
  title: string;
  organizer: string;
  edition?: string;
  date?: string;
  role: string;
  participationDescription: string;
  problemStatement?: string;
  projectOrSubmission?: string;
  teamDetails?: string;
  badge: string;
}

export interface CertificationEntry {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verificationUrl?: string;
  skills: string[];
  category: string;
  iconType: string;
}

