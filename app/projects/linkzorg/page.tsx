"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import ProjectNavigation from "@/components/project-navigation"

export default function LinkZorgPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [activeResearchTab, setActiveResearchTab] = useState("background")
  const [typewriterKey, setTypewriterKey] = useState(0)
  const productFeaturesRef = useRef<HTMLDivElement>(null)
  const [currentWorkflowIndex, setCurrentWorkflowIndex] = useState(0)
  const [workflowCaption, setWorkflowCaption] = useState("")

  const workflowSteps = [
    { src: "https://www.linkzorg.nl/images/lz_identify_step1.png", caption: "Identify Needs" },
    { src: "https://www.linkzorg.nl/images/lz_select_step2.png", caption: "Find Resources" },
    { src: "https://www.linkzorg.nl/images/lz_generate_step3.png", caption: "Create Care Plan" },
    { src: "https://www.linkzorg.nl/images/lz_share_step4.png", caption: "Share & Print" },
  ]

  const { scrollYProgress } = useScroll({
    target: productFeaturesRef,
    offset: ["start end", "end start"]
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.25, 1])

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

  useEffect(() => {
    const blurb = document.querySelector(".research-blurb-text")
    if (!blurb) return

    const text = blurb.getAttribute("data-text")
    if (!text) return

    let index = 0
    blurb.textContent = ""

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        blurb.textContent += text[index]
        index++
      } else {
        clearInterval(typeInterval)
      }
    }, 20) // 20ms per character for smooth typing

    return () => clearInterval(typeInterval)
  }, [activeResearchTab, typewriterKey])

  useEffect(() => {
    setTypewriterKey((prev) => prev + 1)
  }, [activeResearchTab])

  // Workflow carousel rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWorkflowIndex((prevIndex) => (prevIndex + 1) % workflowSteps.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [workflowSteps.length])



  return (
    <div className="project-case-study">
      {/* Project Navigation */}
      <ProjectNavigation currentSlug="linkzorg" />

      <div className="project-header max-w-[1200px] mx-auto px-6 mb-4">
        <h1 className="project-main-title hero-title opacity-0 font-bold">
          LinkZorg
        </h1>
        <div className="project-tagline scroll-animate">
          connecting vulnerable patients to local support
        </div>
      </div>

      <section className="project-hero">
        <div className="w-full">
          <img
            src="/images/design-mode/404ff92b-ea38-4550-8a00-693a61eb4600.jpg"
            alt="LinkZorg landing page interface showing caregiver categories and navigation"
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Content Sections */}
      <div className="project-content max-w-[1200px] mx-auto px-6 -mt-8">
        <section className="content-section scroll-animate mt-0 py-0">
          <div className="flex items-center justify-center gap-8">
            <a href="https://linkzorg.nl" target="_blank" rel="noopener noreferrer">
              <div className="hero-logo">
                <img className="px-[45px] scale-150" src="https://www.linkzorg.nl/logo.svg" alt="LinkZorg brand mark" />
              </div>
            </a>
            <a
              href="https://linkzorg.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="project-website-link text-center py-2"
            >
              open
              <br />
              <strong>LinkZorg.nl</strong>
            </a>
          </div>
        </section>

        <section className="content-section scroll-animate py-4">
          <div className="section-header">
            <h2 className="section-title">Context</h2>
          </div>
          <div className="section-body mt-3 mr-16">
            <p>
              Emergency clinicians at OLVG Oost Hospital in Amsterdam often treat 3U patients—people who are{" "}
              <span className="text-[#00aeef]">“unhoused, undocumented, or uninsured”</span>—and needed a solution to
              provide follow-up care and resources. LinkZorg is a simple digital platform that helps ER staff chart an
              after-care route for their 3U patients as they’re discharged from emergency care.
            </p>
            <p>
              The tool helps identify suitable resources quickly, then generates a custom printout of instructions for
              the patient.
            </p>
          </div>

          <div className="mt-8 w-full">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src="https://www-ccv.adobe.io/v1/player/ccv/7vZYEak-9GV/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View"
                className="absolute top-0 left-0 w-full h-full mx-0 px-16 mt-5"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <section className="content-section scroll-animate py-4">
          <div className="section-header">
            <h2 className="section-title">Research</h2>
          </div>
          <div className="section-body mt-3">
            <div className="research-methods-tabs mt-8 mb-6 mr-16">
              <div className="text-[#00aeef] text-sm font-bold mb-3">research methods</div>
              <div className="flex relative">
                <button
                  onClick={() => setActiveResearchTab("background")}
                  className={`flex-1 py-3 text-base font-normal relative ${
                    activeResearchTab === "background" ? "bg-white z-10" : "bg-transparent border-b border-b-black"
                  }`}
                >
                  <span className={activeResearchTab === "background" ? "pr-8" : ""}>background analysis</span>
                  {activeResearchTab === "background" && (
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
                {activeResearchTab !== "background" && activeResearchTab !== "situated" && (
                  <div
                    className="w-[1px] bg-black absolute"
                    style={{ height: "100%", left: "33.333%", bottom: 0 }}
                  ></div>
                )}
                <button
                  onClick={() => setActiveResearchTab("situated")}
                  className={`flex-1 py-3 text-base font-normal relative ${
                    activeResearchTab === "situated" ? "bg-white z-10" : "bg-transparent border-b border-b-black"
                  }`}
                >
                  <span className={activeResearchTab === "situated" ? "pr-8" : ""}>situated action</span>
                  {activeResearchTab === "situated" && (
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
                {activeResearchTab !== "situated" && activeResearchTab !== "testing" && (
                  <div
                    className="w-[1px] bg-black absolute"
                    style={{ height: "100%", left: "66.666%", bottom: 0 }}
                  ></div>
                )}
                <button
                  onClick={() => setActiveResearchTab("testing")}
                  className={`flex-1 py-3 text-base font-normal relative ${
                    activeResearchTab === "testing" ? "bg-white z-10" : "bg-transparent border-b border-b-black"
                  }`}
                >
                  <span className={activeResearchTab === "testing" ? "pr-8" : ""}>user testing</span>
                  {activeResearchTab === "testing" && (
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
                {activeResearchTab === "background" && (
                  <div className="flex gap-6 items-start">
                    <div className="w-[180px] flex-shrink-0">
                      <p
                        className="research-blurb-text text-sm leading-relaxed text-gray-700"
                        data-text="the linkzorg concept was informed by existing resources for 3u people, gaps in the dutch healthcare system, and digital and offline solutions from around the world."
                      ></p>
                    </div>
                    <div className="flex-1 flex justify-end overflow-hidden">
                      <div className="w-full overflow-hidden">
                        <img
                          src="/images/design-mode/bg analysis.png"
                          alt="Background analysis diagram showing LinkZorg connections to various resources"
                          className="w-full h-auto"
                          style={{ marginTop: "-90px" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {activeResearchTab === "situated" && (
                  <div className="flex gap-6 items-start">
                    <div className="w-[180px] flex-shrink-0">
                      <p
                        className="research-blurb-text text-sm leading-relaxed text-gray-700"
                        data-text="we joined er doctors and care workers on visits to drop-in centers and clinics. conversations revealed informal networks struggling to bridge gaps in the system."
                      ></p>
                    </div>
                    <div className="flex-1 flex justify-end overflow-hidden">
                      <div className="w-full overflow-hidden">
                        <img
                          src="/images/design-mode/situated action.png"
                          alt="Situated action research showing field visits and community sites"
                          className="w-full h-auto"
                          style={{ marginTop: "-90px" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {activeResearchTab === "testing" && (
                  <div className="flex gap-6 items-start">
                    <div className="w-[180px] flex-shrink-0">
                      <p
                        className="research-blurb-text text-sm leading-relaxed text-gray-700"
                        data-text="our first iteration was reviewed by peers and mentors in the design field, which led to simplified filtering and fewer steps to generate a patient care plan. the platform was well-received by olvg emergency staff, who are testing the mvp in the hospital setting."
                      ></p>
                    </div>
                    <div className="flex-1 flex justify-end overflow-hidden">
                      <div className="w-full overflow-hidden">
                        <img
                          src="/images/design-mode/user testing.png"
                          alt="User testing session with OLVG doctors"
                          className="w-full h-auto"
                          style={{ marginTop: "-75px" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p>
              <strong>What we found:</strong>
            </p>
            <ul className="mt-4">
              <li>
                Existing resources are <span className="text-[#00aeef]">fragmented</span> across PDFs, emails, and
                personal networks.
              </li>
              <li>Information must be fast to scan during a shift.</li>
              <li>
                Guidance must be <span className="text-[#00aeef]">accessible</span> for patients with different
                literacy, language needs, or without reliable internet access.
              </li>
              <li>
                Digital solutions should support <span className="text-[#00aeef]">human-to-human</span> warm handoffs,
                not replace them.
              </li>
            </ul>
          </div>
        </section>

        <section className="content-section scroll-animate py-4">
          <div className="section-header">
            <h2 className="section-title">Solution</h2>
          </div>
          <div className="section-body mt-3">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <p>
                  We built a filtered database and printable care plan generator that mirrors how ER staff actually work.
                  The platform is grounded in three principles: Trust, Connection, and Empowerment.
                </p>
                <p>The workflow is intentionally simple:</p>
                <ol className="mt-0">
                  <li>Identify patient needs</li>
                  <li>View filtered caregivers</li>
                  <li>Select relevant resources</li>
                  <li>Generate a one-page aftercare plan</li>
                </ol>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="relative mb-6">
                  {/* Black circle shadow */}
                  <div 
                    className="absolute rounded-full bg-black"
                    style={{
                      width: "250px",
                      height: "250px",
                      top: "4px",
                      left: "4px",
                      zIndex: 0
                    }}
                  />
                  {/* Carousel */}
                  <div className="image-carousel relative" style={{ zIndex: 1 }}>
                    {workflowSteps.map((step, index) => (
                      <div
                        key={index}
                        className={`carousel-image ${index === currentWorkflowIndex ? "active" : ""}`}
                        style={{
                          backgroundImage: `url(${step.src})`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="relative w-full overflow-hidden" style={{ minHeight: "3rem" }}>
                  {workflowSteps.map((step, index) => (
                    <div
                      key={index}
                      className="absolute left-0 right-0 text-center text-2xl font-light text-black transition-all duration-800 ease-out"
                      style={{
                        transform: index === currentWorkflowIndex ? "translateX(0)" : "translateX(100%)",
                        opacity: index === currentWorkflowIndex ? 1 : 0,
                      }}
                    >
                      {index + 1}. {step.caption}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={productFeaturesRef} className="content-section scroll-animate py-4">
          <div className="section-header">
            <h2 className="section-title">Product Features</h2>
          </div>
          <div className="section-body mt-3">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <p>
                  The database includes shelter, primary care, food access, mental health, addiction support, crisis
                  services, pharmacies that do not require insurance, and legal assistance—organized for quick scanning
                  during a shift.
                </p>
                <p>
                  Each resource card shows hours, location, eligibility, and contact info. A bilingual Dutch/English
                  toggle and a black-and-white printout support readability.
                </p>
              </div>
              <div className="flex-1 flex justify-center">
                <div 
                  className="overflow-hidden"
                  style={{ 
                    width: "100%",
                    maxWidth: "400px",
                    height: "400px",
                    position: "relative"
                  }}
                >
                  <motion.img
                    src="/images/lz-tabletmkpsq.jpg"
                    alt="Single-page A4 aftercare template generated for 3U patients"
                    style={{ 
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
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
            <h2 className="section-title">My Role</h2>
          </div>
          <div className="section-body mt-3">
            <p>
              I led concept and product development in a team of three, facilitating design sprints, crafting the UI and care plan templates, and coordinating stakeholder engagement including field research and focus groups.
            </p>
          </div>
        </section>

        <section className="content-section scroll-animate py-4">
          <div className="section-header">
            <h2 className="section-title">Impact</h2>
          </div>
          <div className="section-body mt-3">
            <p>
              LinkZorg is actively used in OLVG Oost&apos;s Emergency Department, where it helps staff provide personalized care plans to vulnerable patients. The project catalyzed new coordination between previously fragmented care providers across Amsterdam, creating the database helped establish a more cohesive network. Hospital staff can now do more for their patients, who leave with information that empowers them to meet their needs beyond crisis recovery.                                             
            </p>
          </div>
          <div className="flex items-center justify-center gap-8 mt-14">
            <a href="https://linkzorg.nl" target="_blank" rel="noopener noreferrer">
              <div className="hero-logo">
                <img className="px-[45px] scale-150" src="https://www.linkzorg.nl/logo.svg" alt="LinkZorg brand mark" />
              </div>
            </a>
            <a
              href="https://linkzorg.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="project-website-link text-center py-2"
            >
              open
              <br />
              <strong>LinkZorg.nl</strong>
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
