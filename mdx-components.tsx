// mdx-components.tsx
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="text-base font-semibold uppercase tracking-wide mt-10 mb-3 text-[var(--text)]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-sm font-semibold mt-6 mb-2 text-[var(--text)]">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-sm leading-7 text-[var(--text)] mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="text-sm leading-7 list-disc list-inside mb-4 space-y-1">{children}</ul>
    ),
    li: ({ children }) => <li className="text-[var(--text)]">{children}</li>,
    code: ({ children }) => (
      <code className="text-xs bg-[var(--bg2)] px-1.5 py-0.5 font-mono text-[var(--teal)]">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="text-xs bg-[var(--bg2)] border border-[var(--border)] p-4 overflow-x-auto mb-4 leading-6">
        {children}
      </pre>
    ),
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    hr: () => <hr className="border-[var(--border)] my-8" />,
    ...components,
  }
}
