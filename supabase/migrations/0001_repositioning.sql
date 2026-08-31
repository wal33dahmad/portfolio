-- Repositioning: "Full-Stack Web & Mobile Developer" -> "Full-Stack AI & Product Engineer"
--
-- Apply by pasting into the Supabase SQL Editor (no service-role key needed).
-- Idempotent: safe to re-run.
--
-- Attribution is deliberate and differs per project:
--   PublishAI, Fleet Management Platform  -> small-team work, contribution framing
--   Mirnint SaaS Dashboard, Cinrix, Navigation -> solo, owned end to end

begin;

-- ── 1. Positioning ──────────────────────────────────────────────────────────
update personal_info set
  title   = 'Full-Stack AI & Product Engineer',
  tagline = 'I build AI-powered web and mobile products from idea to production.'
where id = 1;

-- ── 2. Schema drift: `github` shipped to production but was never declared ───
alter table projects add column if not exists github text;

-- ── 3. New projects ─────────────────────────────────────────────────────────
insert into projects (id, title, description, tags, type, highlight, link, screenshots, "order")
values
  (
    'publishai',
    'PublishAI',
    'AI content and course-creation platform. Contributed to the LLM workflows that turn a single idea into a structured book, lesson plan, or video script — generation paired with human review and editing rather than replacing it.',
    array['Next.js', 'OpenAI API', 'LLM Workflows', 'TypeScript'],
    'web',
    'AI / LLM',
    null,
    '[{"src":"https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/publishai.webp","device":"browser","alt":"PublishAI — AI content and course creation platform"}]'::jsonb,
    0
  ),
  (
    'fleet-platform',
    'Fleet Management Platform',
    'Cross-platform fleet operations product serving 50K+ fleets at Mirnint. Contributed the web and mobile experiences — live vehicle maps, historical playback, dashcam review, and operational reporting.',
    array['React', 'React Native', 'Maps', 'Real-time', 'IoT'],
    'both',
    '50K+ fleets',
    null,
    '[{"src":"https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/fleet.webp","device":"browser","alt":"Fleet management dashboard with live vehicle map"},
      {"src":"https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/fleet-mobile.webp","device":"iphone","alt":"Fleet management mobile app"}]'::jsonb,
    1
  ),
  (
    'mirnint-saas-dashboard',
    'Mirnint SaaS Dashboard',
    'Internal SaaS platform for business and account operations across Mirnint''s IoT ecosystem. Owned the UX/UI and frontend end to end — Stripe subscriptions and invoicing, authentication flows, and a reusable component system shared across the product suite.',
    array['Next.js', 'TypeScript', 'Stripe', 'SaaS'],
    'web',
    'SaaS / Ops',
    null,
    '[{"src":"https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/mirnint-dashboard.webp","device":"browser","alt":"Mirnint SaaS operations dashboard"}]'::jsonb,
    3
  ),
  (
    'cinrix',
    'Cinrix',
    'Manage a cloud PC from anywhere. Built solo in React Native and Expo — NFC pairing, Stripe subscriptions, and remote session controls in one cross-platform app.',
    array['React Native', 'Expo', 'Stripe', 'NFC'],
    'mobile',
    null,
    null,
    '[{"src":"https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/Cinrix.webp","device":"iphone","alt":"Cinrix cloud PC management app"}]'::jsonb,
    5
  ),
  (
    'navigation',
    'Navigation',
    'On-board passenger display for buses. Shows the vehicle''s live position along its route on an offline map, so it keeps working where there is no signal. Built solo in React Native and Expo.',
    array['React Native', 'Expo', 'Offline Maps', 'Live Location'],
    'mobile',
    null,
    null,
    '[{"src":"https://oasayfzbnzivssrstozs.supabase.co/storage/v1/object/public/project-images/bus-navigation.webp","device":"iphone-landscape","alt":"On-board bus navigation display showing live route position"}]'::jsonb,
    6
  )
on conflict (id) do update set
  title       = excluded.title,
  description = excluded.description,
  tags        = excluded.tags,
  type        = excluded.type,
  highlight   = excluded.highlight,
  screenshots = excluded.screenshots,
  "order"     = excluded."order";

-- ── 4. Retitle ──────────────────────────────────────────────────────────────
update projects set title = 'JOK in the Box' where id = 'jok-in-the-box';

-- ── 5. Renumber every project in one statement, so no two rows collide ──────
update projects p set "order" = v.ord
from (values
  ('publishai', 0), ('fleet-platform', 1), ('jok-in-the-box', 2),
  ('mirnint-saas-dashboard', 3), ('weydocs', 4),
  ('cinrix', 5), ('navigation', 6), ('patron-manager', 7),
  ('native-jobs', 8), ('jokrio', 9), ('weydocs-onboard', 10),
  ('motorsingh', 11), ('carhub', 12), ('easybank', 13), ('studio', 14)
) as v(id, ord)
where p.id = v.id;

commit;

-- ── 6. Experience: dates, titles and bullets aligned to the master CV ───────
-- Mirnint start corrected Jul 2023 -> Jan 2024; Hexabytes Mar 2022 -> Mar 2021
-- (the latter is what makes the "5+ years" proof point true).

begin;

