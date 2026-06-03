"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, ArrowRight } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";

// Custom icons to avoid lucide-react export issues
const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0-.1-3.7s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0c-2.7-1.8-3.9-1.4-3.9-1.4a5.4 5.4 0 0 0-.1 3.7 5.4 5.4 0 0 0-1.5 3.8c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
    <path d="M9 18c-4.5 1.5-5-2.5-7-3" />
  </svg>
);

const SOCIAL_LINKS = [
  { 
    name: "Email", 
    href: "mailto:vkannur504@gmail.com", 
    icon: <Mail size={22} />,
    id: "email"
  },
  { 
    name: "LinkedIn", 
    href: "https://linkedin.com/in/vikas-kannur", 
    icon: <LinkedinIcon size={22} />, 
    id: "linkedin"
  },
  { 
    name: "GitHub", 
    href: "https://github.com/only-vikas", 
    icon: <GithubIcon size={22} />,
    id: "github"
  },
];

export default function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => setFormState("success"), 2000);
  };

  return (
    <section id="contact" className="relative w-full py-40 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[#f8fafc] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6"
            >
               <motion.div 
                 className="flex items-center gap-3 text-blue-600"
                 animate={{ x: [0, 5, 0] }}
                 transition={{ duration: 3, repeat: Infinity }}
               >
                 <span className="w-1 h-1 bg-current rounded-full" />
                 <span className="text-xs font-black tracking-widest uppercase">Available for new opportunities</span>
               </motion.div>
               <h2 className="text-6xl lg:text-7xl xl:text-[6rem] font-black tracking-tighter leading-[0.9] text-slate-900 break-words">
                 LET'S BUILD <br />
                 <span className="text-blue-600">LEGENDARY.</span>
               </h2>
               <p className="text-xl text-slate-500 max-w-md font-light leading-relaxed">
                 Have a groundbreaking idea? Let's translate it into digital excellence.
               </p>
            </motion.div>

            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-black tracking-widest uppercase text-slate-400">Social Architecture</p>
              <div className="flex flex-wrap gap-4">
                {SOCIAL_LINKS.map((link) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-white transition-all duration-300 shadow-sm"
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <motion.div 
                      className="absolute inset-0 rounded-2xl bg-slate-900 scale-0 group-hover:scale-100 transition-transform duration-300" 
                      style={{ originX: 0.5, originY: 0.5 }}
                    />
                    <span className="relative z-10">{link.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative bg-white border border-slate-100 rounded-[3rem] p-10 lg:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.05)]">
               
               <AnimatePresence mode="wait">
                 {formState !== "success" ? (
                   <motion.form 
                      key="form"
                      onSubmit={handleSubmit} 
                      className="flex flex-col gap-8"
                      exit={{ opacity: 0, y: 20 }}
                   >
                     <div className="flex flex-col gap-3 group">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Your Alias</label>
                       <input 
                         suppressHydrationWarning
                         required
                         type="text" 
                         placeholder="VIKAS KANNUR"
                         className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:border-blue-500/50 transition-colors"
                       />
                     </div>

                     <div className="flex flex-col gap-3 group">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Transmission Endpoint</label>
                       <input 
                         suppressHydrationWarning
                         required
                         type="email" 
                         placeholder="HELLO@WORLD.COM"
                         className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:border-blue-500/50 transition-colors"
                       />
                     </div>

                     <div className="flex flex-col gap-3 group">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Transmission Data</label>
                       <textarea 
                         suppressHydrationWarning
                         required
                         rows={4}
                         placeholder="DROP THE DETAILS..."
                         className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-6 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                       />
                     </div>

                     <MagneticButton className="w-full">
                       <button 
                          disabled={formState === "submitting"}
                          className="w-full bg-slate-900 group relative flex items-center justify-center gap-3 py-5 rounded-2xl text-white font-black uppercase tracking-wider overflow-hidden"
                       >
                         {formState === "submitting" ? (
                           <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                         ) : (
                           <>
                              <span>Send Transmission</span>
                              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                           </>
                         )}
                       </button>
                     </MagneticButton>
                   </motion.form>
                 ) : (
                   <motion.div 
                     key="success"
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="flex flex-col items-center justify-center py-20 gap-6 text-center"
                   >
                     <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-emerald-500/30"
                     >
                       <CheckCircle size={48} />
                     </motion.div>
                     <div className="flex flex-col gap-2">
                        <h3 className="text-3xl font-black text-slate-900">TRANSMISSION RECEIVED</h3>
                        <p className="text-slate-500 max-w-[280px]">Your message has been successfully encrypted and delivered.</p>
                     </div>
                     <button 
                       onClick={() => setFormState("idle")}
                       className="text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 underline underline-offset-4"
                     >
                       Send another transmission?
                     </button>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
