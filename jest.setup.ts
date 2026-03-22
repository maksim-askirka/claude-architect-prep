import '@testing-library/jest-dom'

// structuredClone polyfill for jsdom environments that lack it
if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj))
}
