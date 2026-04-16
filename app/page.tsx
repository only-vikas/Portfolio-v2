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
        <section ref={heroRef} id="home" className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent">
          {/* Background Gradients */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />

          {/* MASSIVE TYPOGRAPHY BACKGROUND */}
          <div className="absolute top-1/2 -translate-y-[70%] flex flex-col items-center w-full z-0 pointer-events-none">
             <div className="flex gap-8 lg:gap-24 text-xs font-bold tracking-[0.3em] text-white/50 uppercase mb-4 lg:mb-10">
                <span>About</span>
                <span>Experience</span>
                <span>Projects</span>
                <span>Contact</span>
             </div>
             <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-[18vw] lg:text-[14rem] font-black tracking-tighter leading-none text-foreground m-0 uppercase"
                style={{ fontFamily: "Impact, system-ui, sans-serif", letterSpacing: "-0.02em" }}
             >
               HI, I'M VIKAS
             </motion.h1>
          </div>

          {/* FULL SCREEN 3D CANVAS */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="absolute inset-0 w-full h-full z-10 pointer-events-none flex items-center justify-center"
          >
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <Suspense fallback={null}>
                <Environment preset="city" />
                <FloatingAvatar />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* FLANKING PANELS (Left Bio, Right Button) anchored to bottom */}
          <div className="absolute w-full h-full inset-0 z-20 pointer-events-none flex items-end justify-between px-8 lg:px-24 pb-16 lg:pb-32">
            
            {/* Left side: Bio Text */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              className="max-w-[280px] pointer-events-auto hidden md:block"
            >
              <h2 className="text-xl font-bold mb-2">A {BIO.role}</h2>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">
                Passionate about crafting bold, immersive, and highly memorable digital projects using modern web technologies. 😎
              </p>
            </motion.div>

            {/* Right side: Contact Button matching reference gradient */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
              className="pointer-events-auto hidden md:block"
            >
              <MagneticButton 
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-10 py-5 rounded-full font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 hover:scale-105 transition-transform tracking-wider text-sm uppercase"
              >
                Contact Me
              </MagneticButton>
            </motion.div>

          </div>
          
          {/* Mobile elements (since flanking is hidden on very small screens) */}
          <motion.div 
             className="absolute bottom-24 flex items-center justify-center gap-4 z-20 md:hidden pointer-events-auto"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.8 }}
          >
            <MagneticButton 
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 hover:scale-105 transition-transform text-xs uppercase"
              >
                Contact Me
              </MagneticButton>
          </motion.div>

          {/* Scroll Prompt Arrow */}
          <div ref={scrollPromptRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce z-20">
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
