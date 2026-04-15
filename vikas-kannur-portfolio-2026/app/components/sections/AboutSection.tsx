"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Globe, Brain, BookOpen, Trophy, Crown, Fingerprint } from "lucide-react";
import ScrollTriggerWrapper from "../animations/ScrollTriggerWrapper";
import { BIO } from "@/lib/data";

const INTERESTS = [
  { name: "Stocks & Markets", icon: <TrendingUp size={24} /> },
  { name: "Geopolitics", icon: <Globe size={24} /> },
  { name: "Psychology & Human Behavior", icon: <Brain size={24} /> },
  { name: "Books & Deep Reads", icon: <BookOpen size={24} /> },
  { name: "Cricket", icon: <Trophy size={24} /> }, // Placeholder for cricket
  { name: "Chess", icon: <Crown size={24} /> },   // Crown for chess king
];

export default function AboutSection() {
  return (
    <section id="about" className="w-full max-w-7xl px-8 lg:px-24 py-32 flex flex-col gap-16 relative z-10 border-t border-foreground/5 mt-16">
      
      {/* About Introduction */}
      <ScrollTriggerWrapper animationParams={{ opacity: 0, y: 50, duration: 1 }}>
        <div className="flex items-center gap-4">
          <Fingerprint className="text-brand" size={40} />
          <h3 className="text-5xl font-bold tracking-tight">The Digital Universe</h3>
        </div>
      </ScrollTriggerWrapper>

      <div className="flex flex-col gap-6 max-w-4xl">
        <ScrollTriggerWrapper animationParams={{ opacity: 0, x: -50, duration: 1 }}>
          <p className="text-xl lg:text-2xl text-foreground/80 leading-relaxed font-light">
            I am {BIO.name}, a {BIO.role} who builds cinematic, high-performance web experiences. 
            Merging deep technical expertise with a keen eye for aesthetics to push the boundaries of digital interfaces.
          </p>
        </ScrollTriggerWrapper>
        <ScrollTriggerWrapper animationParams={{ opacity: 0, x: -50, duration: 1, delay: 0.2 }}>
          <p className="text-lg text-foreground/60 leading-relaxed">
            When I&apos;m not architecting complex systems or animating pixels, I am exploring the fundamental patterns that shape our world—from global markets to human behavior.
          </p>
        </ScrollTriggerWrapper>
      </div>

      {/* Beyond the Code Section */}
      <div id="beyond" className="flex flex-col gap-10 mt-12 pt-12 border-t border-foreground/5">
        <ScrollTriggerWrapper animationParams={{ opacity: 0, y: 30, duration: 0.8 }}>
          <div className="flex flex-col gap-2">
            <h3 className="text-4xl font-bold tracking-tight">Beyond the Code</h3>
            <p className="text-foreground/50 text-lg">What fuels my universe outside the terminal</p>
          </div>
        </ScrollTriggerWrapper>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {INTERESTS.map((interest, idx) => (
            <ScrollTriggerWrapper 
              key={interest.name} 
              animationParams={{ opacity: 0, scale: 0.9, duration: 0.6, delay: (idx % 3) * 0.15 }}
            >
              <motion.div 
                whileHover="hover"
                className="group flex flex-col items-center justify-center gap-4 p-8 rounded-3xl bg-accent/30 border border-foreground/10 hover:border-brand/40 hover:bg-accent/60 text-foreground shadow-sm transition-colors cursor-default h-full text-center"
              >
                <motion.div 
                  variants={{ hover: { scale: 1.2, rotate: 5, color: "var(--brand)" } }}
                  className="text-foreground/60 transition-colors duration-300 p-4 bg-background rounded-full border border-foreground/5"
                >
                  {interest.icon}
                </motion.div>
                <span className="font-semibold tracking-wide text-lg">{interest.name}</span>
              </motion.div>
            </ScrollTriggerWrapper>
          ))}
        </div>
      </div>
      
    </section>
  );
}
