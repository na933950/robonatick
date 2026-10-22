import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('RoboNatick site', () => {
  it('introduces all three teams, links the newsletter signup, and offers mobile navigation', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Build what moves you.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'RedHawks' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Cyber Hawks' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Lightning Hawks' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign up for the newsletter/i })).toHaveAttribute(
      'href',
      'https://forms.gle/cRVqiHK3hPo1Tb1LA',
    )

    const toggle = screen.getByRole('button', { name: 'Open navigation menu' })
    fireEvent.click(toggle)
    const primaryNavigation = screen.getByRole('navigation', { name: 'Primary navigation' })
    expect(within(primaryNavigation).getByRole('link', { name: 'Teams' })).toHaveAttribute(
      'href',
      '#teams',
    )
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
  })
})
