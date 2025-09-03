"use client"
import React, { useState, useEffect } from 'react';

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTrophy, 
  FaSearch, 
  FaMedal, 
  FaCrown, 
  FaStar,
  FaUsers,
  FaLinkedin,
  FaFilter,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEye,
  FaEyeSlash,
  FaFire,
  FaRocket,
  FaChartLine
} from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

interface LeaderboardEntry {
  id: number;
  team_name: string;
  total_members: number;
  linkedin_posts: number;
  round1_points: number;
  round2_points: number | null;
  round3_points: number | null;
  round3_technical_points: number | null;
  round3_presentation_points: number | null;
  total_points: number;
  team_type: 'VIT' | 'External';
  registration_date: string;
  last_updated: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface SortConfig {
  key: keyof LeaderboardEntry;
  direction: 'asc' | 'desc';
}

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'total_points', direction: 'desc' });
  const [showRound2, setShowRound2] = useState<boolean>(false);
  const [showRound3, setShowRound3] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'top10' | 'top20'>('all');

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    if (!supabase) {
      console.warn('Supabase client not available');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('total_points', { ascending: false });

      if (error) throw error;
      setLeaderboardData(data || []);
    } catch (error: any) {
      console.error('Error fetching leaderboard data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key: keyof LeaderboardEntry) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof LeaderboardEntry) => {
    if (sortConfig.key !== key) {
      return <FaSort className="h-4 w-4 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' 
      ? <FaSortUp className="h-4 w-4 text-purple-400" />
      : <FaSortDown className="h-4 w-4 text-purple-400" />;
  };

  const getPositionIcon = (position: number) => {
    if (position === 1) return <FaCrown className="h-7 w-7 text-yellow-400 drop-shadow-lg" />;
    if (position === 2) return <FaMedal className="h-6 w-6 text-gray-300 drop-shadow-lg" />;
    if (position === 3) return <FaMedal className="h-6 w-6 text-amber-600 drop-shadow-lg" />;
    if (position <= 10) return <FaFire className="h-5 w-5 text-orange-500" />;
    return <FaTrophy className="h-5 w-5 text-purple-400" />;
  };

  const getPositionColor = (position: number) => {
    if (position === 1) return 'bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border-l-4 border-yellow-400 shadow-lg';
    if (position === 2) return 'bg-gradient-to-r from-gray-400/10 to-gray-600/10 border-l-4 border-gray-400 shadow-lg';
    if (position === 3) return 'bg-gradient-to-r from-amber-600/10 to-amber-800/10 border-l-4 border-amber-600 shadow-lg';
    if (position <= 10) return 'bg-gradient-to-r from-orange-500/5 to-red-500/5 border-l-2 border-orange-500';
    return 'bg-gray-800/20 border-l-2 border-purple-700/30 hover:bg-purple-900/10';
  };

  const getPositionBadge = (position: number) => {
    if (position === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black';
    if (position === 2) return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
    if (position === 3) return 'bg-gradient-to-r from-amber-600 to-amber-800 text-white';
    if (position <= 10) return 'bg-gradient-to-r from-orange-500 to-red-500 text-white';
    return 'bg-gray-700 text-gray-300';
  };

  // Safe sorting function
  const safeSort = (array: LeaderboardEntry[], key: keyof LeaderboardEntry, direction: 'asc' | 'desc'): LeaderboardEntry[] => {
    return [...array].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return direction === 'asc' ? -1 : 1;
      if (bValue == null) return direction === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const sortedData = safeSort(leaderboardData, sortConfig.key, sortConfig.direction);

  const filteredData = sortedData.filter(entry => {
    const matchesSearch = entry.team_name.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedFilter === 'top10') return matchesSearch && sortedData.indexOf(entry) < 10;
    if (selectedFilter === 'top20') return matchesSearch && sortedData.indexOf(entry) < 20;
    return matchesSearch;
  });

  // Find searched team's position
  const searchedTeamPosition = searchTerm ? sortedData.findIndex(entry => 
    entry.team_name.toLowerCase().includes(searchTerm.toLowerCase())
  ) + 1 : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-purple-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-purple-300 text-lg">Loading Leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-purple-950 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-gray-900/80 backdrop-blur-xl shadow-2xl border-b border-purple-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="text-center lg:text-left">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 flex items-center justify-center lg:justify-start"
              >
                <FaTrophy className="mr-4 h-10 w-10" />
                MERN Matrix Leaderboard
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-3 text-lg text-purple-200/80"
              >
                Track your team's performance across all rounds
              </motion.p>
            </div>
            <div className="flex items-center justify-center lg:justify-end space-x-6">
              <div className="flex items-center space-x-3 bg-gray-800/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-purple-700/30">
                <FaStar className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-medium text-purple-200">
                  {leaderboardData.length} Teams
                </span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-purple-700/30">
                <FaRocket className="h-5 w-5 text-purple-400" />
                <span className="text-sm font-medium text-purple-200">
                  Round 0 Complete
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >
          <div className="flex flex-col space-y-4 flex-1 max-w-md mx-auto lg:mx-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-purple-400" />
              </div>
              <input
                type="text"
                placeholder="Search for your team..."
                className="block w-full pl-12 pr-4 py-4 border border-purple-700/30 rounded-2xl leading-5 bg-gray-800/50 backdrop-blur-sm placeholder-purple-300/50 focus:outline-none focus:placeholder-purple-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white text-lg transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Search Result Display */}
            {searchTerm && searchedTeamPosition && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-xl border border-purple-500/30 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FaCrown className="h-6 w-6 text-yellow-400" />
                    <div>
                      <p className="text-sm font-medium text-purple-300">Your Team Position</p>
                      <p className="text-lg font-bold text-white">#{searchedTeamPosition}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-purple-300">Out of {leaderboardData.length} teams</p>
                    <p className="text-sm font-medium text-white">
                      {Math.round((searchedTeamPosition / leaderboardData.length) * 100)}% percentile
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3">
            {/* Filter Buttons */}
            <div className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 border border-purple-700/30">
              {[
                { key: 'all', label: 'All Teams', icon: FaUsers },
                { key: 'top10', label: 'Top 10', icon: FaCrown },
                { key: 'top20', label: 'Top 20', icon: FaMedal }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key as any)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedFilter === filter.key
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-purple-300 hover:text-purple-200 hover:bg-gray-700/50'
                  }`}
                >
                  <filter.icon className="mr-2 h-4 w-4" />
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Round Toggle Buttons */}
            <div className="flex items-center space-x-2">
              <button 
                className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  showRound2 
                    ? 'bg-purple-600 text-white shadow-lg' 
                    : 'bg-gray-700/50 text-purple-300 hover:bg-gray-600/50'
                }`}
                onClick={() => setShowRound2(!showRound2)}
              >
                {showRound2 ? <FaEye className="mr-2" /> : <FaEyeSlash className="mr-2" />}
                Round 2
              </button>
              <button 
                className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  showRound3 
                    ? 'bg-purple-600 text-white shadow-lg' 
                    : 'bg-gray-700/50 text-purple-300 hover:bg-gray-600/50'
                }`}
                onClick={() => setShowRound3(!showRound3)}
              >
                {showRound3 ? <FaEye className="mr-2" /> : <FaEyeSlash className="mr-2" />}
                Round 3
              </button>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900/60 backdrop-blur-xl shadow-2xl overflow-hidden rounded-2xl border border-purple-700/30"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-purple-700/30">
              <thead className="bg-gray-800/80 backdrop-blur-sm">
                <tr>
                  <th className="px-6 py-5 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">
                    Team Name
                  </th>
                  <th className="px-6 py-5 text-center text-xs font-bold text-purple-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-5 text-center text-xs font-bold text-purple-300 uppercase tracking-wider">
                    <div className="flex items-center justify-center space-x-2">
                      <FaUsers className="h-4 w-4" />
                      <span>Members</span>
                    </div>
                  </th>
                  <th className="px-6 py-5 text-center text-xs font-bold text-purple-300 uppercase tracking-wider">
                    <div className="flex items-center justify-center space-x-2">
                      <FaLinkedin className="h-4 w-4" />
                      <span>Posts</span>
                    </div>
                  </th>
                  <th 
                    className="px-6 py-5 text-center text-xs font-bold text-purple-300 uppercase tracking-wider cursor-pointer hover:text-purple-200 transition-colors"
                    onClick={() => handleSort('round1_points')}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span>Round 0</span>
                      {getSortIcon('round1_points')}
                    </div>
                  </th>
                  {showRound2 && (
                    <th 
                      className="px-6 py-5 text-center text-xs font-bold text-purple-300 uppercase tracking-wider cursor-pointer hover:text-purple-200 transition-colors"
                      onClick={() => handleSort('round2_points')}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span>Round 2</span>
                        {getSortIcon('round2_points')}
                      </div>
                    </th>
                  )}
                  {showRound3 && (
                    <>
                      <th 
                        className="px-6 py-5 text-center text-xs font-bold text-purple-300 uppercase tracking-wider cursor-pointer hover:text-purple-200 transition-colors"
                        onClick={() => handleSort('round3_points')}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <span>Round 3</span>
                          {getSortIcon('round3_points')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-5 text-center text-xs font-bold text-purple-300 uppercase tracking-wider cursor-pointer hover:text-purple-200 transition-colors"
                        onClick={() => handleSort('round3_technical_points')}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <span>Tech</span>
                          {getSortIcon('round3_technical_points')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-5 text-center text-xs font-bold text-purple-300 uppercase tracking-wider cursor-pointer hover:text-purple-200 transition-colors"
                        onClick={() => handleSort('round3_presentation_points')}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <span>Pres</span>
                          {getSortIcon('round3_presentation_points')}
                        </div>
                      </th>
                    </>
                  )}
                  <th 
                    className="px-6 py-5 text-center text-xs font-bold text-purple-300 uppercase tracking-wider cursor-pointer hover:text-purple-200 transition-colors"
                    onClick={() => handleSort('total_points')}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <FaTrophy className="h-4 w-4" />
                      <span>Total</span>
                      {getSortIcon('total_points')}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900/40 divide-y divide-purple-700/30">
                <AnimatePresence>
                  {filteredData.map((entry, index) => (
                    <motion.tr
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className={`hover:bg-purple-900/20 transition-all duration-300 ${getPositionColor(index + 1)}`}
                    >
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                            {getPositionIcon(index + 1)}
                          </div>
                          <div className="ml-4">
                            <div className={`text-sm font-bold px-3 py-1 rounded-full ${getPositionBadge(index + 1)}`}>
                              #{index + 1}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-lg font-bold text-white">{entry.team_name}</div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-center">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          entry.team_type === 'VIT' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {entry.team_type}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-center">
                        <div className="text-sm text-purple-300 font-medium bg-gray-800/50 rounded-lg px-3 py-1 inline-block">
                          {entry.total_members}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-center">
                        <div className="text-sm text-purple-300 font-medium bg-gray-800/50 rounded-lg px-3 py-1 inline-block">
                          {entry.linkedin_posts}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-center">
                        <div className={`text-lg font-bold px-3 py-1 rounded-lg inline-block ${
                          entry.round1_points > 0 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {entry.round1_points}
                        </div>
                      </td>
                      {showRound2 && (
                        <td className="px-6 py-5 whitespace-nowrap text-center">
                          <div className={`text-lg font-bold px-3 py-1 rounded-lg inline-block ${
                            entry.round2_points && entry.round2_points > 0 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                              : 'bg-gray-700/50 text-gray-500 border border-gray-600/30'
                          }`}>
                            {entry.round2_points || '-'}
                          </div>
                        </td>
                      )}
                      {showRound3 && (
                        <>
                          <td className="px-6 py-5 whitespace-nowrap text-center">
                            <div className={`text-lg font-bold px-3 py-1 rounded-lg inline-block ${
                              entry.round3_points && entry.round3_points > 0 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                : 'bg-gray-700/50 text-gray-500 border border-gray-600/30'
                            }`}>
                              {entry.round3_points || '-'}
                            </div>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap text-center">
                            <div className={`text-lg font-bold px-3 py-1 rounded-lg inline-block ${
                              entry.round3_technical_points && entry.round3_technical_points > 0 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                : 'bg-gray-700/50 text-gray-500 border border-gray-600/30'
                            }`}>
                              {entry.round3_technical_points || '-'}
                            </div>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap text-center">
                            <div className={`text-lg font-bold px-3 py-1 rounded-lg inline-block ${
                              entry.round3_presentation_points && entry.round3_presentation_points > 0 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                : 'bg-gray-700/50 text-gray-500 border border-gray-600/30'
                            }`}>
                              {entry.round3_presentation_points || '-'}
                            </div>
                          </td>
                        </>
                      )}
                      <td className="px-6 py-5 whitespace-nowrap text-center">
                        <div className="text-xl font-bold text-yellow-400 bg-yellow-500/10 px-4 py-2 rounded-xl border border-yellow-500/30">
                          {entry.total_points}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          {filteredData.length === 0 && (
            <div className="px-6 py-16 text-center">
              <FaSearch className="mx-auto h-16 w-16 text-purple-400/50 mb-4" />
              <h3 className="text-lg font-medium text-purple-200 mb-2">No teams found</h3>
              <p className="text-purple-200/70">
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-xl rounded-2xl border border-yellow-500/30 p-6 shadow-xl">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaCrown className="h-10 w-10 text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-yellow-300">Top Team</p>
                <p className="text-xl font-bold text-white">
                  {leaderboardData[0]?.team_name || 'N/A'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-6 shadow-xl">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaTrophy className="h-10 w-10 text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-300">Highest Score</p>
                <p className="text-xl font-bold text-white">
                  {leaderboardData[0]?.total_points || 0} pts
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-xl rounded-2xl border border-green-500/30 p-6 shadow-xl">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaUsers className="h-10 w-10 text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-green-300">Total Teams</p>
                <p className="text-xl font-bold text-white">
                  {leaderboardData.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 shadow-xl">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {/* <FaChartLine className="h-10 w-10 text-purple-400" /> */}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-300">Active Round</p>
                <p className="text-xl font-bold text-white">
                  Round 0
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default LeaderboardPage;
