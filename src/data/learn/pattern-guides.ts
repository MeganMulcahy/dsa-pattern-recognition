import type { LearnPage } from "./types";

export const patternLearnPages: LearnPage[] = [
  {
    slug: "two-pointers",
    title: "Two Pointers",
    subtitle: "Traverse an iterable with two indices to avoid nested loops",
    category: "pattern",
    patternId: "two-pointers",
    practiceHref: "/practice?pattern=two-pointers",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "Two pointers is a technique for problems involving an iterable structure like an array or string. Two (or more) pointers traverse the structure — they don't have to be separate variables; an index derived from another counts too.",
          "There is no single implementation. Depending on the problem you move pointers in the same direction, opposite directions, or at different speeds. The skill is recognizing when one linear pass with two indices beats a brute-force double loop.",
        ],
      },
      {
        heading: "How to spot it",
        bullets: [
          "Sorted array + find pair/triplet with a target sum.",
          "In-place modification — remove duplicates, move zeros, partition.",
          "Palindrome check or comparing elements from both ends.",
          "Linked list cycle or middle — fast/slow pointers.",
          "You thought of nested loops but only need one pass — ask if two indices can coordinate.",
        ],
      },
      {
        heading: "The mental model",
        bullets: [
          "Two moving pointers (same or opposite direction, dependent or independent).",
          "A function on the values at those pointers that drives the answer.",
          "A clear rule for which pointer moves next.",
          "Processing logic when a pointer advances (write, compare, skip).",
        ],
      },
      {
        heading: "Classifications",
        subsections: [
          {
            heading: "Same direction (fast / slow)",
            paragraphs: [
              "Both pointers start at the left and move right, usually at different speeds. The slow pointer marks a boundary (valid region, write position); the fast pointer scans ahead.",
            ],
            bullets: [
              "Remove Duplicates from Sorted Array — slow marks unique write position; fast finds next distinct value.",
              "Move rule: if fast value ≠ slow value, advance slow, copy, then advance fast.",
              "Stop when fast reaches end; answer is slow + 1.",
            ],
          },
          {
            heading: "Opposite directions",
            paragraphs: [
              "One pointer at the start, one at the end, moving inward. Works when sorted order lets you eliminate half the search space each step.",
            ],
            bullets: [
              "Two Sum II (sorted) — compare sum to target; if too large shrink right, if too small grow left.",
              "Valid Palindrome — compare chars at both ends, skip non-alphanumeric, move inward.",
              "Container With Most Water — always move the shorter side inward (greedy + two pointers).",
            ],
          },
        ],
      },
      {
        heading: "Two pointers vs sliding window",
        paragraphs: [
          "Sliding window is a same-direction variant where the function applies to the entire interval between pointers, not just the two endpoints.",
          "Longest Substring Without Repeating Characters maintains a set/map for the whole window, expands right, shrinks left on duplicate, tracks max length — that's sliding window, not classic two-pointer endpoint comparison.",
        ],
      },
      {
        heading: "Beyond arrays",
        bullets: [
          "Linked List Cycle — Floyd's algorithm: slow moves 1 step, fast moves 2; cycle iff they meet.",
          "Find middle of linked list — fast reaches end when slow is at middle.",
          "Any iterable where you can advance two logical positions independently.",
        ],
      },
      {
        heading: "Why use it",
        paragraphs: [
          "Naive nested loops are O(n²). Two pointers typically make a single pass — O(n) time, O(1) extra space. That gap is exactly why interviewers ask these problems.",
        ],
      },
      {
        heading: "Practice problems",
        bullets: [
          "Two Sum II · 3Sum · Remove Duplicates · Valid Palindrome",
          "Container With Most Water · Linked List Cycle · Sort Colors",
        ],
      },
    ],
  },
  {
    slug: "sliding-window",
    title: "Sliding Window",
    subtitle: "Maintain a contiguous interval and update it incrementally",
    category: "pattern",
    patternId: "sliding-window",
    practiceHref: "/practice?pattern=sliding-window",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "Sliding window tracks a contiguous subarray or substring with two boundaries (left and right). Instead of recomputing from scratch for every interval, you expand the window by moving right, and shrink from the left when a constraint breaks.",
          "It's the natural choice when the problem asks about the longest, shortest, or count of subarrays/substrings satisfying a condition — especially when adding/removing one element only changes the answer locally.",
        ],
      },
      {
        heading: "How to spot it",
        bullets: [
          "Keywords: longest/shortest substring, subarray sum, at most K, at least K, consecutive.",
          "Contiguous segment of an array or string — not arbitrary subsets.",
          "Constraint involves counts, sums, or distinct characters in the current window.",
          "Brute force would check every [i, j] interval — O(n²) or O(n³).",
        ],
      },
      {
        heading: "The mental model",
        bullets: [
          "Right pointer expands the window (include new element, update state).",
          "While window is invalid, advance left (remove element, update state).",
          "At each valid state, update best answer (max length, min length, count).",
          "State is usually a hash map (counts), sum, or set — updated in O(1) per move.",
        ],
      },
      {
        heading: "Classifications",
        subsections: [
          {
            heading: "Fixed-size window",
            bullets: [
              "Window size K is given — slide it one step at a time.",
              "Max Sum of Subarray of Size K — add entering, subtract leaving.",
              "Permutation in String — compare frequency maps of window size len(p).",
            ],
          },
          {
            heading: "Variable-size window",
            bullets: [
              "Expand until invalid, then shrink until valid again.",
              "Longest Substring Without Repeating — shrink while duplicate exists.",
              "Minimum Window Substring — expand until all chars covered, shrink to minimize.",
              "Max Consecutive Ones III — at most K zeros in window.",
            ],
          },
        ],
      },
      {
        heading: "Sliding window vs two pointers",
        paragraphs: [
          "Same-direction two pointers often look identical. The distinction: sliding window cares about aggregate state of the whole interval (frequency map, sum); two-pointer endpoint problems compare or act on just the two boundary values.",
        ],
      },
      {
        heading: "Why use it",
        paragraphs: [
          "Each element enters and leaves the window at most once — O(n) time despite checking all valid windows implicitly. Space is O(k) for the constraint map, where k is alphabet size or distinct count.",
        ],
      },
      {
        heading: "Practice problems",
        bullets: [
          "Longest Substring Without Repeating · Minimum Window Substring",
          "Max Consecutive Ones III · Fruit Into Baskets · Permutation in String",
        ],
      },
    ],
  },
  {
    slug: "binary-search",
    title: "Binary Search",
    subtitle: "Eliminate half the search space each step",
    category: "pattern",
    patternId: "binary-search",
    practiceHref: "/practice?pattern=binary-search",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "Binary search finds a target in a sorted structure by comparing against the middle and discarding half. It also applies to the answer space: if 'can we achieve X?' is monotonic (false…false, true…true), binary search finds the minimum X that works.",
          "You don't need a literal sorted array — you need a way to partition the space so one half can always be ruled out.",
        ],
      },
      {
        heading: "How to spot it",
        bullets: [
          "Explicitly sorted array or 'find in O(log n)'.",
          "Minimize the maximum / maximize the minimum — feasibility check.",
          "Rotated sorted array — one half is always sorted.",
          "Search space is huge (10⁹) but checking one candidate is cheap.",
        ],
      },
      {
        heading: "The mental model",
        bullets: [
          "Maintain lo and hi bounds on index or answer value.",
          "mid = lo + (hi - lo) / 2 — avoids overflow.",
          "Decide which half still could contain the answer; shrink.",
          "Loop until lo > hi (exact find) or until lo == hi (boundary find).",
        ],
      },
      {
        heading: "Classifications",
        subsections: [
          {
            heading: "Classic index search",
            bullets: [
              "Find target in sorted array — compare mid, go left or right.",
              "Find first/last position — when found, keep searching same direction for boundary.",
              "Search in rotated array — identify sorted half, check if target lies there.",
            ],
          },
          {
            heading: "Binary search on answer",
            bullets: [
              "Koko Eating Bananas — search speed k; is feasible(k)? monotonic.",
              "Capacity to Ship Packages — search capacity; can ship in D days?",
              "Minimize maximum of split sums — if max sum M works, so does M+1.",
            ],
          },
        ],
      },
      {
        heading: "Common pitfalls",
        bullets: [
          "Off-by-one: lo <= hi vs lo < hi depends on exact vs boundary search.",
          "Infinite loop when lo = mid — use lo = mid + 1 when shrinking left bound up.",
          "Forgetting rotated/partially sorted structure still allows elimination.",
        ],
      },
      {
        heading: "Why use it",
        paragraphs: [
          "Turns O(n) scan into O(log n) on sorted data, or O(n × log(range)) when feasibility is O(n). Essential when n or answer range is up to 10⁹.",
        ],
      },
      {
        heading: "Practice problems",
        bullets: [
          "Search in Rotated Sorted Array · Find Minimum in Rotated Array",
          "Koko Eating Bananas · Median of Two Sorted Arrays · Binary Search on Answer templates",
        ],
      },
    ],
  },
  {
    slug: "bfs",
    title: "BFS",
    subtitle: "Explore layer by layer for shortest paths and spread",
    category: "pattern",
    patternId: "bfs",
    practiceHref: "/practice?pattern=bfs",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "Breadth-first search explores a graph or grid level by level using a queue. Nodes discovered first are processed first — so the first time you reach a node, you've found the shortest path in an unweighted graph.",
          "BFS also models simultaneous spread: rotten oranges, fire propagation, or any process where all sources expand one step per tick.",
        ],
      },
      {
        heading: "How to spot it",
        bullets: [
          "Shortest path in unweighted graph, grid, or maze.",
          "Minimum number of steps, days, or transformations.",
          "Level-order traversal of a tree.",
          "Multi-source spread — enqueue all sources at time 0.",
          "Word Ladder — each word is a node, one-letter change is an edge.",
        ],
      },
      {
        heading: "The mental model",
        bullets: [
          "Queue + visited set. Enqueue start node(s) with distance 0.",
          "Process queue level by level (track size before inner loop for distance).",
          "For each node, enqueue unvisited neighbors with distance + 1.",
          "First arrival at target = shortest path; return distance or reconstruct path.",
        ],
      },
      {
        heading: "Classifications",
        subsections: [
          {
            heading: "Grid BFS",
            bullets: [
              "Rotting Oranges — multi-source BFS from all rotten cells.",
              "Shortest Path in Binary Matrix — 8-directional or 4-directional neighbors.",
              "Mark visited by mutating grid or using a set.",
            ],
          },
          {
            heading: "Graph / implicit BFS",
            bullets: [
              "Word Ladder — build graph on the fly or use wildcard patterns.",
              "Open the Lock — each dial turn is an edge; BFS for minimum turns.",
              "Course Schedule uses topo sort, not BFS — but unweighted shortest path in course graph is BFS.",
            ],
          },
        ],
      },
      {
        heading: "BFS vs DFS",
        paragraphs: [
          "BFS for shortest unweighted path or level-by-level processing. DFS for exploring all paths, deep structure, or when any path suffices and you want less memory (stack vs queue).",
        ],
      },
      {
        heading: "Why use it",
        paragraphs: [
          "O(V + E) visits each node and edge once. Guarantees shortest path in unweighted settings where Dijkstra would be overkill.",
        ],
      },
      {
        heading: "Practice problems",
        bullets: [
          "Rotting Oranges · Word Ladder · Binary Tree Level Order Traversal",
          "Shortest Path in Binary Matrix · Open the Lock",
        ],
      },
    ],
  },
  {
    slug: "dfs",
    title: "DFS",
    subtitle: "Dive deep, exhaust branches, flood-fill components",
    category: "pattern",
    patternId: "dfs",
    practiceHref: "/practice?pattern=dfs",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "Depth-first search goes as far as possible along one branch before backtracking. On graphs and grids it discovers connected components; on trees it traverses subtrees; with state it explores paths.",
          "DFS is recursive or stack-based. It's the foundation for backtracking (DFS + undo) and many tree problems.",
        ],
      },
      {
        heading: "How to spot it",
        bullets: [
          "Count or mark connected components (islands, regions).",
          "Explore all paths in a tree or graph with a target condition.",
          "Flood fill — paint connected cells of same color.",
          "Detect cycles in directed graphs (with recursion stack).",
          "Problem says 'traverse', 'explore neighbors', 'connected' without needing shortest path.",
        ],
      },
      {
        heading: "The mental model",
        bullets: [
          "Mark node visited before exploring neighbors (or on exit for backtracking).",
          "For each neighbor, recurse if unvisited and valid.",
          "Return aggregated result (count, area, boolean found).",
          "Grid DFS: four directions, bounds check, mark cell visited.",
        ],
      },
      {
        heading: "Classifications",
        subsections: [
          {
            heading: "Component counting",
            bullets: [
              "Number of Islands — each unvisited '1' triggers one DFS, increment count.",
              "Max Area of Island — DFS returns size of connected component.",
              "Surrounded Regions — DFS from border 'O's to find non-captured cells.",
            ],
          },
          {
            heading: "Path search",
            bullets: [
              "Word Search — DFS with backtrack on grid, mark/unmark cell.",
              "Path Sum — tree DFS with running total, prune when sum exceeded.",
              "Graph valid tree — DFS/BFS + edge count for cycle check.",
            ],
          },
        ],
      },
      {
        heading: "DFS vs backtracking",
        paragraphs: [
          "Backtracking is DFS that builds a candidate solution, abandons invalid branches, and undoes choices. If the problem asks for all combinations or permutations, you're in backtracking territory — still DFS at core.",
        ],
      },
      {
        heading: "Why use it",
        paragraphs: [
          "O(V + E) for full traversal. Often simpler to write recursively than BFS for grid fill. Stack depth is O(V) worst case — watch recursion limits on huge grids (use iterative stack).",
        ],
      },
      {
        heading: "Practice problems",
        bullets: [
          "Number of Islands · Word Search · Max Area of Island · Path Sum",
          "Clone Graph · Pacific Atlantic Water Flow",
        ],
      },
    ],
  },
  {
    slug: "dynamic-programming",
    title: "Dynamic Programming",
    subtitle: "Reuse subproblem answers instead of recomputing",
    category: "pattern",
    patternId: "dynamic-programming",
    practiceHref: "/practice?pattern=dynamic-programming",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "Dynamic programming solves problems with optimal substructure and overlapping subproblems. You define a state (usually dp[i] or dp[i][j]), write a recurrence relating states, and fill a table bottom-up or use memoization top-down.",
          "If brute-force recursion recalculates the same states repeatedly, DP eliminates that redundancy.",
        ],
      },
      {
        heading: "How to spot it",
        bullets: [
          "Count the number of ways to…",
          "Minimum / maximum cost, profit, or length with choices at each step.",
          "Can I reach / achieve X with these constraints?",
          "Problem on sequences (strings, arrays) with decisions at each index.",
          "Recursive solution has exponential time — look for repeated (i, j) states.",
        ],
      },
      {
        heading: "The mental model",
        bullets: [
          "Define state: what information uniquely describes a subproblem?",
          "Recurrence: how does dp[i] relate to smaller indices?",
          "Base cases: smallest subproblems with known answers.",
          "Iteration order: fill dependencies before dependents.",
          "Answer: dp[n], max(dp), or min(dp) depending on problem.",
        ],
      },
      {
        heading: "Classifications",
        subsections: [
          {
            heading: "1D DP",
            bullets: [
              "Climbing Stairs — dp[i] = dp[i-1] + dp[i-2].",
              "House Robber — dp[i] = max(rob i + dp[i-2], skip + dp[i-1]).",
              "Coin Change — dp[amount] = min coins using dp[amount - coin].",
            ],
          },
          {
            heading: "2D DP",
            bullets: [
              "Longest Common Subsequence — dp[i][j] from dp[i-1][j], dp[i][j-1], dp[i-1][j-1].",
              "Edit Distance — insert, delete, replace transitions.",
              "Unique Paths — dp[i][j] = dp[i-1][j] + dp[i][j-1].",
            ],
          },
          {
            heading: "Knapsack / subset",
            bullets: [
              "0/1 Knapsack — each item once; iterate capacity backward.",
              "Unbounded knapsack — coin change, unlimited use of each coin.",
              "Partition Equal Subset Sum — subset sum DP.",
            ],
          },
        ],
      },
      {
        heading: "DP vs greedy",
        paragraphs: [
          "Greedy works when local optimal is globally optimal. DP when you must try multiple choices and combine results — 'what if I take vs skip this item?' If unsure, write recursion first; overlapping calls mean DP.",
        ],
      },
      {
        heading: "Why use it",
        paragraphs: [
          "Turns O(2ⁿ) recursion into O(n) or O(n²) table fill. Essential for interview problems with choice at each step and constraints up to n ≈ 1000.",
        ],
      },
      {
        heading: "Practice problems",
        bullets: [
          "Climbing Stairs · Coin Change · House Robber · Longest Increasing Subsequence",
          "Edit Distance · Unique Paths · Word Break",
        ],
      },
    ],
  },
  {
    slug: "greedy",
    title: "Greedy",
    subtitle: "Make the best local choice at each step",
    category: "pattern",
    patternId: "greedy",
    practiceHref: "/practice?pattern=greedy",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "Greedy builds a solution step by step, always picking the locally best option without reconsidering past choices. It works when the greedy choice property holds: an optimal solution can be reached by a sequence of locally optimal choices.",
          "Often requires sorting first — by start time, end time, ratio, or profit density.",
        ],
      },
      {
        heading: "How to spot it",
        bullets: [
          "Interval scheduling — maximum non-overlapping meetings.",
          "Jump game — can you reach the end?",
          "Assign tasks to minimize latency or maximize throughput.",
          "Exchange argument intuition: swapping greedy choice never hurts.",
          "Problem has matroid-like structure or sort-then-scan pattern.",
        ],
      },
      {
        heading: "The mental model",
        bullets: [
          "Sort input by the key that makes greedy obvious (end time, deadline, ratio).",
          "Scan and take element if compatible with previous picks.",
          "Track running optimum (count, max reach, current end).",
          "Prove or sanity-check: would skipping this greedy pick ever help?",
        ],
      },
      {
        heading: "Classifications",
        subsections: [
          {
            heading: "Interval problems",
            bullets: [
              "Non-overlapping Intervals — sort by end, greedily keep earliest-finishing.",
              "Merge Intervals — sort by start, merge if overlap.",
              "Minimum Arrows to Burst Balloons — sort by end, shoot when needed.",
            ],
          },
          {
            heading: "Reach / coverage",
            bullets: [
              "Jump Game — track farthest reachable index.",
              "Jump Game II — BFS-like greedy on reach layers.",
              "Partition Labels — track last occurrence, cut when seen all in range.",
            ],
          },
        ],
      },
      {
        heading: "Greedy vs DP",
        paragraphs: [
          "If the problem asks 'minimum coins' with arbitrary denominations, greedy fails (use DP). If denominations are canonical (US coins), greedy works. When in doubt, try greedy only if you can argue exchange property; otherwise DP.",
        ],
      },
      {
        heading: "Why use it",
        paragraphs: [
          "O(n log n) from sort + O(n) scan — often optimal and simpler than DP when it applies.",
        ],
      },
      {
        heading: "Practice problems",
        bullets: [
          "Merge Intervals · Jump Game · Non-overlapping Intervals · Partition Labels",
          "Task Scheduler · Gas Station",
        ],
      },
    ],
  },
  {
    slug: "hash-map",
    title: "Hash Map / Set",
    subtitle: "Trade space for O(1) lookups and counting",
    category: "pattern",
    patternId: "hash-map",
    practiceHref: "/practice?pattern=hash-map",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "Hash maps and sets give average O(1) insert, lookup, and delete. Use them when you need to know 'have I seen this before?', 'what's the complement?', or 'how many times does X appear?'",
          "They're the standard upgrade from nested loops when the bottleneck is searching for a matching value.",
        ],
      },
      {
        heading: "How to spot it",
        bullets: [
          "Find two elements with sum/product/target relationship.",
          "Detect duplicate or first duplicate in a stream.",
          "Group items by normalized key (anagram signature, remainder mod k).",
          "Need O(1) membership test while scanning.",
          "Count frequency to compare or find majority.",
        ],
      },
      {
        heading: "The mental model",
        bullets: [
          "Choose key: raw value, index, frequency tuple, sorted string, prefix sum.",
          "Single pass: check map for complement before inserting current.",
          "Frequency map: increment count, query thresholds.",
          "Two maps when comparing two sequences (string anagram with sliding window).",
        ],
      },
      {
        heading: "Classifications",
        subsections: [
          {
            heading: "Complement lookup",
            bullets: [
              "Two Sum — map value → index; check target - num exists.",
              "Subarray sum equals K often uses prefix sum + hash map (hybrid with prefix sum pattern).",
            ],
          },
          {
            heading: "Grouping & frequency",
            bullets: [
              "Group Anagrams — key = sorted string or char count tuple.",
              "Top K Frequent — frequency map then heap (hybrid).",
              "Longest Consecutive Sequence — set of all nums, expand from each start.",
            ],
          },
        ],
      },
      {
        heading: "Hash map vs sorting",
        paragraphs: [
          "Sorting enables two pointers but costs O(n log n). Hash map gives O(n) if order doesn't matter. Two Sum on unsorted array → hash map; on sorted → two pointers.",
        ],
      },
      {
        heading: "Why use it",
        paragraphs: [
          "O(n) time, O(n) space — beats O(n²) brute force. The default first upgrade when you see 'find pair' on unsorted data.",
        ],
      },
      {
        heading: "Practice problems",
        bullets: [
          "Two Sum · Group Anagrams · Longest Consecutive Sequence",
          "Contains Duplicate · Valid Anagram · Happy Number",
        ],
      },
    ],
  },
  {
    slug: "stack",
    title: "Stack",
    subtitle: "Last-in-first-out for nesting, matching, and undo",
    category: "pattern",
    patternId: "stack",
    practiceHref: "/practice?pattern=stack",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "A stack processes the most recent item first — perfect when the last opened bracket must match the next close, or when you need to reverse order of operations.",
          "Monotonic stack is a variant (see Monotonic Stack guide) for next-greater-element problems.",
        ],
      },
      {
        heading: "How to spot it",
        bullets: [
          "Valid parentheses, nested HTML/XML, bracket matching.",
          "Evaluate postfix / prefix expressions.",
          "Next greater element to the left (often monotonic stack instead).",
          "Undo operations, browser back, DFS iterative simulation.",
          "Parse or flatten nested structures.",
        ],
      },
      {
        heading: "The mental model",
        bullets: [
          "Push on open / positive event / incoming token.",
          "Pop on close — verify top matches; empty stack on mismatch = invalid.",
          "Stack bottom holds oldest unresolved context.",
          "For RPN: push numbers, pop two on operator, push result.",
        ],
      },
      {
        heading: "Classifications",
        subsections: [
          {
            heading: "Matching & nesting",
            bullets: [
              "Valid Parentheses — map closing → opening, pop and compare.",
              "Remove Invalid Parentheses — BFS/DFS variant with stack logic.",
              "Decode String — stack of (string, repeat count) pairs.",
            ],
          },
          {
            heading: "Expression evaluation",
            bullets: [
              "Evaluate Reverse Polish Notation — stack of operands.",
              "Basic Calculator — stack for signs and partial sums.",
              "Min Stack — auxiliary stack tracking minimums.",
            ],
          },
        ],
      },
      {
        heading: "Stack vs recursion",
        paragraphs: [
          "DFS recursion uses the call stack implicitly. Converting to explicit stack avoids overflow on deep graphs. Same LIFO discipline.",
        ],
      },
      {
        heading: "Why use it",
        paragraphs: [
          "O(n) single pass for matching problems. Each element pushed and popped once.",
        ],
      },
      {
        heading: "Practice problems",
        bullets: [
          "Valid Parentheses · Min Stack · Evaluate Reverse Polish Notation",
          "Daily Temperatures (monotonic stack) · Basic Calculator",
        ],
      },
    ],
  },
  {
    slug: "heap",
    title: "Heap / Priority Queue",
    subtitle: "Always know the best or worst candidate in O(log n)",
    category: "pattern",
    patternId: "heap",
    practiceHref: "/practice?pattern=heap",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "A heap (priority queue) keeps the min or max element accessible in O(1), with O(log n) insert and extract. Use it when you repeatedly need the 'best next' item among a changing collection.",
          "Size-k heaps solve 'kth largest' without sorting the entire array.",
        ],
      },
      {
        heading: "How to spot it",
        bullets: [
          "Top K largest/smallest/frequent elements.",
          "Kth largest in stream — maintain heap of size k.",
          "Merge K sorted lists or arrays.",
          "Running median of a stream.",
          "Dijkstra's shortest path — min-heap on distance.",
        ],
      },
      {
        heading: "The mental model",
        bullets: [
          "Min-heap of size K for Kth largest — root is the Kth largest seen.",
          "Max-heap for 'process highest priority first'.",
          "Push all, pop k times — or lazy maintain size k while scanning.",
          "Two heaps (max left, min right) for median.",
        ],
      },
      {
        heading: "Classifications",
        subsections: [
          {
            heading: "Top K",
            bullets: [
              "Kth Largest Element — min-heap size k.",
              "Top K Frequent Elements — count map + heap on frequency.",
              "Sort nearly-sorted array when k elements out of place.",
            ],
          },
          {
            heading: "Merge patterns",
            bullets: [
              "Merge K Sorted Lists — heap of (value, list index, node).",
              "Find K Pairs with Smallest Sums — heap over pair sums.",
              "Smallest Range Covering K Lists — heap tracks current min per list.",
            ],
          },
        ],
      },
      {
        heading: "Heap vs sort",
        paragraphs: [
          "Full sort is O(n log n). Top K with heap is O(n log k) — better when k << n. Quickselect is O(n) average for one-off kth element.",
        ],
      },
      {
        heading: "Why use it",
        paragraphs: [
          "Avoids sorting entire input when only extreme elements matter. Essential for streaming data and multi-way merge.",
        ],
      },
      {
        heading: "Practice problems",
        bullets: [
          "Kth Largest Element · Top K Frequent Elements · Merge K Sorted Lists",
          "Find Median from Data Stream · Task Scheduler",
        ],
      },
    ],
  },
  {
    slug: "union-find",
    title: "Union Find",
    subtitle: "Track merging groups and connected components online",
    category: "pattern",
    patternId: "union-find",
    practiceHref: "/practice?pattern=union-find",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "Union Find (Disjoint Set Union) maintains a partition of elements into groups. union(a, b) merges groups; find(a) returns the group representative. With path compression and union by rank, operations are nearly O(1) amortized.",
          "Ideal for undirected connectivity when edges arrive over time or you need component counts.",
        ],
      },
      {
        heading: "How to spot it",
        bullets: [
          "Number of connected components in undirected graph.",
          "Are A and B in the same group after merging?",
          "Detect cycle when adding edge between same component.",
          "Dynamic connectivity — edges added, queries online.",
          "Grid problems reducible to union adjacent cells.",
        ],
      },
      {
        heading: "The mental model",
        bullets: [
          "parent[i] = i initially; rank or size optional.",
          "find(x): follow parent until self-loop; compress path on return.",
          "union(x, y): attach root of smaller tree under larger.",
          "Component count: decrement when union merges two different roots.",
        ],
      },
      {
        heading: "Classifications",
        subsections: [
          {
            heading: "Graph connectivity",
            bullets: [
              "Number of Provinces — union friends in adjacency matrix.",
              "Redundant Connection — last edge that creates cycle in UF.",
              "Accounts Merge — union emails that belong to same person.",
            ],
          },
          {
            heading: "Grid / implicit unions",
            bullets: [
              "Number of Islands can use UF instead of DFS — union land cells.",
              "Swim in Rising Water — union cells as water level rises.",
            ],
          },
        ],
      },
      {
        heading: "Union find vs DFS",
        paragraphs: [
          "DFS finds all components in one pass offline. Union Find shines when edges arrive incrementally or you union many pairs without full graph rebuild.",
        ],
      },
      {
        heading: "Why use it",
        paragraphs: [
          "Near-constant time per union/find. Simpler than BFS/DFS for 'same component?' queries on undirected graphs with many union operations.",
        ],
      },
      {
        heading: "Practice problems",
        bullets: [
          "Number of Provinces · Redundant Connection · Accounts Merge",
          "Most Stones Removed with Same Row or Column",
        ],
      },
    ],
  },
  {
    slug: "topological-sort",
    title: "Topological Sort",
    subtitle: "Linear order respecting directed dependencies",
    category: "pattern",
    patternId: "topological-sort",
    practiceHref: "/practice?pattern=topological-sort",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "Topological sort orders nodes in a DAG so every edge goes from earlier to later. It's how you resolve prerequisites, build orders, and detect impossible circular dependencies.",
          "Two main approaches: Kahn's algorithm (BFS on in-degree) and DFS post-order reverse.",
        ],
      },
      {
        heading: "How to spot it",
        bullets: [
          "Course prerequisites — can you finish all courses?",
          "Build order — task A before task B.",
          "Alien dictionary — derive character order from sorted words.",
          "Directed graph with dependency constraints.",
          "Cycle detection in directed graph = impossible order.",
        ],
      },
      {
        heading: "The mental model",
        bullets: [
          "Build adjacency list and in-degree count per node.",
          "Kahn: queue all in-degree 0 nodes; dequeue, reduce neighbor in-degrees, enqueue new zeros.",
          "If processed count < n → cycle exists.",
          "DFS: post-order push to stack, reverse for topological order.",
        ],
      },
      {
        heading: "Classifications",
        subsections: [
          {
            heading: "Feasibility (cycle check)",
            bullets: [
              "Course Schedule — return true if topological order exists.",
              "Any problem asking 'is ordering possible?'",
            ],
          },
          {
            heading: "Construct order",
            bullets: [
              "Course Schedule II — return actual order or empty.",
              "Sequence Reconstruction — check if order is unique.",
              "Alien Dictionary — build graph from adjacent word pairs.",
            ],
          },
        ],
      },
      {
        heading: "Topological sort vs DFS",
        paragraphs: [
          "Both detect cycles in directed graphs. Kahn's feels like BFS; DFS post-order is more compact for returning order. Course Schedule problems map directly to topo sort.",
        ],
      },
      {
        heading: "Why use it",
        paragraphs: [
          "O(V + E) — linear in graph size. The standard tool whenever dependencies form a DAG.",
        ],
      },
      {
        heading: "Practice problems",
        bullets: [
          "Course Schedule · Course Schedule II · Alien Dictionary",
          "Minimum Height Trees · Sequence Reconstruction",
        ],
      },
    ],
  },
  {
    slug: "trie",
    title: "Trie",
    subtitle: "Prefix tree for fast string prefix operations",
    category: "pattern",
    patternId: "trie",
    practiceHref: "/practice?pattern=trie",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "A trie stores strings character by character in a tree. Shared prefixes share paths — efficient for prefix lookup, autocomplete, and word dictionaries.",
          "Each node has children (map or array of size 26) and optionally marks end-of-word.",
        ],
      },
      {
        heading: "How to spot it",
        bullets: [
          "Search words by prefix — startsWith, autocomplete.",
          "Dictionary of many strings with prefix queries.",
          "Word Search II — find all words from dictionary on board.",
          "XOR maximum pair with binary trie (advanced variant).",
          "Need faster than hash set for prefix, not just exact match.",
        ],
      },
      {
        heading: "The mental model",
        bullets: [
          "insert(word): walk/create child per char, mark isEnd at last.",
          "search(word): follow path; return isEnd at last char.",
          "startsWith(prefix): follow path; return true if path exists.",
          "DFS on trie for Word Search II with pruning when prefix dead.",
        ],
      },
      {
        heading: "Classifications",
        subsections: [
          {
            heading: "Basic trie operations",
            bullets: [
              "Implement Trie — insert, search, startsWith.",
              "Replace Words — shortest root replacing prefix.",
              "Map Sum Pairs — prefix sums on trie keys.",
            ],
          },
          {
            heading: "Trie + backtracking",
            bullets: [
              "Word Search II — build trie from words, DFS board with trie pruning.",
              "Remove dead branches after finding word to avoid duplicates.",
            ],
          },
        ],
      },
      {
        heading: "Trie vs hash set",
        paragraphs: [
          "Hash set gives O(1) exact lookup but can't answer 'any word starting with ab?' without scanning all keys. Trie gives O(m) prefix check where m is prefix length.",
        ],
      },
      {
        heading: "Why use it",
        paragraphs: [
          "O(m) per operation for word length m. Space shares prefixes — efficient for large dictionaries with common stems.",
        ],
      },
      {
        heading: "Practice problems",
        bullets: [
          "Implement Trie · Word Search II · Design Add and Search Word",
          "Replace Words · Longest Word in Dictionary",
        ],
      },
    ],
  },
  {
    slug: "backtracking",
    title: "Backtracking",
    subtitle: "Explore all choices, undo when stuck",
    category: "pattern",
    patternId: "backtracking",
    practiceHref: "/practice?pattern=backtracking",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "Backtracking builds candidates incrementally via DFS. When a partial candidate can't lead to a valid solution, you undo the last choice and try the next — 'backtrack'.",
          "It generates subsets, permutations, combinations, and solves constraint puzzles (N-Queens, Sudoku).",
        ],
      },
      {
        heading: "How to spot it",
        bullets: [
          "Return all / count all valid configurations.",
          "Generate subsets, permutations, combinations.",
          "Place queens, fill board with constraints.",
          "Decision tree: at each step, multiple choices to try.",
          "Input size n ≤ 20 often signals exponential search with pruning.",
        ],
      },
      {
        heading: "The mental model",
        bullets: [
          "Choose — add option to current path/state.",
          "Explore — recurse to next decision level.",
          "Unchoose — remove option (backtrack) before trying sibling.",
          "Prune — skip branches that violate constraints early.",
          "Base case — record valid complete candidate.",
        ],
      },
      {
        heading: "Classifications",
        subsections: [
          {
            heading: "Subsets & combinations",
            bullets: [
              "Subsets — include/exclude each element: 2ⁿ paths.",
              "Combination Sum — reuse allowed or not; prune when sum exceeds target.",
              "Combination Sum II — sort + skip duplicates at same depth.",
            ],
          },
          {
            heading: "Permutations & placement",
            bullets: [
              "Permutations — swap or use used[] array; n! paths.",
              "N-Queens — place row by row, check cols/diagonals.",
              "Word Search — grid backtrack with visited mark.",
            ],
          },
        ],
      },
      {
        heading: "Backtracking vs DP",
        paragraphs: [
          "Backtracking enumerates all valid solutions (or counts via pruning). DP when subproblems overlap and you need optimal value, not all configurations. 'All combinations' → backtrack; 'minimum cost' → often DP.",
        ],
      },
      {
        heading: "Why use it",
        paragraphs: [
          "Only way to enumerate exponential solution spaces. Pruning cuts branches early — essential for n ≤ 15–20.",
        ],
      },
      {
        heading: "Practice problems",
        bullets: [
          "Subsets · Permutations · Combination Sum · N-Queens",
          "Word Search · Palindrome Partitioning · Letter Combinations",
        ],
      },
    ],
  },
  {
    slug: "monotonic-stack",
    title: "Monotonic Stack",
    subtitle: "Stack keeping elements in sorted order for range answers",
    category: "pattern",
    patternId: "monotonic-stack",
    practiceHref: "/practice?pattern=monotonic-stack",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "A monotonic stack stores indices (or values) in increasing or decreasing order. When a new element violates the order, pop until restored — each pop resolves an 'next greater/smaller' answer for the popped index.",
          "Each element is pushed and popped once — O(n) total.",
        ],
      },
      {
        heading: "How to spot it",
        bullets: [
          "Next greater element to the right (or left).",
          "Next smaller element — stock span, daily temperatures.",
          "Largest rectangle in histogram — width bounded by nearest smaller bars.",
          "For each index, need nearest index where value is greater/smaller.",
          "Brute force inner loop for 'next X' on every index.",
        ],
      },
      {
        heading: "The mental model",
        bullets: [
          "Decreasing stack (for next greater): pop while current > stack top, assign answer to popped index.",
          "Push current index after pops.",
          "Increasing stack for next smaller — symmetric logic.",
          "For histogram: pop on smaller height, width = current - stack top - 1.",
        ],
      },
      {
        heading: "Classifications",
        subsections: [
          {
            heading: "Next greater / smaller",
            bullets: [
              "Daily Temperatures — days until warmer; decreasing stack of indices.",
              "Next Greater Element I & II — circular array variant.",
              "Stock Span — days of consecutive lower prices before today.",
            ],
          },
          {
            heading: "Area / range maximum",
            bullets: [
              "Largest Rectangle in Histogram — pop when height decreases, compute area with popped as min height.",
              "Maximal Rectangle in binary matrix — histogram per row + monotonic stack.",
            ],
          },
        ],
      },
      {
        heading: "Monotonic stack vs brute force",
        paragraphs: [
          "Naive 'for each i, scan right for next greater' is O(n²). Monotonic stack answers all indices in one O(n) pass — the go-to when 'next greater/smaller' appears.",
        ],
      },
      {
        heading: "Why use it",
        paragraphs: [
          "O(n) time, O(n) stack space. Elegant replacement for nested loops on index-pair constraints involving ordering.",
        ],
      },
      {
        heading: "Practice problems",
        bullets: [
          "Daily Temperatures · Next Greater Element II · Largest Rectangle in Histogram",
          "Stock Span · 132 Pattern",
        ],
      },
    ],
  },
  {
    slug: "prefix-sum",
    title: "Prefix Sum",
    subtitle: "Precompute cumulative totals for fast range queries",
    category: "pattern",
    patternId: "prefix-sum",
    practiceHref: "/practice?pattern=prefix-sum",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "Prefix sum precomputes running totals: prefix[i] = sum of nums[0..i]. Range sum [l, r] becomes prefix[r] - prefix[l-1] in O(1) after O(n) preprocessing.",
          "Combined with a hash map, it finds subarrays with target sum by looking for prefix[j] - prefix[i] = k.",
        ],
      },
      {
        heading: "How to spot it",
        bullets: [
          "Subarray sum equals k — count or find subarrays.",
          "Range sum query on static array (multiple queries).",
          "Equilibrium index where left sum equals right sum.",
          "Subarray divisible by k — track prefix mod k.",
          "2D matrix region sum (2D prefix sum extension).",
        ],
      },
      {
        heading: "The mental model",
        bullets: [
          "Build prefix array: prefix[0] = nums[0], prefix[i] = prefix[i-1] + nums[i].",
          "Range sum [l,r] = prefix[r] - (l > 0 ? prefix[l-1] : 0).",
          "For subarray sum k: map prefix sum → count; at each step add count[prefix - k].",
          "Initialize map with {0: 1} for subarrays starting at index 0.",
        ],
      },
      {
        heading: "Classifications",
        subsections: [
          {
            heading: "Static range queries",
            bullets: [
              "Range Sum Query Immutable — build prefix, answer queries O(1).",
              "Product of Array Except Self — prefix + suffix products.",
              "Find Pivot Index — prefix from left equals suffix from right.",
            ],
          },
          {
            heading: "Subarray target sum",
            bullets: [
              "Subarray Sum Equals K — hash map of prefix counts.",
              "Continuous Subarray Sum — prefix mod k in map.",
              "Subarray Sums Divisible by K — count pairs same mod k.",
            ],
          },
        ],
      },
      {
        heading: "Prefix sum vs sliding window",
        paragraphs: [
          "Sliding window works for nonnegative contiguous constraints (length, at most k positives). Prefix sum + hash map handles negative numbers and exact sum counts where window shrink/grow isn't monotonic.",
        ],
      },
      {
        heading: "Why use it",
        paragraphs: [
          "O(n) preprocessing, O(1) or O(n) queries. Turns O(n²) subarray sum enumeration into O(n) with hash map.",
        ],
      },
      {
        heading: "Practice problems",
        bullets: [
          "Subarray Sum Equals K · Range Sum Query Immutable · Subarray Sums Divisible by K",
          "Product of Array Except Self · Find Pivot Index",
        ],
      },
    ],
  },
];
