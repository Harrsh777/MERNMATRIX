import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamName, teamLeaderName, projectUrl, githubUrl, gist } = body;

    // Validate required fields
    if (!teamName || !teamLeaderName || !projectUrl || !githubUrl || !gist) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (teamName.length < 2 || teamName.length > 120) {
      return NextResponse.json(
        { error: 'Team name must be between 2 and 120 characters' },
        { status: 400 }
      );
    }

    if (teamLeaderName.length < 2 || teamLeaderName.length > 120) {
      return NextResponse.json(
        { error: 'Team leader name must be between 2 and 120 characters' },
        { status: 400 }
      );
    }

    if (gist.length < 20 || gist.length > 900) {
      return NextResponse.json(
        { error: 'Project description must be between 20 and 900 characters' },
        { status: 400 }
      );
    }

    // Validate URLs
    try {
      new URL(projectUrl);
    } catch {
      return NextResponse.json(
        { error: 'Project URL must be a valid URL' },
        { status: 400 }
      );
    }

    if (!githubUrl.match(/^https?:\/\/(www\.)?github\.com\/.+/i)) {
      return NextResponse.json(
        { error: 'GitHub URL must be a valid GitHub repository URL' },
        { status: 400 }
      );
    }

    // Get client information
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('finals_submissions')
      .insert([
        {
          team_name: teamName.trim(),
          team_leader_name: teamLeaderName.trim(),
          project_url: projectUrl.trim(),
          github_url: githubUrl.trim(),
          gist: gist.trim(),
          ip: ip,
          user_agent: userAgent,
        }
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      
      // Handle specific constraint violations
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'A team with this name has already submitted their project' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to submit project. Please try again.' },
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