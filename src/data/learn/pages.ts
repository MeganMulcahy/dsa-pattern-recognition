import type { LearnPage } from "./types";

export type {
  LearnPage,
  LearnSection,
  LearnSubsection,
  CodeExample,
  SupplementaryResource,
} from "./types";

export const basicsPages: LearnPage[] = [
  {
    slug: "runtime-cheat-sheet",
    title: "Runtime → Algo Cheat Sheet",
    subtitle: "Match time limits to likely techniques",
    category: "basics",
    sections: [
      {
        heading: "Quick reference",
        table: {
          headers: ["Input size (n)", "Target complexity", "Likely patterns"],
          rows: [
            ["n ≤ 20", "O(n!) / O(2ⁿ)", "Backtracking, brute force"],
            ["n ≤ 200", "O(n³)", "DP with cubic state, Floyd-Warshall"],
            ["n ≤ 2,000", "O(n²)", "DP tables, nested loops, all pairs"],
            ["n ≤ 10⁵", "O(n log n)", "Sort + greedy, heap, binary search on answer"],
            ["n ≤ 10⁶", "O(n)", "Two pointers, sliding window, hash map, prefix sum, BFS/DFS"],
            ["n ≤ 10⁷", "O(n) tight", "Simple scan, counting, union-find α(n)"],
            ["n > 10⁸", "O(log n) or O(1)", "Binary search, math formula, precomputation"],
          ],
        },
      },
      {
        heading: "Rules of thumb",
        bullets: [
          "Sorted array + find something → Binary Search or Two Pointers.",
          "Contiguous subarray/substring → Sliding Window or Prefix Sum.",
          "Shortest path unweighted → BFS. Explore all paths → DFS/Backtracking.",
          "Optimal substructure + overlapping subproblems → DP.",
          "Need k largest/smallest → Heap.",
        ],
      },
    ],
  },
  {
    slug: "keyword-cheat-sheet",
    title: "Keyword → Algo Cheat Sheet",
    subtitle: "Problem phrases that signal each pattern",
    category: "basics",
    sections: [
      {
        heading: "Signal words",
        table: {
          headers: ["Keywords in problem", "Pattern"],
          rows: [
            ["pair sum, palindrome, sorted + two indices", "Two Pointers"],
            ["longest/shortest substring, at most k, window", "Sliding Window"],
            ["sorted, find target, minimize maximum", "Binary Search"],
            ["shortest path, level order, spread/minutes", "BFS"],
            ["all paths, islands, connected, tree traverse", "DFS"],
            ["count ways, min cost, optimal substructure", "Dynamic Programming"],
            ["maximum intervals, schedule, local best choice", "Greedy"],
            ["frequency, anagram, two sum, O(1) lookup", "Hash Map"],
            ["matching brackets, nested, undo, evaluate", "Stack"],
            ["top k, kth largest, merge k lists, median stream", "Heap"],
            ["connected components, cycle in undirected graph", "Union Find"],
            ["prerequisites, dependency order, course schedule", "Topological Sort"],
            ["prefix search, autocomplete, dictionary of words", "Trie"],
            ["all combinations, permutations, n-queens", "Backtracking"],
            ["next greater element, daily temperatures", "Monotonic Stack"],
            ["subarray sum equals k, range sum query", "Prefix Sum"],
          ],
        },
      },
    ],
  },
  {
    slug: "basics",
    title: "Basic Data Structures & Algorithms",
    subtitle: "Foundation before patterns",
    category: "basics",
    sections: [
      {
        heading: "Core data structures",
        bullets: [
          "Array / String — contiguous memory, index access O(1), search O(n).",
          "Hash Map / Set — average O(1) insert/lookup; trade space for speed.",
          "Stack (LIFO) / Queue (FIFO) — process in order; deque for BFS.",
          "Linked List — O(1) insert at head; poor random access.",
          "Tree / Graph — nodes + edges; DFS/BFS traverse.",
          "Heap — min/max in O(1), insert/extract O(log n).",
        ],
      },
      {
        heading: "Core algorithms",
        bullets: [
          "Sorting — O(n log n) baseline; enables two pointers & greedy.",
          "Binary Search — halve search space on sorted or monotonic functions.",
          "BFS / DFS — graph traversal; BFS for shortest unweighted path.",
          "Recursion + Memoization — top-down DP.",
          "Iteration + table — bottom-up DP.",
        ],
      },
      {
        heading: "Complexity basics",
        bullets: [
          "O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ).",
          "Space = extra memory beyond input (recursion stack counts).",
          "Amortized — e.g. dynamic array append is O(1) amortized.",
        ],
      },
      {
        heading: "Before pattern drills",
        paragraphs: [
          "You don't need to implement a red-black tree. You do need to know when a hash map beats nested loops.",
          "Work through each pattern's Learn page, then drill with live LeetCode problems.",
        ],
      },
    ],
  },
];

import { patternLearnPages as basePatternPages } from "./pattern-guides";
import { patternExtras } from "./pattern-extras";

export const patternLearnPages = basePatternPages.map((page) => ({
  ...page,
  ...patternExtras[page.slug],
}));

export const allLearnPages: LearnPage[] = [...basicsPages, ...patternLearnPages];

export const learnPageMap = Object.fromEntries(
  allLearnPages.map((page) => [page.slug, page])
) as Record<string, LearnPage>;

export function getLearnSlugs(): string[] {
  return allLearnPages.map((p) => p.slug);
}
