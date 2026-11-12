import './globals.css'
import Providers from './providers'

export const metadata = { title: 'iTask', description: 'A modern task manager.' }

export default function RootLayout({ children }) {
  // suppressHydrationWarning: next-themes sets the theme class on <html>
  // before hydration, so the server and client markup intentionally differ.
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
