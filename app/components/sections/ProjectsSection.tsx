"use client";

import React from "react";
import { ExternalLink, GitBranch } from "lucide-react";
import Image from "next/image";
import { MY_PROJECTS } from "@/lib/projects";

const CATEGORY_EMOJI: Record<string, string> = {
  opensource: "🌐",
  product: "🚀",
  ai: "🤖",
  fintech: "📈",
  health: "🏥",
};

export default function ProjectsSection() {
  return (
    <section id="work" className="relative w-full bg-white px-4 md:px-8 lg:px-12 py-24 lg:py-32">
      <div className="max-w-6xl mx-auto mb-16 lg:mb-24">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-0.5 w-12 bg-gray-900" />
          <p className="text-xs font-black tracking-[0.6em] text-gray-500 uppercase">Selected Works</p>
        </div>
        <h2 className="text-5xl lg:text-[6rem] font-black tracking-tighter leading-none text-gray-900">
          CASE <span className="text-blue-600">STUDIES</span>
        </h2>
      </div>

      <div className="relative max-w-6xl mx-auto w-full flex flex-col pt-10 pb-[20vh]">
        {MY_PROJECTS.map((project, index) => {
          const topOffset = `calc(10vh + ${index * 30}px)`;
          const hasImage = project.images && project.images.length > 0;
          
          return (
            <div 
              key={project.id}
              className="sticky w-full"
              style={{ 
                top: topOffset,
                marginBottom: index === MY_PROJECTS.length - 1 ? '0' : '40vh',
                zIndex: index + 1
              }}
            >
              <div 
                className="w-full h-[75vh] flex flex-col bg-white border border-gray-200 rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.05)] transform-gpu transition-all duration-300"
              >
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between p-6 lg:p-10 border-b border-gray-100 bg-white z-10 shrink-0 gap-6">
                  <div className="flex items-center gap-6 lg:gap-10">
                    <span className="text-5xl lg:text-6xl font-black text-gray-200 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-2xl lg:text-4xl font-black tracking-tight text-gray-900">
                        {project.title}
                      </h3>
                      <div className="flex gap-2 mt-2 hidden md:flex">
                         {project.tech.slice(0,3).map(t => (
                           <span key={t} className="text-[10px] font-bold px-2 py-1 bg-gray-50 text-gray-500 rounded border border-gray-100 uppercase tracking-wider">{t}</span>
                         ))}
                      </div>
                    </div>
                  </div>

                  {/* Buttons extracted and customized based on user's instruction */}
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 lg:px-6 lg:py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-md"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    ) : (
                      <button disabled className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-100 text-gray-400 px-5 py-3 lg:px-6 lg:py-3.5 rounded-full text-xs font-bold uppercase tracking-widest cursor-not-allowed">
                        <ExternalLink size={16} />
                        No Demo
                      </button>
                    )}

                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-900 text-white px-5 py-3 lg:px-6 lg:py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-md"
                      >
                        <GitBranch size={16} />
                        Source Link
                      </a>
                    ) : (
                      <button disabled className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-100 text-gray-400 px-5 py-3 lg:px-6 lg:py-3.5 rounded-full text-xs font-bold uppercase tracking-widest cursor-not-allowed">
                        <GitBranch size={16} />
                        Private
                      </button>
                    )}
                  </div>
                </div>

                {/* Body / Image */}
                <div className="relative flex-1 w-full bg-gray-50 p-4 lg:p-8 overflow-hidden flex flex-col md:flex-row gap-6 lg:gap-10">
                  {/* Left Side: Detail column */}
                  <div className="w-full md:w-1/3 flex flex-col gap-4">
                     <p className="text-gray-600 text-sm lg:text-base leading-relaxed font-medium">
                        {project.description}
                     </p>
                     <div className="mt-auto hidden md:block">
                        <span className="text-xs font-black tracking-widest uppercase text-gray-400">Category / {project.category}</span>
                     </div>
                  </div>

                  {/* Right Side: Big Thumbnail */}
                  <div className="relative w-full md:w-2/3 h-full rounded-[1.5rem] overflow-hidden border border-gray-200 bg-white shadow-sm flex-1 group">
                    {hasImage ? (
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                        <span className="text-[5rem] lg:text-[8rem] opacity-20">{CATEGORY_EMOJI[project.category] || "🚀"}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
