import './globals.css'
import Providers from './providers'

export const metadata = { title: 'SkyPulse', description: 'Real-time weather data for any city.' }

export default function RootLayout({ children }) {
  // suppressHydrationWarning: next-themes sets the theme class on <html>
  // before hydration, so the server and client markup intentionally differ.
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
