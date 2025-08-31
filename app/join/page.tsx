"use client"
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const COLORS = {
  bgGradient: 'bg-gradient-to-br from-[#0A0118] to-[#1E0345]',
  glass: 'bg-[#1E0345]/80 backdrop-blur-lg border border-[#CBC3E3]/10',
  accent: 'text-[#A020F0]',
  neon: 'text-[#CBC3E3]',
  button: 'bg-[#A020F0] text-[#0A0118] border border-[#CBC3E3]/20',
  buttonAlt: 'border border-[#1E0345] bg-[#0A0118]/50 hover:border-[#CBC3E3] text-[#E0E0E0]',
  input: 'bg-[#0A0118]/60 border border-[#CBC3E3]/20 text-[#F0F0F0] placeholder-[#CBC3E3]/60',
  stepActive: 'bg-[#A020F0] text-[#F0F0F0] shadow-lg',
  stepInactive: 'bg-[#1E0345] text-[#CBC3E3]/60',
};

// Problem statements from Dawn of Code hackathon
const PROBLEM_STATEMENTS = [
  "AI-Powered Cyber Defense - Small organizations and startups often lack the resources to invest in advanced cybersecurity infrastructure, making them highly vulnerable to cyberattacks. The challenge is to design an affordable, AI-driven security framework that can detect, prevent, and respond to threats in real time — providing enterprise-level protection at a fraction of the cost.",
  "SafeSearch – Child-Safe Internet Experience - Children are exposed to illicit online content, cyberbullying, and harmful interactions while accessing the internet for education or entertainment. Parents cannot always monitor every activity, nor should privacy be compromised. The problem is to create a safe and controlled digital environment where children can freely explore educational and creative resources while being automatically shielded from inappropriate content and harmful interactions.",
  "Transparent Governance - Government welfare schemes and subsidies often suffer from inefficiencies, corruption, and diversion of funds by intermediaries. Citizens face difficulty in verifying whether benefits are reaching the intended recipients. The challenge is to leverage technology to enable transparent, accountable, and tamper-proof governance systems that ensure public funds are utilized effectively and reach the right beneficiaries without leakage.",
  "Transparent NGO Donations - Donors often lack visibility into how their contributions are being used by NGOs, which creates distrust and reduces funding for genuine initiatives. The problem is to develop a real-time donation tracking platform that uses technologies such as blockchain and IoT to provide end-to-end transparency — ensuring that every rupee/dollar donated can be traced to its final impact in areas like food distribution, education, or healthcare.",
  "Cloud Outage Resilience for Critical Services - Critical services such as banking, healthcare, and governance rely heavily on cloud infrastructure, but unexpected cloud outages can cause severe disruptions. Existing backup solutions are either too costly or insufficient. The challenge is to build a resilient, cost-effective system that ensures zero downtime for mission-critical applications by using multi-cloud failover, intelligent workload migration, and edge computing to maintain seamless continuity during outages."
];

