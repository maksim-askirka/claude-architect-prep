// app/study-plan/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '12-Week Study Plan',
  description:
    'A 12-week study plan for the Claude Certified Architect – Foundations exam. ~84 hours total. Track your weekly progress.',
}

export default function StudyPlanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
