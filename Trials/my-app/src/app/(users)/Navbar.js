import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-zinc-900 text-zinc-100 px-6 py-4 border-b border-zinc-800 shadow-md">
      
      {/* Logo */}
      <div className="text-xl font-bold tracking-wide text-white">
        MyApp
      </div>

      {/* Links */}
      <div className="flex items-center space-x-6">
        <Link href="/" className="link-hover">
          Home
        </Link>
        <Link href="/about" className="link-hover">
          About
        </Link>
        <Link href="/services" className="link-hover">
          Services
        </Link>
        <Link href="/contact" className="link-hover">
          Contact
        </Link>
        <Link href="/login" className="link-hover">
          Log In
        </Link>
      </div>

    </nav>
  )
}

export default Navbar