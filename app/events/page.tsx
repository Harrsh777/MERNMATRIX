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

const EventsPage: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState<string>('dawn-of-code');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
      image: '/deployx.png',
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
      image: '/Dance.jpg',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
      icon: FaMusic,
      description: 'Get ready for a night of style, music, and unforgettable memories at "Elegance in Disguise," hosted by MERN MATRIX CLUB! This Prom Day event is your chance to dress up, dance, and celebrate in style.',
      highlights: ['Live DJ & Dance Floor', 'Dance-Off & Ramp Walk', 'Polaroid & Selfie Booths', 'Delicious Treats & Prizes'],
      features: [
        { icon: FaMusic, text: 'Live DJ & Open Dance Floor – Groove to electrifying beats!' },
        { icon: FaUserFriends, text: 'Dance-Off & Ramp Walk – Show off your moves & walk the runway.' },
        { icon: FaCamera, text: 'Polaroid & Selfie Booths – Capture your best moments.' },
        { icon: FaUtensils, text: 'Delicious Treats & Drinks – Enjoy tasty refreshments.' },
        { icon: FaGift, text: 'Exciting Prizes & Souvenirs – Win exclusive rewards!' }
      ],
      dressCode: {
        gents: 'Formal/semi-formal with a classy touch',
        ladies: 'Elegant & stylish attire'
      }
    },
    {
      id: 'mern-ai-hackathon',
      title: 'MERNxAI HACKATHON',
      subtitle: 'Web Development Challenge',
      date: 'March 29-30',
      time: 'Online + Offline',
      venue: 'AB1 Auditorium',
      image: '/plotify.png',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
      icon: FaBrain,
      description: 'Showcase your web development skills and compete for paid internship opportunities! Join the MERNxAI Hackathon and build something amazing.',
      highlights: ['Paid Internship Opportunity', 'Webinar with Global Tech Leaders', 'Gift Coupons & Trophies', 'Free Lunch & Dinner'],
      schedule: [
        { day: 'March 29 (Online Round)', time: '9:00 AM – 8:00 PM', event: 'Ideation & Shortlisting' },
        { day: 'March 30 (Offline Round)', time: '8:30 AM – 8:00 PM', event: 'Main Hackathon at AB1 Auditorium' },
        { day: 'April 1st', time: 'TBD', event: 'Prize Distribution Ceremony' }
      ],
      details: {
        teamSize: '2 to 5 members',
        registrationFee: '₹100 per person'
      }
    }
  ];

  const currentEvent = events.find(event => event.id === activeEvent);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0A0118] to-[#1E0345] text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-[#0A0118]/30 to-[#1E0345]/40"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-green-500/10 to-transparent blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-tl from-purple-500/15 to-transparent blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-blue-400/20 to-transparent blur-xl animate-pulse delay-2000"></div>
        
        {/* Grid pattern */}
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
            Upcoming Events
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">EXPLORE OUR</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">EVENTS</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#E0E0E0] max-w-4xl mx-auto mb-8 leading-relaxed"
          >
            From hackathons to cultural events, discover exciting opportunities to learn, compete, and connect with the MERN Matrix community.
          </motion.p>
        </div>
      </section>

      {/* Event Navigation */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-wrap gap-4 justify-center mb-12"
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
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeEvent === event.id 
                    ? `bg-gradient-to-r ${event.color} text-white shadow-lg shadow-${event.color.split('-')[1]}-500/30` 
                    : 'bg-[#1E0345] text-[#E0E0E0] hover:bg-green-500/20 backdrop-blur-sm border border-green-500/30'
                }`}
              >
                {event.title}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Event Content */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {currentEvent && (
              <motion.div
                key={currentEvent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-[#0A0118]/50 backdrop-blur-md rounded-3xl border border-green-500/30 p-8 md:p-12 shadow-xl shadow-green-500/10"
              >
                {/* Event Header */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
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
                        <FaCalendarAlt className="text-green-400" />
                        <span className="text-sm">{currentEvent.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-green-400" />
                        <span className="text-sm">{currentEvent.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-green-400" />
                        <span className="text-sm">{currentEvent.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaUsers className="text-green-400" />
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
                        className="relative overflow-hidden rounded-2xl"
                      >
                        <Image
                          src={currentEvent.image}
                          alt={currentEvent.title}
                          width={500}
                          height={400}
                          className="w-full h-80 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      </motion.div>
                      
                      {/* Floating highlights */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg"
                      >
                        <FaRocket className="inline mr-2" />
                        Register Now!
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Event Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-12"
                >
                  <h3 className="text-2xl font-bold mb-6 text-center">✨ Event Highlights</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {currentEvent.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-[#0A0118] p-4 rounded-xl border border-green-500/30 hover:border-green-400 transition-all text-center"
                      >
                        <div className="text-2xl mb-2">🎯</div>
                        <p className="text-sm text-green-200">{highlight}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Event Specific Content */}
                {currentEvent.id === 'elegance-disguise' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-8"
                  >
                    {/* Features */}
                    <div>
                      <h3 className="text-2xl font-bold mb-6 text-center">🎭 Event Features</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {currentEvent.features?.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            whileHover={{ x: 5 }}
                            className="bg-[#0A0118] p-4 rounded-xl border border-purple-500/30 hover:border-purple-400 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <feature.icon className="text-2xl text-purple-400" />
                              <span className="text-[#E0E0E0]">{feature.text}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Dress Code */}
                    <div>
                      <h3 className="text-2xl font-bold mb-6 text-center">👔 Dress Code: Mysteriously Glamorous</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="bg-[#0A0118] p-6 rounded-xl border border-purple-500/30 hover:border-purple-400 transition-all"
                        >
                          <h4 className="text-xl font-bold mb-3 text-purple-400 flex items-center gap-2">
                            <FaUserTie className="text-2xl" />
                            Gents
                          </h4>
                          <p className="text-[#E0E0E0]">{currentEvent.dressCode?.gents}</p>
                        </motion.div>
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="bg-[#0A0118] p-6 rounded-xl border border-purple-500/30 hover:border-purple-400 transition-all"
                        >
                                                     <h4 className="text-xl font-bold mb-3 text-pink-400 flex items-center gap-2">
                             <FaUserFriends className="text-2xl" />
                             Ladies
                           </h4>
                          <p className="text-[#E0E0E0]">{currentEvent.dressCode?.ladies}</p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentEvent.id === 'mern-ai-hackathon' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-8"
                  >
                    {/* Schedule */}
                    <div>
                      <h3 className="text-2xl font-bold mb-6 text-center">📅 Event Schedule</h3>
                      <div className="space-y-4">
                        {currentEvent.schedule?.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            whileHover={{ x: 5 }}
                            className="bg-[#0A0118] p-6 rounded-xl border border-blue-500/30 hover:border-blue-400 transition-all"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-32 text-blue-400 font-medium text-sm">{item.day}</div>
                              <div className="flex-grow">
                                <h3 className="font-bold text-white text-lg">{item.event}</h3>
                                <p className="text-sm text-blue-300 font-medium">{item.time}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Details */}
                    <div>
                      <h3 className="text-2xl font-bold mb-6 text-center">📋 Event Details</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="bg-[#0A0118] p-6 rounded-xl border border-blue-500/30 hover:border-blue-400 transition-all"
                        >
                          <h4 className="text-xl font-bold mb-3 text-blue-400 flex items-center gap-2">
                            <FaUsers className="text-2xl" />
                            Team Size
                          </h4>
                          <p className="text-[#E0E0E0] text-lg">{currentEvent.details?.teamSize}</p>
                        </motion.div>
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="bg-[#0A0118] p-6 rounded-xl border border-blue-500/30 hover:border-blue-400 transition-all"
                        >
                          <h4 className="text-xl font-bold mb-3 text-blue-400 flex items-center gap-2">
                            <FaMoneyBillWave className="text-2xl" />
                            Registration Fee
                          </h4>
                          <p className="text-[#E0E0E0] text-lg">{currentEvent.details?.registrationFee}</p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center mt-12 pt-8 border-t border-green-500/30"
                >
                  {currentEvent.id === 'dawn-of-code' ? (
                                         <Link href={currentEvent.link || '#'}>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/40 transition-all flex items-center gap-2 mx-auto"
                      >
                        <FaRocket className="text-lg" />
                        View Full Details
                      </motion.button>
                    </Link>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/40 transition-all flex items-center gap-2"
                    >
                      <FaRocket className="text-lg" />
                      Register Now
                    </motion.button>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
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
              { icon: <FaInstagram className="text-xl" />, color: "#E1306C" },
              { icon: <FaLinkedin className="text-xl" />, color: "#0077B5" },
              { icon: <FaDiscord className="text-xl" />, color: "#5865F2" },
              { icon: <FaTwitter className="text-xl" />, color: "#1DA1F2" }
            ].map((social, index) => (
              <motion.a 
                key={index}
                whileHover={{ scale: 1.2, y: -5, backgroundColor: social.color }}
                href="#" 
                className="p-3 rounded-full bg-[#1E0345] transition-all border border-green-500/30 backdrop-blur-sm"
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
            © 2024 MERN Matrix Club. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default EventsPage;