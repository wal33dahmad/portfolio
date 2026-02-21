"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { navLinks } from "@/lib/data";
import { navFadeIn } from "@/lib/animations";

const emptySubscribe = () => () => {};

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0.6, 1]);
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <>
      <motion.nav
        variants={navFadeIn}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-50"
      >
        <motion.div
          className="absolute inset-0 border-b border-glass-border bg-glass backdrop-blur-2xl backdrop-saturate-180"
          style={{
            opacity: bgOpacity,
            boxShadow: "inset 0 -1px 0 0 var(--glass-specular)",
          }}
        />
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#home"
            className="text-lg font-semibold tracking-tight text-foreground transition-colors"
          >
            WA
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="rounded-full p-2 text-foreground/70 transition-colors hover:bg-glass hover:text-foreground"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 md:hidden">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="rounded-full p-2 text-foreground/70 transition-colors hover:text-foreground"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}
              </button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-full p-2 text-foreground/70 transition-colors hover:text-foreground"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[64px] z-40 border-b border-glass-border bg-glass backdrop-blur-2xl backdrop-saturate-180 md:hidden"
            style={{ boxShadow: "inset 0 1px 0 0 var(--glass-specular)" }}
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:bg-glass-hover hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
