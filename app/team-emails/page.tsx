'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { 
  FaSearch, 
  FaFilter, 
  FaChevronDown, 
  FaChevronUp, 
  FaTimes,
  FaDownload,
  FaCopy,
  FaCheck,
  FaEnvelope,
  FaUser,
  FaUsers,
  FaTrophy,
  FaChartLine,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';

interface TeamRegistration {
  id: number;
  participant_type: string;
  team_name: string;
  team_leader_name: string;
  team_leader_mobile: string;
  team_leader_email: string;
  selected_domain: string;
  problem_statement: string;
  selected_session: number;
  member_name_1: string;
  member_registration_number_1: string;
  member_name_2?: string;
  member_registration_number_2?: string;
  member_name_3?: string;
  member_registration_number_3?: string;
  member_name_4?: string;
  member_registration_number_4?: string;
  created_at: string;
  updated_at: string;
  present: boolean;
  rating?: number;
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

const TeamEmailsPage = () => {
  const [registrations, setRegistrations] = useState<TeamRegistration[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedParticipantType, setSelectedParticipantType] = useState<string>('all');
  const [selectedSession, setSelectedSession] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [expandedTeams, setExpandedTeams] = useState<Record<number, boolean>>({});
  const [sortBy, setSortBy] = useState<'team_name' | 'team_leader_name' | 'team_leader_email' | 'created_at'>('team_name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [copied, setCopied] = useState<boolean>(false);
  const [showOnlyEmails, setShowOnlyEmails] = useState<boolean>(false);
  const [removeDuplicates, setRemoveDuplicates] = useState<boolean>(true);

  // Fetch registrations from Supabase
  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async (): Promise<void> => {
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
      setRegistrations(data || []);
    } catch (error: any) {
      console.error('Error fetching team registrations:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (teamId: number) => {
    setExpandedTeams(prev => ({
      ...prev,
      [teamId]: !prev[teamId]
    }));
  };

  const handleSort = (key: 'team_name' | 'team_leader_name' | 'team_leader_email' | 'created_at') => {
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

  // Get unique values for filters
  const participantTypes = [...new Set(registrations.map(r => r.participant_type))];
  const sessions = [...new Set(registrations.map(r => r.selected_session))].sort();
  const domains = [...new Set(registrations.map(r => r.selected_domain))].sort();

  // Filter and sort registrations
  const filteredAndSortedRegistrations = registrations
    .filter(registration => {
      const matchesSearch = registration.team_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           registration.team_leader_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           registration.team_leader_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           registration.selected_domain?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesParticipantType = selectedParticipantType === 'all' || registration.participant_type === selectedParticipantType;
      const matchesSession = selectedSession === 'all' || registration.selected_session.toString() === selectedSession;
      const matchesDomain = selectedDomain === 'all' || registration.selected_domain === selectedDomain;
      
      return matchesSearch && matchesParticipantType && matchesSession && matchesDomain;
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];
      
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

  // Get all unique emails
  const allEmails = removeDuplicates 
    ? [...new Set(registrations.map(r => r.team_leader_email))].filter(Boolean)
    : registrations.map(r => r.team_leader_email).filter(Boolean);
  
  const filteredEmails = removeDuplicates
    ? [...new Set(filteredAndSortedRegistrations.map(r => r.team_leader_email))].filter(Boolean)
    : filteredAndSortedRegistrations.map(r => r.team_leader_email).filter(Boolean);

  const copyEmailsToClipboard = async () => {
    const emailsToCopy = showOnlyEmails ? filteredEmails : allEmails;
    const emailString = emailsToCopy.join(', ');
    
    try {
      await navigator.clipboard.writeText(emailString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy emails:', error);
    }
  };

  const downloadEmailsAsCSV = () => {
    const emailsToDownload = showOnlyEmails ? filteredEmails : allEmails;
    const csvContent = `Email\n${emailsToDownload.join('\n')}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `team_emails_${removeDuplicates ? 'unique' : 'all'}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const downloadFullDataAsCSV = () => {
    let dataToDownload = showOnlyEmails ? filteredAndSortedRegistrations : registrations;
    
    // Remove duplicates if option is enabled
    if (removeDuplicates) {
      const seenEmails = new Set();
      dataToDownload = dataToDownload.filter(registration => {
        if (seenEmails.has(registration.team_leader_email)) {
          return false;
        }
        seenEmails.add(registration.team_leader_email);
        return true;
      });
    }
    
    // Create CSV headers
    const headers = [
      'ID',
      'Participant Type',
      'Team Name',
      'Team Leader Name',
      'Team Leader Mobile',
      'Team Leader Email',
      'Selected Domain',
      'Problem Statement',
      'Selected Session',
      'Member 1 Name',
      'Member 1 Registration Number',
      'Member 2 Name',
      'Member 2 Registration Number',
      'Member 3 Name',
      'Member 3 Registration Number',
      'Member 4 Name',
      'Member 4 Registration Number',
      'Created At',
      'Updated At',
      'Present',
      'Rating',
      'Session 1 First Present',
      'Session 1 First Attendance Time',
      'Session 1 First Notes',
      'Session 1 Second Present',
      'Session 1 Second Attendance Time',
      'Session 1 Second Notes',
      'Session 2 First Present',
      'Session 2 First Attendance Time',
      'Session 2 First Notes',
      'Session 2 Second Present',
      'Session 2 Second Attendance Time',
      'Session 2 Second Notes'
    ];

    // Create CSV rows
    const csvRows = dataToDownload.map(registration => [
      registration.id,
      registration.participant_type,
      `"${registration.team_name}"`,
      `"${registration.team_leader_name}"`,
      registration.team_leader_mobile,
      registration.team_leader_email,
      `"${registration.selected_domain}"`,
      `"${registration.problem_statement.replace(/"/g, '""')}"`, // Escape quotes in problem statement
      registration.selected_session,
      `"${registration.member_name_1}"`,
      registration.member_registration_number_1,
      registration.member_name_2 ? `"${registration.member_name_2}"` : '',
      registration.member_registration_number_2 || '',
      registration.member_name_3 ? `"${registration.member_name_3}"` : '',
      registration.member_registration_number_3 || '',
      registration.member_name_4 ? `"${registration.member_name_4}"` : '',
      registration.member_registration_number_4 || '',
      registration.created_at,
      registration.updated_at,
      registration.present ? 'Yes' : 'No',
      registration.rating || '',
      registration.session1_first_present ? 'Yes' : 'No',
      registration.session1_first_attendance_time || '',
      registration.session1_first_notes ? `"${registration.session1_first_notes.replace(/"/g, '""')}"` : '',
      registration.session1_second_present ? 'Yes' : 'No',
      registration.session1_second_attendance_time || '',
      registration.session1_second_notes ? `"${registration.session1_second_notes.replace(/"/g, '""')}"` : '',
      registration.session2_first_present ? 'Yes' : 'No',
      registration.session2_first_attendance_time || '',
      registration.session2_first_notes ? `"${registration.session2_first_notes.replace(/"/g, '""')}"` : '',
      registration.session2_second_present ? 'Yes' : 'No',
      registration.session2_second_attendance_time || '',
      registration.session2_second_notes ? `"${registration.session2_second_notes.replace(/"/g, '""')}"` : ''
    ]);

    // Combine headers and rows
    const csvContent = [headers, ...csvRows].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `team_registrations_${removeDuplicates ? 'unique' : 'all'}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const stats = {
    total: registrations.length,
    vit: registrations.filter(r => r.participant_type === 'VIT').length,
    external: registrations.filter(r => r.participant_type === 'External').length,
    session1: registrations.filter(r => r.selected_session === 1).length,
    session2: registrations.filter(r => r.selected_session === 2).length,
    uniqueEmails: allEmails.length,
    totalEmails: registrations.map(r => r.team_leader_email).filter(Boolean).length,
    duplicates: registrations.map(r => r.team_leader_email).filter(Boolean).length - allEmails.length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading team registrations...</p>
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
              <h1 className="text-3xl font-bold text-white mb-2">Team Emails</h1>
              <p className="text-purple-200/70">View and manage team registration emails</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.total}</div>
                <div className="text-sm text-purple-300">Total Teams</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{stats.uniqueEmails}</div>
                <div className="text-sm text-purple-300">Unique Emails</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{stats.duplicates}</div>
                <div className="text-sm text-purple-300">Duplicates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{stats.vit}</div>
                <div className="text-sm text-purple-300">VIT Teams</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{stats.external}</div>
                <div className="text-sm text-purple-300">External Teams</div>
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
                placeholder="Search teams, names, emails, or domains..."
                className="block w-full pl-10 pr-3 py-2 border border-purple-700/30 rounded-lg leading-5 bg-gray-800/50 backdrop-blur-sm placeholder-purple-300/50 focus:outline-none focus:placeholder-purple-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedParticipantType}
                onChange={(e) => setSelectedParticipantType(e.target.value)}
                className="px-3 py-2 bg-gray-800/50 border border-purple-700/30 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option value="all">All Types</option>
                {participantTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              
              <select
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="px-3 py-2 bg-gray-800/50 border border-purple-700/30 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option value="all">All Sessions</option>
                {sessions.map(session => (
                  <option key={session} value={session.toString()}>Session {session}</option>
                ))}
              </select>
              
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="px-3 py-2 bg-gray-800/50 border border-purple-700/30 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option value="all">All Domains</option>
                {domains.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              className="flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105"
              onClick={copyEmailsToClipboard}
            >
              {copied ? <FaCheck className="mr-2" /> : <FaCopy className="mr-2" />}
              {copied ? 'Copied!' : 'Copy Emails'}
            </button>
            
            <button 
              className="flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
              onClick={downloadEmailsAsCSV}
            >
              <FaDownload className="mr-2" />
              Download Emails
            </button>
            
            <button 
              className="flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 transform hover:scale-105"
              onClick={downloadFullDataAsCSV}
            >
              <FaDownload className="mr-2" />
              Download Full Data
            </button>
            
            <button 
              className="flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-105"
              onClick={() => setShowOnlyEmails(!showOnlyEmails)}
            >
              {showOnlyEmails ? <FaEyeSlash className="mr-2" /> : <FaEye className="mr-2" />}
              {showOnlyEmails ? 'Show Details' : 'Show Emails Only'}
            </button>
            
            <button 
              className={`flex items-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                removeDuplicates 
                  ? 'border-transparent bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500' 
                  : 'border-purple-700/30 bg-gray-800/50 text-purple-300 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
              }`}
              onClick={() => setRemoveDuplicates(!removeDuplicates)}
            >
              <FaFilter className="mr-2" />
              {removeDuplicates ? 'Remove Duplicates' : 'Show Duplicates'}
            </button>
            
            {searchTerm && (
              <button 
                className="flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105"
                onClick={() => setSearchTerm('')}
              >
                <FaTimes className="mr-2" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Email List View */}
        {showOnlyEmails ? (
          <div className="bg-gray-800/40 backdrop-blur-md shadow overflow-hidden rounded-xl border border-purple-700/30">
            <div className="px-6 py-4 bg-gray-700/50 border-b border-purple-700/30">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">
                  Email Addresses ({filteredEmails.length})
                </h3>
                <div className="text-sm text-purple-300">
                  {removeDuplicates ? 'Duplicates removed' : 'Including duplicates'}
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredEmails.map((email, index) => (
                  <motion.div
                    key={email}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    <FaEnvelope className="h-4 w-4 text-purple-400 mr-3 flex-shrink-0" />
                    <span className="text-white text-sm truncate">{email}</span>
                  </motion.div>
                ))}
              </div>
              {filteredEmails.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-purple-200/70">No emails found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Detailed Table View */
          <div className="bg-gray-800/40 backdrop-blur-md shadow overflow-hidden rounded-xl border border-purple-700/30">
            {filteredAndSortedRegistrations.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <p className="text-purple-200/70">No registrations found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-purple-700/30">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th 
                        className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider cursor-pointer hover:text-purple-200"
                        onClick={() => handleSort('team_name')}
                      >
                        <div className="flex items-center">
                          Team Name
                          {getSortIcon('team_name')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider cursor-pointer hover:text-purple-200"
                        onClick={() => handleSort('team_leader_name')}
                      >
                        <div className="flex items-center">
                          Leader
                          {getSortIcon('team_leader_name')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider cursor-pointer hover:text-purple-200"
                        onClick={() => handleSort('team_leader_email')}
                      >
                        <div className="flex items-center">
                          Email
                          {getSortIcon('team_leader_email')}
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                        Session
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                        Domain
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-purple-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800/20 divide-y divide-purple-700/30">
                    {filteredAndSortedRegistrations.map((registration, index) => (
                      <motion.tr 
                        key={registration.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className="hover:bg-purple-900/10 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{registration.team_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-purple-300">{registration.team_leader_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaEnvelope className="h-4 w-4 text-purple-400 mr-2" />
                            <span className="text-sm text-white">{registration.team_leader_email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            registration.participant_type === 'VIT' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {registration.participant_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-purple-300">Session {registration.selected_session}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-purple-300">{registration.selected_domain}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => toggleExpand(registration.id)}
                            className="p-1.5 text-purple-400 hover:text-purple-300 transition-colors"
                            title={expandedTeams[registration.id] ? "Collapse" : "Expand"}
                          >
                            {expandedTeams[registration.id] ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Expanded Details */}
        <AnimatePresence>
          {filteredAndSortedRegistrations.map((registration) => (
            expandedTeams[registration.id] && (
              <motion.div
                key={`details-${registration.id}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 bg-gray-800/40 backdrop-blur-md rounded-xl border border-purple-700/30 overflow-hidden"
              >
                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <h5 className="text-sm font-medium text-purple-400 mb-3">Team Information</h5>
                      <div className="space-y-2 text-sm text-white">
                        <div><span className="font-medium">Team Name:</span> {registration.team_name}</div>
                        <div><span className="font-medium">Leader:</span> {registration.team_leader_name}</div>
                        <div><span className="font-medium">Email:</span> {registration.team_leader_email}</div>
                        <div><span className="font-medium">Mobile:</span> {registration.team_leader_mobile}</div>
                        <div><span className="font-medium">Type:</span> {registration.participant_type}</div>
                        <div><span className="font-medium">Session:</span> Session {registration.selected_session}</div>
                        <div><span className="font-medium">Domain:</span> {registration.selected_domain}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-purple-400 mb-3">Team Members</h5>
                      <div className="space-y-2 text-sm text-white">
                        <div><span className="font-medium">Member 1:</span> {registration.member_name_1} ({registration.member_registration_number_1})</div>
                        {registration.member_name_2 && (
                          <div><span className="font-medium">Member 2:</span> {registration.member_name_2} ({registration.member_registration_number_2})</div>
                        )}
                        {registration.member_name_3 && (
                          <div><span className="font-medium">Member 3:</span> {registration.member_name_3} ({registration.member_registration_number_3})</div>
                        )}
                        {registration.member_name_4 && (
                          <div><span className="font-medium">Member 4:</span> {registration.member_name_4} ({registration.member_registration_number_4})</div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-purple-400 mb-3">Problem Statement</h5>
                      <div className="text-sm text-white bg-gray-700/30 p-3 rounded-lg">
                        {registration.problem_statement}
                      </div>
                      <div className="mt-3 text-xs text-purple-200/70">
                        Registered: {formatTimestamp(registration.created_at)}
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

export default TeamEmailsPage;
