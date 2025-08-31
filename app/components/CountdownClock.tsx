"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

interface CountdownClockProps {
  onTimeUp: () => void;
}

export default function CountdownClock({ onTimeUp }: CountdownClockProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Get tomorrow at 9:00 AM
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(9, 0, 0, 0);
      
      const now = new Date();
      const difference = tomorrow.getTime() - now.getTime();

      if (difference <= 0) {
        setIsTimeUp(true);
        onTimeUp();
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / DAY),
        hours: Math.floor((difference % DAY) / HOUR),
        minutes: Math.floor((difference % HOUR) / MINUTE),
        seconds: Math.floor((difference % MINUTE) / SECOND)
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  if (isTimeUp) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Registration Opens Tomorrow
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Get ready to join the MERN Matrix Hackathon!
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
          <CountdownItem unit="Day" label="Days" value={timeLeft.days} />
          <CountdownItem unit="Hour" label="Hours" value={timeLeft.hours} />
          <CountdownItem unit="Minute" label="Minutes" value={timeLeft.minutes} />
          <CountdownItem unit="Second" label="Seconds" value={timeLeft.seconds} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-xl backdrop-blur-sm">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-medium">Registration will be available at 9:00 AM tomorrow</span>
          </div>
        </motion.div>

        {/* Bypass Button for Testing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8"
        >
          <button
            onClick={() => onTimeUp()}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 border border-red-500/30 shadow-lg"
          >
            🚀 Bypass Countdown (Testing Only)
          </button>
          <p className="text-xs text-gray-500 mt-2">Click this button to test the registration form</p>
        </motion.div>

        {/* Floating particles background */}
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
              style={{
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + (i % 2),
                repeat: Infinity,
                delay: (i * 0.1) % 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CountdownItem({ unit, label, value }: { unit: string; label: string; value: number }) {
  const display = unit === "Second" || unit === "Minute" ? String(value).padStart(2, '0') : value;

  return (
    <motion.div
      key={`${unit}-${value}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-2 px-4 py-6 md:gap-3 md:py-8"
    >
      <div className="relative w-full overflow-hidden text-center">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="block text-3xl font-mono font-bold text-white md:text-5xl lg:text-7xl"
        >
          {display}
        </motion.span>
      </div>
      <span className="text-sm font-light text-gray-400 md:text-base lg:text-lg transition-colors duration-500">
        {label}
      </span>
      <div className="h-px w-full bg-gray-700 mt-4 transition-colors duration-500"></div>
    </motion.div>
  );
}
