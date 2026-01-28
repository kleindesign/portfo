"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import ProjectNavigation from "@/components/project-navigation"

export default function SheltersPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [currentProcessImageIndex, setCurrentProcessImageIndex] = useState(0)
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null)
  const engagementImageRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: engagementImageRef,
    offset: ["start end", "end start"]
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.25, 1])

  const processImages = [
    { src: "https://raw.githubusercontent.com/kleindesign/portfo/main/Example-Insta-StoryMap-Promo.JPG", alt: "StoryMap promotion" },
    { src: "https://raw.githubusercontent.com/kleindesign/portfo/main/migration-map.jpg", alt: "Migration map" },
    { src: "https://raw.githubusercontent.com/kleindesign/portfo/main/green-roof-diagram.png", alt: "Green roof diagram" },
  ]

  const processPhases = [
    {
      name: "Concept Development",
      description: "Created the Migrating Species narrative and proposal that won the commission.",
    },
    {
      name: "Site Analysis",
      description: "Evaluated candidate intersections for lighting, drainage, power, visibility, and use patterns.",
    },
    {
      name: "Precedent Study",
      description:
        "Reviewed global shelters to prioritize durable, simple forms that supported custom artistic layers.",
    },
    {
      name: "Fabricator Selection",
      description: "Visited local fabrication shops to confirm materials, capabilities, and minimize transport.",
    },
    {
      name: "Stakeholder Coordination",
      description:
        "Managed inputs from community leaders, the transit authority, utilities, developers, and city agencies.",
    },
    {
      name: "Engagement Integration",
      description: "Used StoryMap, pop-ups, and events to gather stories and refine themes.",
    },
    {
      name: "Specifying Elements",
      description: "Finalized frame colors, etched glass motifs, artist components, lighting, and solar beacons.",
    },
    {
      name: "Fabrication Management",
      description: "Coordinated build details, material procurement, and installation sequencing.",
    },
  ]

  const togglePhase = (index: number) => {
    setExpandedPhase((prev) => (prev === index ? null : index))
  }

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
              if (text && index < text.length) {
                element.textContent += text[index]
                index++
              } else {
                clearInterval(typeInterval)
              }
            }, 50)

            pullquoteObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    const pullquotes = document.querySelectorAll(".typewriter-quote")
    pullquotes.forEach((quote) => pullquoteObserver.observe(quote))

    const bulletObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bullets = entry.target.querySelectorAll(".research-bullet")
            bullets.forEach((bullet, index) => {
              setTimeout(() => {
                bullet.classList.add("animate-fade-in-up")
                bullet.classList.remove("opacity-0", "translate-y-4")
              }, index * 200)
            })
            bulletObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 },
    )

    const researchSection = document.querySelector(".research-bullets-container")
    if (researchSection) {
      bulletObserver.observe(researchSection)
    }

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
      pullquoteObserver.disconnect()
      bulletObserver.disconnect()
      observerRef.current?.disconnect()
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProcessImageIndex((prevIndex) => (prevIndex + 1) % processImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [processImages.length])

  return (
    <div className="project-case-study">
      <div className="py-4 px-6 max-w-[1400px] mx-auto">
        <ProjectNavigation currentSlug="shelters-migrating-species" />
      </div>

      <div className="project-header max-w-[1200px] mx-auto px-6 mb-4">
        <h1 className="project-main-title hero-title opacity-0 font-bold">
          Shelters for Migrating Species
        </h1>
        <div className="project-tagline scroll-animate">
          {"transit infrastructure that connects community, nature, and place"}
        </div>
      </div>

      <section className="project-banner mb-8">
        <img
          src="/images/design-mode/Shelter-Migrating-Rend(1).jpg"
          alt="Shelters for Migrating Species banner"
          className="w-full h-auto"
        />
      </section>

      <div className="project-content max-w-[1200px] mx-auto px-6">
        <section className="content-section scroll-animate py-4">
          <div className="section-layout">
            <div className="section-text">
              <div className="section-header">
                <h2 className="section-title">Context</h2>
              </div>
              <div className="section-body mt-3">
                <p>
                  Shelters for Migrating Species is a series of transit shelters created for{" "}
                  <a
                    href="https://hazelwoodgreen.com/"
                    target="_blank"
                    className="text-[#00aeef] hover:text-black transition-colors"
                    rel="noreferrer"
                  >
                    Hazelwood Green</a>, the largest riverfront redevelopment in Pittsburgh's history. The challenge was to knit together the existing neighborhood and new development with a system to serve residents, commuters, and provide something for all living things who are on the move.
                </p>

              </div>
            </div>
            <div className="section-visual">
              <img
                src="/images/shelter-locations.jpg"
                alt="Aerial map of Hazelwood Green showing shelter locations at Island at Irvine St, Island at Eliza St, Hazelwood Ave & Lytle St, and Second & Tecumseh"
                className="w-full h-auto max-w-md mr-20"
              />
            </div>
          </div>
        </section>

        <section className="content-section scroll-animate py-4">
          <div className="section-header">
            <h2 className="section-title">Design Process</h2>
          </div>
          <div className="section-body mt-3">
            <div className="section-layout">
              <div className="section-text">
                <p className="mb-6">Our process moved from concept to fabrication through eight core phases:</p>

                <div className="flex gap-4">
                  {/* Left Column */}
                  <div className="flex-1 space-y-4">
                    {processPhases.slice(0, 4).map((phase, index) => (
                      <div
                        key={index}
                        onClick={() => togglePhase(index)}
                        className="border border-gray-300 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:border-[#00aeef] hover:shadow-sm"
                      >
                        <div className="font-medium text-base text-[#00aeef]">{phase.name}</div>
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            expandedPhase === index ? "max-h-48 mt-3" : "max-h-0"
                          }`}
                        >
                          <p className="text-sm text-gray-700">{phase.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column */}
                  <div className="flex-1 space-y-4">
                    {processPhases.slice(4, 8).map((phase, index) => (
                      <div
                        key={index + 4}
                        onClick={() => togglePhase(index + 4)}
                        className="border border-gray-300 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:border-[#00aeef] hover:shadow-sm"
                      >
                        <div className="font-medium text-base text-[#00aeef]">{phase.name}</div>
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            expandedPhase === index + 4 ? "max-h-48 mt-3" : "max-h-0"
                          }`}
                        >
                          <p className="text-sm text-gray-700">{phase.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="section-visual">
                <div className="relative w-full max-w-md" style={{ height: "400px" }}>
                  {processImages.map((image, index) => (
                    <div
                      key={index}
                      className={`carousel-image rectangular ${index === currentProcessImageIndex ? "active" : ""}`}
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

        <section className="content-section scroll-animate py-4">
          <div className="section-header">
            <h2 className="section-title">Concept Development</h2>
          </div>
          <div className="section-body mt-3">
            <div className="section-layout">
              <div className="section-text">
                <p>The concept highlights migration across species, time, and terrain. Key elements include:</p>

                <ul className="mt-4 space-y-2">
                  <li>a "kit of parts" integrating art, function, and local storytelling</li>
                  <li>four site-specific themes: The Mound, The River, The Green, and The Time Capsule</li>
                  <li>a bold color palette for wayfinding</li>
                  <li>locally fabricated steel and glass for durability and sustainability</li>
                </ul>

                <p>These choices kept the forms simple and functional while allowing expressive artistic layers.</p>
              </div>
              <div className="section-visual">
                <img
                  src="https://raw.githubusercontent.com/kleindesign/portfo/main/kit-of-parts.png"
                  alt="Kit of parts diagram showing shelter components"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="content-section scroll-animate py-4">
          <div className="section-header">
            <h2 className="section-title">Community Engagement</h2>
          </div>
          <div className="section-body mt-3">
            <div className="section-layout mb-1">
              <div className="section-text">
                <p>
                  We used a mix of in-person and digital engagement, including a{" "}
                  <a
                    href="https://storymaps.arcgis.com/stories/93c95ea60a1b48418e3ffc773f65d50d"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00aeef] hover:text-black transition-colors"
                  >
                    StoryMap
                  </a>
                  , sidewalk pop-ups, neighborhood meetings, and sessions with community organizers. Feedback was
                  continuous and shaped everything from the narrative framework to the physical components of the
                  shelters.
                </p>
              </div>
              <div className="section-visual">
                <a
                  href="https://storymaps.arcgis.com/stories/93c95ea60a1b48418e3ffc773f65d50d"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/design-mode/HZL_storymap_cover-700x356.jpg"
                    alt="Shelters for Migrating Species StoryMap"
                    className="w-full h-auto rounded-lg hover:opacity-80 transition-opacity"
                  />
                </a>
              </div>
            </div>

            <div className="section-layout">
              <div className="section-text">
                <p>
                  Engagement combined open-ended storytelling with place-based input. Riders contributed to the
                  Migration Map and “I Wish This Was” boards. Quotes collected by the artists appear on changeable
                  marquee signs, ensuring the shelters remain a living reflection of Hazelwood’s voice.
                </p>

                <div className="pullquote-container max-w-md ml-auto pr-6 border-r-[1px] border-black text-right my-6">
                  <p className="text-[#00aeef] text-4xl font-bold leading-none inline">“</p>
                  <p
                    className="typewriter-quote text-2xl text-black font-normal leading-relaxed inline"
                    data-text="We want investment in the Second Ave corridor to be prioritized."
                  ></p>
                  <p className="text-[#00aeef] text-4xl font-bold leading-none inline">”</p>
                  <p className="text-sm text-gray-600 italic mt-3">— Community Member</p>
                </div>
              </div>
              <div className="section-visual">
                <div 
                  ref={engagementImageRef}
                  className="overflow-hidden mt-8"
                  style={{ 
                    width: "100%",
                    maxWidth: "600px",
                    position: "relative"
                  }}
                >
                  <motion.img
                    src="/images/design-mode/library-sidewalk-engagement.jpeg"
                    alt="Community engagement at Hazelwood library with Migration Map activity"
                    className="w-full h-auto"
                    style={{ 
                      scale: imageScale 
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section scroll-animate py-4">
          <div className="section-header">
            <h2 className="section-title">Final Design</h2>
          </div>
          <div className="section-body mt-3">
            <p>Each shelter pairs a clean structural frame with custom artistic components:</p>

            <ul className="mt-4 space-y-2">
              <li>glass etchings referencing Monongahela petal gardens</li>
              <li>quilted banners made with community members</li>
              <li>reused billboard materials transformed into graphic panels</li>
              <li>wayfinding beacons pointing toward the river and hillside</li>
            </ul>

            <p>Inbound and outbound shelters at each stop use distinctive colors to mark the landscape.</p>
          </div>
        </section>

        <section className="content-section scroll-animate py-4">
          <div className="flex justify-center">
            <img
              src="https://raw.githubusercontent.com/kleindesign/portfo/main/elevation.jpg"
              alt="Shelter elevation drawing"
              className="w-full h-auto"
              style={{ maxWidth: "800px" }}
            />
          </div>
        </section>

        <section className="content-section scroll-animate py-4">
          <div className="section-body mt-3">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <h2 className="section-title" style={{ marginLeft: 0 }}>My Role</h2>
                <p className="mr-9">
                  As the <span className="text-[#00aeef]">Project Manager</span> with evolveEA, I led the concept
                  development, authored the winning proposal to secure the contract, and assembled the artist and
                  fabrication team. My responsibilities included site research, community engagement planning, stakeholder
                  coordination, precedent analysis, resource and budget management, and guiding the design through municipal
                  approvals.
                </p>
                <p className="mr-9 mt-3">
                  I also developed the project's communications strategy, StoryMap content, and public presentations.
                </p>
              </div>
              <div className="flex-1">
                <h2 className="section-title" style={{ marginLeft: 0 }}>Project Team</h2>
                <ul className="space-y-2">
                  <li><strong>evolveEA:</strong> architecture + project lead</li>
                  <li><strong>Alisha B. Wormsley:</strong> artist</li>
                  <li><strong>Carin Mincemoyer:</strong> artist</li>
                  <li><strong>U3:</strong> client representative</li>
                  <li><strong>Technique AP:</strong> fabrication + installation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section scroll-animate py-4">
          <div className="section-header">
            <h2 className="section-title">Impact</h2>
          </div>
          <div className="section-body mt-3">
            <p>
              Currently under construction. The shelters will serve as physical and ecological connectors between old and new Hazelwood — transit infrastructure that also builds social infrastructure and urban habitat.
            </p>
          </div>
        </section>
      </div>

      <div className="cat-footer-section">
        <img src="/images/catfooter5.gif" alt="Cats playing with yarn" className="cat-footer-image" />
      </div>
    </div>
  )
}
