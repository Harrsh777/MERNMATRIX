"use client"
import React, { useState, useEffect } from 'react';

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUsers, 
  FaCheck, 
  FaTimes, 
  FaSearch,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaSignInAlt,
  FaEye,
  FaEyeSlash,
  FaClock,
  FaCalendarAlt
} from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

// Define TypeScript interfaces
interface Session2Team {
  id: number;
  team_name: string;
  team_leader_name: string;
  team_leader_mobile?: string;
  team_leader_email?: string;
  participant_type?: string;
  member_name_1: string;
  member_registration_number_1: string;
  member_name_2?: string;
  member_registration_number_2?: string;
  member_name_3?: string;
  member_registration_number_3?: string;
  member_name_4?: string;
  member_registration_number_4?: string;
  selected_domain?: string;
  problem_statement?: string;
  selected_session?: number;
  created_at: string;
  present: boolean;
  rating?: number;
}

interface SortConfig {
  key: keyof Session2Team;
  direction: 'asc' | 'desc';
}

const Session2Dashboard = () => {
  const [teams, setTeams] = useState<Session2Team[]>([]);
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
  const [connectionError, setConnectionError] = useState<string>('');

  // Initialize loading state
  useEffect(() => {
    setLoading(false);
  }, []);

  // Focus password input when modal opens
  useEffect(() => {
    if (showAuthModal && !isAuthenticated) {
      const timer = setTimeout(() => {
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
          passwordInput.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showAuthModal, isAuthenticated]);

  // Debug: Log authentication state changes
  useEffect(() => {
    console.log('Session 2 Auth state changed:', { isAuthenticated, showAuthModal, userRole, loading });
  }, [isAuthenticated, showAuthModal, userRole, loading]);

  // Test Supabase connection
  const testConnection = async (): Promise<boolean> => {
    if (!supabase) {
      console.warn('Supabase client not available - check environment variables');
      setConnectionError('Supabase client not configured. Please check environment variables.');
      return false;
    }

    try {
      console.log('Testing Supabase connection...');
      const { error } = await supabase
        .from('team_registrations')
        .select('id')
        .limit(1);
      
      if (error) {
        console.error('Connection test failed:', error);
        setConnectionError(`Database connection failed: ${error.message}`);
        return false;
      }
      
      console.log('Supabase connection test successful');
      setConnectionError(''); // Clear any previous errors
      return true;
    } catch (error: any) {
      console.error('Connection test error:', error.message);
      setConnectionError(`Connection error: ${error.message}`);
      return false;
    }
  };

  // Fetch teams from Supabase
  useEffect(() => {
    if (isAuthenticated) {
      const initializeData = async () => {
        const isConnected = await testConnection();
        if (isConnected) {
          await fetchTeams();
        } else {
          console.error('Failed to connect to database');
          setConnectionError('Failed to connect to database. Please check your connection and try again.');
          setLoading(false);
        }
      };
      
      initializeData();
    }
  }, [isAuthenticated]);

  // Password validation function
  const validatePassword = (inputPassword: string): 'attendance' | 'admin' | null => {
    if (inputPassword === 'matrix') {
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

    setTimeout(() => {
      const role = validatePassword(password);
      if (role) {
        setIsAuthenticated(true);
        setUserRole(role);
        setPassword('');
        setPasswordError('');
        setShowAuthModal(false);
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
    setConnectionError('');
  };

  const retryConnection = async () => {
    setConnectionError('');
    setLoading(true);
    const isConnected = await testConnection();
    if (isConnected) {
      await fetchTeams();
    } else {
      setConnectionError('Failed to connect to database. Please check your connection and try again.');
      setLoading(false);
    }
  };

  const fetchTeams = async (): Promise<void> => {
    if (!supabase) {
      console.warn('Supabase client not available');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('Fetching teams from Supabase...');
      
      const { data, error } = await supabase
        .from('team_registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Teams fetched successfully:', data?.length || 0);
      setTeams(data || []);
    } catch (error: any) {
      console.error('Error fetching teams:', error.message);
      // Set empty array on error to prevent infinite loading
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  const markTeamPresent = async (teamId: number): Promise<void> => {
    if (!supabase) {
      console.warn('Supabase client not available for marking present');
      return;
    }

    try {
      console.log('Marking team as present:', teamId);
      const { error } = await supabase
        .from('team_registrations')
        .update({ present: true })
        .eq('id', teamId);

      if (error) {
        console.error('Supabase error marking present:', error);
        throw error;
      }

      setTeams(teams.map(team => 
        team.id === teamId ? { ...team, present: true } : team
      ));
      console.log('Team marked as present successfully');
    } catch (error: any) {
      console.error('Error marking team as present:', error.message);
    }
  };

  const markTeamAbsent = async (teamId: number): Promise<void> => {
    if (!supabase) {
      console.warn('Supabase client not available for marking absent');
      return;
    }

    try {
      console.log('Marking team as absent:', teamId);
      const { error } = await supabase
        .from('team_registrations')
        .update({ present: false })
        .eq('id', teamId);

      if (error) {
        console.error('Supabase error marking absent:', error);
        throw error;
      }

      setTeams(teams.map(team => 
        team.id === teamId ? { ...team, present: false } : team
      ));
      console.log('Team marked as absent successfully');
    } catch (error: any) {
      console.error('Error marking team as absent:', error.message);
    }
  };

  const markAllPresent = async (): Promise<void> => {
    if (!supabase) return;

    try {
      const { error } = await supabase
        .from('team_registrations')
        .update({ present: true });

      if (error) throw error;

      setTeams(teams.map(team => ({ ...team, present: true })));
    } catch (error: any) {
      console.error('Error marking all teams as present:', error.message);
    }
  };

  const markAllAbsent = async (): Promise<void> => {
    if (!supabase) return;

    try {
      const { error } = await supabase
        .from('team_registrations')
        .update({ present: false });

      if (error) throw error;

      setTeams(teams.map(team => ({ ...team, present: false })));
    } catch (error: any) {
      console.error('Error marking all teams as absent:', error.message);
    }
  };

  // Get unique domains for filtering
  const uniqueDomains = Array.from(new Set(teams.map(team => team.selected_domain).filter(Boolean)));

  // Filter teams based on search term, domain, and present status
  const filteredTeams = teams.filter(team => {
    const matchesSearch = !searchTerm || 
      team.team_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.team_leader_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.member_name_1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.member_name_2?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.member_name_3?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.member_name_4?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDomain = !domainFilter || team.selected_domain === domainFilter;
    const matchesPresent = showPresent || !team.present;

    return matchesSearch && matchesDomain && matchesPresent;
  });

  // Sort teams
  const sortedTeams = [...filteredTeams].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    // Handle undefined values
    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return sortConfig.direction === 'asc' ? 1 : -1;
    if (bValue === undefined) return sortConfig.direction === 'asc' ? -1 : 1;

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

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
      {/* Debug info - remove this later */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 bg-black/80 text-white p-2 rounded text-xs z-50">
          Auth: {isAuthenticated ? 'Yes' : 'No'} | Modal: {showAuthModal ? 'Yes' : 'No'} | Role: {userRole || 'None'} | Loading: {loading ? 'Yes' : 'No'} | Supabase: {supabase ? 'Connected' : 'Not Available'}
        </div>
      )}
      
      {/* Header */}
      <header className="bg-gray-800/70 backdrop-blur-md shadow-sm border-b border-purple-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Session 2 - {userRole === 'attendance' ? 'Attendance Dashboard' : 'Admin Dashboard'}
              </h1>
              {isAuthenticated && (
                <p className="text-sm text-purple-300/70 mt-1">
                  {userRole === 'attendance' ? 'Team Attendance Management' : 'Full Admin Access'}
                </p>
              )}
            </div>
                         {isAuthenticated && (
               <div className="flex items-center space-x-2">
                 <a
                   href="/dashboard"
                   className="flex items-center px-3 py-1.5 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-md hover:bg-blue-600/30 hover:text-blue-300 transition-all duration-300 text-sm"
                   title="Go to Session 1"
                 >
                   <FaUsers className="mr-1.5 h-3 w-3" />
                   Session 1
                 </a>
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
                <h2 className="text-2xl font-bold text-white mb-2">Session 2 Dashboard Access</h2>
                <p className="text-purple-200/70">
                  Enter your password to access Session 2 dashboard
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
                      Access Session 2 Dashboard
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
            {/* Connection Error Display */}
            {connectionError && (
              <div className="mb-6 bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaTimes className="h-5 w-5 text-red-400 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-red-300">Database Connection Error</h3>
                      <p className="text-sm text-red-400/70 mt-1">{connectionError}</p>
                    </div>
                  </div>
                  <button
                    onClick={retryConnection}
                    className="flex items-center px-3 py-1.5 bg-red-600/20 text-red-400 border border-red-600/30 rounded-md hover:bg-red-600/30 hover:text-red-300 transition-all duration-300 text-sm"
                  >
                    <FaCheck className="mr-1.5 h-3 w-3" />
                    Retry
                  </button>
                </div>
              </div>
            )}
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
                
                {/* Domain Filter */}
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
                    {uniqueDomains.map((domain) => (
                      <option key={domain} value={domain} className="bg-gray-800">
                        {domain}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FaChevronDown className="h-4 w-4 text-purple-400" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  className="flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
                  onClick={() => setShowPresent(!showPresent)}
                >
                  {showPresent ? <FaEyeSlash className="mr-2" /> : <FaEye className="mr-2" />}
                  {showPresent ? 'Hide Present' : 'Show Present'}
                </button>
                
              
               
                
                {(domainFilter || searchTerm) && (
                  <button 
                    className="flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 transform hover:scale-105"
                    onClick={() => {
                      setDomainFilter('');
                      setSearchTerm('');
                    }}
                  >
                    <FaTimes className="mr-2" />
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* Team List */}
            <div className="space-y-4">
              {sortedTeams.length === 0 ? (
                <div className="text-center py-12">
                  <FaUsers className="mx-auto h-12 w-12 text-purple-400/50 mb-4" />
                  <h3 className="text-lg font-medium text-purple-300 mb-2">No teams found</h3>
                  <p className="text-purple-400/70">
                    {searchTerm || domainFilter 
                      ? 'Try adjusting your search criteria' 
                      : 'No teams have registered for Session 2 yet'
                    }
                  </p>
                </div>
              ) : (
                                 sortedTeams.map((team, index) => (
                   <Session2TeamCard
                     key={team.id}
                     team={team}
                     index={index + 1}
                     onMarkPresent={markTeamPresent}
                     onMarkAbsent={markTeamAbsent}
                     userRole={userRole}
                   />
                 ))
              )}
            </div>

            {/* Summary Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-700/30">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaUsers className="h-8 w-8 text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-purple-300">Total Teams</p>
                    <p className="text-2xl font-bold text-white">{teams.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-700/30">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaCheck className="h-8 w-8 text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-purple-300">Present</p>
                    <p className="text-2xl font-bold text-white">{teams.filter(t => t.present).length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-700/30">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaTimes className="h-8 w-8 text-red-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-purple-300">Absent</p>
                    <p className="text-2xl font-bold text-white">{teams.filter(t => !t.present).length}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

// Session 2 Team Card Component Props
interface Session2TeamCardProps {
  team: Session2Team;
  index: number;
  onMarkPresent: (teamId: number) => void;
  onMarkAbsent: (teamId: number) => void;
  userRole: 'attendance' | 'admin' | null;
}

const Session2TeamCard: React.FC<Session2TeamCardProps> = ({ 
  team, 
  index,
  onMarkPresent,
  onMarkAbsent,
  userRole
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-purple-700/30 overflow-hidden hover:border-purple-600/50 transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">#{index}</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white truncate">{team.team_name}</h3>
              <p className="text-sm text-purple-300 truncate">Leader: {team.team_leader_name}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  team.present 
                    ? 'bg-green-500/20 text-green-300' 
                    : 'bg-red-500/20 text-red-300'
                }`}>
                  {team.present ? 'Present' : 'Absent'}
                </span>

                {team.selected_domain && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300">
                    {team.selected_domain}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleExpand}
              className="p-1.5 text-purple-400 hover:text-purple-300 transition-colors"
              title={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
        </div>
        
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-purple-700/30"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-purple-300 mb-2">Team Members</h4>
                  <div className="space-y-1 text-sm text-white">
                    <div className="flex justify-between">
                      <span>{team.member_name_1}</span>
                      <span className="text-purple-400">{team.member_registration_number_1}</span>
                    </div>
                    {team.member_name_2 && (
                      <div className="flex justify-between">
                        <span>{team.member_name_2}</span>
                        <span className="text-purple-400">{team.member_registration_number_2}</span>
                      </div>
                    )}
                    {team.member_name_3 && (
                      <div className="flex justify-between">
                        <span>{team.member_name_3}</span>
                        <span className="text-purple-400">{team.member_registration_number_3}</span>
                      </div>
                    )}
                    {team.member_name_4 && (
                      <div className="flex justify-between">
                        <span>{team.member_name_4}</span>
                        <span className="text-purple-400">{team.member_registration_number_4}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                                 <div>
                   <h4 className="text-sm font-medium text-purple-300 mb-2">Actions</h4>
                   <div className="space-y-2">
                     <div className="flex items-center space-x-2">
                       <span className="text-sm text-white">Status:</span>
                       <span className={`px-2 py-1 rounded text-xs font-medium ${
                         team.present 
                           ? 'bg-green-500/20 text-green-300' 
                           : 'bg-red-500/20 text-red-300'
                       }`}>
                         {team.present ? 'Present' : 'Absent'}
                       </span>
                     </div>
                     
                     <div className="flex items-center space-x-2">
                       <button
                         onClick={() => onMarkPresent(team.id)}
                         className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                           team.present 
                             ? 'bg-gray-600/20 text-gray-400 cursor-not-allowed' 
                             : 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                         }`}
                         disabled={team.present}
                         title={team.present ? 'Already marked as present' : 'Mark this team as present'}
                       >
                         Mark Present
                       </button>
                       <button
                         onClick={() => onMarkAbsent(team.id)}
                         className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                           !team.present 
                             ? 'bg-gray-600/20 text-gray-400 cursor-not-allowed' 
                             : 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                         }`}
                         disabled={!team.present}
                         title={!team.present ? 'Already marked as absent' : 'Mark this team as absent'}
                       >
                         Mark Absent
                       </button>
                     </div>
                   </div>
                  
                  {team.problem_statement && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-purple-300 mb-1">Problem Statement</h4>
                      <p className="text-sm text-white/80">{team.problem_statement}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Session2Dashboard;
