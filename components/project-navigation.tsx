"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { mainProjects } from "@/data/projects"

interface ProjectNavigationProps {
  currentSlug?: string
}

export default function ProjectNavigation({ currentSlug }: ProjectNavigationProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const currentProject = mainProjects.find((p) => p.slug === currentSlug)
  const currentIndex = mainProjects.findIndex((p) => p.slug === currentSlug)

  useEffect(() => {
    // Expand animation on mount - slower for more noticeable effect
    setTimeout(() => setIsExpanded(true), 200)

    // Show tooltip briefly on page load
    const showTimer = setTimeout(() => setShowTooltip(true), 1200)
    const hideTimer = setTimeout(() => setShowTooltip(false), 4200)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  const getIconPath = (slug: string) => {
    const iconMap: { [key: string]: string } = {
      stroll: "stroll-icon",
      "shelters-migrating-species": "bus-icon",
      linkzorg: "linkzorg-icon",
      evolveea: "evolve-icon",
      koetmeer: "koet-icon",
    }
    return `/icons/${iconMap[slug] || "default-icon"}.svg`
  }

  const displayedProject = hoveredSlug
    ? mainProjects.find((p) => p.slug === hoveredSlug)
    : currentProject

  const displayedIndex = hoveredSlug
    ? mainProjects.findIndex((p) => p.slug === hoveredSlug)
    : currentIndex

  return (
    <div
      className="fixed top-6 left-6 z-50"
      style={{
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Main container */}
      <div
        className="bg-white rounded-full relative"
        style={{
          padding: "12px 16px",
          border: "1px solid #d1d1d1",
          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.06)",
          width: isExpanded ? "auto" : "56px",
          height: "56px",
          overflow: "hidden",
          transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="flex items-center gap-4">
          {mainProjects.map((project, index) => {
            const isActive = project.slug === currentSlug
            const isHovered = project.slug === hoveredSlug

            return (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="block relative"
                style={{
                  width: "32px",
                  height: "32px",
                  opacity: isExpanded ? 1 : index === 0 ? 1 : 0,
                  transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease",
                  transitionDelay: isExpanded ? `${index * 0.08}s` : "0s",
                  transform: isHovered ? "scale(0.9)" : "scale(1)",
                }}
                onMouseEnter={() => {
                  setHoveredSlug(project.slug)
                  setShowTooltip(true)
                }}
                onMouseLeave={() => {
                  setHoveredSlug(null)
                  setShowTooltip(false)
                }}
                onTouchStart={() => {
                  setHoveredSlug(project.slug)
                  setShowTooltip(true)
                }}
                onTouchEnd={() => {
                  setTimeout(() => {
                    setHoveredSlug(null)
                    setShowTooltip(false)
                  }, 2000)
                }}
              >
                <img
                  src={getIconPath(project.slug)}
                  alt={project.title}
                  className="w-full h-full"
                  style={{
                    filter: isActive
                      ? "brightness(0) saturate(100%) invert(18%) sepia(100%) saturate(7500%) hue-rotate(315deg) brightness(100%) contrast(100%)"
                      : "none",
                    transition: "filter 0.2s ease",
                  }}
                />
              </Link>
            )
          })}
        </div>
      </div>

      {/* Tooltip with dots */}
      {displayedProject && displayedIndex !== -1 && (
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-1.5 text-sm whitespace-nowrap"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(4px)",
            opacity: showTooltip ? 1 : 0,
            visibility: showTooltip ? "visible" : "hidden",
            transition: "opacity 0.3s ease, visibility 0.3s ease",
            pointerEvents: "none",
            paddingTop: "0px",
            paddingBottom: "0px",
            lineHeight: "1.2",
          }}
        >
          <div className="flex items-center gap-1">
            {/* Dots before current project */}
            {displayedIndex > 0 && Array.from({ length: displayedIndex }).map((_, idx) => (
              <span
                key={`before-${idx}`}
                style={{
                  fontSize: "10px",
                  color: "#999",
                  lineHeight: "1",
                  fontWeight: "600",
                }}
              >
                •
              </span>
            ))}
            {/* Current project name */}
            <span
              className="font-normal"
              style={{
                color: "#000",
                marginLeft: displayedIndex > 0 ? "4px" : "0",
                marginRight: displayedIndex < mainProjects.length - 1 ? "4px" : "0",
              }}
            >
              {displayedProject.title.toLowerCase()}
            </span>
            {/* Dots after current project */}
            {displayedIndex < mainProjects.length - 1 && Array.from({ length: mainProjects.length - displayedIndex - 1 }).map((_, idx) => (
              <span
                key={`after-${idx}`}
                style={{
                  fontSize: "10px",
                  color: "#999",
                  lineHeight: "1",
                  fontWeight: "600",
                }}
              >
                •
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
