const Contact = () => {
  return (
    <main className="page-container">
      <h1 className="heading-lg">
        Contact Us
      </h1>
      <p className="text-muted max-w-lg mb-8">
        Have questions? We'd love to hear from you.
      </p>
      <a 
        href="mailto:hello@myapp.com" 
        className="btn-primary"
      >
        Get in Touch
      </a>
    </main>
  )
}

export default Contact