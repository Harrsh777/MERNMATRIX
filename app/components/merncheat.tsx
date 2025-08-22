import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCheck, FaYoutube, FaBook, FaGraduationCap, 
  FaTrophy, FaLinkedin, FaGitlab, FaArrowRight, 
  FaArrowLeft, FaRegStar, FaStar, FaRocket
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from 'react-icons/si';

// Particle Background Component
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(99,102,241,0.1) 70%, transparent 100%)',
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 30 - 15],
            y: [0, Math.random() * 30 - 15],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

// Floating Elements Component
const FloatingElements = () => {
  const icons = [SiMongodb, SiExpress, SiReact, SiNodedotjs];
  
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {icons.map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute text-white opacity-10"
          style={{
            fontSize: Math.random() * 40 + 20,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 20 - 10],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <Icon />
        </motion.div>
      ))}
    </div>
  );
};

// Glowing Orbs Component
const GlowingOrbs = () => {
  return (
    <>
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-600 rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-600 rounded-full filter blur-[100px] opacity-20 animate-pulse delay-1000"></div>
    </>
  );
};

// Stepper Component with enhanced UI
interface StepperProps {
  children: React.ReactNode;
  initialStep?: number;
}

const Stepper: React.FC<StepperProps> = ({ children, initialStep = 0 }) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const steps = React.Children.toArray(children);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setDirection(stepIndex > currentStep ? 1 : -1);
    setCurrentStep(stepIndex);
  };

  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="w-full relative">
      {/* Step Indicators */}
      <div className="flex justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#A855F7] to-[#6366F1] transform -translate-y-1/2 -z-10"></div>
        {steps.map((_, index) => (
          <motion.div 
            key={index} 
            className="flex flex-col items-center relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => goToStep(index)}
              className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 relative ${
                index <= currentStep
                  ? 'bg-gradient-to-r from-[#A855F7] to-[#6366F1] text-white shadow-lg shadow-purple-500/50'
                  : 'bg-[#2D1B5E] text-[#A0A0A0]'
              }`}
            >
              {index < currentStep ? <FaCheck /> : index + 1}
              {index === currentStep && (
                <motion.span
                  className="absolute -inset-2 rounded-full border-2 border-purple-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </button>
            <span className={`mt-2 text-sm font-medium ${index <= currentStep ? 'text-white' : 'text-[#A0A0A0]'}`}>
              Step {index + 1}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-gradient-to-b from-[#160C2E] to-[#0F0824] rounded-2xl p-6 border border-[#3A2176] min-h-[400px] relative overflow-hidden">
        <FloatingElements />
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full"
          >
            {steps[currentStep]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <motion.button
          onClick={prevStep}
          disabled={currentStep === 0}
          whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
          whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
          className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 ${
            currentStep === 0
              ? 'bg-[#2D1B5E] text-[#6D6D6D] cursor-not-allowed'
              : 'bg-gradient-to-r from-[#2D1B5E] to-[#3A2176] text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all'
          }`}
        >
          <FaArrowLeft /> Previous
        </motion.button>
        
        <div className="flex items-center gap-2">
          {steps.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goToStep(i)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-2 h-2 rounded-full ${
                i === currentStep 
                  ? 'bg-gradient-to-r from-[#A855F7] to-[#6366F1] w-4' 
                  : 'bg-[#3A2176]'
              }`}
            />
          ))}
        </div>
        
        <motion.button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          whileHover={{ scale: currentStep === steps.length - 1 ? 1 : 1.05 }}
          whileTap={{ scale: currentStep === steps.length - 1 ? 1 : 0.95 }}
          className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 ${
            currentStep === steps.length - 1
              ? 'bg-gradient-to-r from-[#A855F7] to-[#6366F1] text-white cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-[#A855F7] to-[#6366F1] text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all'
          }`}
        >
          {currentStep === steps.length - 1 ? 'Complete Journey!' : 'Next'} <FaArrowRight />
        </motion.button>
      </div>
    </div>
  );
};

type StepProps = {
  children: React.ReactNode;
};

const Step = ({ children }: StepProps) => {
  return <div className="h-full">{children}</div>;
};

// Animated Card Component
const AnimatedCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.div
      className={`bg-gradient-to-b from-[#0A0118] to-[#160C2E] p-5 rounded-xl border border-[#3A2176] shadow-lg ${className}`}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(126, 34, 206, 0.4)"
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
};

