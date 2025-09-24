"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@supabase/supabase-js";
import { useParams, useRouter } from "next/navigation";

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

type JudgingScores = {
  relevance: number;
  clarity: number;
  feasibility: number;
  innovation: number;
  impact: number;
};

export default function TeamJudgingPage() {
  const params = useParams();
  const router = useRouter();
  const teamId = params.id as string;

  const [team, setTeam] = useState<TeamSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const [scores, setScores] = useState<JudgingScores>({
    relevance: 0,
    clarity: 0,
    feasibility: 0,
    innovation: 0,
    impact: 0,
  });

  const totalMarks = Object.values(scores).reduce((sum, score) => sum + score, 0);

  useEffect(() => {
    setMounted(true);
    if (teamId) {
      fetchTeam();
    }
  }, [teamId]);

  async function fetchTeam() {
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
        .eq("id", teamId)
        .single();

      if (error) throw error;
      
      setTeam(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch team details");
    } finally {
      setLoading(false);
    }
  }

  function handleScoreChange(criteria: keyof JudgingScores, value: string) {
    const numValue = Math.max(0, Math.min(20, parseInt(value) || 0));
    setScores(prev => ({ ...prev, [criteria]: numValue }));
  }

  async function handleSubmit() {
    try {
      setSubmitting(true);
      setSubmitError(null);

      const response = await fetch("/api/judging/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamId,
          teamName: team?.team_name,
          teamLeaderName: team?.team_leader_name,
          scores,
          totalMarks,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to submit scores");
      }

      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  function formatDate(dateString: string) {
    if (!mounted) return "Loading...";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#A020F0]"></div>
          <p className="text-[#E0E0E0] mt-4 text-lg">Loading team details...</p>
        </div>
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">❌ {error || "Team not found"}</p>
          <Button
            onClick={() => router.back()}
            className="bg-gradient-to-r from-[#A020F0] to-[#6B46C1] text-[#0A0118] font-semibold px-6 py-2 rounded-lg"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#07020f] via-[#0A0118] to-[#000000]" />
        
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
        </div>

        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen" style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(160,32,240,0.3) 0, rgba(160,32,240,0.3) 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, rgba(160,32,240,0.3) 0, rgba(160,32,240,0.3) 1px, transparent 1px, transparent 50px)"
        }} />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 md:px-6 py-10 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Button
            onClick={() => router.back()}
            className="mb-6 bg-[#0A0118]/50 border border-[#A020F0]/30 text-[#F0F0F0] hover:border-[#A020F0] hover:bg-[#A020F0]/10 transition-all duration-300"
          >
            ← Back to Dashboard
          </Button>
          
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-[#F0F0F0] to-[#A020F0] bg-clip-text text-transparent mb-4">
            {team.team_name}
          </h1>
          <p className="text-lg text-[#CBC3E3]">
            Team Leader: {team.team_leader_name}
          </p>
          <p className="text-sm text-[#A0A0A0] mt-2">
            Submitted: {formatDate(team.submitted_at)}
          </p>
        </motion.div>

        {/* Team Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gradient-to-br from-[#0A0118]/80 to-[#1E0345]/60 backdrop-blur-md rounded-2xl border border-[#A020F0]/20 p-8 shadow-2xl mb-8"
        >
          <h2 className="text-2xl font-bold text-[#F0F0F0] mb-6">Project Details</h2>
          
          <div className="grid gap-6">
            <div>
              <label className="text-sm font-medium text-[#CBC3E3] mb-2 block">Project Description</label>
              <div className="bg-[#0A0118]/50 border border-[#A020F0]/30 rounded-lg p-4">
                <p className="text-[#F0F0F0] leading-relaxed">{team.gist}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-[#CBC3E3] mb-2 block">Deployed Project</label>
                <a
                  href={team.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A020F0] hover:text-[#CBC3E3] transition-colors break-all"
                >
                  {team.project_url}
                </a>
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#CBC3E3] mb-2 block">GitHub Repository</label>
                <a
                  href={team.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A020F0] hover:text-[#CBC3E3] transition-colors break-all"
                >
                  {team.github_url}
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Judging Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gradient-to-br from-[#0A0118]/80 to-[#1E0345]/60 backdrop-blur-md rounded-2xl border border-[#A020F0]/20 p-8 shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-[#F0F0F0] mb-6">Judging Criteria</h2>
          
          <div className="grid gap-6">
            {[
              {
                key: "relevance" as keyof JudgingScores,
                label: "Relevance",
                description: "Does it address the chosen problem effectively?",
                score: scores.relevance
              },
              {
                key: "clarity" as keyof JudgingScores,
                label: "Clarity",
                description: "Is the idea structured and well-explained?",
                score: scores.clarity
              },
              {
                key: "feasibility" as keyof JudgingScores,
                label: "Feasibility",
                description: "Can it be realistically developed within hackathon limits?",
                score: scores.feasibility
              },
              {
                key: "innovation" as keyof JudgingScores,
                label: "Innovation",
                description: "Is it unique and creative compared to existing solutions?",
                score: scores.innovation
              },
              {
                key: "impact" as keyof JudgingScores,
                label: "Impact",
                description: "Does it hold real-world usefulness?",
                score: scores.impact
              }
            ].map((criteria) => (
              <div key={criteria.key} className="grid md:grid-cols-3 gap-4 items-center">
                <div className="md:col-span-1">
                  <label className="text-lg font-semibold text-[#F0F0F0] block">
                    {criteria.label}
                  </label>
                  <p className="text-sm text-[#A0A0A0] mt-1">
                    {criteria.description}
                  </p>
                </div>
                
                <div className="md:col-span-1">
                  <Input
                    type="number"
                    min="0"
                    max="20"
                    value={criteria.score}
                    onChange={(e) => handleScoreChange(criteria.key, e.target.value)}
                    className="bg-[#0A0118]/50 border-[#A020F0]/30 text-[#F0F0F0] placeholder:text-[#A0A0A0] focus:border-[#A020F0] focus:ring-[#A020F0]/20 text-center text-lg font-semibold"
                    placeholder="0-20"
                  />
                </div>
                
                <div className="md:col-span-1 text-right">
                  <span className="text-2xl font-bold text-[#A020F0]">
                    {criteria.score}/20
                  </span>
                </div>
              </div>
            ))}

            {/* Total Marks */}
            <div className="border-t border-[#A020F0]/30 pt-6 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-[#F0F0F0]">Total Marks</span>
                <span className="text-4xl font-bold bg-gradient-to-br from-[#CBC3E3] to-[#A020F0] bg-clip-text text-transparent">
                  {totalMarks}/100
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleSubmit}
                  disabled={submitting || submitted}
                  className="bg-gradient-to-r from-[#A020F0] to-[#6B46C1] hover:from-[#8B5CF6] hover:to-[#A020F0] text-[#0A0118] font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-[#A020F0]/25 transition-all duration-300"
                >
                  {submitting ? "Submitting..." : submitted ? "Submitted ✓" : "Submit Scores"}
                </Button>
              </motion.div>
            </div>

            {/* Success/Error Messages */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-6 bg-green-500/10 border border-green-500/30 rounded-lg"
                >
                  <p className="text-lg text-green-400 font-semibold">✅ Scores Successfully Submitted!</p>
                  <p className="text-sm text-green-300 mt-1">Total: {totalMarks}/100 marks</p>
                </motion.div>
              )}

              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                >
                  <p className="text-red-400 font-medium">❌ {submitError}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
