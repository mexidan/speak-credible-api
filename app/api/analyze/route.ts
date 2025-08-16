import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/analyze
 * Expects: multipart/form-data with a "file" field
 * Auth: header "x-api-key" must equal process.env.API_KEY
 * Returns: stub JSON so you can verify end-to-end
 */
export async function POST(req: NextRequest) {
  const key = req.headers.get("x-api-key");
  if (!process.env.API_KEY || key !== process.env.API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  // Consume the stream to avoid hanging, even before real analysis is implemented
  await file.arrayBuffer();

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
