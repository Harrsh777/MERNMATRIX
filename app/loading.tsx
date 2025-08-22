"use client"
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const MERNLoadingPage = () => {
  const [isVisible, setIsVisible] = useState(true);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Animation variants for logos
  const logoVariants = {
    hidden: (direction: string) => ({
      opacity: 0,
      scale: 0.3,
      x: direction === 'left' ? -400 : direction === 'right' ? 400 : 0,
      y: direction === 'top' ? -400 : direction === 'bottom' ? 400 : 0,
      rotate: direction === 'left' ? -15 : direction === 'right' ? 15 : 0,
    }),
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        duration: 1.5,
      }
    },
    hover: {
      scale: 1.15,
      rotate: 5,
      transition: {
        duration: 0.3,
      }
    }
  };

  // Text animation variants
  const textVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        delay: 2.5,
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-10 blur-3xl animate-pulse hidden sm:block" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-5 blur-3xl animate-pulse hidden sm:block" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo container */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 mb-12 px-4">
          {/* MongoDB Logo */}
          <motion.div
            custom="left"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
              <Image
                src="/MongoDB.svg"
                alt="MongoDB"
                width={112}
                height={112}
                className="w-full h-full drop-shadow-lg"
              />
            </div>
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 tracking-wide"
            >
              M
            </motion.div>
          </motion.div>

          {/* Express Logo */}
          <motion.div
            custom="bottom"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
              <Image
                src="/Express.svg"
                alt="Express"
                width={112}
                height={112}
                className="w-full h-full drop-shadow-lg"
              />
            </div>
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 tracking-wide"
            >
              E
            </motion.div>
          </motion.div>

          {/* React Logo */}
          <motion.div
            custom="top"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
              <Image
                src="/React.svg"
                alt="React"
                width={112}
                height={112}
                className="w-full h-full drop-shadow-lg"
              />
            </div>
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-500 tracking-wide"
            >
              R
            </motion.div>
          </motion.div>

          {/* Node.js Logo */}
          <motion.div
            custom="right"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
              <Image
                src="/Node.svg"
                alt="Node.js"
                width={112}
                height={112}
                className="w-full h-full drop-shadow-lg"
              />
            </div>
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 tracking-wide"
            >
              N
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MERNLoadingPage;