"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { Mail, Users, Trophy, Star, Download, Search } from "lucide-react";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface TeamData {
  team_name: string;
  team_leader_name: string;
  team_leader_email: string;
  team_leader_mobile: string;
  selected_domain: string;
  rating?: number;
  participant_type: string;
}

interface TeamWithScore {
  teamName: string;
  teamLeader: string;
  domain: string;
  score: number;
  email: string;
  mobile: string;
  participantType: string;
}

const teamsData = [
  { teamName: "Ctrl Alt Elite", teamLeader: "Paarth Juneja", domain: "Healthcare AI", score: 10 },
  { teamName: "Error 404", teamLeader: "Kanak Garg", domain: "Healthcare AI", score: 9.5 },
  { teamName: "Innov_B", teamLeader: "Debaditya Dasgupta", domain: "IoT Healthcare", score: 9 },
  { teamName: "AgroCult", teamLeader: "Vaibhav Jaiswal", domain: "Agriculture", score: 9 },
  { teamName: "VinshAI", teamLeader: "Naman Gyanchandani", domain: "Education", score: 8.5 },
  { teamName: "KnowHub (Xanthium)", teamLeader: "Shrishti Singh", domain: "Knowledge Management", score: 8.5 },
  { teamName: "Knowverse (Æegris)", teamLeader: "Om Rathod", domain: "Knowledge Management", score: 8.5 },
  { teamName: "Sudarshan (MyStic Trio)", teamLeader: "Amit Kumar", domain: "Cybersecurity", score: 8.5 },
  { teamName: "VeriFake (Bolshacks)", teamLeader: "Ayush Yadav", domain: "AI Security", score: 8.5 },
  { teamName: "Next Dawn", teamLeader: "Aroosh Datta", domain: "Cloud Computing", score: 8 },
  { teamName: "CircuitBhai (GullyCoders)", teamLeader: "Himanshu Singh", domain: "E-Waste", score: 8 },
  { teamName: "JEEVICA (UpsideDown)", teamLeader: "Akshat Singh", domain: "Healthcare", score: 8 },
  { teamName: "MediVault (QodX)", teamLeader: "Karthikeya A S S V", domain: "Healthcare", score: 8 },
  { teamName: "Setu (BugHiBug)", teamLeader: "Mridul Jaiswal", domain: "Blockchain", score: 8 },
  { teamName: "Genix", teamLeader: "Khushi Roy", domain: "Education", score: 8 },
  { teamName: "FarmyTech (Pseudo Coders)", teamLeader: "Shubh Gupta", domain: "Agriculture", score: 8 },
  { teamName: "AgriNext (Code Blooded)", teamLeader: "Anmol Tiwari", domain: "Agriculture", score: 8 },
  { teamName: "SafetyFirst (Umbrella)", teamLeader: "Harsh Ratnaparkhe", domain: "Cybersecurity", score: 7.5 },
  { teamName: "CyberShield (Spark Plug)", teamLeader: "Rajvee Das", domain: "Cybersecurity", score: 7.5 },
  { teamName: "ClearFunds (IMPROVECTS)", teamLeader: "Dev Nagpal", domain: "Transparency", score: 7.5 },
  { teamName: "Treat Now (Active learners)", teamLeader: "Anmol Panjwani", domain: "Healthcare", score: 7.5 },
  { teamName: "UpScale (CodeStorm)", teamLeader: "Prachi Gupta", domain: "Education", score: 7.5 },
  { teamName: "Code Catalyst", teamLeader: "Harsimran Singh G.", domain: "Education", score: 7.5 },
  { teamName: "REeco (Byte bandits)", teamLeader: "Nishika Deshmukh", domain: "E-Waste", score: 7.5 },
  { teamName: "ReNew Tech (React Racoons)", teamLeader: "Neevan Nigam", domain: "E-Waste", score: 7.5 },
  { teamName: "DumpMyWaste (CodeMonk)", teamLeader: "Bikash Kumar", domain: "E-Waste", score: 7 },
  { teamName: "Clario Space (Logical layers)", teamLeader: "Mohammad Aans", domain: "Education", score: 7 },
  { teamName: "Codecatalyst", teamLeader: "Suraj Paatel", domain: "Education", score: 7 },
  { teamName: "Why-Φ's Fault", teamLeader: "Subham Roy", domain: "Agriculture", score: 7 },
  { teamName: "Lazy Brains", teamLeader: "Arav Gupta", domain: "E-Waste", score: 7 },
  { teamName: "Visionary", teamLeader: "Khushboo Khator", domain: "IoT", score: 7 },
  { teamName: "ShaktiMaan", teamLeader: "Ansh Singh", domain: "Agriculture", score: 7 },
  { teamName: "Kabhi Khushi Kabhi Gham", teamLeader: "Nilay Gurdasani", domain: "Education", score: 7 },
  { teamName: "MediSphere (The Orders)", teamLeader: "Hitesh Choudhary", domain: "Healthcare", score: 7 },
  { teamName: "AURA (CODING SPARTANS)", teamLeader: "Mathesh Chand K V", domain: "Healthcare", score: 7 },
  { teamName: "VeriScope (ExpressOPS)", teamLeader: "Prateek Sharma", domain: "AI Security", score: 7 },
  { teamName: "Ioticax (MethXai)", teamLeader: "Aniket Kumar", domain: "IoT", score: 7 },
  { teamName: "Potato Coders", teamLeader: "Jhalak Sahgal", domain: "Cybersecurity", score: 7 },
  { teamName: "Cryptoxis", teamLeader: "Siya Sanjit Sawant Dessai", domain: "Cybersecurity", score: 7 },
  { teamName: "AgriNova (HackOps)", teamLeader: "Saumya Dwivedi", domain: "Agriculture", score: 7 },
  { teamName: "coffee-codes", teamLeader: "vatsala das", domain: "E-Waste", score: 7 },
  { teamName: "CURARE (Git Gud)", teamLeader: "Suryansh Vatsaa T.", domain: "Healthcare", score: 7 },
  { teamName: "E-Waste Solution Hub (Infinite Binary)", teamLeader: "Jain Aditya R.", domain: "E-Waste", score: 7 },
  { teamName: "Pixi.Lib (Tesseract)", teamLeader: "Deeksha Kaushal", domain: "Education", score: 7 },
  { teamName: "ScrapE (The Hackenings)", teamLeader: "Navya Jain", domain: "E-Waste", score: 7 },
  { teamName: "CodeStorm", teamLeader: "Hemanshu M", domain: "Education", score: 6.5 },
  { teamName: "Smart Garden Mgmt System (The Eighteens)", teamLeader: "Prashant Dubey", domain: "IoT", score: 6.5 },
  { teamName: "ExtiGuard (Tech Jam)", teamLeader: "Yash Jadhav", domain: "Cybersecurity", score: 6.5 },
  { teamName: "3VP", teamLeader: "Vinayak Singh", domain: "Healthcare", score: 6.5 },
  { teamName: "Smarter Knowledge Sharing (Infinite_loopers_)", teamLeader: "Ritesh Singh S.", domain: "Knowledge Management", score: 6.5 },
  { teamName: "FinTrust (THE OPTIMIZERS)", teamLeader: "Raghav Gupta", domain: "Blockchain", score: 6.5 },
  { teamName: "SAHYOG (Noob Hackers)", teamLeader: "P Rakshitha", domain: "Agriculture", score: 6.5 },
  { teamName: "ThinkMesh (CodeV)", teamLeader: "Abhinav Upadhyay", domain: "Knowledge Management", score: 6.5 },
  { teamName: "NetLive (codersdon'tcry)", teamLeader: "Amey Chopde", domain: "Developer Tools", score: 6.5 },
  { teamName: "AgriCycle (KarmiX)", teamLeader: "Vaibhav Pandey", domain: "Agriculture", score: 6.5 },
  { teamName: "PromptHub (The Golus)", teamLeader: "Astha Lodhi", domain: "AI Tools", score: 6.5 },
  { teamName: "TrustChain (Code Quest)", teamLeader: "Kripa Mehndiratta", domain: "Blockchain", score: 6.5 },
  { teamName: "Safio (Aloo Paratha)", teamLeader: "Gurkirat Singh D.", domain: "Cybersecurity", score: 6.5 },
  { teamName: "Cropix (Bit Lyfe)", teamLeader: "Rachit Tiwari", domain: "Agriculture", score: 6.5 },
  { teamName: "Greenovate-U (Dawn Patrol)", teamLeader: "Rohan Saini", domain: "E-Waste", score: 6.5 },
  { teamName: "THE SYNERGIC SQUAD", teamLeader: "RAAG SHRI", domain: "Education", score: 6 },
  { teamName: "Linkora (The Kraken)", teamLeader: "Harshit Maurya", domain: "Knowledge Management", score: 6 },
  { teamName: "Code Slayers", teamLeader: "Abhinav", domain: "IoT", score: 6 },
  { teamName: "Vigyan-XR (Bit Wizards)", teamLeader: "Khengar", domain: "Education", score: 6 },
  { teamName: "Bob the Builder", teamLeader: "Abhay Negi", domain: "AI Security", score: 6 },
  { teamName: "Algo Ninjas", teamLeader: "Mudit Jain", domain: "Education", score: 6 },
  { teamName: "Binary Brigades", teamLeader: "Aprajita Ranjan", domain: "Education", score: 6 },
  { teamName: "404 Founders", teamLeader: "Shreyansh Shukla", domain: "E-Waste", score: 6 },
  { teamName: "StudySphere (Code Crew)", teamLeader: "Unnati Khandelwal", domain: "Education", score: 6 },
  { teamName: "EcoFix (Pirates of the Caribbean)", teamLeader: "Pushkar Chaudhari", domain: "E-Waste", score: 6 },
  { teamName: "Harvest Hub (VAQ-U)", teamLeader: "Chayan Mukherjee", domain: "Agriculture", score: 6 },
  { teamName: "DataGuardian (Bug Buster)", teamLeader: "Harshita Sharma", domain: "Privacy", score: 6 },
  { teamName: "SpeakEasy (Kernel Crew)", teamLeader: "Mayank Jaiswal", domain: "AI Tools", score: 6 },
  { teamName: "ClearFund (CodeXhunters)", teamLeader: "Abhinav Upadhyay", domain: "Transparency", score: 6 },
  { teamName: "F3", teamLeader: "Abhishek", domain: "Agriculture", score: 6 },
  { teamName: "Code Learner", teamLeader: "SHIVANI KUMARI", domain: "Privacy", score: 6 },
  { teamName: "Darpan (Narayani Sena)", teamLeader: "Adway Jha", domain: "Blockchain", score: 6 },
  { teamName: "ScholarSpace (Team Elite)", teamLeader: "Prastut Mahtha", domain: "Education", score: 6 },
  { teamName: "LUCIA (The Codesmokers)", teamLeader: "Aman Aziz", domain: "Developer Tools", score: 6 },
  { teamName: "AgriWasteSense (Trojan Bots)", teamLeader: "Prajjwal Shukla", domain: "Agriculture", score: 6 },
  { teamName: "Vector", teamLeader: "Alok Sharma", domain: "Blockchain", score: 6 },
  { teamName: "Asha Kiran (Fusion Master)", teamLeader: "Harsh Mehrotra", domain: "Transparency", score: 6 },
  { teamName: "Pandav", teamLeader: "Aarushi Saki", domain: "Healthcare", score: 6 },
  { teamName: "DataGuardian (NU-GEN)", teamLeader: "Aman Patre", domain: "Privacy", score: 6 },
  { teamName: "Team Rocket", teamLeader: "Gauri Sachan", domain: "E-Waste", score: 6 },
  { teamName: "UniMind (Hustlers)", teamLeader: "Vishal Kumar", domain: "Knowledge Management", score: 6 },
  { teamName: "ThreatSleuth (Idea Igniters)", teamLeader: "Anvi Vajpayee", domain: "Cybersecurity", score: 6 },
  { teamName: "EcoTrack (Solution Seekers)", teamLeader: "Krishna Dixit", domain: "Sustainability", score: 6 },
  { teamName: "ClariBot (code_RAFTERS)", teamLeader: "Suraj Kumar C.", domain: "Finance", score: 6 },
  { teamName: "Transparent Fund Tracker (TASQB)", teamLeader: "Somya Shekhar T.", domain: "Blockchain", score: 6 },
  { teamName: "Vidyadex (Coding bros)", teamLeader: "Pranjal Bhatnagar", domain: "Education", score: 6 },
  { teamName: "Codyssey", teamLeader: "Aaryan Kumar V.", domain: "Research", score: 6 },
  { teamName: "EXPRESS ELITES", teamLeader: "Prasanna Pratap S.", domain: "Healthcare", score: 6 },
  { teamName: "Prism (Skill Issue)", teamLeader: "Rohit Deka", domain: "Developer Tools", score: 6 },
  { teamName: "FundFlow (Code4Cause)", teamLeader: "ARJUN AGNIHOTRI", domain: "Transparency", score: 6 },
  { teamName: "#07 club", teamLeader: "Aditya kulkarni", domain: "AI Security", score: 6 },
  { teamName: "Synapse", teamLeader: "Aryan Kaminwar", domain: "AI Tools", score: 6 },
  { teamName: "DoubleR", teamLeader: "Shreshth Awasthi", domain: "Developer Tools", score: 6 },
  { teamName: "Flanker", teamLeader: "Pradeep nain", domain: "Cybersecurity", score: 6 },
  { teamName: "DynamicDuos", teamLeader: "Vaibhav Gupta", domain: "Collaboration", score: 6 },
];

