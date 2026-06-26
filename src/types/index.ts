export type Difficulty = "easy" | "medium" | "hard";

export type PatternId =
  | "two-pointers"
  | "sliding-window"
  | "binary-search"
  | "bfs"
  | "dfs"
  | "dynamic-programming"
  | "greedy"
  | "hash-map"
  | "stack"
  | "heap"
  | "union-find"
  | "topological-sort"
  | "trie"
  | "backtracking"
  | "monotonic-stack"
  | "prefix-sum";

export interface Pattern {
  id: PatternId;
  name: string;
  description: string;
  signals: string[];
}

export interface Solution {
  approach: string[];
  timeComplexity: string;
  spaceComplexity: string;
  keyInsight: string;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  correctPattern: PatternId;
  acceptedPatterns?: PatternId[];
  hints: string[];
  solution: Solution;
  tags: string[];
  leetcodeUrl?: string;
}

export interface PatternStats {
  attempted: number;
  correct: number;
}

export interface Progress {
  totalAttempted: number;
  totalCorrect: number;
  seenQuestionIds: string[];
  patternStats: Record<PatternId, PatternStats>;
  history: AttemptRecord[];
}

export interface AttemptRecord {
  questionId: string;
  selectedPattern: PatternId;
  correctPattern: PatternId;
  isCorrect: boolean;
  timestamp: string;
}

export type QuizPhase = "question" | "revealed";
