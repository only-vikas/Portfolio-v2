"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Globe, Brain, BookOpen, Trophy, Crown } from "lucide-react";
import Image from "next/image";

const HOBBIES = [
  {
    name: "Stock Markets",
    icon: <TrendingUp size={28} />,
    emoji: "📈",
    description:
      "Obsessed with market microstructure, macro cycles, and the psychology behind price action. I trade equities and track geopolitical events that move markets.",
    color: "#10b981",
    image: "/images/hobbies/stocks.webp",
    bg: "from-emerald-500/10 to-cyan-500/10",
  },
  {
    name: "Geopolitics",
    icon: <Globe size={28} />,
    emoji: "🌍",
    description:
      "Following the grand chessboard of nations — alliances, energy wars, and the invisible threads connecting global events to your daily life.",
    color: "#3b82f6",
    image: null,
    bg: "from-blue-500/10 to-indigo-500/10",
  },
  {
    name: "Psychology",
    icon: <Brain size={28} />,
    emoji: "🧠",
    description:
      "Fascinated by cognitive biases, behavioral economics, and the hidden reasons behind why humans make the choices they do.",
    color: "#8b5cf6",
    image: null,
    bg: "from-violet-500/10 to-purple-500/10",
  },
  {
    name: "Deep Reading",
    icon: <BookOpen size={28} />,
    emoji: "📚",
    description:
      "History, science, philosophy — books that reshape how you see the world. Currently reading: Thinking Fast & Slow + Range.",
    color: "#f59e0b",
    image: null,
    bg: "from-amber-500/10 to-orange-500/10",
  },
  {
    name: "Cricket",
    icon: <Trophy size={28} />,
    emoji: "🏏",
    description:
      "The sport of patience and explosiveness. I follow Test cricket closely — the ultimate mental battle played across 5 days.",
    color: "#ec4899",
    image: null,
    bg: "from-pink-500/10 to-rose-500/10",
  },
  {
    name: "Chess",
    icon: <Crown size={28} />,
    emoji: "♟️",
    description:
      "The king of strategic thinking. Every game is a compressed microcosm of war, diplomacy, and pure calculation. Rated ~1400 Blitz.",
    color: "#f87171", // Safer red
    image: null, // Removed aggressive image, using emoji for cleaner look
    bg: "from-red-500/10 to-orange-500/10",
  },
];

function HobbyCard({ hobby, index }: { hobby: typeof HOBBIES[0]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`relative flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-0 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm min-h-[240px]`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: 0.1 }}
      whileHover={{ scale: 1.02, borderColor: hobby.color + "50", backgroundColor: "rgba(255,255,255,0.08)" }}
    >
      {/* Visual side */}
      <div
        className="w-full md:w-[280px] flex-shrink-0 flex items-center justify-center text-7xl min-h-[200px] relative bg-[#0d0d0d]"
        style={{ color: hobby.color }}
      >
         <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle, ${hobby.color}40, transparent 70%)` }} />
         <span className="relative z-10">{hobby.emoji}</span>
      </div>

      {/* Content side */}
      <div className="flex flex-col justify-center gap-4 p-8 lg:p-12 flex-1 bg-black/40">
        <div className="flex items-center gap-3">
          <motion.div
            className="p-3 rounded-xl"
            style={{ backgroundColor: hobby.color + "20", color: hobby.color }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {hobby.icon}
          </motion.div>
          <h4 className="text-2xl lg:text-3xl font-black tracking-tight text-white">{hobby.name}</h4>
        </div>
        <p className="text-white/50 leading-relaxed max-w-lg font-light">{hobby.description}</p>
      </div>

      {/* Accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
        style={{ background: `linear-gradient(to right, transparent, ${hobby.color}, transparent)` }}
      />
    </motion.div>
  );
}

export default function HobbiesSection() {
  return (
    <section id="beyond" className="relative w-full py-40 overflow-hidden bg-[#050505]">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-24">
        {/* Heading */}
        <motion.div
          className="flex flex-col gap-6 mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4">
             <div className="h-0.5 w-10 bg-white/20" />
             <p className="text-xs font-black tracking-[0.5em] text-white/30 uppercase">
               Human Protocol
             </p>
          </div>
          <h2 className="text-6xl lg:text-8xl font-black tracking-tighter leading-none text-white">
            BEYOND THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">TERMINAL</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mt-2 font-light leading-relaxed">
            What fuels my universe outside the terminal — the passions that refine my strategic thinking and creative execution.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-10">
          {HOBBIES.map((hobby, idx) => (
            <HobbyCard key={hobby.name} hobby={hobby} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
