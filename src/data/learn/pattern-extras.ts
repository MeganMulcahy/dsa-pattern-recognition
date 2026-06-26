import type { CodeExample, SupplementaryResource } from "./types";

export const patternExtras: Record<
  string,
  {
    codeExamples: CodeExample[];
    resources: SupplementaryResource[];
  }
> = {
  "two-pointers": {
    codeExamples: [
      {
        title: "Opposite directions template (Two Sum II)",
        language: "python",
        code: `# Two Sum II — sorted array, find pair summing to target
# Move the pointer that moves you closer to target.
def two_sum_sorted(nums: list[int], target: int) -> list[int]:
    left, right = 0, len(nums) - 1
    while left < right:
        current = nums[left] + nums[right]
        if current == target:
            return [left + 1, right + 1]  # 1-indexed like LeetCode
        if current < target:
            left += 1
        else:
            right -= 1
    return []

# 3Sum — fix one index, run opposite pointers on the rest
def three_sum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    result = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, len(nums) - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                left += 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
            elif total < 0:
                left += 1
            else:
                right -= 1
    return result`,
      },
      {
        title: "Fast/slow same-direction template (remove duplicates)",
        language: "python",
        code: `# Remove Duplicates from Sorted Array — in-place, O(n)
# slow = last unique write position; fast scans ahead
def remove_duplicates(nums: list[int]) -> int:
    if not nums:
        return 0
    slow = 0
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    return slow + 1

# Move Zeroes — slow marks next non-zero slot
def move_zeroes(nums: list[int]) -> None:
    slow = 0
    for fast in range(len(nums)):
        if nums[fast] != 0:
            nums[slow], nums[fast] = nums[fast], nums[slow]
            slow += 1

# Floyd's cycle detection on linked list
def has_cycle(head) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,
      },
    ],
    resources: [
      {
        title: "LeetCode Two Pointers problem list",
        url: "https://leetcode.com/problem-list/two-pointers/",
        description: "253 curated problems tagged with the two-pointer technique.",
      },
      {
        title: "NeetCode Two Pointers practice",
        url: "https://neetcode.io/practice?tab=all&category=Two%20Pointers",
        description: "Video solutions and practice problems grouped by pattern.",
      },
      {
        title: "LeetCode Explore: Array and String",
        url: "https://leetcode.com/explore/learn/card/array-and-string/204/",
        description: "Guided card covering in-place array manipulation and two-pointer basics.",
      },
    ],
  },

  "sliding-window": {
    codeExamples: [
      {
        title: "Variable-size window template",
        language: "python",
        code: `# Longest Substring Without Repeating Characters
# Expand right; shrink left when duplicate appears in window.
def length_of_longest_substring(s: str) -> int:
    last_seen: dict[str, int] = {}
    left = best = 0
    for right, ch in enumerate(s):
        if ch in last_seen and last_seen[ch] >= left:
            left = last_seen[ch] + 1
        last_seen[ch] = right
        best = max(best, right - left + 1)
    return best

# Longest Repeating Character Replacement
# Window is valid when (window_size - max_freq) <= k
def character_replacement(s: str, k: int) -> int:
    freq: dict[str, int] = {}
    left = max_freq = best = 0
    for right, ch in enumerate(s):
        freq[ch] = freq.get(ch, 0) + 1
        max_freq = max(max_freq, freq[ch])
        while (right - left + 1) - max_freq > k:
            freq[s[left]] -= 1
            left += 1
        best = max(best, right - left + 1)
    return best`,
      },
      {
        title: "Minimum window substring template",
        language: "python",
        code: `# Minimum Window Substring — cover all chars of t in s
from collections import Counter

def min_window(s: str, t: str) -> str:
    need = Counter(t)
    missing = len(t)
    left = start = 0
    best_len = float("inf")

    for right, ch in enumerate(s):
        if need[ch] > 0:
            missing -= 1
        need[ch] -= 1

        while missing == 0:
            if right - left + 1 < best_len:
                start, best_len = left, right - left + 1
            need[s[left]] += 1
            if need[s[left]] > 0:
                missing += 1
            left += 1

    return s[start : start + best_len] if best_len != float("inf") else ""`,
      },
    ],
    resources: [
      {
        title: "LeetCode Sliding Window problem list",
        url: "https://leetcode.com/problem-list/sliding-window/",
        description: "Official curated list of sliding-window problems.",
      },
      {
        title: "NeetCode Sliding Window practice",
        url: "https://neetcode.io/practice?tab=all&category=Sliding%20Window",
        description: "Pattern-focused problems with video walkthroughs.",
      },
      {
        title: "LeetCode 75 Study Plan",
        url: "https://leetcode.com/studyplan/leetcode-75/",
        description: "Includes sliding-window classics like Max Consecutive Ones III.",
      },
    ],
  },

  "binary-search": {
    codeExamples: [
      {
        title: "Classic binary search template",
        language: "python",
        code: `# Search in sorted array — return index or -1
def binary_search(nums: list[int], target: int) -> int:
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

# Lower bound — first index where nums[i] >= target
def lower_bound(nums: list[int], target: int) -> int:
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo

# Search in rotated sorted array
def search_rotated(nums: list[int], target: int) -> int:
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] == target:
            return mid
        if nums[lo] <= nums[mid]:  # left half sorted
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:  # right half sorted
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1`,
      },
      {
        title: "Binary search on answer space",
        language: "python",
        code: `# Koko Eating Bananas — minimize speed k s.t. can finish in h hours
import math

def min_eating_speed(piles: list[int], h: int) -> int:
    def can_finish(speed: int) -> bool:
        hours = sum(math.ceil(p / speed) for p in piles)
        return hours <= h

    lo, hi = 1, max(piles)
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if can_finish(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo

# Split Array Largest Sum — minimize the largest subarray sum
def split_array(nums: list[int], k: int) -> int:
    def feasible(limit: int) -> bool:
        parts, current = 1, 0
        for n in nums:
            if current + n > limit:
                parts += 1
                current = 0
            current += n
        return parts <= k

    lo, hi = max(nums), sum(nums)
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if feasible(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo`,
      },
    ],
    resources: [
      {
        title: "LeetCode Binary Search problem list",
        url: "https://leetcode.com/problem-list/binary-search/",
        description: "Sorted-array search and search-on-answer problems.",
      },
      {
        title: "NeetCode Binary Search practice",
        url: "https://neetcode.io/practice?tab=all&category=Binary%20Search",
        description: "Includes classic and binary-search-on-answer variants.",
      },
      {
        title: "LeetCode Explore: Binary Search",
        url: "https://leetcode.com/explore/learn/card/binary-search/",
        description: "Interactive card covering templates and edge cases.",
      },
    ],
  },

  bfs: {
    codeExamples: [
      {
        title: "Grid BFS shortest path template",
        language: "python",
        code: `# Shortest path in binary matrix (8-directional or 4-directional)
from collections import deque

def shortest_path_binary_matrix(grid: list[list[int]]) -> int:
    n = len(grid)
    if grid[0][0] or grid[n - 1][n - 1]:
        return -1

    dirs = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]
    q = deque([(0, 0, 1)])  # row, col, distance
    grid[0][0] = 1  # mark visited

    while q:
        r, c, dist = q.popleft()
        if r == n - 1 and c == n - 1:
            return dist
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:
                grid[nr][nc] = 1
                q.append((nr, nc, dist + 1))
    return -1

# Word Ladder — BFS on implicit graph
def ladder_length(begin: str, end: str, word_list: list[str]) -> int:
    word_set = set(word_list)
    if end not in word_set:
        return 0
    q = deque([(begin, 1)])
    while q:
        word, steps = q.popleft()
        if word == end:
            return steps
        for i in range(len(word)):
            for ch in "abcdefghijklmnopqrstuvwxyz":
                nxt = word[:i] + ch + word[i + 1:]
                if nxt in word_set:
                    word_set.remove(nxt)
                    q.append((nxt, steps + 1))
    return 0`,
      },
      {
        title: "Multi-source BFS template",
        language: "python",
        code: `# Rotting Oranges — spread from all rotten cells simultaneously
from collections import deque

def oranges_rotting(grid: list[list[int]]) -> int:
    rows, cols = len(grid), len(grid[0])
    q = deque()
    fresh = 0

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                q.append((r, c))
            elif grid[r][c] == 1:
                fresh += 1

    minutes = 0
    while q and fresh:
        for _ in range(len(q)):
            r, c = q.popleft()
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    q.append((nr, nc))
        minutes += 1
    return minutes if fresh == 0 else -1`,
      },
    ],
    resources: [
      {
        title: "LeetCode BFS tag",
        url: "https://leetcode.com/tag/breadth-first-search/",
        description: "Problems solvable with level-order / shortest-path BFS.",
      },
      {
        title: "NeetCode BFS practice",
        url: "https://neetcode.io/practice?tab=all&category=Breadth-First%20Search",
        description: "Graph and grid BFS problems with solutions.",
      },
      {
        title: "LeetCode Explore: Graph",
        url: "https://leetcode.com/explore/learn/card/graph/620/",
        description: "Guided introduction to BFS and DFS on graphs.",
      },
    ],
  },

  dfs: {
    codeExamples: [
      {
        title: "Grid DFS connected components template",
        language: "python",
        code: `# Number of Islands — flood-fill each land cell
def num_islands(grid: list[list[str]]) -> int:
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r: int, c: int) -> None:
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != "1":
            return
        grid[r][c] = "0"
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                count += 1
                dfs(r, c)
    return count

# Max Area of Island
def max_area_of_island(grid: list[list[int]]) -> int:
    best = 0
    def dfs(r, c):
        if r < 0 or c < 0 or r >= len(grid) or c >= len(grid[0]) or grid[r][c] != 1:
            return 0
        grid[r][c] = 0
        return 1 + dfs(r+1,c) + dfs(r-1,c) + dfs(r,c+1) + dfs(r,c-1)
    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if grid[r][c] == 1:
                best = max(best, dfs(r, c))
    return best`,
      },
      {
        title: "Tree DFS with state template",
        language: "python",
        code: `# Binary Tree Maximum Path Sum — track global best through each node
def max_path_sum(root) -> int:
    best = float("-inf")

    def dfs(node):
        nonlocal best
        if not node:
            return 0
        left = max(dfs(node.left), 0)
        right = max(dfs(node.right), 0)
        best = max(best, node.val + left + right)
        return node.val + max(left, right)

    dfs(root)
    return best

# Path Sum II — collect root-to-leaf paths
def path_sum(root, target: int) -> list[list[int]]:
    result = []

    def dfs(node, remaining, path):
        if not node:
            return
        path.append(node.val)
        if not node.left and not node.right and remaining == node.val:
            result.append(path[:])
        else:
            dfs(node.left, remaining - node.val, path)
            dfs(node.right, remaining - node.val, path)
        path.pop()

    dfs(root, target, [])
    return result`,
      },
    ],
    resources: [
      {
        title: "LeetCode DFS tag",
        url: "https://leetcode.com/tag/depth-first-search/",
        description: "Tree, graph, and grid DFS problems.",
      },
      {
        title: "NeetCode DFS practice",
        url: "https://neetcode.io/practice?tab=all&category=Depth-First%20Search",
        description: "Depth-first traversal and backtracking-adjacent problems.",
      },
      {
        title: "LeetCode Explore: Tree",
        url: "https://leetcode.com/explore/learn/card/data-structure-tree/133/",
        description: "Recursive and iterative tree traversal fundamentals.",
      },
    ],
  },

  "dynamic-programming": {
    codeExamples: [
      {
        title: "1D DP template (Coin Change)",
        language: "python",
        code: `# Coin Change — min coins to make amount (unbounded knapsack)
def coin_change(coins: list[int], amount: int) -> int:
    dp = [float("inf")] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                dp[a] = min(dp[a], dp[a - c] + 1)
    return dp[amount] if dp[amount] != float("inf") else -1

# House Robber — cannot rob adjacent houses
def rob(nums: list[int]) -> int:
    prev2 = prev1 = 0
    for n in nums:
        prev2, prev1 = prev1, max(prev1, prev2 + n)
    return prev1

# Climbing Stairs — count ways (Fibonacci-style)
def climb_stairs(n: int) -> int:
    if n <= 2:
        return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b`,
      },
      {
        title: "2D DP template (LCS / grid paths)",
        language: "python",
        code: `# Longest Common Subsequence
def longest_common_subsequence(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]

# Unique Paths — robot in grid, only right/down
def unique_paths(m: int, n: int) -> int:
    row = [1] * n
    for _ in range(1, m):
        for j in range(1, n):
            row[j] += row[j - 1]
    return row[-1]`,
      },
    ],
    resources: [
      {
        title: "LeetCode Dynamic Programming problem list",
        url: "https://leetcode.com/problem-list/dynamic-programming/",
        description: "661 problems covering 1D, 2D, and advanced DP patterns.",
      },
      {
        title: "NeetCode Dynamic Programming practice",
        url: "https://neetcode.io/practice?tab=all&category=Dynamic%20Programming",
        description: "Structured DP problems from beginner to hard.",
      },
      {
        title: "NeetCode Roadmap",
        url: "https://neetcode.io/roadmap",
        description: "Full interview roadmap with DP section and prerequisites.",
      },
    ],
  },

  greedy: {
    codeExamples: [
      {
        title: "Interval scheduling template",
        language: "python",
        code: `# Non-overlapping Intervals — min removals to eliminate overlaps
def erase_overlap_intervals(intervals: list[list[int]]) -> int:
    intervals.sort(key=lambda x: x[1])  # sort by end time
    end = float("-inf")
    kept = 0
    for start, finish in intervals:
        if start >= end:
            kept += 1
            end = finish
    return len(intervals) - kept

# Merge Intervals
def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort()
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged

# Minimum Number of Arrows to Burst Balloons
def find_min_arrow_shots(points: list[list[int]]) -> int:
    points.sort(key=lambda x: x[1])
    arrows = 0
    end = float("-inf")
    for start, finish in points:
        if start > end:
            arrows += 1
            end = finish
    return arrows`,
      },
      {
        title: "Greedy reachability template (Jump Game)",
        language: "python",
        code: `# Jump Game — can you reach the last index?
def can_jump(nums: list[int]) -> bool:
    farthest = 0
    for i, jump in enumerate(nums):
        if i > farthest:
            return False
        farthest = max(farthest, i + jump)
    return True

# Jump Game II — minimum jumps
def jump(nums: list[int]) -> int:
    jumps = end = farthest = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == end:
            jumps += 1
            end = farthest
    return jumps

# Partition Labels — greedy segment boundaries
def partition_labels(s: str) -> list[int]:
    last = {ch: i for i, ch in enumerate(s)}
    start = end = 0
    sizes = []
    for i, ch in enumerate(s):
        end = max(end, last[ch])
        if i == end:
            sizes.append(end - start + 1)
            start = i + 1
    return sizes`,
      },
    ],
    resources: [
      {
        title: "LeetCode Greedy problem list",
        url: "https://leetcode.com/problem-list/greedy/",
        description: "468 problems involving locally optimal choices.",
      },
      {
        title: "NeetCode Greedy practice",
        url: "https://neetcode.io/practice?tab=all&category=Greedy",
        description: "Interval, scheduling, and reachability greedy problems.",
      },
      {
        title: "LeetCode 75 Study Plan",
        url: "https://leetcode.com/studyplan/leetcode-75/",
        description: "Includes greedy classics like Can Place Flowers and Merge Strings Alternately.",
      },
    ],
  },

  "hash-map": {
    codeExamples: [
      {
        title: "Complement lookup template (Two Sum)",
        language: "python",
        code: `# Two Sum — O(n) with hash map
def two_sum(nums: list[int], target: int) -> list[int]:
    seen: dict[int, int] = {}
    for i, num in enumerate(nums):
        need = target - num
        if need in seen:
            return [seen[need], i]
        seen[num] = i
    return []

# Subarray Sum Equals K — prefix sum + frequency map
def subarray_sum(nums: list[int], k: int) -> int:
    count = 0
    prefix = 0
    freq: dict[int, int] = {0: 1}
    for num in nums:
        prefix += num
        count += freq.get(prefix - k, 0)
        freq[prefix] = freq.get(prefix, 0) + 1
    return count

# Longest Consecutive Sequence — O(n) with set
def longest_consecutive(nums: list[int]) -> int:
    num_set = set(nums)
    best = 0
    for n in num_set:
        if n - 1 not in num_set:  # start of a streak
            length = 1
            while n + length in num_set:
                length += 1
            best = max(best, length)
    return best`,
      },
      {
        title: "Frequency counter template",
        language: "python",
        code: `# Valid Anagram
from collections import Counter

def is_anagram(s: str, t: str) -> bool:
    return Counter(s) == Counter(t)

# Group Anagrams — bucket by sorted tuple key
def group_anagrams(strs: list[str]) -> list[list[str]]:
    groups: dict[tuple, list[str]] = {}
    for word in strs:
        key = tuple(sorted(word))
        groups.setdefault(key, []).append(word)
    return list(groups.values())

# Top K Frequent Elements
import heapq

def top_k_frequent(nums: list[int], k: int) -> list[int]:
    freq = Counter(nums)
    return heapq.nlargest(k, freq.keys(), key=freq.get)`,
      },
    ],
    resources: [
      {
        title: "LeetCode Hash Table tag",
        url: "https://leetcode.com/tag/hash-table/",
        description: "Complement lookup, frequency counting, and grouping problems.",
      },
      {
        title: "NeetCode Arrays & Hashing practice",
        url: "https://neetcode.io/practice?tab=all&category=Arrays%20%26%20Hashing",
        description: "Foundational hash-map interview problems.",
      },
      {
        title: "LeetCode Explore: Hash Table",
        url: "https://leetcode.com/explore/learn/card/hash-table/",
        description: "Interactive card on hash table design and usage patterns.",
      },
    ],
  },

  stack: {
    codeExamples: [
      {
        title: "Valid parentheses / matching template",
        language: "python",
        code: `# Valid Parentheses — classic stack matching
def is_valid(s: str) -> bool:
    stack = []
    pairs = {")": "(", "]": "[", "}": "{"}
    for ch in s:
        if ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
        else:
            stack.append(ch)
    return not stack

# Evaluate Reverse Polish Notation
def eval_rpn(tokens: list[str]) -> int:
    stack = []
    ops = {"+": lambda a, b: a + b, "-": lambda a, b: a - b,
           "*": lambda a, b: a * b, "/": lambda a, b: int(a / b)}
    for tok in tokens:
        if tok in ops:
            b, a = stack.pop(), stack.pop()
            stack.append(ops[tok](a, b))
        else:
            stack.append(int(tok))
    return stack[0]

# Min Stack — auxiliary stack tracks minimum
class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self) -> None:
        if self.stack.pop() == self.min_stack[-1]:
            self.min_stack.pop()`,
      },
      {
        title: "Stack for expression parsing template",
        language: "python",
        code: `# Decode String — k[encoded_string] expansion
def decode_string(s: str) -> str:
    stack = []
    num = 0
    current = ""

    for ch in s:
        if ch.isdigit():
            num = num * 10 + int(ch)
        elif ch == "[":
            stack.append((current, num))
            current, num = "", 0
        elif ch == "]":
            prev, k = stack.pop()
            current = prev + current * k
        else:
            current += ch
    return current

# Basic Calculator II — +, -, *, / with precedence
def calculate(s: str) -> int:
    stack, num, op = [], 0, "+"
    for i, ch in enumerate(s + "+"):
        if ch.isdigit():
            num = num * 10 + int(ch)
        if ch in "+-*/" or i == len(s):
            if op == "+":
                stack.append(num)
            elif op == "-":
                stack.append(-num)
            elif op == "*":
                stack.append(stack.pop() * num)
            elif op == "/":
                stack.append(int(stack.pop() / num))
            num, op = 0, ch
    return sum(stack)`,
      },
    ],
    resources: [
      {
        title: "LeetCode Stack tag",
        url: "https://leetcode.com/tag/stack/",
        description: "Parentheses, expression evaluation, and monotonic-adjacent problems.",
      },
      {
        title: "LeetCode Explore: Queue & Stack",
        url: "https://leetcode.com/explore/learn/card/queue-stack/630/",
        description: "Guided card on stack operations and applications.",
      },
      {
        title: "NeetCode Stack practice",
        url: "https://neetcode.io/practice?tab=all&category=Stack",
        description: "Stack-based problems with video solutions.",
      },
    ],
  },

  heap: {
    codeExamples: [
      {
        title: "Top K elements template",
        language: "python",
        code: `# Top K Frequent Elements — min-heap of size k
import heapq
from collections import Counter

def top_k_frequent(nums: list[int], k: int) -> list[int]:
    freq = Counter(nums)
    return heapq.nlargest(k, freq.keys(), key=freq.get)

# Kth Largest Element in an Array — quickselect alternative with heap
def find_kth_largest(nums: list[int], k: int) -> int:
    return heapq.nlargest(k, nums)[-1]

# K Closest Points to Origin
def k_closest(points: list[list[int]], k: int) -> list[list[int]]:
    return heapq.nsmallest(k, points, key=lambda p: p[0]**2 + p[1]**2)

# Last Stone Weight — max-heap via negation
def last_stone_weight(stones: list[int]) -> int:
    heap = [-s for s in stones]
    heapq.heapify(heap)
    while len(heap) > 1:
        a, b = -heapq.heappop(heap), -heapq.heappop(heap)
        if a != b:
            heapq.heappush(heap, -(a - b))
    return -heap[0] if heap else 0`,
      },
      {
        title: "Merge K sorted lists template",
        language: "python",
        code: `# Merge k Sorted Lists — min-heap of (value, list_index, node)
import heapq

def merge_k_lists(lists) -> Optional:
    heap = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))

    dummy = tail = ListNode(0)
    while heap:
        val, i, node = heapq.heappop(heap)
        tail.next = node
        tail = tail.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next

