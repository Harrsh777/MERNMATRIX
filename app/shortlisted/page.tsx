'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Trophy, Star, Users, Award, ChevronDown, Filter, Sparkles, Database, AlertTriangle, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

// Cleaned team data with duplicates removed
const teamData = [
  { rank: 1, teamName: "Ctrl Alt Elite", leader: "Paarth Juneja", score: 10, category: "Healthcare AI" },
  { rank: 2, teamName: "Error 404", leader: "Kanak Garg", score: 9.5, category: "Healthcare AI" },
  { rank: 3, teamName: "Innov_B", leader: "Debaditya Dasgupta", score: 9, category: "IoT Healthcare" },
  { rank: 4, teamName: "AgroCult", leader: "Vaibhav Jaiswal", score: 9, category: "Agriculture" },
  { rank: 5, teamName: "VinshAI", leader: "Naman Gyanchandani", score: 8.5, category: "Education" },
  { rank: 6, teamName: "KnowHub (Xanthium)", leader: "Shrishti Singh", score: 8.5, category: "Knowledge Management" },
  { rank: 7, teamName: "Knowverse (Æegris)", leader: "Om Rathod", score: 8.5, category: "Knowledge Management" },
  { rank: 8, teamName: "Sudarshan (MyStic Trio)", leader: "Amit Kumar", score: 8.5, category: "Cybersecurity" },
  { rank: 9, teamName: "VeriFake (Bolshacks)", leader: "Ayush Yadav", score: 8.5, category: "AI Security" },
  { rank: 10, teamName: "Next Dawn", leader: "Aroosh Datta", score: 8, category: "Cloud Computing" },
  { rank: 11, teamName: "CircuitBhai (GullyCoders)", leader: "Himanshu Singh", score: 8, category: "E-Waste" },
  { rank: 12, teamName: "JEEVICA (UpsideDown)", leader: "Akshat Singh", score: 8, category: "Healthcare" },
  { rank: 13, teamName: "MediVault (QodX)", leader: "Karthikeya A S S V", score: 8, category: "Healthcare" },
  { rank: 14, teamName: "Setu (BugHiBug)", leader: "Mridul Jaiswal", score: 8, category: "Blockchain" },
  { rank: 15, teamName: "Genix", leader: "Khushi Roy", score: 8, category: "Education" },
  { rank: 16, teamName: "FarmyTech (Pseudo Coders)", leader: "Shubh Gupta", score: 8, category: "Agriculture" },
  { rank: 17, teamName: "AgriNext (Code Blooded)", leader: "Anmol Tiwari", score: 8, category: "Agriculture" },
  { rank: 18, teamName: "SafetyFirst (Umbrella)", leader: "Harsh Ratnaparkhe", score: 7.5, category: "Cybersecurity" },
  { rank: 19, teamName: "CyberShield (Spark Plug)", leader: "Rajvee Das", score: 7.5, category: "Cybersecurity" },
  { rank: 20, teamName: "ClearFunds (IMPROVECTS)", leader: "Dev Nagpal", score: 7.5, category: "Transparency" },
  { rank: 21, teamName: "Treat Now (Active learners)", leader: "Anmol Panjwani", score: 7.5, category: "Healthcare" },
  { rank: 22, teamName: "UpScale (CodeStorm)", leader: "Prachi Gupta", score: 7.5, category: "Education" },
  { rank: 23, teamName: "Code Catalyst", leader: "Harsimran Singh G.", score: 7.5, category: "Education" },
  { rank: 24, teamName: "REeco (Byte bandits)", leader: "Nishika Deshmukh", score: 7.5, category: "E-Waste" },
  { rank: 25, teamName: "ReNew Tech (React Racoons)", leader: "Neevan Nigam", score: 7.5, category: "E-Waste" },
  { rank: 26, teamName: "DumpMyWaste (CodeMonk)", leader: "Bikash Kumar", score: 7, category: "E-Waste" },
  { rank: 27, teamName: "Clario Space (Logical layers)", leader: "Mohammad Aans", score: 7, category: "Education" },
  { rank: 28, teamName: "Codecatalyst", leader: "Suraj Paatel", score: 7, category: "Education" },
  { rank: 29, teamName: "Why-Φ's Fault", leader: "Subham Roy", score: 7, category: "Agriculture" },
  { rank: 30, teamName: "Lazy Brains", leader: "Arav Gupta", score: 7, category: "E-Waste" },
  { rank: 31, teamName: "Visionary", leader: "Khushboo Khator", score: 7, category: "IoT" },
  { rank: 32, teamName: "ShaktiMaan", leader: "Ansh Singh", score: 7, category: "Agriculture" },
  { rank: 33, teamName: "Kabhi Khushi Kabhi Gham", leader: "Nilay Gurdasani", score: 7, category: "Education" },
  { rank: 34, teamName: "MediSphere (The Orders)", leader: "Hitesh Choudhary", score: 7, category: "Healthcare" },
  { rank: 35, teamName: "AURA (CODING SPARTANS)", leader: "Mathesh Chand K V", score: 7, category: "Healthcare" },
  { rank: 36, teamName: "VeriScope (ExpressOPS)", leader: "Prateek Sharma", score: 7, category: "AI Security" },
  { rank: 37, teamName: "Ioticax (MethXai)", leader: "Aniket Kumar", score: 7, category: "IoT" },
  { rank: 38, teamName: "Potato Coders", leader: "Jhalak Sahgal", score: 7, category: "Cybersecurity" },
  { rank: 39, teamName: "Cryptoxis", leader: "Siya Sanjit Sawant Dessai", score: 7, category: "Cybersecurity" },
  { rank: 40, teamName: "AgriNova (HackOps)", leader: "Saumya Dwivedi", score: 7, category: "Agriculture" },
  { rank: 41, teamName: "coffee-codes", leader: "vatsala das", score: 7, category: "E-Waste" },
  { rank: 42, teamName: "CURARE (Git Gud)", leader: "Suryansh Vatsaa T.", score: 7, category: "Healthcare" },
  { rank: 43, teamName: "E-Waste Solution Hub (Infinite Binary)", leader: "Jain Aditya R.", score: 7, category: "E-Waste" },
  { rank: 44, teamName: "Pixi.Lib (Tesseract)", leader: "Deeksha Kaushal", score: 7, category: "Education" },
  { rank: 45, teamName: "ScrapE (The Hackenings)", leader: "Navya Jain", score: 7, category: "E-Waste" },
  { rank: 46, teamName: "CodeStorm", leader: "Hemanshu M", score: 6.5, category: "Education" },
  { rank: 47, teamName: "Smart Garden Mgmt System (The Eighteens)", leader: "Prashant Dubey", score: 6.5, category: "IoT" },
  { rank: 48, teamName: "ExtiGuard (Tech Jam)", leader: "Yash Jadhav", score: 6.5, category: "Cybersecurity" },
  { rank: 49, teamName: "3VP", leader: "Vinayak Singh", score: 6.5, category: "Healthcare" },
  { rank: 50, teamName: "Smarter Knowledge Sharing (Infinite_loopers_)", leader: "Ritesh Singh S.", score: 6.5, category: "Knowledge Management" },
  { rank: 51, teamName: "FinTrust (THE OPTIMIZERS)", leader: "Raghav Gupta", score: 6.5, category: "Blockchain" },
  { rank: 52, teamName: "SAHYOG (Noob Hackers)", leader: "P Rakshitha", score: 6.5, category: "Agriculture" },
  { rank: 53, teamName: "ThinkMesh (CodeV)", leader: "Abhinav Upadhyay", score: 6.5, category: "Knowledge Management" },
  { rank: 54, teamName: "NetLive (codersdon'tcry)", leader: "Amey Chopde", score: 6.5, category: "Developer Tools" },
  { rank: 55, teamName: "AgriCycle (KarmiX)", leader: "Vaibhav Pandey", score: 6.5, category: "Agriculture" },
  { rank: 56, teamName: "PromptHub (The Golus)", leader: "Astha Lodhi", score: 6.5, category: "AI Tools" },
  { rank: 57, teamName: "TrustChain (Code Quest)", leader: "Kripa Mehndiratta", score: 6.5, category: "Blockchain" },
  { rank: 58, teamName: "Safio (Aloo Paratha)", leader: "Gurkirat Singh D.", score: 6.5, category: "Cybersecurity" },
  { rank: 59, teamName: "Cropix (Bit Lyfe)", leader: "Rachit Tiwari", score: 6.5, category: "Agriculture" },
  { rank: 60, teamName: "Greenovate-U (Dawn Patrol)", leader: "Rohan Saini", score: 6.5, category: "E-Waste" },
  { rank: 61, teamName: "THE SYNERGIC SQUAD", leader: "RAAG SHRI", score: 6, category: "Education" },
  { rank: 62, teamName: "Linkora (The Kraken)", leader: "Harshit Maurya", score: 6, category: "Knowledge Management" },
  { rank: 63, teamName: "Code Slayers", leader: "Abhinav", score: 6, category: "IoT" },
  { rank: 64, teamName: "Vigyan-XR (Bit Wizards)", leader: "Khengar", score: 6, category: "Education" },
  { rank: 65, teamName: "Bob the Builder", leader: "Abhay Negi", score: 6, category: "AI Security" },
  { rank: 66, teamName: "Algo Ninjas", leader: "Mudit Jain", score: 6, category: "Education" },
  { rank: 67, teamName: "Binary Brigades", leader: "Aprajita Ranjan", score: 6, category: "Education" },
  { rank: 68, teamName: "404 Founders", leader: "Shreyansh Shukla", score: 6, category: "E-Waste" },
  { rank: 69, teamName: "StudySphere (Code Crew)", leader: "Unnati Khandelwal", score: 6, category: "Education" },
  { rank: 70, teamName: "EcoFix (Pirates of the Caribbean)", leader: "Pushkar Chaudhari", score: 6, category: "E-Waste" },
  { rank: 71, teamName: "Harvest Hub (VAQ-U)", leader: "Chayan Mukherjee", score: 6, category: "Agriculture" },
  { rank: 72, teamName: "DataGuardian (Bug Buster)", leader: "Harshita Sharma", score: 6, category: "Privacy" },
  { rank: 73, teamName: "SpeakEasy (Kernel Crew)", leader: "Mayank Jaiswal", score: 6, category: "AI Tools" },
  { rank: 74, teamName: "ClearFund (CodeXhunters)", leader: "Abhinav Upadhyay", score: 6, category: "Transparency" },
  { rank: 75, teamName: "F3", leader: "Abhishek", score: 6, category: "Agriculture" },
  { rank: 76, teamName: "Code Learner", leader: "SHIVANI KUMARI", score: 6, category: "Privacy" },
  { rank: 77, teamName: "Darpan (Narayani Sena)", leader: "Adway Jha", score: 6, category: "Blockchain" },
  { rank: 78, teamName: "ScholarSpace (Team Elite)", leader: "Prastut Mahtha", score: 6, category: "Education" },
  { rank: 79, teamName: "LUCIA (The Codesmokers)", leader: "Aman Aziz", score: 6, category: "Developer Tools" },
  { rank: 80, teamName: "AgriWasteSense (Trojan Bots)", leader: "Prajjwal Shukla", score: 6, category: "Agriculture" },
  { rank: 81, teamName: "Vector", leader: "Alok Sharma", score: 6, category: "Blockchain" },
  { rank: 82, teamName: "Asha Kiran (Fusion Master)", leader: "Harsh Mehrotra", score: 6, category: "Transparency" },
  { rank: 83, teamName: "Pandav", leader: "Aarushi Saki", score: 6, category: "Healthcare" },
  { rank: 84, teamName: "DataGuardian (NU-GEN)", leader: "Aman Patre", score: 6, category: "Privacy" },
  { rank: 85, teamName: "Team Rocket", leader: "Gauri Sachan", score: 6, category: "E-Waste" },
  { rank: 86, teamName: "UniMind (Hustlers)", leader: "Vishal Kumar", score: 6, category: "Knowledge Management" },
  { rank: 87, teamName: "ThreatSleuth (Idea Igniters)", leader: "Anvi Vajpayee", score: 6, category: "Cybersecurity" },
  { rank: 88, teamName: "EcoTrack (Solution Seekers)", leader: "Krishna Dixit", score: 6, category: "Sustainability" },
  { rank: 89, teamName: "ClariBot (code_RAFTERS)", leader: "Suraj Kumar C.", score: 6, category: "Finance" },
  { rank: 90, teamName: "Transparent Fund Tracker (TASQB)", leader: "Somya Shekhar T.", score: 6, category: "Blockchain" },
  { rank: 91, teamName: "Vidyadex (Coding bros)", leader: "Pranjal Bhatnagar", score: 6, category: "Education" },
  { rank: 92, teamName: "Codyssey", leader: "Aaryan Kumar V.", score: 6, category: "Research" },
  { rank: 93, teamName: "EXPRESS ELITES", leader: "Prasanna Pratap S.", score: 6, category: "Healthcare" },
  { rank: 94, teamName: "Prism (Skill Issue)", leader: "Rohit Deka", score: 6, category: "Developer Tools" },
  { rank: 95, teamName: "FundFlow (Code4Cause)", leader: "ARJUN AGNIHOTRI", score: 6, category: "Transparency" },
  { rank: 96, teamName: "#07 club", leader: "Aditya kulkarni", score: 6, category: "AI Security" },
  { rank: 97, teamName: "Synapse", leader: "Aryan Kaminwar", score: 6, category: "AI Tools" },
  { rank: 98, teamName: "DoubleR", leader: "Shreshth Awasthi", score: 6, category: "Developer Tools" },
  { rank: 99, teamName: "Flanker", leader: "Pradeep nain", score: 6, category: "Cybersecurity" },
  { rank: 100, teamName: "DynamicDuos", leader: "Vaibhav Gupta", score: 6, category: "Collaboration" }
];

