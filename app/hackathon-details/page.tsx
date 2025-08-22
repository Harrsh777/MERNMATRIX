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
    { name: "TechCorp", tier: "Platinum", logo: "/placeholder-sponsor1.png" },
    { name: "DevCloud", tier: "Gold", logo: "/placeholder-sponsor2.png" },
    { name: "CodeFund", tier: "Silver", logo: "/placeholder-sponsor3.png" },
    { name: "DataWorks", tier: "Silver", logo: "/placeholder-sponsor4.png" },
    { name: "AI Solutions", tier: "Bronze", logo: "/placeholder-sponsor5.png" },
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
    { time: "9:00 AM", event: "Registration & Breakfast", day: "Day 1" },
    { time: "10:00 AM", event: "Opening Ceremony & Keynote", day: "Day 1" },
    { time: "11:00 AM", event: "Hacking Begins!", day: "Day 1" },
    { time: "12:30 PM", event: "Lunch", day: "Day 1" },
    { time: "2:00 PM", event: "Workshop: API Integration", day: "Day 1" },
    { time: "7:00 PM", event: "Dinner", day: "Day 1" },
    { time: "12:00 AM", event: "Midnight Snacks", day: "Day 1" },
    { time: "9:00 AM", event: "Breakfast", day: "Day 2" },
    { time: "12:00 PM", event: "Hacking Ends / Submission Deadline", day: "Day 2" },
    { time: "1:00 PM", event: "Lunch & Project Demos", day: "Day 2" },
    { time: "3:00 PM", event: "Closing Ceremony & Awards", day: "Day 2" },
  ];

  const prizes = [
    { place: "1st", amount: "$10,000", description: "Grand Prize" },
    { place: "2nd", amount: "$5,000", description: "Runner Up" },
    { place: "3rd", amount: "$2,500", description: "Second Runner Up" },
    { place: "Best Design", amount: "$1,500", description: "Most intuitive UI/UX" },
    { place: "Most Innovative", amount: "$1,500", description: "Most creative solution" },
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
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-[#4A049D]/10 to-transparent blur-3xl"></div>
          
          {/* Medium circle */}
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-tl from-[#2D1B69]/15 to-transparent blur-2xl"></div>
          
          {/* Small accent circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-[#A855F7]/20 to-transparent blur-xl"></div>
        </div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Header */}
      <motion.header 
        className={`fixed top-0 w-full py-4 px-4 sm:px-6 lg:px-8 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0A0118]/90 backdrop-blur-md border-b border-[#4A049D]/30' : 'bg-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-[#1E0345] rounded-lg border border-[#A020F0]/30 hover:border-[#A020F0] transition-all backdrop-blur-sm"
            >
              <FaArrowLeft className="text-sm" />
              Back to Events
            </motion.button>
          </Link>
          
          <div className="flex items-center gap-4">
            <motion.a 
              whileHover={{ scale: 1.2, y: -3 }} 
              href="#" 
              className="p-3 rounded-full bg-[#1E0345] hover:bg-[#A020F0] transition-all backdrop-blur-sm border border-[#A020F0]/30"
            >
              <FaDiscord className="text-xl" />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.2, y: -3 }} 
              href="#" 
              className="p-3 rounded-full bg-[#1E0345] hover:bg-[#A020F0] transition-all backdrop-blur-sm border border-[#A020F0]/30"
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
            className="inline-flex items-center px-4 py-2 bg-[#4A049D]/20 text-[#D8B4FE] rounded-full mb-6 border border-[#A020F0]/30 backdrop-blur-sm"
          >
            <FaCalendarAlt className="mr-2" />
            January 20-21, 2024
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#A855F7]">DAWN OF</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F472B6] to-[#FB7185]">HACKATHON</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#E0E0E0] max-w-3xl mx-auto mb-10"
          >
            24-Hour Coding Marathon to Build Solutions for Real-World Problems
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -3 }}
              className="flex items-center gap-2 bg-[#0A0118]/50 px-4 py-3 rounded-lg border border-[#4A049D] backdrop-blur-sm"
            >
              <FaUsers className="text-[#60A5FA]" />
              <span>300+ Attendees</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -3 }}
              className="flex items-center gap-2 bg-[#0A0118]/50 px-4 py-3 rounded-lg border border-[#4A049D] backdrop-blur-sm"
            >
              <FaTrophy className="text-[#FBBF24]" />
              <span>$20,000+ in Prizes</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -3 }}
              className="flex items-center gap-2 bg-[#0A0118]/50 px-4 py-3 rounded-lg border border-[#4A049D] backdrop-blur-sm"
            >
              <FaUserTie className="text-[#C084FC]" />
              <span>Industry Mentors</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#C084FC] to-[#A855F7] text-white rounded-lg font-bold hover:shadow-lg hover:shadow-[#C084FC]/40 transition-all flex items-center gap-2"
            >
              <FaRocket className="text-lg" />
              Register Now
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#1E0345] text-white rounded-lg font-bold border border-[#A020F0]/30 hover:border-[#A020F0] transition-all backdrop-blur-sm"
            >
              View Guidelines
            </motion.button>
          </motion.div>
        </div>

        {/* Animated decorative elements */}
        <motion.div 
          className="absolute top-10 left-10 w-40 h-40 rounded-full bg-[#C084FC] opacity-20 blur-3xl"
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
          className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-[#60A5FA] opacity-20 blur-3xl"
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
          <div className="w-6 h-10 border-2 border-purple-500 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-purple-500 rounded-full mt-2"
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
            {['overview', 'schedule', 'prizes', 'sponsors', 'faq'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-lg font-medium capitalize transition-all ${activeTab === tab 
                  ? 'bg-gradient-to-r from-[#C084FC] to-[#A855F7] text-white shadow-lg shadow-[#C084FC]/30' 
                  : 'bg-[#1E0345] text-[#E0E0E0] hover:bg-[#A020F0]/20 backdrop-blur-sm border border-[#4A049D]/30'}`}
              >
                {tab}
              </motion.button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <div className="bg-[#0A0118]/50 backdrop-blur-md rounded-2xl border border-[#4A049D]/30 p-6 md:p-8 shadow-xl shadow-[#4A049D]/10">
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
                      Dawn of Hackathon is our flagship 24-hour coding marathon that brings together developers, designers, and innovators to build solutions for real-world problems. This intense, round-the-clock event challenges participants to push their limits while receiving guidance from mentors at top tech companies.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="bg-[#0A0118] p-6 rounded-xl border border-[#4A049D]/30 hover:border-[#A855F7] transition-all"
                    >
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <FaLightbulb className="text-[#FBBF24]" /> Theme
                      </h3>
                      <p className="text-[#E0E0E0]">
                        "Sustainable Solutions for Tomorrow" - Projects should focus on environmental sustainability, social impact, or technological innovation that addresses real-world challenges.
                      </p>
                    </motion.div>

                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="bg-[#0A0118] p-6 rounded-xl border border-[#4A049D]/30 hover:border-[#A855F7] transition-all"
                    >
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <FaBook className="text-[#60A5FA]" /> Tracks
                      </h3>
                      <ul className="text-[#E0E0E0] list-disc list-inside space-y-2">
                        <li>Climate Tech & Sustainability</li>
                        <li>Healthcare & Wellness</li>
                        <li>Education & Accessibility</li>
                        <li>Open Innovation</li>
                      </ul>
                    </motion.div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">Eligibility & Rules</h3>
                    <div className="bg-[#0A0118] p-6 rounded-xl border border-[#4A049D]/30">
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
                  <div className="space-y-4">
                    {schedule.map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                        className="flex items-start gap-4 bg-[#0A0118] p-4 rounded-xl border border-[#4A049D]/30 hover:border-[#A855F7] transition-all"
                      >
                        <div className="flex-shrink-0 w-20 text-[#60A5FA] font-medium">{item.time}</div>
                        <div className="flex-grow">
                          <h3 className="font-medium text-white">{item.event}</h3>
                          <p className="text-sm text-[#A0A0A0]">{item.day}</p>
                        </div>
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
                        className="bg-gradient-to-br from-[#0A0118] to-[#1E0345] p-6 rounded-xl border border-[#4A049D]/30 hover:border-[#A855F7] transition-all text-center relative overflow-hidden"
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
                    className="mt-8 bg-[#0A0118] p-6 rounded-xl border border-[#4A049D]/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <FaMoneyBillWave className="text-[#34D399]" /> Additional Benefits
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
                    {['Platinum', 'Gold', 'Silver', 'Bronze'].map(tier => (
                      <div key={tier}>
                        <h3 className="text-xl font-bold mb-4 text-[#E0E0E0]">{tier} Sponsors</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {sponsors.filter(s => s.tier === tier).map((sponsor, index) => (
                            <motion.div 
                              key={index}
                              whileHover={{ scale: 1.05, y: -5 }}
                              className="bg-[#0A0118] p-4 rounded-xl border border-[#4A049D]/30 hover:border-[#A855F7] transition-all flex items-center justify-center h-32 relative overflow-hidden group"
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#4A049D]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                              <div className="text-center z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#4A049D] to-[#1E0345] rounded-full mx-auto mb-2 flex items-center justify-center border border-[#4A049D]/50">
                                  {sponsor.name[0]}
                                </div>
                                <p className="font-medium text-white">{sponsor.name}</p>
                                <p className="text-xs text-[#A0A0A0]">{sponsor.tier}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="mt-8 bg-[#0A0118] p-6 rounded-xl border border-[#4A049D]/30"
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
                      className="px-6 py-2 bg-gradient-to-r from-[#A855F7] to-[#60A5FA] text-white rounded-lg font-medium"
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
                        className="bg-[#0A0118] rounded-xl border border-[#4A049D]/30 overflow-hidden hover:border-[#A855F7] transition-all"
                      >
                        <motion.button
                          onClick={() => toggleFaq(index)}
                          className="flex justify-between items-center w-full p-6 text-left hover:bg-[#1E0345]/50 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <span className="font-medium text-white">{faq.question}</span>
                          {openFaqIndex === index ? (
                            <FaChevronUp className="text-[#60A5FA] flex-shrink-0" />
                          ) : (
                            <FaChevronDown className="text-[#60A5FA] flex-shrink-0" />
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
            className="bg-gradient-to-br from-[#0A0118] to-[#1E0345] p-8 md:p-12 rounded-2xl border border-[#A855F7]/30 shadow-xl shadow-[#4A049D]/10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-[#E0E0E0] text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of developers, designers, and innovators in this 24-hour coding marathon. 
              Push your limits, learn from experts, and create solutions that matter.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-[#C084FC] to-[#A855F7] text-white rounded-lg font-bold hover:shadow-lg hover:shadow-[#C084FC]/40 transition-all"
              >
                Register Now - Free!
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-[#1E0345] text-white rounded-lg font-bold border border-[#A855F7]/30 hover:border-[#A855F7] transition-all backdrop-blur-sm"
              >
                Download Event Guide
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-[#4A049D]/30 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            className="flex justify-center gap-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {[
              { icon: <FaDiscord className="text-xl" />, color: "#5865F2" },
              { icon: <FaTwitter className="text-xl" />, color: "#1DA1F2" },
              { icon: <FaLinkedin className="text-xl" />, color: "#0077B5" },
              { icon: <FaInstagram className="text-xl" />, color: "#E1306C" }
            ].map((social, index) => (
              <motion.a 
                key={index}
                whileHover={{ scale: 1.2, y: -5, backgroundColor: social.color }}
                href="#" 
                className="p-3 rounded-full bg-[#1E0345] transition-all border border-[#4A049D]/30 backdrop-blur-sm"
              >
                {social.icon}
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
            <Link href="/privacy" className="hover:text-[#60A5FA] transition-colors ml-2">Privacy Policy</Link> | 
            <Link href="/terms" className="hover:text-[#60A5FA] transition-colors ml-2">Terms of Service</Link>
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default HackathonDetails;