# Find Median from Data Stream — two heaps
class MedianFinder:
    def __init__(self):
        self.small = []  # max-heap (negated)
        self.large = []  # min-heap

    def add_num(self, num: int) -> None:
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def find_median(self) -> float:
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2`,
      },
    ],
    resources: [
      {
        title: "LeetCode Heap tag",
        url: "https://leetcode.com/tag/heap-priority-queue/",
        description: "Top-K, merge-k, and running-median problems.",
      },
      {
        title: "NeetCode Heap practice",
        url: "https://neetcode.io/practice?tab=all&category=Heap%20%2F%20Priority%20Queue",
        description: "Priority queue patterns with video explanations.",
      },
      {
        title: "LeetCode Explore: Heap",
        url: "https://leetcode.com/explore/learn/card/heap/643/",
        description: "Interactive card on heap operations and use cases.",
      },
    ],
  },

  "union-find": {
    codeExamples: [
      {
        title: "Union-Find with path compression template",
        language: "python",
        code: `# Union-Find (Disjoint Set Union) — near O(1) amortized
class UnionFind:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.components = n

    def find(self, x: int) -> int:
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]

    def union(self, a: int, b: int) -> bool:
        ra, rb = self.find(a), self.find(b)
        if ra == rb:
            return False
        if self.rank[ra] < self.rank[rb]:
            ra, rb = rb, ra
        self.parent[rb] = ra
        if self.rank[ra] == self.rank[rb]:
            self.rank[ra] += 1
        self.components -= 1
        return True

