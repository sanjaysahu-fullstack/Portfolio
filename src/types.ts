export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  category: "MERN Stack" | "Frontend" | "Other";
  features: string[];
}

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Tools" | "Other";
  level: number; // 0-100 for visual indication
}

export interface Experience {
  id: string;
  course: string;
  organization: string;
  duration: string;
  highlights: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  performance?: string;
  details?: string;
}
