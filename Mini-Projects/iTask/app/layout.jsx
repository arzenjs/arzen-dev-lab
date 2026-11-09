import './globals.css'
export const metadata = { title: 'iTask', description: 'A modern task manager.' }
export default function RootLayout({ children }) {
  return (<html lang="en"><body className="min-h-screen flex flex-col">{children}</body></html>)
}