# Number of Connected Components
def count_components(n: int, edges: list[list[int]]) -> int:
    uf = UnionFind(n)
    for a, b in edges:
        uf.union(a, b)
    return uf.components`,
      },
      {
        title: "Detect cycle / redundant connection template",
        language: "python",
        code: `# Redundant Connection — first edge that creates a cycle
def find_redundant_connection(edges: list[list[int]]) -> list[int]:
    uf = UnionFind(len(edges) + 1)
    for a, b in edges:
        if not uf.union(a, b):
            return [a, b]
    return []

# Accounts Merge — union emails belonging to same person
from collections import defaultdict

def accounts_merge(accounts: list[list[str]]) -> list[list[str]]:
    uf = UnionFind(len(accounts))
    email_to_id: dict[str, int] = {}

    for i, account in enumerate(accounts):
        for email in account[1:]:
            if email in email_to_id:
                uf.union(i, email_to_id[email])
            else:
                email_to_id[email] = i

    groups: dict[int, set[str]] = defaultdict(set)
    for email, owner in email_to_id.items():
        groups[uf.find(owner)].add(email)

    return [[accounts[root][0]] + sorted(emails)
            for root, emails in groups.items()]`,
      },
    ],
    resources: [
      {
        title: "LeetCode Union Find tag",
        url: "https://leetcode.com/tag/union-find/",
        description: "Connected components, cycle detection, and dynamic connectivity.",
      },
      {
        title: "NeetCode Advanced Graphs practice",
        url: "https://neetcode.io/practice?tab=all&category=Advanced%20Graphs",
        description: "Union-Find and graph problems including redundant connection.",
      },
      {
        title: "LeetCode Explore: Graph",
        url: "https://leetcode.com/explore/learn/card/graph/618/",
        description: "Graph fundamentals including connectivity concepts.",
      },
    ],
  },

  "topological-sort": {
    codeExamples: [
      {
        title: "Kahn's algorithm (BFS) template",
        language: "python",
        code: `# Course Schedule — detect if all courses can be finished
