import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  try {
    console.log('=== Alternative API Request Started ===');
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { teamName, teamLeaderName, projectUrl, githubUrl, gist } = body;

    // Basic validation only
    if (!teamName || !teamLeaderName || !projectUrl || !githubUrl || !gist) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Ensure GitHub URL matches the database constraint format
    let formattedGithubUrl = githubUrl.trim();
    
    // If it doesn't start with http/https, add https://
    if (!formattedGithubUrl.match(/^https?:\/\//i)) {
      formattedGithubUrl = 'https://' + formattedGithubUrl;
    }
    
    // If it doesn't contain github.com, prepend github.com/
    if (!formattedGithubUrl.includes('github.com')) {
      formattedGithubUrl = 'https://github.com/' + formattedGithubUrl.replace(/^https?:\/\//i, '');
    }
    
    console.log('Original GitHub URL:', githubUrl);
    console.log('Formatted GitHub URL:', formattedGithubUrl);

    // Get client information
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Insert data with minimal validation
    console.log('Attempting to insert data...');
    
    const { data, error } = await supabase
      .from('finals_submissions')
      .insert([
        {
          team_name: teamName.trim(),
          team_leader_name: teamLeaderName.trim(),
          project_url: projectUrl.trim(),
          github_url: formattedGithubUrl, // Auto-formatted to match constraint
          gist: gist.trim(),
          ip: ip,
          user_agent: userAgent,
        }
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    console.log('Successfully inserted submission:', data);

    return NextResponse.json(
      { 
        message: 'Project submitted successfully!',
        submissionId: data[0]?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
