// __tests__/components/InlinePracticeQ.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { InlinePracticeQ } from '@/components/InlinePracticeQ'

const props = {
  question: 'What stop_reason indicates Claude wants to use a tool?',
  options: ['end_turn', 'tool_use', 'max_tokens', 'stop_sequence'],
  correct: 1,
  explanation: 'stop_reason="tool_use" means Claude wants to invoke a tool before continuing.',
}

describe('InlinePracticeQ', () => {
  it('renders the question text', () => {
    render(<InlinePracticeQ {...props} />)
    expect(screen.getByText(props.question)).toBeInTheDocument()
  })

  it('renders all 4 options', () => {
    render(<InlinePracticeQ {...props} />)
    props.options.forEach((opt) => {
      expect(screen.getByText(opt)).toBeInTheDocument()
    })
  })

  it('does not show explanation before answering', () => {
    render(<InlinePracticeQ {...props} />)
    expect(screen.queryByText(props.explanation)).not.toBeInTheDocument()
  })

  it('reveals explanation after selecting correct answer', () => {
    render(<InlinePracticeQ {...props} />)
    fireEvent.click(screen.getByText('tool_use'))
    expect(screen.getByText(props.explanation)).toBeInTheDocument()
  })

  it('reveals explanation after selecting wrong answer', () => {
    render(<InlinePracticeQ {...props} />)
    fireEvent.click(screen.getByText('end_turn'))
    expect(screen.getByText(props.explanation)).toBeInTheDocument()
  })

  it('disables options after answering', () => {
    render(<InlinePracticeQ {...props} />)
    fireEvent.click(screen.getByText('end_turn'))
    const buttons = screen.getAllByRole('button')
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled()
    })
  })
})