from collections import deque, defaultdict

def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:
    graph = defaultdict(list)
    indegree = [0] * num_courses

    for course, prereq in prerequisites:
        graph[prereq].append(course)
        indegree[course] += 1

    q = deque(i for i in range(num_courses) if indegree[i] == 0)
    taken = 0

    while q:
        node = q.popleft()
        taken += 1
        for nxt in graph[node]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                q.append(nxt)

    return taken == num_courses

# Course Schedule II — return topological order
def find_order(num_courses: int, prerequisites: list[list[int]]) -> list[int]:
    graph = defaultdict(list)
    indegree = [0] * num_courses
    for c, p in prerequisites:
        graph[p].append(c)
        indegree[c] += 1

    q = deque(i for i in range(num_courses) if indegree[i] == 0)
    order = []
    while q:
        node = q.popleft()
        order.append(node)
        for nxt in graph[node]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                q.append(nxt)
    return order if len(order) == num_courses else []`,
      },
      {
        title: "DFS postorder topological sort template",
        language: "python",
        code: `# Alien Dictionary — build order from sorted words
from collections import defaultdict

def alien_order(words: list[str]) -> str:
    graph = defaultdict(set)
    indegree = {c: 0 for word in words for c in word}

    for w1, w2 in zip(words, words[1:]):
        if len(w1) > len(w2) and w1.startswith(w2):
            return ""
        for c1, c2 in zip(w1, w2):
            if c1 != c2:
                if c2 not in graph[c1]:
                    graph[c1].add(c2)
                    indegree[c2] += 1
                break

    q = [c for c in indegree if indegree[c] == 0]
    order = []
    while q:
        c = q.pop()
        order.append(c)
        for nxt in graph[c]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                q.append(nxt)

    return "".join(order) if len(order) == len(indegree) else ""`,
      },
    ],
    resources: [
      {
        title: "LeetCode Topological Sort tag",
        url: "https://leetcode.com/tag/topological-sort/",
        description: "DAG ordering, prerequisites, and dependency problems.",
      },
      {
        title: "NeetCode Advanced Graphs practice",
        url: "https://neetcode.io/practice?tab=all&category=Advanced%20Graphs",
        description: "Course Schedule and related topological sort problems.",
      },
      {
        title: "LeetCode Explore: Graph",
        url: "https://leetcode.com/explore/learn/card/graph/623/",
        description: "Directed graphs and topological ordering concepts.",
      },
    ],
  },

  trie: {
    codeExamples: [
      {
        title: "Basic Trie insert/search template",
        language: "python",
        code: `# Implement Trie (Prefix Tree)
