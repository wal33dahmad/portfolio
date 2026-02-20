"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { type MouseEvent, type ReactNode, useRef, useCallback } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), {
    damping: 30,
    stiffness: 200,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), {
    damping: 30,
    stiffness: 200,
  });

  const handleMouse = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
      if (ref.current) {
        ref.current.style.setProperty("--mouse-x", `${x * 100}%`);
        ref.current.style.setProperty("--mouse-y", `${y * 100}%`);
      }
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className={`liquid-glass group relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08), transparent 40%)",
        }}
      />
      {children}
    </motion.div>
  );
}
