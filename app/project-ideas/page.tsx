'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { 
  FaCopy, 
  FaSearch, 
  FaDownload,
  FaCheck,
  FaUsers,
  FaLightbulb
} from 'react-icons/fa';

interface ProjectIdea {
  id: number;
  team_number: number;
  team_name: string;
  team_leader_name: string;
  project_idea: string;
  ppt_link?: string;
  word_count: number;
  created_at: string;
  updated_at: string;
  rating?: number;
}

const ProjectIdeasPage = () => {
  const [projectIdeas, setProjectIdeas] = useState<ProjectIdea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Fetch project ideas from Supabase
  useEffect(() => {
    fetchProjectIdeas();
  }, []);

  const fetchProjectIdeas = async (): Promise<void> => {
    if (!supabase) {
      console.warn('Supabase client not available');
      setLoading(false);
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
    } finally {
      setLoading(false);
    }
  };

  // Remove duplicates based on team_leader_name
  const uniqueProjectIdeas = projectIdeas.filter((idea, index, self) => 
    index === self.findIndex(t => t.team_leader_name === idea.team_leader_name)
  );

  // Filter based on search term
  const filteredIdeas = uniqueProjectIdeas.filter(idea =>
    idea.team_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idea.team_leader_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idea.project_idea?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyTableToClipboard = async () => {
    const tableData = filteredIdeas.map((idea, index) => 
      `${index + 1}. Team: ${idea.team_name} | Leader: ${idea.team_leader_name} | Idea: ${idea.project_idea}`
    ).join('\n');

    const fullTable = `Project Ideas Summary\n${'='.repeat(50)}\n\n${tableData}\n\nTotal Ideas: ${filteredIdeas.length}`;

    try {
      await navigator.clipboard.writeText(fullTable);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadAsText = () => {
    const tableData = filteredIdeas.map((idea, index) => 
      `${index + 1}. Team: ${idea.team_name} | Leader: ${idea.team_leader_name} | Idea: ${idea.project_idea}`
    ).join('\n');

    const fullTable = `Project Ideas Summary\n${'='.repeat(50)}\n\n${tableData}\n\nTotal Ideas: ${filteredIdeas.length}`;

    const blob = new Blob([fullTable], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project-ideas-summary.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading project ideas...</p>
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
              <h1 className="text-3xl font-bold text-white mb-2">Project Ideas</h1>
              <p className="text-purple-200/70">All submitted project ideas (unique by team leader)</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{filteredIdeas.length}</div>
                <div className="text-sm text-purple-300">Unique Ideas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{projectIdeas.length}</div>
                <div className="text-sm text-purple-300">Total Submissions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Actions */}
        <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-purple-400" />
              </div>
              <input
                type="text"
                placeholder="Search ideas, teams, or leaders..."
                className="block w-full pl-10 pr-3 py-2 border border-purple-700/30 rounded-lg leading-5 bg-gray-800/50 backdrop-blur-sm placeholder-purple-300/50 focus:outline-none focus:placeholder-purple-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={copyTableToClipboard}
              className="flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105"
            >
              {copied ? <FaCheck className="mr-2" /> : <FaCopy className="mr-2" />}
              {copied ? 'Copied!' : 'Copy Table'}
            </button>
            
            <button 
              onClick={downloadAsText}
              className="flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
            >
              <FaDownload className="mr-2" />
              Download
            </button>
          </div>
        </div>

        {/* Project Ideas Table */}
        <div className="bg-gray-800/40 backdrop-blur-md shadow overflow-hidden rounded-xl border border-purple-700/30">
          {filteredIdeas.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <p className="text-purple-200/70">No project ideas found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-purple-700/30">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Team Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Team Leader
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Project Idea
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800/20 divide-y divide-purple-700/30">
                  {filteredIdeas.map((idea, index) => (
                    <motion.tr 
                      key={idea.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className="hover:bg-purple-900/10 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{idea.team_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-purple-300">{idea.team_leader_name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300 max-w-md">
                          {idea.project_idea.length > 200 
                            ? `${idea.project_idea.substring(0, 200)}...` 
                            : idea.project_idea
                          }
                        </div>
                        {idea.project_idea.length > 200 && (
                          <div className="text-xs text-purple-400 mt-1">
                            {idea.word_count} words
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Copyable Text Format */}
        <div className="mt-8 bg-gray-800/40 backdrop-blur-md rounded-xl border border-purple-700/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Copyable Format</h3>
            <button 
              onClick={copyTableToClipboard}
              className="flex items-center px-3 py-1 text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              <FaCopy className="mr-1" />
              Copy All
            </button>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
{filteredIdeas.map((idea, index) => 
  `${index + 1}. Team: ${idea.team_name} | Leader: ${idea.team_leader_name} | Idea: ${idea.project_idea}`
).join('\n')}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectIdeasPage;
