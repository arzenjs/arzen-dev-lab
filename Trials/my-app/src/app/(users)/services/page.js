import Link from 'next/link'

const services = [
  { title: 'Web Development', desc: 'Modern, responsive websites built with cutting-edge technologies.' },
  { title: 'UI/UX Design', desc: 'Intuitive and visually appealing interfaces for the best user experience.' },
  { title: 'Consulting', desc: 'Expert advice to help your business grow and succeed in the digital space.' },
]

const ServicesPage = () => {
  return (
    <div className="flex-1 px-6 max-w-4xl mx-auto">
      <p className="text-muted text-center mb-12 max-w-lg mx-auto">
        We offer a range of professional services tailored to your needs.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div key={index} className="card hover:scale-105 transition-all duration-3000 ease-in-out">
            <h2 className="text-xl font-semibold text-white mb-2"><a href={`/services/${service.title.toLowerCase().replaceAll(' ', '_')}`} className='no-underline hover:underline'>{service.title}</a></h2>
            <p className="text-zinc-400 text-sm">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServicesPage