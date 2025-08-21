"use client"
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import Link from 'next/link';

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

const TeamOnboarding = () => {
  const [teamName, setTeamName] = useState('');
  const [teamLeaderName, setTeamLeaderName] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: '', registrationNumber: '', utrId: '' },
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  interface TeamMember {
    name: string;
    registrationNumber: string;
    utrId: string;
  }

  // Animated background particles
  useEffect(() => {
    const canvas = document.getElementById('signup-particles') as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId: number;
    const particles: any[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      color: `rgba(${200 + Math.random() * 55},${195 + Math.random() * 60},${227 + Math.random() * 28},0.15)`
    }));
    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#A020F0';
        ctx.shadowBlur = 10;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > window.innerWidth) p.dx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.dy *= -1;
      });
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleAddMember = () => {
    setTeamMembers([...teamMembers, { name: '', registrationNumber: '', utrId: '' }]);
    setActiveStep(teamMembers.length);
  };

  const handleRemoveMember = (index: number) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers.splice(index, 1);
    setTeamMembers(newTeamMembers);
    setActiveStep(Math.min(activeStep, newTeamMembers.length - 1));
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index][field as keyof TeamMember] = value;
    setTeamMembers(newTeamMembers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise(resolve => setTimeout(resolve, 1200));
    setShowSummary(true);
    setTimeout(() => setIsSubmitted(true), 1200);
  };

  const steps = [
    { id: 0, name: 'Team Info', icon: '👥' },
    ...teamMembers.map((_, i) => ({ id: i + 1, name: `Member ${i + 1}`, icon: '🧑‍💻' }))
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
                          <div className="flex justify-end">
                            <motion.button
                              type="button"
                              className={`flex items-center justify-center px-6 py-2 ${COLORS.button} rounded-xl font-medium hover:shadow-lg hover:bg-[#CBC3E3] hover:text-[#0A0118] transition-all`}
                              onClick={() => setActiveStep(1)}
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
                      {activeStep > 0 && activeStep <= teamMembers.length && (
                        <motion.div
                          key={`member-${activeStep}`}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="mb-6">
                            <h3 className="text-xl font-semibold text-[#CBC3E3] mb-4 flex items-center">
                              <span className="bg-[#A020F0]/30 text-[#A020F0] rounded-full w-8 h-8 flex items-center justify-center mr-2">
                                {activeStep}
                              </span>
                              Team Member {activeStep}
                            </h3>
                            <div className="space-y-4">
                              <div>
                                <label htmlFor={`memberName-${activeStep-1}`} className="block text-sm font-medium text-[#CBC3E3] mb-2">
                                  Full Name
                                </label>
                                <input
                                  type="text"
                                  id={`memberName-${activeStep-1}`}
                                  className={`w-full ${COLORS.input} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A020F0] focus:border-transparent transition-all`}
                                  placeholder="Enter member's full name"
                                  value={teamMembers[activeStep-1].name}
                                  onChange={(e) => handleMemberChange(activeStep-1, 'name', e.target.value)}
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor={`registrationNumber-${activeStep-1}`} className="block text-sm font-medium text-[#CBC3E3] mb-2">
                                  Registration Number
                                </label>
                                <input
                                  type="text"
                                  id={`registrationNumber-${activeStep-1}`}
                                  className={`w-full ${COLORS.input} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A020F0] focus:border-transparent transition-all`}
                                  placeholder="Enter registration number"
                                  value={teamMembers[activeStep-1].registrationNumber}
                                  onChange={(e) => handleMemberChange(activeStep-1, 'registrationNumber', e.target.value)}
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor={`utrId-${activeStep-1}`} className="block text-sm font-medium text-[#CBC3E3] mb-2">
                                  Transaction UTR ID
                                </label>
                                <input
                                  type="text"
                                  id={`utrId-${activeStep-1}`}
                                  className={`w-full ${COLORS.input} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A020F0] focus:border-transparent transition-all`}
                                  placeholder="Enter UTR ID"
                                  value={teamMembers[activeStep-1].utrId}
                                  onChange={(e) => handleMemberChange(activeStep-1, 'utrId', e.target.value)}
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
                                  onClick={() => handleRemoveMember(activeStep-1)}
                                  whileHover={{ scale: 1.04 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  Remove
                                </motion.button>
                              )}
                              {activeStep < teamMembers.length ? (
                                <motion.button
                                  type="button"
                                  className={`flex items-center justify-center px-6 py-2 ${COLORS.button} rounded-xl font-medium hover:shadow-lg hover:bg-[#CBC3E3] hover:text-[#0A0118] transition-all`}
                                  onClick={() => setActiveStep(activeStep + 1)}
                                  whileHover={{ scale: 1.04 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  Next Member
                                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </motion.button>
                              ) : (
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
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                      {/* Submit Button (shown on last step) */}
                      {activeStep > 0 && activeStep === teamMembers.length && (
                        <motion.div
                          className="mt-8 pt-6 border-t border-[#CBC3E3]/10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <motion.button
                            type="submit"
                            className="w-full py-4 px-6 bg-gradient-to-r from-[#A020F0] to-[#CBC3E3] text-[#0A0118] font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center shadow-lg border border-[#CBC3E3]/20"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Complete Registration
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
                        </ul>
                        <div className="mt-4">
                          <h5 className="text-md font-semibold text-[#A020F0] mb-2">Members:</h5>
                          <ul className="space-y-1">
                            {teamMembers.map((m, i) => (
                              <li key={i} className="flex items-center gap-2 text-[#CBC3E3]">
                                <span className="bg-[#A020F0]/20 px-2 py-1 rounded text-xs font-bold">{i + 1}</span>
                                <span>{m.name}</span>
                                <span className="text-xs text-[#A020F0]">({m.registrationNumber})</span>
                                <span className="text-xs text-[#CBC3E3]/70">UTR: {m.utrId}</span>
                              </li>
                            ))}
                          </ul>
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