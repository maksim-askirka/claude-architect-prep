// app/exam-guide/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { DOMAINS } from '@/lib/domains'

export const metadata: Metadata = {
  title: 'Exam Guide',
  description: 'Claude Certified Architect – Foundations exam format, scoring, registration, and FAQ.',
}

const EXAM_FACTS = [
  { label: 'Format', value: 'Multiple choice + scenario-based questions' },
  { label: 'Scenarios', value: '4 of 6 randomly selected' },
  { label: 'Passing score', value: '720 / 1000' },
  { label: 'Duration', value: '~15 minutes' },
  { label: 'Cost', value: 'Free for the first 5,000 partner company employees' },
  { label: 'Registration', value: 'anthropic.skilljar.com' },
]

const DOMAIN_WEIGHTS = DOMAINS.map((d) => ({ name: `${d.number} — ${d.title}`, weight: d.weight }))
const MAX_DOMAIN_WEIGHT = Math.max(...DOMAIN_WEIGHTS.map((d) => d.weight))

const FAQ = [
  {
    q: 'How long does it take to prepare?',
    a: 'The 12-week study plan on this site is structured for ~7 hours/week (~84 hours total). If you already use Claude Code daily, you may need only 3–4 weeks.',
  },
  {
    q: 'What resources does Anthropic provide?',
    a: "The official exam guide PDF (available at anthropic.skilljar.com) covers the exam format, domain breakdown, and 4 capstone exercises. All exercises on this site's /exercises page are sourced from that PDF.",
  },
  {
    q: 'Are the 6 scenarios all tested?',
    a: 'No — 4 of the 6 scenarios are randomly selected on exam day. You cannot predict which 4 will appear, so prepare all 6.',
  },
  {
    q: 'Is the exam timed strictly?',
    a: 'The exam takes approximately 15 minutes. There is no per-question timer — the 15-minute limit applies to the entire exam.',
  },
  {
    q: 'Can I retake the exam if I fail?',
    a: 'Check anthropic.skilljar.com for the current retake policy. As of the exam launch, retakes were permitted after a waiting period.',
  },
  {
    q: 'What does the credential prove?',
    a: 'The Claude Certified Architect – Foundations credential validates understanding of agentic systems, MCP, Claude Code configuration, prompt engineering, and context management at a practitioner level.',
  },
]

const OFFICIAL_COURSES = [
  { name: 'Claude Code in Action', domain: 'D3', url: 'https://anthropic.skilljar.com' },
  { name: 'Introduction to agent skills', domain: 'D1', url: 'https://anthropic.skilljar.com' },
  { name: 'Introduction to subagents', domain: 'D1', url: 'https://anthropic.skilljar.com' },
  { name: 'Introduction to Model Context Protocol', domain: 'D2', url: 'https://anthropic.skilljar.com' },
  { name: 'Model Context Protocol: Advanced Topics', domain: 'D2', url: 'https://anthropic.skilljar.com' },
  { name: 'Building with the Claude API', domain: 'D1 / D4', url: 'https://anthropic.skilljar.com' },
  { name: 'AI Fluency: Framework & Foundations', domain: 'D4 / D5', url: 'https://anthropic.skilljar.com' },
]

export default function ExamGuidePage() {
  return (
    <div>
      <h1 className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em] mb-2">exam_guide/</h1>
      <p className="text-sm text-[var(--muted)] mb-8">
        format · scoring · registration · faq
      </p>

      {/* Exam facts */}
      <div className="border border-[var(--border)] p-5 mb-8">
        <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-4">exam_facts/</div>
        <div className="grid sm:grid-cols-2 gap-3">
          {EXAM_FACTS.map((f) => (
            <div key={f.label} className="flex gap-3">
              <span className="text-[11px] uppercase tracking-widest text-[var(--muted)] w-28 flex-shrink-0">{f.label}</span>
              <span className="text-xs text-[var(--text)]">{f.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Domain weights */}
      <div className="border border-[var(--border)] p-5 mb-8">
        <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-4">domain_weights/</div>
        <div className="space-y-3">
          {DOMAIN_WEIGHTS.map((d) => (
            <div key={d.name} className="flex items-center gap-4">
              <span className="text-xs text-[var(--text)] w-64 flex-shrink-0">{d.name}</span>
              <div className="flex-1 h-[2px] bg-[var(--border)]">
                <div className="h-full bg-[var(--teal)]" style={{ width: `${d.weight * (100 / MAX_DOMAIN_WEIGHT)}%` }} />
              </div>
              <span className="text-[11px] text-[var(--teal)] w-8 text-right">{d.weight}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Registration CTA */}
      <div className="border border-[var(--teal)] bg-[var(--teal-bg)] p-5 mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-sm font-semibold mb-1">Ready to register?</div>
          <div className="text-xs text-[var(--muted)]">Free for the first 5,000 partner employees</div>
        </div>
        <a
          href="https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs border border-[var(--teal)] text-[var(--teal)] px-4 py-2 hover:bg-[var(--bg)] transition-colors"
        >
          register_for_exam →
        </a>
      </div>

      {/* FAQ */}
      <div>
        <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-4">faq/</div>
        <div className="space-y-4">
          {FAQ.map((item, i) => (
            <div key={i} className="border border-[var(--border)] p-4">
              <div className="text-sm font-semibold mb-2">{item.q}</div>
              <p className="text-xs text-[var(--text)] leading-6">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Official Courses */}
      <div className="mt-8">
        <div className="text-[11px] uppercase tracking-widest text-[var(--muted)] mb-1">official_courses/</div>
        <p className="text-xs text-[var(--muted)] mb-4">Free courses from Anthropic Academy that directly cover exam domains.</p>
        <div className="border border-[var(--border)]">
          {OFFICIAL_COURSES.map((course) => (
            <div
              key={course.name}
              className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-[var(--text)]">{course.name}</span>
                <span className="text-[10px] uppercase tracking-widest text-[var(--teal)] bg-[var(--teal-bg)] px-2 py-0.5">
                  {course.domain}
                </span>
              </div>
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[var(--teal)] hover:underline"
              >
                open →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
