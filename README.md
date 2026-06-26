# Pattern Drill

A DSA pattern recognition trainer. Study the guides, then practice on real LeetCode problems by guessing which algorithmic pattern applies — without the topic tags giving it away.

## What it does

**Learn** — Reference cheat sheets (runtime, keywords, basics) plus 16 pattern guides with signals, walkthroughs, code examples, and links.

**Practice** — Loads a random free LeetCode problem. Read the description, pick the pattern you think fits, and get instant feedback. Reveal hints and a solution outline when you're stuck. Optionally filter practice to a single pattern.

**Stats** — Tracks attempts, accuracy, and per-pattern breakdown in `localStorage` (browser-only, no account).

The app does not use AI at runtime. Practice problems are fetched live from LeetCode's public endpoints, not from a static question bank.

## Stack

| Layer | Tech |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev), [Tailwind CSS 4](https://tailwindcss.com) |
| Language | TypeScript |
| Data | LeetCode public APIs (see below) |
| Progress | Browser `localStorage` |

Deploys cleanly to [Vercel](https://vercel.com) with no environment variables.

## LeetCode API

Practice problems are pulled server-side through `/api/questions/random`. That route calls two public LeetCode endpoints:

### 1. Problem list — REST

```
GET https://leetcode.com/api/problems/all/
```

Returns metadata for every problem (slug, title, difficulty, paid-only flag). The app filters out paid and hidden problems, caches the list for one hour, and picks a random candidate from the free pool.

### 2. Problem details — GraphQL

```
POST https://leetcode.com/graphql
```

Fetches full details for a slug: description HTML, difficulty, topic tags, and hints. HTML is stripped to plain text for display.

Pattern assignment uses LeetCode topic tags plus a curated slug→pattern map (`src/data/slug-patterns.json`). Tags that would reveal the answer (e.g. "Dynamic Programming", "Binary Search") are hidden in the UI but still used internally for inference.

### Our API route

```
GET /api/questions/random?exclude=slug1,slug2&pattern=two-pointers
```

| Param | Description |
| --- | --- |
| `exclude` | Comma-separated slugs to skip (already seen this session) |
| `pattern` | Optional pattern ID to filter problems (falls back to any pattern if none match) |

Returns a normalized `Question` object: title, description, difficulty, hints, solution outline, and a link to the problem on LeetCode.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional dev script for generating static question JSON via local Ollama (not used by the app at runtime):

```bash
npm run generate-questions
```

## Deploy

Push to GitHub, then import the repo on [Vercel](https://vercel.com/new). No secrets or env vars required.
