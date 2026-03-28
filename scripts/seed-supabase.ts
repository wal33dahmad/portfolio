import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Seed uses service_role key — bypasses RLS so it can INSERT
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  console.log("Seeding personal_info...");
  const { error: piError } = await supabase.from("personal_info").upsert({
    id: 1,
    name: "Waleed Ahmed",
    title: "Full-Stack Web & Mobile Developer",
    tagline: "Not just code — complete digital products, built end-to-end.",
    email: "rana.waleed123@gmail.com",
    phone: "+966-501963998",
    github: "https://github.com/wal33dahmad",
    linkedin: "https://linkedin.com/in/wal33dahmad",
    upwork_job_success: 100,
  });
  if (piError) throw piError;

  console.log("Seeding projects...");
  const { error: projError } = await supabase.from("projects").upsert([
    {
      id: "jok-in-the-box",
      title: "Jok in the Box",
      description: "Mobile app that runs inside Telegram — quests, games, upgrades, and boosters for the JOK Coin community. Built with Telegram Mini App (WebView), inline actions, Stars payments, and TON Connect for crypto wallets. 150,000+ users.",
      tags: ["Telegram Mini App", "React", "TON Connect"],
      type: "mobile",
      highlight: "150,000+ users",
      screenshots: [
        { src: "/images/projects/JOK_1.jpeg", device: "iphone", alt: "Jok in the Box — Telegram app screen 1" },
        { src: "/images/projects/JOK_2.jpeg", device: "iphone", alt: "Jok in the Box — Telegram app screen 2" },
        { src: "/images/projects/JOK_3.jpeg", device: "iphone", alt: "Jok in the Box — Telegram app screen 3" },
      ],
      order: 0,
    },
    {
      id: "patron-manager",
      title: "Patron",
      description: "Mobile app for security guards and patrons to view assigned shifts, complete rounds, and scan checkpoints in real time.",
      tags: ["React Native", "Expo", "IoT", "Real-time"],
      type: "mobile",
      screenshots: [{ src: "/images/projects/Patron.png", device: "pixel", alt: "Patron shift management app" }],
      order: 1,
    },
    {
      id: "native-jobs",
      title: "NativeJobs",
      description: "Mobile app for job seekers — browse, apply, and manage applications on the go.",
      tags: ["React Native", "Expo", "Jobs", "Mobile"],
      type: "mobile",
      screenshots: [{ src: "/images/projects/NativeJobs.png", device: "pixel", alt: "NativeJobs app" }],
      order: 2,
    },
    {
      id: "carhub",
      title: "Carhub",
      description: "Car rental platform to browse, compare, and book vehicles with a modern, responsive interface.",
      tags: ["Next.js", "Tailwind CSS", "Full-Stack"],
      type: "web",
      screenshots: [{ src: "/images/projects/Carhub_landing_page.png", device: "browser", alt: "Carhub landing page" }],
      order: 3,
    },
    {
      id: "easybank",
      title: "Easybank",
      description: "Digital banking platform with a clean UI for managing accounts, features overview, and customer onboarding.",
      tags: ["React", "Tailwind CSS", "Frontend"],
      type: "web",
      screenshots: [{ src: "/images/projects/Easybank_landing_page.png", device: "browser", alt: "Easybank landing page" }],
      order: 4,
    },
    {
      id: "studio",
      title: "Studio",
      description: "Creative studio or agency landing page with bold layout and visual impact.",
      tags: ["Next.js", "Responsive", "Landing Page"],
      type: "web",
      screenshots: [{ src: "/images/projects/Studio_landing_page.png", device: "browser", alt: "Studio landing page" }],
      order: 5,
    },
  ]);
  if (projError) throw projError;

  console.log("Seeding experience...");
  const { error: expError } = await supabase.from("experience").upsert([
    { id: 1, company: "Jok AI Labs", role: "Next.js Developer", location: "France (Remote)", start_date: "Oct 2024", end_date: "Feb 2026", bullets: ["Built and scaled a Next.js web app for the JOK Coin community, supporting quests, games, upgrades, and boosters with 150,000+ registered users.", "Implemented Telegram Bot API (inline actions, Stars payments) and TON Connect UI for crypto wallet interactions.", "Integrated Twitter/X & Instagram APIs and managed deployments, server infrastructure, and performance optimization."], order: 0 },
    { id: 2, company: "Mirnint", role: "Frontend Developer", location: "Turkey (Remote)", start_date: "July 2023", end_date: "Present", bullets: ["Developed UI tools for IoT systems using Vanilla JavaScript, building responsive and production-ready interfaces.", "Built 10+ React Native (Expo) mobile apps, published on Apple App Store & Google Play, handling frontend, backend, and API integrations independently.", "Implemented Stripe payments, authentication flows, and scalable APIs while optimizing app performance and reliability."], order: 1 },
    { id: 3, company: "Cipher Developers", role: "MERN Stack Developer", location: "Pakistan (Remote)", start_date: "Apr 2023", end_date: "Dec 2023", bullets: ["Built a full-featured CRM platform including drag-and-drop email builder, real-time chat, and workflow automation.", "Integrated AWS services (SES, S3, WorkMail), Google/iOS calendar sync, and managed large-scale contact data using Node.js & MongoDB."], order: 2 },
    { id: 4, company: "Hexabyte.IO", role: "MERN Stack Developer", location: "Pakistan (Remote)", start_date: "March 2022", end_date: "Apr 2023", bullets: ["Developed and maintained web applications using React, Next.js, Node.js, and MongoDB.", "Modernized legacy PHP/Laravel systems to a JavaScript stack, improving performance and scalability."], order: 3 },
  ]);
  if (expError) throw expError;

  console.log("Seeding skills...");
  const { error: skillsError } = await supabase.from("skills").upsert([
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
      order: 0,
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
      order: 1,
    },
  ]);
  if (skillsError) throw skillsError;

  console.log("Seeding education...");
  const { error: eduError } = await supabase.from("education").upsert({
    id: 1,
    school: "Virtual University of Pakistan",
    degree: "BS Software Engineering",
  });
  if (eduError) throw eduError;

  console.log("Seeding certifications...");
  const { error: certError } = await supabase.from("certifications").upsert([
    { id: 1, issuer: "DevNation", name: "Advanced React Developer", order: 0 },
    { id: 2, issuer: "FreeCodeCamp", name: "JavaScript Algorithms & Data Structures", order: 1 },
    { id: 3, issuer: "FreeCodeCamp", name: "Responsive Web Design Certification", order: 2 },
  ]);
  if (certError) throw certError;

  console.log("Seeding testimonials...");
  const { error: testError } = await supabase.from("testimonials").upsert([
    { id: 1, quote: "Working with Waleed has been a fantastic experience. He developed a Telegram app for my crypto project with precision and creativity.", order: 0 },
    { id: 2, quote: "Waleed is very talented, hard-working, and attentive. We really enjoyed working with him and we recommend him to other employers.", order: 1 },
    { id: 3, quote: "Very easy to communicate with and very skillful, was able to achieve the goals set out for the job. Would hire again!", order: 2 },
    { id: 4, quote: "Understood what was needed to be done within first few minutes of the call, completed the tasks shortly after. Would hire again.", order: 3 },
  ]);
  if (testError) throw testError;

  console.log("Seed complete!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
