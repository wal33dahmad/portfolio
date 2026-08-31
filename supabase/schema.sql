-- personal_info (single row)
create table personal_info (
  id int primary key default 1 check (id = 1),
  name text not null,
  title text not null,
  tagline text not null,
  email text not null,
  phone text not null,
  github text not null,
  linkedin text not null,
  upwork_job_success int not null default 100
);

-- projects
create table projects (
  id text primary key,
  title text not null,
  description text not null,
  tags text[] not null default '{}',
  type text not null check (type in ('web', 'mobile', 'both')),
  highlight text,
  link text,
  github text,
  screenshots jsonb not null default '[]',
  "order" int not null default 0
);

-- experience
create table experience (
  id int primary key,
  company text not null,
  role text not null,
  location text not null,
  start_date text not null,
  end_date text not null,
  bullets text[] not null default '{}',
  "order" int not null default 0
);

-- skills
create table skills (
  id text primary key,
  title text not null,
  icon text not null,
  description text not null,
  categories jsonb not null default '[]',
  "order" int not null default 0
);

-- education (single row)
create table education (
  id int primary key default 1 check (id = 1),
  school text not null,
  degree text not null
);

-- certifications
create table certifications (
  id int primary key,
  issuer text not null,
  name text not null,
  "order" int not null default 0
);

-- testimonials
create table testimonials (
  id int primary key,
  quote text not null,
  "order" int not null default 0
);

-- RLS: enable on all tables, anon can only SELECT
alter table personal_info enable row level security;
alter table projects enable row level security;
alter table experience enable row level security;
alter table skills enable row level security;
alter table education enable row level security;
alter table certifications enable row level security;
alter table testimonials enable row level security;

create policy "Public read personal_info" on personal_info for select using (true);
create policy "Public read projects" on projects for select using (true);
create policy "Public read experience" on experience for select using (true);
create policy "Public read skills" on skills for select using (true);
create policy "Public read education" on education for select using (true);
create policy "Public read certifications" on certifications for select using (true);
create policy "Public read testimonials" on testimonials for select using (true);
