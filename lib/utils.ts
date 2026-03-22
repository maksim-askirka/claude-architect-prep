// lib/utils.ts

export const pad2 = (n: number) => String(n).padStart(2, '0')

export const isExternal = (href: string) =>
  href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')
