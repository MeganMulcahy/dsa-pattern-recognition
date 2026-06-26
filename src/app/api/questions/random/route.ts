import { NextRequest, NextResponse } from "next/server";
import type { PatternId } from "@/types";
import { patterns } from "@/data/patterns";
import { fetchRandomQuestion } from "@/lib/leetcode";

const VALID_PATTERNS = new Set(patterns.map((p) => p.id));

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const exclude = searchParams.get("exclude")?.split(",").filter(Boolean) ?? [];
  const pattern = searchParams.get("pattern");

  if (pattern && !VALID_PATTERNS.has(pattern as PatternId)) {
    return NextResponse.json({ error: "Invalid pattern" }, { status: 400 });
  }

  try {
    const question = await fetchRandomQuestion({
      excludeSlugs: exclude,
      patternId: pattern as PatternId | undefined,
    });
    return NextResponse.json(question);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch question";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
