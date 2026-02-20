"use client";

import { motion } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { fadeInUp } from "@/lib/animations";

const socialLinks = [
  {
    icon: Mail,
    href: `mailto:${personalInfo.email}`,
    label: "Email",
  },
  {
    icon: Github,
    href: personalInfo.github,
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: personalInfo.linkedin,
    label: "LinkedIn",
  },
];

export default function Footer() {
  return (
    <motion.footer
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative mt-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px w-full bg-linear-to-r from-transparent via-glass-border to-transparent" />
        <div className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full p-2.5 text-muted transition-colors duration-200 hover:bg-glass hover:text-foreground"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
