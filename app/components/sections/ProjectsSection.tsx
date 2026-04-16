"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, GitBranch } from "lucide-react";
import Image from "next/image";
import { MY_PROJECTS } from "@/lib/projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Project image fallbacks by category
const CATEGORY_COLORS: Record<string, string> = {
  opensource: "#3b82f6",
  product: "#8b5cf6",
  ai: "#ec4899",
  fintech: "#10b981",
  health: "#f59e0b",
};

const CATEGORY_EMOJI: Record<string, string> = {
  opensource: "🌐",
  product: "🚀",
  ai: "🤖",
  fintech: "📈",
  health: "🏥",
};

/**
 * Decorative background grid of colorful blurred "flash" cards
 */
function ColorFlashCards() {
  const colors = ["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-amber-500", "bg-emerald-500"];
  
  return (
    <div className="absolute inset-0 flex flex-wrap gap-12 justify-center content-center opacity-10 pointer-events-none overflow-hidden blur-[100px]">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className={`w-64 h-64 rounded-full ${colors[i % colors.length]}`}
          animate={{
            scale: [1, 1.2, 0.9, 1],
            x: [0, 50, -30, 0],
            y: [0, -40, 60, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Clear refs array on each render to prevent strict-mode duplication issues
  cardsRef.current = [];

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardsRef.current.filter(Boolean);

    if (cards.length > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      cards.forEach((card, index) => {
        if (!card) return;
        
        card.style.zIndex = String(index + 1);

        if (index > 0) {
          // Initialize below the screen
          gsap.set(card, { y: "150vh", scale: 0.95 });
          
          tl.to(card,
            { y: "0vh", scale: 1, ease: "none" },
            index // time slot corresponds to index
          );
        }

        if (index > 0) {
          // As new card comes up, old cards visually recess
          cards.slice(0, index).forEach((prevCard, i) => {
            if (prevCard) {
              tl.to(prevCard, {
                scale: 1 - ((index - i) * 0.05),
                y: -((index - i) * 20),
                opacity: 1 - ((index - i) * 0.15),
                ease: "none"
              }, index);
            }
          });
        }
      });
    }
  }, { scope: sectionRef });

  // Calculate height dynamically. 100vh for each card's scroll padding.
  const sectionHeight = `${MY_PROJECTS.length * 100}vh`;

  return (
    <section 
      ref={sectionRef} 
      id="work" 
      className="relative w-full bg-[#fafafa]"
      style={{ height: sectionHeight }}
    >
      {/* Sticky container that holds the viewport height */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <ColorFlashCards />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[85vh] lg:h-[80vh] px-4 md:px-8 lg:px-24 flex flex-col justify-center">
          
          {/* Fixed Background Heading */}
          <div className="absolute top-0 left-4 md:left-8 lg:left-24 z-0 pointer-events-none mt-10 lg:mt-0">
            <div className="flex items-center gap-4 mb-4">
               <div className="h-0.5 w-12 bg-slate-900" />
               <p className="text-xs font-black tracking-[0.6em] text-slate-400 uppercase">Selected Works</p>
            </div>
            <h2 className="text-6xl lg:text-[8rem] font-black tracking-tighter leading-none text-slate-900">
              CRAFTED WITH
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">PRECISION</span>
            </h2>
          </div>

          {/* Stack of Project Cards */}
          <div className="relative w-full h-[60vh] lg:h-[65vh] mt-[20vh] lg:mt-[15vh]">
            {MY_PROJECTS.map((project, index) => {
            const color = CATEGORY_COLORS[project.category] || "#3b82f6";
            const hasImage = project.images && project.images.length > 0;

            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="absolute inset-0 w-full h-full rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border border-white/50 bg-white/90 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] origin-top flex flex-col lg:flex-row will-change-transform"
              >
                {/* Visual / Image Side */}
                <div
                  className="relative w-full lg:w-[45%] lg:max-w-[500px] flex-shrink-0 h-[40%] lg:h-full overflow-hidden"
                  style={{ backgroundColor: color + "08" }}
                >
                  {hasImage ? (
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      style={{ filter: "brightness(0.98)" }}
                      sizes="(max-width: 1024px) 100vw, 500px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[6rem] lg:text-[10rem] opacity-10">{CATEGORY_EMOJI[project.category]}</span>
                    </div>
                  )}
                  {/* Year badge */}
                  <div className="absolute top-4 left-4 lg:top-8 lg:left-8 px-4 py-1.5 lg:px-5 lg:py-2 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black tracking-[0.2em] uppercase">
                    {project.year}
                  </div>
                  {/* Ambient gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>

                {/* Content Side */}
                <div className="flex flex-col justify-between p-6 lg:p-16 flex-1 gap-6 lg:gap-10 text-slate-900 bg-white/50 h-full overflow-y-auto lg:overflow-hidden lg:h-auto">
                  <div className="flex flex-col gap-4 lg:gap-6">
                    <div className="flex items-center justify-between">
                      <span
                        className="px-4 py-1.5 lg:px-5 lg:py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border"
                        style={{ borderColor: color + "30", backgroundColor: color + "10", color }}
                      >
                        {project.category === "opensource" ? "Open Source" : project.category}
                      </span>
                      <span className="text-5xl lg:text-7xl font-black text-slate-200 tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="text-3xl lg:text-5xl font-black tracking-tighter leading-tight text-slate-950">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed text-sm md:text-base lg:text-xl max-w-2xl font-medium lg:font-light">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 lg:px-4 lg:py-1.5 text-[10px] lg:text-[11px] font-bold rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 lg:gap-8 border-t border-slate-200 pt-4 lg:pt-8 mt-auto">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 lg:gap-3 text-xs lg:text-sm font-black hover:text-blue-600 transition-colors uppercase tracking-wider"
                      >
                        <ExternalLink size={16} className="hidden lg:block"/>
                        Live Site
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 lg:gap-3 text-xs lg:text-sm font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-wider"
                      >
                        <GitBranch size={16} className="hidden lg:block"/>
                        Source
                      </a>
                    )}
                    
                    <motion.div className="ml-auto group cursor-pointer">
                       <motion.div 
                          className="w-10 h-10 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shadow-lg transition-all"
                          style={{ backgroundColor: color, color: "white" }}
                          whileHover={{ scale: 1.1, rotate: 10 }}
                       >
                          <ArrowUpRight size={20} />
                       </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
