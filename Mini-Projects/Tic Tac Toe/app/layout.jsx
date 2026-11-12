import './globals.css'
import Providers from './providers'

export const metadata = {
  title: 'Tic Tac Toe',
  description: 'A modern, minimal two-player Tic Tac Toe game.',
}

export default function RootLayout({ children }) {
  // suppressHydrationWarning: next-themes sets the theme class on <html>
  // before hydration, so the server and client markup intentionally differ.
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-dvh overflow-hidden flex flex-col items-center justify-center relative">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
