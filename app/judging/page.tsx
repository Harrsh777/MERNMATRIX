"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@supabase/supabase-js";

type TeamSubmission = {
  id: string;
  team_name: string;
  team_leader_name: string;
  project_url: string;
  github_url: string;
  gist: string;
  submitted_at: string;
  ip?: string;
  user_agent?: string;
};

export default function JudgingDashboard() {
  const [teams, setTeams] = useState<TeamSubmission[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<TeamSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchTeams();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTeams(teams);
    } else {
      const filtered = teams.filter(
        (team) =>
          team.team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          team.team_leader_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTeams(filtered);
    }
  }, [searchTerm, teams]);

  async function fetchTeams() {
    try {
      setLoading(true);
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase configuration missing");
      }

      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase
        .from("finals_submissions")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (error) throw error;
      
      setTeams(data || []);
      setFilteredTeams(data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch teams");
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString: string) {
    if (!mounted) return "Loading...";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#A020F0]"></div>
          <p className="text-[#E0E0E0] mt-4 text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient with more depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#07020f] via-[#0A0118] to-[#000000]" />
        
        {/* Multiple animated glow orbs */}
        <div className="absolute inset-0 overflow-hidden">
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
            className="absolute -top-40 -left-40 w-[60vw] h-[60vw] rounded-full bg-[#A020F0]/20 blur-[120px]"
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
            className="absolute -bottom-40 -right-40 w-[55vw] h-[55vw] rounded-full bg-[#CBC3E3]/15 blur-[140px]"
          />
          <motion.div 
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 w-[40vw] h-[40vw] rounded-full bg-[#6B46C1]/10 blur-[100px]"
          />
        </div>

        {/* Enhanced grid overlay */}
        <div className="absolute inset-0 opacity-[0.05] mix-blend-screen" style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(160,32,240,0.3) 0, rgba(160,32,240,0.3) 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, rgba(160,32,240,0.3) 0, rgba(160,32,240,0.3) 1px, transparent 1px, transparent 50px)"
        }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-16">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              boxShadow: ['0 0 0px rgba(160,32,240,0)', '0 0 30px rgba(160,32,240,0.3)', '0 0 0px rgba(160,32,240,0)']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className="inline-block px-6 py-3 text-sm font-semibold text-[#CBC3E3] bg-[#A020F0]/20 rounded-full mb-6 border border-[#A020F0]/30"
          >
            🏆 JUDGING PANEL
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-[#F0F0F0] via-[#CBC3E3] to-[#A020F0] bg-clip-text text-transparent mb-6">
            Hackathon
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-[#A020F0] to-[#6B46C1] bg-clip-text text-transparent mb-4">
            Judging Dashboard
          </h2>
          <p className="text-xl text-[#E0E0E0] max-w-3xl mx-auto leading-relaxed">
            Review, evaluate, and score hackathon submissions with precision and fairness
          </p>
        </motion.div>

        {/* Enhanced Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-[#0A0118]/90 to-[#1E0345]/70 backdrop-blur-xl rounded-3xl border border-[#A020F0]/30 p-8 shadow-2xl">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-[#A020F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <Input
                type="text"
                placeholder="Search teams by name or team leader..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#0A0118]/60 border-[#A020F0]/40 text-[#F0F0F0] placeholder:text-[#A0A0A0] focus:border-[#A020F0] focus:ring-[#A020F0]/30 w-full text-lg py-4 pl-12 pr-4 rounded-xl"
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-[#A0A0A0]">
                {filteredTeams.length} team{filteredTeams.length !== 1 ? 's' : ''} found
              </p>
              <div className="flex items-center gap-2 text-sm text-[#CBC3E3]">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live Dashboard
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Teams Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {loading ? (
            <div className="text-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block w-16 h-16 border-4 border-[#A020F0]/30 border-t-[#A020F0] rounded-full"
              ></motion.div>
              <p className="text-[#E0E0E0] mt-6 text-xl">Loading teams...</p>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">❌</div>
              <p className="text-red-400 font-medium text-lg">{error}</p>
            </div>
          ) : filteredTeams.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-[#E0E0E0] text-xl">No teams found</p>
              <p className="text-[#A0A0A0] mt-2">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTeams.map((team, index) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="group bg-gradient-to-br from-[#0A0118]/90 to-[#1E0345]/70 backdrop-blur-xl rounded-2xl border border-[#A020F0]/20 p-6 shadow-xl hover:shadow-[#A020F0]/30 transition-all duration-500 hover:border-[#A020F0]/40"
                >
                  <div className="flex flex-col h-full">
                    {/* Team Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#F0F0F0] mb-2 group-hover:text-[#CBC3E3] transition-colors">
                          {team.team_name}
                        </h3>
                        <div className="flex items-center gap-2 text-[#A020F0] text-sm font-medium">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {team.team_leader_name}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[#A0A0A0] bg-[#0A0118]/50 px-2 py-1 rounded-full">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatDate(team.submitted_at)}
                      </div>
                    </div>

                    {/* Project Preview */}
                    <div className="flex-1 mb-6">
                      <p className="text-[#E0E0E0] text-sm leading-relaxed line-clamp-3">
                        {team.gist}
                      </p>
                    </div>

                    {/* Links */}
                    <div className="space-y-2 mb-6">
                      <a
                        href={team.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#A020F0] hover:text-[#CBC3E3] transition-colors text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Project
                      </a>
                      <a
                        href={team.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#A020F0] hover:text-[#CBC3E3] transition-colors text-sm"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub Repository
                      </a>
                    </div>

                    {/* Judge Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-[#A020F0] to-[#6B46C1] hover:from-[#8B5CF6] hover:to-[#A020F0] text-[#0A0118] font-semibold py-3 rounded-xl shadow-lg hover:shadow-[#A020F0]/25 transition-all duration-300"
                      >
                        <a href={`/judging/${team.id}`} className="flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Judge Team
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