const TeamOnboarding = () => {
  const [teamName, setTeamName] = useState('');
  const [teamLeaderName, setTeamLeaderName] = useState('');
  const [teamUtrId, setTeamUtrId] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [isProblemDropdownOpen, setIsProblemDropdownOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: '', registrationNumber: '' },
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  interface TeamMember {
    name: string;
    registrationNumber: string;
  }

  // Animated background particles
  useEffect(() => {
    const canvas = document.getElementById('signup-particles') as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId: number;
    
    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles: any[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      color: `rgba(${200 + Math.random() * 55},${195 + Math.random() * 60},${227 + Math.random() * 28},0.15)`
    }));
    
    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#A020F0';
        ctx.shadowBlur = 10;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handleAddMember = () => {
    if (teamMembers.length < 4) {
      setTeamMembers([...teamMembers, { name: '', registrationNumber: '' }]);
      setActiveStep(teamMembers.length + 1); // +1 to account for problem statement step
    }
  };

  const handleRemoveMember = (index: number) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers.splice(index, 1);
    setTeamMembers(newTeamMembers);
    setActiveStep(Math.min(activeStep, newTeamMembers.length + 1)); // +1 to account for problem statement step
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index][field as keyof TeamMember] = value;
    setTeamMembers(newTeamMembers);
  };

  const handleSelectProblemStatement = (statement: string) => {
    setProblemStatement(statement);
    setIsProblemDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate UTR ID
      if (teamUtrId.length !== 12 || !/^\d{12}$/.test(teamUtrId)) {
        throw new Error("Please enter a valid 12-digit UTR ID");
      }

      // Validate problem statement
      if (!problemStatement) {
        throw new Error("Please select a problem statement");
      }

      // Validate team members
      if (teamMembers.length < 1) {
        throw new Error("Please add at least one team member");
      }

      // Validate all member fields
      for (let i = 0; i < teamMembers.length; i++) {
        const member = teamMembers[i];
        if (!member.name || !member.registrationNumber) {
          throw new Error(`Please fill in all fields for Member ${i + 1}`);
        }
      }

      // Prepare data for database
      const teamData = {
        team_name: teamName,
        team_leader_name: teamLeaderName,
        member_utr_id: teamUtrId,
        problem_statement: problemStatement,
        member_name_1: teamMembers[0].name,
        member_registration_number_1: teamMembers[0].registrationNumber,
        member_name_2: teamMembers[1]?.name || null,
        member_registration_number_2: teamMembers[1]?.registrationNumber || null,
        member_name_3: teamMembers[2]?.name || null,
        member_registration_number_3: teamMembers[2]?.registrationNumber || null,
        member_name_4: teamMembers[3]?.name || null,
        member_registration_number_4: teamMembers[3]?.registrationNumber || null,
      };

      // Insert into database
      const { data, error: dbError } = await supabase
        .from('team_registrations')
        .insert([teamData])
        .select();

      if (dbError) {
        throw new Error(dbError.message);
      }

      // Show success
      setShowSummary(true);
      setTimeout(() => setIsSubmitted(true), 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { id: 0, name: 'Team Info', icon: '👥' },
    { id: 1, name: 'Problem Statement', icon: '🎯' },
    ...teamMembers.map((_, i) => ({ id: i + 2, name: `Member ${i + 1}`, icon: '🧑‍💻' }))
  ];

  return (
    <>
      <Head>
        <title>Team Onboarding - MERN Matrix Hackathon</title>
        <meta name="description" content="Onboard your team for the MERN Matrix Hackathon" />
      </Head>
      <div className={`relative min-h-screen overflow-hidden ${COLORS.bgGradient} font-sans text-[#F0F0F0]`}>
        {/* Animated Particle Background */}
        <canvas id="signup-particles" className="fixed inset-0 w-full h-full z-0 pointer-events-none" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }} />
        
        {/* Error message display */}
        {error && (
          <motion.div 
            className="fixed top-4 right-4 z-50 bg-red-600/90 text-white p-4 rounded-lg shadow-lg max-w-md border border-red-400/50"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <div className="flex justify-between items-center">
              <span>{error}</span>
              <button 
                onClick={() => setError(null)}
                className="ml-4 text-white hover:text-gray-200 text-lg"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}

        {/* Floating Back to Home Button */}
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.08, backgroundColor: '#CBC3E3', color: '#0A0118' }}
            className="fixed top-6 left-6 z-30 px-5 py-2 rounded-lg font-bold shadow-lg border border-[#CBC3E3]/30 bg-[#0A0118]/80 text-[#CBC3E3] hover:text-[#0A0118] hover:bg-[#CBC3E3] transition-all"
          >
            ← Home
          </motion.button>
        </Link>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="w-full max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className={`${COLORS.glass} rounded-2xl shadow-2xl overflow-hidden`}
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              {/* Header with gradient and neon glow */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#A020F0]/60 via-[#CBC3E3]/30 to-[#1E0345]/60 opacity-80 blur-lg animate-pulse" />
                <div className="relative z-10 py-8 px-8 text-center">
                  <motion.h2
                    className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#F0F0F0] drop-shadow-lg mb-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    MERN Matrix Hackathon
                  </motion.h2>
                  <motion.p
                    className="mt-2 text-xl text-[#CBC3E3] font-medium bg-clip-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#A020F0] to-[#CBC3E3] animate-text-glow">
                      Team Registration Portal
                    </span>
                  </motion.p>
                </div>
              </div>
              
              {/* Stepper */}
              <div className="px-8 pt-6 pb-2">
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#CBC3E3]/10 -translate-y-1/2 -z-10 rounded-full">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#A020F0] to-[#CBC3E3] rounded-full shadow-lg"
                      initial={{ width: '0%' }}
                      animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex flex-col items-center relative">
                      <motion.button
                        type="button"
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-2 transition-all shadow-md ${activeStep >= index ? COLORS.stepActive : COLORS.stepInactive}`}
                        onClick={() => setActiveStep(index)}
                        whileHover={{ scale: 1.13, boxShadow: '0 0 16px #A020F0' }}
                        whileTap={{ scale: 0.97 }}
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        style={{ borderColor: activeStep >= index ? '#A020F0' : '#CBC3E3' }}
                      >
                        <span className="drop-shadow-glow">{step.icon}</span>
                      </motion.button>
                      <AnimatePresence>
                        {hoveredIndex === index && (
                          <motion.span
                            className="absolute top-full mt-2 text-xs font-medium text-[#CBC3E3] bg-[#0A0118]/80 px-2 py-1 rounded shadow-lg border border-[#CBC3E3]/20"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                          >
                            {step.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-8">
                <AnimatePresence mode="wait">
                  {!isSubmitted && !showSummary ? (
                    <motion.form
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Team Info Section */}
                      {activeStep === 0 && (
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="mb-6">
                            <label htmlFor="teamName" className="block text-sm font-medium text-[#CBC3E3] mb-2">
                              Team Name
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="teamName"
                                className={`w-full ${COLORS.input} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A020F0] focus:border-transparent transition-all`}
                                placeholder="Enter your team name"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                required
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="h-5 w-5 text-[#A020F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="mb-6">
                            <label htmlFor="teamLeaderName" className="block text-sm font-medium text-[#CBC3E3] mb-2">
                              Team Leader
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="teamLeaderName"
                                className={`w-full ${COLORS.input} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A020F0] focus:border-transparent transition-all`}
                                placeholder="Enter team leader name"
                                value={teamLeaderName}
                                onChange={(e) => setTeamLeaderName(e.target.value)}
                                required
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="h-5 w-5 text-[#A020F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="mb-6">
                            <label htmlFor="teamUtrId" className="block text-sm font-medium text-[#CBC3E3] mb-2">
                              Transaction UTR ID <span className="text-[#A020F0]">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="teamUtrId"
                                className={`w-full ${COLORS.input} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A020F0] focus:border-transparent transition-all`}
                                placeholder="Enter 12-digit UTR ID"
                                value={teamUtrId}
                                onChange={(e) => setTeamUtrId(e.target.value)}
                                maxLength={12}
                                pattern="[0-9]{12}"
                                required
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="h-5 w-5 text-[#A020F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                            </div>
                            <p className="text-xs text-[#CBC3E3]/70 mt-1">UTR ID must be exactly 12 digits</p>
                          </div>
                          <div className="flex justify-end">
                            <motion.button
                              type="button"
                              className={`flex items-center justify-center px-6 py-2 ${COLORS.button} rounded-xl font-medium hover:shadow-lg hover:bg-[#CBC3E3] hover:text-[#0A0118] transition-all`}
                              onClick={() => {
                                // Validate required fields before proceeding
                                if (!teamName || !teamLeaderName || !teamUtrId) {
                                  setError("Please fill in all required fields");
                                  return;
                                }
                                
                                // Validate UTR ID before proceeding
                                if (teamUtrId.length !== 12 || !/^\d{12}$/.test(teamUtrId)) {
                                  setError("Please enter a valid 12-digit UTR ID");
                                  return;
                                }
                                
                                setActiveStep(1);
                              }}
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Next: Problem Statement
                              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Problem Statement Section */}
                      {activeStep === 1 && (
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="mb-6">
                            <label className="block text-sm font-medium text-[#CBC3E3] mb-2">
                              Problem Statement <span className="text-[#A020F0]">*</span>
                            </label>
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setIsProblemDropdownOpen(!isProblemDropdownOpen)}
                                className={`w-full ${COLORS.input} rounded-xl py-3 px-4 text-left flex justify-between items-center cursor-pointer transition-all ${isProblemDropdownOpen ? 'ring-2 ring-[#A020F0]' : ''}`}
                              >
                                <span className={problemStatement ? "text-[#F0F0F0]" : "text-[#CBC3E3]/60"}>
                                  {problemStatement || "Select a problem statement"}
                                </span>
                                <svg 
                                  className={`w-5 h-5 text-[#A020F0] transition-transform ${isProblemDropdownOpen ? 'rotate-180' : ''}`}
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                              
                              {isProblemDropdownOpen && (
                                <div className="absolute z-10 w-full mt-1 bg-[#1E0345] border border-[#CBC3E3]/20 rounded-xl shadow-lg overflow-hidden max-h-48 overflow-y-auto">
                                  {PROBLEM_STATEMENTS.map((statement, index) => (
                                    <div
                                      key={index}
                                      onClick={() => handleSelectProblemStatement(statement)}
                                      className="px-4 py-3 hover:bg-[#A020F0]/20 cursor-pointer transition-colors duration-200 border-b border-[#CBC3E3]/10 last:border-b-0"
                                    >
                                      <p className="text-[#F0F0F0] text-sm leading-relaxed">{statement}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-[#CBC3E3]/70 mt-1">Choose the problem your team will solve</p>
                          </div>
                          <div className="flex justify-between">
                            <motion.button
                              type="button"
                              className="flex items-center justify-center px-6 py-2 bg-[#1E0345] text-[#CBC3E3] rounded-xl font-medium hover:bg-[#A020F0]/80 hover:text-[#F0F0F0] transition-colors border border-[#CBC3E3]/20"
                              onClick={() => setActiveStep(0)}
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                              Back
                            </motion.button>
                            <motion.button
                              type="button"
                              className={`flex items-center justify-center px-6 py-2 ${COLORS.button} rounded-xl font-medium hover:shadow-lg hover:bg-[#CBC3E3] hover:text-[#0A0118] transition-all`}
                              onClick={() => {
                                if (!problemStatement) {
                                  setError("Please select a problem statement");
                                  return;
                                }
                                setActiveStep(2);
                              }}
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Next: Add Members
                              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Team Members Sections */}
                      {activeStep >= 2 && activeStep <= teamMembers.length + 1 && (
                        <motion.div
                          key={`member-${activeStep}`}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="mb-6">
                            <h3 className="text-xl font-semibold text-[#CBC3E3] mb-4 flex items-center">
                              <span className="bg-[#A020F0]/30 text-[#A020F0] rounded-full w-8 h-8 flex items-center justify-center mr-2">
                                {activeStep - 1}
                              </span>
                              Team Member {activeStep - 1}
                            </h3>
                            <div className="space-y-4">
                              <div>
                                <label htmlFor={`memberName-${activeStep-2}`} className="block text-sm font-medium text-[#CBC3E3] mb-2">
                                  Full Name
                                </label>
                                <input
                                  type="text"
                                  id={`memberName-${activeStep-2}`}
                                  className={`w-full ${COLORS.input} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A020F0] focus:border-transparent transition-all`}
                                  placeholder="Enter member's full name"
                                  value={teamMembers[activeStep-2].name}
                                  onChange={(e) => handleMemberChange(activeStep-2, 'name', e.target.value)}
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor={`registrationNumber-${activeStep-2}`} className="block text-sm font-medium text-[#CBC3E3] mb-2">
                                  Registration Number
                                </label>
                                <input
                                  type="text"
                                  id={`registrationNumber-${activeStep-2}`}
                                  className={`w-full ${COLORS.input} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A020F0] focus:border-transparent transition-all`}
                                  placeholder="Enter registration number"
                                  value={teamMembers[activeStep-2].registrationNumber}
                                  onChange={(e) => handleMemberChange(activeStep-2, 'registrationNumber', e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <motion.button
                              type="button"
                              className="flex items-center justify-center px-6 py-2 bg-[#1E0345] text-[#CBC3E3] rounded-xl font-medium hover:bg-[#A020F0]/80 hover:text-[#F0F0F0] transition-colors border border-[#CBC3E3]/20"
                              onClick={() => setActiveStep(activeStep - 1)}
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                              Back
                            </motion.button>
                            <div className="flex space-x-3">
                              {teamMembers.length > 1 && (
                                <motion.button
                                  type="button"
                                  className="flex items-center justify-center px-6 py-2 bg-red-600/90 text-white rounded-xl font-medium hover:bg-red-500 transition-colors"
                                  onClick={() => handleRemoveMember(activeStep-2)}
                                  whileHover={{ scale: 1.04 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  Remove
                                </motion.button>
                              )}
                              {activeStep < teamMembers.length + 1 ? (
                                <motion.button
                                  type="button"
                                  className={`flex items-center justify-center px-6 py-2 ${COLORS.button} rounded-xl font-medium hover:shadow-lg hover:bg-[#CBC3E3] hover:text-[#0A0118] transition-all`}
                                  onClick={() => {
                                    // Validate current member before proceeding
                                    const currentMember = teamMembers[activeStep-2];
                                    if (!currentMember.name || !currentMember.registrationNumber) {
                                      setError(`Please fill in all fields for Member ${activeStep - 1}`);
                                      return;
                                    }
                                    setActiveStep(activeStep + 1);
                                  }}
                                  whileHover={{ scale: 1.04 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  Next Member
                                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </motion.button>
                              ) : (
                                teamMembers.length < 4 && (
                                  <motion.button
                                    type="button"
                                    className="flex items-center justify-center px-6 py-2 bg-green-600/90 text-white rounded-xl font-medium hover:bg-green-500 transition-colors"
                                    onClick={handleAddMember}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add Member
                                  </motion.button>
                                )
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Submit Button (shown on last step) */}
                      {activeStep > 0 && activeStep === teamMembers.length + 1 && (
                        <motion.div
                          className="mt-8 pt-6 border-t border-[#CBC3E3]/10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <motion.button
                            type="submit"
                            className="w-full py-4 px-6 bg-gradient-to-r from-[#A020F0] to-[#CBC3E3] text-[#0A0118] font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center shadow-lg border border-[#CBC3E3]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: isLoading ? 1 : 1.01 }}
                            whileTap={{ scale: isLoading ? 1 : 0.99 }}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0A0118]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </>
                            ) : (
                              <>
                                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Complete Registration
                              </>
                            )}
                          </motion.button>
                        </motion.div>
                      )}
                    </motion.form>
                  ) : showSummary && !isSubmitted ? (
                    <motion.div
                      className="text-center py-12"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 100 }}
                    >
                      <motion.div
                        className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-r from-[#A020F0] to-[#CBC3E3] mb-6 animate-spin-slow shadow-2xl"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, type: 'spring' }}
                      >
                        <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <h2 className="text-3xl font-bold text-[#CBC3E3] mb-4 animate-pulse">Finalizing Registration...</h2>
                      <p className="text-lg text-[#F0F0F0]">Hang tight while we process your team details!</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="text-center py-12"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 100 }}
                    >
                      <motion.div
                        className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-6 shadow-2xl animate-bounce"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, type: 'spring' }}
                      >
                        <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <h2 className="text-3xl font-bold text-[#A020F0] mb-4 animate-glow">Registration Successful!</h2>
                      <p className="text-xl text-[#CBC3E3] mb-8">Your team <span className="font-semibold text-[#A020F0]">{teamName}</span> has been registered for the MERN Matrix Hackathon.</p>
                      <div className="bg-[#1E0345]/80 rounded-xl p-6 mb-8 border border-[#CBC3E3]/10 shadow-lg">
                        <h4 className="text-lg font-semibold text-[#CBC3E3] mb-3">Team Details</h4>
                        <ul className="space-y-2 text-left text-[#F0F0F0]">
                          <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="font-medium">Leader:</span> {teamLeaderName}
                          </li>
                          <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="font-medium">Members:</span> {teamMembers.length}
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <div>
                              <span className="font-medium">Problem Statement:</span>
                              <p className="text-[#CBC3E3] text-sm mt-1">{problemStatement}</p>
                            </div>
                          </li>
                        </ul>
                        <div className="mt-4">
                          <h5 className="text-md font-semibold text-[#A020F0] mb-2">Members:</h5>
                          <ul className="space-y-1">
                            {teamMembers.map((m, i) => (
                              <li key={i} className="flex items-center gap-2 text-[#CBC3E3]">
                                <span className="bg-[#A020F0]/20 px-2 py-1 rounded text-xs font-bold">{i + 1}</span>
                                <span>{m.name}</span>
                                <span className="text-xs text-[#A020F0]">({m.registrationNumber})</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-4 pt-4 border-t border-[#CBC3E3]/10">
                          <div className="flex items-center gap-2 text-[#CBC3E3]">
                            <svg className="h-5 w-5 text-[#A020F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium">Team UTR ID:</span>
                            <span className="text-[#A020F0] font-mono">{teamUtrId}</span>
                          </div>
                        </div>
                      </div>
                      <Link href="/">
                        <motion.button
                          whileHover={{ scale: 1.08, backgroundColor: '#CBC3E3', color: '#0A0118' }}
                          className="px-8 py-3 rounded-lg font-bold shadow-lg border border-[#CBC3E3]/30 bg-[#A020F0] text-[#F0F0F0] hover:text-[#0A0118] hover:bg-[#CBC3E3] transition-all"
                        >
                          Back to Home
                        </motion.button>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <style jsx global>{`
        .animate-text-glow {
          text-shadow: 0 0 8px #A020F0, 0 0 16px #CBC3E3;
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 6px #A020F0);
        }
        .animate-glow {
          animation: glow 1.5s infinite alternate;
        }
        @keyframes glow {
          from { text-shadow: 0 0 8px #A020F0, 0 0 16px #CBC3E3; }
          to { text-shadow: 0 0 24px #A020F0, 0 0 32px #CBC3E3; }
        }
        .animate-spin-slow {
          animation: spin 2.5s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default TeamOnboarding;