"use client"

import { useEffect, useRef } from "react"
import ProjectNavigation from "@/components/project-navigation"

export default function KoetMeerPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
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

    const elements = document.querySelectorAll(".scroll-animate")
    elements.forEach((el) => {
      el.classList.add("opacity-0", "translate-y-12", "transition-all", "duration-1000", "ease-out")
      observerRef.current?.observe(el)
    })

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
      <ProjectNavigation currentSlug="koetmeer" />

      <div className="project-content max-w-[1200px] mx-auto px-6">
        {/* Title Above Hero */}
        <div className="project-header max-w-[1200px] mx-auto px-6 mb-4 text-center">
          <h1 className="project-main-title hero-title opacity-0 font-bold">
            KoetMeer
          </h1>
          <div className="project-tagline scroll-animate" style={{ width: "95%", maxWidth: "1200px" }}>
            growing and celebrating biodiversity in amsterdam's canals
          </div>
        </div>
      </div>

      {/* Hero Section - Banner Image */}
      <section 
        style={{ 
          width: "100vw", 
          marginLeft: "calc(-50vw + 50%)", 
          marginBottom: "2rem", 
          overflow: "hidden",
          position: "relative"
        }}
      >
        <div style={{ 
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <img
            src="/images/koet-site-banner.png"
            alt="KoetMeer project banner"
            style={{
              width: "100%",
              height: "auto",
              display: "block"
            }}
          />
        </div>
      </section>

      <div className="project-content max-w-[1200px] mx-auto px-6">
        <section className="content-section scroll-animate py-4">
          <div className="section-body">
            <p className="text-lg mb-8">
              KoetMeer is a citizen science app for urban ecology, currently in development through co-design workshops with Amsterdam residents and visitors. The platform will support community-built floating habitat gardens on Amsterdam's canals, with features for biodiversity tracking, self-guided tours, and a local species identification guide.
            </p>

            <div className="flex justify-center mb-8">
              <img
                src="/images/koet-workshop1.jpg"
                alt="KoetMeer co-design workshop with Amsterdam residents"
                className="max-w-full h-auto"
                style={{ maxHeight: "500px", objectFit: "contain" }}
              />
            </div>

            <div className="text-center mt-12">
              <p className="text-lg mb-6">Sign up to join the beta or learn more.</p>

              <a
                href="https://koetmeer.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="project-website-link text-center py-2"
              >
                visit
                <br />
                <strong>koetmeer.nl</strong>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
