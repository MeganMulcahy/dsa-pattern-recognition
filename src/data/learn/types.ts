import type { PatternId } from "@/types";

export interface LearnSubsection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LearnSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: LearnSubsection[];
  table?: { headers: string[]; rows: string[][] };
}

export interface CodeExample {
  title: string;
  language: string;
  code: string;
}

export interface SupplementaryResource {
  title: string;
  url: string;
  description?: string;
}

export interface LearnPage {
  slug: string;
  title: string;
  subtitle: string;
  category: "basics" | "pattern";
  patternId?: PatternId;
  sections: LearnSection[];
  practiceHref?: string;
  codeExamples?: CodeExample[];
  resources?: SupplementaryResource[];
}
