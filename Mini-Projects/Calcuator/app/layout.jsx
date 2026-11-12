import Providers from "./providers.jsx";
import "./globals.css";

export const metadata = {
  title: "Calculator",
  description:
    "A soft neumorphic calculator built with Next.js, Tailwind CSS and next-themes. Follows your system light or dark theme automatically.",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e0e0e0" },
    { media: "(prefers-color-scheme: dark)", color: "#24272c" },
  ],
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: next-themes applies the resolved theme class
    // to <html> before hydration.
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
