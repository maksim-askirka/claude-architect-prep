// __tests__/components/ResetButton.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { ResetButton } from '@/components/ResetButton'

describe('ResetButton', () => {
  it('renders reset label', () => {
    render(<ResetButton onReset={() => {}} />)
    expect(screen.getByRole('button')).toHaveTextContent(/reset_all_progress/i)
  })

  it('calls onReset when confirmed', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true)
    const onReset = jest.fn()
    render(<ResetButton onReset={onReset} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it('does NOT call onReset when cancelled', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(false)
    const onReset = jest.fn()
    render(<ResetButton onReset={onReset} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onReset).not.toHaveBeenCalled()
  })
})
