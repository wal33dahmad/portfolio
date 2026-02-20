"use client";

import { motion } from "motion/react";
import { upworkJobSuccess, testimonials } from "@/lib/data";
import { fadeInUp } from "@/lib/animations";
import SectionTitle from "./SectionTitle";
import GlassContainer from "./GlassContainer";
import { Quote } from "lucide-react";

export default function TrustLine() {
  return (
    <section
      id="trust"
      className="relative flex min-h-[50vh] flex-col items-center justify-center px-6 py-32"
    >
      <SectionTitle
        title="What Clients Say"
        subtitle="Feedback from recent collaborations."
      />

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto w-full max-w-3xl space-y-6"
      >
        <div className="flex justify-center">
          <span className="liquid-glass-thin rounded-full px-6 py-2 text-sm font-medium text-muted">
            {upworkJobSuccess}% Job Success
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {testimonials.slice(0, 4).map((quote, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <GlassContainer className="p-6">
                <Quote
                  className="mb-2 h-8 w-8 text-accent/60"
                  aria-hidden
                />
                <p className="text-sm leading-relaxed text-muted">
                  &ldquo;{quote}&rdquo;
                </p>
              </GlassContainer>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
