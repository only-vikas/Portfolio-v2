"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import FloatingAvatar from "./components/3d/FloatingAvatar";
import { ArrowRight, ArrowDown } from "lucide-react";
import { BIO } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

// Components
import StickyNav from "./components/layout/StickyNav";
import CustomCursor from "./components/layout/CustomCursor";
import ProjectsSection from "./components/sections/ProjectsSection";
import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";
import Footer from "./components/layout/Footer";
import MagneticButton from "./components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic theme shift locking precisely at 80vh using End triggers
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "80% top", // Triggers when user scrolls past 80% of the hero section
      end: () => `+=${document.documentElement.scrollHeight}`, // Keep it active forever downwards
      onEnter: () => document.documentElement.classList.add("light"),
      onLeaveBack: () => document.documentElement.classList.remove("light"),
    });

    // Fade out scroll prompt
    if (scrollPromptRef.current) {
      gsap.to(scrollPromptRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "10% top",
          end: "30% top",
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      document.documentElement.classList.remove("light");
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <StickyNav />
      
      <main className="min-h-screen bg-transparent flex flex-col items-center">
        
        {/* Hero Section */}
        <section ref={heroRef} id="home" className="relative w-full h-screen flex flex-col lg:flex-row items-center justify-center px-8 lg:px-24 overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />

          {/* Text Content */}
          <div className="z-10 flex flex-col items-start max-w-2xl gap-6 flex-1 pt-24 lg:pt-0">
            <motion.h1 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-5xl lg:text-[5.5rem] leading-none font-bold tracking-tighter"
              style={{ letterSpacing: "-0.04em" }}
            >
              {BIO.name}
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="text-2xl lg:text-3xl text-gray-500 font-medium"
            >
              {BIO.role}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              className="text-lg text-gray-400 max-w-lg leading-relaxed mix-blend-difference"
            >
              {BIO.description}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
              className="flex gap-4 mt-6"
            >
              <MagneticButton 
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:scale-105 transition-transform flex items-center gap-2"
              >
                View Work <ArrowRight size={18} />
              </MagneticButton>
              <MagneticButton 
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 border border-accent-foreground/50 bg-transparent text-foreground font-semibold rounded-full hover:bg-accent-foreground/10 transition-colors"
              >
                Contact Me
              </MagneticButton>
            </motion.div>
          </div>

          {/* 3D Canvas Container */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex-1 w-full h-[50vh] lg:h-full relative z-0 mt-12 lg:mt-0 pointer-events-none"
          >
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <Suspense fallback={null}>
                <Environment preset="city" />
                <FloatingAvatar />
              </Suspense>
            </Canvas>
          </motion.div>
          
          {/* Scroll Prompt Arrow */}
          <div ref={scrollPromptRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce">
            <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
            <ArrowDown size={20} />
          </div>
        </section>

        <ProjectsSection />
        <AboutSection />
        <ContactSection />
        
      </main>

      <Footer />
    </>
  );
}
