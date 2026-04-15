"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, HTMLMotionProps } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggerWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  animationParams?: gsap.TweenVars;
}

export default function ScrollTriggerWrapper({
  children,
  animationParams = { opacity: 0, y: 50, duration: 0.8, ease: "power3.out" },
  className = "",
  ...props
}: ScrollTriggerWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        ...animationParams,
      });
    },
    { scope: containerRef, dependencies: [animationParams] }
  );

  return (
    <motion.div ref={containerRef} className={className} {...props}>
      {children}
    </motion.div>
  );
}
