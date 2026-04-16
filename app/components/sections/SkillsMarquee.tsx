"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SKILLS = [
  { name: "React", emoji: "⚛️", color: "#61dafb" },
  { name: "Next.js", emoji: "▲", color: "#ffffff" },
  { name: "Three.js", emoji: "🌐", color: "#049ef4" },
  { name: "TypeScript", emoji: "🔷", color: "#3178c6" },
  { name: "GSAP", emoji: "🟢", color: "#88ce02" },
  { name: "Framer Motion", emoji: "🎞️", color: "#a855f7" },
  { name: "Node.js", emoji: "🟩", color: "#6da55f" },
  { name: "Tailwind CSS", emoji: "🌬️", color: "#38bdf8" },
  { name: "Go", emoji: "🐹", color: "#00ADD8" },
  { name: "Python", emoji: "🐍", color: "#f59e0b" },
  { name: "AI / ML", emoji: "🤖", color: "#ec4899" },
  { name: "PostgreSQL", emoji: "🐘", color: "#336791" },
  { name: "MongoDB", emoji: "🍃", color: "#4db33d" },
  { name: "REST APIs", emoji: "🔗", color: "#f97316" },
  { name: "Git / GitHub", emoji: "🐙", color: "#f1502f" },
  { name: "WebGL", emoji: "🎮", color: "#990000" },
  { name: "Figma", emoji: "🎨", color: "#f24e1e" },
  { name: "Performance", emoji: "⚡", color: "#facc15" },
  { name: "WebSockets", emoji: "📡", color: "#06b6d4" },
  { name: "Accessibility", emoji: "♿", color: "#8b5cf6" },
];

interface SkillCardProps {
  skill: typeof SKILLS[0];
  index: number;
}

function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      className="flex-shrink-0 mx-3 cursor-default"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.05 }}
    >
      <motion.div
        className="relative flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
        whileHover={{
          borderColor: skill.color + "60",
          backgroundColor: skill.color + "15",
          boxShadow: `0 0 30px 2px ${skill.color}40`,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0"
          whileHover={{ opacity: 1 }}
          style={{
            background: `radial-gradient(circle at center, ${skill.color}20, transparent 70%)`,
          }}
          transition={{ duration: 0.3 }}
        />
        
        <span className="text-2xl">{skill.emoji}</span>
        <span
          className="font-semibold text-sm whitespace-nowrap text-white/80"
          style={{ fontFamily: "var(--font-inter), system-ui" }}
        >
          {skill.name}
        </span>
      </motion.div>
    </motion.div>
  );
}

// Infinite marquee row
function MarqueeRow({ skills, direction = 1, speed = 40 }: {
  skills: typeof SKILLS;
  direction?: 1 | -1;
  speed?: number;
}) {
  // Duplicated for seamless loop
  const doubled = [...skills, ...skills, ...skills];

  return (
    <div className="relative overflow-hidden py-2">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
      
      <motion.div
        className="flex items-center"
        animate={{
          x: direction === 1 ? ["0%", "-33.333%"] : ["-33.333%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {doubled.map((skill, idx) => (
          <SkillCard key={`${skill.name}-${idx}`} skill={skill} index={idx % skills.length} />
        ))}
      </motion.div>
    </div>
  );
}

export default function SkillsMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const firstHalf = SKILLS.slice(0, 10);
  const secondHalf = SKILLS.slice(10);

  return (
    <motion.section
      ref={containerRef}
      id="skills"
      className="relative w-full py-24 overflow-hidden"
      style={{ opacity }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />
      
      {/* Section label */}
      <motion.div
        className="text-center mb-16 px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-xs font-bold tracking-[0.4em] text-white/30 uppercase mb-3">Arsenal</p>
        <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-white/90">
          Skills & Technologies
        </h2>
        <p className="mt-4 text-white/40 text-base max-w-md mx-auto">
          The tools I reach for when crafting extraordinary digital experiences
        </p>
      </motion.div>

      {/* Row 1 — scrolls left */}
      <MarqueeRow skills={firstHalf} direction={1} speed={35} />
      
      {/* Row 2 — scrolls right */}
      <div className="mt-4">
        <MarqueeRow skills={secondHalf} direction={-1} speed={45} />
      </div>

      {/* Ambient glow blobs */}
      <div className="absolute -top-20 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none" />
    </motion.section>
  );
}
