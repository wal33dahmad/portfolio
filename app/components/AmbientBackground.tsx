"use client";

import { motion, useScroll, useTransform } from "motion/react";

export default function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y: y1 }}
        className="absolute left-[-10%] top-[5%] h-[600px] w-[600px] rounded-full opacity-60"
        aria-hidden
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,113,227,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="absolute right-[-5%] top-[25%] h-[500px] w-[500px] rounded-full opacity-50"
        aria-hidden
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: y3 }}
        className="absolute left-[20%] top-[50%] h-[550px] w-[550px] rounded-full opacity-40"
        aria-hidden
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: y4 }}
        className="absolute right-[10%] top-[75%] h-[600px] w-[600px] rounded-full opacity-50"
        aria-hidden
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,113,227,0.10) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: y1 }}
        className="absolute left-[50%] top-[120%] h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-40"
        aria-hidden
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: y3 }}
        className="absolute left-[-5%] top-[160%] h-[500px] w-[500px] rounded-full opacity-45"
        aria-hidden
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,113,227,0.09) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="absolute right-[-8%] top-[200%] h-[550px] w-[550px] rounded-full opacity-40"
        aria-hidden
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>
    </div>
  );
}
