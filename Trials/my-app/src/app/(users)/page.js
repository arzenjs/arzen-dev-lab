import Link from 'next/link'

const page = () => {
  return (
    <main className="page-container">
      <h1 className="heading-xl">
        Welcome to MyApp
      </h1>
      <p className="text-muted max-w-md mb-8">
        Build something amazing with Next.js
      </p>
      <div className="flex gap-4">
        <Link href="/about" className="btn-primary">
          Learn More
        </Link>
        <Link href="/services" className="btn-secondary" >
          Our Services
        </Link>
      </div>
    </main>
  )
}

export default page
