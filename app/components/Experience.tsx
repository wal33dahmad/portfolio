"use client";

import { motion } from "motion/react";
import { experience } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SectionTitle from "./SectionTitle";
import GlassContainer from "./GlassContainer";
import { Briefcase, MapPin, Calendar } from "lucide-react";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-32"
    >
      <SectionTitle
        title="Experience"
        subtitle="Professional history and key contributions."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto w-full max-w-3xl space-y-6"
      >
        {experience.map((item) => (
          <motion.div key={`${item.company}-${item.start}`} variants={fadeInUp}>
            <GlassContainer className="p-6 sm:p-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Briefcase
                    className="h-5 w-5 shrink-0 text-accent"
                    aria-hidden
                  />
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.role}
                  </h3>
                  <span className="text-muted">·</span>
                  <span className="font-medium text-foreground">
                    {item.company}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {item.start} – {item.end}
                  </span>
                </div>
                <ul className="mt-2 list-inside list-disc space-y-2 text-sm leading-relaxed text-muted">
                  {item.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </GlassContainer>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