class TrieNode:
    def __init__(self):
        self.children: dict[str, TrieNode] = {}
        self.is_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_word = True

    def search(self, word: str) -> bool:
        node = self.root
        for ch in word:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return node.is_word

    def starts_with(self, prefix: str) -> bool:
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return True`,
      },
      {
        title: "Word search with Trie template",
        language: "python",
        code: `# Word Search II — find all board words from dictionary
class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None

class Solution:
    def find_words(self, board: list[list[str]], words: list[str]) -> list[str]:
        root = TrieNode()
        for w in words:
            node = root
            for ch in w:
                node = node.children.setdefault(ch, TrieNode())
            node.word = w

        rows, cols = len(board), len(board[0])
        result = set()

        def dfs(r, c, node):
            ch = board[r][c]
            if ch not in node.children:
                return
            node = node.children[ch]
            if node.word:
                result.add(node.word)
                node.word = None  # avoid duplicates
            board[r][c] = "#"
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != "#":
                    dfs(nr, nc, node)
            board[r][c] = ch

        for r in range(rows):
            for c in range(cols):
                dfs(r, c, root)
        return list(result)`,
      },
    ],
    resources: [
      {
        title: "LeetCode Trie tag",
        url: "https://leetcode.com/tag/trie/",
        description: "Prefix tree, autocomplete, and word-dictionary problems.",
      },
      {
        title: "NeetCode Tries practice",
        url: "https://neetcode.io/practice?tab=all&category=Tries",
        description: "Trie construction and word-search problems.",
      },
      {
        title: "LeetCode Explore: Trie",
        url: "https://leetcode.com/explore/learn/card/trie/",
        description: "Interactive introduction to prefix trees.",
      },
    ],
  },

  backtracking: {
    codeExamples: [
      {
        title: "Subsets / combinations template",
        language: "python",
        code: `# Subsets — include/exclude each element
