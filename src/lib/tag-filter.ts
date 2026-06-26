/** LeetCode topic tags that reveal the algorithm — hidden from the UI during practice. */
const REVEALING_TAG_SLUGS = new Set([
  "array",
  "matrix",
  "dynamic-programming",
  "memoization",
  "two-pointers",
  "sliding-window",
  "binary-search",
  "breadth-first-search",
  "depth-first-search",
  "greedy",
  "hash-table",
  "stack",
  "heap-priority-queue",
  "union-find",
  "topological-sort",
  "trie",
  "backtracking",
  "monotonic-stack",
  "monotonic-queue",
  "prefix-sum",
  "recursion",
  "divide-and-conquer",
  "sorting",
  "graph",
  "tree",
  "binary-tree",
  "linked-list",
]);

const REVEALING_TAG_NAMES = new Set([
  "array",
  "matrix",
  "dynamic programming",
  "memoization",
  "two pointers",
  "sliding window",
  "binary search",
  "breadth-first search",
  "depth-first search",
  "greedy",
  "hash table",
  "stack",
  "heap (priority queue)",
  "union find",
  "topological sort",
  "trie",
  "backtracking",
  "monotonic stack",
  "monotonic queue",
  "prefix sum",
  "recursion",
  "divide and conquer",
  "sorting",
  "graph",
  "tree",
  "binary tree",
  "linked list",
]);

export function isRevealingTag(name: string, slug?: string): boolean {
  if (slug && REVEALING_TAG_SLUGS.has(slug.toLowerCase())) return true;
  return REVEALING_TAG_NAMES.has(name.toLowerCase());
}

export function filterDisplayTags(
  tags: { name: string; slug: string }[]
): string[] {
  return tags
    .filter((t) => !isRevealingTag(t.name, t.slug))
    .map((t) => t.name);
}
