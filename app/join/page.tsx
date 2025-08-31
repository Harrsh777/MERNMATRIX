"use client"
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import CountdownClock from '../components/CountdownClock';

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
  {
    id: 1,
    domain: "Cybersecurity & Privacy",
    title: "Cyber Resilience & Digital Safety",
    description: "Small businesses, children, and everyday users all face cyber threats but lack strong defenses. How can we design affordable, practical, and user-friendly solutions that protect individuals and organizations from online risks while giving them more control over their data and privacy?",
    icon: "🛡️"
  },
  {
    id: 2,
    domain: "Cybersecurity & Privacy",
    title: "Truth & Trust in the Digital Age",
    description: "From deepfakes to AI manipulation, it's becoming harder to know what's real online. How can we verify authenticity, fight misinformation, and secure AI systems against malicious manipulation to build a safer digital world?",
    icon: "🔍"
  },
  {
    id: 3,
    domain: "Cybersecurity & Privacy",
    title: "Privacy as a Right",
    description: "People's data is constantly collected, often without their knowledge or consent. How can we give individuals control over their personal information, enable fair data usage, and generate privacy-preserving alternatives for developers and researchers?",
    icon: "🔒"
  },
  {
    id: 4,
    domain: "Governance & FinTech",
    title: "Transparent & Accountable Systems",
    description: "Corruption and lack of clarity make it hard to trust public services, donations, and digital finance. How can we design transparent systems for welfare, NGOs, and finance that ensure funds reach the right people and help users make informed, safer financial decisions?",
    icon: "💎"
  },
  {
    id: 5,
    domain: "Developer Tools & Cloud Infrastructure",
    title: "Reliable & Resilient Digital Services",
    description: "Downtime, outages, and hidden cloud costs disrupt critical applications. How can we create resilient systems that stay online during failures, simplify cloud management, detect unusual spending, and make infrastructure more accessible to developers?",
    icon: "☁️"
  },
  {
    id: 6,
    domain: "Developer Tools & Cloud Infrastructure",
    title: "Fair & Collaborative AI Development",
    description: "AI is powerful but often a black box — hard to explain, sometimes biased, and tricky to work with in teams. How can we make AI more explainable and fair, while building better collaboration tools for developers working with models, prompts, and APIs?",
    icon: "🤖"
  },
  {
    id: 7,
    domain: "Healthcare & MedTech",
    title: "Privacy-Friendly Healthcare Innovation",
    description: "Medical research needs patient participation and data, but privacy is a big concern. How can we connect patients with research opportunities and enable hospitals to collaborate without exposing sensitive personal data?",
    icon: "🏥"
  },
  {
    id: 8,
    domain: "Education & Collaboration",
    title: "Smarter Knowledge Sharing",
    description: "Students, researchers, and teams juggle articles, notes, and references across tools. How can we create unified platforms where knowledge can be collected, shared, annotated, and built upon collaboratively?",
    icon: "📚"
  },
  {
    id: 9,
    domain: "Sustainability & Smart Living",
    title: "Sustainable Technology & the Right to Repair",
    description: "E-waste is rising as devices are thrown away instead of reused. How can we empower people to repair, recycle, and extend the life of electronics to reduce waste and promote sustainability?",
    icon: "♻️"
  },
  {
    id: 10,
    domain: "Sustainability & Smart Living",
    title: "Smarter Farming & Cities",
    description: "Farmers and cities face resource challenges — from irrigation inefficiencies to waste collection. How can we design simple, data-driven tools that help farmers increase yields and cities manage waste more effectively?",
    icon: "🌱"
  }
];

// Available domains for selection
const DOMAINS = [
  "Cybersecurity & Privacy",
  "Governance & FinTech", 
  "Developer Tools & Cloud Infrastructure",
  "Healthcare & MedTech",
  "Education & Collaboration",
  "Sustainability & Smart Living"
];

// Available sessions
const SESSIONS = [
  { id: 1, time: "2:00 PM – 3:30 PM", label: "Session 1" },
  { id: 2, time: "3:45 PM – 5:15 PM", label: "Session 2" }
];