def subsets(nums: list[int]) -> list[list[int]]:
    result = []

    def backtrack(start: int, path: list[int]) -> None:
        result.append(path[:])
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()

    backtrack(0, [])
    return result

# Combination Sum — reuse allowed, prune when sum exceeds target
def combination_sum(candidates: list[int], target: int) -> list[list[int]]:
    result = []
    candidates.sort()

    def backtrack(start: int, remaining: int, path: list[int]) -> None:
        if remaining == 0:
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            if candidates[i] > remaining:
                break
            path.append(candidates[i])
            backtrack(i, remaining - candidates[i], path)
            path.pop()

    backtrack(0, target, [])
    return result`,
      },
      {
        title: "Permutations with pruning template",
        language: "python",
        code: `# Permutations — swap or used-set approach
def permute(nums: list[int]) -> list[list[int]]:
    result = []

    def backtrack(path: list[int], remaining: set[int]) -> None:
        if not remaining:
            result.append(path[:])
            return
        for num in remaining:
            path.append(num)
            nxt = remaining - {num}
            backtrack(path, nxt)
            path.pop()

    backtrack([], set(nums))
    return result

# N-Queens — place row by row, prune invalid columns/diagonals
def solve_n_queens(n: int) -> list[list[str]]:
    result = []
    cols, diag1, diag2 = set(), set(), set()

    def backtrack(row: int, board: list[int]) -> None:
        if row == n:
            result.append(["." * c + "Q" + "." * (n - c - 1) for c in board])
            return
        for col in range(n):
            if col in cols or (row - col) in diag1 or (row + col) in diag2:
                continue
            cols.add(col); diag1.add(row - col); diag2.add(row + col)
            board.append(col)
            backtrack(row + 1, board)
            board.pop()
            cols.remove(col); diag1.remove(row - col); diag2.remove(row + col)

    backtrack(0, [])
    return result`,
      },
    ],
    resources: [
      {
        title: "LeetCode Backtracking problem list",
        url: "https://leetcode.com/problem-list/backtracking/",
        description: "114 problems for subsets, permutations, and constraint search.",
      },
      {
        title: "NeetCode Backtracking practice",
        url: "https://neetcode.io/practice?tab=all&category=Backtracking",
        description: "Choose-explore-unchoose problems with video solutions.",
      },
      {
        title: "LeetCode Explore: Recursion II",
        url: "https://leetcode.com/explore/learn/card/recursion-ii/",
        description: "Recursion card covering backtracking fundamentals.",
      },
    ],
  },

  "monotonic-stack": {
    codeExamples: [
      {
        title: "Next greater element template",
        language: "python",
        code: `# Next Greater Element I — map each element to next greater on the right
