"use client"

import { useEffect, useRef } from "react"
import ProjectNavigation from "@/components/project-navigation"

export default function EvolveEAPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            entry.target.classList.remove("opacity-0", "translate-y-12")
          } else {
            entry.target.classList.remove("animate-fade-in-up")
            entry.target.classList.add("opacity-0", "translate-y-12")
          }
        })
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" },
    )

    // Observe all scroll-animated elements
    const elements = document.querySelectorAll(".scroll-animate")
    elements.forEach((el) => {
      el.classList.add("opacity-0", "translate-y-12", "transition-all", "duration-1000", "ease-out")
      observerRef.current?.observe(el)
    })

    // Hero animations
    setTimeout(() => {
      const heroTitle = document.querySelector(".hero-title")
      heroTitle?.classList.add("animate-slide-up")
    }, 300)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  return (
    <div className="project-case-study">
      {/* Project Navigation */}
      <ProjectNavigation currentSlug="evolveea" />

      {/* Title and Tagline Above Hero */}
      <div className="project-header max-w-[1200px] mx-auto px-6 mb-4 text-center">
        <h1 className="project-main-title hero-title opacity-0 font-bold">
          Building Performance Dashboard
        </h1>
        <div className="project-tagline scroll-animate">
          visualizing climate impact, building by building
        </div>
      </div>

      {/* Hero Section - Banner Video */}
      <section style={{ 
        width: "103vw", 
        marginLeft: "calc(-50vw + 50%)", 
        marginBottom: "2rem", 
        overflow: "hidden",
      }}>
        <video
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          preload="auto"
          style={{ 
            
            height: "auto", 
            display: "block",
            marginLeft: "-1.1%",
            marginRight: "-.1%",
            marginTop: "-8%",
            marginBottom: "-6.2%",
          }}
        >
          <source src="/videos/Untitled.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* Content Sections */}
      <div className="project-content max-w-[1200px] mx-auto px-6">
        <section className="content-section scroll-animate mt-0 py-0 -mt-8">
          <div className="flex items-center justify-center">
            <a
              href="https://e-ea.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="project-website-link text-center py-2"
            >
              open
              <br />
              <strong>evolveEA Dashboard</strong>
            </a>
          </div>
        </section>
      </div>

      {/* Content Sections */}
      <div className="project-content max-w-[1200px] mx-auto px-6">
        {/* Section 1: The Challenge */}
        <section className="content-section scroll-animate py-4">
          <div className="section-layout" style={{ gap: "1.5rem" }}>
            <div className="section-text">
              <div className="section-header">
                <h2 className="section-title">The Challenge</h2>
              </div>
              <div className="section-body mt-3">
                <p>
                  evolveEA needed a way to visualize and communicate building performance data across their portfolio of sustainable architecture projects.
                </p>
                <ul className="mt-4 space-y-1">
                  <li>Data was scattered across spreadsheets and reports</li>
                  <li>Preparing performance summaries for clients was time-intensive</li>
                  <li>The firm's climate track record wasn't easily demonstrable in proposals</li>
                </ul>
                <p className="mt-4">
                  Existing tools were either too complex or didn't provide the right visualizations for client communication.
                </p>
              </div>
            </div>
            <div className="section-visual" style={{ marginRight: "2rem" }}>
              <img 
                src="/images/Cost_over_time.jpg" 
                alt="Cost over time chart visualization" 
                className="w-full h-auto max-w-xl opacity-0 transition-all duration-700 ease-out"
                loading="lazy"
                onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
              />
            </div>
          </div>
        </section>

        {/* Section 2: My Role */}
        <section className="content-section scroll-animate py-4">
          <div className="section-layout" style={{ gap: "1.5rem" }}>
            <div className="section-text">
              <div className="section-header">
                <h2 className="section-title">My Role</h2>
              </div>
              <div className="section-body mt-3">
                <p>
                  I led this project end-to-end — defining requirements with firm principals, designing the data architecture in Supabase, and building the frontend in React with interactive Mapbox maps. The interface applies the visual identity and brand system I previously developed for evolveEA.
                </p>
              </div>
            </div>
            <div className="section-visual" style={{ marginRight: "2rem" }}>
              <img 
                src="/images/directorycards3d.jpg" 
                alt="Building performance dashboard directory cards" 
                className="w-full h-auto max-w-xl opacity-0 transition-all duration-700 ease-out"
                loading="lazy"
                onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
              />
            </div>
          </div>
        </section>

        {/* Section 3: The Solution */}
        <section className="content-section scroll-animate py-4">
          <div className="section-header">
            <h2 className="section-title">The Solution</h2>
          </div>
          <div className="section-body mt-3 mr-16">
            <p>
              The dashboard visualizes energy use, carbon emissions, and sustainability certifications across multiple buildings. Interactive maps and charts allow users to browse projects, compare performance, and pull data for client presentations.
            </p>
            <p className="mt-4">
              The platform integrates with the firm's existing project workflow — some data collection is automated through the LEED certification process. The UI system is designed to be replicable as evolveEA expands tracking across their other studios (mobility, climate, planning).
            </p>
          </div>
        </section>

        {/* Project Directory Image */}
        <section 
          className="content-section scroll-animate py-4"
          style={{ 
            width: "100vw", 
            marginLeft: "calc(-50vw + 50%)",
          }}
        >
          <img 
            src="/images/directory.jpg" 
            alt="Project directory view" 
            className="w-full h-auto opacity-0 transition-all duration-700 ease-out"
            loading="lazy"
            onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
          />
        </section>

        {/* Section 4: Impact */}
        <section className="content-section scroll-animate py-4">
          <div className="section-header">
            <h2 className="section-title">Impact</h2>
          </div>
          <div className="section-body mt-3 mr-16">
            <p>
              The tool has become central to evolveEA's client presentations and proposals, making the firm's sustainability track record visible and tangible.
            </p>
          </div>
        </section>

        {/* Live Site Link */}
        <section className="content-section scroll-animate py-8">
          <div className="flex items-center justify-center">
            <a
              href="https://e-ea.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="project-website-link text-center py-2"
            >
              open
              <br />
              <strong>evolveEA Dashboard</strong>
            </a>
          </div>
        </section>
      </div>

      <div className="cat-footer-section">
        <img src="/images/catfooter5.gif" alt="Cats playing with yarn" className="cat-footer-image" />
      </div>
    </div>
  )
}