update experience set
  role = 'Frontend & Mobile Engineer',
  start_date = 'Jan 2024',
  end_date = 'Present',
  bullets = array[
    'Own UX/UI and frontend engineering for an internal Next.js SaaS platform supporting business and account operations across a multi-application IoT ecosystem.',
    'Lead architecture and implementation across 10+ React Native / Expo apps for iOS and Android — QR scanning, maps, live location tracking, real-time data, and in-app chat over shared backend services.',
    'Contributed to a cross-platform fleet-management platform serving 50K+ fleets, covering map monitoring, historical playback, dashcam data, and operational reporting.',
    'Built a reusable React/TypeScript component system that cut feature development time by roughly 40%, alongside Stripe subscriptions, authentication flows, and Arabic/RTL localisation.'
  ]
where id = 2;

update experience set
  role = 'Senior React / Next.js Developer',
  bullets = array[
    'Owned end-to-end UX/UI and frontend engineering for a Next.js Telegram Mini App — quests, games, upgrades and boosters — growing it to 150,000+ registered users.',
    'Designed the frontend architecture and API communication layers for high-concurrency user activity and real-time interactions.',
    'Integrated the Telegram Bot API (inline actions, Stars payments), TON Connect UI for wallet interactions, and Twitter/X and Instagram APIs.',
    'Optimised CI/CD and cloud deployment workflows, cutting deployment time by roughly 35% and improving API response latency by around 120ms.'
  ]
where id = 1;

update experience set
  bullets = array[
    'Architected and built a production real estate CRM with contact pipelines, deal tracking, activity feeds, real-time chat, and workflow automation.',
    'Built a modular drag-and-drop email builder using React, Redux and DnD with reusable UI components.',
    'Integrated the OpenAI API to power AI-driven product features and automated workflows.',
    'Built REST APIs, database schemas and service layers with Node.js, Express and MongoDB, plus AWS S3/SES, SendGrid and Google Calendar sync.'
  ]
where id = 3;

update experience set
  company = 'Hexabytes.io',
  start_date = 'Mar 2021',
  bullets = array[
    'Migrated a school management system from PHP/Laravel to Next.js + React — roughly 50% faster first contentful paint and a 25% smaller codebase.',
    'Contributed to a subscription-based social platform built with React Native and Firebase, supporting large-scale user activity and real-time features.',
    'Developed production web applications with React, Next.js, Node.js, MongoDB and REST APIs.'
  ]
where id = 4;

-- ── 7. Skills: 2 domains -> 5, ordered as the narrative arc ────────────────
-- Product -> Web + Mobile -> Backend + Cloud -> IoT / Real-time -> AI / LLMs.
-- AI goes last on purpose: it reads as an added capability, not a rebrand.

update skills set
  description = 'Full-stack web apps, dashboards, and integrations.',
  categories = '[
    {"name":"Frontend","skills":["React","Next.js","TypeScript","JavaScript","HTML5","CSS3"]},
    {"name":"State & Data","skills":["Redux Toolkit","Zustand","TanStack Query","Context API"]},
    {"name":"Styling","skills":["Tailwind CSS","Material UI","Bootstrap","Responsive Design"]},
    {"name":"Testing","skills":["Jest","React Testing Library","Cypress"]}
  ]'::jsonb,
  "order" = 0
where id = 'web';

update skills set
  description = 'Cross-platform apps with Expo and React Native.',
  categories = '[
    {"name":"Framework","skills":["React Native","Expo","Expo Router","React Navigation"]},
    {"name":"Storage & State","skills":["Expo SQLite","MMKV","AsyncStorage"]},
    {"name":"Build & Deploy","skills":["EAS Build","App Store","Google Play"]},
    {"name":"Features","skills":["Push Notifications","In-App Payments","Reanimated","Offline-first"]}
  ]'::jsonb,
  "order" = 1
where id = 'mobile';

insert into skills (id, title, icon, description, categories, "order")
values
  (
    'backend-cloud',
    'Backend & Cloud',
    'Server',
    'APIs, data models, and the infrastructure that runs them.',
    '[
      {"name":"Backend","skills":["Node.js","Express.js","Python","REST APIs","GraphQL"]},
      {"name":"Databases","skills":["PostgreSQL","MongoDB","MySQL","Firebase Firestore"]},
      {"name":"Schema & Types","skills":["Prisma","Zod"]},
      {"name":"Cloud & DevOps","skills":["AWS","GCP","Docker","GitHub Actions","Nginx","Vercel"]}
    ]'::jsonb,
    2
  ),
  (
    'iot-realtime',
    'IoT & Real-Time',
    'Radio',
    'Live device data, synchronisation, and connected hardware.',
    '[
      {"name":"Real-time","skills":["WebSockets","Socket.io","Webhooks","Live Location"]},
      {"name":"Devices","skills":["Device Telemetry","QR Scanning","NFC","Maps & Playback"]},
      {"name":"Integrations","skills":["Stripe","Telegram Bot API","TON Connect","SendGrid","Cloudinary"]}
    ]'::jsonb,
    3
  ),
  (
    'ai-llm',
    'AI & LLMs',
    'Sparkles',
    'Language models built into real products, not bolted on.',
    '[
      {"name":"AI / LLM","skills":["OpenAI API","LLM Integration","Prompt Engineering"]},
      {"name":"Applied","skills":["AI Content Workflows","Automated Generation","Human-in-the-loop Review"]}
    ]'::jsonb,
    4
  )
on conflict (id) do update set
  title       = excluded.title,
  icon        = excluded.icon,
  description = excluded.description,
  categories  = excluded.categories,
  "order"     = excluded."order";

commit;
