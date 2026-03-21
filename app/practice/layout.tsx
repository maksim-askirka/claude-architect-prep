// app/practice/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Practice Quiz',
  description:
    '35 practice questions across all 5 Claude Certified Architect exam domains. Filter by domain. Immediate answer reveal.',
}

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