const categories = [...new Set(teamData.map(team => team.category))];


export default function ShortlistedPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('score');
  const [isRevealed, setIsRevealed] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [supabaseData, setSupabaseData] = useState<any[]>([]);
  const [dataComparison, setDataComparison] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDataVerification, setShowDataVerification] = useState(false);

  const filteredTeams = useMemo(() => {
    let filtered = teamData.filter(team => 
      team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.leader.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(team => team.category === selectedCategory);
    }

    return filtered.sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'name') return a.teamName.localeCompare(b.teamName);
      if (sortBy === 'leader') return a.leader.localeCompare(b.leader);
      return 0;
    });
  }, [searchTerm, selectedCategory, sortBy]);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Function to fetch data from Supabase
  const fetchSupabaseData = async () => {
    if (!supabase) {
      console.error('Supabase not initialized');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('project_ideas')
        .select('team_name, team_leader_name, rating, project_idea')
        .order('rating', { ascending: false });

      if (error) {
        console.error('Error fetching data:', error);
        return;
      }

      setSupabaseData(data || []);
      compareData(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to compare current data with Supabase data
  const compareData = (supabaseData: any[]) => {
    const comparison = teamData.map(currentTeam => {
      const supabaseTeam = supabaseData.find(
        sTeam => sTeam.team_name.toLowerCase() === currentTeam.teamName.toLowerCase()
      );

      if (supabaseTeam) {
        const isLeaderMatch = supabaseTeam.team_leader_name.toLowerCase() === currentTeam.leader.toLowerCase();
        return {
          ...currentTeam,
          supabaseLeader: supabaseTeam.team_leader_name,
          isLeaderMatch,
          supabaseRating: supabaseTeam.rating,
          projectIdea: supabaseTeam.project_idea
        };
      }

      return {
        ...currentTeam,
        supabaseLeader: 'NOT_FOUND',
        isLeaderMatch: false,
        supabaseRating: null,
        projectIdea: null
      };
    });

    setDataComparison(comparison);
  };

  return (
    <>
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        .hacker-font {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>
      <div className="min-h-screen bg-black relative overflow-hidden hacker-font">
      {/* Hacker Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 255, 0, 0.05) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(0, 255, 0, 0.05) 0%, transparent 50%)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(0, 255, 0, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(0, 255, 0, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 80%, rgba(0, 255, 0, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(0, 255, 0, 0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        {/* Matrix-style grid overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mb-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-green-400 tracking-wider mb-2">
                DAWN OF &lt;ODE
              </h2>
              <p className="text-lg text-green-300 tracking-wide">
                CODE BY DAY HACK BY NIGHT
              </p>
            </motion.div>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{
                textShadow: ['0 0 5px #00ff00', '0 0 20px #00ff00', '0 0 5px #00ff00']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              className="text-2xl text-green-400 mr-4"
            >
              {'>'}
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-bold text-green-400 tracking-wider">
              RESULTS
            </h1>
            <motion.div
              animate={{
                textShadow: ['0 0 5px #00ff00', '0 0 20px #00ff00', '0 0 5px #00ff00']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              className="text-2xl text-green-400 ml-4"
            >
              {'<'}
            </motion.div>
          </div>
          <p className="text-xl md:text-2xl text-green-300 mb-8 tracking-wide">
            TOP 100 SHORTLISTED TEAMS
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-black/50 backdrop-blur-lg rounded-lg p-6 border border-green-400/30 hover:border-green-400/60 transition-all"
            >
              <div className="text-green-400 text-center mb-2">[TEAMS]</div>
              <div className="text-3xl font-bold text-green-400 text-center">100</div>
              <div className="text-green-300 text-center text-sm">ACTIVE</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-black/50 backdrop-blur-lg rounded-lg p-6 border border-green-400/30 hover:border-green-400/60 transition-all"
            >
              <div className="text-green-400 text-center mb-2">[CATEGORIES]</div>
              <div className="text-3xl font-bold text-green-400 text-center">15</div>
              <div className="text-green-300 text-center text-sm">DOMAINS</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-black/50 backdrop-blur-lg rounded-lg p-6 border border-green-400/30 hover:border-green-400/60 transition-all"
            >
              <div className="text-green-400 text-center mb-2">[MAX_SCORE]</div>
              <div className="text-3xl font-bold text-green-400 text-center">10.0</div>
              <div className="text-green-300 text-center text-sm">RATING</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-black/50 backdrop-blur-lg rounded-lg p-6 border border-green-400/30">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5">{'>'}</div>
                <input
                  type="text"
                  placeholder="SEARCH_TEAMS_OR_LEADERS..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/50 border border-green-400/50 rounded-lg text-green-300 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 bg-black/50 border border-green-400/50 rounded-lg text-green-300 hover:bg-green-400/10 hover:border-green-400 transition-all"
                >
                  <div className="text-green-400">[FILTER]</div>
                  {selectedCategory}
                  <ChevronDown className="w-4 h-4 text-green-400" />
                </button>
                
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-lg border border-green-400/50 rounded-lg overflow-hidden z-20"
                    >
                      <div className="max-h-60 overflow-y-auto">
                        <button
                          onClick={() => {
                            setSelectedCategory('All');
                            setShowFilters(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-green-400/10 transition-colors text-green-300 ${
                            selectedCategory === 'All' ? 'bg-green-400/20' : ''
                          }`}
                        >
                          [ALL_CATEGORIES]
                        </button>
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => {
                              setSelectedCategory(category);
                              setShowFilters(false);
                            }}
                            className={`w-full text-left px-4 py-3 hover:bg-green-400/10 transition-colors text-green-300 ${
                              selectedCategory === category ? 'bg-green-400/20' : ''
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-black/50 border border-green-400/50 rounded-lg text-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
              >
                <option value="score">[SORT_BY_SCORE]</option>
                <option value="name">[SORT_BY_TEAM]</option>
                <option value="leader">[SORT_BY_LEADER]</option>
              </select>

              {/* Data Verification Button */}
              <button
                onClick={() => {
                  fetchSupabaseData();
                  setShowDataVerification(!showDataVerification);
                }}
                disabled={isLoading}
                className="px-4 py-3 bg-black/50 border border-green-400/50 rounded-lg text-green-300 hover:bg-green-400/10 hover:border-green-400 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                <Database className="w-4 h-4" />
                {isLoading ? '[LOADING...]' : '[VERIFY_DATA]'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Data Verification Panel */}
        {showDataVerification && dataComparison.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-black/50 backdrop-blur-lg rounded-lg p-6 border border-green-400/30"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-green-400">[DATA_VERIFICATION]</h3>
              <button
                onClick={() => setShowDataVerification(false)}
                className="text-green-400 hover:text-green-300"
              >
                [CLOSE]
              </button>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-hide">
              {dataComparison.map((team, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded border border-green-400/20">
                  <div className="flex-1">
                    <div className="text-green-300 font-mono text-sm">
                      {team.teamName}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Current: {team.leader} | Supabase: {team.supabaseLeader}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {team.isLeaderMatch ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                    )}
                    <span className={`text-xs ${team.isLeaderMatch ? 'text-green-400' : 'text-red-400'}`}>
                      {team.isLeaderMatch ? '[MATCH]' : '[MISMATCH]'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Results List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-full h-full"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden h-full flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-400/20 to-purple-400/20 p-6 border-b border-white/20 flex-shrink-0">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="text-lg font-bold text-white">Team Name</div>
                <div className="text-lg font-bold text-white">Team Leader</div>
                <div className="text-lg font-bold text-white">Category</div>
                <div className="text-lg font-bold text-white">Score</div>
              </div>
            </div>

            {/* Teams List */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto scrollbar-hide">
                <AnimatePresence>
                  {filteredTeams.map((team, index) => (
                    <motion.div
                      key={`${team.teamName}-${team.leader}`}
                      initial={{ opacity: 0, x: -50 }}
                      animate={isRevealed ? { opacity: 1, x: 0 } : {}}
                      transition={{ 
                        delay: isRevealed ? index * 0.02 : 0,
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                      whileHover={{ 
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        transition: { duration: 0.2 }
                      }}
                      className="group border-b border-white/10 last:border-b-0"
                    >
                      <div className="grid grid-cols-4 gap-4 p-6 items-center hover:bg-white/5 transition-all duration-300">
                        {/* Team Name */}
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-purple-400"></div>
                          <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
                            {team.teamName}
                          </h3>
                        </div>

                        {/* Team Leader */}
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300 font-medium">{team.leader}</span>
                        </div>

                        {/* Category */}
                        <div className="flex justify-center">
                          <span className="text-sm text-gray-300 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                            {team.category}
                          </span>
                        </div>

                        {/* Score */}
                        <div className="flex items-center justify-center gap-2">
                          <Star className="w-5 h-5 text-yellow-400" />
                          <span className="text-xl font-bold text-yellow-400">{team.score}/10</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* No Results */}
        {filteredTeams.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No teams found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400">
            Congratulations to all participants! 🎉
          </p>
        </motion.div>
      </div>
    </div>
    </>
  );
}
