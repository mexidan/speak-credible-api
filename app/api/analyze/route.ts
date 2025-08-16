import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json({
    transcript: "(stub transcript)",
    wpm: 150,
    pitch_median_hz: 200,
    pitch_var_semitones: 3,
    volume_rms_dbfs: -20,
    volume_drift_db: 0,
    pause_count: 4,
    avg_pause_ms: 350,
    filler_rate_per_100_words: 2,
    terminal_downstep_rate: 0.5,
    credibility_score: 85,
    issues: [],
    recommendations: []
  });
}
