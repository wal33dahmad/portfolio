export const personalInfo = {
  name: "Waleed Ahmed",
  title: "Full-Stack Web & Mobile Developer",
  tagline:
    "I design and build web platforms and mobile apps — from pixel to production.",
  bio: "I build web platforms and mobile apps that people actually use — from Telegram apps with 150K+ users to IoT dashboards and published App Store products. I've spent 4+ years working remotely with teams across France, Turkey, and Pakistan, and I'm happiest when I'm shipping something real. If you have an idea, a product, or a problem — let's talk.",
  email: "rana.waleed123@gmail.com",
  phone: "+966-501963998",
  github: "https://github.com/wal33dahmad",
  linkedin: "https://linkedin.com/in/wal33dahmad",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export interface SkillDomain {
  id: string;
  title: string;
  icon: string;
  description: string;
  categories: {
    name: string;
    skills: string[];
  }[];
}

export const skillDomains: SkillDomain[] = [
  {
    id: "web",
    title: "Web Development",
    icon: "Globe",
    description: "Full-stack web apps, dashboards, and integrations.",
    categories: [
      { name: "Frontend", skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3"] },
      { name: "Styling", skills: ["Tailwind CSS", "Bootstrap", "Responsive Design"] },
      { name: "Backend", skills: ["Node.js", "Express.js", "REST APIs", "Socket.io", "Webhooks"] },
      { name: "Databases", skills: ["MongoDB", "SQL", "Firebase"] },
      { name: "Integrations", skills: ["Telegram Bot API", "Twitter API", "Stripe", "Cloudinary", "TON Connect"] },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    icon: "Smartphone",
    description: "Cross-platform apps with Expo and React Native.",
    categories: [
      { name: "Framework", skills: ["React Native", "Expo"] },
      { name: "Build & Deploy", skills: ["EAS Build", "App Store", "Google Play"] },
      { name: "Features", skills: ["Push Notifications", "In-App Payments", "Real-time Data"] },
      { name: "Tools", skills: ["Expo Router", "AsyncStorage", "Firebase"] },
    ],
  },
];

export type DeviceType = "iphone" | "pixel" | "browser";

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
  screenshots?: ProjectScreenshot[];
}

export const projects: Project[] = [
  {
    id: "jok-in-the-box",
    title: "Jok in the Box",
    description:
      "Mobile app that runs inside Telegram — quests, games, upgrades, and boosters for the JOK Coin community. Built with Telegram Mini App (WebView), inline actions, Stars payments, and TON Connect for crypto wallets. 150,000+ users.",
    tags: ["Telegram Mini App", "React", "TON Connect"],
    type: "mobile",
    highlight: "150,000+ users",
    screenshots: [
      {
        src: "/images/projects/JOK_1.jpeg",
        device: "iphone",
        alt: "Jok in the Box — Telegram app screen 1",
      },
      {
        src: "/images/projects/JOK_2.jpeg",
        device: "iphone",
        alt: "Jok in the Box — Telegram app screen 2",
      },
      {
        src: "/images/projects/JOK_3.jpeg",
        device: "iphone",
        alt: "Jok in the Box — Telegram app screen 3",
      },
    ],
  },
  {
    id: "patron-manager",
    title: "Patron Manager",
    description:
      "React Native (Expo) app for IoT monitoring with real-time data and notifications.",
    tags: ["React Native", "Expo", "IoT", "Real-time"],
    type: "mobile",
    screenshots: [
      {
        src: "/images/projects/Patron.png",
        device: "pixel",
        alt: "Patron Manager IoT monitoring app",
      },
    ],
  },
  {
    id: "native-jobs",
    title: "NativeJobs",
    description:
      "Mobile app for job seekers — browse, apply, and manage applications on the go.",
    tags: ["React Native", "Expo", "Jobs", "Mobile"],
    type: "mobile",
    screenshots: [
      {
        src: "/images/projects/NativeJobs.png",
        device: "pixel",
        alt: "NativeJobs app",
      },
    ],
  },
  {
    id: "carhub",
    title: "Carhub",
    description: "Landing page for car rental and vehicle showcase with a modern, responsive layout.",
    tags: ["Next.js", "Tailwind CSS", "Landing Page"],
    type: "web",
    screenshots: [
      {
        src: "/images/projects/Carhub_landing_page.png",
        device: "browser",
        alt: "Carhub landing page",
      },
    ],
  },
  {
    id: "easybank",
    title: "Easybank",
    description: "Banking landing page with clean UI and smooth sections for features and testimonials.",
    tags: ["React", "Tailwind CSS", "Landing Page"],
    type: "web",
    screenshots: [
      {
        src: "/images/projects/Easybank_landing_page.png",
        device: "browser",
        alt: "Easybank landing page",
      },
    ],
  },
  {
    id: "studio",
    title: "Studio",
    description: "Creative studio or agency landing page with bold layout and visual impact.",
    tags: ["Next.js", "Responsive", "Landing Page"],
    type: "web",
    screenshots: [
      {
        src: "/images/projects/Studio_landing_page.png",
        device: "browser",
        alt: "Studio landing page",
      },
    ],
  },
];

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: "Jok AI Labs",
    role: "Next.js Developer",
    location: "France (Remote)",
    start: "Oct 2024",
    end: "Feb 2026",
    bullets: [
      "Built and scaled a Next.js web app for the JOK Coin community, supporting quests, games, upgrades, and boosters with 150,000+ registered users.",
      "Implemented Telegram Bot API (inline actions, Stars payments) and TON Connect UI for crypto wallet interactions.",
      "Integrated Twitter/X & Instagram APIs and managed deployments, server infrastructure, and performance optimization.",
    ],
  },
  {
    company: "Mirnint",
    role: "Frontend Developer",
    location: "Turkey (Remote)",
    start: "July 2023",
    end: "Present",
    bullets: [
      "Developed UI tools for IoT systems using Vanilla JavaScript, building responsive and production-ready interfaces.",
      "Built 10+ React Native (Expo) mobile apps, published on Apple App Store & Google Play, handling frontend, backend, and API integrations independently.",
      "Implemented Stripe payments, authentication flows, and scalable APIs while optimizing app performance and reliability.",
    ],
  },
  {
    company: "Cipher Developers",
    role: "MERN Stack Developer",
    location: "Pakistan (Remote)",
    start: "Apr 2023",
    end: "Dec 2023",
    bullets: [
      "Built a full-featured CRM platform including drag-and-drop email builder, real-time chat, and workflow automation.",
      "Integrated AWS services (SES, S3, WorkMail), Google/iOS calendar sync, and managed large-scale contact data using Node.js & MongoDB.",
    ],
  },
  {
    company: "Hexabyte.IO",
    role: "MERN Stack Developer",
    location: "Pakistan (Remote)",
    start: "March 2022",
    end: "Apr 2023",
    bullets: [
      "Developed and maintained web applications using React, Next.js, Node.js, and MongoDB.",
      "Modernized legacy PHP/Laravel systems to a JavaScript stack, improving performance and scalability.",
    ],
  },
];

export const education = {
  school: "Virtual University of Pakistan",
  degree: "BS Software Engineering",
};

export interface Certification {
  issuer: string;
  name: string;
}

export const certifications: Certification[] = [
  { issuer: "DevNation", name: "Advanced React Developer" },
  { issuer: "FreeCodeCamp", name: "JavaScript Algorithms & Data Structures" },
  { issuer: "FreeCodeCamp", name: "Responsive Web Design Certification" },
];

export const upworkJobSuccess = 100;

export const testimonials = [
  "Working with Waleed has been a fantastic experience. He developed a Telegram app for my crypto project with precision and creativity.",
  "Waleed is very talented, hard-working, and attentive. We really enjoyed working with him and we recommend him to other employers.",
  "Very easy to communicate with and very skillful, was able to achieve the goals set out for the job. Would hire again!",
  "Understood what was needed to be done within first few minutes of the call, completed the tasks shortly after. Would hire again.",
];
