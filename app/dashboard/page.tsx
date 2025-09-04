"use client"
import React, { useState, useEffect } from 'react';

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUsers, 
  FaLightbulb, 
  FaCheck, 
  FaTimes, 
  FaPlus, 
  FaSearch,
  FaEdit,
  FaStar,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaSignInAlt,
  FaEye,
  FaEyeSlash,
  FaClock,
  FaCalendarAlt,
  FaTrophy,
  FaCrown,
  FaMedal,
  FaFire
} from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

// Define TypeScript interfaces
interface Team {
  id: number;
  team_name: string;
  team_leader_name: string;
  member_name_1: string;
  member_registration_number_1: string;
  member_name_2?: string;
  member_registration_number_2?: string;
  member_name_3?: string;
  member_registration_number_3?: string;
  member_name_4?: string;
  member_registration_number_4?: string;
  domain?: string;
  problem_statement?: string;
  created_at: string;
  has_entered: boolean;
  present: boolean;
  rating?: number;
  // Attendance fields for 4 sessions
  session1_first_present?: boolean;
  session1_first_attendance_time?: string;
  session1_first_notes?: string;
  session1_second_present?: boolean;
  session1_second_attendance_time?: string;
  session1_second_notes?: string;
  session2_first_present?: boolean;
  session2_first_attendance_time?: string;
  session2_first_notes?: string;
  session2_second_present?: boolean;
  session2_second_attendance_time?: string;
  session2_second_notes?: string;
}

