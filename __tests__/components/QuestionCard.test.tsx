// __tests__/components/QuestionCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { QuestionCard } from '@/components/QuestionCard'
import { QUESTIONS } from '@/lib/questions'

const q = QUESTIONS[0] // d1-1

describe('QuestionCard', () => {
  it('renders question text', () => {
    render(<QuestionCard question={q} onAnswer={() => {}} />)
    expect(screen.getByText(q.question)).toBeInTheDocument()
  })

  it('renders domain tag', () => {
    render(<QuestionCard question={q} onAnswer={() => {}} />)
    expect(screen.getByText('D1')).toBeInTheDocument()
  })

  it('renders all 4 options', () => {
    render(<QuestionCard question={q} onAnswer={() => {}} />)
    q.options.forEach((opt) => expect(screen.getByText(opt)).toBeInTheDocument())
  })

  it('does not show explanation before answering', () => {
    render(<QuestionCard question={q} onAnswer={() => {}} />)
    expect(screen.queryByText(q.explanation)).not.toBeInTheDocument()
  })

  it('reveals explanation after clicking an option', () => {
    render(<QuestionCard question={q} onAnswer={() => {}} />)
    fireEvent.click(screen.getByText(q.options[0]))
    expect(screen.getByText(q.explanation)).toBeInTheDocument()
  })

  it('calls onAnswer with correct=true when correct option clicked', () => {
    const onAnswer = jest.fn()
    render(<QuestionCard question={q} onAnswer={onAnswer} />)
    fireEvent.click(screen.getByText(q.options[q.correct]))
    expect(onAnswer).toHaveBeenCalledWith(true)
  })

  it('calls onAnswer with correct=false when wrong option clicked', () => {
    const onAnswer = jest.fn()
    render(<QuestionCard question={q} onAnswer={onAnswer} />)
    const wrongOption = q.options.find((_, i) => i !== q.correct)!
    fireEvent.click(screen.getByText(wrongOption))
    expect(onAnswer).toHaveBeenCalledWith(false)
  })

  it('disables all options after answering', () => {
    render(<QuestionCard question={q} onAnswer={() => {}} />)
    fireEvent.click(screen.getByText(q.options[0]))
    screen.getAllByRole('button').forEach((btn) => expect(btn).toBeDisabled())
  })
})
