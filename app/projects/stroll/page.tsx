"use client"

import { useEffect, useRef, useState } from "react"
import ProjectNavigation from "@/components/project-navigation"

export default function StrollPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentAppScreenIndex, setCurrentAppScreenIndex] = useState(0)
  const [currentTestingImageIndex, setCurrentTestingImageIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [activeResearchTab, setActiveResearchTab] = useState("survey")

  const carouselImages = [
    { src: "/images/techoverload300.jpg", alt: "Technology overload" },
    { src: "/images/screen_nav300.jpg", alt: "Screen-based navigation" },
    { src: "/images/freewalk.jpg", alt: "Free walking" },
  ]

  const appScreens = [
    { src: "/videos/Stroll_Opening.mp4", alt: "Stroll app opening animation", type: "video" },
    { src: "/images/app_speak.png", alt: "Stroll app voice input interface", type: "image" },
    { src: "/images/app_pairing.png", alt: "Stroll app device pairing screen", type: "image" },
    { src: "/images/app_lock.png", alt: "Stroll app lock screen encouragement", type: "image" },
  ]

  const testingImages = [
    { src: "/images/Stroll_testing2.jpg", alt: "Stroll wearable on striped sweater" },
    { src: "/images/testing_stroll.jpg", alt: "User testing setup with devices" },
    { src: "/images/Stroll_proto2.jpg", alt: "Internal prototype electronics" },
    { src: "/images/Stroll_testing8.jpg", alt: "Wearable devices on belt loops" },
  ]

  useEffect(() => {
    // Intersection Observer for scroll animations - bidirectional
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            entry.target.classList.remove("opacity-0", "translate-y-12")

            // Trigger specific animations for different elements
            if (entry.target.classList.contains("research-stats-new")) {
              // Only animate once - check if already animated
              if (!entry.target.getAttribute("data-animated")) {
                entry.target.setAttribute("data-animated", "true")
                animateCounters()
                animateDonutCharts()
              }
            }
          } else {
            // Reset animations when out of view
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

    // Hero animations - staggered timing
    setTimeout(() => {
      const heroTitle = document.querySelector(".hero-title")
      heroTitle?.classList.add("animate-slide-up")
    }, 300)

    setTimeout(() => {
      const heroTagline = document.querySelector(".hero-tagline")
      heroTagline?.classList.add("animate-slide-up")
    }, 600)

    setTimeout(() => {
      const heroWearable = document.querySelector(".hero-wearable")
      heroWearable?.classList.add("animate-slide-in-left-hero")
    }, 900)

    setTimeout(() => {
      const heroApp = document.querySelector(".hero-app")
      heroApp?.classList.add("animate-slide-up-slow")
    }, 1200)

    // Add pulse effect to wearable after slide-in
    setTimeout(() => {
      const heroWearable = document.querySelector(".hero-wearable")
      heroWearable?.classList.add("pulse-haptic")
    }, 2000)

    setTimeout(() => {
      const heroFooter = document.querySelector(".hero-footer")
      heroFooter?.classList.add("animate-slide-up")
    }, 1200)

    // Interactive Gantt chart functionality
    const ganttBars = document.querySelectorAll(".gantt-bar-interactive")
    const processDetails = document.querySelectorAll(".process-detail-interactive")

    ganttBars.forEach((bar) => {
      bar.addEventListener("mouseenter", () => {
        // Reset all bars to blue
        ganttBars.forEach((b) => {
          b.style.backgroundColor = "#00aeef"
        })
        // Set hovered bar to black
        bar.style.backgroundColor = "#000000"

        const phase = bar.getAttribute("data-phase")
        processDetails.forEach((detail) => detail.classList.remove("active"))
        const activeDetail = document.getElementById(`detail-${phase}`)
        if (activeDetail) {
          activeDetail.classList.add("active")
        }
      })

      bar.addEventListener("click", () => {
        // Reset all bars to blue
        ganttBars.forEach((b) => {
          b.style.backgroundColor = "#00aeef"
        })
        // Set clicked bar to black
        bar.style.backgroundColor = "#000000"

        const phase = bar.getAttribute("data-phase")
        processDetails.forEach((detail) => detail.classList.remove("active"))
        const activeDetail = document.getElementById(`detail-${phase}`)
        if (activeDetail) {
          activeDetail.classList.add("active")
        }
      })
    })

    // Show first detail by default and set research bar to black
    if (processDetails.length > 0) {
      processDetails[0].classList.add("active")
      // Set research bar to black by default
      const researchBar = document.querySelector('[data-phase="research"]')
      if (researchBar) {
        researchBar.style.backgroundColor = "#000000"
      }
    }

    // Trigger animations when elements come into view
    observerRef.current?.observe(document.querySelector(".hero-wearable"))
    observerRef.current?.observe(document.querySelector(".hero-app"))
    observerRef.current?.observe(document.querySelector(".research-stats-new"))
    observerRef.current?.observe(document.querySelector(".gantt-chart-interactive"))

    // Ensure research bar is black when gantt chart comes into view
    const ganttObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const researchBar = document.querySelector('[data-phase="research"]')
            if (researchBar) {
              researchBar.style.backgroundColor = "#000000"
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    const ganttChart = document.querySelector(".gantt-chart-interactive")
    if (ganttChart) {
      ganttObserver.observe(ganttChart)
    }

    return () => {
      observerRef.current?.disconnect()
      ganttObserver.disconnect()
    }
  }, [])

  // Carousel rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [carouselImages.length])

  // App screens carousel rotation effect - pause when video is playing
  useEffect(() => {
    if (isVideoPlaying) {
      return // Don't advance carousel while video is playing
    }

    const interval = setInterval(() => {
      setCurrentAppScreenIndex((prevIndex) => (prevIndex + 1) % appScreens.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [appScreens.length, isVideoPlaying])

  // Testing images carousel rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestingImageIndex((prevIndex) => (prevIndex + 1) % testingImages.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [testingImages.length])

  // Typewriter effect for pullquote
  useEffect(() => {
    const pullquoteObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const text = entry.target.getAttribute("data-text")
            const element = entry.target
            let index = 0

            element.textContent = ""

            const typeInterval = setInterval(() => {
              if (index < text.length) {
                element.textContent += text[index]
                index++
              } else {
                clearInterval(typeInterval)
              }
            }, 50) // 50ms per character

            pullquoteObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    const pullquote = document.querySelector(".typewriter-quote")
    if (pullquote) {
      pullquoteObserver.observe(pullquote)
    }

    return () => {
      pullquoteObserver.disconnect()
    }
  }, [])

  // Handle video playback when in view
  useEffect(() => {
    const videoElement = document.querySelector(".carousel-slide video")
    if (!videoElement) return

    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
            // Video is fully in view, start playing
            videoElement.play()
            setIsVideoPlaying(true)
          }
        })
      },
      { threshold: 0.8 },
    )

    videoObserver.observe(videoElement)

    // Listen for video end event
    const handleVideoEnd = () => {
      setIsVideoPlaying(false)
      // Advance to next slide after video ends
      setCurrentAppScreenIndex((prevIndex) => (prevIndex + 1) % appScreens.length)
    }

    videoElement.addEventListener("ended", handleVideoEnd)

    return () => {
      videoObserver.disconnect()
      videoElement.removeEventListener("ended", handleVideoEnd)
    }
  }, [currentAppScreenIndex, appScreens.length])

  const animateCounters = () => {
    const counters = document.querySelectorAll(".counter-animate")
    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-target"))
      const increment = target / 60 // 60 frames for smooth animation
      let current = 0

      const updateCounter = () => {
        if (current < target) {
          current += increment
          counter.textContent = Math.ceil(current)
          requestAnimationFrame(updateCounter)
        } else {
          counter.textContent = target + (counter.getAttribute("data-suffix") || "")
        }
      }
      updateCounter()
    })
  }

  const animateDonutCharts = () => {
    const charts = document.querySelectorAll(".donut-animate")
    charts.forEach((chart) => {
      const percentage = chart.getAttribute("data-percentage")
      const circle = chart.querySelector(".circle")
      circle.style.strokeDasharray = `0, 100`

      setTimeout(() => {
        circle.style.transition = "stroke-dasharray 2s ease-out"
        circle.style.strokeDasharray = `${percentage}, 100`
      }, 500)
    })
  }

  return (
    <div className="project-case-study">
      {/* Project Navigation */}
      <div className="py-4 px-6 max-w-[1400px] mx-auto">
        <ProjectNavigation currentSlug="stroll" />
      </div>

      {/* Title and Tagline Above Hero */}
      <div className="project-header max-w-[1200px] mx-auto px-6 mb-4">
        <h1 className="project-main-title hero-title opacity-0 font-bold">
          Stroll
        </h1>
        <div className="project-tagline scroll-animate">
          screen-free urban navigation   
        </div>
      </div>

      {/* Hero Section with Gradient Background */}
      <section className="project-hero">
        <div className="hero-gradient-bg"></div>
        <div className="hero-visuals opacity-100">
          <div className="hero-wearable opacity-0">
            <img src="/images/stroll_wearable.png" alt="Stroll wearable devices" />
          </div>
          <div className="hero-app opacity-0">
            <img src="/images/Stroll_App_Mockup1.png" alt="Stroll mobile app" />
          </div>
        </div>
      </section>

      {/* Logo and Website Link Below Hero */}
      <div className="hero-footer max-w-[1200px] mx-auto px-6 py-4 opacity-0">
        <div className="flex items-center justify-center gap-8">
          <div className="hero-logo">
            <a href="https://stroll.living" target="_blank" rel="noopener noreferrer">
              <img className="px-[45px]" src="/images/stroll_logo_typ.png" alt="Stroll logo" />
            </a>
          </div>
          <a href="https://stroll.living" target="_blank" rel="noopener noreferrer" className="project-website-link">
            <strong>stroll.living</strong>
            <br />
            product site
          </a>
        </div>
      </div>

      {/* Content Sections */}
      <div className="project-content max-w-[1200px] mx-auto px-6">
        {/* Section 1: Context with Image Carousel */}
        <section className="content-section scroll-animate py-4">
          <div className="section-layout">
            <div className="section-text">
              <div className="section-header">
                <h2 className="section-title">Context</h2>
              </div>
              <div className="section-body mt-3">
                <p>Technology overload prevents people from being present while walking. Screen-based navigation and constant notifications undermine one of the simplest ways to recharge.</p>
                <p>We asked: what if your body could receive directions intuitively, without looking at your phone?</p>
              </div>
            </div>
            <div className="section-visual">
              <div className="image-carousel">
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`carousel-image ${index === currentImageIndex ? "active" : ""}`}
                    style={{
                      backgroundImage: `url(${image.src})`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Research & Insights */}
        <section className="content-section scroll-animate py-4">
          <div className="section-header">
            <h2 className="section-title">Research</h2>
          </div>
          <div className="section-body mt-3">
            <div className="research-methods-tabs mt-8 mb-6 mr-16">
              <div className="text-[#00aeef] text-sm font-bold mb-3">research methods</div>
              <div className="flex relative">
                <button
                  onClick={() => setActiveResearchTab("survey")}
                  className={`flex-1 py-3 text-base font-normal relative ${
                    activeResearchTab === "survey" ? "bg-white z-10" : "bg-transparent border-b border-b-black"
                  }`}
                >
                  <span className={activeResearchTab === "survey" ? "pr-8" : ""}>discovery survey</span>
                  {activeResearchTab === "survey" && (
                    <>
                      <div className="absolute top-0 left-0 right-4 border-t border-t-black"></div>
                      <img
                        src="/images/design-mode/tab-edge.png"
                        alt=""
                        className="absolute top-0 right-0 h-full"
                        style={{ width: "auto" }}
                      />
                    </>
                  )}
                </button>
                {activeResearchTab !== "survey" && activeResearchTab !== "competitor" && (
                  <div
                    className="w-[1px] bg-black absolute"
                    style={{ height: "100%", left: "33.333%", bottom: 0 }}
                  ></div>
                )}
                <button
                  onClick={() => setActiveResearchTab("competitor")}
                  className={`flex-1 py-3 text-base font-normal relative ${
                    activeResearchTab === "competitor" ? "bg-white z-10" : "bg-transparent border-b border-b-black"
                  }`}
                >
                  <span className={activeResearchTab === "competitor" ? "pr-8" : ""}>competitor analysis</span>
                  {activeResearchTab === "competitor" && (
                    <>
                      <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-black"></div>
                      <div className="absolute top-0 left-0 right-4 border-t border-t-black"></div>
                      <img
                        src="/images/design-mode/tab-edge.png"
                        alt=""
                        className="absolute top-0 right-0 h-full"
                        style={{ width: "auto" }}
                      />
                    </>
                  )}
                </button>
                {activeResearchTab !== "competitor" && activeResearchTab !== "frameworks" && (
                  <div
                    className="w-[1px] bg-black absolute"
                    style={{ height: "100%", left: "66.666%", bottom: 0 }}
                  ></div>
                )}
                <button
                  onClick={() => setActiveResearchTab("frameworks")}
                  className={`flex-1 py-3 text-base font-normal relative ${
                    activeResearchTab === "frameworks" ? "bg-white z-10" : "bg-transparent border-b border-b-black"
                  }`}
                >
                  <span className={activeResearchTab === "frameworks" ? "pr-8" : ""}>frameworks</span>
                  {activeResearchTab === "frameworks" && (
                    <>
                      <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-black"></div>
                      <div className="absolute top-0 left-0 right-4 border-t border-t-black"></div>
                      <img
                        src="/images/design-mode/tab-edge.png"
                        alt=""
                        className="absolute top-0 right-0 h-full"
                        style={{ width: "auto" }}
                      />
                    </>
                  )}
                </button>
              </div>

              <div className="tab-content bg-white p-8 pr-0">
                {activeResearchTab === "survey" && (
                  <div>
                    <p className="text-[#00aeef] mb-6">
                       We asked the world how it feels to be always-on
                    </p>

                    <div className="research-stats-new">
                      <div className="stat-column leading-3">
                        <div className="stat-icon">
                          <img
                            src="/icons/multiple-user.svg"
                            alt="Participants"
                            className="w-12 h-12"
                            style={{
                              filter:
                                "brightness(0) saturate(100%) invert(50%) sepia(100%) saturate(2000%) hue-rotate(180deg) brightness(100%) contrast(100%)",
                            }}
                          />
                        </div>

                        <div className="stat-description text-left">
                          <div className="flex items-baseline gap-2 leading-5 mb-0 py-3">
                            <span className="stat-number-large counter-animate" data-target="21">
                              0
                            </span>
                            <span className="stat-label">nationalities</span>
                          </div>
                          <div className="flex items-baseline gap-2 leading-5">
                            <span className="stat-number-large counter-animate" data-target="25" data-suffix="+">
                              0
                            </span>
                            <span className="stat-label">cities</span>
                          </div>
                          <div className="stat-label mt-1">survey participants</div>
                        </div>
                      </div>
                      <div className="stat-column">
                        <div className="donut-chart donut-animate" data-percentage="92">
                          <svg viewBox="0 0 36 36" className="circular-chart">
                            <path
                              className="circle-bg"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="circle"
                              strokeDasharray="92, 100"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          </svg>
                          <div className="percentage">92%</div>
                        </div>
                        <span className="stat-label">
                          reported weekly <span className="text-[#00aeef]">technology overload</span>
                        </span>
                      </div>
                      <div className="stat-column">
                        <div className="donut-chart donut-animate" data-percentage="85">
                          <svg viewBox="0 0 36 36" className="circular-chart">
                            <path
                              className="circle-bg"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="circle"
                              strokeDasharray="85, 100"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          </svg>
                          <div className="percentage">85%</div>
                        </div>
                        <span className="stat-label">
                          wanted a way to navigate <span className="text-[#00aeef]">without a screen</span>
                        </span>
                      </div>
                    </div>

                    {/* Research Insights - Two Column Layout */}
                    <div className="research-insights grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                      {/* Top Motivations */}
                      <div className="motivations-chart">
                        <h4 className="text-lg font-semibold mb-3">Top motivations for going on walks</h4>
                        <div className="space-y-2">
                          <div className="motivation-bar-container group">
                            <div
                              className="motivation-bar bg-[#00aeef] h-8 rounded flex items-center px-3 relative"
                              style={{ width: "100%", animation: "barGrow 1.5s ease-out forwards", animationDelay: "0.5s" }}
                            >
                              <img src="/images/design-mode/exercise.png" alt="Exercise" className="w-8 h-8 mr-3" />
                              <span className="text-white text-sm">physical exercise</span>
                              <span className="absolute right-3 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                56
                              </span>
                            </div>
                          </div>
                          <div className="motivation-bar-container group">
                            <div
                              className="motivation-bar bg-[#00aeef] h-8 rounded flex items-center px-3 relative"
                              style={{ width: "98%", animation: "barGrow 1.5s ease-out forwards", animationDelay: "0.7s" }}
                            >
                              <img src="/images/design-mode/freshair.png" alt="Fresh air" className="w-8 h-8 mr-3" />
                              <span className="text-white text-sm">fresh air</span>
                              <span className="absolute right-3 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                55
                              </span>
                            </div>
                          </div>
                          <div className="motivation-bar-container group">
                            <div
                              className="motivation-bar bg-[#00aeef] h-8 rounded flex items-center px-3 relative"
                              style={{ width: "79%", animation: "barGrow 1.5s ease-out forwards", animationDelay: "0.9s" }}
                            >
                              <img src="/images/design-mode/clearhead.png" alt="Clear head" className="w-8 h-8 mr-3" />
                              <span className="text-white text-sm">clear my head</span>
                              <span className="absolute right-3 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                44
                              </span>
                            </div>
                          </div>
                          <div className="motivation-bar-container group">
                            <div
                              className="motivation-bar bg-[#00aeef] h-8 rounded flex items-center px-3 relative"
                              style={{ width: "79%", animation: "barGrow 1.5s ease-out forwards", animationDelay: "1.1s" }}
                            >
                              <img src="/images/design-mode/nature.png" alt="Nature" className="w-8 h-8 mr-3" />
                              <span className="text-white text-sm">connect with nature</span>
                              <span className="absolute right-3 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                44
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Barriers */}
                      <div className="barriers-section">
                        <h4 className="text-lg font-semibold mb-3">Common barriers to screen-free walking</h4>
                        <div className="space-y-3">
                          <div className="barrier-item text-[#00aeef] text-sm">it makes me feel <strong>unsafe</strong></div>
                          <div className="barrier-item text-[#00aeef] text-sm">i worry about <strong>getting lost</strong></div>
                          <div className="barrier-item text-[#00aeef] text-sm">i don't want to miss notifications</div>
                          <div className="barrier-item text-[#00aeef] text-sm">i feel i must multitask while walking</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeResearchTab === "competitor" && (
                  <div>
                    <div className="competitor-analysis-visual flex justify-center mb-4">
                      <img
                        src="/images/design-mode/image.png"
                        alt="Competitor analysis showing various navigation and wearable devices"
                        className="max-w-full h-auto"
                        style={{ maxHeight: "400px" }}
                      />
                    </div>
                    <p className="text-[#00aeef] mb-6 text-center">
                      We analyzed the market to distil the best elements a wearable can offer without becoming overwhelming
                    </p>
                  </div>
                )}
                {activeResearchTab === "frameworks" && (
                  <div>
                    <p className="text-[#00aeef] mb-8">
                      25+ scientific studies and publications shaped stroll's premise and design approach
                    </p>

                    <div className="frameworks-grid grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Calm Technology */}
                      <div 
                        className="framework-item flex flex-col"
                        style={{
                          animation: "fadeInUp 0.6s ease-out forwards",
                          animationDelay: "0.1s",
                          opacity: 0,
                          transform: "translateY(20px)"
                        }}
                      >
                        <div className="framework-image mb-auto">
                          <img
                            src="https://raw.githubusercontent.com/kleindesign/portfo/main/calm-technology-book.jpg"
                            alt="Calm Technology book cover"
                            className="w-full h-auto"
                            style={{ maxHeight: "200px", objectFit: "contain" }}
                          />
                        </div>
                        <p className="text-sm mt-4">
                          calm tech principles for designing technology that works with human attention, instead of against it (a. case, 2015; calm tech institute, 2023)
                        </p>
                      </div>

                      {/* Designing with the Body */}
                      <div 
                        className="framework-item flex flex-col"
                        style={{
                          animation: "fadeInUp 0.6s ease-out forwards",
                          animationDelay: "0.3s",
                          opacity: 0,
                          transform: "translateY(20px)"
                        }}
                      >
                        <div className="framework-image mb-auto">
                          <img
                            src="https://raw.githubusercontent.com/kleindesign/portfo/main/designing-with-the-body.jpg"
                            alt="Designing with the Body book cover"
                            className="w-full h-auto"
                            style={{ maxHeight: "200px", objectFit: "contain" }}
                          />
                        </div>
                        <p className="text-sm mt-4">
                          soma design principles can empower us through embodied interaction (designing with the body: somaesthetic interaction design, k. höök, 2018)
                        </p>
                      </div>

                      {/* Cognitive Performance Study */}
                      <div 
                        className="framework-item flex flex-col"
                        style={{
                          animation: "fadeInUp 0.6s ease-out forwards",
                          animationDelay: "0.5s",
                          opacity: 0,
                          transform: "translateY(20px)"
                        }}
                      >
                        <div className="framework-image mb-auto">
                          <img
                            src="https://raw.githubusercontent.com/kleindesign/portfo/main/cognitiveactivity.jpg"
                            alt="Brain activity comparison after sitting vs walking"
                            className="w-full h-auto"
                            style={{ maxHeight: "200px", objectFit: "contain" }}
                          />
                          <div className="flex justify-around text-xs text-center mt-2">
                            <div>
                              <span className="block">after 20 minutes of</span>
                              <span className="block">sitting quietly</span>
                            </div>
                            <div>
                              <span className="block">after 20 minutes of</span>
                              <span className="block">walking</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm mt-4">
                          a cognitive performance study visualized the hidden benefits of walking (hillman, et al, 2009)
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Design Process */}
        <section className="content-section scroll-animate py-4">
          <div className="section-header">
            <h2 className="section-title">Design Process</h2>
            <p className="section-tagline mb-1 mt-1 font-light">From sketches to wearables.</p>
          </div>
          <div className="section-body mt-3">
            <p>Our team of three designers tackled research, ideation, and prototyping in our initial design sprint.</p>

            <div className="gantt-chart-interactive">
              <div className="flex gap-8 items-start">
                {/* Gantt bars - left side */}
                <div className="flex-1">
                  <div className="gantt-bars-interactive" style={{ opacity: 1 }}>
                    <div
                      className="gantt-bar-interactive research-bar-interactive leading-4"
                      data-phase="research"
                      style={{ display: "flex", boxShadow: "none", height: "25px" }}
                    >
                      <span>research</span>
                    </div>
                    <div
                      className="gantt-bar-interactive define-bar-interactive"
                      data-phase="define"
                      style={{ display: "flex", boxShadow: "none", height: "25px", width: "30%", marginLeft: "15%" }}
                    >
                      <span>define</span>
                    </div>
                    <div
                      className="gantt-bar-interactive ideate-bar-interactive"
                      data-phase="ideate"
                      style={{ display: "flex", boxShadow: "none", height: "25px" }}
                    >
                      <span>ideate</span>
                    </div>
                    <div
                      className="gantt-bar-interactive prototype-bar-interactive"
                      data-phase="prototype"
                      style={{ display: "flex", boxShadow: "none", height: "25px" }}
                    >
                      <span>prototype</span>
                    </div>
                    <div
                      className="gantt-bar-interactive validate-bar-interactive"
                      data-phase="validate"
                      style={{ display: "flex", boxShadow: "none", height: "25px", width: "25%", marginLeft: "75%" }}
                    >
                      <span>validate</span>
                    </div>
                    <div
                      className="gantt-bar-interactive refine-bar-interactive"
                      data-phase="refine"
                      style={{ display: "flex", boxShadow: "none", height: "25px" }}
                    >
                      <span>refine</span>
                    </div>
                  </div>
                </div>

                {/* Process details - right side circle */}
                <div className="w-80 h-80 flex items-center justify-center">
                  <div className="process-details-interactive w-full h-full p-6 rounded-full flex items-start justify-start pt-12 pl-16">
                    <div className="text-left border-l-[1px] border-black pl-4">
                      <div className="process-detail-interactive text-lg leading-4" id="detail-research">
                        <strong className="block mb-2">Research</strong>
                        <span className="text-xs leading-3">
                          competitor analysis, discovery survey, concept foundations & principles
                        </span>
                      </div>
                      <div className="process-detail-interactive text-lg leading-4" id="detail-define">
                        <strong className="block mb-2">Define</strong>
                        <span className="text-xs leading-3">audience, goals, values, positioning</span>
                      </div>
                      <div className="process-detail-interactive text-lg leading-4" id="detail-ideate">
                        <strong className="block mb-2">Ideate</strong>
                        <span className="text-xs leading-3">must/should/could/must nots, sketches</span>
                      </div>
                      <div className="process-detail-interactive text-lg leading-4" id="detail-prototype">
                        <strong className="block mb-2">Prototype</strong>
                        <span className="text-xs leading-3">wearable, app</span>
                      </div>
                      <div className="process-detail-interactive text-lg leading-4" id="detail-validate">
                        <strong className="block mb-2">Validate</strong>
                        <span className="text-xs leading-3">tests, demo & feedback</span>
                      </div>
                      <div className="process-detail-interactive text-lg leading-4" id="detail-refine">
                        <strong className="block mb-2">Refine</strong>
                        <span className="text-xs leading-3">research findings, brand & website</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Product Strategy & Feature Prioritization */}
        <section className="content-section scroll-animate py-4">
          <div className="section-header">
            <h2 className="section-title">Product Strategy & Feature Prioritization</h2>
          </div>
          <div className="section-body mt-3">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <p>We prioritized features that maximize presence and safety while minimizing distraction.</p>
                <ul className="mt-4">
                  <li>Haptic navigation prioritized for cognitive offloading.</li>
                  <li>AI coaching designed to gently encourage presence, not overwhelm.</li>
                  <li>Emergency location alerts integrated based on safety concerns.</li>
                </ul>
              </div>
              <div className="flex-1 flex justify-center">
                <img
                  src="/images/stroll-product-strategy.png"
                  alt="Stroll wearable device product design"
                  className="max-w-full h-auto"
                  style={{ maxHeight: "300px" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4.5: Information Architecture & User Flows */}
        <section className="content-section scroll-animate py-4">
          <div className="section-header">
            <h2 className="section-title">Information Architecture & User Flows</h2>
          </div>
          <div className="section-body mt-3">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <p>
                  I designed streamlined user flows emphasizing minimal interaction to reduce cognitive load during
                  walking.{" "}
                </p>
                <p>
                  The wearable delivers haptic cues passively, while the app provides simple start/stop navigation
                  controls and coaching feedback.{" "}
                </p>
                <p>
                  Emergency alert activation is a one-step long-press on the device, ensuring quick access without
                  distraction. This architecture supports an intuitive experience.
                </p>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="app-screens-carousel relative w-[90%] max-w-xs mx-auto">
                  <div className="carousel-container relative overflow-hidden rounded-lg">
                    <div
                      className="carousel-track flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${currentAppScreenIndex * 100}%)` }}
                    >
                      {appScreens.map((screen, index) => (
                        <div key={index} className="carousel-slide flex-shrink-0 w-full">
                          {screen.type === "video" ? (
                            <video src={screen.src} alt={screen.alt} className="w-full h-auto" muted playsInline />
                          ) : (
                            <img src={screen.src || "/placeholder.svg"} alt={screen.alt} className="w-full h-auto" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Carousel indicators */}
                  <div className="flex justify-center mt-4 gap-2">
                    {appScreens.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          index === currentAppScreenIndex ? "bg-[#00aeef]" : "bg-gray-300"
                        }`}
                        onClick={() => setCurrentAppScreenIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4.75: MVP Development & Testing Strategy */}
        <section className="content-section scroll-animate py-4">
          <div className="section-header">
            <h2 className="section-title">MVP Development & Testing Strategy</h2>
          </div>
          <div className="section-body mt-3">
            <div className="section-layout">
              <div className="section-text">
                <ul className="mb-6">
                  <li>Iterative user testing uncovered key improvements in haptic feedback clarity.</li>
                  <li>Safety alert flow optimized based on user hesitation observations.</li>
                  <li>Emotional feedback highlighted increased user presence and reduced phone checking.</li>
                </ul>

                <div className="pullquote-container max-w-md ml-auto pr-6 border-r-[1px] border-black text-right">
                  <p className="text-[#00aeef] text-4xl font-bold leading-none inline">“</p>
                  <p
                    className="typewriter-quote text-2xl text-black font-normal leading-relaxed inline"
                    data-text="I didn't realize how much I look at my phone until I walked without it."
                  >
                    I didn't realize how much I look at my phone until I walked without it.
                  </p>
                  <p className="text-[#00aeef] text-4xl font-bold leading-none inline">”</p>
                  <p className="text-sm text-gray-600 italic mt-3">— Test Participant</p>
                </div>
              </div>

              <div className="section-visual">
                <div className="image-carousel">
                  {testingImages.map((image, index) => (
                    <div
                      key={index}
                      className={`carousel-image ${index === currentTestingImageIndex ? "active" : ""}`}
                      style={{
                        backgroundImage: `url(${image.src})`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: My Role */}
        <section className="content-section scroll-animate py-4">
          <div className="section-header">
            <h2 className="section-title">My Role</h2>
          </div>
          <div className="section-body mt-3">
            <div className="role-grid">
              <div className="role-column">
                <h3>Our Team</h3>
                <p className="text-sm">
                  Our team of designers collaborated with mentors at Monks Agency to refine our concept and brand
                  strategy. I contributed to the research, form making, experience development and visual identity
                  processes. I took the lead on vibe-coding the{" "}
                  <a
                    href="https://stroll.living"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00aeef] hover:text-black transition-colors"
                  >
                    website
                  </a>{" "}
                  and creating the Stroll app prototype.
                </p>

                <h4>Design Team</h4>
                <p className="text-sm">Daniel Klein, Ayu Koene, Mehmet Berk Bostanci</p>
              </div>
              <div className="role-column">
                <h4>Tools</h4>
                <p className="text-sm">Figma, v0, Arduino, haptic motors, Blender, 3D printing</p>

                <h4>Deliverables</h4>
                <p className="text-sm">Research, wearable prototype, coaching app, website</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Recognition */}
        <section className="content-section scroll-animate py-4">
          <div className="section-header">
            <h2 className="section-title">Recognition</h2>
            <p className="section-tagline mb-1 mt-1 font-light">
              Stroll drew significant attention as a prototype for the future of calm tech design.
            </p>
          </div>
          <div className="section-body mt-3">
            <ul>
              <li>
                Featured at{" "}
                <a
                  href="https://thingscon.notion.site/exhibition-generative-things"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#00aeef] hover:text-black transition-colors"
                >
                  {" "}
                  ThingsCon
                </a>
                , Amsterdam 2024
              </li>
              <li>
                Exhibited at{" "}
                <a
                  href="https://ddw.nl"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#00aeef] hover:text-black transition-colors"
                >
                  Dutch Design Week 2025
                </a>
              </li>
              <li>Published in Generative Things: The State of Responsible Tech 2025</li>
            </ul>
          </div>
        </section>

        {/* Section 7: Work In Progress */}
        <section className="content-section scroll-animate py-8 mt-8">
          <div className="flex items-center justify-center gap-8">
            <div className="hero-logo">
              <a href="https://stroll.living" target="_blank" rel="noopener noreferrer">
                <img className="px-[45px]" src="/images/stroll_logo_typ.png" alt="Stroll logo" />
              </a>
            </div>
            <a href="https://stroll.living" target="_blank" rel="noopener noreferrer" className="project-website-link">
              <strong>stroll.living</strong>
              <br />
              product site
            </a>
          </div>
        </section>
      </div>

      {/* Footer Section */}
      <div className="cat-footer-section">
        <img src="/images/catfooter5.gif" alt="Cats playing with yarn" className="cat-footer-image" />
      </div>
    </div>
  )
}
