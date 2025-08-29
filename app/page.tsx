"use client"
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { FaGithub, FaDiscord, FaArrowRight, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import SplitText from './components/split';
import EventsSection from './components/EventSection';
import MERNLoadingPage from './loading';
import Head from 'next/head';
import Footer from './components/footer';
import BlogsSection from './components/blogsection';
import Hyperspeed from './components/background';

import { ColourfulTextDemo } from './components/colourfultext';
import { MERNTeamCarousel } from './components/MeetTeam';
import {MERNClubTimeline } from './components/timeline';
import { AnimatedTooltip } from '../components/ui/animated-tooltip';
import { MERNBentoGrid } from './components/bentohover';
import PortfolioGrid from './components/projects';
import MERNMasterySection from './components/merncheat';
import CommunitySection from './components/socials';



const HomePage = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(typeof window !== 'undefined' && window.scrollY > 10);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Words for the description
  const words = "The premier hub for MERN stack developers. Master MongoDB, Express, React, and Node.js through real-world projects, expert-led workshops, and an active developer community.".split(" ");

  // Developer avatars with tooltip data
  const developers = [
    {
      id: 1,
      name: "Shreyansh",
      designation: "President",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Arushi Puri",
      designation: "Vice President",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Harsh Srivastava",
      designation: "Technical Lead",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      id: 4,
      name: "Ashhar",
      designation: "Core Team",
      image: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  ];

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap" rel="stylesheet" />
      </Head>
      
      <MERNLoadingPage />
      <div className={`min-h-screen font-sans overflow-hidden text-[#F0F0F0] bg-black relative`}>
        {/* Hyperspeed Background - 19cm height with interactive functionality */}
        <div className="absolute top-0 left-0 right-0 h-[19.5cm] z-0">
          <Hyperspeed
            effectOptions={{
              onSpeedUp: () => { },
              onSlowDown: () => { },
              distortion: 'turbulentDistortion',
              length: 400,
              roadWidth: 10,
              islandWidth: 2,
              lanesPerRoad: 4,
              fov: 90,
              fovSpeedUp: 150,
              speedUp: 2,
              carLightsFade: 0.4,
              totalSideLightSticks: 20,
              lightPairsPerRoadWay: 40,
              shoulderLinesWidthPercentage: 0.05,
              brokenLinesWidthPercentage: 0.1,
              brokenLinesLengthPercentage: 0.5,
              lightStickWidth: [0.12, 0.5],
              lightStickHeight: [1.3, 1.7],
              movingAwaySpeed: [60, 80],
              movingCloserSpeed: [-120, -160],
              carLightsLength: [400 * 0.03, 400 * 0.2],
              carLightsRadius: [0.05, 0.14],
              carWidthPercentage: [0.3, 0.5],
              carShiftX: [-0.8, 0.8],
              carFloorSeparation: [0, 5],
              colors: {
                roadColor: 0x080808,
                islandColor: 0x0a0a0a,
                background: 0x000000,
                shoulderLines: 0xFFFFFF,
                brokenLines: 0xFFFFFF,
                leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
                rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
                sticks: 0x03B3C3,
              }
            }}
          />
        </div>

        {/* Modern Floating Navigation */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0118]/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}
        >
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            {/* Logo */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <motion.div
                  animate={{
                    boxShadow: ['0 0 0px rgba(0,255,255,0)', '0 0 10px rgba(0,255,255,0.3)', '0 0 0px rgba(0,255,255,0)']
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                  className="w-8 h-8 rounded-lg bg-[#0A0118] border border-[#CBC3E3] flex items-center justify-center text-[#CBC3E3] font-bold"
                >
                  M
                </motion.div>
                <span className="font-bold text-xl text-[#F0F0F0] hover:text-[#CBC3E3] transition-colors">
                  MERN Matrix
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  const el = document.getElementById('timeline');
                  if (el) {
                    const headerHeight = 80; // Approximate header height
                    const elementPosition = el.offsetTop - headerHeight;
                    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                  }
                }}
                className="text-left text-sm font-medium text-[#E0E0E0] hover:text-[#CBC3E3] transition-colors"
              >
                Timeline
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  const el = document.getElementById('projects');
                  if (el) {
                    const headerHeight = 80; // Approximate header height
                    const elementPosition = el.offsetTop - headerHeight;
                    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                  }
                }}
                className="text-left text-sm font-medium text-[#E0E0E0] hover:text-[#CBC3E3] transition-colors"
              >
                Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  const el = document.getElementById('community');
                  if (el) {
                    const headerHeight = 80; // Approximate header height
                    const elementPosition = el.offsetTop - headerHeight;
                    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                  }
                }}
                className="text-left text-sm font-medium text-[#E0E0E0] hover:text-[#CBC3E3] transition-colors"
              >
                Community
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  const el = document.getElementById('events');
                  if (el) {
                    const headerHeight = 80; // Approximate header height
                    const elementPosition = el.offsetTop - headerHeight;
                    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                  }
                }}
                className="text-left text-sm font-medium text-[#E0E0E0] hover:text-[#CBC3E3] transition-colors"
              >
                Events
              </motion.button>

              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: "#CBC3E3" }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#A020F0] text-[#0A0118] px-6 py-2.5 rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-all border border-[#CBC3E3]/20"
                >
                  Sign Up
                </motion.button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1, color: "#CBC3E3" }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-[#E0E0E0] focus:outline-none z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </motion.button>
          </div>
        </motion.header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-0 bg-[#0A0118] z-40 pt-20 px-6 md:hidden"
            >
              <div className="flex flex-col space-y-6 mt-8">
                <motion.div whileHover={{ x: 5 }} onClick={() => setMobileMenuOpen(false)}>
                  <a
                    href="#timeline"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('timeline');
                      if (el) {
                        const headerHeight = 80;
                        const elementPosition = el.offsetTop - headerHeight;
                        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                      }
                      setMobileMenuOpen(false);
                    }}
                    className="text-2xl font-medium text-[#E0E0E0] py-3 border-b border-[#1E0345] block"
                  >
                    Timeline
                  </a>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} onClick={() => setMobileMenuOpen(false)}>
                  <a
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('projects');
                      if (el) {
                        const headerHeight = 80;
                        const elementPosition = el.offsetTop - headerHeight;
                        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                      }
                      setMobileMenuOpen(false);
                    }}
                    className="text-2xl font-medium text-[#E0E0E0] py-3 border-b border-[#1E0345] block"
                  >
                    Projects
                  </a>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} onClick={() => setMobileMenuOpen(false)}>
                  <a
                    href="#community"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('community');
                      if (el) {
                        const headerHeight = 80;
                        const elementPosition = el.offsetTop - headerHeight;
                        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                      }
                      setMobileMenuOpen(false);
                    }}
                    className="text-2xl font-medium text-[#E0E0E0] py-3 border-b border-[#1E0345] block"
                  >
                    Community
                  </a>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} onClick={() => setMobileMenuOpen(false)}>
                  <a
                    href="#events"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('events');
                      if (el) {
                        const headerHeight = 80;
                        const elementPosition = el.offsetTop - headerHeight;
                        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                      }
                      setMobileMenuOpen(false);
                    }}
                    className="text-2xl font-medium text-[#E0E0E0] py-3 border-b border-[#1E0345] block"
                  >
                    Events
                  </a>
                </motion.div>
                <Link href="/signup">
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#CBC3E3" }}
                    className="bg-[#A020F0] text-[#0A0118] px-8 py-3 rounded-lg font-medium text-lg shadow-md mt-8 border border-[#CBC3E3]/20"
                  >
                    Sign In/Up
                  </motion.button>
                </Link>
              </div>
              <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6">
                <motion.a
                  whileHover={{ y: -2, color: "#CBC3E3" }}
                  href="#"
                  className="text-[#E0E0E0] hover:text-[#CBC3E3] transition-colors"
                >
                  <FaGithub className="text-2xl" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -2, color: "#CBC3E3" }}
                  href="#"
                  className="text-[#E0E0E0] hover:text-[#CBC3E3] transition-colors"
                >
                  <FaDiscord className="text-2xl" />
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section - Centered Content */}
        <main className="max-w-4xl mx-auto px-6 pt-32 pb-20 relative text-center z-10">
          <motion.section
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="relative z-10"
          >
            <motion.div variants={itemVariants as any}>
              <motion.span
                animate={{
                  boxShadow: ['0 0 0px rgba(203,195,227,0)', '0 0 10px rgba(203,195,227,0.3)', '0 0 0px rgba(203,195,227,0)']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
                className="inline-block px-3 py-1 text-xs font-semibold text-[#CBC3E3] bg-[#A020F0]/10 rounded-full mb-4 border border-[#CBC3E3]/20"
              >
                THE MERN COMMUNITY
              </motion.span>
            </motion.div>

            <div className="mb-8">
              <SplitText
                text="MERN Matrix Club"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F0F0F0] mb-2"
                delay={hasLoaded ? 0 : 100}
                duration={0.6}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
              />
              <SplitText
                text="Code. Connect. Create."
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#A020F0]"
                delay={hasLoaded ? 0 : 200}
                duration={0.6}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
              />
            </div>

            <motion.p
              variants={itemVariants as any}
              className="text-lg text-[#E0E0E0] leading-relaxed mb-8 max-w-2xl mx-auto"
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants as any}
                  className="inline-block mr-2 hover:text-[#CBC3E3] transition-colors"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            <motion.div
              variants={itemVariants as any}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <Link href="/join">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    backgroundColor: "#CBC3E3",
                    boxShadow: "0 4px 15px rgba(203, 195, 227, 0.3)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#A020F0] text-[#0A0118] px-8 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg border border-[#CBC3E3]/20 flex items-center gap-2 mx-auto"
                >
                  Register For Hackathon <FaArrowRight className="text-sm" />
                </motion.button>
              </Link>
              <Link href="/hackathon-details">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    borderColor: "#CBC3E3",
                    color: "#CBC3E3",
                    boxShadow: "0 4px 15px rgba(203, 195, 227, 0.1)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="border border-[#1E0345] bg-[#0A0118]/50 hover:border-[#CBC3E3] text-[#E0E0E0] px-8 py-3 rounded-lg font-medium transition-all shadow-sm hover:shadow-md"
                >
                  Details
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              className="flex justify-center items-center space-x-4"
              variants={itemVariants as any}
            >
              <div className="flex items-center justify-center">
                <AnimatedTooltip items={developers} />
                <motion.div
                  animate={{
                    boxShadow: ['0 0 0px rgba(203,195,227,0)', '0 0 10px rgba(203,195,227,0.3)', '0 0 0px rgba(203,195,227,0)']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                  className=" ml-3.5 w-12 h-12 rounded-full bg-[#0A0118] border border-[#CBC3E3]/20 flex items-center justify-center text-xs font-bold text-[#CBC3E3] shadow-md"
                >
                  +2.4K
                </motion.div>
              </div>
              <SplitText
                text="Developers building together"
                className="text-sm text-[#A0A0A0] hover:text-[#CBC3E3] transition-colors"
                delay={hasLoaded ? 0 : 300}
                duration={0.5}
                ease="power2.out"
                splitType="chars"
                from={{ opacity: 0, x: 10 }}
                to={{ opacity: 1, x: 0 }}
              />
            </motion.div>
          </motion.section>
        </main>
        <div id="events" className="scroll-mt-32">
          <EventsSection/>
        </div>
        <div id="timeline" className="scroll-mt-32">
          <MERNClubTimeline/>
        </div>
        <div id="projects" className="scroll-mt-32">
          <PortfolioGrid/>
        </div>
        <ColourfulTextDemo/>
       
        <MERNMasterySection/>  
        <MERNTeamCarousel/>
        
        <Footer/>
      </div>
    </>
  );
};

export default HomePage;