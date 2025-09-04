'use client';

import { useState, useEffect, useCallback } from 'react';

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUpload, FaLink, FaUsers, FaLightbulb, FaCheckCircle, FaArrowRight, FaArrowLeft, FaFilePowerpoint, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { Clock, CountdownTimer } from '@/components/ui/clock';

// Create Supabase client lazily to avoid build-time env access
const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
};

interface IdeaFormData {
  teamNumber: string;
  teamName: string;
  teamLeaderName: string;
  projectIdea: string;
  pptLink?: string;
}

export default function IdeationPage() {
  const [formData, setFormData] = useState<IdeaFormData>({
    teamNumber: '',
    teamName: '',
    teamLeaderName: '',
    projectIdea: '',
    pptLink: ''
  });
  
  const [wordCount, setWordCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isMounted, setIsMounted] = useState(false);
  const [pageState, setPageState] = useState<'initial-countdown' | 'form' | 'registration-closed'>('initial-countdown');

  // State logic for September 4th with automatic form closure
  const getCurrentState = useCallback(() => {
    const now = new Date();
    
    // September 4th, 2025 times
    const registrationStart = new Date('2025-09-04T14:30:00'); // 2:30 PM
    const registrationEnd = new Date('2025-09-04T23:59:00');   // 11:59 PM
    
    if (now < registrationStart) {
      return 'initial-countdown' as const;
    } else if (now < registrationEnd) {
      return 'form' as const;
    } else {
      return 'registration-closed' as const;
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    
    // Initial state check
    setPageState(getCurrentState());
    
    // Set up interval for state updates - checks every second
    const interval = setInterval(() => {
      const newState = getCurrentState();
      setPageState(newState);
      
      // If form is closed, clear the interval to stop checking
      if (newState === 'registration-closed') {
        clearInterval(interval);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [getCurrentState]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'projectIdea') {
      const words = value.trim().split(/\s+/);
      const currentWordCount = value === '' ? 0 : words.length;
      setWordCount(currentWordCount);
      
      if (currentWordCount > 300) {
        return; // Don't update if over limit
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep1 = () => {
    if (!formData.teamNumber || !formData.teamName || !formData.teamLeaderName) {
      setMessage({ text: 'Please fill all required fields', type: 'error' });
      return false;
    }
    setMessage({ text: '', type: '' });
    return true;
  };

  const validateStep2 = () => {
    if (!formData.projectIdea) {
      setMessage({ text: 'Please describe your project idea', type: 'error' });
      return false;
    }
    
    if (wordCount > 300) {
      setMessage({ text: 'Project idea must be 300 words or less', type: 'error' });
      return false;
    }
    
    setMessage({ text: '', type: '' });
    return true;
  };

  const nextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      setMessage({ text: '', type: '' });
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
    setMessage({ text: '', type: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }
    
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });
    
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
      }

      const { data, error } = await supabase
        .from('project_ideas')
        .insert([
          {
            team_number: parseInt(formData.teamNumber),
            team_name: formData.teamName,
            team_leader_name: formData.teamLeaderName,
            project_idea: formData.projectIdea,
            ppt_link: formData.pptLink || null,
            word_count: wordCount
          }
        ])
        .select();
      
      if (error) {
        throw error;
      }
      
      setMessage({ 
        text: 'Success! Your form has been submitted 🎉', 
        type: 'success' 
      });
      
      // Reset form and go back to step 1
      setTimeout(() => {
      setFormData({
        teamNumber: '',
        teamName: '',
        teamLeaderName: '',
          projectIdea: '',
          pptLink: ''
      });
      setWordCount(0);
        setCurrentStep(1);
        setMessage({ text: '', type: '' });
      }, 3000);
      
    } catch (error: any) {
      setMessage({ 
        text: `Error submitting idea: ${error.message}`, 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, title: 'Team Details', icon: FaUsers, description: 'Basic team information' },
    { id: 2, title: 'Project Idea', icon: FaLightbulb, description: 'Describe your innovative idea' }
  ];

  // Simple Clock Display Component
  const CountdownDisplay = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Simplified Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <motion.div
            animate={{
              boxShadow: ['0 0 0px rgba(168,85,247,0)', '0 0 30px rgba(168,85,247,0.4)', '0 0 0px rgba(168,85,247,0)']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className="inline-block p-6 rounded-full bg-purple-600/20 border border-purple-500/40 mb-8"
          >
            <FaClock className="text-5xl text-purple-400" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-purple-200/80 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 shadow-2xl"
        >
          <div className="flex justify-center items-center">
            <CountdownTimer targetDate={new Date('2025-09-04T14:30:00')} size="large" />
          </div>
        </motion.div>
      </div>
    </div>
  );

  // Registration Closed Component
  const RegistrationClosed = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center p-4">
      {/* Simplified Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          {/* Crying Jordan Meme */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <img 
              src="https://www.newyorker.com/sports/sporting-scene/how-air-jordan-became-crying-jordan" 
              alt="Crying Jordan Meme"
              className="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full border-4 border-red-500/30 shadow-2xl"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.style.display = 'none';
              }}
            />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-red-600 mb-6">
            You've reached the finish line!
          </h1>
          <p className="text-lg md:text-xl text-red-200/80 max-w-2xl mx-auto leading-relaxed">
            Unfortunately, the race ended while you were tying your shoes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-red-500/20 shadow-2xl"
        >
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🏁</div>
            <p className="text-red-200 text-lg">
              The idea submission deadline was <span className="font-bold text-white">11:59 PM on September 4th</span>.
            </p>
            <p className="text-gray-300">
              Better luck next time! Keep those innovative ideas coming for future opportunities.
            </p>
            <div className="pt-4">
              <p className="text-sm text-gray-400">
                "The race is not always to the swift, but to those who keep running." 🏃‍♂️
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  // Render based on page state
  if (pageState === 'initial-countdown') {
  return (
      <CountdownDisplay 
        title="Registration Opens Soon" 
        subtitle="Get ready to submit your innovative project idea at 2:30 PM"
      />
    );
  }

  if (pageState === 'registration-closed') {
    return <RegistrationClosed />;
  }

  // Main Form Page with Registration Deadline Countdown
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>
            
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Countdown Timer Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/30 shadow-2xl"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-orange-300 mb-4">
              ⏰ Registration Closes at 11:59 PM on September 4th
            </h2>
            <div className="flex justify-center items-center">
              <CountdownTimer targetDate={new Date('2025-09-04T23:59:00')} size="small" />
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              boxShadow: ['0 0 0px rgba(168,85,247,0)', '0 0 20px rgba(168,85,247,0.3)', '0 0 0px rgba(168,85,247,0)']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className="inline-block p-4 rounded-full bg-purple-600/20 border border-purple-500/30 mb-6"
          >
            <FaLightbulb className="text-4xl text-purple-400" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-4">
            Project Ideation
          </h1>
          <p className="text-xl text-purple-200/80 max-w-2xl mx-auto">
            Share your innovative project idea and take the first step towards building something amazing
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className={`flex items-center justify-center w-16 h-16 rounded-full border-2 transition-all duration-500 ${
                    currentStep >= step.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent text-white shadow-lg shadow-purple-500/25'
                      : 'bg-gray-800/50 border-gray-600 text-gray-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <step.icon className="text-xl" />
                </motion.div>
                <div className="ml-4">
                  <h3 className={`font-semibold text-lg ${
                    currentStep >= step.id ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm ${
                    currentStep >= step.id ? 'text-purple-200' : 'text-gray-500'
                  }`}>
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 transition-all duration-500 ${
                    currentStep > step.id ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Message Display */}
        <AnimatePresence>
            {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`mb-8 p-6 rounded-2xl border backdrop-blur-sm ${
                message.type === 'error' 
                  ? 'bg-red-900/20 text-red-200 border-red-700/50 shadow-lg shadow-red-500/10' 
                  : 'bg-green-900/20 text-green-200 border-green-700/50 shadow-lg shadow-green-500/10'
              }`}
            >
              <div className="flex items-center justify-center">
                <span className={`mr-3 text-2xl ${message.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                    {message.type === 'error' ? '⚠️' : '✅'}
                  </span>
                <span className="text-lg font-medium">{message.text}</span>
                </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gray-800/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-500/20 relative overflow-hidden"
        >
          {/* Form Background Elements */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {currentStep === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Team Information</h2>
                    <p className="text-purple-200/70">Let's start with your team details</p>
              </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="teamNumber" className="block text-sm font-semibold text-purple-200">
                    Team Number *
                  </label>
                  <input
                    type="number"
                    id="teamNumber"
                    name="teamNumber"
                    value={formData.teamNumber}
                    onChange={handleInputChange}
                        className="w-full px-4 py-4 rounded-xl bg-gray-700/50 border border-purple-500/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 text-white placeholder-purple-300/50 transition-all duration-300"
                    required
                    min="1"
                        placeholder="Enter team number"
                  />
                </div>
                
                    <div className="space-y-2">
                      <label htmlFor="teamName" className="block text-sm font-semibold text-purple-200">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    id="teamName"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleInputChange}
                        className="w-full px-4 py-4 rounded-xl bg-gray-700/50 border border-purple-500/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 text-white placeholder-purple-300/50 transition-all duration-300"
                    required
                        placeholder="Enter team name"
                  />
                    </div>
                </div>
                
                  <div className="space-y-2">
                    <label htmlFor="teamLeaderName" className="block text-sm font-semibold text-purple-200">
                    Team Leader Name *
                  </label>
                  <input
                    type="text"
                    id="teamLeaderName"
                    name="teamLeaderName"
                    value={formData.teamLeaderName}
                    onChange={handleInputChange}
                      className="w-full px-4 py-4 rounded-xl bg-gray-700/50 border border-purple-500/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 text-white placeholder-purple-300/50 transition-all duration-300"
                    required
                    placeholder="Enter team leader's name"
                  />
                </div>
                
                  <div className="space-y-2">
                    <label htmlFor="pptLink" className="block text-sm font-semibold text-purple-200">
                      <FaFilePowerpoint className="inline mr-2 text-blue-400" />
                      PPT Link (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        id="pptLink"
                        name="pptLink"
                        value={formData.pptLink}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 pl-12 rounded-xl bg-gray-700/50 border border-purple-500/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 text-white placeholder-purple-300/50 transition-all duration-300"
                        placeholder="https://drive.google.com/... or any presentation link"
                      />
                      <FaLink className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
                    </div>
                    <p className="text-xs text-purple-300/60">Share your presentation link if you have one prepared</p>
                  </div>

                  <motion.button
                    onClick={nextStep}
                    whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(168, 85, 247, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 px-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:from-purple-700 hover:to-pink-700 shadow-lg"
                  >
                    Next Step <FaArrowRight />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Project Idea</h2>
                    <p className="text-purple-200/70">Describe your innovative project in detail</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label htmlFor="projectIdea" className="block text-lg font-semibold text-purple-200">
                        Project Description *
                    </label>
                      <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                        wordCount > 300 ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        wordCount > 200 ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                        wordCount > 100 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                      }`}>
                      {wordCount}/300 words
                      </div>
                  </div>
                    
                  <textarea
                    id="projectIdea"
                    name="projectIdea"
                      rows={8}
                    value={formData.projectIdea}
                    onChange={handleInputChange}
                      className="w-full px-6 py-6 rounded-xl bg-gray-700/50 border border-purple-500/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 text-white placeholder-purple-300/50 transition-all duration-300 resize-none text-lg leading-relaxed"
                    required
                      maxLength={2000}
                      placeholder="Describe your innovative project idea in detail... What problem does it solve? What makes it unique? What technologies will you use?"
                    />
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                      <motion.div 
                        className={`h-3 rounded-full transition-all duration-700 ${
                          wordCount > 300 ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                          wordCount > 200 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 
                          wordCount > 100 ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 
                          'bg-gradient-to-r from-gray-400 to-gray-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (wordCount / 300) * 100)}%` }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      />
                  </div>
                </div>
                
                  <div className="flex gap-4">
                    <motion.button
                      onClick={prevStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-4 px-8 bg-gray-700/50 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:bg-gray-600/50 border border-gray-600/50"
                    >
                      <FaArrowLeft /> Previous
                    </motion.button>
                    
                    <motion.button
                      onClick={handleSubmit}
                  disabled={wordCount > 300 || isSubmitting}
                      whileHover={{ scale: wordCount > 300 || isSubmitting ? 1 : 1.02, boxShadow: wordCount > 300 || isSubmitting ? 'none' : '0 10px 25px rgba(168, 85, 247, 0.3)' }}
                      whileTap={{ scale: wordCount > 300 || isSubmitting ? 1 : 0.98 }}
                      className={`flex-1 py-4 px-8 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                    wordCount > 300 || isSubmitting
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Submitting...
                        </>
                      ) : (
                        <>
                          <FaCheckCircle /> Submit Idea
                        </>
                      )}
                    </motion.button>
                </div>
                </motion.div>
              )}
            </AnimatePresence>
                  </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12 text-purple-300/50"
        >
          <p className="text-lg">Your innovative ideas shape the future of technology ✨</p>
        </motion.div>
        </div>
    </div>
  );
}