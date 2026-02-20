"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { forwardRef } from "react";

type GlassContainerProps = HTMLMotionProps<"div">;

const GlassContainer = forwardRef<HTMLDivElement, GlassContainerProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={`liquid-glass relative overflow-hidden ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassContainer.displayName = "GlassContainer";

export default GlassContainer;
