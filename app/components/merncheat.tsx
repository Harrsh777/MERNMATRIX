import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  FaCheck, FaYoutube, FaBook, FaGraduationCap, 
  FaTrophy, FaLinkedin, FaGitlab, FaArrowRight, 
  FaArrowLeft, FaRegStar, FaStar, FaRocket,
  FaCode, FaDatabase, FaServer, FaLaptopCode,
  FaLightbulb, FaUsers, FaGlobe, FaShieldAlt
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

// Enhanced Particle Background with better performance
const ParticleBackground = () => {
  const particles = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 30,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 5
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(99,102,241,0.08) 70%, transparent 100%)',
            width: particle.size,
            height: particle.size,
            top: `${particle.y}%`,
            left: `${particle.x}%`,
          }}
          animate={{
            x: [0, Math.random() * 40 - 20],
            y: [0, Math.random() * 40 - 20],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Floating Elements with better performance
const FloatingElements = () => {
  const icons = useMemo(() => [
    { Icon: SiMongodb, color: 'text-green-400', delay: 0 },
    { Icon: SiExpress, color: 'text-gray-300', delay: 1 },
    { Icon: SiReact, color: 'text-blue-400', delay: 2 },
    { Icon: SiNodedotjs, color: 'text-green-500', delay: 3 },
    { Icon: SiTypescript, color: 'text-blue-500', delay: 4 },
    { Icon: SiTailwindcss, color: 'text-cyan-400', delay: 5 }
  ], []);
  
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {icons.map(({ Icon, color, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute ${color} opacity-20`}
          style={{
            fontSize: Math.random() * 50 + 30,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 30 - 15],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: Math.random() * 15 + 20,
            delay: delay * 0.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        >
          <Icon />
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced Glowing Orbs with better animations
const GlowingOrbs = () => {
  return (
    <>
      <motion.div 
        className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full filter blur-[120px]"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full filter blur-[120px]"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.2, 0.3]
        }}
        transition={{ 
          duration: 4, 
          delay: 2,
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
    </>
  );
};

// Enhanced Stepper Component with better UX
interface StepperProps {
  children: React.ReactNode;
  initialStep?: number;
}

const Stepper: React.FC<StepperProps> = ({ children, initialStep = 0 }) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const steps = React.Children.toArray(children);
  
  const progress = useMotionValue(currentStep / (steps.length - 1));
  const progressSpring = useSpring(progress, { stiffness: 100, damping: 20 });

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((stepIndex: number) => {
    setDirection(stepIndex > currentStep ? 1 : -1);
    setCurrentStep(stepIndex);
  }, [currentStep]);

  useEffect(() => {
    progress.set(currentStep / (steps.length - 1));
  }, [currentStep, steps.length, progress]);

  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 400 : -400,
      opacity: 0,
      scale: 0.8
    })
  };

  return (
    <div className="w-full relative">
      {/* Enhanced Step Indicators */}
      <div className="flex justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-800 rounded-full transform -translate-y-1/2 -z-10 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
            style={{ width: progressSpring.get() * 100 + '%' }}
          />
        </div>
        {steps.map((_, index) => (
          <motion.div 
            key={index} 
            className="flex flex-col items-center relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => goToStep(index)}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 relative ${
                index <= currentStep
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-2xl shadow-purple-500/50'
                  : 'bg-gray-800 text-gray-400 border-2 border-gray-700'
              }`}
            >
              {index < currentStep ? <FaCheck /> : index + 1}
              {index === currentStep && (
                <motion.span
                  className="absolute -inset-3 rounded-full border-2 border-purple-400"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </button>
            <motion.span 
              className={`mt-3 text-sm font-medium transition-colors duration-300 ${
                index <= currentStep ? 'text-white' : 'text-gray-500'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {getStepTitle(index)}
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Step Content */}
      <div className="bg-gradient-to-b from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 min-h-[500px] relative overflow-hidden shadow-2xl">
        <FloatingElements />
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.6
            }}
            className="h-full"
          >
            {steps[currentStep]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced Navigation */}
      <div className="flex justify-between items-center mt-10">
        <motion.button
          onClick={prevStep}
          disabled={currentStep === 0}
          whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
          whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
          className={`px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 transition-all duration-300 ${
            currentStep === 0
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105'
          }`}
        >
          <FaArrowLeft /> Previous
        </motion.button>
        
        <div className="flex items-center gap-3">
          {steps.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goToStep(i)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentStep 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-6 scale-125' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
        
        <motion.button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          whileHover={{ scale: currentStep === steps.length - 1 ? 1 : 1.05 }}
          whileTap={{ scale: currentStep === steps.length - 1 ? 1 : 0.95 }}
          className={`px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 transition-all duration-300 ${
            currentStep === steps.length - 1
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105'
          }`}
        >
          {currentStep === steps.length - 1 ? 'Complete Journey!' : 'Next'} <FaArrowRight />
        </motion.button>
      </div>
    </div>
  );
};

// Helper function for step titles
const getStepTitle = (index: number) => {
  const titles = ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Career Prep'];
  return titles[index] || `Step ${index + 1}`;
};

type StepProps = {
  children: React.ReactNode;
};

const Step = ({ children }: StepProps) => {
  return <div className="h-full">{children}</div>;
};

// Enhanced Animated Card Component
const AnimatedCard = ({ children, className = "", icon, title }: { 
  children: React.ReactNode, 
  className?: string,
  icon?: React.ReactNode,
  title?: string
}) => {
  return (
    <motion.div
      className={`bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-6 rounded-2xl border border-purple-500/20 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 ${className}`}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        borderColor: 'rgba(168, 85, 247, 0.4)'
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {icon && title && (
        <div className="flex items-center gap-3 mb-4">
          <div className="text-2xl text-purple-400">{icon}</div>
          <h4 className="font-semibold text-purple-300 text-lg">{title}</h4>
        </div>
      )}
      {children}
    </motion.div>
  );
};

// Enhanced MERN Mastery Section Component
const MERNMasterySection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-purple-950 to-gray-900 relative overflow-hidden min-h-screen">
      <ParticleBackground />
      <GlowingOrbs />
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-4 border border-purple-500/30">
              <FaCode className="text-4xl text-purple-400 mx-auto" />
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">MERN Stack</span>
          </motion.h2>
          
          <motion.p 
            className="text-purple-100/90 max-w-3xl mx-auto text-xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Embark on a comprehensive journey to mastering the MERN stack and unlocking opportunities at FAANG companies and Google Summer of Code.
          </motion.p>
        </motion.div>

        <motion.div 
          className="bg-gray-900/40 backdrop-blur-xl rounded-3xl border border-purple-500/20 p-8 md:p-10 shadow-2xl shadow-purple-900/20 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Stepper initialStep={0}>
            <Step>
              <div className="text-center py-6">
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold mb-8 flex items-center justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-green-500/20 p-3 rounded-2xl">
                    <SiMongodb className="text-green-400 text-4xl" />
                  </div>
                  MongoDB Fundamentals
                </motion.h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <AnimatedCard icon={<FaRegStar />} title="Core Concepts">
                    <ul className="text-left space-y-3">
                      {[
                        'NoSQL Database Architecture',
                        'Documents & Collections',
                        'CRUD Operations Mastery',
                        'Aggregation Framework',
                        'Indexing Strategies'
                      ].map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-center text-gray-200"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                        >
                          <FaCheck className="text-green-400 mr-3 shrink-0" size={14} /> 
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                  
                  <AnimatedCard icon={<FaStar />} title="Advanced Topics">
                    <ul className="text-left space-y-3">
                      {[
                        'Performance Optimization',
                        'Data Modeling Patterns',
                        'Transaction Management',
                        'Atlas Cloud Database',
                        'Security Best Practices'
                      ].map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-center text-gray-200"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                        >
                          <FaCheck className="text-green-400 mr-3 shrink-0" size={14} /> 
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                </div>
                
                <AnimatedCard className="mt-6" icon={<FaBook />} title="Learning Resources">
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    <motion.a 
                      href="#" 
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl hover:bg-red-500/30 transition-all border border-red-500/30 hover:border-red-400/50"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaYoutube className="mr-3 text-red-400" /> MongoDB Tutorials
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl hover:bg-blue-500/30 transition-all border border-blue-500/30 hover:border-blue-400/50"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaBook className="mr-3 text-blue-400" /> Official Documentation
                    </motion.a>
                  </div>
                </AnimatedCard>
              </div>
            </Step>
            
            <Step>
              <div className="text-center py-6">
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold mb-8 flex items-center justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-gray-500/20 p-3 rounded-2xl">
                    <SiExpress className="text-gray-300 text-4xl" />
                  </div>
                  Express.js Mastery
                </motion.h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <AnimatedCard icon={<FaRegStar />} title="Core Concepts">
                    <ul className="text-left space-y-3">
                      {[
                        'Middleware Architecture',
                        'Routing & Controllers',
                        'RESTful API Design',
                        'Error Handling',
                        'Request Validation'
                      ].map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-center text-gray-200"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                        >
                          <FaCheck className="text-green-400 mr-3 shrink-0" size={14} /> 
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                  
                  <AnimatedCard icon={<FaStar />} title="Advanced Topics">
                    <ul className="text-left space-y-3">
                      {[
                        'JWT Authentication',
                        'Security Best Practices',
                        'Performance Optimization',
                        'Testing with Jest',
                        'API Documentation'
                      ].map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-center text-gray-200"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                        >
                          <FaCheck className="text-green-400 mr-3 shrink-0" size={14} /> 
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                </div>
                
                <AnimatedCard className="mt-6" icon={<FaBook />} title="Learning Resources">
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    <motion.a 
                      href="#" 
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl hover:bg-red-500/30 transition-all border border-red-500/30 hover:border-red-400/50"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaYoutube className="mr-3 text-red-400" /> Express.js Crash Course
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl hover:bg-blue-500/30 transition-all border border-blue-500/30 hover:border-blue-400/50"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaBook className="mr-3 text-blue-400" /> Express Guide
                    </motion.a>
                  </div>
                </AnimatedCard>
              </div>
            </Step>
            
            <Step>
              <div className="text-center py-6">
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold mb-8 flex items-center justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-blue-500/20 p-3 rounded-2xl">
                    <SiReact className="text-blue-400 text-4xl" />
                  </div>
                  React.js Expertise
                </motion.h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <AnimatedCard icon={<FaRegStar />} title="Core Concepts">
                    <ul className="text-left space-y-3">
                      {[
                        'Components & JSX',
                        'State & Props Management',
                        'Hooks (useState, useEffect)',
                        'Event Handling',
                        'Conditional Rendering'
                      ].map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-center text-gray-200"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                        >
                          <FaCheck className="text-green-400 mr-3 shrink-0" size={14} /> 
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                  
                  <AnimatedCard icon={<FaStar />} title="Advanced Topics">
                    <ul className="text-left space-y-3">
                      {[
                        'Context API & Redux',
                        'Custom Hooks',
                        'Performance Optimization',
                        'Testing with Jest',
                        'TypeScript Integration'
                      ].map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-center text-gray-200"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                        >
                          <FaCheck className="text-green-400 mr-3 shrink-0" size={14} /> 
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                </div>
                
                <AnimatedCard className="mt-6" icon={<FaBook />} title="Learning Resources">
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    <motion.a 
                      href="#" 
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl hover:bg-red-500/30 transition-all border border-red-500/30 hover:border-red-400/50"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaYoutube className="mr-3 text-red-400" /> React Tutorial
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl hover:bg-blue-500/30 transition-all border border-blue-500/30 hover:border-blue-400/50"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaBook className="mr-3 text-blue-400" /> React Documentation
                    </motion.a>
                  </div>
                </AnimatedCard>
              </div>
            </Step>
            
            <Step>
              <div className="text-center py-6">
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold mb-8 flex items-center justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-green-500/20 p-3 rounded-2xl">
                    <SiNodedotjs className="text-green-500 text-4xl" />
                  </div>
                  Node.js Proficiency
                </motion.h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <AnimatedCard icon={<FaRegStar />} title="Core Concepts">
                    <ul className="text-left space-y-3">
                      {[
                        'Event Loop Architecture',
                        'Modules System',
                        'File System Operations',
                        'NPM & Package Management',
                        'Asynchronous Programming'
                      ].map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-center text-gray-200"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                        >
                          <FaCheck className="text-green-400 mr-3 shrink-0" size={14} /> 
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                  
                  <AnimatedCard icon={<FaStar />} title="Advanced Topics">
                    <ul className="text-left space-y-3">
                      {[
                        'Streams & Buffers',
                        'Child Processes',
                        'Cluster Module',
                        'Debugging & Profiling',
                        'Performance Optimization'
                      ].map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-center text-gray-200"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                        >
                          <FaCheck className="text-green-400 mr-3 shrink-0" size={14} /> 
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                </div>
                
                <AnimatedCard className="mt-6" icon={<FaBook />} title="Learning Resources">
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    <motion.a 
                      href="#" 
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl hover:bg-red-500/30 transition-all border border-red-500/30 hover:border-red-400/50"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaYoutube className="mr-3 text-red-400" /> Node.js Tutorials
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl hover:bg-blue-500/30 transition-all border border-blue-500/30 hover:border-blue-400/50"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaBook className="mr-3 text-blue-400" /> Node.js Guides
                    </motion.a>
                  </div>
                </AnimatedCard>
              </div>
            </Step>
            
            <Step>
              <div className="text-center py-6">
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold mb-8 flex items-center justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-3 rounded-2xl">
                    <FaRocket className="text-yellow-400 text-4xl" />
                  </div>
                  🚀 FAANG & GSoC Preparation
                </motion.h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <AnimatedCard icon={<FaTrophy />} title="FAANG Opportunities">
                    <ul className="text-left space-y-3">
                      {[
                        "MERN stack is widely used in tech industry",
                        "Full-stack developers are in high demand",
                        "Build portfolio projects that showcase your skills",
                        "Practice system design and algorithms",
                        "Contribute to open source projects"
                      ].map((item, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-center text-gray-200"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                        >
                          <FaLightbulb className="text-yellow-400 mr-3 shrink-0" size={14} /> 
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                  
                  <AnimatedCard icon={<FaGraduationCap />} title="GSoC Advantages">
                    <ul className="text-left space-y-3">
                      {[
                        "Many organizations use MERN stack",
                        "JavaScript/TypeScript is common in GSoC projects",
                        "Experience with full-stack development is valuable",
                        "Showcase your MERN projects in applications",
                        "Understanding of APIs and database design is crucial"
                      ].map((item, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-center text-gray-200"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                        >
                          <FaUsers className="text-blue-400 mr-3 shrink-0" size={14} /> 
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                </div>
                
                <AnimatedCard className="mt-6" icon={<FaGlobe />} title="Next Steps">
                  <div className="flex flex-wrap justify-center gap-4">
                    <motion.a 
                      href="#" 
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl hover:bg-blue-500/30 transition-all border border-blue-500/30 hover:border-blue-400/50"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaLinkedin className="mr-3 text-blue-400" /> LinkedIn Profile Tips
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-xl hover:bg-orange-500/30 transition-all border border-orange-500/30 hover:border-orange-400/50"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGitlab className="mr-3 text-orange-400" /> Portfolio Project Ideas
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl hover:bg-green-500/30 transition-all border border-green-500/30 hover:border-green-400/50"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaBook className="mr-3 text-green-400" /> Interview Preparation
                    </motion.a>
                  </div>
                </AnimatedCard>
              </div>
            </Step>
          </Stepper>
        </motion.div>

        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="inline-block mb-8"
          >
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-6 border border-purple-500/30">
              <FaShieldAlt className="text-5xl text-purple-400 mx-auto" />
            </div>
          </motion.div>
          
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Master MERN?</h3>
          <p className="text-purple-100/90 max-w-3xl mx-auto mb-8 text-xl leading-relaxed">
            Join our community of developers and get access to exclusive resources, mentorship, and project opportunities.
          </p>
          <motion.button 
            className="px-10 py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all flex items-center gap-3 mx-auto group"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRocket className="group-hover:animate-bounce" /> Join MERN Matrix Club
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default MERNMasterySection;