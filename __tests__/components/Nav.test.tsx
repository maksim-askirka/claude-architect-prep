import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Nav from '@/components/Nav'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

import { usePathname } from 'next/navigation'
const mockUsePathname = usePathname as jest.Mock

describe('Nav', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
  })

  it('renders the logo', () => {
    render(<Nav />)
    expect(screen.getByText('claude_architect/')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Nav />)
    expect(screen.getAllByRole('link', { name: 'dashboard/' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'practice/' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'cheatsheet/' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'study_plan/' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'scenarios/' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'exercises/' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'exam_guide/' }).length).toBeGreaterThan(0)
  })

  it('applies teal color class to the active link', () => {
    mockUsePathname.mockReturnValue('/practice')
    render(<Nav />)
    const practiceLinks = screen.getAllByRole('link', { name: 'practice/' })
    expect(practiceLinks.some(l => l.className.includes('text-[var(--teal)]'))).toBe(true)
  })

  it('applies muted color class to inactive links', () => {
    mockUsePathname.mockReturnValue('/practice')
    render(<Nav />)
    const dashboardLinks = screen.getAllByRole('link', { name: 'dashboard/' })
    expect(dashboardLinks.some(l => l.className.includes('text-[var(--muted)]'))).toBe(true)
  })

  it('mobile menu is hidden by default', () => {
    render(<Nav />)
    // The hamburger button should be present
    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument()
    // aria-expanded should be false
    expect(screen.getByRole('button', { name: /toggle menu/i })).toHaveAttribute('aria-expanded', 'false')
  })

  it('mobile menu opens when hamburger is clicked', async () => {
    const user = userEvent.setup()
    render(<Nav />)
    const hamburger = screen.getByRole('button', { name: /toggle menu/i })

    await user.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')
  })

  it('mobile menu closes when hamburger is clicked again', async () => {
    const user = userEvent.setup()
    render(<Nav />)
    const hamburger = screen.getByRole('button', { name: /toggle menu/i })

    await user.click(hamburger)
    await user.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
  })
})
