"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import AnimatedLogo from "./AnimatedLogo"

export default function Navigation() {
  const pathname = usePathname()
  const [isHeaderHovered, setIsHeaderHovered] = useState(false)
  const [tapTrigger, setTapTrigger] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const previousPathname = useRef<string>("/")

  // Trigger entrance animation only when coming from homepage
  useEffect(() => {
    const wasOnHomepage = previousPathname.current === "/"
    const isNowOnPageWithHeader = pathname !== "/"
    const isNowOnHomepage = pathname === "/"

    // Reset animation state when going to homepage
    if (isNowOnHomepage) {
      setHasAnimated(false)
    }
    // Animate if we just came from the homepage
    else if (wasOnHomepage && isNowOnPageWithHeader) {
      setHasAnimated(false)

      // Use requestAnimationFrame to ensure the reset is painted before animating
      if (typeof window !== 'undefined') {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setHasAnimated(true)
          })
        })
      }
    } else if (isNowOnPageWithHeader) {
      // If navigating between non-homepage pages, keep header visible
      setHasAnimated(true)
    }

    // Update previous pathname
    previousPathname.current = pathname
  }, [pathname])

  // Don't show navigation on home page (splash page)
  if (pathname === "/") {
    return null
  }

  const handleTouchOrClick = (e: React.TouchEvent | React.MouseEvent) => {
    // For touch events, trigger immediately
    // For mouse events on desktop, let hover handle it
    if (e.type === 'touchstart' || (e.type === 'click' && window.innerWidth < 768)) {
      // Increment counter to trigger animation
      setTapTrigger(prev => prev + 1)
    }
  }

  return (
    <header
      className="w-full bg-black site-header"
      style={{
        transform: hasAnimated ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.4s ease-out',
        willChange: hasAnimated ? 'auto' : 'transform'
      }}
      onMouseEnter={() => setIsHeaderHovered(true)}
      onMouseLeave={() => setIsHeaderHovered(false)}
      onTouchStart={handleTouchOrClick}
      onClick={handleTouchOrClick}
    >
      <div className="site-header-container">
        {/* Header with Navigation and Animated Logo */}
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-center md:justify-end items-center gap-4 md:gap-12">
            {/* Animated Logo Toggle - appears first on mobile, last on desktop */}
            <div
              className="order-1 md:order-2"
              style={{
                transform: hasAnimated ? 'translateX(0)' : 'translateX(180px)',
                opacity: hasAnimated ? 1 : 0,
                transition: 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.25s, opacity 0.6s ease-out 0.25s'
              }}
            >
              <AnimatedLogo key={pathname} isHovered={isHeaderHovered} tapTrigger={tapTrigger} />
            </div>

            {/* Navigation Links - appears second on mobile, first on desktop */}
            <nav
              className="flex space-x-8 order-2 md:order-1"
              style={{
                transform: hasAnimated ? 'translateX(0)' : 'translateX(100px)',
                opacity: hasAnimated ? 1 : 0,
                transition: 'transform 0.6s ease-out 0.1s, opacity 0.6s ease-out 0.1s'
              }}
            >
              <Link
                href="/"
                className={cn(
                  "nav-link text-base font-roboto tracking-wide transition-all duration-300 ease-in-out hover:font-bold",
                  pathname === "/" ? "text-white active font-bold tracking-wider" : "text-white hover:opacity-100",
                )}
              >
                home
              </Link>
              <Link
                href="/projects"
                className={cn(
                  "nav-link text-base font-roboto tracking-wide transition-all duration-300 ease-in-out hover:font-bold",
                  pathname === "/projects" || pathname.startsWith("/projects/")
                    ? "text-white active font-bold tracking-wider"
                    : "text-white hover:opacity-100",
                )}
              >
                projects
              </Link>
              <Link
                href="/about"
                className={cn(
                  "nav-link text-base font-roboto tracking-wide transition-all duration-300 ease-in-out hover:font-bold",
                  pathname === "/about" ? "text-white active font-bold tracking-wider" : "text-white hover:opacity-100",
                )}
              >
                about
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
