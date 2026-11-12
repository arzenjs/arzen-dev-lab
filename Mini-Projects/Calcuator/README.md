# Calculator

A soft neumorphic calculator built with **Next.js (App Router)**,
**Tailwind CSS** and **next-themes**. It keeps the original light design and
adds a matching dark theme that follows your operating system's color scheme
automatically — there is no manual theme toggle by design.

## Tech stack

- Next.js 15 — App Router (`.jsx`, no TypeScript)
- Tailwind CSS v4 — neumorphic design tokens live in `app/globals.css`
- next-themes — automatic system theme detection
- ESLint 9+ (flat config)

## Features

- Addition, subtraction, multiplication, division
- Correct operator precedence (`2 + 3 × 4 = 14`)
- Decimals, percentages, positive/negative conversion (±)
- Clear all (C), delete last character (⌫), chained calculations
- Floating-point precision handling (e.g. `0.1 + 0.2 = 0.3`)
- Division-by-zero and invalid-expression handling (`Error`)
- Full keyboard support

## Keyboard shortcuts

| Key             | Action                 |
| --------------- | ---------------------- |
| `0–9`           | Enter digits           |
| `+` `-` `*` `/` | Operators              |
| `.`             | Decimal point          |
| `%`             | Percent                |
| `Enter` / `=`   | Calculate              |
| `Backspace`     | Delete last character  |
| `Escape`        | Clear all              |

## Scripts

```bash
npm run dev      # start the Next.js dev server
npm run build    # production build — statically exports the site to dist/
npm run lint     # run ESLint
```

`next build` is configured with `output: "export"` in `next.config.mjs`;
`scripts/move-export.mjs` moves the exported static site from `out/` to
`dist/`. Serve `dist/` with any static file server.

## Project structure

```
├── app/
│   ├── layout.jsx          # Root layout, metadata, theme <html> wiring
│   ├── page.jsx            # Home route (renders the calculator)
│   ├── providers.jsx       # next-themes ThemeProvider (client)
│   ├── globals.css         # Tailwind + neumorphic design tokens
│   └── icon.svg            # App icon (file convention)
├── components/
│   └── Calculator.jsx      # Display + keypad presentation (client)
├── hooks/
│   └── useCalculator.js    # State machine + keyboard support
├── lib/
│   └── calculator-engine.js # Pure calculation/input logic
├── scripts/
│   └── move-export.mjs     # Moves the static export to dist/
├── next.config.mjs
├── postcss.config.mjs
└── eslint.config.js
```
