// With `output: "export"`, `next build` writes the static site to `out/`.
// Move it to `dist/` so the project produces its build artifact in dist/.
import { existsSync, renameSync, rmSync } from 'node:fs'

if (!existsSync('out/index.html')) {
  console.error('Expected "out/index.html" from `next build` — nothing to move.')
  process.exit(1)
}

rmSync('dist', { recursive: true, force: true })
renameSync('out', 'dist')
console.log('Static export moved to dist/')
