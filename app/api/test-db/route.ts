import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    // Test database connection by trying to insert a test record
    const { data, error } = await supabase
      .from('finals_submissions')
      .insert([
        {
          team_name: 'Test Team Beta',
          team_leader_name: 'Jane Smith',
          project_url: 'https://test-project-2.vercel.app',
          github_url: 'https://github.com/testuser2/test-project-2',
          gist: 'This is a test project submission to verify that the database connection and API endpoint are working properly. The project demonstrates various web technologies and provides a solution to a real-world problem.',
          ip: '127.0.0.1',
          user_agent: 'API Test'
        }
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: error.message,
          code: error.code 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Test data inserted successfully!',
        data: data 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
