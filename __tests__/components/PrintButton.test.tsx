import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PrintButton } from '@/components/PrintButton'

describe('PrintButton', () => {
  beforeEach(() => {
    window.print = jest.fn()
  })

  it('renders a button', () => {
    render(<PrintButton />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders the print/ label', () => {
    render(<PrintButton />)
    expect(screen.getByRole('button')).toHaveTextContent('print/')
  })

  it('calls window.print() when clicked', async () => {
    const user = userEvent.setup()
    render(<PrintButton />)
    await user.click(screen.getByRole('button'))
    expect(window.print).toHaveBeenCalledTimes(1)
  })
})
