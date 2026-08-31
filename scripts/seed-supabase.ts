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
    "id": 1,
    "name": "Waleed Ahmad",
    "title": "Full-Stack AI & Product Engineer",
    "tagline": "I build AI-powered web and mobile products from idea to production.",
    "email": "waleedahmad.codes@gmail.com",
    "phone": "+966-538584129",
    "github": "https://github.com/wal33dahmad",
    "linkedin": "https://linkedin.com/in/wal33dahmad",
    "upwork_job_success": 100
  });
  if (piError) throw piError;

  console.log("Seeding projects...");
  const { error: projError } = await supabase.from("projects").upsert([
    {
      "id": "publishai",
      "title": "PublishAI",
      "description": "AI content and course-creation platform. Contributed to the LLM workflows that turn a single idea into a structured book, lesson plan, or video script — generation paired with human review and editing rather than replacing it.",
      "tags": [
        "Next.js",
        "OpenAI API",
        "LLM Workflows",
        "TypeScript"
      ],
      "type": "web",
      "highlight": "AI / LLM",
      "screenshots": [
        {
          "src": "https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/publishai.webp",
          "device": "browser",
          "alt": "PublishAI — AI content and course creation platform"
        }
      ],
      "order": 0
    },
    {
      "id": "fleet-platform",
      "title": "Fleet Management Platform",
      "description": "Cross-platform fleet operations product serving 50K+ fleets at Mirnint. Contributed the web and mobile experiences — live vehicle maps, historical playback, dashcam review, and operational reporting.",
      "tags": [
        "React",
        "React Native",
        "Maps",
        "Real-time",
        "IoT"
      ],
      "type": "both",
      "highlight": "50K+ fleets",
      "screenshots": [
        {
          "src": "https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/fleet.webp",
          "device": "browser",
          "alt": "Fleet management dashboard with live vehicle map"
        },
        {
          "src": "https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/fleet-mobile.webp",
          "device": "iphone",
          "alt": "Fleet management mobile app"
        }
      ],
      "order": 1
    },
    {
      "id": "jok-in-the-box",
      "title": "JOK in the Box",
      "description": "Mobile app that runs inside Telegram — quests, games, upgrades, and boosters for the JOK Coin community. Built with Telegram Mini App (WebView), inline actions, Stars payments, and TON Connect for crypto wallets. 150,000+ users.",
      "tags": [
        "Telegram Mini App",
        "React",
        "TON Connect"
      ],
      "type": "mobile",
      "highlight": "150,000+ users",
      "link": "https://t.me/JokInTheBox_bot",
      "screenshots": [
        {
          "alt": "Jok in the Box — Telegram app screen 1",
          "src": "https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/JOK_1.webp",
          "device": "iphone"
        },
        {
          "alt": "Jok in the Box — Telegram app screen 2",
          "src": "https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/JOK_2.webp",
          "device": "iphone"
        },
        {
          "alt": "Jok in the Box — Telegram app screen 3",
          "src": "https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/JOK_3.webp",
          "device": "iphone"
        }
      ],
      "order": 2
    },
    {
      "id": "mirnint-saas-dashboard",
      "title": "Mirnint SaaS Dashboard",
      "description": "Internal SaaS platform for business and account operations across Mirnint's IoT ecosystem. Owned the UX/UI and frontend end to end — Stripe subscriptions and invoicing, authentication flows, and a reusable component system shared across the product suite.",
      "tags": [
        "Next.js",
        "TypeScript",
        "Stripe",
        "SaaS"
      ],
      "type": "web",
      "highlight": "SaaS / Ops",
      "screenshots": [
        {
          "src": "https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/mirnint-dashboard.webp",
          "device": "browser",
          "alt": "Mirnint SaaS operations dashboard"
        }
      ],
      "order": 4
    },
    {
      "id": "weydocs",
      "title": "WeyDocs",
      "description": "Mobile app for expats to track important documents — iqama, visas, passport, insurance, and more — with automatic reminders at 90, 60, and 30 days before expiry. Fully offline, no account required.",
      "tags": [
        "React Native",
        "Expo",
        "Mobile",
        "Offline-first"
      ],
      "type": "mobile",
      "highlight": "Offline-first · No account required",
      "link": "https://weydocs-onboard.vercel.app",
      "screenshots": [
        {
          "alt": "WeyDocs document tracker app",
          "src": "https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/weydocs.webp",
          "device": "iphone"
        }
      ],
      "order": 3
    },
    {
      "id": "cinrix",
      "title": "Cinrix",
      "description": "Manage a cloud PC from anywhere. Built solo in React Native and Expo — NFC pairing, Stripe subscriptions, and remote session controls in one cross-platform app.",
      "tags": [
        "React Native",
        "Expo",
        "Stripe",
        "NFC"
      ],
      "type": "mobile",
      "screenshots": [
        {
          "src": "https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/Cinrix.webp",
          "device": "iphone",
          "alt": "Cinrix cloud PC management app"
        }
      ],
      "order": 5
    },
    {
      "id": "navigation",
      "title": "Navigation",
      "description": "On-board passenger display for buses. Shows the vehicle's live position along its route on an offline map, so it keeps working where there is no signal. Built solo in React Native and Expo.",
      "tags": [
        "React Native",
        "Expo",
        "Offline Maps",
        "Live Location"
      ],
      "type": "mobile",
      "screenshots": [
        {
          "src": "https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/bus-navigation.webp",
          "device": "iphone-landscape",
          "alt": "On-board bus navigation display showing live route position"
        }
      ],
      "order": 6
    },
    {
      "id": "patron-manager",
      "title": "Patron",
      "description": "Mobile app for security guards and patrons to view assigned shifts, complete rounds, and scan checkpoints in real time.",
      "tags": [
        "React Native",
        "Expo",
        "IoT",
        "Real-time"
      ],
      "type": "mobile",
      "screenshots": [
        {
          "alt": "Patron shift management app",
          "src": "https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/Patron.webp",
          "device": "pixel"
        }
      ],
      "order": 7
    },
    {
      "id": "native-jobs",
      "title": "NativeJobs",
      "description": "Mobile app for job seekers — browse, apply, and manage applications on the go.",
      "tags": [
        "React Native",
        "Expo",
        "Jobs",
        "Mobile"
      ],
      "type": "mobile",
      "github": "https://github.com/wal33dahmad/Native-Jobs",
      "screenshots": [
        {
          "alt": "NativeJobs app",
          "src": "https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/NativeJobs.webp",
          "device": "pixel"
        }
      ],
      "order": 8
    },
    {
      "id": "jokrio",
      "title": "JOKR Labs",
      "description": "Web3 platform homepage for token purchasing, quest participation, and user onboarding within a blockchain-based ecosystem.",
      "tags": [
        "Three.js",
        "Bootstrap",
        "Stripe"
      ],
      "type": "web",
      "link": "https://jokrlabs.io/",
      "screenshots": [
        {
          "alt": "JOKR Labs homepage",
          "src": "https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/jokrlabs.webp",
          "device": "browser"
        }
      ],
      "order": 9
    },
    {
      "id": "weydocs-onboard",
      "title": "WeyDocs Onboard",
      "description": "Landing and onboarding page for WeyDocs — a document expiry tracker for expats. Showcases features, walkthrough, and app store links.",
      "tags": [
        "Next.js",
        "Tailwind CSS",
        "Landing Page"
      ],
      "type": "web",
      "link": "https://weydocs-onboard.vercel.app",
      "screenshots": [
        {
          "alt": "WeyDocs onboarding page",
          "src": "https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/weydocs-onboard.webp",
          "device": "browser"
        }
      ],
      "order": 10
    },
    {
      "id": "motorsingh",
      "title": "Motor Singh",
      "description": "Seller dashboard for a car marketplace — lets users list, manage, and sell their vehicles with a streamlined experience. Integrated Stripe for payments.",
      "tags": [
        "Next.js",
        "Redux",
        "Bootstrap",
        "Stripe"
      ],
      "type": "web",
      "link": "https://www.motorsingh.com",
      "screenshots": [
        {
          "alt": "Motor Singh seller dashboard",
          "src": "https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/motorsingh.webp",
          "device": "browser"
        }
      ],
      "order": 11
    },
    {
      "id": "carhub",
      "title": "Carhub",
      "description": "Car rental platform to browse, compare, and book vehicles with a modern, responsive interface.",
      "tags": [
        "Next.js",
        "Tailwind CSS",
        "Full-Stack"
      ],
      "type": "web",
      "link": "https://car-rental-azure.vercel.app/",
      "screenshots": [
        {
          "alt": "Carhub landing page",
          "src": "https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/Carhub_landing_page.webp",
          "device": "browser"
        }
      ],
      "order": 12
    },
    {
      "id": "easybank",
      "title": "Easybank",
      "description": "Digital banking platform with a clean UI for managing accounts, features overview, and customer onboarding.",
      "tags": [
        "React",
        "Tailwind CSS",
        "Frontend"
      ],
      "type": "web",
      "screenshots": [
        {
          "alt": "Easybank landing page",
          "src": "https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/Easybank_landing_page.webp",
          "device": "browser"
        }
      ],
      "order": 13
    },
    {
      "id": "studio",
      "title": "Studio",
      "description": "Creative studio or agency landing page with bold layout and visual impact.",
      "tags": [
        "Next.js",
        "Responsive",
        "Landing Page"
      ],
      "type": "web",
      "screenshots": [
        {
          "alt": "Studio landing page",
          "src": "https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/Studio_landing_page.webp",
          "device": "browser"
        }
      ],
      "order": 14
    }
  ]);
  if (projError) throw projError;

  console.log("Seeding experience...");
  const { error: expError } = await supabase.from("experience").upsert([
    {
      "id": 2,
      "company": "Mirnint",
      "role": "Frontend & Mobile Engineer",
      "location": "Turkey (Remote)",
      "start_date": "Jan 2024",
      "end_date": "Present",
      "order": 0,
      "bullets": [
        "Own UX/UI and frontend engineering for an internal Next.js SaaS platform supporting business and account operations across a multi-application IoT ecosystem.",
        "Lead architecture and implementation across 10+ React Native / Expo apps for iOS and Android — QR scanning, maps, live location tracking, real-time data, and in-app chat over shared backend services.",
        "Contributed to a cross-platform fleet-management platform serving 50K+ fleets, covering map monitoring, historical playback, dashcam data, and operational reporting.",
        "Built a reusable React/TypeScript component system that cut feature development time by roughly 40%, alongside Stripe subscriptions, authentication flows, and Arabic/RTL localisation."
      ]
    },
    {
      "id": 1,
      "company": "Jok AI Labs",
      "role": "Senior React / Next.js Developer",
      "location": "France (Remote)",
      "start_date": "Oct 2024",
      "end_date": "Feb 2026",
      "order": 1,
      "bullets": [
        "Owned end-to-end UX/UI and frontend engineering for a Next.js Telegram Mini App — quests, games, upgrades and boosters — growing it to 150,000+ registered users.",
        "Designed the frontend architecture and API communication layers for high-concurrency user activity and real-time interactions.",
        "Integrated the Telegram Bot API (inline actions, Stars payments), TON Connect UI for wallet interactions, and Twitter/X and Instagram APIs.",
        "Optimised CI/CD and cloud deployment workflows, cutting deployment time by roughly 35% and improving API response latency by around 120ms."
      ]
    },
    {
      "id": 3,
      "company": "Cipher Developers",
      "role": "MERN Stack Developer",
      "location": "Pakistan (Remote)",
      "start_date": "Apr 2023",
      "end_date": "Dec 2023",
      "order": 2,
      "bullets": [
        "Architected and built a production real estate CRM with contact pipelines, deal tracking, activity feeds, real-time chat, and workflow automation.",
        "Built a modular drag-and-drop email builder using React, Redux and DnD with reusable UI components.",
        "Integrated the OpenAI API to power AI-driven product features and automated workflows.",
        "Built REST APIs, database schemas and service layers with Node.js, Express and MongoDB, plus AWS S3/SES, SendGrid and Google Calendar sync."
      ]
    },
    {
      "id": 4,
      "company": "Hexabytes.io",
      "role": "MERN Stack Developer",
      "location": "Pakistan (Remote)",
      "start_date": "Mar 2021",
      "end_date": "Apr 2023",
      "order": 3,
      "bullets": [
        "Migrated a school management system from PHP/Laravel to Next.js + React — roughly 50% faster first contentful paint and a 25% smaller codebase.",
        "Contributed to a subscription-based social platform built with React Native and Firebase, supporting large-scale user activity and real-time features.",
        "Developed production web applications with React, Next.js, Node.js, MongoDB and REST APIs."
      ]
    }
  ]);
  if (expError) throw expError;

  console.log("Seeding skills...");
  const { error: skillsError } = await supabase.from("skills").upsert([
    {
      "id": "web",
      "title": "Web Development",
      "icon": "Globe",
      "order": 0,
      "description": "Full-stack web apps, dashboards, and integrations.",
      "categories": [
        {
          "name": "Frontend",
          "skills": [
            "React",
            "Next.js",
            "TypeScript",
            "JavaScript",
            "HTML5",
            "CSS3"
          ]
        },
        {
          "name": "State & Data",
          "skills": [
            "Redux Toolkit",
            "Zustand",
            "TanStack Query",
            "Context API"
          ]
        },
        {
          "name": "Styling",
          "skills": [
            "Tailwind CSS",
            "Material UI",
            "Bootstrap",
            "Responsive Design"
          ]
        },
        {
          "name": "Testing",
          "skills": [
            "Jest",
            "React Testing Library",
            "Cypress"
          ]
        }
      ]
    },
    {
      "id": "mobile",
      "title": "Mobile Development",
      "icon": "Smartphone",
      "order": 1,
      "description": "Cross-platform apps with Expo and React Native.",
      "categories": [
        {
          "name": "Framework",
          "skills": [
            "React Native",
            "Expo",
            "Expo Router",
            "React Navigation"
          ]
        },
        {
          "name": "Storage & State",
          "skills": [
            "Expo SQLite",
            "MMKV",
            "AsyncStorage"
          ]
        },
        {
          "name": "Build & Deploy",
          "skills": [
            "EAS Build",
            "App Store",
            "Google Play"
          ]
        },
        {
          "name": "Features",
          "skills": [
            "Push Notifications",
            "In-App Payments",
            "Reanimated",
            "Offline-first"
          ]
        }
      ]
    },
    {
      "id": "backend-cloud",
      "title": "Backend & Cloud",
      "icon": "Server",
      "order": 2,
      "description": "APIs, data models, and the infrastructure that runs them.",
      "categories": [
        {
          "name": "Backend",
          "skills": [
            "Node.js",
            "Express.js",
            "Python",
            "REST APIs",
            "GraphQL"
          ]
        },
        {
          "name": "Databases",
          "skills": [
            "PostgreSQL",
            "MongoDB",
            "MySQL",
            "Firebase Firestore"
          ]
        },
        {
          "name": "Schema & Types",
          "skills": [
            "Prisma",
            "Zod"
          ]
        },
        {
          "name": "Cloud & DevOps",
          "skills": [
            "AWS",
            "GCP",
            "Docker",
            "GitHub Actions",
            "Nginx",
            "Vercel"
          ]
        }
      ]
    },
    {
      "id": "iot-realtime",
      "title": "IoT & Real-Time",
      "icon": "Radio",
      "order": 3,
      "description": "Live device data, synchronisation, and connected hardware.",
      "categories": [
        {
          "name": "Real-time",
          "skills": [
            "WebSockets",
            "Socket.io",
            "Webhooks",
            "Live Location"
          ]
        },
        {
          "name": "Devices",
          "skills": [
            "Device Telemetry",
            "QR Scanning",
            "NFC",
            "Maps & Playback"
          ]
        },
        {
          "name": "Integrations",
          "skills": [
            "Stripe",
            "Telegram Bot API",
            "TON Connect",
            "SendGrid",
            "Cloudinary"
          ]
        }
      ]
    },
    {
      "id": "ai-llm",
      "title": "AI & LLMs",
      "icon": "Sparkles",
      "order": 4,
      "description": "Language models built into real products, not bolted on.",
      "categories": [
        {
          "name": "AI / LLM",
          "skills": [
            "OpenAI API",
            "LLM Integration",
            "Prompt Engineering"
          ]
        },
        {
          "name": "Applied",
          "skills": [
            "AI Content Workflows",
            "Automated Generation",
            "Human-in-the-loop Review"
          ]
        }
      ]
    }
  ]);
  if (skillsError) throw skillsError;

  console.log("Seeding education...");
  const { error: eduError } = await supabase.from("education").upsert({
    "id": 1,
    "school": "Virtual University of Pakistan",
    "degree": "BS Software Engineering"
  });
  if (eduError) throw eduError;

  console.log("Seeding certifications...");
  const { error: certError } = await supabase.from("certifications").upsert([
    {
      "id": 1,
      "issuer": "DevNation",
      "name": "Advanced React Developer",
      "order": 0
    },
    {
      "id": 2,
      "issuer": "FreeCodeCamp",
      "name": "JavaScript Algorithms & Data Structures",
      "order": 1
    },
    {
      "id": 3,
      "issuer": "FreeCodeCamp",
      "name": "Responsive Web Design Certification",
      "order": 2
    }
  ]);
  if (certError) throw certError;

  console.log("Seeding testimonials...");
  const { error: testError } = await supabase.from("testimonials").upsert([
    {
      "id": 1,
      "quote": "Working with Waleed has been a fantastic experience. He developed a Telegram app for my crypto project with precision and creativity.",
      "order": 0
    },
    {
      "id": 2,
      "quote": "Waleed is very talented, hard-working, and attentive. We really enjoyed working with him and we recommend him to other employers.",
      "order": 1
    },
    {
      "id": 3,
      "quote": "Very easy to communicate with and very skillful, was able to achieve the goals set out for the job. Would hire again!",
      "order": 2
    },
    {
      "id": 4,
      "quote": "Understood what was needed to be done within first few minutes of the call, completed the tasks shortly after. Would hire again.",
      "order": 3
    }
  ]);
  if (testError) throw testError;

  console.log("Seed complete!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
