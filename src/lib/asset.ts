/** Resolve a public asset path against Vite's base URL (for GitHub Pages subpaths). */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
