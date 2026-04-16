"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { BIO } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Cybersecurity Glitch / Scramble Effect
 */
function GlitchText({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <motion.span 
      className={className}
      onViewportEnter={scramble}
    >
      {displayText}
    </motion.span>
  );
}

/**
 * Floating Emojis in background
 */
function FloatingEmoji({ emoji, delay = 0, initialX, initialY }: { emoji: string; delay?: number; initialX: string; initialY: string }) {
  return (
    <motion.div
      className="absolute text-6xl md:text-8xl select-none opacity-20 pointer-events-none z-0"
      initial={{ x: initialX, y: initialY, scale: 0.5, opacity: 0 }}
      whileInView={{ 
        opacity: [0, 0.2, 0.1, 0.2, 0],
        y: ["0%", "-100%"],
        rotate: [0, 15, -15, 10, 0],
        scale: [0.5, 1.2, 1, 1.1, 0.8]
      }}
      viewport={{ once: false }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {emoji}
    </motion.div>
  );
}

// Word-by-word reveal animation (existing)
function RevealText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.7,
              delay: i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const SKILLS_LIST = [
  "React", "Next.js", "Three.js", "TypeScript", "Node.js",
  "GSAP", "Framer Motion", "Go", "Python", "AI/ML",
  "PostgreSQL", "MongoDB", "WebGL", "Figma", "Tailwind CSS",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Theme switch logic handled in page.tsx for more centralized control
  // But we'll keep the ID accessible

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden"
    >
      {/* ── DARK ABOUT SECTION ── */}
      <div className="relative w-full py-32 bg-[#0a0a0a]">
        
        {/* Background Background Emojis - Animated like Wix Studio */}
        <FloatingEmoji emoji="❤️" initialX="10%" initialY="80%" delay={0} />
        <FloatingEmoji emoji="🌸" initialX="85%" initialY="60%" delay={2} />
        <FloatingEmoji emoji="🧊" initialX="20%" initialY="20%" delay={5} />
        <FloatingEmoji emoji="⚡" initialX="70%" initialY="90%" delay={3} />

        {/* Background glows */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/4" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/4" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-24">
          
          {/* Section label */}
          <motion.p
            className="text-xs font-bold tracking-[0.4em] text-white/30 uppercase mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Who I am
          </motion.p>

          {/* Giant heading with GLITCH effect */}
          <h2 className="text-6xl lg:text-[7rem] font-black tracking-tighter leading-none text-white uppercase mb-12">
            <GlitchText text="ABOUT ME" />
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Bio copy */}
            <div className="flex flex-col gap-8">
              <motion.p
                className="text-xl lg:text-2xl text-white/70 leading-relaxed font-light"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
              >
                I am <span className="text-white font-semibold">{BIO.name}</span>, a{" "}
                <span className="text-blue-400 font-semibold">{BIO.role}</span> who builds
                cinematic, high-performance web experiences.
              </motion.p>

              <motion.p
                className="text-lg text-white/50 leading-relaxed"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.35 }}
              >
                I merge deep technical expertise with a keen eye for aesthetics to push the
                boundaries of digital interfaces. When not architecting complex systems or
                animating pixels, I explore fundamental patterns that shape our world — from
                global markets to human behavior.
              </motion.p>

              {/* Skills pill cloud with "Reverse Transparency" on hover */}
              <motion.div
                className="flex flex-wrap gap-3 pt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {SKILLS_LIST.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="px-4 py-2 rounded-full text-sm font-semibold border border-white/10 bg-white/5 text-white/70 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.04, duration: 0.4 }}
                    whileHover={{
                      scale: 1.05,
                      borderColor: "rgba(59,130,246,0.8)",
                      backgroundColor: "rgba(255,255,255,0.9)", // Reverse: becomes solid white/light
                      color: "#0a0a0a", // Text becomes dark
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Right: Animated stat blocks */}
            <div className="flex flex-col gap-6">
              {[
                { value: "7+", label: "Projects Shipped", color: "#8b5cf6" },
                { value: "100K+", label: "Lines of Code", color: "#ec4899" },
                { value: "∞", label: "Curiosity", color: "#f59e0b" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center gap-6 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.7 }}
                  whileHover={{ 
                    x: 8, 
                    borderColor: stat.color + "60",
                    backgroundColor: "rgba(255,255,255,0.05)"
                  }}
                >
                  <span
                    className="text-5xl font-black leading-none"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-white/60 font-medium text-lg">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
