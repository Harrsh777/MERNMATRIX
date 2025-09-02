"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaUsers, 
  FaTrophy, 
  FaMoneyBillWave, 
  FaBook, 
  FaLightbulb, 
  FaUserTie, 
  FaChevronDown, 
  FaChevronUp,
  FaArrowLeft,
  FaDiscord,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaMapMarkerAlt,
  FaClock,
  FaCode,
  FaRocket,
  FaRegStar,
  FaStar
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const HackathonDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const sponsors = [
    { name: "Sheryians Coding School", tier: "Presented By", logo: "/sheryians-logo.png" },
    { name: "Bhopal Municipal Corporation", tier: "In Association With", logo: "/bmc-logo.png" },
    { name: "UNIGOAL", tier: "Career Partner", logo: "/unigoal-logo.png" },
    { name: "VIT Bhopal", tier: "Host Institution", logo: "/vit-logo.png" },
    { name: "MERN Stack Tech Club", tier: "Organizing Club", logo: "/mern-logo.png" },
  ];

  const faqs = [
    {
      question: "Who can participate in the hackathon?",
      answer: "The hackathon is open to all developers, designers, and innovators aged 18 and above. Students, professionals, and hobbyists are all welcome to join. Teams can have up to 4 members."
    },
    {
      question: "What should I bring to the event?",
      answer: "Please bring your laptop, charger, any hardware you plan to use, and a valid ID. We'll provide food, drinks, WiFi, and a creative environment for you to build in."
    },
    {
      question: "Do I need to have a team to participate?",
      answer: "No, you can register as an individual and we'll help you form a team during the team formation session. However, teams can have a maximum of 4 members."
    },
    {
      question: "What are the judging criteria?",
      answer: "Projects will be judged based on creativity (25%), technical complexity (25%), design/UX (25%), and potential impact (25%). There will also be special category prizes."
    },
    {
      question: "Will there be mentorship available?",
      answer: "Yes, we'll have mentors from our sponsor companies and industry experts available throughout the event to help you with technical challenges, idea validation, and presentation skills."
    }
  ];

  const schedule = [
    { time: "1 Sep - 3 Sep", event: "Round 1: Online Ideation & Problem Statement Selection", day: "Ideation Phase", highlight: "Choose your challenge" },
    { time: "4 Sep", event: "Round 2: Online/Offline Idea Pitching & Speaker Session", day: "Pitching Phase", highlight: "Chief Guest: Malti Rai (Mayor of Bhopal), Speaker session by UNIGOAL" },
    { time: "5 Sep - 23 Sep", event: "Round 3: Online Development Phase", day: "Development Phase", highlight: "Build your solution" },
    { time: "25 Sep", event: "Round 4: Final Showdown & Prize Distribution", day: "Final Phase", highlight: "Career guidance session by UNIGOAL, Mentoring session by Sheriyans Coding School" },
  ];

  const prizes = [
    { place: "1st", amount: "₹15,000", description: "Grand Prize" },
    { place: "2nd", amount: "₹10,000", description: "Runner Up" },
    { place: "3rd", amount: "₹7,500", description: "Second Runner Up" },
    { place: "Best Design", amount: "₹3,500", description: "Most intuitive UI/UX" },
    { place: "Most Innovative", amount: "₹4,000", description: "Most creative solution" },
  ];

  const problemStatements = [
    {
      title: "Cyber Resilience & Digital Safety",
      description: "Small businesses, children, and everyday users all face cyber threats but lack strong defenses. How can we design affordable, practical, and user-friendly solutions that protect individuals and organizations from online risks while giving them more control over their data and privacy?",
      category: "Cybersecurity & Privacy",
      difficulty: "Intermediate"
    },
    {
      title: "Truth & Trust in the Digital Age",
      description: "From deepfakes to AI manipulation, it's becoming harder to know what's real online. How can we verify authenticity, fight misinformation, and secure AI systems against malicious manipulation to build a safer digital world?",
      category: "Cybersecurity & Privacy",
      difficulty: "Advanced"
    },
    {
      title: "Privacy as a Right",
      description: "People's data is constantly collected, often without their knowledge or consent. How can we give individuals control over their personal information, enable fair data usage, and generate privacy-preserving alternatives for developers and researchers?",
      category: "Cybersecurity & Privacy",
      difficulty: "Intermediate"
    },
    {
      title: "Transparent & Accountable Systems",
      description: "Corruption and lack of clarity make it hard to trust public services, donations, and digital finance. How can we design transparent systems for welfare, NGOs, and finance that ensure funds reach the right people and help users make informed, safer financial decisions?",
      category: "Governance & FinTech",
      difficulty: "Advanced"
    },
    {
      title: "Reliable & Resilient Digital Services",
      description: "Downtime, outages, and hidden cloud costs disrupt critical applications. How can we create resilient systems that stay online during failures, simplify cloud management, detect unusual spending, and make infrastructure more accessible to developers?",
      category: "Developer Tools & Cloud Infrastructure",
      difficulty: "Expert"
    },
    {
      title: "Fair & Collaborative AI Development",
      description: "AI is powerful but often a black box — hard to explain, sometimes biased, and tricky to work with in teams. How can we make AI more explainable and fair, while building better collaboration tools for developers working with models, prompts, and APIs?",
      category: "Developer Tools & Cloud Infrastructure",
      difficulty: "Advanced"
    },
    {
      title: "Privacy-Friendly Healthcare Innovation",
      description: "Medical research needs patient participation and data, but privacy is a big concern. How can we connect patients with research opportunities and enable hospitals to collaborate without exposing sensitive personal data?",
      category: "Healthcare & MedTech",
      difficulty: "Intermediate"
    },
    {
      title: "Smarter Knowledge Sharing",
      description: "Students, researchers, and teams juggle articles, notes, and references across tools. How can we create unified platforms where knowledge can be collected, shared, annotated, and built upon collaboratively?",
      category: "Education & Collaboration",
      difficulty: "Intermediate"
    },
    {
      title: "Sustainable Technology & the Right to Repair",
      description: "E-waste is rising as devices are thrown away instead of reused. How can we empower people to repair, recycle, and extend the life of electronics to reduce waste and promote sustainability?",
      category: "Sustainability & Smart Living",
      difficulty: "Intermediate"
    },
    {
      title: "Smarter Farming & Cities",
      description: "Farmers and cities face resource challenges — from irrigation inefficiencies to waste collection. How can we design simple, data-driven tools that help farmers increase yields and cities manage waste more effectively?",
      category: "Sustainability & Smart Living",
      difficulty: "Intermediate"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0A0118] to-[#1E0345] text-white overflow-hidden relative">
      {/* Simple aesthetic background */}
      <div className="fixed inset-0 z-0">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-[#0A0118]/30 to-[#1E0345]/40"></div>
        
        {/* Elegant geometric shapes */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Large subtle circle */}
           <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-green-500/10 to-transparent blur-3xl"></div>
          
          {/* Medium circle */}
           <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-tl from-emerald-500/15 to-transparent blur-2xl"></div>
          
          {/* Small accent circle */}
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-green-400/20 to-transparent blur-xl"></div>
        </div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
             backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Header */}
      <motion.header 
                 className={`fixed top-0 w-full py-4 px-4 sm:px-6 lg:px-8 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0A0118]/90 backdrop-blur-md border-b border-green-500/30' : 'bg-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
                             className="flex items-center gap-2 px-4 py-2 bg-[#1E0345] rounded-lg border border-green-500/30 hover:border-green-400 transition-all backdrop-blur-sm"
            >
              <FaArrowLeft className="text-sm" />
              Back to Events
            </motion.button>
          </Link>
          
          <div className="flex items-center gap-4">
            <motion.a 
              whileHover={{ scale: 1.2, y: -3 }} 
              href="#" 
               className="p-3 rounded-full bg-[#1E0345] hover:bg-green-500 transition-all backdrop-blur-sm border border-green-500/30"
            >
              <FaDiscord className="text-xl" />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.2, y: -3 }} 
              href="#" 
               className="p-3 rounded-full bg-[#1E0345] hover:bg-green-500 transition-all backdrop-blur-sm border border-green-500/30"
            >
              <FaTwitter className="text-xl" />
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-300 rounded-full mb-6 border border-green-500/30 backdrop-blur-sm"
          >
            <FaCalendarAlt className="mr-2" />
            September 04-25, 2025
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">DAWN OF</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">&lt;ODE</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-3xl md:text-4xl font-bold mb-6 text-green-400"
          >
            Hackathon
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-white mb-8 font-medium"
          >
            Code By Day Hack By Night
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#E0E0E0] max-w-4xl mx-auto mb-8 leading-relaxed"
          >
            Dear Coders, Get ready to code, innovate, and hack your way to glory! Mern Stack Club at VIT Bhopal proudly presents Dawn of Code, an Inter-college electrifying hackathon designed to challenge your skills, spark creativity, and connect you with like-minded tech enthusiasts.
          </motion.p>

          {/* Why You Should Join Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 rounded-2xl border border-green-500/30 mb-10 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-4 text-center">⚡ Why You Should Join:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                <span className="text-green-200">Prize Pool Worth ₹40K+, cool goodies, and certificates for all!</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">💼</span>
                <span className="text-green-200">GOVERNMENT Internship Opportunities with top sponsors.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔊</span>
                <span className="text-green-200">Speaker Sessions & Career Insights from industry experts.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">👥</span>
                <span className="text-green-200">Form teams of 2-5 and collaborate to build something extraordinary.</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -3 }}
              className="flex items-center gap-2 bg-[#0A0118]/50 px-4 py-3 rounded-lg border border-green-500/30 backdrop-blur-sm"
            >
              <FaTrophy className="text-green-400" />
              <span>₹40K+ Prize Pool</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -3 }}
              className="flex items-center gap-2 bg-[#0A0118]/50 px-4 py-3 rounded-lg border border-green-500/30 backdrop-blur-sm"
            >
              <FaUserTie className="text-green-400" />
              <span>Government Internships</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -3 }}
              className="flex items-center gap-2 bg-[#0A0118]/50 px-4 py-3 rounded-lg border border-green-500/30 backdrop-blur-sm"
            >
              <FaUsers className="text-green-400" />
              <span>Teams of 2-5</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -3 }}
              className="flex items-center gap-2 bg-[#0A0118]/50 px-4 py-3 rounded-lg border border-green-500/30 backdrop-blur-sm"
            >
              <FaCode className="text-green-400" />
              <span>Entry Fee: ₹120</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -3 }}
              className="flex items-center gap-2 bg-[#0A0118]/50 px-4 py-3 rounded-lg border border-green-500/30 backdrop-blur-sm"
            >
              <FaCalendarAlt className="text-green-400" />
              <span>Last Date: 31st Aug</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="/join">
            <motion.button 
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/40 transition-all flex items-center gap-2 cursor-pointer"
            >
              <FaRocket className="text-lg" />
              Register Now
            </motion.button>
            </Link>
            <motion.button 
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
               onClick={() => {
                 window.scrollTo({
                   top: window.scrollY + 200, // 5cm ≈ 200px
                   behavior: 'smooth'
                 });
               }}
               className="px-8 py-4 bg-[#1E0345] text-white rounded-lg font-bold border border-green-500/30 hover:border-green-500 transition-all backdrop-blur-sm"
            >
              View Guidelines
            </motion.button>
          </motion.div>
          
          {/* QR Code Section */}
        
        </div>

        {/* Animated decorative elements */}
        <motion.div 
           className="absolute top-10 left-10 w-40 h-40 rounded-full bg-green-400 opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
           className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-emerald-400 opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
           <div className="w-6 h-10 border-2 border-green-500 rounded-full flex justify-center">
            <motion.div
               className="w-1 h-3 bg-green-500 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Content Tabs */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-wrap gap-2 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {['overview', 'problem-statements', 'schedule', 'prizes', 'sponsors', 'faq'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-lg font-medium capitalize transition-all ${activeTab === tab 
                   ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30' 
                   : 'bg-[#1E0345] text-[#E0E0E0] hover:bg-green-500/20 backdrop-blur-sm border border-green-500/30'}`}
              >
                {tab}
              </motion.button>
            ))}
          </motion.div>

          {/* Tab Content */}
                     <div className="bg-[#0A0118]/50 backdrop-blur-md rounded-2xl border border-green-500/30 p-6 md:p-8 shadow-xl shadow-green-500/10">
            <AnimatePresence mode="wait">
              {/* Overview */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">About the Hackathon</h2>
                    <p className="text-[#E0E0E0] leading-relaxed">
                      Dawn of Code is our flagship Inter-college electrifying hackathon that brings together developers, designers, and innovators to build solutions for real-world problems. This month-long event challenges participants to push their limits while receiving guidance from industry experts and mentors.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div 
                      whileHover={{ y: -5 }}
                       className="bg-[#0A0118] p-6 rounded-xl border border-green-500/30 hover:border-green-400 transition-all"
                    >
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                         <FaLightbulb className="text-green-400" /> Theme
                      </h3>
                      <p className="text-[#E0E0E0]">
                         "Innovation for Social Impact" - Projects should focus on solving real-world problems using technology, with emphasis on cybersecurity, child safety, governance transparency, and cloud resilience.
                      </p>
                    </motion.div>

                    <motion.div 
                      whileHover={{ y: -5 }}
                       className="bg-[#0A0118] p-6 rounded-xl border border-green-500/30 hover:border-green-400 transition-all"
                    >
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                         <FaBook className="text-green-400" /> Tracks
                      </h3>
                      <ul className="text-[#E0E0E0] list-disc list-inside space-y-2">
                         <li>Cybersecurity & Privacy</li>
                         <li>Governance & FinTech</li>
                         <li>Developer Tools & Cloud Infrastructure</li>
                         <li>Healthcare & MedTech</li>
                         <li>Education & Collaboration</li>
                         <li>Sustainability & Smart Living</li>
                      </ul>
                    </motion.div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">Eligibility & Rules</h3>
                                         <div className="bg-[#0A0118] p-6 rounded-xl border border-green-500/30">
                      <ul className="text-[#E0E0E0] list-disc list-inside space-y-2">
                        <li>Teams of 1-4 participants allowed</li>
                        <li>All code must be written during the event</li>
                        <li>Use of open source libraries and APIs is encouraged</li>
                        <li>Projects must be submitted by the deadline</li>
                        <li>All participants must adhere to the code of conduct</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Problem Statements */}
              {activeTab === 'problem-statements' && (
                <motion.div
                  key="problem-statements"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Problem Statements</h2>
                  <p className="text-[#E0E0E0] mb-8 leading-relaxed">
                    Choose from these real-world challenges and build innovative solutions that can make a difference. Each problem statement is carefully crafted to address current societal and technological needs.
                  </p>
                  
                  <div className="space-y-6">
                    {problemStatements.map((problem, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-[#0A0118] p-6 rounded-xl border border-green-500/30 hover:border-green-400 transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-bold text-white">{problem.title}</h3>
                          <div className="flex gap-2">
                            <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs font-medium rounded-full border border-green-500/30">
                              {problem.category}
                            </span>
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30">
                              {problem.difficulty}
                            </span>
                          </div>
                        </div>
                        <p className="text-[#E0E0E0] leading-relaxed">{problem.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Schedule */}
              {activeTab === 'schedule' && (
                <motion.div
                  key="schedule"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Event Schedule</h2>
                  
                  {/* Registration Deadline Notice */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-4 rounded-xl border border-red-500/30 mb-6 text-center"
                  >
                    <p className="text-lg font-bold text-red-300">
                      ⏰ Last Date to Register: <span className="text-white">31st August 2025</span>
                    </p>
                  </motion.div>
                  
                  <div className="space-y-4">
                    {schedule.map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                        className="bg-[#0A0118] p-6 rounded-xl border border-green-500/30 hover:border-green-400 transition-all"
                      >
                        <div className="flex items-start gap-4 mb-3">
                          <div className="flex-shrink-0 w-32 text-green-400 font-medium text-sm">{item.time}</div>
                        <div className="flex-grow">
                            <h3 className="font-bold text-white text-lg">{item.event}</h3>
                            <p className="text-sm text-green-300 font-medium">{item.day}</p>
                          </div>
                        </div>
                        {item.highlight && (
                          <div className="mt-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                            <p className="text-sm text-green-200 leading-relaxed">{item.highlight}</p>
                        </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Prizes */}
              {activeTab === 'prizes' && (
                <motion.div
                  key="prizes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Prizes & Awards</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {prizes.map((prize, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ y: -5, rotate: 1 }}
                                                 className="bg-gradient-to-br from-[#0A0118] to-[#1E0345] p-6 rounded-xl border border-green-500/30 hover:border-green-400 transition-all text-center relative overflow-hidden"
                      >
                        <div className="absolute -top-4 -right-4 text-6xl opacity-10">
                          {index === 0 ? <FaTrophy /> : <FaRegStar />}
                        </div>
                        <div className="text-4xl font-bold text-[#FBBF24] mb-2">{prize.place}</div>
                        <div className="text-2xl font-bold text-white mb-2">{prize.amount}</div>
                        <p className="text-[#E0E0E0]">{prize.description}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="mt-8 bg-[#0A0118] p-6 rounded-xl border border-green-500/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <FaMoneyBillWave className="text-green-400" /> Additional Benefits
                    </h3>
                    <ul className="text-[#E0E0E0] list-disc list-inside space-y-2">
                      <li>Interview opportunities with sponsor companies</li>
                      <li>1-year subscriptions to developer tools</li>
                      <li>Featured spot on our community platform</li>
                      <li>Mentorship sessions with industry experts</li>
                    </ul>
                  </motion.div>
                </motion.div>
              )}

              {/* Sponsors */}
              {activeTab === 'sponsors' && (
                <motion.div
                  key="sponsors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Sponsors</h2>
                  <div className="space-y-8">
                    {sponsors.map((sponsor, index) => (
                      <div key={index}>
                        <h3 className="text-xl font-bold mb-4 text-[#E0E0E0]">{sponsor.tier}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <motion.div 
                              key={index}
                              whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-[#0A0118] p-6 rounded-xl border border-green-500/30 hover:border-green-400 transition-all flex items-center justify-center h-40 relative overflow-hidden group"
                            >
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                              <div className="text-center z-10">
                              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto mb-3 flex items-center justify-center border border-green-500/50">
                                <span className="text-2xl font-bold text-white">{sponsor.name[0]}</span>
                                </div>
                              <p className="font-medium text-white text-lg mb-1">{sponsor.name}</p>
                              <p className="text-sm text-green-300 font-medium">{sponsor.tier}</p>
                              </div>
                            </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="mt-8 bg-[#0A0118] p-6 rounded-xl border border-green-500/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-xl font-bold mb-4">Become a Sponsor</h3>
                    <p className="text-[#E0E0E0] mb-4">
                      Interested in supporting the next generation of developers and innovators? Join us as a sponsor and get exposure to top talent in the tech community.
                    </p>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium"
                    >
                      Download Sponsorship Kit
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {/* FAQ */}
              {activeTab === 'faq' && (
                <motion.div
                  key="faq"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <motion.div 
                        key={index}
                        layout
                        className="bg-[#0A0118] rounded-xl border border-green-500/30 overflow-hidden hover:border-green-400 transition-all"
                      >
                        <motion.button
                          onClick={() => toggleFaq(index)}
                          className="flex justify-between items-center w-full p-6 text-left hover:bg-[#1E0345]/50 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <span className="font-medium text-white">{faq.question}</span>
                          {openFaqIndex === index ? (
                            <FaChevronUp className="text-green-400 flex-shrink-0" />
                          ) : (
                            <FaChevronDown className="text-green-400 flex-shrink-0" />
                          )}
                        </motion.button>
                        <AnimatePresence>
                          {openFaqIndex === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="px-6 pb-6"
                            >
                              <p className="text-[#E0E0E0] leading-relaxed">{faq.answer}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
                         className="bg-gradient-to-br from-[#0A0118] to-[#1E0345] p-8 md:p-12 rounded-2xl border border-green-500/30 shadow-xl shadow-green-500/10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-[#E0E0E0] text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of developers, designers, and innovators in this month-long hackathon. 
              Push your limits, learn from experts, and create solutions that matter.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
               <Link href="/hackathon-details">
              <motion.button 
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                   className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/40 transition-all cursor-pointer"
              >
                   Register Now
              </motion.button>
               </Link>
              <motion.button 
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                 className="px-8 py-3 bg-[#1E0345] text-white rounded-lg font-bold border border-green-500/30 hover:border-green-500 transition-all backdrop-blur-sm"
              >
                Download Event Guide
              </motion.button>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Student Coordinators */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-8 rounded-2xl border border-green-500/30"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Student Coordinators</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-[#0A0118] p-6 rounded-xl border border-green-500/30 hover:border-green-400 transition-all"
              >
                <h3 className="text-xl font-bold text-green-400 mb-2">Shreyash Dubey</h3>
                <p className="text-[#E0E0E0] mb-2">22MEI10038</p>
                <p className="text-green-300 font-medium">8074804319</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-[#0A0118] p-6 rounded-xl border border-green-500/30 hover:border-green-400 transition-all"
              >
                <h3 className="text-xl font-bold text-green-400 mb-2">Arushi Puri</h3>
                <p className="text-[#E0E0E0] mb-2">22BCE10657</p>
                <p className="text-green-300 font-medium">87078 83292</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-green-500/30 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            className="flex justify-center gap-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {[
              { icon: <FaInstagram className="text-xl" />, color: "#E1306C", label: "@mernstackclub_vitb" },
              { icon: <FaLinkedin className="text-xl" />, color: "#0077B5", label: "MERN Matrix Club - VIT Bhopal" }
            ].map((social, index) => (
              <motion.a 
                key={index}
                whileHover={{ scale: 1.2, y: -5, backgroundColor: social.color }}
                href="#" 
                className="p-3 rounded-full bg-[#1E0345] transition-all border border-green-500/30 backdrop-blur-sm group relative"
              >
                {social.icon}
                <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-[#0A0118] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
          <motion.p 
            className="text-[#A0A0A0] text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            © 2024 MERN Matrix Club. All rights reserved. | 
            <Link href="/privacy" className="hover:text-green-400 transition-colors ml-2">Privacy Policy</Link> | 
            <Link href="/terms" className="hover:text-green-400 transition-colors ml-2">Terms of Service</Link>
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default HackathonDetails;