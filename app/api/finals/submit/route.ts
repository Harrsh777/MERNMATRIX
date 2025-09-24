import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

type Body = {
  teamName?: string
  teamLeaderName?: string
  projectUrl?: string
  githubUrl?: string
  gist?: string
}

function isValidUrl(value: string): boolean {
  try {
    const u = new URL(value)
    return !!u.protocol && !!u.host
  } catch {
    return false
  }
}

function getSubmissionWindow() {
  const now = new Date()
  // September 24th, 8:00 PM to September 25th, 12:00 AM
  const start = new Date(now.getFullYear(), 8, 24, 20, 0, 0, 0) // September 24th, 8:00 PM
  const end = new Date(now.getFullYear(), 8, 25, 0, 0, 0, 0) // September 25th, 12:00 AM
  return { now, start, end }
}

function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const key = serviceRoleKey || anon
  if (!url || !key) {
    throw new Error("Supabase environment variables are missing")
  }
  return createClient(url, key, { auth: { persistSession: false } })
}

export async function POST(req: Request) {
  try {
    const { now, start, end } = getSubmissionWindow()
    if (now < start || now >= end) {
      return NextResponse.json({ error: "Submissions are currently closed. Opens September 24th at 8:00 PM" }, { status: 403 })
    }

    const body = (await req.json()) as Body
    const teamName = (body.teamName || "").trim()
    const teamLeaderName = (body.teamLeaderName || "").trim()
    const projectUrl = (body.projectUrl || "").trim()
    const githubUrl = (body.githubUrl || "").trim()
    const gist = (body.gist || "").trim()

    if (!teamName || !teamLeaderName || !projectUrl || !githubUrl || !gist) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }
    if (!isValidUrl(projectUrl) || !isValidUrl(githubUrl)) {
      return NextResponse.json({ error: "Provide valid URLs" }, { status: 400 })
    }
    if (gist.length < 20 || gist.length > 900) {
      return NextResponse.json({ error: "Gist must be between 20 and 900 characters" }, { status: 400 })
    }

    const supabase = getServerSupabase()

    // Capture minimal request metadata
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || ""
    const userAgent = req.headers.get("user-agent") || ""

    const { error } = await supabase.from("finals_submissions").insert({
      team_name: teamName,
      team_leader_name: teamLeaderName,
      project_url: projectUrl,
      github_url: githubUrl,
      gist,
      ip,
      user_agent: userAgent,
      submitted_at: new Date().toISOString(),
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unexpected error" }, { status: 500 })
  }
}


