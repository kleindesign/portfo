"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState(false)

  // Don't show navigation on home page (splash page)
  if (pathname === "/") {
    return null
  }

  return (
    <header className="w-full bg-white site-header animate-slide-in-left">
      <div className="site-header-container">
        {/* Logo/Header Image with Hover State */}
        <div className="logo-wrap w-full h-[200px] flex items-center justify-end">
          <div className="logo logo-image has-rollover relative h-full ml-auto">
            <div className="image-normal image-link block h-full header-link">
              <img
                src="/images/design-mode/6f5064b7-8bc7-498d-b026-8a39f1c91930_rwc_10x0x1310x348x4096.gif"
                alt="danielklein.design"
                className="h-full w-auto object-contain header-image"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            </div>
            <div className="image-rollover image-link absolute top-0 left-0 h-full header-link">
              <img
                src="/images/design-mode/809188c2-dbd7-4228-896a-eda67ed4ffec_rwc_10x0x1310x348x4096.gif"
                alt="danielklein.design"
                className={cn("h-full w-auto object-contain header-image", isHovered ? "opacity-100" : "opacity-0")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            {/* Invisible spacer to balance layout */}
            <div className="invisible text-2xl">Daniel Klein</div>

            {/* Navigation Links */}
            <nav className="flex space-x-8">
              <Link
                href="/"
                className={cn(
                  "nav-link text-2xl font-roboto transition-all duration-300 ease-in-out hover:font-bold",
                  pathname === "/" ? "text-black active font-bold" : "text-[#00aeef]",
                )}
              >
                home
              </Link>
              <Link
                href="/projects"
                className={cn(
                  "nav-link text-2xl font-roboto transition-all duration-300 ease-in-out hover:font-bold",
                  pathname === "/projects" || pathname.startsWith("/projects/")
                    ? "text-black active font-bold"
                    : "text-[#00aeef]",
                )}
              >
                projects
              </Link>
              <Link
                href="/about"
                className={cn(
                  "nav-link text-2xl font-roboto transition-all duration-300 ease-in-out hover:font-bold",
                  pathname === "/about" ? "text-black active font-bold" : "text-[#00aeef]",
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
