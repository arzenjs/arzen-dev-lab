import './globals.css'
export const metadata = { title: 'SkyPulse', description: 'Real-time weather data for any city.' }
export default function RootLayout({ children }) {
  return (<html lang="en"><body>{children}</body></html>)
}