import './globals.css'

export const metadata = {
  title: 'Tic Tac Toe',
  description: 'A modern, minimal two-player Tic Tac Toe game.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-dvh overflow-hidden flex flex-col items-center justify-center relative">
        {children}
      </body>
    </html>
  )
}