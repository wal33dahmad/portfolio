import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import TrustLine from "./components/TrustLine";
import EducationCertifications from "./components/EducationCertifications";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <TrustLine />
      <EducationCertifications />
      <Contact />
    </>
  );
}
