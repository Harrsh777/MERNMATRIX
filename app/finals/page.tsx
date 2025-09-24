"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function formatTwo(n: number) {
  return n.toString().padStart(2, "0");
}

function getTargetDateToday(hours: number, minutes: number): Date {
  const now = new Date();
  const target = new Date(now);
  target.setHours(hours, minutes, 0, 0);
  return target;
}

function getTargetDateSpecific(month: number, day: number, hours: number, minutes: number): Date {
  const now = new Date();
  const target = new Date(now.getFullYear(), month - 1, day, hours, minutes, 0, 0);
  return target;
}

function calcTimeLeft(target: Date): TimeLeft {
  const now = new Date().getTime();
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function useCountdown(target: Date) {
  const [now, setNow] = useState<Date>(() => new Date());
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  
  const timeLeft = useMemo(() => calcTimeLeft(target), [now, target]);
  const isExpired = useMemo(() => new Date() >= target, [now, target]);
  return { timeLeft, isExpired, mounted };
}

function CountdownDisplay({ label, target }: { label: string; target: Date }) {
  const { timeLeft, isExpired, mounted } = useCountdown(target);
  
  if (!mounted) {
    return (
      <div className="w-full flex flex-col items-center gap-4">
        <p className="text-sm text-[#CBC3E3] tracking-wide uppercase">{label}</p>
        <div className="grid grid-flow-col auto-cols-fr gap-3 text-center">
          {["Days", "Hours", "Minutes", "Seconds"].map((item) => (
            <div key={item} className="rounded-xl border border-[#A020F0]/30 bg-[#0A0118]/80 backdrop-blur-md p-4 animate-pulse">
              <div className="text-3xl md:text-5xl font-semibold tabular-nums text-[#CBC3E3]">
                --
              </div>
              <div className="mt-1 text-xs md:text-sm text-[#A020F0]">{item}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (isExpired) return null;
  
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-[#CBC3E3] tracking-wide uppercase font-medium"
      >
        {label}
      </motion.p>
      <div className="grid grid-flow-col auto-cols-fr gap-3 text-center">
        {[
          { k: "Days", v: timeLeft.days },
          { k: "Hours", v: timeLeft.hours },
          { k: "Minutes", v: timeLeft.minutes },
          { k: "Seconds", v: timeLeft.seconds },
        ].map((item, index) => (
            <motion.div 
              key={item.k}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="rounded-lg border border-[#A020F0]/30 bg-gradient-to-br from-[#0A0118]/90 to-[#1E0345]/60 backdrop-blur-md p-3 shadow-lg hover:shadow-[#A020F0]/20 transition-all duration-300"
            >
              <motion.div 
                key={item.v}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-2xl md:text-3xl font-bold tabular-nums bg-gradient-to-br from-[#CBC3E3] to-[#A020F0] bg-clip-text text-transparent"
              >
                {formatTwo(item.v)}
              </motion.div>
              <div className="mt-1 text-xs text-[#A020F0] font-medium">{item.k}</div>
            </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function FinalsPage() {
  // Set specific date: September 24th, 8:00 PM
  const eightPM = useMemo(() => getTargetDateSpecific(9, 24, 20, 0), []);
  const midnight = useMemo(() => getTargetDateSpecific(9, 25, 0, 0), []); // September 25th midnight
  const { isExpired: isAfterEight } = useCountdown(eightPM);
  const { isExpired: isAfterMidnight } = useCountdown(midnight);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    teamName: "",
    teamLeaderName: "",
    projectUrl: "",
    githubUrl: "",
    gist: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/finals/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Submission failed");
      }
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#07020f] via-[#0A0118] to-[#000000]" />
        
        {/* Animated glow orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-40 -left-40 w-[60vw] h-[60vw] rounded-full bg-[#A020F0]/20 blur-[120px]"
          />
          <motion.div 
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-40 -right-40 w-[55vw] h-[55vw] rounded-full bg-[#CBC3E3]/15 blur-[140px]"
          />
        </div>

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen" style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(160,32,240,0.3) 0, rgba(160,32,240,0.3) 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, rgba(160,32,240,0.3) 0, rgba(160,32,240,0.3) 1px, transparent 1px, transparent 50px)"
        }} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 py-10 md:py-16">
        <AnimatePresence mode="wait">
          {!isAfterEight && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center gap-8"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-center"
              >
                <motion.span
                  animate={{
                    boxShadow: ['0 0 0px rgba(160,32,240,0)', '0 0 20px rgba(160,32,240,0.4)', '0 0 0px rgba(160,32,240,0)']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                  className="inline-block px-4 py-2 text-sm font-semibold text-[#CBC3E3] bg-[#A020F0]/20 rounded-full mb-6 border border-[#A020F0]/30"
                >
                  FINAL SUBMISSION
                </motion.span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-br from-[#F0F0F0] via-[#CBC3E3] to-[#A020F0] bg-clip-text text-transparent mb-4">
                  Hackathon
                </h1>
                <p className="text-lg text-[#E0E0E0] max-w-2xl mx-auto leading-relaxed">
                  Submit your project by 8:00 PM today. The form opens when the timer ends.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="w-full"
              >
                <CountdownDisplay label="Time left until submissions open" target={eightPM} />
              </motion.div>
            </motion.div>
          )}

          {isAfterEight && !isAfterMidnight && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-8"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-[#F0F0F0] to-[#A020F0] bg-clip-text text-transparent mb-4">
                  Final Submission Form
                </h2>
                <p className="text-lg text-[#E0E0E0] mb-6">
                  Please complete all fields. Submissions close at midnight on September 25th.
                </p>
                <div className="mb-6">
                  <CountdownDisplay label="Time left to submit" target={midnight} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-[#0A0118]/80 to-[#1E0345]/60 backdrop-blur-md rounded-2xl border border-[#A020F0]/20 p-10 shadow-2xl"
              >
                <form onSubmit={handleSubmit} className="grid gap-8">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-[#CBC3E3]">Team Name</label>
                    <Input 
                      name="teamName" 
                      value={form.teamName} 
                      onChange={handleChange} 
                      required 
                      placeholder="Enter your team name"
                      className="bg-[#0A0118]/50 border-[#A020F0]/30 text-[#F0F0F0] placeholder:text-[#A0A0A0] focus:border-[#A020F0] focus:ring-[#A020F0]/20"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-[#CBC3E3]">Team Leader Name</label>
                    <Input 
                      name="teamLeaderName" 
                      value={form.teamLeaderName} 
                      onChange={handleChange} 
                      required 
                      placeholder="Enter team leader's full name"
                      className="bg-[#0A0118]/50 border-[#A020F0]/30 text-[#F0F0F0] placeholder:text-[#A0A0A0] focus:border-[#A020F0] focus:ring-[#A020F0]/20"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-[#CBC3E3]">Deployed Project Link</label>
                    <Input 
                      name="projectUrl" 
                      type="url" 
                      value={form.projectUrl} 
                      onChange={handleChange} 
                      required 
                      placeholder="https://yourapp.com"
                      className="bg-[#0A0118]/50 border-[#A020F0]/30 text-[#F0F0F0] placeholder:text-[#A0A0A0] focus:border-[#A020F0] focus:ring-[#A020F0]/20"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-[#CBC3E3]">GitHub Repository</label>
                    <Input 
                      name="githubUrl" 
                      type="url" 
                      value={form.githubUrl} 
                      onChange={handleChange} 
                      required 
                      placeholder="https://github.com/org/repo"
                      className="bg-[#0A0118]/50 border-[#A020F0]/30 text-[#F0F0F0] placeholder:text-[#A0A0A0] focus:border-[#A020F0] focus:ring-[#A020F0]/20"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-[#CBC3E3]">100-word Gist</label>
                    <textarea
                      name="gist"
                      value={form.gist}
                      onChange={handleChange}
                      required
                      minLength={20}
                      maxLength={900}
                      className={cn(
                        "bg-[#0A0118]/50 border border-[#A020F0]/30 text-[#F0F0F0] placeholder:text-[#A0A0A0] focus:border-[#A020F0] focus:ring-[#A020F0]/20 w-full min-w-0 rounded-md px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                        "focus-visible:border-[#A020F0] focus-visible:ring-[#A020F0]/20 focus-visible:ring-[3px]"
                      )}
                      rows={5}
                      placeholder="Summarize what you built in ~100 words"
                    />
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/10 border border-red-500/30 rounded-lg p-4"
                    >
                      <p className="text-red-400 font-medium">❌ {error}</p>
                    </motion.div>
                  )}

                  <div className="flex justify-end">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-[#A020F0] to-[#6B46C1] hover:from-[#8B5CF6] hover:to-[#A020F0] text-[#0A0118] font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-[#A020F0]/25 transition-all duration-300"
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </Button>
                    </motion.div>
                  </div>
                </form>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 p-6 bg-green-500/10 border border-green-500/30 rounded-lg"
                  >
                    <p className="text-lg text-green-400 font-semibold">✅ Form Successfully Submitted!</p>
                    <p className="text-sm text-green-300 mt-1">Thank you for your submission. Good luck with the hackathon!</p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}

          {isAfterMidnight && (
            <motion.div
              key="closed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-gradient-to-br from-[#0A0118]/80 to-[#1E0345]/60 backdrop-blur-md rounded-2xl border border-[#A020F0]/20 p-12 shadow-2xl"
              >
                <motion.div
                  animate={{
                    boxShadow: ['0 0 0px rgba(160,32,240,0)', '0 0 30px rgba(160,32,240,0.3)', '0 0 0px rgba(160,32,240,0)']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                  className="mb-6"
                >
                  <h3 className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-[#F0F0F0] to-[#A020F0] bg-clip-text text-transparent mb-4">
                    Better Luck Next Time
                  </h3>
                </motion.div>
                <p className="text-lg text-[#E0E0E0] mb-4">Submissions are now closed.</p>
                <p className="text-sm text-[#A0A0A0]">Thank you for participating in the hackathon!</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


