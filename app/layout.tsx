// app/layout.tsx
import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import Nav from '@/components/Nav'
import './globals.css'

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Claude Certified Architect Prep',
    template: '%s | Claude Architect Prep',
  },
  description:
    'Free exam prep for the Claude Certified Architect – Foundations certification. All 5 domains, 33+ practice questions, 12-week study plan.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={ibmPlexMono.variable}>
      <body className="font-mono bg-[var(--bg)] text-[var(--text)] min-h-screen">
        <Nav />
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}
