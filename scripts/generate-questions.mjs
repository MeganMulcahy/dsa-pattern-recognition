#!/usr/bin/env node
/**
 * Generate DSA pattern drill questions using a LOCAL Ollama model (free).
 *
 * AI is NOT used by the app at runtime — only this optional dev script
 * bulk-adds questions to src/data/questions/generated.json.
 *
 * Setup:
 *   brew install ollama          # if needed
 *   ollama pull llama3.2         # or qwen2.5:3b, mistral, etc.
 *   ollama serve                 # usually runs automatically
 *
 * Usage:
 *   npm run generate-questions
 *   npm run generate-questions -- --count 20
 *   npm run generate-questions -- --pattern binary-search --count 5
 *   npm run generate-questions -- --web              # fetch problem ideas from LeetCode (free public API)
 *   npm run generate-questions -- --web --count 10
 */

import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dataDir = join(root, "src/data/questions");

const PATTERNS = [
  { id: "two-pointers", name: "Two Pointers", description: "Use two indices moving toward each other or in the same direction.", signals: ["sorted array", "pair sum", "palindrome", "remove duplicates in-place"] },
  { id: "sliding-window", name: "Sliding Window", description: "Maintain a window over a contiguous subarray or substring.", signals: ["longest/shortest substring", "subarray with constraint", "fixed or variable window"] },
  { id: "binary-search", name: "Binary Search", description: "Halve the search space on sorted data or monotonic answer space.", signals: ["sorted input", "find boundary", "minimize/maximize with feasibility check"] },
  { id: "bfs", name: "BFS", description: "Explore level by level for shortest path or nearest expansion.", signals: ["shortest path in unweighted graph", "level-order", "multi-source spread"] },
  { id: "dfs", name: "DFS", description: "Dive deep through branches before backtracking.", signals: ["explore all paths", "connected components", "tree/graph traversal"] },
  { id: "dynamic-programming", name: "Dynamic Programming", description: "Break into overlapping subproblems with optimal substructure.", signals: ["count ways", "min/max over choices", "optimal substructure", "memoization"] },
  { id: "greedy", name: "Greedy", description: "Make the locally best choice at each step.", signals: ["interval scheduling", "sort then pick", "exchange argument"] },
  { id: "hash-map", name: "Hash Map / Set", description: "Trade space for O(1) lookups and frequency tracking.", signals: ["find complement", "count frequency", "detect duplicates", "anagram"] },
  { id: "stack", name: "Stack", description: "Process elements in LIFO order for nesting or reversal.", signals: ["matching brackets", "next greater element", "undo/reverse operations"] },
  { id: "heap", name: "Heap / Priority Queue", description: "Efficiently track the k largest/smallest or merge sorted streams.", signals: ["top k elements", "running median", "merge k sorted lists"] },
  { id: "union-find", name: "Union Find", description: "Track connected components with union and find operations.", signals: ["connected components", "cycle detection in undirected graph", "group merging"] },
  { id: "topological-sort", name: "Topological Sort", description: "Order nodes in a DAG respecting dependencies.", signals: ["prerequisites", "dependency ordering", "course schedule"] },
  { id: "trie", name: "Trie", description: "Prefix tree for efficient string prefix operations.", signals: ["prefix search", "autocomplete", "word dictionary"] },
  { id: "backtracking", name: "Backtracking", description: "Build candidates incrementally and abandon invalid paths.", signals: ["generate all combinations", "permutations", "constraint satisfaction"] },
  { id: "monotonic-stack", name: "Monotonic Stack", description: "Stack maintaining increasing or decreasing order for range queries.", signals: ["next greater/smaller element", "histogram area", "daily temperatures"] },
  { id: "prefix-sum", name: "Prefix Sum", description: "Precompute cumulative sums for fast range queries.", signals: ["subarray sum equals k", "range sum query", "equilibrium index"] },
];

const DIFFICULTY_MAP = { 1: "easy", 2: "medium", 3: "hard" };

