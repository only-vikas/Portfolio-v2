import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { MY_PROJECTS } from "@/lib/projects";
import ProjectCanvas from "@/app/components/3d/ProjectCanvas";

const GithubIcon = ({ size = 24 }: { size?: number; className?: string }) => (

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0-.1-3.7s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0c-2.7-1.8-3.9-1.4-3.9-1.4a5.4 5.4 0 0 0-.1 3.7 5.4 5.4 0 0 0-1.5 3.8c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
    <path d="M9 18c-4.5 1.5-5-2.5-7-3" />
  </svg>
);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = MY_PROJECTS.find((p) => p.slug === slug);
  
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Vikas Kannur`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Vikas Kannur`,
      description: project.description,
    },
  };
}

export function generateStaticParams() {
  return MY_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = MY_PROJECTS.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-transparent flex flex-col items-center">
      
      {/* Back Button */}
      <div className="w-full max-w-7xl px-8 lg:px-24 pt-32 pb-8 flex justify-start z-10">
        <Link 
          href="/"
          className="flex items-center gap-2 text-foreground/60 hover:text-brand transition-colors font-medium tracking-wide group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Universe
        </Link>
      </div>

      {/* Hero Content */}
      <section className="relative w-full flex flex-col lg:flex-row items-center justify-center px-8 lg:px-24 py-12 lg:py-24 overflow-hidden gap-12">
        <div className="z-10 flex flex-col items-start gap-8 flex-1 w-full max-w-2xl">
          <div className="flex flex-col gap-4">
            <span className="text-brand font-bold tracking-widest uppercase text-sm">
              {project.category} • {project.year}
            </span>
            <h1 className="text-4xl lg:text-7xl font-bold tracking-tighter leading-tight">
              {project.title}
            </h1>
          </div>
          
          <p className="text-xl text-foreground/70 leading-relaxed font-light">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noreferrer"
                className="px-8 py-4 bg-foreground text-background font-bold rounded-2xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 shadow-lg"
              >
                View Live System <ExternalLink size={18} />
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noreferrer"
                className="px-8 py-4 border border-foreground/20 bg-background/50 text-foreground font-bold rounded-2xl hover:bg-foreground/5 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                Explore Repository
              </a>
            )}
          </div>
        </div>

        {/* 3D Visual Context */}
        <div className="flex-1 w-full h-[40vh] lg:h-[60vh] relative z-0 mt-8 lg:mt-0 opacity-80 pointer-events-none">
          <ProjectCanvas />
        </div>
      </section>

      {/* Detailed Case Study */}
      <section className="w-full max-w-7xl px-8 lg:px-24 py-24 flex flex-col gap-24 relative z-10 border-t border-foreground/5">
        
        {/* Abstract & Tech */}
        <div className="flex flex-col md:flex-row gap-16 justify-between items-start">
          <div className="flex-1 flex flex-col gap-6 max-w-2xl">
            <h3 className="text-3xl font-bold tracking-tight">The Objective</h3>
            <p className="text-lg text-foreground/80 leading-loose">
              {project.longDescription}
            </p>
          </div>
          
          <div className="flex flex-col gap-6 w-full md:w-auto md:min-w-[300px] bg-accent/30 p-8 rounded-3xl border border-foreground/5">
            <h4 className="text-xl font-bold tracking-tight text-brand">Architecture Core</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(tech => (
                <span key={tech} className="px-4 py-2 text-sm font-semibold bg-background border border-foreground/10 rounded-full text-foreground/90">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Gallery Placeholder */}
        <div className="flex flex-col gap-8 w-full">
          <h3 className="text-3xl font-bold tracking-tight">System Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {project.images.map((imagePath, idx) => (
              <div 
                key={idx} 
                className="w-full aspect-video rounded-3xl overflow-hidden border border-foreground/10 bg-accent relative group"
              >
                {/* Fallback to CSS representation if images don't exist locally */}
                <div className="absolute inset-0 flex items-center justify-center text-foreground/20 font-bold text-2xl tracking-widest uppercase bg-gradient-to-br from-brand/5 to-transparent">
                  {project.slug} - V_{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </main>
  );
}
