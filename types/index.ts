// types/index.ts

export type DomainKey = 'd1' | 'd2' | 'd3' | 'd4' | 'd5'

export interface Domain {
  key: DomainKey
  slug: string
  number: string
  title: string
  weight: number
  subtopics: string[]
  scenario: string
  questionCount: number
}

export interface DomainProgress {
  subtopics: boolean[]
  quiz: { correct: number; total: number } | null
}

export interface ProgressData {
  progress: Record<DomainKey, DomainProgress>
  studyPlan: Record<string, boolean>
  lastVisited: string | null
}
