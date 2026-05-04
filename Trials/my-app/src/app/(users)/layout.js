import Navbar from "./Navbar";
import "../globals.css";


export const metadata = {
  title: "My-App"
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="min-h-full flex flex-col">
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
