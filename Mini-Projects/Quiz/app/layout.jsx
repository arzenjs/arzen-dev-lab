import './globals.css'
import Providers from './providers'

export const metadata = { title: 'Quiz', description: 'Test your general knowledge.' }

export default function RootLayout({ children }) {
  // suppressHydrationWarning: next-themes sets the theme class on <html>
  // before hydration, so the server and client markup intentionally differ.
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col items-center justify-center">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