interface ProjectIdea {
  id: string;
  team_number: number;
  team_name: string;
  team_leader_name: string;
  project_idea: string;
  ppt_link?: string;
  word_count: number;
  rating?: number;
  created_at: string;
}

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
  key: string;
  direction: 'asc' | 'desc';
}


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'session1-first' | 'session1-second' | 'session2-first' | 'session2-second'>('session1-first');
  const [teams, setTeams] = useState<Team[]>([]);
  const [projectIdeas, setProjectIdeas] = useState<ProjectIdea[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showPresent, setShowPresent] = useState<boolean>(true);
  const [domainFilter, setDomainFilter] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'created_at', direction: 'desc' });
  
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'attendance' | 'admin' | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(true);

  // Initialize loading state
  useEffect(() => {
    // Set loading to false initially since we don't need to fetch data until authenticated
    setLoading(false);
  }, []);

  // Debug: Log authentication state changes
  useEffect(() => {
    console.log('Auth state changed:', { isAuthenticated, showAuthModal, userRole, loading });
  }, [isAuthenticated, showAuthModal, userRole, loading]);

  // Fetch teams from Supabase
  useEffect(() => {
    if (isAuthenticated) {
      fetchTeams();
      fetchProjectIdeas();
      fetchLeaderboardData();
    }
  }, [isAuthenticated]);

  // Password validation function
  const validatePassword = (inputPassword: string): 'attendance' | 'admin' | null => {
    if (inputPassword === 'mernmat') {
      return 'attendance';
    } else if (inputPassword === 'security') {
      return 'admin';
    }
    return null;
  };

  // Handle password submission
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingAuth(true);
    setPasswordError('');

    // Simulate a brief loading state for better UX
    setTimeout(() => {
      const role = validatePassword(password);
      if (role) {
        setIsAuthenticated(true);
        setUserRole(role);
        setPassword('');
        setPasswordError('');
        setShowAuthModal(false);
        
        // Set appropriate tab based on role
        if (role === 'attendance') {
          setActiveTab('session1-first');
        } else {
          setActiveTab('session1-first');
        }
      } else {
        setPasswordError('Invalid password. Please try again.');
        setPassword('');
      }
      setIsCheckingAuth(false);
    }, 500);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setPassword('');
    setPasswordError('');
    setShowAuthModal(true);
    setActiveTab('session1-first');
  };

  const fetchTeams = async (): Promise<void> => {
    if (!supabase) {
      console.warn('Supabase client not available');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('team_registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTeams(data || []);
    } catch (error: any) {
      console.error('Error fetching teams:', error.message);
    } finally {
      setLoading(false);
    }
  };



  const fetchProjectIdeas = async (): Promise<void> => {
    if (!supabase) {
      console.warn('Supabase client not available');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('project_ideas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjectIdeas(data || []);
    } catch (error: any) {
      console.error('Error fetching project ideas:', error.message);
    }
  };

  const fetchLeaderboardData = async (): Promise<void> => {
    if (!supabase) {
      console.warn('Supabase client not available');
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
    }
  };


  const updateLeaderboardScore = async (teamId: number, field: string, value: number): Promise<void> => {
    if (!supabase) {
      console.warn('Supabase client not available');
      return;
    }

    try {
      const { error } = await supabase
        .from('leaderboard')
        .update({ [field]: value })
        .eq('id', teamId);

      if (error) throw error;
      await fetchLeaderboardData(); // Refresh data
    } catch (error: any) {
      console.error('Error updating leaderboard score:', error.message);
      alert('Error updating score. Please try again.');
    }
  };

  const addLeaderboardTeam = async (teamData: Partial<LeaderboardEntry>): Promise<void> => {
    if (!supabase) {
      console.warn('Supabase client not available');
      return;
    }

    try {
      const { error } = await supabase
        .from('leaderboard')
        .insert([teamData]);

      if (error) throw error;
      await fetchLeaderboardData(); // Refresh data
    } catch (error: any) {
      console.error('Error adding team to leaderboard:', error.message);
      alert('Error adding team. Please try again.');
    }
  };

  const deleteLeaderboardTeam = async (teamId: number): Promise<void> => {
    if (!supabase) {
      console.warn('Supabase client not available');
      return;
    }

    try {
      const { error } = await supabase
        .from('leaderboard')
        .delete()
        .eq('id', teamId);

      if (error) throw error;
      await fetchLeaderboardData(); // Refresh data
    } catch (error: any) {
      console.error('Error deleting team from leaderboard:', error.message);
      alert('Error deleting team. Please try again.');
    }
  };

  const updateTeamAttendance = async (teamId: number, sessionType: string, isPresent: boolean): Promise<void> => {
    if (!supabase) {
      console.warn('Supabase client not available');
      return;
    }

    try {
      const updateData: any = {};
      const attendanceTimeField = `${sessionType}_attendance_time`;
      updateData[`${sessionType}_present`] = isPresent;
      updateData[attendanceTimeField] = isPresent ? new Date().toISOString() : null;

      const { error } = await supabase
        .from('team_registrations')
        .update(updateData)
        .eq('id', teamId);

      if (error) {
        console.error('Database error:', error);
        if (error.message.includes('column') || error.message.includes('does not exist')) {
          alert('Attendance fields not found in database. Please run the schema update first:\n\n1. Go to your Supabase database\n2. Run the SQL from update_team_registrations_schema.sql\n3. Refresh this page');
          return;
        }
        throw error;
      }

      // Update local state
      setTeams(teams.map(team => 
        team.id === teamId ? { ...team, [`${sessionType}_present`]: isPresent } : team
      ));
    } catch (error: any) {
      console.error('Error updating team attendance:', error.message);
      alert('Error updating attendance. Please check the console for details.');
    }
  };

  const markTeamEntered = async (teamId: number): Promise<void> => {
    if (!supabase) {
      console.warn('Supabase client not available');
      return;
    }

    try {
      const { error } = await supabase
        .from('team_registrations')
        .update({ has_entered: true })
        .eq('id', teamId);

      if (error) throw error;
      
      setTeams(teams.map(team => 
        team.id === teamId ? { ...team, has_entered: true } : team
      ));
    } catch (error: any) {
      console.error('Error marking team as entered:', error.message);
    }
  };

  const unmarkTeamEntered = async (teamId: number): Promise<void> => {
    if (!supabase) {
      console.warn('Supabase client not available');
      return;
    }

    try {
      const { error } = await supabase
        .from('team_registrations')
        .update({ has_entered: false })
        .eq('id', teamId);

      if (error) throw error;
      
      setTeams(teams.map(team => 
        team.id === teamId ? { ...team, has_entered: false } : team
      ));
    } catch (error: any) {
      console.error('Error unmarking team as entered:', error.message);
    }
  };

  const rateTeam = async (teamId: number, rating: number): Promise<void> => {
    if (!supabase) {
      console.warn('Supabase client not available');
      return;
    }

    try {
      const { error } = await supabase
        .from('team_registrations')
        .update({ rating })
        .eq('id', teamId);

      if (error) {
        console.error('Database error:', error);
        if (error.message.includes('rating')) {
          alert('Please run the database schema update first. Check the database_schema.sql file.');
          return;
        }
        throw error;
      }
      
      setTeams(teams.map(team => 
        team.id === teamId ? { ...team, rating } : team
      ));
    } catch (error: any) {
      console.error('Error rating team:', error.message);
      alert('Error rating team. Please check the console for details.');
    }
  };


  const rateProjectIdea = async (ideaId: string, rating: number): Promise<void> => {
    if (!supabase) {
      console.warn('Supabase client not available');
      return;
    }

    try {
      const { error } = await supabase
        .from('project_ideas')
        .update({ rating })
        .eq('id', ideaId);

      if (error) {
        console.error('Database error:', error);
        if (error.message.includes('rating')) {
          alert('Please run the database schema update first. Check the database_schema.sql file.');
          return;
        }
        throw error;
      }
      
      setProjectIdeas(projectIdeas.map(idea => 
        idea.id === ideaId ? { ...idea, rating } : idea
      ));
    } catch (error: any) {
      console.error('Error rating project idea:', error.message);
      alert('Error rating project idea. Please check the console for details.');
    }
  };


  const handleSort = (key: string): void => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Safe sorting function with null checks
  const safeSort = <T extends Record<string, any>>(array: T[], key: string, direction: 'asc' | 'desc'): T[] => {
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

  // Sort teams with present teams at the bottom
  const sortedTeams = safeSort(teams, sortConfig.key, sortConfig.direction)
    .sort((a, b) => {
      if (a.present && !b.present) return 1;
      if (!a.present && b.present) return -1;
      return 0;
    });
    
  const sortedProjectIdeas = safeSort(projectIdeas, sortConfig.key, sortConfig.direction);

  // Get unique domains for filter dropdown
  const uniqueDomains = Array.from(
    new Set(teams.map(team => team.domain).filter(Boolean))
  ).sort() as string[];

  // Available domains from the registration form (used when no real domain data exists)
  const availableDomains = [
    'Cybersecurity & Privacy',
    'Governance & FinTech', 
    'Developer Tools & Cloud Infrastructure',
    'Healthcare & MedTech',
    'Education & Collaboration',
    'Sustainability & Smart Living'
  ];

  // Get current session type based on active tab
  const getCurrentSessionType = () => {
    switch (activeTab) {
      case 'session1-first': return 'session1_first';
      case 'session1-second': return 'session1_second';
      case 'session2-first': return 'session2_first';
      case 'session2-second': return 'session2_second';
      default: return 'session1_first';
    }
  };

  const currentSessionType = getCurrentSessionType();

  // Create teams with attendance data for current session
  const teamsWithAttendance = teams.map(team => ({
    ...team,
    present: team[`${currentSessionType}_present`] || false
  }));

  // Sort teams with present teams at the bottom
  const currentSortedTeams = safeSort(teamsWithAttendance, sortConfig.key, sortConfig.direction)
    .sort((a, b) => {
      if (a.present && !b.present) return 1;
      if (!a.present && b.present) return -1;
      return 0;
    });

  const filteredTeams = currentSortedTeams.filter(team => 
    (showPresent || !team.present) && (
      team.team_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.team_leader_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.problem_statement?.toLowerCase().includes(searchTerm.toLowerCase())
    ) && (
      !domainFilter || team.domain === domainFilter || 
      (uniqueDomains.length === 0 && domainFilter && availableDomains.includes(domainFilter))
    )
  );

  const filteredProjectIdeas = sortedProjectIdeas.filter(idea => 
    idea.team_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idea.team_leader_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idea.project_idea?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Only show loading if we're authenticated and actually loading data
  if (loading && isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-purple-950">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-950 text-white">
      {/* Header */}
      <header className="bg-gray-800/70 backdrop-blur-md shadow-sm border-b border-purple-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                {userRole === 'attendance' ? 'Attendance Dashboard' : 'Admin Dashboard'}
              </h1>
              {isAuthenticated && (
                <p className="text-sm text-purple-300/70 mt-1">
                  {userRole === 'attendance' ? 'Team Registration Management' : 'Full Admin Access'}
                </p>
              )}
            </div>
            {isAuthenticated && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-1.5 bg-red-600/20 text-red-400 border border-red-600/30 rounded-md hover:bg-red-600/30 hover:text-red-300 transition-all duration-300 text-sm"
                  title="Logout"
                >
                  <FaSignInAlt className="mr-1.5 h-3 w-3 rotate-180" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Authentication Modal */}
      <AnimatePresence>
        {(showAuthModal || !isAuthenticated) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-purple-700/30 p-8 w-full max-w-md shadow-2xl"
            >
              <div className="text-center mb-8">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
                  <FaSignInAlt className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Dashboard Access</h2>
                <p className="text-purple-200/70">
                  Enter your password to access the dashboard
                </p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-purple-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-purple-700/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter password"
                    required
                    disabled={isCheckingAuth}
                    autoFocus
                  />
                  {passwordError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-400 flex items-center"
                    >
                      <FaTimes className="mr-1" />
                      {passwordError}
                    </motion.p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isCheckingAuth || !password.trim()}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                >
                  {isCheckingAuth ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <FaSignInAlt className="mr-2" />
                      Access Dashboard
                    </>
                  )}
                </button>
              </form>


            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isAuthenticated && (
          <>
            {/* Tab Navigation */}
            <div className="flex border-b border-purple-700/30 mb-6 overflow-x-auto">
              <button
                className={`py-4 px-6 font-medium text-sm flex items-center whitespace-nowrap ${activeTab === 'session1-first' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-purple-200/70 hover:text-purple-300'}`}
                onClick={() => setActiveTab('session1-first')}
              >
                <FaUsers className="mr-2" /> Session 1 First ({teams.length})
              </button>
              <button
                className={`py-4 px-6 font-medium text-sm flex items-center whitespace-nowrap ${activeTab === 'session1-second' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-purple-200/70 hover:text-purple-300'}`}
                onClick={() => setActiveTab('session1-second')}
              >
                <FaUsers className="mr-2" /> Session 1 Second ({teams.length})
              </button>
              <button
                className={`py-4 px-6 font-medium text-sm flex items-center whitespace-nowrap ${activeTab === 'session2-first' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-purple-200/70 hover:text-purple-300'}`}
                onClick={() => setActiveTab('session2-first')}
              >
                <FaUsers className="mr-2" /> Session 2 First ({teams.length})
              </button>
              <button
                className={`py-4 px-6 font-medium text-sm flex items-center whitespace-nowrap ${activeTab === 'session2-second' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-purple-200/70 hover:text-purple-300'}`}
                onClick={() => setActiveTab('session2-second')}
              >
                <FaUsers className="mr-2" /> Session 2 Second ({teams.length})
              </button>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="h-5 w-5 text-purple-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search teams..."
                    className="block w-full pl-10 pr-3 py-2 border border-purple-700/30 rounded-lg leading-5 bg-gray-800/50 backdrop-blur-sm placeholder-purple-300/50 focus:outline-none focus:placeholder-purple-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Domain Filter - For all tabs */}
                {(activeTab === 'session1-first' || activeTab === 'session1-second' || activeTab === 'session2-first' || activeTab === 'session2-second') && (
                  <div className="relative flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaFilter className="h-5 w-5 text-purple-400" />
                    </div>
                    <select
                      value={domainFilter}
                      onChange={(e) => setDomainFilter(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-purple-700/30 rounded-lg leading-5 bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-white appearance-none"
                    >
                      <option value="">All Domains</option>
                      {uniqueDomains.length > 0 ? (
                        uniqueDomains.map((domain) => (
                          <option key={domain} value={domain} className="bg-gray-800">
                            {domain}
                          </option>
                        ))
                      ) : (
                        availableDomains.map((domain) => (
                          <option key={domain} value={domain} className="bg-gray-800">
                            {domain}
                          </option>
                        ))
                      )}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FaChevronDown className="h-4 w-4 text-purple-400" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {(activeTab === 'session1-first' || activeTab === 'session1-second' || activeTab === 'session2-first' || activeTab === 'session2-second') && (
                  <>
                    <button 
                      className="flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
                      onClick={() => setShowPresent(!showPresent)}
                    >
                      {showPresent ? <FaEyeSlash className="mr-2" /> : <FaEye className="mr-2" />}
                      {showPresent ? 'Hide Present' : 'Show Present'}
                    </button>
                    
                    {(domainFilter || searchTerm) && (
                      <button 
                        className="flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105"
                        onClick={() => {
                          setDomainFilter('');
                          setSearchTerm('');
                        }}
                      >
                        <FaTimes className="mr-2" />
                        Clear Filters
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Content based on active tab and role */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TeamRegistrations 
                  teams={filteredTeams} 
                  uniqueDomains={uniqueDomains}
                  onMarkEntered={markTeamEntered}
                  onUnmarkEntered={unmarkTeamEntered}
                  onMarkPresent={(teamId) => updateTeamAttendance(teamId, currentSessionType, true)}
                  onMarkAbsent={(teamId) => updateTeamAttendance(teamId, currentSessionType, false)}
                  onRate={rateTeam}
                  userRole={userRole}
                />
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </main>
    </div>
  );
};

// Team Registrations Component Props
interface TeamRegistrationsProps {
  teams: Team[];
  uniqueDomains: string[];
  onMarkEntered: (teamId: number) => void;
  onUnmarkEntered: (teamId: number) => void;
  onMarkPresent: (teamId: number) => void;
  onMarkAbsent: (teamId: number) => void;
  onRate: (teamId: number, rating: number) => void;
  userRole: 'attendance' | 'admin' | null;
}

// Extended Team interface for numbering
interface TeamWithNumber extends Team {
  registrationNumber: number;
}

const TeamRegistrations: React.FC<TeamRegistrationsProps> = ({ 
  teams, 
  uniqueDomains,
  onMarkEntered, 
  onUnmarkEntered,
  onMarkPresent,
  onMarkAbsent,
  onRate,
  userRole
}) => {
  const [expandedTeams, setExpandedTeams] = useState<Record<string, boolean>>({});

  // Sort teams by registration timestamp (earliest first) to get proper numbering
  const teamsWithNumbers: TeamWithNumber[] = [...teams]
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .map((team, index) => ({ ...team, registrationNumber: index + 1 }));

  const toggleExpand = (teamId: number) => {
    setExpandedTeams(prev => ({
      ...prev,
      [teamId]: !prev[teamId]
    }));
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

  return (
    <div className="bg-gray-800/40 backdrop-blur-md shadow overflow-hidden rounded-xl border border-purple-700/30">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-purple-300">Team Registrations</h3>
            <p className="mt-1 max-w-2xl text-sm text-purple-200/70">
              All registered teams and their information.
              {teamsWithNumbers.length !== teams.length && (
                <span className="ml-2 text-blue-400 font-medium">
                  ({teamsWithNumbers.length} of {teams.length} teams shown)
                </span>
              )}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-purple-300">
              Total Teams: <span className="font-bold text-white">{teams.length}</span>
            </div>
            <div className="text-sm text-purple-300">
              Domains: <span className="font-bold text-white">{uniqueDomains.length}</span>
            </div>
          </div>
        </div>
      </div>
      
             {teamsWithNumbers.length === 0 ? (
         <div className="px-4 py-12 text-center">
           <p className="text-purple-200/70">No teams found.</p>
         </div>
       ) : (
         <ul className="divide-y divide-purple-700/30">
           {teamsWithNumbers.map((team, index) => (
            <motion.li 
              key={team.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`px-4 py-5 sm:px-6 ${team.has_entered ? 'bg-purple-900/20' : ''} ${team.present ? 'bg-green-900/20' : 'bg-red-900/20'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex flex-col mr-4">
                    <button
                      onClick={() => team.present ? onMarkAbsent(team.id) : onMarkPresent(team.id)}
                      className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center transition-all duration-200 ${team.present ? 'bg-green-500 text-white shadow-lg' : 'border-2 border-red-500 hover:bg-red-500/20'}`}
                      title={team.present ? 'Mark as absent' : 'Mark as present'}
                    >
                      {team.present && <FaCheck className="h-3 w-3" />}
                      {!team.present && <FaTimes className="h-3 w-3 text-red-500" />}
                    </button>
                    <span className="text-xs mt-1 text-center font-medium">{team.present ? 'Present' : 'Absent'}</span>
                  </div>
                                     <div>
                     <div className="flex items-center space-x-3">
                       <div className="flex-shrink-0">
                         <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                           <span className="text-white font-bold text-sm">#{team.registrationNumber}</span>
                         </div>
                       </div>
                       <div>
                         <h4 className="text-lg font-medium text-white">{team.team_name}</h4>
                         <p className="text-sm text-purple-300">Leader: {team.team_leader_name}</p>
                         {team.domain && (
                           <div className="flex items-center mt-1">
                             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                               {team.domain}
                             </span>
                           </div>
                         )}
                         <div className="flex items-center mt-1 text-xs text-purple-200/70">
                           <FaClock className="mr-1" />
                           {formatTimestamp(team.created_at)}
                         </div>
                       </div>
                     </div>
                   </div>
                </div>
                <div className="flex items-center space-x-2">
                  {/* Team Rating - Only for admin users */}
                  {userRole === 'admin' && (
                    <div className="flex items-center mr-4">
                      <InteractiveRatingStars 
                        rating={team.rating || 0} 
                        onRatingChange={(rating) => onRate(team.id, rating)}
                      />
                    </div>
                  )}
                  
                  <button
                    onClick={() => toggleExpand(team.id)}
                    className="p-1.5 text-purple-400 hover:text-purple-300 transition-colors"
                    title={expandedTeams[team.id] ? "Collapse" : "Expand"}
                  >
                    {expandedTeams[team.id] ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
              </div>
              
              <AnimatePresence>
                {expandedTeams[team.id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden"
                  >
                    <div>
                      <h5 className="text-sm font-medium text-purple-400">Team Members</h5>
                      <ul className="mt-1 text-sm text-white space-y-1">
                        <li>{team.member_name_1} ({team.member_registration_number_1})</li>
                        {team.member_name_2 && <li>{team.member_name_2} ({team.member_registration_number_2})</li>}
                        {team.member_name_3 && <li>{team.member_name_3} ({team.member_registration_number_3})</li>}
                        {team.member_name_4 && <li>{team.member_name_4} ({team.member_registration_number_4})</li>}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-purple-400">Additional Information</h5>
                      <dl className="mt-1 text-sm text-white space-y-2">

                        <div className="flex">
                          <dt className="font-medium">Problem Statement:</dt>
                          <dd className="ml-2">{team.problem_statement || 'Not provided'}</dd>
                        </div>
                        <div className="flex items-center">
                          <dt className="font-medium">Status:</dt>
                          <dd className="ml-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${team.has_entered ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                              {team.has_entered ? 'Entered' : 'Not Entered'}
                            </span>
                          </dd>
                          {userRole === 'admin' && (
                            <button
                              onClick={() => team.has_entered ? onUnmarkEntered(team.id) : onMarkEntered(team.id)}
                              className="ml-2 p-1 text-sm bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                              title={team.has_entered ? 'Mark as not entered' : 'Mark as entered'}
                            >
                              {team.has_entered ? <FaTimes className="h-3 w-3 text-red-400" /> : <FaCheck className="h-3 w-3 text-green-400" />}
                            </button>
                          )}
                        </div>
                      </dl>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Project Ideas Component Props
interface ProjectIdeasProps {
  ideas: ProjectIdea[];
  onRate: (ideaId: string, rating: number) => void;
}

const ProjectIdeas: React.FC<ProjectIdeasProps> = ({ ideas, onRate }) => {
  const [expandedIdeas, setExpandedIdeas] = useState<Record<string, boolean>>({});

  const toggleExpand = (ideaId: string) => {
    setExpandedIdeas(prev => ({
      ...prev,
      [ideaId]: !prev[ideaId]
    }));
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

  return (
    <div className="bg-gray-800/40 backdrop-blur-md shadow overflow-hidden rounded-xl border border-purple-700/30">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-purple-300">Project Ideas</h3>
        <p className="mt-1 max-w-2xl text-sm text-purple-200/70">All submitted project ideas for Round 2.</p>
      </div>
      
      {ideas.length === 0 ? (
        <div className="px-4 py-12 text-center">
          <p className="text-purple-200/70">No project ideas found.</p>
        </div>
      ) : (
        <ul className="divide-y divide-purple-700/30">
          {ideas.map((idea, index) => (
            <motion.li 
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="px-4 py-5 sm:px-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium text-white">{idea.team_name} (Team #{idea.team_number})</h4>
                  <p className="text-sm text-purple-300">Leader: {idea.team_leader_name}</p>
                  <div className="flex items-center mt-1 text-xs text-purple-200/70">
                    <FaClock className="mr-1" />
                    {formatTimestamp(idea.created_at)}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-purple-400 font-medium">{idea.word_count}/300 words</div>
                  <InteractiveRatingStars 
                    rating={idea.rating || 0} 
                    onRatingChange={(rating) => onRate(idea.id, rating)}
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-sm font-medium text-purple-400">Project Idea</h5>
                <div className="mt-1 text-sm text-white">
                  {expandedIdeas[idea.id] || (idea.project_idea && idea.project_idea.length <= 200) ? (
                    <p className="whitespace-pre-wrap">{idea.project_idea}</p>
                  ) : (
                    <p>{idea.project_idea?.substring(0, 200)}...</p>
                  )}
                  
                  {idea.project_idea && idea.project_idea.length > 200 && (
                    <button
                      onClick={() => toggleExpand(idea.id)}
                      className="mt-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors flex items-center"
                    >
                      {expandedIdeas[idea.id] ? 'Show less' : 'Read more'}
                      {expandedIdeas[idea.id] ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
                    </button>
                  )}
                </div>
              </div>

              {/* PPT Link Display */}
              {idea.ppt_link && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium text-purple-400">Presentation Link</h5>
                  <a 
                    href={idea.ppt_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 underline break-all transition-colors"
                  >
                    {idea.ppt_link}
                  </a>
                </div>
              )}
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Interactive Rating Stars Component
interface InteractiveRatingStarsProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const InteractiveRatingStars: React.FC<InteractiveRatingStarsProps> = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
        <button
          key={star}
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className="transition-all duration-200 hover:scale-110 focus:outline-none"
        >
          <FaStar 
            className={`h-4 w-4 ${
              star <= (hoverRating || rating) 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-500'
            }`}
          />
        </button>
      ))}
      <span className="text-sm font-medium text-white ml-2 min-w-[3rem]">
        {rating}/10
      </span>
    </div>
  );
};

// Leaderboard Management Component Props
interface LeaderboardManagementProps {
  leaderboardData: LeaderboardEntry[];
  onUpdateScore: (teamId: number, field: string, value: number) => void;
  onAddTeam: (teamData: Partial<LeaderboardEntry>) => void;
  onDeleteTeam: (teamId: number) => void;
}

const LeaderboardManagement: React.FC<LeaderboardManagementProps> = ({ 
  leaderboardData, 
  onUpdateScore, 
  onAddTeam, 
  onDeleteTeam 
}) => {
  const [editingTeam, setEditingTeam] = useState<number | null>(null);
  const [editingField, setEditingField] = useState<string>('');
  const [editValue, setEditValue] = useState<number>(0);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newTeam, setNewTeam] = useState<Partial<LeaderboardEntry>>({
    team_name: '',
    total_members: 0,
    linkedin_posts: 0,
    round1_points: 0,
    round2_points: 0,
    round3_points: 0,
    round3_technical_points: 0,
    round3_presentation_points: 0,
    team_type: 'VIT',
    notes: ''
  });

  const startEditing = (teamId: number, field: string, currentValue: number) => {
    setEditingTeam(teamId);
    setEditingField(field);
    setEditValue(currentValue);
  };

  const saveEdit = () => {
    if (editingTeam && editingField) {
      onUpdateScore(editingTeam, editingField, editValue);
      setEditingTeam(null);
      setEditingField('');
    }
  };

  const cancelEdit = () => {
    setEditingTeam(null);
    setEditingField('');
  };

  const handleAddTeam = () => {
    if (newTeam.team_name) {
      onAddTeam(newTeam);
      setNewTeam({
        team_name: '',
        total_members: 0,
        linkedin_posts: 0,
        round1_points: 0,
        round2_points: 0,
        round3_points: 0,
        round3_technical_points: 0,
        round3_presentation_points: 0,
        team_type: 'VIT',
        notes: ''
      });
      setShowAddForm(false);
    }
  };

  const getPositionIcon = (position: number) => {
    if (position === 1) return <FaCrown className="h-5 w-5 text-yellow-400" />;
    if (position === 2) return <FaMedal className="h-5 w-5 text-gray-400" />;
    if (position === 3) return <FaMedal className="h-5 w-5 text-amber-600" />;
    return <FaTrophy className="h-4 w-4 text-purple-400" />;
  };

  return (
    <div className="bg-gray-800/40 backdrop-blur-md shadow overflow-hidden rounded-xl border border-purple-700/30">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-purple-300">Leaderboard Management</h3>
          <p className="mt-1 max-w-2xl text-sm text-purple-200/70">Manage team scores and rankings.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <FaPlus className="mr-2" />
          Add Team
        </button>
      </div>

      {/* Add Team Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="px-4 py-4 bg-gray-700/50 border-b border-purple-700/30"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Team Name *"
              value={newTeam.team_name}
              onChange={(e) => setNewTeam({...newTeam, team_name: e.target.value})}
              className="px-3 py-2 bg-gray-800 border border-purple-700/30 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="number"
              placeholder="Total Members"
              value={newTeam.total_members}
              onChange={(e) => setNewTeam({...newTeam, total_members: parseInt(e.target.value) || 0})}
              className="px-3 py-2 bg-gray-800 border border-purple-700/30 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
              min="1"
              max="6"
            />
            <input
              type="number"
              placeholder="LinkedIn Posts"
              value={newTeam.linkedin_posts}
              onChange={(e) => setNewTeam({...newTeam, linkedin_posts: parseInt(e.target.value) || 0})}
              className="px-3 py-2 bg-gray-800 border border-purple-700/30 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
              min="0"
            />
            <select
              value={newTeam.team_type}
              onChange={(e) => setNewTeam({...newTeam, team_type: e.target.value as 'VIT' | 'External'})}
              className="px-3 py-2 bg-gray-800 border border-purple-700/30 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
            >
              <option value="VIT">VIT Student</option>
              <option value="External">External</option>
            </select>
            <input
              type="number"
              placeholder="Round 0 Points"
              value={newTeam.round1_points}
              onChange={(e) => setNewTeam({...newTeam, round1_points: parseInt(e.target.value) || 0})}
              className="px-3 py-2 bg-gray-800 border border-purple-700/30 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
              min="0"
              max="5"
            />
            <input
              type="number"
              placeholder="Round 2 Points"
              value={newTeam.round2_points || 0}
              onChange={(e) => setNewTeam({...newTeam, round2_points: parseInt(e.target.value) || 0})}
              className="px-3 py-2 bg-gray-800 border border-purple-700/30 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
              min="0"
            />
            <input
              type="number"
              placeholder="Round 3 Points"
              value={newTeam.round3_points || 0}
              onChange={(e) => setNewTeam({...newTeam, round3_points: parseInt(e.target.value) || 0})}
              className="px-3 py-2 bg-gray-800 border border-purple-700/30 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
              min="0"
            />
            <textarea
              placeholder="Notes (optional)"
              value={newTeam.notes || ''}
              onChange={(e) => setNewTeam({...newTeam, notes: e.target.value})}
              className="px-3 py-2 bg-gray-800 border border-purple-700/30 rounded-lg text-white focus:ring-2 focus:ring-purple-500 resize-none"
              rows={2}
            />
            <div className="flex space-x-2 col-span-full">
              <button
                onClick={handleAddTeam}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <FaPlus className="mr-2" />
                Add Team
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-purple-700/30">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                Team Name
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-purple-300 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-purple-300 uppercase tracking-wider">
                Members
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-purple-300 uppercase tracking-wider">
                Posts
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-purple-300 uppercase tracking-wider">
                Round 0
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-purple-300 uppercase tracking-wider">
                Round 2
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-purple-300 uppercase tracking-wider">
                Round 3
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-purple-300 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-purple-300 uppercase tracking-wider">
                Notes
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-purple-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800/20 divide-y divide-purple-700/30">
            {leaderboardData.map((entry, index) => (
              <tr key={entry.id} className="hover:bg-purple-900/20">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center">
                      {getPositionIcon(index + 1)}
                    </div>
                    <span className="ml-2 text-sm font-bold text-white">#{index + 1}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-white">{entry.team_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    entry.team_type === 'VIT' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {entry.team_type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {editingTeam === entry.id && editingField === 'total_members' ? (
                    <div className="flex items-center justify-center space-x-2">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 bg-gray-700 text-white text-center rounded"
                      />
                      <button onClick={saveEdit} className="text-green-400 hover:text-green-300">
                        <FaCheck className="h-4 w-4" />
                      </button>
                      <button onClick={cancelEdit} className="text-red-400 hover:text-red-300">
                        <FaTimes className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEditing(entry.id, 'total_members', entry.total_members)}
                      className="text-sm text-purple-300 hover:text-purple-200"
                    >
                      {entry.total_members}
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {editingTeam === entry.id && editingField === 'linkedin_posts' ? (
                    <div className="flex items-center justify-center space-x-2">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 bg-gray-700 text-white text-center rounded"
                      />
                      <button onClick={saveEdit} className="text-green-400 hover:text-green-300">
                        <FaCheck className="h-4 w-4" />
                      </button>
                      <button onClick={cancelEdit} className="text-red-400 hover:text-red-300">
                        <FaTimes className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEditing(entry.id, 'linkedin_posts', entry.linkedin_posts)}
                      className="text-sm text-purple-300 hover:text-purple-200"
                    >
                      {entry.linkedin_posts}
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {editingTeam === entry.id && editingField === 'round1_points' ? (
                    <div className="flex items-center justify-center space-x-2">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 bg-gray-700 text-white text-center rounded"
                      />
                      <button onClick={saveEdit} className="text-green-400 hover:text-green-300">
                        <FaCheck className="h-4 w-4" />
                      </button>
                      <button onClick={cancelEdit} className="text-red-400 hover:text-red-300">
                        <FaTimes className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEditing(entry.id, 'round1_points', entry.round1_points)}
                      className={`text-sm font-bold ${entry.round1_points > 0 ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {entry.round1_points}
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {editingTeam === entry.id && editingField === 'round2_points' ? (
                    <div className="flex items-center justify-center space-x-2">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 bg-gray-700 text-white text-center rounded"
                      />
                      <button onClick={saveEdit} className="text-green-400 hover:text-green-300">
                        <FaCheck className="h-4 w-4" />
                      </button>
                      <button onClick={cancelEdit} className="text-red-400 hover:text-red-300">
                        <FaTimes className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEditing(entry.id, 'round2_points', entry.round2_points || 0)}
                      className={`text-sm font-bold ${entry.round2_points && entry.round2_points > 0 ? 'text-green-400' : 'text-gray-500'}`}
                    >
                      {entry.round2_points || '-'}
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {editingTeam === entry.id && editingField === 'round3_points' ? (
                    <div className="flex items-center justify-center space-x-2">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 bg-gray-700 text-white text-center rounded"
                      />
                      <button onClick={saveEdit} className="text-green-400 hover:text-green-300">
                        <FaCheck className="h-4 w-4" />
                      </button>
                      <button onClick={cancelEdit} className="text-red-400 hover:text-red-300">
                        <FaTimes className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEditing(entry.id, 'round3_points', entry.round3_points || 0)}
                      className={`text-sm font-bold ${entry.round3_points && entry.round3_points > 0 ? 'text-green-400' : 'text-gray-500'}`}
                    >
                      {entry.round3_points || '-'}
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-lg font-bold text-yellow-400">
                    {entry.total_points}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-xs text-gray-400 max-w-32 truncate" title={entry.notes || 'No notes'}>
                    {entry.notes || '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => onDeleteTeam(entry.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                      title="Delete team"
                    >
                      <FaTimes className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        // Add edit functionality here
                        console.log('Edit team:', entry.id);
                      }}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      title="Edit team details"
                    >
                      <FaEdit className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default AdminDashboard;