def next_greater_element(nums1: list[int], nums2: list[int]) -> list[int]:
    nge: dict[int, int] = {}
    stack = []
    for num in nums2:
        while stack and stack[-1] < num:
            nge[stack.pop()] = num
        stack.append(num)
    return [nge.get(n, -1) for n in nums1]

# Daily Temperatures — days until warmer
def daily_temperatures(temperatures: list[int]) -> list[int]:
    n = len(temperatures)
    answer = [0] * n
    stack = []  # indices with decreasing temps
    for i, temp in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < temp:
            j = stack.pop()
            answer[j] = i - j
        stack.append(i)
    return answer`,
      },
      {
        title: "Largest rectangle / histogram template",
        language: "python",
        code: `# Largest Rectangle in Histogram — increasing monotonic stack
def largest_rectangle_area(heights: list[int]) -> int:
    stack = []  # index stack, heights increasing
    best = 0
    heights.append(0)  # sentinel to flush stack

    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            best = max(best, height * width)
        stack.append(i)
    heights.pop()
    return best

# Sum of Subarray Minimums — each element's contribution
def sum_subarray_mins(arr: list[int]) -> int:
    MOD = 10**9 + 7
    n = len(arr)
    left = [-1] * n
    right = [n] * n
    stack = []

    for i in range(n):
        while stack and arr[stack[-1]] >= arr[i]:
            stack.pop()
        left[i] = stack[-1] if stack else -1
        stack.append(i)

    stack = []
    for i in range(n - 1, -1, -1):
        while stack and arr[stack[-1]] > arr[i]:
            stack.pop()
        right[i] = stack[-1] if stack else n
        stack.append(i)

    return sum(arr[i] * (i - left[i]) * (right[i] - i) for i in range(n)) % MOD`,
      },
    ],
    resources: [
      {
        title: "LeetCode Monotonic Stack problem list",
        url: "https://leetcode.com/problem-list/monotonic-stack/",
        description: "73 problems for next-greater and histogram-style queries.",
      },
      {
        title: "LeetCode Stack tag",
        url: "https://leetcode.com/tag/stack/",
        description: "Related stack problems including daily temperatures.",
      },
      {
        title: "NeetCode Stack practice",
        url: "https://neetcode.io/practice?tab=all&category=Stack",
        description: "Monotonic stack classics with video explanations.",
      },
    ],
  },

  "prefix-sum": {
    codeExamples: [
      {
        title: "Prefix sum + hash map template",
        language: "python",
        code: `# Subarray Sum Equals K — count subarrays with sum k