// MERN Mastery Section Component
const MERNMasterySection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A0118] to-[#1E0345] relative overflow-hidden">
      <ParticleBackground />
      <GlowingOrbs />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-[#A855F7] to-[#6366F1]">MERN Stack</span>
          </motion.h2>
          <motion.p 
            className="text-[#E0E0E0] max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            A comprehensive journey to mastering the MERN stack and unlocking opportunities at FAANG companies and Google Summer of Code.
          </motion.p>
        </motion.div>

        <motion.div 
          className="bg-[#0F0824]/50 backdrop-blur-md rounded-3xl border border-[#3A2176] p-6 md:p-8 shadow-2xl shadow-purple-900/20 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Stepper initialStep={0}>
            <Step>
              <div className="text-center py-4">
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold mb-6 flex items-center justify-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <SiMongodb className="text-green-500" /> MongoDB Fundamentals
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <AnimatedCard>
                    <h4 className="font-semibold mb-3 text-[#C084FC] flex items-center gap-2">
                      <FaRegStar /> Core Concepts
                    </h4>
                    <ul className="text-sm text-left space-y-2">
                      {['NoSQL Databases', 'Documents & Collections', 'CRUD Operations', 'Aggregation Framework'].map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <FaCheck className="text-green-500 mr-2 shrink-0" size={12} /> {item}
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                  <AnimatedCard>
                    <h4 className="font-semibold mb-3 text-[#C084FC] flex items-center gap-2">
                      <FaStar /> Advanced Topics
                    </h4>
                    <ul className="text-sm text-left space-y-2">
                      {['Indexing & Performance', 'Data Modeling', 'Transactions', 'Atlas Cloud Database'].map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <FaCheck className="text-green-500 mr-2 shrink-0" size={12} /> {item}
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                </div>
                <AnimatedCard className="mt-4">
                  <h4 className="font-semibold mb-3 text-[#C084FC]">Learning Resources</h4>
                  <div className="flex flex-wrap justify-center gap-3 mt-3">
                    <motion.a 
                      href="#" 
                      className="flex items-center text-sm px-4 py-2 bg-[#1E0345] rounded-lg hover:bg-[#2D1B5E] transition-colors border border-[#3A2176]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaYoutube className="mr-2 text-red-500" /> MongoDB Tutorials
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="flex items-center text-sm px-4 py-2 bg-[#1E0345] rounded-lg hover:bg-[#2D1B5E] transition-colors border border-[#3A2176]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaBook className="mr-2 text-blue-400" /> Official Documentation
                    </motion.a>
                  </div>
                </AnimatedCard>
              </div>
            </Step>
            
            <Step>
              <div className="text-center py-4">
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold mb-6 flex items-center justify-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <SiExpress className="text-gray-100" /> Express.js Mastery
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <AnimatedCard>
                    <h4 className="font-semibold mb-3 text-[#C084FC] flex items-center gap-2">
                      <FaRegStar /> Core Concepts
                    </h4>
                    <ul className="text-sm text-left space-y-2">
                      {['Middleware', 'Routing', 'RESTful APIs', 'Error Handling'].map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <FaCheck className="text-green-500 mr-2 shrink-0" size={12} /> {item}
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                  <AnimatedCard>
                    <h4 className="font-semibold mb-3 text-[#C084FC] flex items-center gap-2">
                      <FaStar /> Advanced Topics
                    </h4>
                    <ul className="text-sm text-left space-y-2">
                      {['Authentication (JWT)', 'Security Best Practices', 'Performance Optimization', 'Testing (Jest, Supertest)'].map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <FaCheck className="text-green-500 mr-2 shrink-0" size={12} /> {item}
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                </div>
                <AnimatedCard className="mt-4">
                  <h4 className="font-semibold mb-3 text-[#C084FC]">Learning Resources</h4>
                  <div className="flex flex-wrap justify-center gap-3 mt-3">
                    <motion.a 
                      href="#" 
                      className="flex items-center text-sm px-4 py-2 bg-[#1E0345] rounded-lg hover:bg-[#2D1B5E] transition-colors border border-[#3A2176]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaYoutube className="mr-2 text-red-500" /> Express.js Crash Course
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="flex items-center text-sm px-4 py-2 bg-[#1E0345] rounded-lg hover:bg-[#2D1B5E] transition-colors border border-[#3A2176]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaBook className="mr-2 text-blue-400" /> Express Guide
                    </motion.a>
                  </div>
                </AnimatedCard>
              </div>
            </Step>
            
            <Step>
              <div className="text-center py-4">
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold mb-6 flex items-center justify-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <SiReact className="text-blue-400" /> React.js Expertise
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <AnimatedCard>
                    <h4 className="font-semibold mb-3 text-[#C084FC] flex items-center gap-2">
                      <FaRegStar /> Core Concepts
                    </h4>
                    <ul className="text-sm text-left space-y-2">
                      {['Components & JSX', 'State & Props', 'Hooks', 'Event Handling'].map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <FaCheck className="text-green-500 mr-2 shrink-0" size={12} /> {item}
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                  <AnimatedCard>
                    <h4 className="font-semibold mb-3 text-[#C084FC] flex items-center gap-2">
                      <FaStar /> Advanced Topics
                    </h4>
                    <ul className="text-sm text-left space-y-2">
                      {['Context API', 'Redux & State Management', 'Custom Hooks', 'Performance Optimization'].map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <FaCheck className="text-green-500 mr-2 shrink-0" size={12} /> {item}
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                </div>
                <AnimatedCard className="mt-4">
                  <h4 className="font-semibold mb-3 text-[#C084FC]">Learning Resources</h4>
                  <div className="flex flex-wrap justify-center gap-3 mt-3">
                    <motion.a 
                      href="#" 
                      className="flex items-center text-sm px-4 py-2 bg-[#1E0345] rounded-lg hover:bg-[#2D1B5E] transition-colors border border-[#3A2176]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaYoutube className="mr-2 text-red-500" /> React Tutorial
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="flex items-center text-sm px-4 py-2 bg-[#1E0345] rounded-lg hover:bg-[#2D1B5E] transition-colors border border-[#3A2176]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaBook className="mr-2 text-blue-400" /> React Documentation
                    </motion.a>
                  </div>
                </AnimatedCard>
              </div>
            </Step>
            
            <Step>
              <div className="text-center py-4">
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold mb-6 flex items-center justify-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <SiNodedotjs className="text-green-500" /> Node.js Proficiency
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <AnimatedCard>
                    <h4 className="font-semibold mb-3 text-[#C084FC] flex items-center gap-2">
                      <FaRegStar /> Core Concepts
                    </h4>
                    <ul className="text-sm text-left space-y-2">
                      {['Event Loop', 'Modules System', 'File System Operations', 'NPM & Package Management'].map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <FaCheck className="text-green-500 mr-2 shrink-0" size={12} /> {item}
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                  <AnimatedCard>
                    <h4 className="font-semibold mb-3 text-[#C084FC] flex items-center gap-2">
                      <FaStar /> Advanced Topics
                    </h4>
                    <ul className="text-sm text-left space-y-2">
                      {['Streams & Buffers', 'Child Processes', 'Cluster Module', 'Debugging & Profiling'].map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <FaCheck className="text-green-500 mr-2 shrink-0" size={12} /> {item}
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                </div>
                <AnimatedCard className="mt-4">
                  <h4 className="font-semibold mb-3 text-[#C084FC]">Learning Resources</h4>
                  <div className="flex flex-wrap justify-center gap-3 mt-3">
                    <motion.a 
                      href="#" 
                      className="flex items-center text-sm px-4 py-2 bg-[#1E0345] rounded-lg hover:bg-[#2D1B5E] transition-colors border border-[#3A2176]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaYoutube className="mr-2 text-red-500" /> Node.js Tutorials
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="flex items-center text-sm px-4 py-2 bg-[#1E0345] rounded-lg hover:bg-[#2D1B5E] transition-colors border border-[#3A2176]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaBook className="mr-2 text-blue-400" /> Node.js Guides
                    </motion.a>
                  </div>
                </AnimatedCard>
              </div>
            </Step>
            
            <Step>
              <div className="text-center py-4">
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  🚀 FAANG & GSoC Preparation
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <AnimatedCard>
                    <div className="flex items-center mb-3">
                      <FaTrophy className="text-yellow-500 mr-2" size={20} />
                      <h4 className="font-semibold text-[#C084FC]">FAANG Opportunities</h4>
                    </div>
                    <ul className="text-sm text-left space-y-2">
                      {[
                        "MERN stack is widely used in tech industry",
                        "Full-stack developers are in high demand",
                        "Build portfolio projects that showcase your skills",
                        "Practice system design and algorithms",
                        "Contribute to open source projects"
                      ].map((item, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          • {item}
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                  <AnimatedCard>
                    <div className="flex items-center mb-3">
                      <FaGraduationCap className="text-blue-400 mr-2" size={20} />
                      <h4 className="font-semibold text-[#C084FC]">GSoC Advantages</h4>
                    </div>
                    <ul className="text-sm text-left space-y-2">
                      {[
                        "Many organizations use MERN stack",
                        "JavaScript/TypeScript is common in GSoC projects",
                        "Experience with full-stack development is valuable",
                        "Showcase your MERN projects in applications",
                        "Understanding of APIs and database design is crucial"
                      ].map((item, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          • {item}
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                </div>
                <AnimatedCard className="mt-4">
                  <h4 className="font-semibold mb-3 text-[#C084FC]">Next Steps</h4>
                  <div className="flex flex-wrap justify-center gap-3">
                    <motion.a 
                      href="#" 
                      className="flex items-center text-sm px-4 py-2 bg-gradient-to-r from-[#A855F7] to-[#6366F1] rounded-lg text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaLinkedin className="mr-2" /> LinkedIn Profile Tips
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="flex items-center text-sm px-4 py-2 bg-gradient-to-r from-[#A855F7] to-[#6366F1] rounded-lg text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGitlab className="mr-2" /> Portfolio Project Ideas
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="flex items-center text-sm px-4 py-2 bg-gradient-to-r from-[#A855F7] to-[#6366F1] rounded-lg text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaBook className="mr-2" /> Interview Preparation
                    </motion.a>
                  </div>
                </AnimatedCard>
              </div>
            </Step>
          </Stepper>
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Master MERN?</h3>
          <p className="text-[#E0E0E0] max-w-2xl mx-auto mb-6 text-lg">
            Join our community of developers and get access to exclusive resources, mentorship, and project opportunities.
          </p>
          <motion.button 
            className="px-8 py-4 bg-gradient-to-r from-[#C084FC] to-[#A855F7] text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-purple-500/30 transition-all flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRocket /> Join MERN Matrix Club
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default MERNMasterySection;