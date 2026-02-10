"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useState } from "react"
import { cn } from "@/lib/utils"
import AnimatedLogo from "./AnimatedLogo"

export default function Navigation() {
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState(false)

  // Don't show navigation on home page (splash page)
  if (pathname === "/") {
    return null
  }

  return (
    <header className="w-full bg-black site-header animate-slide-in-left">
      <div className="site-header-container">
        {/* Header with Navigation and Animated Logo */}
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            {/* Navigation Links */}
            <nav className="flex space-x-8">
              <Link
                href="/"
                className={cn(
                  "nav-link text-2xl font-roboto transition-all duration-300 ease-in-out hover:font-bold",
                  pathname === "/" ? "text-white active font-bold" : "text-white opacity-70 hover:opacity-100",
                )}
              >
                home
              </Link>
              <Link
                href="/projects"
                className={cn(
                  "nav-link text-2xl font-roboto transition-all duration-300 ease-in-out hover:font-bold",
                  pathname === "/projects" || pathname.startsWith("/projects/")
                    ? "text-white active font-bold"
                    : "text-white opacity-70 hover:opacity-100",
                )}
              >
                projects
              </Link>
              <Link
                href="/about"
                className={cn(
                  "nav-link text-2xl font-roboto transition-all duration-300 ease-in-out hover:font-bold",
                  pathname === "/about" ? "text-white active font-bold" : "text-white opacity-70 hover:opacity-100",
                )}
              >
                about
              </Link>
            </nav>

            {/* Animated Logo Toggle */}
            <AnimatedLogo />
          </div>
        </div>
      </div>
    </header>
  )
}
