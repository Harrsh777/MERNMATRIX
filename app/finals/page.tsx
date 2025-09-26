"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Award, Star, Crown, Sparkles, Zap, Flame } from "lucide-react";

const winners = [
  {
    position: 1,
    teamName: "The Eighteens",
    rank: "1st Place",
    color: "from-yellow-400 via-yellow-500 to-yellow-600",
    bgColor: "from-yellow-500/20 to-yellow-600/10",
    borderColor: "border-yellow-400/50",
    icon: Crown,
    glowColor: "shadow-yellow-500/50",
    description: "Champions of Innovation"
  },
  {
    position: 2,
    teamName: "F3",
    rank: "2nd Place",
    color: "from-gray-300 via-gray-400 to-gray-500",
    bgColor: "from-gray-400/20 to-gray-500/10",
    borderColor: "border-gray-400/50",
    icon: Medal,
    glowColor: "shadow-gray-400/50",
    description: "Excellence in Execution"
  },
  {
    position: 3,
    teamName: "Code Quest",
    rank: "3rd Place",
    color: "from-amber-600 via-amber-700 to-amber-800",
    bgColor: "from-amber-600/20 to-amber-700/10",
    borderColor: "border-amber-600/50",
    icon: Award,
    glowColor: "shadow-amber-600/50",
    description: "Outstanding Achievement"
  }
];

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

function Confetti() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'][Math.floor(Math.random() * 5)]
          }}
          animate={{
            y: [0, -200],
            x: [0, Math.random() * 200 - 100],
            rotate: [0, 360],
            opacity: [1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

function WinnerCard({ winner, index }: { winner: typeof winners[0]; index: number }) {
  const IconComponent = winner.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.3 + 1,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: { duration: 0.3 }
      }}
      className={`
        relative group overflow-hidden rounded-3xl p-8 md:p-12
        bg-gradient-to-br ${winner.bgColor}
        border-2 ${winner.borderColor}
        shadow-2xl ${winner.glowColor}
        backdrop-blur-xl
        ${index === 0 ? 'md:scale-110 z-10' : ''}
      `}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
        />
      </div>

      {/* Glow effect */}
      <motion.div
        animate={{
          boxShadow: [
            `0 0 20px ${winner.glowColor.split('/')[0]}/30`,
            `0 0 40px ${winner.glowColor.split('/')[0]}/50`,
            `0 0 20px ${winner.glowColor.split('/')[0]}/30`
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 rounded-3xl"
      />

      <div className="relative z-10 text-center">
        {/* Position Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.3 + 1.2, type: "spring", stiffness: 200 }}
          className={`
            inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20
            rounded-full bg-gradient-to-br ${winner.color}
            text-white font-bold text-xl md:text-2xl
            shadow-lg ${winner.glowColor}
            mb-6
          `}
        >
          {winner.position}
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.3 + 1.4, type: "spring", stiffness: 100 }}
          className="mb-6"
        >
          <IconComponent 
            className={`w-16 h-16 md:w-20 md:h-20 mx-auto text-transparent bg-gradient-to-br ${winner.color} bg-clip-text`} 
          />
        </motion.div>

        {/* Team Name */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.3 + 1.6 }}
          className={`
            text-3xl md:text-5xl font-bold mb-4
            bg-gradient-to-br ${winner.color} bg-clip-text text-transparent
            drop-shadow-lg
          `}
        >
          {winner.teamName}
        </motion.h3>

        {/* Rank */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.3 + 1.8 }}
          className="text-lg md:text-xl text-white/80 font-semibold mb-2"
        >
          {winner.rank}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.3 + 2.0 }}
          className="text-sm md:text-base text-white/60 italic"
        >
          {winner.description}
        </motion.p>

        {/* Decorative elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-4 right-4 opacity-20"
        >
          <Star className="w-6 h-6 text-white" />
        </motion.div>
        
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-4 left-4 opacity-20"
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function FinalsPage() {
  const [mounted, setMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Delay showing results for dramatic effect
    const timer = setTimeout(() => setShowResults(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        
        {/* Animated orbs */}
        <motion.div 
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -left-40 w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-[120px]"
        />
        <motion.div 
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-40 -right-40 w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-[140px]"
        />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Confetti */}
      {showResults && <Confetti />}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <AnimatePresence>
          {!showResults ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <motion.div
                animate={{
                  textShadow: ['0 0 0px rgba(168,85,247,0)', '0 0 20px rgba(168,85,247,0.4)', '0 0 0px rgba(168,85,247,0)']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
                className="mb-8"
              >
                <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
                  DAWN OF CODE
                </h1>
                <p className="text-2xl md:text-3xl text-white/80 font-light">
                  Hackathon Results
                </p>
              </motion.div>
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto border-4 border-purple-500/30 border-t-purple-500 rounded-full"
              />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-6xl"
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-center mb-16"
              >
                <motion.div
                  animate={{
                    textShadow: ['0 0 0px rgba(168,85,247,0)', '0 0 30px rgba(168,85,247,0.4)', '0 0 0px rgba(168,85,247,0)']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                  className="mb-6"
                >
                  <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
                    🏆 RESULTS DECLARED 🏆
                  </h1>
                  <p className="text-xl md:text-2xl text-white/80 font-light">
                    Congratulations to all participants!
                  </p>
                </motion.div>
              </motion.div>

              {/* Winners Podium */}
              <div className="grid md:grid-cols-3 gap-8 items-end">
                {winners.map((winner, index) => (
                  <WinnerCard key={winner.teamName} winner={winner} index={index} />
                ))}
              </div>

              {/* Celebration Message */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.8 }}
                className="text-center mt-16"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                  className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8 shadow-2xl"
                >
                  <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
                    🎉 Congratulations! 🎉
                  </h3>
                  <p className="text-lg text-white/80 leading-relaxed">
                    Thank you to all the brilliant minds who participated in Dawn of Code Hackathon. 
                    Your innovation, creativity, and dedication have made this event truly remarkable. 
                    Keep coding, keep innovating, and keep pushing the boundaries of what's possible!
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}