'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

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
}

export default function IdeationPage() {
  const [formData, setFormData] = useState<IdeaFormData>({
    teamNumber: '',
    teamName: '',
    teamLeaderName: '',
    projectIdea: ''
  });
  
  const [wordCount, setWordCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.teamNumber || !formData.teamName || !formData.teamLeaderName || !formData.projectIdea) {
      setMessage({ text: 'Please fill all fields', type: 'error' });
      return;
    }
    
    if (wordCount > 300) {
      setMessage({ text: 'Project idea must be 300 words or less', type: 'error' });
      return;
    }
    
    setShowConfirmation(true);
  };

  const confirmSubmission = async () => {
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
            word_count: wordCount
          }
        ])
        .select();
      
      if (error) {
        throw error;
      }
      
      setMessage({ 
        text: 'Project idea submitted successfully!', 
        type: 'success' 
      });
      
      // Reset form
      setFormData({
        teamNumber: '',
        teamName: '',
        teamLeaderName: '',
        projectIdea: ''
      });
      setWordCount(0);
      setShowConfirmation(false);
      
    } catch (error: any) {
      setMessage({ 
        text: `Error submitting idea: ${error.message}`, 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelSubmission = () => {
    setShowConfirmation(false);
    setMessage({ text: '', type: '' });
  };

  // Animation classes for transitions
  const inputBaseClasses = "mt-2 block w-full px-4 py-3 rounded-lg bg-gray-800 border border-purple-700/30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 text-white placeholder-purple-300/50 transition-all duration-300";
  const labelClasses = "block text-sm font-medium text-purple-300 mb-1";
  const buttonBaseClasses = "w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg";
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-950 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-purple-700/30 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-900/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                Project Idea Submission
              </h1>
              <p className="text-purple-300/70">Share your innovative idea with us</p>
            </div>
            
            {message.text && (
              <div className={`mb-6 p-4 rounded-lg border ${
                message.type === 'error' 
                  ? 'bg-red-900/20 text-red-200 border-red-700/50' 
                  : 'bg-green-900/20 text-green-200 border-green-700/50'
              } transition-all duration-500 ${isMounted ? 'animate-fadeIn' : 'opacity-0'}`}>
                <div className="flex items-center">
                  <span className={`mr-3 text-lg ${message.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                    {message.type === 'error' ? '⚠️' : '✅'}
                  </span>
                  <span>{message.text}</span>
                </div>
              </div>
            )}
            
            {!showConfirmation ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="teamNumber" className={labelClasses}>
                    Team Number *
                  </label>
                  <input
                    type="number"
                    id="teamNumber"
                    name="teamNumber"
                    value={formData.teamNumber}
                    onChange={handleInputChange}
                    className={inputBaseClasses}
                    required
                    min="1"
                    placeholder="Enter your team number"
                  />
                </div>
                
                <div>
                  <label htmlFor="teamName" className={labelClasses}>
                    Team Name *
                  </label>
                  <input
                    type="text"
                    id="teamName"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleInputChange}
                    className={inputBaseClasses}
                    required
                    placeholder="Enter your team name"
                  />
                </div>
                
                <div>
                  <label htmlFor="teamLeaderName" className={labelClasses}>
                    Team Leader Name *
                  </label>
                  <input
                    type="text"
                    id="teamLeaderName"
                    name="teamLeaderName"
                    value={formData.teamLeaderName}
                    onChange={handleInputChange}
                    className={inputBaseClasses}
                    required
                    placeholder="Enter team leader's name"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="projectIdea" className={labelClasses}>
                      Project Idea * (Max 300 words)
                    </label>
                    <span className={`text-xs font-medium ${wordCount > 300 ? 'text-red-400' : 'text-purple-400'}`}>
                      {wordCount}/300 words
                    </span>
                  </div>
                  <textarea
                    id="projectIdea"
                    name="projectIdea"
                    rows={6}
                    value={formData.projectIdea}
                    onChange={handleInputChange}
                    className={`${inputBaseClasses} resize-none`}
                    required
                    maxLength={2000} // Approximate character limit for 300 words
                    placeholder="Describe your innovative project idea in 300 words or less..."
                  />
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        wordCount > 300 ? 'bg-red-500' : 
                        wordCount > 200 ? 'bg-purple-500' : 
                        wordCount > 100 ? 'bg-purple-400' : 'bg-purple-300'
                      }`}
                      style={{ width: `${Math.min(100, (wordCount / 300) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={wordCount > 300 || isSubmitting}
                  className={`${buttonBaseClasses} ${
                    wordCount > 300 || isSubmitting
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    'Submit Idea ✨'
                  )}
                </button>
              </form>
            ) : (
              <div className={`text-center p-4 bg-gray-800/50 rounded-xl border border-purple-700/30 backdrop-blur-sm ${isMounted ? 'animate-fadeIn' : 'opacity-0'}`}>
                <div className="mb-2 text-purple-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-purple-300 mb-4">
                  Confirm Submission
                </h2>
                
                <div className="bg-gray-900/60 p-5 rounded-xl mb-6 text-left space-y-3">
                  <div className="flex">
                    <span className="text-purple-400 font-medium w-32">Team Number:</span>
                    <span className="text-white">{formData.teamNumber}</span>
                  </div>
                  <div className="flex">
                    <span className="text-purple-400 font-medium w-32">Team Name:</span>
                    <span className="text-white">{formData.teamName}</span>
                  </div>
                  <div className="flex">
                    <span className="text-purple-400 font-medium w-32">Team Leader:</span>
                    <span className="text-white">{formData.teamLeaderName}</span>
                  </div>
                  <div className="flex">
                    <span className="text-purple-400 font-medium w-32">Word Count:</span>
                    <span className={`font-medium ${wordCount > 300 ? 'text-red-400' : 'text-green-400'}`}>
                      {wordCount}/300
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-purple-400 font-medium mb-2">Project Idea:</p>
                    <p className="text-white text-sm bg-gray-800/40 p-3 rounded-lg max-h-40 overflow-y-auto">
                      {formData.projectIdea}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={cancelSubmission}
                    disabled={isSubmitting}
                    className={`${buttonBaseClasses} w-32 bg-gray-700 text-white hover:bg-gray-600 border border-gray-600`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmSubmission}
                    disabled={isSubmitting}
                    className={`${buttonBaseClasses} w-32 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      </div>
                    ) : (
                      'Confirm'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center mt-6 text-purple-300/50 text-sm">
          <p>Your innovative ideas shape the future</p>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        /* Custom scrollbar */
        textarea::-webkit-scrollbar {
          width: 6px;
        }
        textarea::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.1);
          border-radius: 3px;
        }
        textarea::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 3px;
        }
        textarea::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
}