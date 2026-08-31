export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  upwork_job_success: number;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SkillDomain {
  id: string;
  title: string;
  icon: string;
  description: string;
  categories: SkillCategory[];
  order: number;
}

export type DeviceType = "iphone" | "iphone-landscape" | "pixel" | "browser";

export interface ProjectScreenshot {
  src: string;
  device: DeviceType;
  alt: string;
}

export type ProjectType = "web" | "mobile" | "both";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  type: ProjectType;
  highlight?: string;
  link?: string;
  github?: string;
  screenshots?: ProjectScreenshot[];
  order: number;
}

export interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  location: string;
  start_date: string;
  end_date: string;
  bullets: string[];
  order: number;
}

export interface Education {
  school: string;
  degree: string;
}

export interface Certification {
  id: number;
  issuer: string;
  name: string;
  order: number;
}

export interface Testimonial {
  id: number;
  quote: string;
  order: number;
}
