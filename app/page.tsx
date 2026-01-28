"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showYarnball, setShowYarnball] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const video = videoRef.current
        const scrollTop = window.pageYOffset
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollPercent = Math.min(scrollTop / documentHeight, 1)
        const targetTime = scrollPercent * video.duration

        if (!isNaN(targetTime) && video.readyState >= 2) {
          video.currentTime = targetTime
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const splashDesc = document.querySelector(".splash-description")
    if (splashDesc) {
      const paragraphs = splashDesc.querySelectorAll("p")
      paragraphs.forEach((p) => {
        const html = p.innerHTML
        const wrappedHtml = html.replace(
          /(<span class="hoverable-word([^"]*)"[^>]*>)([^<]+)(<\/span>)|(\b\w+\b)/g,
          (match, openTag, classes, spanContent, closeTag, plainWord) => {
            // If it's already a span, preserve it with all its classes
            if (openTag) {
              return match
            }
            // Otherwise wrap plain words
            return `<span class="hoverable-word">${plainWord}</span>`
          },
        )
        p.innerHTML = wrappedHtml
      })
    }
  }, [])

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <div className="splash-page">
      {showYarnball && (
        <div
          className="yarnball-cursor"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
          }}
        >
          <img src="/images/yarnball1.png" alt="" />
        </div>
      )}

      <section className="splash">
        <div className="splash-content" style={{ maxWidth: "490px" }}>
          <div
            className="kitten-paw-container"
            style={{ cursor: "none" }}
            onMouseEnter={() => setShowYarnball(true)}
            onMouseLeave={() => setShowYarnball(false)}
            onMouseMove={handleMouseMove}
          >
            <video
              ref={videoRef}
              className="kitten-paw"
              muted
              playsInline
              preload="auto"
              onMouseEnter={playVideo}
              onClick={playVideo}
              onTouchStart={playVideo}
            >
              <source src="/videos/movepaw1.mp4" type="video/mp4" />
            </video>
          </div>

          <div style={{ paddingLeft: "40px" }}>
            <div className="splash-title">
              <div className="gray-text text-6xl font-bold leading-[3.25rem]">Let&apos;s think outside the box.</div>
              
            </div>

            <div className="splash-description" style={{ marginTop: "60px", marginBottom: "60px" }}>
              <p>
                <span className="hoverable-word">i'm</span> <span className="hoverable-word text-black">daniel</span>{" "}
                <span className="hoverable-word text-black">klein</span> (aka{" "}
                <span className="hoverable-word">dani</span>
                ), an urban impact designer. i create products, places, and systems that make cities more livable, communities more connected, and impact measurable.
              </p>
              <p className="pr-5">smart, outside-the-box solutions emerge through collaboration.</p>
              <p className="pr-5">what impact can we create together?</p>
            </div>
          </div>
        </div>

        <div className="button-container" style={{ justifyContent: "center" }}>
          <Link href="/about" className="button-module button-details" onMouseEnter={playVideo}>
            my details
          </Link>
          <Link href="/projects" className="button-module button-work" onMouseEnter={playVideo}>
            my work
          </Link>
        </div>
      </section>
    </div>
  )
}
