"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, PartyPopper } from "lucide-react";
import ScrollTriggerWrapper from "../animations/ScrollTriggerWrapper";
import MagneticButton from "../ui/MagneticButton";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Transmission Received:", formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success state after a few seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="w-full max-w-7xl px-8 lg:px-24 py-32 flex flex-col gap-16 relative z-10 border-t border-foreground/5 mt-16">
      <div className="flex flex-col lg:flex-row gap-16 justify-between">
        
        {/* Left Column: Copy */}
        <div className="flex-1 flex flex-col gap-6">
          <ScrollTriggerWrapper animationParams={{ opacity: 0, x: -50, duration: 1 }}>
            <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-tight">
              Let&apos;s Build <br/>
              <span className="text-brand">Something Legendary</span>
            </h2>
          </ScrollTriggerWrapper>
          <ScrollTriggerWrapper animationParams={{ opacity: 0, x: -50, duration: 1, delay: 0.2 }}>
            <p className="text-xl text-foreground/60 max-w-lg leading-relaxed">
              Whether it&apos;s a next-gen product, open-source collaboration, or just a conversation about digital dopamine — I&apos;m all in.
            </p>
          </ScrollTriggerWrapper>
        </div>

        {/* Right Column: Form */}
        <div className="flex-1 max-w-xl w-full">
          <ScrollTriggerWrapper animationParams={{ opacity: 0, x: 50, duration: 1, delay: 0.3 }}>
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6 bg-accent/20 p-8 lg:p-10 rounded-3xl border border-foreground/10"
                >
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground/70 uppercase tracking-widest pl-2">Name</label>
                    <input 
                      id="name"
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-6 py-4 rounded-xl bg-background border border-foreground/10 focus:border-brand/50 focus:ring-1 focus:ring-brand/50 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground/70 uppercase tracking-widest pl-2">Email</label>
                    <input 
                      id="email"
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="px-6 py-4 rounded-xl bg-background border border-foreground/10 focus:border-brand/50 focus:ring-1 focus:ring-brand/50 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground/70 uppercase tracking-widest pl-2">Transmission</label>
                    <textarea 
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="px-6 py-4 rounded-xl bg-background border border-foreground/10 focus:border-brand/50 focus:ring-1 focus:ring-brand/50 outline-none transition-all resize-none"
                      placeholder="What are we building?"
                    />
                  </div>

                  <MagneticButton 
                    type="submit" 
                    disabled={isSubmitting}
                    className="mt-4 px-8 py-5 bg-foreground text-background font-bold rounded-2xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? "Transmitting..." : "Send Transmission"}
                    {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </MagneticButton>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center gap-6 bg-brand/10 p-12 rounded-3xl border border-brand/30"
                >
                  <motion.div 
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                  >
                    <div className="relative">
                      <PartyPopper size={48} className="text-brand absolute -top-8 -right-8 opacity-50 animate-bounce" />
                      <CheckCircle2 size={80} className="text-brand" />
                    </div>
                  </motion.div>
                  <h3 className="text-3xl font-bold">Transmission Secured</h3>
                  <p className="text-foreground/70 text-lg max-w-sm">
                    Message received. I will decode it and sync back with you within 24 earth hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollTriggerWrapper>
        </div>

      </div>
    </section>
  );
}
