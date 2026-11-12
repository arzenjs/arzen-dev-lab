'use client'

import { ThemeProvider } from 'next-themes'

/*
 * Automatic system theme detection:
 * - defaultTheme="system" + enableSystem follow the OS color scheme and
 *   update live when the OS preference changes.
 * - attribute="class" applies the resolved theme as a class on <html>;
 *   `.dark` activates the dark sky gradients in globals.css.
 * - next-themes injects a pre-hydration script, so the correct theme is
 *   applied before first paint — no flash and no hydration mismatch.
 * - Nothing ever calls setTheme, so no manually persisted preference can
 *   override the system theme. There is no toggle anywhere in the UI.
 */
export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem enableColorScheme>
      {children}
    </ThemeProvider>
  )
}
