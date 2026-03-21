# Claude Certified Architect Prep Hub

Free, open-access exam prep for the [Claude Certified Architect – Foundations](https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request) certification (Anthropic's official credential).

## What's inside

- **5 domain deep-dives** — Agentic Architecture, Tool Design & MCP, Claude Code Config, Prompt Engineering, Context Management
- **35 practice questions** — filterable by domain, immediate answer reveal
- **12-week study plan** — ~84 hours, with per-week tasks and resources
- **6 exam scenario walkthroughs** — step-by-step analysis
- **4 build exercises** — hands-on practice
- **Cheatsheet** — printable quick reference
- **Progress tracking** — localStorage (no login required)

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS |
| Font | IBM Plex Mono |
| Content | MDX (per domain) |
| Progress | localStorage |
| Hosting | Vercel |

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Running tests

```bash
npm test
```

## Deploy

This project deploys to Vercel automatically on push to `main`. To deploy manually:

```bash
npx vercel --prod
```

Set `SITE_URL` environment variable in Vercel dashboard to your production URL for correct sitemap generation.

## Exam facts

| Field | Value |
| ----- | ----- |
| Format | Multiple choice + scenario-based |
| Scenarios | 4 of 6 randomly selected |
| Passing score | 720 / 1000 |
| Duration | ~15 minutes |
| Cost | Free for first 5,000 partner employees |

## License

MIT
