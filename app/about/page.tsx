"use client"

import type React from "react"
import AnimatedBoxes from "@/components/AnimatedBoxes" // Import AnimatedBoxes component

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function AboutPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const observerRef = useRef<IntersectionObserver | null>(null)
  const footerTriggerRef = useRef<HTMLDivElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormSubmitted(true)
  }

  useEffect(() => {
    // Intersection Observer for sticky scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-sticky-reveal")
            entry.target.classList.remove("opacity-0", "translate-y-12")
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -100px 0px" },
    )

    // Observe content blocks
    const contentBlocks = document.querySelectorAll(".content-block")
    contentBlocks.forEach((block, index) => {
      block.classList.add("opacity-0", "translate-y-12", "transition-all", "duration-1000", "ease-out")
      setTimeout(() => {
        observerRef.current?.observe(block)
      }, index * 200)
    })

    // Animate form fields with staggered timing
    const formFields = document.querySelectorAll(".form-field")
    formFields.forEach((field, index) => {
      field.classList.add("form-field-hidden")
      setTimeout(
        () => {
          field.classList.remove("form-field-hidden")
          field.classList.add("form-field-animate")
        },
        800 + index * 200,
      ) // Start after 800ms, then 200ms between each field
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  return (
    <div className="about-page-container">
      <div className="py-16 px-6 max-w-[1400px] mx-auto">
        <section className="page standard-modules">
          <div className="page-content">
            <div className="project-modules">
              {/* Header row */}
              <div className="flex flex-col md:flex-row mb-12 content-block">
                <div className="flex-1">
                  <div className="about-header-text">hey it’s me, dani </div>
                </div>
                <div className="flex-1">
                  <div className="about-header-text md:text-right">let’s talk</div>
                </div>
              </div>

              {/* Main content row */}
              <div className="flex flex-col lg:flex-row gap-20">
                {/* Left column - About content */}
                <div className="flex-1 space-x-0 pr-6">
                  <AnimatedBoxes footerRef={footerTriggerRef} /> {/* AnimatedBoxes component used here */}

                  {/* Social and CV */}
                  <div className="content-block social-cv-sticky">
                    <div className="flex items-center gap-6 mt-0">
                      <a
                        href="https://www.linkedin.com/in/danielkleindesign/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linkedin-icon"
                      >
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 30 24"
                          className="w-8 h-8 fill-current"
                        >
                          <path d="M19.6,19v-5.8c0-1.4-0.5-2.4-1.7-2.4c-1,0-1.5,0.7-1.8,1.3C16,12.3,16,12.6,16,13v6h-3.4c0,0,0.1-9.8,0-10.8H16v1.5c0,0,0,0,0,0h0v0C16.4,9,17.2,7.9,19,7.9c2.3,0,4,1.5,4,4.9V19H19.6z M8.9,6.7L8.9,6.7C7.7,6.7,7,5.9,7,4.9C7,3.8,7.8,3,8.9,3s1.9,0.8,1.9,1.9C10.9,5.9,10.1,6.7,8.9,6.7z M10.6,19H7.2V8.2h3.4V19z" />
                        </svg>
                      </a>
                      
                    </div>
                  </div>
                </div>

                {/* Right column - Contact form */}
                <div className="flex-1 max-w-md lg:sticky lg:top-24 lg:self-start">
                  {!formSubmitted ? (
                    <form className="contact-form-modern" onSubmit={handleSubmit}>
                      <div className="form-field">
                        <label htmlFor="name" className="form-label">
                          name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Your Name..."
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="form-input-modern"
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="email" className="form-label">
                          email address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Your Email Address..."
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="form-input-modern"
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="message" className="form-label">
                          message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          placeholder="Your Message..."
                          required
                          value={formData.message}
                          onChange={handleChange}
                          className="form-input-modern form-textarea-modern"
                        />
                      </div>
                      <div className="form-field">
                        <button type="submit" className="submit-button-modern">
                          submit
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="contact-form-sent-modern">
                      {/* Yarnball GIF */}
                      <div className="yarnball-container">
                        <img src="/images/yarnball_dkd.gif" alt="Yarnball" className="yarnball-gif" />
                      </div>

                      {/* Animated confirmation messages */}
                      <div className="confirmation-messages">
                        <p className="confirmation-line line-1">thanks for reaching out</p>
                        <p className="confirmation-line line-2">i will be in touch with you soon</p>
                        <a
                          href="https://www.youtube.com/watch?v=l4BwSRuzdgU&t=1399s"
                          target="_blank"
                          rel="noreferrer"
                          className="dance-link confirmation-line line-3"
                        >
                          ~ now dance ~
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Cat Footer */}
      <div className="cat-footer-section">
        <img src="/images/catfooter5.gif" alt="Cats playing with yarn" className="cat-footer-image" />
      </div>
      {/* FOOTER TRIGGER - Place this where you want the fall to start */}
      <div ref={footerTriggerRef} className="h-20" />
    </div>
  )
}
