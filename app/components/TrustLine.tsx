"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import type { Testimonial } from "@/lib/types";
import { fadeInUp } from "@/lib/animations";
import SectionTitle from "./SectionTitle";
import GlassContainer from "./GlassContainer";
import { Quote } from "lucide-react";
import Counter from "./Counter";

interface TrustLineProps {
  upworkJobSuccess: number;
  testimonials: Testimonial[];
}

export default function TrustLine({ upworkJobSuccess, testimonials }: TrustLineProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const isBadgeInView = useInView(badgeRef, { once: true, amount: 0.5 });

  return (
    <section
      id="trust"
      className="relative flex flex-col items-center justify-center px-6 py-20"
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
        <div ref={badgeRef} className="flex justify-center">
          <span className="liquid-glass-thin flex items-center gap-1 rounded-full px-6 py-2 text-sm font-medium text-muted">
            <Counter
              value={upworkJobSuccess}
              startAnimation={isBadgeInView}
              fontSize={14}
              padding={0}
              gap={0}
              horizontalPadding={0}
              gradientHeight={0}
            />
            % Job Success
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {testimonials.slice(0, 4).map((testimonial) => (
            <motion.div key={testimonial.id} variants={fadeInUp}>
              <GlassContainer className="p-6">
                <Quote
                  className="mb-2 h-8 w-8 text-accent/60"
                  aria-hidden
                />
                <p className="text-sm leading-relaxed text-muted">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </GlassContainer>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