function parseArgs(argv) {
  const opts = { count: 10, pattern: undefined, difficulty: undefined, web: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--count") opts.count = Number(argv[++i]);
    else if (argv[i] === "--pattern") opts.pattern = argv[++i];
    else if (argv[i] === "--difficulty") opts.difficulty = argv[++i];
    else if (argv[i] === "--web") opts.web = true;
  }
  return opts;
}

function loadAllQuestions() {
  const core = JSON.parse(readFileSync(join(dataDir, "core.json"), "utf8"));
  const extra = JSON.parse(readFileSync(join(dataDir, "extra.json"), "utf8"));
  const generated = JSON.parse(readFileSync(join(dataDir, "generated.json"), "utf8"));
  return [...core, ...extra, ...generated];
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Fetch free LeetCode problem titles via their public API (no key needed). */
async function fetchLeetCodeSeeds(existingTitles, count, difficulty) {
  console.log("  Fetching problem ideas from LeetCode (public API)...");
  const res = await fetch("https://leetcode.com/api/problems/all/");
  if (!res.ok) throw new Error(`LeetCode API error ${res.status}`);

  const data = await res.json();
  const existing = new Set(existingTitles.map((t) => t.toLowerCase()));

  let candidates = Object.values(data.stat_status_pairs)
    .filter((p) => !p.paid_only && !p.stat?.question__hide)
    .map((p) => ({
      title: p.stat.question__title,
      slug: p.stat.question__title_slug,
      difficulty: DIFFICULTY_MAP[p.difficulty?.level] ?? "medium",
    }))
    .filter((p) => !existing.has(p.title.toLowerCase()));

  if (difficulty) {
    candidates = candidates.filter((p) => p.difficulty === difficulty);
  }

  shuffle(candidates);
  const seeds = candidates.slice(0, Math.max(count * 3, 15));
  console.log(`  Got ${seeds.length} candidate problems from LeetCode`);
  return seeds;
}

function buildPrompt({ pattern, difficulty, existingTitles, count, webSeeds }) {
  const patternBlock = pattern
    ? `Focus on the "${pattern}" pattern.`
    : "Cover a mix of DSA patterns.";
  const difficultyBlock = difficulty
    ? `All questions should be "${difficulty}" difficulty.`
    : "Use a mix of easy, medium, and hard difficulties.";
  const patternReference = PATTERNS.map(
    (p) => `- ${p.id}: ${p.name} — ${p.description} Signals: ${p.signals.join(", ")}`
  ).join("\n");
  const avoidBlock =
    existingTitles.length > 0
      ? `\nDo NOT repeat or closely paraphrase these existing problems:\n${existingTitles.slice(0, 80).map((t) => `- ${t}`).join("\n")}`
      : "";

  const webBlock = webSeeds?.length
    ? `\nThese are real LeetCode problems fetched from the internet — pick ${count} from this list (or similar well-known ones) and expand each into a full question object:\n${webSeeds.map((s) => `- ${s.title} (${s.difficulty}, slug: ${s.slug})`).join("\n")}`
    : "";

  return `You are creating practice problems for a "pattern recognition" drill app. Each question describes a LeetCode-style problem and asks which algorithmic pattern solves it best.

${patternBlock}
${difficultyBlock}
Generate exactly ${count} unique questions.${avoidBlock}${webBlock}

Valid pattern IDs (use exactly one as correctPattern):
${patternReference}

Return a JSON object with a "questions" array. Each question must match this schema:
{
  "id": "kebab-case-slug",
  "title": "Problem Title",
  "description": "2-4 sentence problem statement",
  "difficulty": "easy" | "medium" | "hard",
  "correctPattern": "<pattern-id>",
  "acceptedPatterns": ["optional-alternate-pattern-id"],
  "hints": ["hint 1", "hint 2"],
  "solution": {
    "approach": ["step 1", "step 2"],
    "timeComplexity": "O(...)",
    "spaceComplexity": "O(...)",
    "keyInsight": "One sentence explaining why this pattern fits"
  },
  "tags": ["array"]
}

Rules:
- Use well-known interview problems or realistic variants.
- correctPattern must be the PRIMARY best pattern.
- IDs must be unique kebab-case slugs.
- hints should nudge toward the pattern without naming it.
- Return raw JSON only, no markdown fences.`;
}

function validateQuestion(q) {
  const validPatterns = new Set(PATTERNS.map((p) => p.id));
  if (!q.id || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(q.id)) throw new Error(`Invalid id: ${q.id}`);
  if (!validPatterns.has(q.correctPattern)) throw new Error(`Invalid pattern ${q.correctPattern} for ${q.id}`);
  if (!q.title || !q.description || !q.solution?.keyInsight) throw new Error(`Incomplete question ${q.id}`);
  return q;
}

function extractJson(raw) {
  const trimmed = raw.trim();
  if (trimmed.startsWith("{")) return trimmed;
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start >= 0 && end > start) return trimmed.slice(start, end + 1);
  return trimmed;
}

