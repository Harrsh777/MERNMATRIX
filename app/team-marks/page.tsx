'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { 
  FaStar, 
  FaSearch, 
  FaFilter, 
  FaChevronDown, 
  FaChevronUp, 
  FaTimes,
  FaSave,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaUsers,
  FaTrophy,
  FaChartLine
} from 'react-icons/fa';

interface TeamMarks {
  id: number;
  team_number: number;
  team_name: string;
  team_leader_name: string;
  marks?: number;
  notes?: string;
  marked_by?: string;
  created_at: string;
  updated_at: string;
}

const TeamMarksPage = () => {
  const [teams, setTeams] = useState<TeamMarks[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showMarked, setShowMarked] = useState<boolean>(true);
  const [expandedTeams, setExpandedTeams] = useState<Record<number, boolean>>({});
  const [sortBy, setSortBy] = useState<'team_number' | 'team_name' | 'marks' | 'created_at'>('team_number');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Fetch teams from Supabase
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async (): Promise<void> => {
    if (!supabase) {
      console.warn('Supabase client not available');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('team_marks')
        .select('*')
        .order('team_number', { ascending: true });

      if (error) throw error;
      setTeams(data || []);
    } catch (error: any) {
      console.error('Error fetching team marks data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTeamMarks = async (teamId: number, field: string, value: any): Promise<void> => {
    if (!supabase) {
      console.warn('Supabase client not available');
      return;
    }

    try {
      const { error } = await supabase
        .from('team_marks')
        .update({ [field]: value })
        .eq('id', teamId);

      if (error) throw error;
      
      setTeams(teams.map(team => 
        team.id === teamId ? { ...team, [field]: value } : team
      ));
    } catch (error: any) {
      console.error('Error updating team marks:', error.message);
      alert('Error updating team marks. Please try again.');
    }
  };

  const toggleExpand = (teamId: number) => {
    setExpandedTeams(prev => ({
      ...prev,
      [teamId]: !prev[teamId]
    }));
  };

  const handleSort = (key: 'team_number' | 'team_name' | 'marks' | 'created_at') => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (key: string) => {
    if (sortBy !== key) return <FaChevronDown className="opacity-30" />;
    return sortOrder === 'asc' ? <FaChevronUp /> : <FaChevronDown />;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getMarksColor = (marks: number | null) => {
    if (marks === null) return 'text-gray-400';
    if (marks >= 9) return 'text-green-400';
    if (marks >= 8) return 'text-blue-400';
    if (marks >= 7) return 'text-yellow-400';
    if (marks >= 6) return 'text-orange-400';
    return 'text-red-400';
  };

  const getMarksGrade = (marks: number | null) => {
    if (marks === null) return 'Not Marked';
    if (marks >= 9) return 'A+';
    if (marks >= 8) return 'A';
    if (marks >= 7) return 'B+';
    if (marks >= 6) return 'B';
    if (marks >= 5) return 'C';
    return 'F';
  };

  // Filter and sort teams
  const filteredAndSortedTeams = teams
    .filter(team => {
      const matchesSearch = team.team_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           team.team_leader_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           team.notes?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesMarked = showMarked || team.marks === null;
      
      return matchesSearch && matchesMarked;
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];
      
      if (sortBy === 'marks') {
        aValue = aValue ?? -1; // null values go to end
        bValue = bValue ?? -1;
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const markedCount = teams.filter(t => t.marks !== null).length;
  const averageMarks = markedCount > 0 
    ? (teams.filter(t => t.marks !== null).reduce((sum, t) => sum + (t.marks || 0), 0) / markedCount).toFixed(1)
    : '0.0';

  if (loading) {
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
      <div className="bg-black/20 backdrop-blur-md border-b border-purple-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Team Marks</h1>
              <p className="text-purple-200/70">Mark and evaluate teams (0-10 scale)</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{teams.length}</div>
                <div className="text-sm text-purple-300">Total Teams</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{markedCount}</div>
                <div className="text-sm text-purple-300">Marked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{averageMarks}</div>
                <div className="text-sm text-purple-300">Average</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-purple-400" />
              </div>
              <input
                type="text"
                placeholder="Search teams or members..."
                className="block w-full pl-10 pr-3 py-2 border border-purple-700/30 rounded-lg leading-5 bg-gray-800/50 backdrop-blur-sm placeholder-purple-300/50 focus:outline-none focus:placeholder-purple-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              className="flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
              onClick={() => setShowMarked(!showMarked)}
            >
              {showMarked ? <FaEyeSlash className="mr-2" /> : <FaEye className="mr-2" />}
              {showMarked ? 'Hide Marked' : 'Show Marked'}
            </button>
            
            {searchTerm && (
              <button 
                className="flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105"
                onClick={() => setSearchTerm('')}
              >
                <FaTimes className="mr-2" />
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* Teams Table */}
        <div className="bg-gray-800/40 backdrop-blur-md shadow overflow-hidden rounded-xl border border-purple-700/30">
          {filteredAndSortedTeams.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <p className="text-purple-200/70">No teams found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-purple-700/30">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th 
                      className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider cursor-pointer hover:text-purple-200"
                      onClick={() => handleSort('team_number')}
                    >
                      <div className="flex items-center">
                        Team #
                        {getSortIcon('team_number')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider cursor-pointer hover:text-purple-200"
                      onClick={() => handleSort('team_name')}
                    >
                      <div className="flex items-center">
                        Team Name
                        {getSortIcon('team_name')}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Leader
                    </th>
                    <th 
                      className="px-6 py-4 text-center text-xs font-medium text-purple-300 uppercase tracking-wider cursor-pointer hover:text-purple-200"
                      onClick={() => handleSort('marks')}
                    >
                      <div className="flex items-center justify-center">
                        Marks (0-10)
                        {getSortIcon('marks')}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800/20 divide-y divide-purple-700/30">
                  {filteredAndSortedTeams.map((team, index) => (
                    <motion.tr 
                      key={team.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className="hover:bg-purple-900/10 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">#{team.team_number}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{team.team_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-purple-300">{team.team_leader_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center">
                          <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={team.marks || ''}
                            onChange={(e) => updateTeamMarks(team.id, 'marks', e.target.value ? parseFloat(e.target.value) : null)}
                            className="w-20 px-2 py-1 bg-gray-700 text-white text-center rounded border border-purple-700/30 focus:ring-2 focus:ring-purple-500"
                            placeholder="0-10"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`text-sm font-bold ${getMarksColor(team.marks ?? null)}`}>
                          {getMarksGrade(team.marks ?? null)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => toggleExpand(team.id)}
                          className="p-1.5 text-purple-400 hover:text-purple-300 transition-colors"
                          title={expandedTeams[team.id] ? "Collapse" : "Expand"}
                        >
                          {expandedTeams[team.id] ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {filteredAndSortedTeams.map((team) => (
            expandedTeams[team.id] && (
              <motion.div
                key={`details-${team.id}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 bg-gray-800/40 backdrop-blur-md rounded-xl border border-purple-700/30 overflow-hidden"
              >
                <div className="px-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-purple-400 mb-2">Team Information</h5>
                      <div className="space-y-2 text-sm text-white">
                        <div><span className="font-medium">Team Number:</span> {team.team_number}</div>
                        <div><span className="font-medium">Team Name:</span> {team.team_name}</div>
                        <div><span className="font-medium">Leader:</span> {team.team_leader_name}</div>
                        <div><span className="font-medium">Created:</span> {formatTimestamp(team.created_at)}</div>
                        {team.marked_by && (
                          <div><span className="font-medium">Marked By:</span> {team.marked_by}</div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-purple-400 mb-2">Marks & Notes</h5>
                      <div className="space-y-2">
                        <div>
                          <label className="text-sm text-gray-300">Notes:</label>
                          <textarea
                            value={team.notes || ''}
                            onChange={(e) => updateTeamMarks(team.id, 'notes', e.target.value)}
                            className="w-full mt-1 px-2 py-1 bg-gray-700 text-white text-sm rounded border border-purple-700/30 resize-none"
                            rows={3}
                            placeholder="Add notes about this team's performance..."
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-300">Marked By:</label>
                          <input
                            type="text"
                            value={team.marked_by || ''}
                            onChange={(e) => updateTeamMarks(team.id, 'marked_by', e.target.value)}
                            className="w-full mt-1 px-2 py-1 bg-gray-700 text-white text-sm rounded border border-purple-700/30"
                            placeholder="Enter your name..."
                          />
                        </div>
                        {team.updated_at && (
                          <div className="text-xs text-purple-200/70">
                            Last updated: {formatTimestamp(team.updated_at)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default TeamMarksPage;
