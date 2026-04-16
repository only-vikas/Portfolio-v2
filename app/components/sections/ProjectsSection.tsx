"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, GitBranch } from "lucide-react";
import Image from "next/image";
import { MY_PROJECTS } from "@/lib/projects";

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

function ProjectCard({ project, index }: { project: typeof MY_PROJECTS[0]; index: number }) {
  const color = CATEGORY_COLORS[project.category] || "#3b82f6";
  const hasImage = project.images && project.images.length > 0;

  return (
    <motion.div
      className="sticky top-24 w-full"
      style={{ top: `${80 + index * 20}px`, zIndex: index + 1 }}
    >
      <motion.div
        className="relative w-full rounded-3xl overflow-hidden border border-foreground/10 bg-background shadow-2xl"
        initial={{ opacity: 0, y: 80, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.7, delay: index * 0.05 }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex flex-col lg:flex-row min-h-[380px]">
          
          {/* Image / visual side */}
          <div
            className="relative w-full lg:w-[420px] flex-shrink-0 min-h-[220px] overflow-hidden"
            style={{ backgroundColor: color + "10" }}
          >
            {hasImage ? (
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover"
                style={{ filter: "brightness(0.85) saturate(1.1)" }}
                sizes="(max-width: 1024px) 100vw, 420px"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[7rem] opacity-20">{CATEGORY_EMOJI[project.category]}</span>
              </div>
            )}
            {/* Color overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{ background: `linear-gradient(135deg, ${color}40, transparent 60%)` }}
            />
            {/* Year badge */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white/70 text-xs font-mono">
              {project.year}
            </div>
          </div>

          {/* Content side */}
          <div className="flex flex-col justify-between p-8 lg:p-12 flex-1 gap-6">
            <div className="flex flex-col gap-4">
              {/* Category + number */}
              <div className="flex items-center justify-between">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                  style={{ backgroundColor: color + "20", color }}
                >
                  {project.category === "opensource" ? "Open Source" : project.category}
                </span>
                <span className="text-5xl font-black text-foreground/10">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                {project.title}
              </h3>
              <p className="text-foreground/60 leading-relaxed text-lg">
                {project.description}
              </p>
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-semibold rounded-full border border-foreground/10 bg-foreground/5 text-foreground/60"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 pt-2 border-t border-foreground/10">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold hover:text-brand transition-colors"
                >
                  <ExternalLink size={15} /> Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-foreground/50 hover:text-foreground transition-colors"
                >
                  <GitBranch size={15} /> Source
                </a>
              )}
              <motion.div className="ml-auto">
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: color + "20" }}
                  whileHover={{ scale: 1.15, backgroundColor: color + "40" }}
                >
                  <ArrowUpRight size={18} style={{ color }} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="work" className="relative w-full py-32">
      {/* Ambient background */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-8 lg:px-24">
        {/* Heading */}
        <motion.div
          className="flex flex-col gap-4 mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs font-bold tracking-[0.4em] text-foreground/30 uppercase">
            Portfolio
          </p>
          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
            Selected
            <br />
            <span className="text-brand">Works</span>
          </h2>
          <p className="text-foreground/50 text-lg max-w-xl">
            A curated selection of projects that pushed me technically, creatively, and strategically.
          </p>
        </motion.div>

        {/* Stacking Cards */}
        <div className="relative flex flex-col gap-8 pb-[20vh]">
          {MY_PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
