"use client"
import React from 'react'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import WebDevImage from "@root/public/images/web_dev_service.jpeg"

const page = () => {
  const sectionRef = useRef(null);
  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: "center" });
  }, []);
  return (
    <main className="page-container">
      <div className="page-wrapper">


        <section className="section" ref={sectionRef}>
          <header>
            <h1 className="page-title">Web Development Services</h1>
          </header>
          <div className="image-wrapper h-80 relative mb-6">
            <Image
              src={WebDevImage}
              alt="Web Development Services"
              className="object-cover"
              fill
              placeholder="blur"
            />
          </div>

          <h2 className="section-title">About Our Web Development Services</h2>
          <p className="section-text">
            We provide comprehensive web development solutions tailored to meet your business needs. Our expert team specializes in creating modern, responsive, and high-performance websites that drive results.
          </p>
        </section>

        <section className="section">
          <h3 className="subsection-title">What We Offer</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span aria-hidden="true" className='checkmark'>✓</span>
              <span className="list-text">Custom Website Development</span>
            </li>
            <li className="flex items-start">
              <span aria-hidden="true" className='checkmark'>✓</span>
              <span className="list-text">Responsive Design & Mobile Optimization</span>
            </li>
            <li className="flex items-start">
              <span aria-hidden="true" className='checkmark'>✓</span>
              <span className="list-text">E-Commerce Solutions</span>
            </li>
            <li className="flex items-start">
              <span aria-hidden="true" className='checkmark'>✓</span>
              <span className="list-text">Web Application Development</span>
            </li>
            <li className="flex items-start">
              <span aria-hidden="true" className='checkmark'>✓</span>
              <span className="list-text">SEO Optimization</span>
            </li>
          </ul>
        </section>

        <section className="section">
          <h3 className="subsection-title">Why Choose Us</h3>
          <div className="card">
            <p className="section-text">
              We combine cutting-edge technology with proven development practices to deliver websites that are not only beautiful but also functional and scalable. Our team is committed to your success.
            </p>
          </div>
        </section>

      </div>
    </main>
  )
}

export default page