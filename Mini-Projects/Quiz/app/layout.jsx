import './globals.css'
export const metadata = { title: 'Quiz', description: 'Test your general knowledge.' }
export default function RootLayout({ children }) {
  return (<html lang="en"><body className="min-h-screen flex flex-col items-center justify-center">{children}</body></html>)
}