export default function TeamsLeaderboard() {
  const [teamsWithEmails, setTeamsWithEmails] = useState<TeamWithScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [matchedCount, setMatchedCount] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTeamEmails();
  }, []);

  const fetchTeamEmails = async () => {
    try {
      setLoading(true);
      
      // Fetch all team registrations from database
      const { data: dbTeams, error } = await supabase
        .from('team_registrations')
        .select('team_name, team_leader_name, team_leader_email, team_leader_mobile, selected_domain, participant_type');

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      console.log('Fetched teams from database:', dbTeams?.length);

      // Match teams from the list with database entries
      const matchedTeams: TeamWithScore[] = [];
      const seenTeams = new Set<string>(); // To prevent duplicates

      for (const team of teamsData) {
        // Skip if we've already processed this team
        const teamKey = `${team.teamName.toLowerCase()}-${team.teamLeader.toLowerCase()}`;
        if (seenTeams.has(teamKey)) continue;

        // Find matching team in database
        const dbTeam = dbTeams?.find(db => {
          const nameMatch = db.team_name.toLowerCase().trim() === team.teamName.toLowerCase().trim();
          const leaderMatch = db.team_leader_name.toLowerCase().trim() === team.teamLeader.toLowerCase().trim();
          return nameMatch || leaderMatch;
        });

        if (dbTeam) {
          matchedTeams.push({
            teamName: team.teamName,
            teamLeader: team.teamLeader,
            domain: team.domain,
            score: team.score,
            email: dbTeam.team_leader_email,
            mobile: dbTeam.team_leader_mobile,
            participantType: dbTeam.participant_type,
          });
          seenTeams.add(teamKey);
        }
      }

      // Sort by score (highest first)
      matchedTeams.sort((a, b) => b.score - a.score);

      setTeamsWithEmails(matchedTeams);
      setMatchedCount(matchedTeams.length);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const downloadEmails = async (format: 'csv' | 'txt' | 'json') => {
    setDownloading(true);
    try {
      let content = '';
      let filename = '';
      let mimeType = '';

      switch (format) {
        case 'csv':
          content = 'Rank,Team Name,Team Leader,Email,Mobile,Domain,Score,Participant Type\n';
          teamsWithEmails.forEach((team, index) => {
            content += `${index + 1},"${team.teamName}","${team.teamLeader}","${team.email}","${team.mobile}","${team.domain}",${team.score},"${team.participantType}"\n`;
          });
          filename = 'hackathon_teams.csv';
          mimeType = 'text/csv';
          break;

        case 'txt':
          content = 'HACKATHON TEAMS CONTACT LIST\n';
          content += '='.repeat(50) + '\n\n';
          teamsWithEmails.forEach((team, index) => {
            content += `${index + 1}. ${team.teamName}\n`;
            content += `   Leader: ${team.teamLeader}\n`;
            content += `   Email: ${team.email}\n`;
            content += `   Mobile: ${team.mobile}\n`;
            content += `   Domain: ${team.domain}\n`;
            content += `   Score: ${team.score}/10\n`;
            content += `   Type: ${team.participantType}\n`;
            content += `   ${'='.repeat(30)}\n\n`;
          });
          filename = 'hackathon_teams.txt';
          mimeType = 'text/plain';
          break;

        case 'json':
          content = JSON.stringify(teamsWithEmails.map((team, index) => ({
            rank: index + 1,
            teamName: team.teamName,
            teamLeader: team.teamLeader,
            email: team.email,
            mobile: team.mobile,
            domain: team.domain,
            score: team.score,
            participantType: team.participantType
          })), null, 2);
          filename = 'hackathon_teams.json';
          mimeType = 'application/json';
          break;
      }

      // Create and download file
      const blob = new Blob([content], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error('Download error:', err);
      alert('Error downloading file. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const downloadEmailList = () => {
    const emails = teamsWithEmails.map(team => team.email).join(', ');
    const blob = new Blob([emails], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hackathon_emails.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return "text-yellow-400";
    if (score >= 8) return "text-green-400";
    if (score >= 7) return "text-blue-400";
    return "text-gray-400";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 9) return "bg-yellow-500/20 border-yellow-500/30";
    if (score >= 8) return "bg-green-500/20 border-green-500/30";
    if (score >= 7) return "bg-blue-500/20 border-blue-500/30";
    return "bg-gray-500/20 border-gray-500/30";
  };

  // Filter teams based on search term
  const filteredTeams = teamsWithEmails.filter(team =>
    team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.teamLeader.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading teams...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#07020f] via-[#0A0118] to-[#000000]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen" style={{
          backgroundImage: "repeating-linear-gradient(0deg, rgba(160,32,240,0.3) 0, rgba(160,32,240,0.3) 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, rgba(160,32,240,0.3) 0, rgba(160,32,240,0.3) 1px, transparent 1px, transparent 50px)"
        }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-[#F0F0F0] via-[#CBC3E3] to-[#A020F0] bg-clip-text text-transparent mb-4">
            Teams Leaderboard
          </h1>
          <p className="text-lg text-[#E0E0E0] mb-4">
            Hackathon Results with Contact Information
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-[#CBC3E3]">
              <Users className="w-5 h-5" />
              <span>{teamsWithEmails.length} Teams Found</span>
            </div>
            <div className="flex items-center gap-2 text-[#A020F0]">
              <Trophy className="w-5 h-5" />
              <span>Ranked by Score</span>
            </div>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto mb-8"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-[#A020F0]" />
              </div>
              <input
                type="text"
                placeholder="Search teams, leaders, domains, or emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0A0118]/60 border border-[#A020F0]/30 text-[#F0F0F0] placeholder:text-[#A0A0A0] focus:border-[#A020F0] focus:ring-[#A020F0]/20 pl-12 pr-4 py-3 rounded-xl transition-all duration-300 hover:border-[#A020F0]/50 focus:outline-none"
              />
            </div>
            {searchTerm && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-[#CBC3E3] mt-2 text-center"
              >
                Showing {filteredTeams.length} of {teamsWithEmails.length} teams
              </motion.p>
            )}
          </motion.div>

          {/* Download Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadEmailList}
              disabled={downloading || teamsWithEmails.length === 0}
              className="bg-gradient-to-r from-[#A020F0] to-[#6B46C1] hover:from-[#8B5CF6] hover:to-[#A020F0] text-[#0A0118] font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-[#A020F0]/25 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Emails Only (.txt)
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => downloadEmails('csv')}
              disabled={downloading || teamsWithEmails.length === 0}
              className="bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#34D399] hover:to-[#10B981] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-[#10B981]/25 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Full Data (.csv)
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => downloadEmails('txt')}
              disabled={downloading || teamsWithEmails.length === 0}
              className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:from-[#60A5FA] hover:to-[#3B82F6] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-[#3B82F6]/25 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Formatted (.txt)
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => downloadEmails('json')}
              disabled={downloading || teamsWithEmails.length === 0}
              className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#FBBF24] hover:to-[#F59E0B] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-[#F59E0B]/25 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              JSON (.json)
            </motion.button>
          </motion.div>

          {downloading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mb-6"
            >
              <div className="inline-flex items-center gap-3 text-[#A020F0]">
                <div className="w-5 h-5 border-2 border-[#A020F0]/30 border-t-[#A020F0] rounded-full animate-spin"></div>
                <span>Preparing download...</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Teams Grid */}
        <div className="grid gap-6">
          {filteredTeams.map((team, index) => (
            <motion.div
              key={`${team.teamName}-${team.teamLeader}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-[#0A0118]/80 to-[#1E0345]/60 backdrop-blur-md rounded-xl border border-[#A020F0]/20 p-6 hover:border-[#A020F0]/40 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Team Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-[#A020F0]">#{teamsWithEmails.indexOf(team) + 1}</span>
                    <h3 className="text-xl font-semibold text-[#F0F0F0]">{team.teamName}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-[#CBC3E3] mb-2">
                    <Users className="w-4 h-4" />
                    <span>{team.teamLeader}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#A0A0A0] text-sm">
                    <span>{team.domain}</span>
                    <span className="px-2 py-1 bg-[#A020F0]/20 text-[#A020F0] rounded-full text-xs">
                      {team.participantType}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#A020F0]" />
                    <a 
                      href={`mailto:${team.email}`}
                      className="text-[#CBC3E3] hover:text-[#A020F0] transition-colors text-sm"
                    >
                      {team.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 text-[#A020F0]">📱</span>
                    <span className="text-[#CBC3E3] text-sm">{team.mobile}</span>
                  </div>
                </div>

                {/* Score */}
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getScoreBgColor(team.score)}`}>
                  <Star className={`w-5 h-5 ${getScoreColor(team.score)}`} />
                  <span className={`font-bold text-lg ${getScoreColor(team.score)}`}>
                    {team.score}/10
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-br from-[#0A0118]/80 to-[#1E0345]/60 backdrop-blur-md rounded-xl border border-[#A020F0]/20 p-6">
            <h3 className="text-xl font-semibold text-[#F0F0F0] mb-2">Summary</h3>
            <p className="text-[#CBC3E3]">
              Found {matchedCount} teams out of {teamsData.length} total teams with contact information.
              {searchTerm && (
                <span className="block mt-2">
                  Search results: {filteredTeams.length} teams match "{searchTerm}"
                </span>
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
