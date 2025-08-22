"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUsers, 
  FaLightbulb, 
  FaCheck, 
  FaTimes, 
  FaArchive, 
  FaPlus, 
  FaSearch,
  FaEdit,
  FaTrash,
  FaStar,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaSignInAlt,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

// Define TypeScript interfaces
interface Team {
  id: string;
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
  member_utr_id?: string;
  created_at: string;
  has_entered: boolean;
  archived: boolean;
}

interface ProjectIdea {
  id: string;
  team_number: number;
  team_name: string;
  team_leader_name: string;
  project_idea: string;
  word_count: number;
  rating?: number;
  created_at: string;
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'registrations' | 'project-ideas'>('registrations');
  const [teams, setTeams] = useState<Team[]>([]);
  const [projectIdeas, setProjectIdeas] = useState<ProjectIdea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'created_at', direction: 'desc' });

  // Fetch teams from Supabase
  useEffect(() => {
    fetchTeams();
    fetchProjectIdeas();
  }, []);

  const fetchTeams = async (): Promise<void> => {
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

  const archiveTeam = async (teamId: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('team_registrations')
        .update({ archived: true })
        .eq('id', teamId);

      if (error) throw error;
      
      // Update local state
      setTeams(teams.filter(team => team.id !== teamId));
    } catch (error: any) {
      console.error('Error archiving team:', error.message);
    }
  };

  const markTeamEntered = async (teamId: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('team_registrations')
        .update({ has_entered: true })
        .eq('id', teamId);

      if (error) throw error;
      
      // Update local state
      setTeams(teams.map(team => 
        team.id === teamId ? { ...team, has_entered: true } : team
      ));
    } catch (error: any) {
      console.error('Error marking team as entered:', error.message);
    }
  };

  const unmarkTeamEntered = async (teamId: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('team_registrations')
        .update({ has_entered: false })
        .eq('id', teamId);

      if (error) throw error;
      
      // Update local state
      setTeams(teams.map(team => 
        team.id === teamId ? { ...team, has_entered: false } : team
      ));
    } catch (error: any) {
      console.error('Error unmarking team as entered:', error.message);
    }
  };

  const rateProjectIdea = async (ideaId: string, rating: number): Promise<void> => {
    try {
      const { error } = await supabase
        .from('project_ideas')
        .update({ rating })
        .eq('id', ideaId);

      if (error) throw error;
      
      // Update local state
      setProjectIdeas(projectIdeas.map(idea => 
        idea.id === ideaId ? { ...idea, rating } : idea
      ));
    } catch (error: any) {
      console.error('Error rating project idea:', error.message);
    }
  };

  const deleteProjectIdea = async (ideaId: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('project_ideas')
        .delete()
        .eq('id', ideaId);

      if (error) throw error;
      
      // Update local state
      setProjectIdeas(projectIdeas.filter(idea => idea.id !== ideaId));
    } catch (error: any) {
      console.error('Error deleting project idea:', error.message);
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
      
      // Handle undefined or null values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return direction === 'asc' ? -1 : 1;
      if (bValue == null) return direction === 'asc' ? 1 : -1;
      
      // Handle different types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      // Handle numbers and dates
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const sortedTeams = safeSort(teams, sortConfig.key, sortConfig.direction);
  const sortedProjectIdeas = safeSort(projectIdeas, sortConfig.key, sortConfig.direction);

  const filteredTeams = sortedTeams.filter(team => 
    (showArchived || !team.archived) && (
      team.team_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.team_leader_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (team.member_utr_id && team.member_utr_id.includes(searchTerm))
    )
  );

  const filteredProjectIdeas = sortedProjectIdeas.filter(idea => 
    idea.team_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idea.team_leader_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idea.project_idea?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
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
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Admin Dashboard
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex border-b border-purple-700/30 mb-6">
          <button
            className={`py-4 px-6 font-medium text-sm flex items-center ${activeTab === 'registrations' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-purple-200/70 hover:text-purple-300'}`}
            onClick={() => setActiveTab('registrations')}
          >
            <FaUsers className="mr-2" /> Team Registrations ({teams.filter(t => !t.archived).length})
          </button>
          <button
            className={`py-4 px-6 font-medium text-sm flex items-center ${activeTab === 'project-ideas' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-purple-200/70 hover:text-purple-300'}`}
            onClick={() => setActiveTab('project-ideas')}
          >
            <FaLightbulb className="mr-2" /> Project Ideas ({projectIdeas.length})
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-purple-400" />
            </div>
            <input
              type="text"
              placeholder="Search teams or ideas..."
              className="block w-full pl-10 pr-3 py-2 border border-purple-700/30 rounded-lg leading-5 bg-gray-800/50 backdrop-blur-sm placeholder-purple-300/50 focus:outline-none focus:placeholder-purple-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className="flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-105"
              onClick={() => setShowArchived(!showArchived)}
            >
              {showArchived ? <FaEyeSlash className="mr-2" /> : <FaEye className="mr-2" />}
              {showArchived ? 'Hide Archived' : 'Show Archived'}
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'registrations' ? (
              <TeamRegistrations 
                teams={filteredTeams} 
                onArchive={archiveTeam}
                onMarkEntered={markTeamEntered}
                onUnmarkEntered={unmarkTeamEntered}
              />
            ) : (
              <ProjectIdeas 
                ideas={filteredProjectIdeas}
                onRate={rateProjectIdea}
                onDelete={deleteProjectIdea}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

// Team Registrations Component Props
interface TeamRegistrationsProps {
  teams: Team[];
  onArchive: (teamId: string) => void;
  onMarkEntered: (teamId: string) => void;
  onUnmarkEntered: (teamId: string) => void;
}

const TeamRegistrations: React.FC<TeamRegistrationsProps> = ({ 
  teams, 
  onArchive, 
  onMarkEntered, 
  onUnmarkEntered
}) => {
  const [expandedTeams, setExpandedTeams] = useState<Record<string, boolean>>({});

  const toggleExpand = (teamId: string) => {
    setExpandedTeams(prev => ({
      ...prev,
      [teamId]: !prev[teamId]
    }));
  };

  return (
    <div className="bg-gray-800/40 backdrop-blur-md shadow overflow-hidden rounded-xl border border-purple-700/30">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-purple-300">Team Registrations</h3>
        <p className="mt-1 max-w-2xl text-sm text-purple-200/70">All registered teams and their information.</p>
      </div>
      
      {teams.length === 0 ? (
        <div className="px-4 py-12 text-center">
          <p className="text-purple-200/70">No teams found.</p>
        </div>
      ) : (
        <ul className="divide-y divide-purple-700/30">
          {teams.map((team, index) => (
            <motion.li 
              key={team.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`px-4 py-5 sm:px-6 ${team.has_entered ? 'bg-purple-900/20' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={() => team.has_entered ? onUnmarkEntered(team.id) : onMarkEntered(team.id)}
                    className={`mr-4 flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${team.has_entered ? 'bg-green-500 text-white' : 'border border-purple-500'}`}
                    title={team.has_entered ? 'Mark as not entered' : 'Mark as entered'}
                  >
                    {team.has_entered && <FaCheck className="h-3 w-3" />}
                  </button>
                  <div>
                    <h4 className="text-lg font-medium text-white">{team.team_name}</h4>
                    <p className="text-sm text-purple-300">Leader: {team.team_leader_name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleExpand(team.id)}
                    className="p-1.5 text-purple-400 hover:text-purple-300 transition-colors"
                    title={expandedTeams[team.id] ? "Collapse" : "Expand"}
                  >
                    {expandedTeams[team.id] ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  <button
                    onClick={() => onArchive(team.id)}
                    className="p-1.5 text-red-400 hover:text-red-300 transition-colors"
                    title="Archive team"
                  >
                    <FaArchive className="h-4 w-4" />
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
                      <dl className="mt-1 text-sm text-white">
                        <div className="flex">
                          <dt className="font-medium">UTR ID:</dt>
                          <dd className="ml-2">{team.member_utr_id || 'Not provided'}</dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium">Registered:</dt>
                          <dd className="ml-2">{new Date(team.created_at).toLocaleDateString()}</dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium">Status:</dt>
                          <dd className="ml-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${team.has_entered ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                              {team.has_entered ? 'Entered' : 'Not Entered'}
                            </span>
                          </dd>
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
  onDelete: (ideaId: string) => void;
}

const ProjectIdeas: React.FC<ProjectIdeasProps> = ({ ideas, onRate, onDelete }) => {
  const [expandedIdeas, setExpandedIdeas] = useState<Record<string, boolean>>({});

  const toggleExpand = (ideaId: string) => {
    setExpandedIdeas(prev => ({
      ...prev,
      [ideaId]: !prev[ideaId]
    }));
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
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-purple-400">{idea.word_count}/300 words</div>
                  <RatingStars rating={idea.rating} onRate={(rating) => onRate(idea.id, rating)} />
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
              
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-purple-300">
                  Submitted: {new Date(idea.created_at).toLocaleDateString()}
                </div>
                <div className="flex space-x-2">
                  <button className="inline-flex items-center px-3 py-1.5 border border-purple-700/30 shadow-sm text-sm font-medium rounded-lg text-purple-300 bg-gray-800/50 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
                    <FaEdit className="mr-1.5 h-4 w-4" /> Edit
                  </button>
                  <button 
                    onClick={() => onDelete(idea.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-red-600/80 hover:bg-red-500/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    <FaTrash className="mr-1.5 h-4 w-4" /> Delete
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Rating Stars Component Props
interface RatingStarsProps {
  rating?: number;
  onRate: (rating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating = 0, onRate }) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
        <button
          key={star}
          className={`p-0.5 transition-transform hover:scale-125 ${star <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-500'}`}
          onClick={() => onRate(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          title={`Rate ${star} out of 10`}
        >
          <FaStar className="h-5 w-5" />
        </button>
      ))}
      <span className="text-sm font-medium text-white ml-1">{rating}/10</span>
    </div>
  );
};

export default AdminDashboard;