const TeamOnboarding = () => {
  const [teamName, setTeamName] = useState('');
  const [teamLeaderName, setTeamLeaderName] = useState('');
  const [teamLeaderMobile, setTeamLeaderMobile] = useState('');
  const [teamLeaderEmail, setTeamLeaderEmail] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [selectedProblem, setSelectedProblem] = useState<any>(null);
  const [isProblemDropdownOpen, setIsProblemDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: '', registrationNumber: '' },
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);

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

  const handleSelectProblemStatement = (problem: any) => {
    setProblemStatement(problem.description);
    setSelectedProblem(problem);
    setIsProblemDropdownOpen(false);
  };

  const handleSelectDomain = (domain: string) => {
    setSelectedDomain(domain);
    setIsDomainDropdownOpen(false);
  };

  const handleSelectSession = (id: number) => {
    setSelectedSession(id);
    setIsSessionDropdownOpen(false);
  };

  const [isDomainDropdownOpen, setIsDomainDropdownOpen] = useState(false);
  const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false);
  const [participantType, setParticipantType] = useState<'VIT' | 'External'>('VIT');
  const [selectedSession, setSelectedSession] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate problem statement
      if (!selectedProblem) {
        throw new Error("Please select a problem statement");
      }

      // Validate domain
      if (!selectedDomain) {
        throw new Error("Please select a domain");
      }

      // Validate session
      if (!selectedSession) {
        throw new Error("Please select a session");
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
        participant_type: participantType,
        team_name: teamName,
        team_leader_name: teamLeaderName,
        team_leader_mobile: teamLeaderMobile,
        team_leader_email: teamLeaderEmail,
        selected_domain: selectedDomain,
        problem_statement: selectedProblem.description,
        selected_session: selectedSession,
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
    { id: 0, name: 'Participant Type', icon: '👤' },
    { id: 1, name: 'Team Info', icon: '👥' },
    { id: 2, name: 'Domain & Problem', icon: '🎯' },
    { id: 3, name: 'Session', icon: '⏰' },
    ...teamMembers.map((_, i) => ({ id: i + 4, name: `Member ${i + 1}`, icon: '🧑‍💻' }))
  ];

  // Check if it's time to show registration (after 9:00 AM tomorrow)
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(9, 0, 0, 0);
      
      if (now >= tomorrow) {
        setShowRegistration(true);
      }
    };
    
    checkTime();
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Show countdown if registration is not yet available
  if (!showRegistration) {
    return (
      <CountdownClock onTimeUp={() => setShowRegistration(true)} />
    );
  }

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
                      {/* Participant Type Section */}
                      {activeStep === 0 && (
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="mb-6">
                            <label className="block text-sm font-medium text-[#CBC3E3] mb-4">
                              Select whether you are a VIT Participant or an External Participant
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <label className="flex items-center p-4 border-2 border-[#CBC3E3]/20 rounded-xl cursor-pointer transition-all hover:border-[#A020F0]/40 hover:bg-[#A020F0]/10">
                                <input
                                  type="radio"
                                  name="participantType"
                                  value="VIT"
                                  checked={participantType === 'VIT'}
                                  onChange={() => setParticipantType('VIT')}
                                  className="mr-3 w-5 h-5 text-[#A020F0] focus:ring-[#A020F0]"
                                />
                                <div>
                                  <div className="font-semibold text-[#F0F0F0]">VIT Student</div>
                                  <div className="text-sm text-[#CBC3E3]/70">Currently enrolled at VIT</div>
                                </div>
                              </label>
                              <label className="flex items-center p-4 border-2 border-[#CBC3E3]/20 rounded-xl cursor-pointer transition-all hover:border-[#A020F0]/40 hover:bg-[#A020F0]/10">
                                <input
                                  type="radio"
                                  name="participantType"
                                  value="External"
                                  checked={participantType === 'External'}
                                  onChange={() => setParticipantType('External')}
                                  className="mr-3 w-5 h-5 text-[#A020F0] focus:ring-[#A020F0]"
                                />
                                <div>
                                  <div className="font-semibold text-[#F0F0F0]">External Participant</div>
                                  <div className="text-sm text-[#CBC3E3]/70">From other institutions</div>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <motion.button
                              type="button"
                              className={`flex items-center justify-center px-6 py-3 ${COLORS.button} rounded-xl font-medium hover:shadow-lg hover:bg-[#CBC3E3] hover:text-[#0A0118] transition-all`}
                              onClick={() => setActiveStep(1)}
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Next: Team Info
                              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Team Info Section */}
                      {activeStep === 1 && (
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="mb-6">
                            <label htmlFor="teamName" className="block text-sm font-medium text-[#CBC3E3] mb-2">
                              Team Name <span className="text-[#A020F0]">*</span>
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
                              Team Leader Name <span className="text-[#A020F0]">*</span>
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
                            <label htmlFor="teamLeaderMobile" className="block text-sm font-medium text-[#CBC3E3] mb-2">
                              Team Leader Mobile Number <span className="text-[#A020F0]">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type="tel"
                                id="teamLeaderMobile"
                                className={`w-full ${COLORS.input} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A020F0] focus:border-transparent transition-all`}
                                placeholder="Enter team leader mobile number"
                                value={teamLeaderMobile}
                                onChange={(e) => setTeamLeaderMobile(e.target.value)}
                                required
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="h-5 w-5 text-[#A020F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="mb-6">
                            <label htmlFor="teamLeaderEmail" className="block text-sm font-medium text-[#CBC3E3] mb-2">
                              Team Leader Email ID <span className="text-[#A020F0]">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                id="teamLeaderEmail"
                                className={`w-full ${COLORS.input} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A020F0] focus:border-transparent transition-all`}
                                placeholder="Enter team leader email"
                                value={teamLeaderEmail}
                                onChange={(e) => setTeamLeaderEmail(e.target.value)}
                                required
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="h-5 w-5 text-[#A020F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <motion.button
                              type="button"
                              className={`flex items-center justify-center px-6 py-3 ${COLORS.button} rounded-xl font-medium hover:shadow-lg hover:bg-[#CBC3E3] hover:text-[#0A0118] transition-all`}
                              onClick={() => {
                                if (!teamName || !teamLeaderName || !teamLeaderMobile || !teamLeaderEmail) {
                                  setError("Please fill in all required fields");
                                  return;
                                }
                                setActiveStep(2);
                              }}
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Next: Domain & Problem
                              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Domain & Problem Section */}
                      {activeStep === 2 && (
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="mb-6">
                            <label htmlFor="selectedDomain" className="block text-sm font-medium text-[#CBC3E3] mb-2">
                              Select your Domain <span className="text-[#A020F0]">*</span>
                            </label>
                            <div className="relative">
                              <select
                                id="selectedDomain"
                                className={`w-full ${COLORS.input} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A020F0] focus:border-transparent transition-all`}
                                value={selectedDomain}
                                onChange={(e) => setSelectedDomain(e.target.value)}
                                required
                              >
                                <option value="">Choose a domain</option>
                                {DOMAINS.map((domain) => (
                                  <option key={domain} value={domain}>
                                    {domain}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="h-5 w-5 text-[#A020F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="mb-6">
                            <label className="block text-sm font-medium text-[#CBC3E3] mb-2">
                              Select a Problem Statement <span className="text-[#A020F0]">*</span>
                            </label>
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setIsProblemDropdownOpen(!isProblemDropdownOpen)}
                                className={`w-full ${COLORS.input} rounded-xl py-3 px-4 text-left flex justify-between items-center cursor-pointer transition-all ${isProblemDropdownOpen ? 'ring-2 ring-[#A020F0]' : ''}`}
                              >
                                <span className={selectedProblem ? "text-[#F0F0F0]" : "text-[#CBC3E3]/60"}>
                                  {selectedProblem ? (
                                    <div className="flex items-center gap-2">
                                      <span className="text-lg">{selectedProblem.icon}</span>
                                      <span className="truncate">{selectedProblem.title}</span>
                                    </div>
                                  ) : "Select a problem statement"}
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
                                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                                  <motion.div 
                                    className="w-[95vw] max-w-6xl h-[90vh] bg-[#1E0345] border border-[#CBC3E3]/20 rounded-2xl shadow-2xl overflow-hidden"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    {/* Modal Header */}
                                    <div className="flex items-center justify-between p-6 border-b border-[#CBC3E3]/20 bg-[#0A0118]/60">
                                      <h3 className="text-2xl font-bold text-[#F0F0F0]">Select Problem Statement</h3>
                                      <button
                                        onClick={() => setIsProblemDropdownOpen(false)}
                                        className="p-3 hover:bg-[#A020F0]/20 rounded-lg transition-colors"
                                      >
                                        <svg className="w-7 h-7 text-[#CBC3E3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                      </button>
                                    </div>

                                    {/* Search Section */}
                                    <div className="p-6 border-b border-[#CBC3E3]/20 bg-[#1E0345]">
                                      <div className="relative">
                                        <input
                                          type="text"
                                          placeholder="Search problem statements..."
                                          value={searchQuery}
                                          onChange={(e) => setSearchQuery(e.target.value)}
                                          className="w-full px-5 py-4 bg-[#0A0118]/60 border border-[#CBC3E3]/20 rounded-xl text-[#F0F0F0] placeholder-[#CBC3E3]/60 focus:outline-none focus:ring-2 focus:ring-[#A020F0] focus:border-transparent text-lg"
                                        />
                                        {searchQuery ? (
                                          <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#CBC3E3]/60 hover:text-[#A020F0] transition-colors"
                                          >
                                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                          </button>
                                        ) : (
                                          <svg className="absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#CBC3E3]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                          </svg>
                                        )}
                                      </div>
                                    </div>
                                    
                                    {/* Problem Statements List */}
                                    <div className="overflow-y-auto h-[calc(90vh-280px)] p-4">
                                      {PROBLEM_STATEMENTS
                                        .filter(problem => 
                                          problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                          problem.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                          problem.description.toLowerCase().includes(searchQuery.toLowerCase())
                                        )
                                        .map((problem) => (
                                          <motion.div
                                            key={problem.id}
                                            onClick={() => handleSelectProblemStatement(problem)}
                                            className="px-6 py-5 hover:bg-[#A020F0]/20 cursor-pointer transition-all duration-200 border-b border-[#CBC3E3]/10 last:border-b-0 group rounded-lg mx-2 mb-3"
                                            whileHover={{ x: 5, backgroundColor: 'rgba(160, 32, 240, 0.15)' }}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2 }}
                                          >
                                            <div className="flex items-start gap-5">
                                              <div className="text-4xl group-hover:scale-110 transition-transform duration-200">
                                                {problem.icon}
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-4 mb-3">
                                                  <h4 className="font-bold text-[#F0F0F0] text-lg group-hover:text-[#A020F0] transition-colors">
                                                    {problem.title}
                                                  </h4>
                                                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-[#A020F0]/20 text-[#A020F0] border border-[#A020F0]/30">
                                                    {problem.domain}
                                                  </span>
                                                </div>
                                                <p className="text-base text-[#CBC3E3]/80 mb-3 leading-relaxed">
                                                  {problem.description}
                                                </p>
                                              </div>
                                            </div>
                                          </motion.div>
                                        ))}
                                      
                                      {/* No results message */}
                                      {PROBLEM_STATEMENTS.filter(problem => 
                                        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        problem.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        problem.description.toLowerCase().includes(searchQuery.toLowerCase())
                                      ).length === 0 && searchQuery && (
                                        <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          className="px-6 py-16 text-center text-[#CBC3E3]/60"
                                        >
                                          <div className="text-6xl mb-4">🔍</div>
                                          <p className="text-xl mb-3">No problem statements found matching "{searchQuery}"</p>
                                          <p className="text-base">Try different keywords or browse all problems</p>
                                        </motion.div>
                                      )}
                                    </div>

                                    {/* Modal Footer */}
                                    <div className="p-6 border-t border-[#CBC3E3]/20 bg-[#0A0118]/60">
                                      <div className="flex justify-between items-center">
                                        <p className="text-base text-[#CBC3E3]/70">
                                          {PROBLEM_STATEMENTS.filter(problem => 
                                            problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            problem.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            problem.description.toLowerCase().includes(searchQuery.toLowerCase())
                                          ).length} problem statements available
                                        </p>
                                        <button
                                          onClick={() => setIsProblemDropdownOpen(false)}
                                          className="px-8 py-3 bg-[#1E0345] text-[#CBC3E3] rounded-lg font-medium hover:bg-[#A020F0]/80 hover:text-[#F0F0F0] transition-colors border border-[#CBC3E3]/20"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  </motion.div>
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-[#CBC3E3]/70 mt-1">Choose the problem your team will solve</p>
                          </div>
                          <div className="flex justify-between">
                            <motion.button
                              type="button"
                              className="flex items-center justify-center px-6 py-3 bg-[#1E0345] text-[#CBC3E3] rounded-xl font-medium hover:bg-[#A020F0]/80 hover:text-[#F0F0F0] transition-colors border border-[#CBC3E3]/20"
                              onClick={() => setActiveStep(1)}
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
                              className={`flex items-center justify-center px-6 py-3 ${COLORS.button} rounded-xl font-medium hover:shadow-lg hover:bg-[#CBC3E3] hover:text-[#0A0118] transition-all`}
                              onClick={() => {
                                if (!selectedDomain) {
                                  setError("Please select a domain");
                                  return;
                                }
                                if (!selectedProblem) {
                                  setError("Please select a problem statement");
                                  return;
                                }
                                setActiveStep(3);
                              }}
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Next: Session
                              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Session Section */}
                      {activeStep === 3 && (
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="mb-6">
                            <label className="block text-sm font-medium text-[#CBC3E3] mb-4">
                              Choose a Session in which you want to pitch <span className="text-[#A020F0]">*</span>
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {SESSIONS.map((session) => (
                                <label
                                  key={session.id}
                                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                                    selectedSession === session.id
                                      ? 'border-[#A020F0] bg-[#A020F0]/10'
                                      : 'border-[#CBC3E3]/20 hover:border-[#A020F0]/40 hover:bg-[#A020F0]/5'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="selectedSession"
                                    value={session.id}
                                    checked={selectedSession === session.id}
                                    onChange={() => setSelectedSession(session.id)}
                                    className="mr-3 w-5 h-5 text-[#A020F0] focus:ring-[#A020F0]"
                                  />
                                  <div>
                                    <div className="font-semibold text-[#F0F0F0]">{session.label}</div>
                                    <div className="text-sm text-[#CBC3E3]/70">{session.time}</div>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <motion.button
                              type="button"
                              className="flex items-center justify-center px-6 py-3 bg-[#1E0345] text-[#CBC3E3] rounded-xl font-medium hover:bg-[#A020F0]/80 hover:text-[#F0F0F0] transition-colors border border-[#CBC3E3]/20"
                              onClick={() => setActiveStep(2)}
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
                              className={`flex items-center justify-center px-6 py-3 ${COLORS.button} rounded-xl font-medium hover:shadow-lg hover:bg-[#CBC3E3] hover:text-[#0A0118] transition-all`}
                              onClick={() => {
                                if (!selectedSession) {
                                  setError("Please select a session");
                                  return;
                                }
                                setActiveStep(4);
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
                      {activeStep >= 4 && activeStep <= teamMembers.length + 3 && (
                        <motion.div
                          key={`member-${activeStep}`}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="mb-6">
                            <h3 className="text-xl font-semibold text-[#CBC3E3] mb-4 flex items-center">
                              <span className="bg-[#A020F0]/30 text-[#A020F0] rounded-full w-8 h-8 flex items-center justify-center mr-2">
                                {activeStep - 3}
                              </span>
                              Team Member {activeStep - 3}
                            </h3>
                            <div className="space-y-4">
                              <div>
                                <label htmlFor={`memberName-${activeStep-4}`} className="block text-sm font-medium text-[#CBC3E3] mb-2">
                                  Full Name
                                </label>
                                <input
                                  type="text"
                                  id={`memberName-${activeStep-4}`}
                                  className={`w-full ${COLORS.input} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A020F0] focus:border-transparent transition-all`}
                                  placeholder="Enter member's full name"
                                  value={teamMembers[activeStep-4].name}
                                  onChange={(e) => handleMemberChange(activeStep-4, 'name', e.target.value)}
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor={`registrationNumber-${activeStep-4}`} className="block text-sm font-medium text-[#CBC3E3] mb-2">
                                  Registration Number
                                </label>
                                <input
                                  type="text"
                                  id={`registrationNumber-${activeStep-4}`}
                                  className={`w-full ${COLORS.input} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A020F0] focus:border-transparent transition-all`}
                                  placeholder="Enter registration number"
                                  value={teamMembers[activeStep-4].registrationNumber}
                                  onChange={(e) => handleMemberChange(activeStep-4, 'registrationNumber', e.target.value)}
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
                                  onClick={() => handleRemoveMember(activeStep-4)}
                                  whileHover={{ scale: 1.04 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  Remove
                                </motion.button>
                              )}
                              {activeStep < teamMembers.length + 3 ? (
                                <motion.button
                                  type="button"
                                  className={`flex items-center justify-center px-6 py-2 ${COLORS.button} rounded-xl font-medium hover:shadow-lg hover:bg-[#CBC3E3] hover:text-[#0A0118] transition-all`}
                                  onClick={() => {
                                    // Validate current member before proceeding
                                    const currentMember = teamMembers[activeStep-4];
                                    if (!currentMember.name || !currentMember.registrationNumber) {
                                      setError(`Please fill in all fields for Member ${activeStep - 3}`);
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
                      {activeStep > 0 && activeStep === teamMembers.length + 3 && (
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
                            <span className="font-medium">Participant Type:</span> {participantType}
                          </li>
                          <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="font-medium">Team Name:</span> {teamName}
                          </li>
                          <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="font-medium">Leader:</span> {teamLeaderName}
                          </li>
                          <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="font-medium">Mobile:</span> {teamLeaderMobile}
                          </li>
                          <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">Email:</span> {teamLeaderEmail}
                          </li>
                          <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="font-medium">Domain:</span> {selectedDomain}
                          </li>
                          <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium">Session:</span> {SESSIONS.find(s => s.id === selectedSession)?.label} ({SESSIONS.find(s => s.id === selectedSession)?.time})
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
                              <p className="text-[#CBC3E3] text-sm mt-1">{selectedProblem?.description}</p>
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