async function listOllamaModels(host) {
  const res = await fetch(`${host}/api/tags`);
  if (!res.ok) throw new Error(`Cannot reach Ollama at ${host} — is it running? Try: ollama serve`);
  const data = await res.json();
  return (data.models ?? []).map((m) => m.name);
}

function resolveModel(requested, available) {
  if (available.some((n) => n === requested || n.startsWith(`${requested}:`))) {
    return available.find((n) => n === requested || n.startsWith(`${requested}:`));
  }
  // Prefer a text model over vision-only models like moondream
  const textPreferred = ["llama3.2", "llama3.1", "qwen2.5", "mistral", "gemma2", "phi3"];
  for (const pref of textPreferred) {
    const match = available.find((n) => n.startsWith(pref));
    if (match) return match;
  }
  return available[0];
}

async function callOllama(prompt, model, host) {
  const available = await listOllamaModels(host);
  if (available.length === 0) {
    throw new Error(
      "No Ollama models installed. Pull a text model first:\n  ollama pull llama3.2"
    );
  }

  const resolved = resolveModel(model, available);
  if (resolved !== model && !available.includes(model)) {
    console.log(`  Model "${model}" not found — using "${resolved}" instead`);
  }

  const res = await fetch(`${host}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: resolved,
      messages: [
        { role: "system", content: "You output valid JSON only. No markdown, no explanation." },
        { role: "user", content: prompt },
      ],
      format: "json",
      stream: false,
      options: { temperature: 0.7 },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Ollama error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.message.content;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const host = process.env.OLLAMA_HOST ?? "http://localhost:11434";
  const model = process.env.OLLAMA_MODEL ?? "llama3.2";
  const existing = loadAllQuestions();
  const existingIds = new Set(existing.map((q) => q.id));
  const existingTitles = existing.map((q) => q.title);

  console.log(`Generating ${opts.count} questions with local Ollama (${model})...`);
  if (opts.pattern) console.log(`  Pattern: ${opts.pattern}`);
  if (opts.difficulty) console.log(`  Difficulty: ${opts.difficulty}`);
  if (opts.web) console.log(`  Web: fetching LeetCode problem ideas`);
  console.log(`  Existing bank: ${existing.length} questions`);

  const webSeeds = opts.web
    ? await fetchLeetCodeSeeds(existingTitles, opts.count, opts.difficulty)
    : undefined;

  const prompt = buildPrompt({
    pattern: opts.pattern,
    difficulty: opts.difficulty,
    existingTitles,
    count: opts.count,
    webSeeds,
  });

  const raw = await callOllama(prompt, model, host);
  const parsed = JSON.parse(extractJson(raw));
  if (!Array.isArray(parsed.questions)) throw new Error("Missing questions array in model output");

  const newQuestions = parsed.questions
    .map(validateQuestion)
    .filter((q) => {
      if (existingIds.has(q.id)) {
        console.warn(`  Skipping duplicate id: ${q.id}`);
        return false;
      }
      return true;
    });

  const generatedPath = join(dataDir, "generated.json");
  const generated = JSON.parse(readFileSync(generatedPath, "utf8"));
  generated.push(...newQuestions);
  writeFileSync(generatedPath, JSON.stringify(generated, null, 2) + "\n");

  console.log(`Added ${newQuestions.length} questions → ${generated.length} total in generated.json`);
  console.log(`Full bank now: ${existing.length + newQuestions.length} questions`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
