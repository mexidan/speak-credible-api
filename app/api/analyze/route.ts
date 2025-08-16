import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // Auth (fail closed but FAST)
  const key = req.headers.get("x-api-key");
  if (!process.env.API_KEY || key !== process.env.API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Read multipart form and CONSUME the file (this prevents hangs)
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Bad form-data" }, { status: 400 });
  }
  const file = form.get("file") as unknown as File | null;
  if (!file) {
    return NextResponse.json({ error: "Missing 'file'" }, { status: 400 });
  }
  await file.arrayBuffer(); // <- critical to avoid open stream

  // Immediate, deterministic JSON
  return NextResponse.json({
    transcript: "(stub)",
    wpm: 155,
    pitch_median_hz: 205,
    pitch_var_semitones: 4,
    volume_rms_dbfs: -21,
    volume_drift_db: 2,
    pause_count: 5,
    avg_pause_ms: 380,
    filler_rate_per_100_words: 2,
    terminal_downstep_rate: 0.7,
    credibility_score: 82,
    issues: [],
    recommendations: []
  });
}
