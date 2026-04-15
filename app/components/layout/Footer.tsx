"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 24 }: { size?: number }) => (
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

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full px-8 lg:px-24 py-12 flex flex-col gap-8 border-t border-foreground/10 bg-background relative z-10">
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <h4 className="text-xl font-bold tracking-tight">Vikas Kannur</h4>
          <p className="text-sm font-medium text-foreground/50">
            Made with digital dopamine in Bengaluru &copy; {new Date().getFullYear()}
          </p>
        </div>

        {/* Center/Right: Links */}
        <div className="flex items-center gap-6">
          <MagneticButton className="p-3 rounded-full hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground">
            <a href="https://github.com/only-vikas" target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon size={24} />
            </a>
          </MagneticButton>
          <MagneticButton className="p-3 rounded-full hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground">
            <a href="https://linkedin.com/in/vikaskannur" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon size={24} />
            </a>
          </MagneticButton>
          
          <div className="w-px h-8 bg-foreground/10 hidden md:block mx-2" />
          
          <MagneticButton 
            onClick={scrollToTop}
            className="p-3 rounded-full bg-foreground text-background hover:scale-110 transition-transform"
            aria-label="Back to Top"
          >
            <ArrowUp size={24} />
          </MagneticButton>
        </div>

      </div>
    </footer>
  );
}
