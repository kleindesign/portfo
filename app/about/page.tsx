"use client"

import type React from "react"
import AnimatedBoxes from "@/components/AnimatedBoxes" // Import AnimatedBoxes component

import { useState, useEffect, useRef, useCallback } from "react"
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
  const leftScrollRef = useRef<HTMLDivElement>(null)
  const boxesRef = useRef<HTMLDivElement>(null)
  const hasSpilledRef = useRef(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  const [areBoxesVisible, setAreBoxesVisible] = useState(true)
  const [shouldResetSpill, setShouldResetSpill] = useState(false)

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

  useEffect(() => {
    const handleScroll = () => {
      if (!leftScrollRef.current) return
      const rect = leftScrollRef.current.getBoundingClientRect()
      const containerHeight = leftScrollRef.current.offsetHeight
      const viewportHeight = window.innerHeight
      // progress 0 = top of container at top of viewport
      // progress 1 = bottom of container at bottom of viewport
      const scrolled = -rect.top
      const maxScroll = containerHeight - viewportHeight
      const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1)
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll() // run once on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!footerTriggerRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasSpilledRef.current) {
          setIsFooterVisible(true)
          hasSpilledRef.current = true
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(footerTriggerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!boxesRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting
        setAreBoxesVisible(visible)

        // If boxes become visible AND spill has happened, trigger reset
        if (visible && hasSpilledRef.current) {
          setShouldResetSpill(true)
          hasSpilledRef.current = false  // Allow spill to happen again next time
          setIsFooterVisible(false)  // Reset footer visibility
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(boxesRef.current)
    return () => observer.disconnect()
  }, [])

  const handleResetComplete = useCallback(() => {
    setShouldResetSpill(false)
  }, [])

  return (
    <div className="about-page-container">
      <div className="py-16 px-6 max-w-[1400px] mx-auto">
        <section className="page standard-modules">
          <div className="page-content">
            <div className="project-modules">
              {/* Main content row */}
              <div className="flex flex-col lg:flex-row gap-20">

                {/* LEFT column */}
                <div className="flex-1 pr-6">
                  <div ref={leftScrollRef} style={{ height: "300vh" }}>
                    <div className="sticky top-24 flex flex-col" style={{ height: 'calc(100vh - 96px)' }}>
                      {/* Intro text stays at top */}
                      <div>
                        <div className="about-header-text mb-8">hey it's me, dani</div>
                        <div className="max-w-4xl">
                          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-black">
                            Don't put me<br/> in a box.
                          </h1>
                          <div className="text-lg text-gray-800 space-y-4">
                            <p>
                              I'm a creative who connects disciplines, a designer who thinks in systems,
                              someone who's spent decades learning how cities work across three countries
                              and countless contexts.
                            </p>
                            <p className="font-medium">But if we need labels? Here's what I bring:</p>
                          </div>
                        </div>
                      </div>

                      {/* Flexible spacer — shrinks when viewport shrinks, grows when tall */}
                      <div className="flex-1" style={{ minHeight: '40px' }} />

                      {/* Boxes always sit at bottom of the sticky area */}
                      <div ref={boxesRef}>
                        <AnimatedBoxes
                          scrollProgress={scrollProgress}
                          isFooterVisible={isFooterVisible}
                          areBoxesVisible={areBoxesVisible}
                          shouldResetSpill={shouldResetSpill}
                          onResetComplete={handleResetComplete}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Outro — lives in normal flow AFTER the sticky phase ends */}
                  <div className="max-w-2xl space-y-6 text-lg text-gray-800 mt-12">
                    {[
                      "So yes, I work across boxes. But here's what connects it all:",
                      "I start by listening—to people, context, what's actually needed. I design with communities and ecosystems, not just for them. I bring rigor and care to making ideas real.",
                      "From printshops to planning studios, cultural institutions to climate dashboards—each project taught me something about craft, collaboration, or how living systems thrive.",
                      "Outside the box? That's where the impact happens.",
                    ].map((paragraph, index) => {
                      const threshold = 0.85 + (index * 0.05)
                      const isVisible = scrollProgress >= threshold
                      return (
                        <motion.p
                          key={index}
                          animate={{
                            opacity: isVisible ? 1 : 0,
                            y: isVisible ? 0 : 20,
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          {paragraph}
                        </motion.p>
                      )
                    })}
                  </div>

                  {/* LinkedIn icon */}
                  <div className="content-block social-cv-sticky mt-12">
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

                {/* RIGHT column: independent sticky, persists the whole page */}
                <div className="flex-1 max-w-md lg:sticky lg:top-24 lg:self-start">
                    <div className="about-header-text mb-8">let's talk</div>
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

      {/* Footer trigger */}
      <div ref={footerTriggerRef} className="h-1" />

      {/* Spill target — LAST element, overflow visible so items extend page downward */}
      <div id="spill-target" style={{ position: 'relative', width: '100%', height: '0px', overflow: 'visible' }} />
    </div>
  )
}