def subarray_sum(nums: list[int], k: int) -> int:
    prefix = 0
    freq: dict[int, int] = {0: 1}
    count = 0
    for num in nums:
        prefix += num
        count += freq.get(prefix - k, 0)
        freq[prefix] = freq.get(prefix, 0) + 1
    return count

# Continuous Subarray Sum — prefix mod check (len >= 2)
def check_subarray_sum(nums: list[int], k: int) -> bool:
    remainder_map: dict[int, int] = {0: -1}
    prefix = 0
    for i, num in enumerate(nums):
        prefix += num
        mod = prefix % k if k else prefix
        if mod in remainder_map:
            if i - remainder_map[mod] >= 2:
                return True
        else:
            remainder_map[mod] = i
    return False

# Range Sum Query — Immutable
class NumArray:
    def __init__(self, nums: list[int]):
        self.prefix = [0]
        for n in nums:
            self.prefix.append(self.prefix[-1] + n)

    def sum_range(self, left: int, right: int) -> int:
        return self.prefix[right + 1] - self.prefix[left]`,
      },
      {
        title: "2D prefix sum template",
        language: "python",
        code: `# Range Sum Query 2D — Immutable
class NumMatrix:
    def __init__(self, matrix: list[list[int]]):
        if not matrix:
            self.prefix = [[0]]
            return
        rows, cols = len(matrix), len(matrix[0])
        self.prefix = [[0] * (cols + 1) for _ in range(rows + 1)]
        for r in range(rows):
            for c in range(cols):
                self.prefix[r + 1][c + 1] = (
                    matrix[r][c]
                    + self.prefix[r][c + 1]
                    + self.prefix[r + 1][c]
                    - self.prefix[r][c]
                )

    def sum_region(self, row1: int, col1: int, row2: int, col2: int) -> int:
        p = self.prefix
        return p[row2 + 1][col2 + 1] - p[row1][col2 + 1] - p[row2 + 1][col1] + p[row1][col1]

# Subarray Sums Divisible by K
def subarrays_div_by_k(nums: list[int], k: int) -> int:
    freq: dict[int, int] = {0: 1}
    prefix = count = 0
    for num in nums:
        prefix = (prefix + num) % k
        count += freq.get(prefix, 0)
        freq[prefix] = freq.get(prefix, 0) + 1
    return count`,
      },
    ],
    resources: [
      {
        title: "LeetCode Prefix Sum problem list",
        url: "https://leetcode.com/problem-list/prefix-sum/",
        description: "258 problems for range queries and subarray-sum patterns.",
      },
      {
        title: "NeetCode Arrays & Hashing practice",
        url: "https://neetcode.io/practice?tab=all&category=Arrays%20%26%20Hashing",
        description: "Includes prefix-sum classics like Product of Array Except Self.",
      },
      {
        title: "LeetCode Explore: Array and String",
        url: "https://leetcode.com/explore/learn/card/array-and-string/201/",
        description: "Prefix techniques within the array fundamentals card.",
      },
    ],
  },
};
