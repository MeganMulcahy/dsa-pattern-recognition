import slugPatterns from "@/data/slug-patterns.json";
import { patternMap, patterns } from "@/data/patterns";
import type { PatternId, Solution } from "@/types";

const TAG_TO_PATTERNS: Record<string, PatternId[]> = {
  "two-pointers": ["two-pointers"],
  "sliding-window": ["sliding-window"],
  "binary-search": ["binary-search"],
  "breadth-first-search": ["bfs"],
  "depth-first-search": ["dfs"],
  "dynamic-programming": ["dynamic-programming"],
  greedy: ["greedy"],
  "hash-table": ["hash-map"],
  stack: ["stack"],
  "heap-priority-queue": ["heap"],
  "union-find": ["union-find"],
  backtracking: ["backtracking"],
  trie: ["trie"],
  "monotonic-queue": ["monotonic-stack"],
  "monotonic-stack": ["monotonic-stack"],
  "prefix-sum": ["prefix-sum"],
  graph: ["bfs", "dfs"],
  tree: ["dfs", "bfs"],
  "topological-sort": ["topological-sort"],
};

const KEYWORD_TO_PATTERN: [RegExp, PatternId][] = [
  [/\btopolog/i, "topological-sort"],
  [/\bunion.?find|disjoint set|connected component/i, "union-find"],
  [/\bmonotonic|next greater|next smaller|daily temp/i, "monotonic-stack"],
  [/\bprefix sum|subarray sum|range sum/i, "prefix-sum"],
  [/\bsliding window|substring|subarray.*at most|consecutive/i, "sliding-window"],
  [/\btwo pointer|palindrome|sorted.*pair|3sum|container/i, "two-pointers"],
  [/\bbinary search|rotated sorted|search.*sorted/i, "binary-search"],
  [/\bbfs|level order|shortest path|rotting|word ladder/i, "bfs"],
  [/\bdfs|backtrack|island|permutation|combination|subset|n-queens/i, "backtracking"],
  [/\bdfs|connected|tree path|word search/i, "dfs"],
  [/\bdynamic programming|\bdp\b|coin change|robber|lis\b/i, "dynamic-programming"],
  [/\bgreedy|interval|schedule|jump game/i, "greedy"],
  [/\bheap|priority queue|top k|kth largest|median/i, "heap"],
  [/\bstack|parenthes|histogram|rpn\b/i, "stack"],
  [/\btrie|prefix tree|autocomplete/i, "trie"],
  [/\bhash|anagram|two sum|frequency|duplicate/i, "hash-map"],
];

function buildSolution(patternId: PatternId, title: string): Solution {
  const pattern = patternMap[patternId];
  return {
    approach: [
      `Read the problem and identify signals for ${pattern.name}.`,
      `Apply the ${pattern.name} template: ${pattern.description}`,
      `Walk through the LeetCode editorial on "${title}" for the full coded solution.`,
    ],
    timeComplexity: "See LeetCode editorial",
    spaceComplexity: "See LeetCode editorial",
    keyInsight: `${pattern.name}: ${pattern.signals.join("; ")}.`,
  };
}

export function inferPattern(input: {
  slug: string;
  title: string;
  topicSlugs: string[];
}): {
  correctPattern: PatternId;
  acceptedPatterns?: PatternId[];
  solution: Solution;
  fallbackHints: string[];
} {
  const known = slugPatterns[input.slug as keyof typeof slugPatterns] as PatternId | undefined;
  if (known) {
    const pattern = patternMap[known];
    return {
      correctPattern: known,
      solution: buildSolution(known, input.title),
      fallbackHints: [
        `Think about when ${pattern.name} is the right tool.`,
        `Signals: ${pattern.signals.slice(0, 2).join(", ")}.`,
      ],
    };
  }

  const fromTags = new Set<PatternId>();
  for (const tag of input.topicSlugs) {
    for (const p of TAG_TO_PATTERNS[tag] ?? []) fromTags.add(p);
  }

  for (const [regex, patternId] of KEYWORD_TO_PATTERN) {
    if (regex.test(input.title)) fromTags.add(patternId);
  }

  if (fromTags.size === 0) {
    const fallback: PatternId = "hash-map";
    return {
      correctPattern: fallback,
      solution: buildSolution(fallback, input.title),
      fallbackHints: [
        "What data structure gives O(1) lookup?",
        "Can you trade space for speed?",
      ],
    };
  }

  const ordered = patterns.map((p) => p.id).filter((id) => fromTags.has(id));
  const correctPattern = ordered[0];
  const acceptedPatterns =
    ordered.length > 1 ? ordered.slice(1) : undefined;

  const pattern = patternMap[correctPattern];
  return {
    correctPattern,
    acceptedPatterns,
    solution: buildSolution(correctPattern, input.title),
    fallbackHints: [
      `Consider ${pattern.name} — ${pattern.description}`,
      `Look for: ${pattern.signals.slice(0, 2).join(", ")}.`,
    ],
  };
}
