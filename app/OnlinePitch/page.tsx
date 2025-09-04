'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Users, Trophy, Star, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface TeamMember {
  id: number;
  teamName: string;
  memberName: string;
}

const teamData: TeamMember[] = [
  { id: 1, teamName: "Tristack", memberName: "ishan singh patel" },
  { id: 2, teamName: "LogicLayers", memberName: "Mohammed Anas" },
  { id: 3, teamName: "The-weakends", memberName: "Shubham sayaji" },
  { id: 4, teamName: "Future_frames", memberName: "Sahil Kourav" },
  { id: 5, teamName: "CreativeBuddies", memberName: "Kenil Sangani" },
  { id: 6, teamName: "Quantum coders", memberName: "Piya Biswas" },
  { id: 7, teamName: "CodeVerz", memberName: "Ujjwal Gupta" },
  { id: 8, teamName: "Info Unity", memberName: "Parv Modi" },
  { id: 9, teamName: "SpiderCoders", memberName: "Sayak Pramanik" },
  { id: 10, teamName: "TechGiants", memberName: "Prashant Gupta" },
  { id: 11, teamName: "Code Cabbit", memberName: "Manish Dhaka" },
  { id: 12, teamName: "Dev Buddies", memberName: "Gaurav Pratap Singh" },
  { id: 13, teamName: "Hyper Brahmos", memberName: "Rahul Bankar" },
  { id: 14, teamName: "404 Founders", memberName: "Rathod Henil D." },
  { id: 15, teamName: "Duo Devs", memberName: "Madhur Bhavsar" },
  { id: 16, teamName: "CODE STORM", memberName: "Krishna Jain" },
  { id: 17, teamName: "Quantum Codexz", memberName: "Pritish Mandal" },
  { id: 18, teamName: "Innov_B", memberName: "Debaditya Dasgupta" },
  { id: 19, teamName: "Algo evengers", memberName: "Unnati khare" },
  { id: 20, teamName: "codeZEN", memberName: "Parth Gupta" },
  { id: 21, teamName: "Code Rebels", memberName: "Naman Gyanchandani" },
  { id: 22, teamName: "StackForge", memberName: "Raghav Sharma" },
  { id: 23, teamName: "Stork", memberName: "Dishant Hooda" },
  { id: 24, teamName: "HelloWorld", memberName: "Divyansh Kumar" },
  { id: 25, teamName: "Runtime Terrors", memberName: "Saurav Kumar" },
  { id: 26, teamName: "Visionary", memberName: "Khushboo Khator" },
  { id: 27, teamName: "Code Learner", memberName: "Shivani Kumari" },
  { id: 28, teamName: "Buildon", memberName: "Shreya Dilip Wani" },
  { id: 29, teamName: "Abc", memberName: "Aniket srivastava" },
  { id: 30, teamName: "Ctrl+Z", memberName: "Harshwardhan Patil" },
  { id: 31, teamName: "Guncoder", memberName: "Vibhor Mishra" },
  { id: 32, teamName: "Code2gether", memberName: "Mohd Fazil" },
  { id: 33, teamName: "BUG - SLAYER", memberName: "Akshay varma" },
  { id: 34, teamName: "404 Coder Not Found", memberName: "Abhishek singh" },
  { id: 35, teamName: "Raghav Sharma", memberName: "Raghav Sharma" },
  { id: 36, teamName: "Beyond Boundaries", memberName: "Payal Rani" },
  { id: 37, teamName: "CodeCatalyst", memberName: "Suraj patel" },
  { id: 38, teamName: "Trailblazers", memberName: "Anshuman khare" },
  { id: 39, teamName: "Skyship", memberName: "Vishal" }
];

export default function OnlinePitchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'team' | 'member'>('team');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredAndSortedTeams = useMemo(() => {
    let filtered = teamData.filter(team => 
      team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.memberName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'team') {
        comparison = a.teamName.localeCompare(b.teamName);
      } else {
        comparison = a.memberName.localeCompare(b.memberName);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [searchTerm, sortBy, sortOrder]);

  const handleSort = (column: 'team' | 'member') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (column: 'team' | 'member') => {
    if (sortBy !== column) return <ArrowUpDown className="w-4 h-4" />;
    return sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };

  const getTeamIcon = (teamName: string) => {
    const icons = ['🚀', '💻', '⚡', '🔥', '🎯', '🌟', '💡', '🎨', '🔧', '⚙️'];
    // Use a more deterministic approach based on team name hash
    let hash = 0;
    for (let i = 0; i < teamName.length; i++) {
      const char = teamName.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return icons[Math.abs(hash) % icons.length];
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading teams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-white font-semibold">Online Pitch Competition</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                External
              </span>
              <span className="text-white"> Teams</span>
            </h1>
           
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search teams or members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
              />
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{filteredAndSortedTeams.length} teams found</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>Total: {teamData.length} participants</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-6 py-4 border-b border-white/20">
            <h2 className="text-2xl font-bold text-white">Team Registration List</h2>
            <p className="text-gray-300 mt-1">All registered teams and their members</p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    #
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort('team')}
                  >
                    <div className="flex items-center gap-2">
                      Team Name
                      {getSortIcon('team')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort('member')}
                  >
                    <div className="flex items-center gap-2">
                      Member Name
                      {getSortIcon('member')}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredAndSortedTeams.map((team, index) => (
                  <tr 
                    key={team.id} 
                    className="hover:bg-white/5 transition-colors duration-200 group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">
                          {getTeamIcon(team.teamName)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                            {team.teamName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300 capitalize">
                        {team.memberName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        Registered
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* No Results */}
          {filteredAndSortedTeams.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No teams found</h3>
              <p className="text-gray-300">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-400">
          <p>© 2024 Online Pitch Competition - All teams registered</p>
        </div>
      </div>
    </div>
  );
}
