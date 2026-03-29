export const revalidate = 60;

import { Suspense } from "react";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import TrustLine from "./components/TrustLine";
import EducationCertifications from "./components/EducationCertifications";
import Contact from "./components/Contact";
import { getPageData, getProjects } from "@/lib/queries";
import {
  HeroSkeleton,
  SectionSkeleton,
  ProjectsSkeleton,
  TrustLineSkeleton,
  ContactSkeleton,
} from "./components/skeletons";

async function HeroSection() {
  const { personalInfo } = await getPageData();
  return <Hero personalInfo={personalInfo} />;
}

async function ExperienceSection() {
  const { experience } = await getPageData();
  return <Experience experience={experience} />;
}

async function SkillsSection() {
  const { skillDomains } = await getPageData();
  return <Skills skillDomains={skillDomains} />;
}

async function ProjectsSection() {
  await getPageData(); // wait for page data to resolve first
  const projects = await getProjects();
  return <Projects projects={projects} />;
}

async function TrustLineSection() {
  const { personalInfo, testimonials } = await getPageData();
  return (
    <TrustLine
      upworkJobSuccess={personalInfo.upwork_job_success}
      testimonials={testimonials}
    />
  );
}

async function EducationSection() {
  const { education, certifications } = await getPageData();
  return (
    <EducationCertifications
      education={education}
      certifications={certifications}
    />
  );
}

async function ContactSection() {
  const { personalInfo } = await getPageData();
  return <Contact personalInfo={personalInfo} />;
}

export default function Home() {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ExperienceSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <SkillsSection />
      </Suspense>
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<TrustLineSkeleton />}>
        <TrustLineSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <EducationSection />
      </Suspense>
      <Suspense fallback={<ContactSkeleton />}>
        <ContactSection />
      </Suspense>
    </>
  );
}
