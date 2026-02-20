"use client";

import { motion } from "motion/react";
import { personalInfo } from "@/lib/data";
import { fadeInUp } from "@/lib/animations";
import SectionTitle from "./SectionTitle";
import GlassContainer from "./GlassContainer";
import Button from "./Button";
import { Mail, Github, Linkedin, Send, Phone } from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone?.replace(/\s/g, "")}`,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "Explore my work on GitHub",
    href: personalInfo.github,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: personalInfo.linkedin,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-32"
    >
      <SectionTitle
        title="Let's Work Together"
        subtitle="Have a project in mind or just want to say hello? I'd love to hear from you."
      />

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto w-full max-w-2xl"
      >
        <GlassContainer className="p-8 sm:p-10">
          <p className="mb-8 text-center text-sm leading-relaxed text-muted sm:text-base">
            {personalInfo.bio}
          </p>

          <div className="mb-8 flex flex-col gap-4">
            {contactLinks.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center gap-4 rounded-xl p-3 transition-colors duration-200 hover:bg-glass-hover"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">
                    {label}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              href={`mailto:${personalInfo.email}`}
              variant="primary"
              external
            >
              <Send size={16} />
              Send a Message
            </Button>
          </div>
        </GlassContainer>
      </motion.div>
    </section>
  );
}
