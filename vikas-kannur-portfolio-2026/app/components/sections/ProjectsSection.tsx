"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Blocks } from "lucide-react";
import { MY_PROJECTS, Project } from "@/lib/projects";
import ScrollTriggerWrapper from "../animations/ScrollTriggerWrapper";

const CATEGORIES = ["All", "opensource", "product", "ai", "fintech", "health"];

// 3D Tilt Card Component
const TiltCard = ({ project }: { project: Project }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalized between -0.5 and 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={`/projects/${project.slug}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      className="group block h-full p-8 rounded-3xl bg-accent/40 border border-black/5 dark:border-white/5 hover:border-brand/30 hover:bg-accent/80 transition-colors duration-500 cursor-pointer backdrop-blur-sm relative shadow-lg hover:shadow-brand/20"
    >
      <div 
        className="flex flex-col h-full gap-5 z-10 relative"
        style={{ transform: "translateZ(30px)" }} // Pop out text on tilt
      >
        <div className="flex justify-between items-start">
          <h4 className="text-2xl font-bold group-hover:text-brand transition-colors duration-300">
            {project.title}
          </h4>
          <ArrowRight className="text-gray-400 group-hover:text-brand group-hover:translate-x-1 -translate-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300" size={24} />
        </div>
        
        <p className="text-foreground/70 flex-1 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto pt-6">
          {project.tech.map(tech => (
            <span key={tech} className="px-3 py-1 text-xs font-semibold bg-background border border-foreground/10 rounded-full text-foreground/80 lowercase tracking-wide">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

export default function ProjectsSection() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = MY_PROJECTS.filter(project => 
    filter === "All" ? true : project.category === filter
  );

  return (
    <section id="work" className="w-full max-w-7xl px-8 lg:px-24 py-32 flex flex-col gap-16 relative z-10">
      <ScrollTriggerWrapper animationParams={{ opacity: 0, y: 50, duration: 1 }}>
        <div className="flex items-center gap-4">
          <Blocks className="text-brand" size={40} />
          <h3 className="text-5xl font-bold tracking-tight">Selected Works</h3>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mt-8">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${
                filter === category 
                  ? "bg-foreground text-background shadow-md" 
                  : "bg-accent/50 text-foreground hover:bg-accent border border-foreground/5 shadow-sm"
              }`}
            >
              {category === "All" ? "All" : category === "opensource" ? "Open Source" : category}
            </button>
          ))}
        </div>
      </ScrollTriggerWrapper>
      
      {/* Dynamic Grid w/ stagger exit/enter */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: 1000 }}>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="h-full"
            >
              <TiltCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
