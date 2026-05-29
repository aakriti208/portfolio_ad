# Portfolio — Claude Code Context

## Stack
Astro + SolidJS + Tailwind CSS + TypeScript. Deployed to Vercel.

## Design System (always follow this)
- Background: `#0a0a0a` | Accent: `#00f5ff` (neon cyan) | Font: JetBrains Mono
- Always dark — `theme.js` forces `.dark` class, no theme toggle
- No gradients, no glassmorphism, no purple
- All CSS custom properties defined in `src/styles/global.css` (`:root` block)

## Navigation
`Work | Projects | Systems | Playground | Writing | Resume`
Defined in `src/consts.ts` → `LINKS` array.

## Pages
- `/` — terminal hero with typewriter + cycling role (AI Engineer / ML Researcher / UI Designer)
- `/work` — accordion timeline, each role expands to a case study
- `/projects` — `<details>` expandable case study cards (problem / architecture / challenges / metrics)
- `/systems` — animated pipeline diagrams (RAG, ML Training, Inference API) + philosophy section
- `/playground` — terminal chat UI → POSTs to `/api/chat` (Claude-powered)
- `/api/chat` — Claude API endpoint; needs `ANTHROPIC_API_KEY` in `.env`
- `/experiments` — lab notebook grid with `[ONGOING]` / `[COMPLETE]` / `[ABANDONED]` badges
- `/writing` — blog feed with tag filtering (reads from `src/content/blog/`)
- `/resume` — clean single-column resume with sticky PDF button and `@media print` styles

## Content
- Projects: `src/content/projects/project-*/index.md` — frontmatter includes `problem`, `architecture` (ASCII), `challenges[]`, `metrics[]`
- Work: `src/content/work/*.md`
- Blog: `src/content/blog/*/index.md`
- Schema: `src/content/config.ts`

## Claude API (Playground)
1. `npm install @anthropic-ai/sdk`
2. Add `ANTHROPIC_API_KEY=sk-ant-...` to `.env`
3. Fill in `KNOWLEDGE_BASE` in `src/pages/api/chat.ts`
4. Add `@astrojs/vercel` adapter for production
