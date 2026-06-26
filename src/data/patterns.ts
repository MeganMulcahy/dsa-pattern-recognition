import type { Pattern } from "@/types";

export const patterns: Pattern[] = [
  {
    id: "two-pointers",
    name: "Two Pointers",
    description: "Use two indices moving toward each other or in the same direction.",
    signals: ["sorted array", "pair sum", "palindrome", "remove duplicates in-place"],
  },
  {
    id: "sliding-window",
    name: "Sliding Window",
    description: "Maintain a window over a contiguous subarray or substring.",
    signals: ["longest/shortest substring", "subarray with constraint", "fixed or variable window"],
  },
  {
    id: "binary-search",
    name: "Binary Search",
    description: "Halve the search space on sorted data or monotonic answer space.",
    signals: ["sorted input", "find boundary", "minimize/maximize with feasibility check"],
  },
  {
    id: "bfs",
    name: "BFS",
    description: "Explore level by level for shortest path or nearest expansion.",
    signals: ["shortest path in unweighted graph", "level-order", "multi-source spread"],
  },
  {
    id: "dfs",
    name: "DFS",
    description: "Dive deep through branches before backtracking.",
    signals: ["explore all paths", "connected components", "tree/graph traversal"],
  },
  {
    id: "dynamic-programming",
    name: "Dynamic Programming",
    description: "Break into overlapping subproblems with optimal substructure.",
    signals: ["count ways", "min/max over choices", "optimal substructure", "memoization"],
  },
  {
    id: "greedy",
    name: "Greedy",
    description: "Make the locally best choice at each step.",
    signals: ["interval scheduling", "sort then pick", "exchange argument"],
  },
  {
    id: "hash-map",
    name: "Hash Map / Set",
    description: "Trade space for O(1) lookups and frequency tracking.",
    signals: ["find complement", "count frequency", "detect duplicates", "anagram"],
  },
  {
    id: "stack",
    name: "Stack",
    description: "Process elements in LIFO order for nesting or reversal.",
    signals: ["matching brackets", "next greater element", "undo/reverse operations"],
  },
  {
    id: "heap",
    name: "Heap / Priority Queue",
    description: "Efficiently track the k largest/smallest or merge sorted streams.",
    signals: ["top k elements", "running median", "merge k sorted lists"],
  },
  {
    id: "union-find",
    name: "Union Find",
    description: "Track connected components with union and find operations.",
    signals: ["connected components", "cycle detection in undirected graph", "group merging"],
  },
  {
    id: "topological-sort",
    name: "Topological Sort",
    description: "Order nodes in a DAG respecting dependencies.",
    signals: ["prerequisites", "dependency ordering", "course schedule"],
  },
  {
    id: "trie",
    name: "Trie",
    description: "Prefix tree for efficient string prefix operations.",
    signals: ["prefix search", "autocomplete", "word dictionary"],
  },
  {
    id: "backtracking",
    name: "Backtracking",
    description: "Build candidates incrementally and abandon invalid paths.",
    signals: ["generate all combinations", "permutations", "constraint satisfaction"],
  },
  {
    id: "monotonic-stack",
    name: "Monotonic Stack",
    description: "Stack maintaining increasing or decreasing order for range queries.",
    signals: ["next greater/smaller element", "histogram area", "daily temperatures"],
  },
  {
    id: "prefix-sum",
    name: "Prefix Sum",
    description: "Precompute cumulative sums for fast range queries.",
    signals: ["subarray sum equals k", "range sum query", "equilibrium index"],
  },
];

export const patternMap = Object.fromEntries(
  patterns.map((pattern) => [pattern.id, pattern])
) as Record<(typeof patterns)[number]["id"], Pattern>;
