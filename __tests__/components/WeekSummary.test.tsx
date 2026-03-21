// __tests__/components/WeekSummary.test.tsx
import { render, screen } from '@testing-library/react'
import { WeekSummary } from '@/components/WeekSummary'

const allFalse = Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`week${i + 1}`, false]))
const week1Done = { ...allFalse, week1: true }
const allDone = Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`week${i + 1}`, true]))

describe('WeekSummary', () => {
  it('shows week_01 as current when nothing complete', () => {
    render(<WeekSummary studyPlan={allFalse} />)
    expect(screen.getByText(/week_01/)).toBeInTheDocument()
  })

  it('shows 0/12 complete when all false', () => {
    render(<WeekSummary studyPlan={allFalse} />)
    expect(screen.getByText(/0\/12/)).toBeInTheDocument()
  })

  it('advances current week when week 1 complete', () => {
    render(<WeekSummary studyPlan={week1Done} />)
    expect(screen.getByText(/week_02/)).toBeInTheDocument()
    expect(screen.getByText(/1\/12/)).toBeInTheDocument()
  })

  it('shows week_12 when all complete', () => {
    render(<WeekSummary studyPlan={allDone} />)
    expect(screen.getByText(/week_12/)).toBeInTheDocument()
    expect(screen.getByText(/12\/12/)).toBeInTheDocument()
  })
})
