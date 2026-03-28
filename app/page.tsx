import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import TrustLine from "./components/TrustLine";
import EducationCertifications from "./components/EducationCertifications";
import Contact from "./components/Contact";
import {
  getPersonalInfo,
  getProjects,
  getExperience,
  getSkills,
  getEducation,
  getCertifications,
  getTestimonials,
} from "@/lib/queries";

export default async function Home() {
  const [
    personalInfo,
    projects,
    experience,
    skillDomains,
    education,
    certifications,
    testimonials,
  ] = await Promise.all([
    getPersonalInfo(),
    getProjects(),
    getExperience(),
    getSkills(),
    getEducation(),
    getCertifications(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero personalInfo={personalInfo} />
      <Experience experience={experience} />
      <Skills skillDomains={skillDomains} />
      <Projects projects={projects} />
      <TrustLine
        upworkJobSuccess={personalInfo.upwork_job_success}
        testimonials={testimonials}
      />
      <EducationCertifications
        education={education}
        certifications={certifications}
      />
      <Contact personalInfo={personalInfo} />
    </>
  );
}
