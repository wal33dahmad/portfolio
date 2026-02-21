"use client";

import { motion } from "motion/react";
import { education, certifications } from "@/lib/data";
import { fadeInUp } from "@/lib/animations";
import SectionTitle from "./SectionTitle";
import GlassContainer from "./GlassContainer";
import { GraduationCap, Award } from "lucide-react";

export default function EducationCertifications() {
  return (
    <section
      id="education"
      className="relative flex flex-col items-center justify-center px-6 py-20"
    >
      <SectionTitle
        title="Education & Certifications"
        subtitle="Academic background and professional credentials."
      />

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto w-full max-w-3xl space-y-6"
      >
        <GlassContainer className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <GraduationCap size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                {education.degree}
              </h3>
              <p className="mt-1 text-muted">{education.school}</p>
            </div>
          </div>
        </GlassContainer>

        <div className="grid gap-4 sm:grid-cols-1">
          {certifications.map((cert) => (
            <motion.div key={`${cert.issuer}-${cert.name}`} variants={fadeInUp}>
              <GlassContainer className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {cert.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                  </div>
                </div>
              </GlassContainer>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
