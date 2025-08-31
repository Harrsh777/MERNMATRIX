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
  FaStar,
  FaMusic,
  FaUserFriends,
  FaCamera,
  FaGift,
  FaBrain,
  FaGlobe,
  FaLaptop,
  FaTshirt,
  FaUtensils
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const EventSection: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState<string>('dawn-of-code');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const events = [
    {
      id: 'dawn-of-code',
      title: 'DAWN OF CODE',
      subtitle: 'Inter-college Hackathon',
      date: 'September 04-25, 2025',
      time: 'Month-long Event',
      venue: 'VIT Bhopal',
      image: '/Dawn.jpg',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30',
      icon: FaCode,
      description: 'Get ready to code, innovate, and hack your way to glory! Mern Stack Club at VIT Bhopal proudly presents Dawn of Code, an Inter-college electrifying hackathon designed to challenge your skills, spark creativity, and connect you with like-minded tech enthusiasts.',
      highlights: ['₹40K+ Prize Pool', 'Government Internships', 'Teams of 2-5', 'Entry Fee: ₹120'],
      link: '/hackathon-details'
    },
    {
      id: 'elegance-disguise',
      title: 'ELEGANCE IN DISGUISE',
      subtitle: 'Prom Day Event',
      date: '20th February',
      time: '12:00 PM – 3:00 PM',
      venue: 'AB416',
      image: '/dance.jpg',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
      icon: FaMusic,
      description: 'Get ready for a night of style, music, and unforgettable memories at "Elegance in Disguise," hosted by MERN MATRIX CLUB! This Prom Day event is your chance to dress up, dance, and celebrate in style.',
      highlights: ['Live DJ & Dance Floor', 'Dance-Off & Ramp Walk', 'Polaroid & Selfie Booths', 'Delicious Treats & Prizes']
    },
    {
      id: 'mern-ai-hackathon',
      title: 'MERNxAI HACKATHON',
      subtitle: 'Web Development Challenge',
      date: 'March 29-30',
      time: 'Online + Offline',
      venue: 'AB1 Auditorium',
      image: '/BuildAi1.jpg',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
      icon: FaBrain,
      description: 'Showcase your web development skills and compete for paid internship opportunities! Join the MERNxAI Hackathon and build something amazing.',
      highlights: ['Paid Internship Opportunity', 'Webinar with Global Tech Leaders', 'Gift Coupons & Trophies', 'Free Lunch & Dinner']
    }
  ];

  const currentEvent = events.find(event => event.id === activeEvent);

  // Dynamic border color based on scroll position and active event
  const getDynamicBorderColor = () => {
    if (scrollY < 100) return 'border-gray-600/30';
    
    const eventIndex = events.findIndex(event => event.id === activeEvent);
    if (eventIndex === 0) return 'border-green-500/50';
    if (eventIndex === 1) return 'border-purple-500/50';
    if (eventIndex === 2) return 'border-blue-500/50';
    
    return 'border-gray-600/30';
  };

  return (
    <div className="min-h-[96vh] bg-gradient-to-b from-black via-purple-950 to-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-950/40 to-black/60"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-tl from-purple-600/15 to-transparent blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-purple-400/20 to-transparent blur-xl animate-pulse delay-2000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Header */}
      <motion.header 
        className={`fixed top-0 w-full py-3 px-4 sm:px-6 lg:px-8 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-purple-500/30' : 'bg-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
     
      </motion.header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full mb-4 border border-purple-500/30 backdrop-blur-sm"
          >
            <FaCalendarAlt className="mr-2" />
            Upcoming Events
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">EXPLORE OUR</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">EVENTS</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-[#E0E0E0] max-w-3xl mx-auto mb-6 leading-relaxed"
          >
            From hackathons to cultural events, discover exciting opportunities to learn, compete, and connect with the MERN Matrix community.
          </motion.p>
        </div>
      </section>

      {/* Event Navigation */}
      <section className="relative py-4 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-wrap gap-3 justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {events.map((event) => (
              <motion.button
                key={event.id}
                onClick={() => setActiveEvent(event.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2 rounded-xl font-medium transition-all ${
                  activeEvent === event.id 
                    ? `bg-gradient-to-r ${event.color} text-white shadow-lg shadow-${event.color.split('-')[1]}-500/30` 
                    : 'bg-purple-900/50 text-[#E0E0E0] hover:bg-purple-500/20 backdrop-blur-sm border border-purple-500/30'
                }`}
              >
                {event.title}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Event Content */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {currentEvent && (
              <motion.div
                key={currentEvent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`bg-black/30 backdrop-blur-md rounded-2xl border p-8 md:p-10 shadow-xl transition-all duration-700 ${getDynamicBorderColor()}`}
              >
                {/* Event Header */}
                <div className="grid lg:grid-cols-2 gap-10 items-center mb-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      className={`inline-flex items-center px-4 py-2 ${currentEvent.bgColor} rounded-full mb-6 border ${currentEvent.borderColor} backdrop-blur-sm`}
                    >
                      <currentEvent.icon className="mr-2" />
                      {currentEvent.subtitle}
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                      {currentEvent.title}
                    </h2>
                    
                    <p className="text-lg text-[#E0E0E0] leading-relaxed mb-6">
                      {currentEvent.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-purple-400" />
                        <span className="text-sm">{currentEvent.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-purple-400" />
                        <span className="text-sm">{currentEvent.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-purple-400" />
                        <span className="text-sm">{currentEvent.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaUsers className="text-purple-400" />
                        <span className="text-sm">Open to All</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative"
                  >
                    <div className="relative group">
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        className="relative overflow-hidden rounded-xl"
                      >
                        <Image
                          src={currentEvent.image}
                          alt={currentEvent.title}
                          width={400}
                          height={350}
                          className="w-full h-72 md:h-80 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      </motion.div>
                      
                      {/* Floating highlights */}
                      {currentEvent.id === 'dawn-of-code' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="absolute -bottom-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full shadow-lg text-sm"
                        >
                          <FaRocket className="inline mr-1" />
                          Register Now!
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Event Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6"
                >
                  <h3 className="text-xl font-bold mb-4 text-center">✨ Event Highlights</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {currentEvent.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ y: -3, scale: 1.02 }}
                        className="bg-black/50 p-3 rounded-lg border border-purple-500/30 hover:border-purple-400 transition-all text-center"
                      >
                        <div className="text-lg mb-1">🎯</div>
                        <p className="text-xs text-purple-200">{highlight}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Call to Action - Only for Dawn of Code */}
                {currentEvent.id === 'dawn-of-code' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-6 pt-4 border-t border-purple-500/30"
                  >
                    <Link href={currentEvent.link || '#'}>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/40 transition-all flex items-center gap-2 mx-auto"
                      >
                        <FaRocket className="text-lg" />
                        View Full Details
                      </motion.button>
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 sm:px-6 lg:px-8 border-t border-purple-500/30 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            className="flex justify-center gap-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {[
              { icon: <FaInstagram className="text-lg" />, color: "#E1306C" },
              { icon: <FaLinkedin className="text-lg" />, color: "#0077B5" },
              { icon: <FaDiscord className="text-lg" />, color: "#5865F2" },
              { icon: <FaTwitter className="text-lg" />, color: "#1DA1F2" }
            ].map((social, index) => (
              <motion.a 
                key={index}
                whileHover={{ scale: 1.2, y: -3, backgroundColor: social.color }}
                href="#" 
                className="p-2 rounded-full bg-purple-900/50 transition-all border border-purple-500/30 backdrop-blur-sm"
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
          <motion.p 
            className="text-[#A0A0A0] text-xs"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            © 2024 MERN Matrix Club. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default EventSection;