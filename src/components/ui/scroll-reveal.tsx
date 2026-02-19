"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type AnimationType = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "fadeIn" | "scaleUp" | "scaleIn" | "blurIn" | "slideUp" | "slideLeft" | "slideRight" | "rotateIn";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  once?: boolean;
}

const animations: Record<AnimationType, { initial: object; animate: object }> = {
  fadeUp: {
    initial: { opacity: 0, y: 80, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
  },
  fadeDown: {
    initial: { opacity: 0, y: -60 },
    animate: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    initial: { opacity: 0, x: -80, scale: 0.97 },
    animate: { opacity: 1, x: 0, scale: 1 },
  },
  fadeRight: {
    initial: { opacity: 0, x: 80, scale: 0.97 },
    animate: { opacity: 1, x: 0, scale: 1 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.8, y: 40 },
    animate: { opacity: 1, scale: 1, y: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
  },
  blurIn: {
    initial: { opacity: 0, filter: "blur(12px)", y: 30 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
  },
  rotateIn: {
    initial: { opacity: 0, rotate: -3, scale: 0.95, y: 40 },
    animate: { opacity: 1, rotate: 0, scale: 1, y: 0 },
  },
};

export default function ScrollReveal({
  children,
  className = "",
  animation = "fadeUp",
  delay = 0,
  duration = 0.7,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const anim = animations[animation];

  return (
    <motion.div
      ref={ref}
      initial={anim.initial}
      animate={isInView ? anim.animate : anim.initial}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealStagger({
  children,
  className = "",
  staggerDelay = 0.12,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealChild({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
