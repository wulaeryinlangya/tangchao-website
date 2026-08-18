/** Resolve an asset path relative to Vite's base (works under any deploy path). */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  const clean = path.replace(/^\//, '')
  return `${base}${clean}`
}
