"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Download, Clock, Users, Award, FileText, CheckCircle } from "lucide-react";

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

function useRealTimeCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(target));
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => {
      setTimeLeft(calcTimeLeft(target));
    }, 1000);
    return () => clearInterval(id);
  }, [target]);
  
  return { timeLeft, mounted };
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

function GuidelinesSection() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const downloadGuidelines = () => {
    const link = document.createElement('a');
    link.href = '/Guidelines.pdf';
    link.download = 'Hackathon-Guidelines.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const guidelinesData = [
    {
      id: 'general-rules',
      title: 'General Rules',
      icon: <Users className="w-5 h-5" />,
      content: [
        'All participants must be present and report at **1:30 PM IST** sharp at the **AB-02** entrance gate.',
        'It is mandatory for all team members to be present. Your reporting venue will be announced at the entry desk on the event day.',
        'Each team must carry at least one charged laptop.',
        'Remember to bring your own chargers and extension cords.',
        'We expect all participants to maintain a respectful and collaborative environment. Any form of misconduct will not be tolerated and will result in immediate disqualification.',
        'Every participant must carry their respective college ID cards.',
        '**Only External Participants can attend the event online.**'
      ]
    },
    {
      id: 'judging-presentations',
      title: 'Judging and Presentations',
      icon: <Award className="w-5 h-5" />,
      content: [
        '**Pitching Flexibility:** Presentations are flexible, allowing teams to use a PowerPoint presentation, a live demo, or a detailed explanation. Choose the format that best showcases your work.',
        '**Judging Process:** Judges are experts in the problem domain. The process is unbiased and fair, and the marks awarded are final.',
        '**No Interference:** The organizing committee and club members will not answer questions regarding hackathon outcomes or judging decisions.',
        '**Pitch Time Limit:** Each team will be allotted exactly **5 minutes** for their presentation. Strict adherence to this limit is required for smooth flow.',
        '**Technical Setup:** Ensure your presentation materials are ready, as technical support will not be provided for last-minute issues with laptops or presentations.',
        'Project presentations for **external participants** will be conducted via online mode on the same day and same time.'
      ]
    },
    {
      id: 'judgement-criteria',
      title: 'Judgement Criteria',
      icon: <CheckCircle className="w-5 h-5" />,
      content: [
        '**Relevance:** Does it address the chosen problem effectively?',
        '**Clarity:** Is the idea structured and well-explained?',
        '**Feasibility:** Is it possible, practical, and viable to execute in the real world?',
        '**Innovation:** Is it unique and creative compared to existing solutions?',
        '**Impact:** Does it hold real-world usefulness?'
      ]
    },
    {
      id: 'important-notes',
      title: 'Important Notes',
      icon: <FileText className="w-5 h-5" />,
      content: [
        'All project ideas, abstracts, and PPTs will be collected by **club coordinators**, **faculties**, **Unigoal team** and **Sheryians team**.',
        'The final judgement lies solely with the judges.',
        'The club has no role in final judgement.'
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-gradient-to-br from-[#0A0118]/80 to-[#1E0345]/60 backdrop-blur-md rounded-2xl border border-[#A020F0]/20 p-8 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-[#F0F0F0] to-[#A020F0] bg-clip-text text-transparent mb-2">
            Hackathon Guidelines
          </h3>
          <p className="text-[#CBC3E3] text-sm">Please review all guidelines carefully</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={downloadGuidelines}
            className="bg-gradient-to-r from-[#A020F0] to-[#6B46C1] hover:from-[#8B5CF6] hover:to-[#A020F0] text-[#0A0118] font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-[#A020F0]/25 transition-all duration-300 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </motion.div>
      </div>

      <div className="space-y-4">
        {guidelinesData.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            className="border border-[#A020F0]/20 rounded-xl overflow-hidden bg-[#0A0118]/40"
          >
            <motion.button
              onClick={() => toggleSection(section.id)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#A020F0]/10 transition-all duration-300 group"
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#A020F0]/20 text-[#A020F0] group-hover:bg-[#A020F0]/30 transition-colors">
                  {section.icon}
                </div>
                <h4 className="text-lg font-semibold text-[#F0F0F0] group-hover:text-[#CBC3E3] transition-colors">
                  {section.title}
                </h4>
              </div>
              <motion.div
                animate={{ rotate: expandedSections.has(section.id) ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-[#A020F0] group-hover:text-[#CBC3E3] transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {expandedSections.has(section.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 border-t border-[#A020F0]/10">
                    <div className="pt-4 space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: itemIndex * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-2 h-2 rounded-full bg-[#A020F0] mt-2 flex-shrink-0" />
                          <p 
                            className="text-[#E0E0E0] leading-relaxed"
                            dangerouslySetInnerHTML={{ 
                              __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#A020F0] font-semibold">$1</strong>') 
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-6 p-4 bg-[#A020F0]/10 border border-[#A020F0]/30 rounded-lg"
      >
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-[#A020F0] mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[#CBC3E3] font-medium mb-1">Event Timing</p>
            <p className="text-[#E0E0E0] text-sm">
              Final round of Dawn of Code hackathon. Make sure to arrive on time and follow all guidelines for a smooth experience.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FinalsPage() {
  // Set today's date at 1:00 PM for form closure
  const onePM = useMemo(() => getTargetDateToday(13, 0), []); // 1:00 PM today
  
  const { isExpired: isAfterOnePM } = useCountdown(onePM);

  // Real-time countdown for the top timer (counts down to 1:00 PM)
  const { timeLeft: realTimeLeft, mounted: countdownMounted } = useRealTimeCountdown(onePM);
  
  // Show form if it's before 1:00 PM, close it exactly at 1:00 PM
  const showForm = !isAfterOnePM;
  const showClosed = isAfterOnePM;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      console.log('Submitting form data:', form);
      
      const res = await fetch("/api/finals/submit-alt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);
      
      if (!res.ok) {
        throw new Error(data?.error || data?.message || `HTTP ${res.status}: Submission failed`);
      }
      
      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }


  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
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

      {/* Top Right Countdown Timer */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-4 right-4 z-50"
      >
        <div className="bg-gradient-to-br from-[#0A0118]/90 to-[#1E0345]/80 backdrop-blur-md rounded-xl border border-[#A020F0]/30 p-4 shadow-2xl">
          <div className="text-center">
            <motion.p 
              animate={{
                textShadow: ['0 0 0px rgba(160,32,240,0)', '0 0 8px rgba(160,32,240,0.4)', '0 0 0px rgba(160,32,240,0)']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              className="text-xs font-semibold text-[#CBC3E3] mb-3 tracking-wide uppercase"
            >
              Time left until form closes
            </motion.p>
            <div className="grid grid-cols-4 gap-2">
              {!countdownMounted ? (
                // Loading state
                ["Days", "Hours", "Minutes", "Seconds"].map((item, index) => (
                  <motion.div 
                    key={item}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="text-xl font-bold bg-gradient-to-br from-[#CBC3E3] to-[#A020F0] bg-clip-text text-transparent mb-1 animate-pulse">
                      --
                    </div>
                    <div className="text-xs text-[#A020F0] font-medium">{item}</div>
                  </motion.div>
                ))
              ) : (
                [
                  { k: "Days", v: Math.max(0, realTimeLeft.days) },
                  { k: "Hours", v: Math.max(0, realTimeLeft.hours) },
                  { k: "Minutes", v: Math.max(0, realTimeLeft.minutes) },
                  { k: "Seconds", v: Math.max(0, realTimeLeft.seconds) },
                ].map((item, index) => (
                  <motion.div 
                    key={item.k}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <motion.div 
                      key={item.v}
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-xl font-bold bg-gradient-to-br from-[#CBC3E3] to-[#A020F0] bg-clip-text text-transparent mb-1"
                    >
                      {formatTwo(item.v)}
                    </motion.div>
                    <div className="text-xs text-[#A020F0] font-medium">{item.k}</div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 py-10 md:py-16">

        <AnimatePresence mode="wait">
          {!showForm && (
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
                  Submit your project before 1:00 PM today. The form closes exactly at 1:00 PM.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="w-full"
              >
                <CountdownDisplay label="Time left until submissions close" target={onePM} />
              </motion.div>
            </motion.div>
          )}

          {showForm && !showClosed && (
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
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
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
                    PROJECT SUBMISSION
                  </motion.span>
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-[#F0F0F0] via-[#CBC3E3] to-[#A020F0] bg-clip-text text-transparent mb-4">
                  Final Submission
                </h2>
                <p className="text-lg text-[#E0E0E0] mb-2 max-w-2xl mx-auto leading-relaxed">
                  Submit your hackathon project details below. Make sure all information is accurate and complete.
                </p>
                <p className="text-sm text-[#A0A0A0] mb-8">
                  Submissions close at exactly 1:00 PM today
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-[#0A0118]/90 to-[#1E0345]/70 backdrop-blur-xl rounded-3xl border border-[#A020F0]/20 p-8 md:p-12 shadow-2xl"
              >
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Team Information Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-[#A020F0]/20 flex items-center justify-center">
                        <Users className="w-4 h-4 text-[#A020F0]" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#F0F0F0]">Team Information</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-2"
                      >
                        <label className="text-sm font-medium text-[#CBC3E3] flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#A020F0]"></span>
                          Team Name *
                        </label>
                        <div className="relative">
                          <Input 
                            name="teamName" 
                            value={form.teamName} 
                            onChange={handleChange} 
                            required 
                            placeholder="Enter your team name"
                            className="bg-[#0A0118]/60 border-[#A020F0]/30 text-[#F0F0F0] placeholder:text-[#A0A0A0] focus:border-[#A020F0] focus:ring-[#A020F0]/20 h-12 rounded-xl transition-all duration-300 hover:border-[#A020F0]/50"
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#A020F0]/5 to-transparent pointer-events-none"></div>
                        </div>
                        <p className="text-xs text-[#A0A0A0]">2-120 characters</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="space-y-2"
                      >
                        <label className="text-sm font-medium text-[#CBC3E3] flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#A020F0]"></span>
                          Team Leader Name *
                        </label>
                        <div className="relative">
                          <Input 
                            name="teamLeaderName" 
                            value={form.teamLeaderName} 
                            onChange={handleChange} 
                            required 
                            placeholder="Enter team leader's full name"
                            className="bg-[#0A0118]/60 border-[#A020F0]/30 text-[#F0F0F0] placeholder:text-[#A0A0A0] focus:border-[#A020F0] focus:ring-[#A020F0]/20 h-12 rounded-xl transition-all duration-300 hover:border-[#A020F0]/50"
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#A020F0]/5 to-transparent pointer-events-none"></div>
                        </div>
                        <p className="text-xs text-[#A0A0A0]">2-120 characters</p>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Project Links Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-[#A020F0]/20 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-[#A020F0]" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#F0F0F0]">Project Links</h3>
                    </div>
                    
                    <div className="grid gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="space-y-2"
                      >
                        <label className="text-sm font-medium text-[#CBC3E3] flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#A020F0]"></span>
                          Deployed Project Link *
                        </label>
                        <div className="relative">
                          <Input 
                            name="projectUrl" 
                            type="url" 
                            value={form.projectUrl} 
                            onChange={handleChange} 
                            required 
                            placeholder="https://yourapp.com"
                            className="bg-[#0A0118]/60 border-[#A020F0]/30 text-[#F0F0F0] placeholder:text-[#A0A0A0] focus:border-[#A020F0] focus:ring-[#A020F0]/20 h-12 rounded-xl transition-all duration-300 hover:border-[#A020F0]/50"
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#A020F0]/5 to-transparent pointer-events-none"></div>
                        </div>
                        <p className="text-xs text-[#A0A0A0]">Must be a valid URL</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                        className="space-y-2"
                      >
                        <label className="text-sm font-medium text-[#CBC3E3] flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#A020F0]"></span>
                          GitHub Repository *
                        </label>
                        <div className="relative">
                          <Input 
                            name="githubUrl" 
                            type="url" 
                            value={form.githubUrl} 
                            onChange={handleChange} 
                            required 
                            placeholder="https://github.com/username/repo"
                            className="bg-[#0A0118]/60 border-[#A020F0]/30 text-[#F0F0F0] placeholder:text-[#A0A0A0] focus:border-[#A020F0] focus:ring-[#A020F0]/20 h-12 rounded-xl transition-all duration-300 hover:border-[#A020F0]/50"
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#A020F0]/5 to-transparent pointer-events-none"></div>
                        </div>
                        <p className="text-xs text-[#A0A0A0]">Must be a GitHub repository URL (e.g., https://github.com/user/repo)</p>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Project Description Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-[#A020F0]/20 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-[#A020F0]" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#F0F0F0]">Project Description</h3>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                      className="space-y-2"
                    >
                      <label className="text-sm font-medium text-[#CBC3E3] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#A020F0]"></span>
                        Project Summary *
                      </label>
                      <div className="relative">
                        <textarea
                          name="gist"
                          value={form.gist}
                          onChange={handleChange}
                          required
                          minLength={20}
                          maxLength={900}
                          className={cn(
                            "bg-[#0A0118]/60 border border-[#A020F0]/30 text-[#F0F0F0] placeholder:text-[#A0A0A0] focus:border-[#A020F0] focus:ring-[#A020F0]/20 w-full min-w-0 rounded-xl px-4 py-3 text-base shadow-xs transition-all duration-300 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 resize-none",
                            "focus-visible:border-[#A020F0] focus-visible:ring-[#A020F0]/20 focus-visible:ring-[3px] hover:border-[#A020F0]/50"
                          )}
                          rows={6}
                          placeholder="Describe your project in detail. What problem does it solve? What technologies did you use? What makes it unique?"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#A020F0]/5 to-transparent pointer-events-none"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-[#A0A0A0]">20-900 characters</p>
                        <p className="text-xs text-[#A0A0A0]">{form.gist.length}/900</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Error Display */}
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/10 border border-red-500/30 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-red-400 text-sm">!</span>
                        </div>
                        <p className="text-red-400 font-medium">{error}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                    className="flex justify-center pt-6"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative"
                    >
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-[#A020F0] to-[#6B46C1] hover:from-[#8B5CF6] hover:to-[#A020F0] text-[#0A0118] font-semibold px-12 py-4 rounded-xl shadow-2xl hover:shadow-[#A020F0]/25 transition-all duration-300 text-lg min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 border-2 border-[#0A0118]/30 border-t-[#0A0118] rounded-full animate-spin"></div>
                            Submitting...
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <span>Submit Project</span>
                            <motion.div
                              animate={{ x: [0, 4, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              →
                            </motion.div>
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>
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

              {/* Guidelines Section */}
              <GuidelinesSection />
            </motion.div>
          )}

          {showClosed && (
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


