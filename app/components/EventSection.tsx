"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaUsers, FaImage, FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';

const EventsSection = () => {
  const events = [
    {
      id: 1,
      title: "DANCE",
      subtitle: "Rhythm Revolution",
      description: "Our annual dance showcase brought together the best urban dance crews for an electrifying night of movement and music. Participants enjoyed workshops and an open dance competition.",
      date: "November 15, 2023",
      attendees: "240+",
      images: [
        "https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      color: "#A020F0"
    },
    {
      id: 2,
      title: "BUILDAIENGINE",
      subtitle: "Future of AI Development",
      description: "A hands-on workshop where participants built their own AI engines from scratch. Covered neural networks, machine learning pipelines, and deployment strategies with industry experts.",
      date: "December 3-5, 2023",
      attendees: "180+",
      images: [
        "https://images.unsplash.com/photo-1677442135135-416f8aa26a5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1573164713714-d95e436ab290?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      color: "#00FFFF"
    },
    {
      id: 3,
      title: "DAWN OF HACKATHON",
      subtitle: "24-Hour Coding Marathon",
      description: "Our flagship hackathon event brought together developers, designers, and innovators to build solutions for real-world problems. With mentors from top tech companies and exciting prizes, participants pushed their limits in this round-the-clock coding challenge.",
      date: "January 20-21, 2024",
      attendees: "300+",
      images: [
        "https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      color: "#FF5757"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate every 5 seconds only when not hovered
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [events.length, isHovered]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#0A0118] to-[#1E0345] overflow-hidden">
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-purple-600 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-cyan-500 blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-[#FF5757] blur-3xl animate-ping-slow"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, ${i % 3 === 0 ? '#A020F0' : i % 3 === 1 ? '#00FFFF' : '#FF5757'}20, transparent)`,
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block px-4 py-2 text-sm font-semibold text-[#A020F0] bg-[#A020F0]/10 rounded-full mb-4 border border-[#00FFFF]/20"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 15px rgba(160, 32, 240, 0.5)"
            }}
          >
            PAST EVENTS
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A020F0] to-[#00FFFF]">Community</span> Highlights
          </h2>
          <p className="text-lg text-[#E0E0E0] max-w-2xl mx-auto">
            Relive the unforgettable moments from our most popular events
          </p>
        </motion.div>

        <div 
          className="relative h-[650px] md:h-[700px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.4 }
              }}
              className="absolute inset-0"
            >
              <div className="bg-gradient-to-br from-[#0A0118]/90 via-[#0A0118]/80 to-[#1E0345]/90 backdrop-blur-md rounded-2xl overflow-hidden border border-[#1E0345] hover:border-[#A020F0]/40 transition-all duration-500 h-full flex flex-col shadow-2xl shadow-purple-900/20">
                <div className="relative h-72 md:h-80 flex-shrink-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                  <div className="absolute bottom-6 left-6 z-20">
                    <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">{events[currentIndex].title}</h3>
                    <p className="text-[#00FFFF] text-lg md:text-xl mt-1 font-medium drop-shadow-md">{events[currentIndex].subtitle}</p>
                  </div>
                  <div className="absolute top-4 right-4 z-20">
                    <motion.div 
                      className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: events[currentIndex].color }}
                      whileHover={{ scale: 1.05 }}
                    >
                      Featured Event
                    </motion.div>
                  </div>
                  <div className="w-full h-full bg-gray-800 relative">
                    <Image 
                      src={events[currentIndex].images[0]} 
                      alt={events[currentIndex].title}
                      fill
                      className="object-cover opacity-90"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    />
                  </div>
                </div>

                <div className="p-6 md:p-8 flex-grow flex flex-col">
                  <p className="text-[#E0E0E0] mb-6 flex-grow text-lg leading-relaxed">{events[currentIndex].description}</p>
                  
                  <div className="flex flex-wrap gap-6 text-md text-[#C0C0C0] mb-6">
                    <div className="flex items-center gap-3 bg-[#0A0118]/50 px-4 py-2 rounded-lg border border-[#1E0345]">
                      <FaCalendarAlt className="text-[#A020F0] text-lg" />
                      <span>{events[currentIndex].date}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-[#0A0118]/50 px-4 py-2 rounded-lg border border-[#1E0345]">
                      <FaUsers className="text-[#00FFFF] text-lg" />
                      <span>{events[currentIndex].attendees} attendees</span>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-auto">
                    {events[currentIndex].images.slice(0, 2).map((img, imgIndex) => (
                      <motion.div
                        key={imgIndex}
                        whileHover={{ scale: 1.05 }}
                        className="relative h-36 w-36 md:h-44 md:w-44 rounded-xl overflow-hidden border-2 border-[#1E0345] flex-shrink-0 group"
                      >
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <FaExternalLinkAlt className="text-xl" />
                        </div>
                        <div className="w-full h-full bg-gray-800 relative">
                          <Image 
                            src={img} 
                            alt={`${events[currentIndex].title} ${imgIndex + 1}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 20vw, 15vw"
                          />
                        </div>
                      </motion.div>
                    ))}
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center justify-center h-36 w-36 md:h-44 md:w-44 rounded-xl border-2 border-dashed border-[#1E0345] text-[#C0C0C0] hover:text-[#A020F0] hover:border-[#A020F0] transition-colors flex-shrink-0"
                    >
                      <div className="text-center">
                        <FaImage className="text-3xl mx-auto mb-2" />
                        <span className="text-sm">View More</span>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(160, 32, 240, 0.3)" }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#0A0118]/90 backdrop-blur-md p-4 rounded-full shadow-lg z-20 border border-[#00FFFF]/30 hover:border-[#A020F0] transition-colors"
            aria-label="Previous event"
          >
            <FaChevronLeft className="text-white text-xl" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(160, 32, 240, 0.3)" }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#0A0118]/90 backdrop-blur-md p-4 rounded-full shadow-lg z-20 border border-[#00FFFF]/30 hover:border-[#A020F0] transition-colors"
            aria-label="Next event"
          >
            <FaChevronRight className="text-white text-xl" />
          </motion.button>
        </div>

        {/* Event indicators */}
        <div className="flex justify-center gap-3 mt-10">
          {events.map((event, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              whileHover={{ scale: 1.2 }}
              className={`h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-[#A020F0]' : 'w-3 bg-[#1E0345] hover:bg-[#00FFFF]'}`}
              aria-label={`Go to ${event.title} event`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;