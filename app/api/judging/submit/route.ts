import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

type Body = {
  teamId?: string
  teamName?: string
  teamLeaderName?: string
  scores?: {
    relevance: number
    clarity: number
    feasibility: number
    innovation: number
    impact: number
  }
  totalMarks?: number
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
    const body = (await req.json()) as Body
    const { teamId, teamName, teamLeaderName, scores, totalMarks } = body

    if (!teamId || !teamName || !teamLeaderName || !scores || totalMarks === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate scores
    const scoreValues = Object.values(scores)
    if (scoreValues.some(score => score < 0 || score > 20)) {
      return NextResponse.json({ error: "Scores must be between 0 and 20" }, { status: 400 })
    }

    if (totalMarks !== scoreValues.reduce((sum, score) => sum + score, 0)) {
      return NextResponse.json({ error: "Total marks calculation mismatch" }, { status: 400 })
    }

    const supabase = getServerSupabase()

    // Capture minimal request metadata
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || ""
    const userAgent = req.headers.get("user-agent") || ""

    const { error } = await supabase.from("judging_scores").insert({
      team_id: teamId,
      team_name: teamName,
      team_leader_name: teamLeaderName,
      relevance_score: scores.relevance,
      clarity_score: scores.clarity,
      feasibility_score: scores.feasibility,
      innovation_score: scores.innovation,
      impact_score: scores.impact,
      total_score: totalMarks,
      ip,
      user_agent: userAgent,
      judged_at: new Date().toISOString(),
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unexpected error" }, { status: 500 })
  }
}
