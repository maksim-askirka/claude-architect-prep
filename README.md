# Claude Certified Architect Prep Hub

Free, open-access study tool for the [Claude Certified Architect – Foundations](https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request) certification by Anthropic.

## Features

- **5 domain deep-dives** — Agentic Architecture, Tool Design & MCP, Claude Code Config, Prompt Engineering, Context Management
- **35 practice questions** — filterable by domain with immediate answer feedback
- **12-week study plan** — ~84 hours total, with per-week tasks and resource links
- **6 exam scenario walkthroughs** — step-by-step analysis of real exam patterns
- **4 build exercises** — hands-on practice prompts
- **Cheatsheet** — printable quick reference covering all five domains
- **Progress tracking** — persisted in localStorage, no account required

## Exam at a glance

| Field | Value |
| ----- | ----- |
| Format | Multiple choice + scenario-based |
| Scenarios | 4 of 6 randomly selected |
| Passing score | 720 / 1000 |
| Duration | ~15 minutes |
| Cost | Free for first 5,000 partner employees |

## Stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS v4 |
| Font | IBM Plex Mono |
| Content | MDX |
| State | localStorage |
| CI/CD | GitHub Actions → Vercel |

## Development

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start development server |
| `npm run build` | Production build + sitemap |
| `npm run lint` | ESLint |
| `npm test` | Jest (jsdom) |
| `npm test -- --watch` | Jest in watch mode |
| `npx tsc --noEmit` | Type-check without emitting |

## Deployment

Deploys automatically to Vercel on push to `main`.

Set the `SITE_URL` environment variable in Vercel to your production URL for correct sitemap generation (see `.env.example`).

## License

MIT
