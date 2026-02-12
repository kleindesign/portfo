"use client"

import React, { useState, useEffect, useRef } from 'react'

interface AnimatedLogoProps {
  isHovered?: boolean
  tapTrigger?: number
}

export default function AnimatedLogo({ isHovered = false, tapTrigger = 0 }: AnimatedLogoProps) {
  const [isRolled, setIsRolled] = useState(true) // Start in swapped position
  const [disableTransition, setDisableTransition] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)
  const wasOutOfView = useRef(false)

  // Trigger animation on mount - roll into base state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRolled(false) // Roll to base state
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Handle tap trigger for mobile - snap to swapped, then roll to base
  useEffect(() => {
    if (tapTrigger > 0) {
      // Disable transition, snap to swapped instantly
      setDisableTransition(true)
      setIsRolled(true)

      // Re-enable transition and roll to base
      setTimeout(() => {
        setDisableTransition(false)
        setTimeout(() => {
          setIsRolled(false)
        }, 50)
      }, 50)
    }
  }, [tapTrigger])

  // Desktop hover - swap on hover, return on unhover
  useEffect(() => {
    if (isHovered) {
      setIsRolled(true)
    } else {
      setIsRolled(false)
    }
  }, [isHovered])

  // Swap when scrolling out of view, animate when scrolling back into view
  useEffect(() => {
    if (!logoRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0].isIntersecting

        if (!isVisible) {
          // Logo scrolled out of viewport - swap it
          setIsRolled(true)
          wasOutOfView.current = true
        } else if (isVisible && wasOutOfView.current) {
          // Logo scrolled back into viewport - CLONE page load animation
          setIsRolled(true)
          setTimeout(() => {
            setIsRolled(false)
            wasOutOfView.current = false
          }, 500)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(logoRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={logoRef}
      className="relative cursor-pointer flex-shrink-0"
      style={{
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        minWidth: '200px',
        width: '200px'
      }}
    >
      <svg
        width="200"
        height="110"
        viewBox="0 0 400 220"
        preserveAspectRatio="xMidYMid meet"
        style={{
          shapeRendering: 'geometricPrecision',
          WebkitBackfaceVisibility: 'hidden',
          WebkitPerspective: 1000,
          WebkitTransform: 'translate3d(0,0,0)',
          transform: 'translate3d(0,0,0)'
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Frame (back layer) */}
        <path d="M111,3h178c59.65,0,108,47.91,108,107h0c0,59.09-48.35,107-108,107H111c-59.65,0-108-47.91-108-107h0C3,50.91,51.35,3,111,3Z" fill="none" stroke="#fff" strokeWidth="6"/>

        {/* Daniel Klein text (middle layer) */}
        <g
          style={{
            transform: `translateX(${isRolled ? 208 : 0}px)`,
            transition: disableTransition ? 'none' : 'transform 0.8s ease-in-out'
          }}
        >
          <path d="M38.6,65.41h8.31c12,0,16.75,6.91,16.75,16.71,0,12.15-8.11,16.8-19.2,16.8h-5.86v-33.51ZM41.92,96.03h2.74c9.5,0,15.7-3.84,15.7-14.11s-6.1-13.63-13.58-13.63h-4.85v27.75Z" fill="#fff" stroke="white" strokeWidth="1.2"/>
          <path d="M84.64,94.98h-.1c-1.34,2.93-4.75,4.51-7.78,4.51-6.96,0-8.06-4.7-8.06-6.91,0-8.21,8.74-8.59,15.07-8.59h.58v-1.25c0-4.18-1.49-6.29-5.57-6.29-2.54,0-4.94.58-7.2,2.02v-2.93c1.87-.91,5.04-1.68,7.2-1.68,6.05,0,8.59,2.74,8.59,9.12v10.8c0,1.97,0,3.46.24,5.14h-2.98v-3.94ZM84.35,86.58h-.86c-5.23,0-11.47.53-11.47,5.9,0,3.22,2.3,4.42,5.09,4.42,7.1,0,7.25-6.19,7.25-8.83v-1.49Z" fill="#fff" stroke="white" strokeWidth="1.2"/>
          <path d="M94.57,80.19c0-1.87,0-3.79-.19-5.76h2.93v4.37h.1c1.01-2.21,2.83-4.95,7.92-4.95,6.05,0,8.35,4.03,8.35,9.41v15.65h-3.02v-14.88c0-4.61-1.63-7.58-5.81-7.58-5.52,0-7.25,4.85-7.25,8.93v13.54h-3.02v-18.72Z" fill="#fff" stroke="white" strokeWidth="1.2"/>
          <path d="M124.29,67.9h-3.02v-4.03h3.02v4.03ZM121.26,74.43h3.02v24.48h-3.02v-24.48Z" fill="#fff" stroke="white" strokeWidth="1.2"/>
          <path d="M148.33,98.15c-2.11.86-4.85,1.34-7.1,1.34-8.11,0-11.14-5.47-11.14-12.82s4.13-12.82,10.32-12.82c6.91,0,9.75,5.57,9.75,12.15v1.54h-16.75c0,5.18,2.78,9.36,8.06,9.36,2.21,0,5.42-.91,6.87-1.82v3.07ZM146.85,84.94c0-4.27-1.73-8.5-6.24-8.5s-7.2,4.46-7.2,8.5h13.44Z" fill="#fff" stroke="white" strokeWidth="1.2"/>
          <path d="M155.92,62.91h3.02v36h-3.02v-36Z" fill="#fff" stroke="white" strokeWidth="1.2"/>
          <path d="M39.33,123.01h3.31v15.03l15.07-15.03h4.32l-16.23,15.79,17.62,17.71h-4.56l-16.22-16.75v16.75h-3.31v-33.51Z" fill="#fff" stroke="white" strokeWidth="1.2"/>
          <path d="M67.88,120.51h3.02v36h-3.02v-36Z" fill="#fff" stroke="white" strokeWidth="1.2"/>
          <path d="M94.96,155.75c-2.11.86-4.85,1.34-7.1,1.34-8.11,0-11.14-5.47-11.14-12.82s4.13-12.82,10.32-12.82c6.91,0,9.75,5.57,9.75,12.14v1.54h-16.75c0,5.18,2.78,9.36,8.06,9.36,2.21,0,5.42-.91,6.87-1.82v3.07ZM93.47,142.54c0-4.27-1.73-8.5-6.24-8.5s-7.2,4.46-7.2,8.5h13.44Z" fill="#fff" stroke="white" strokeWidth="1.2"/>
          <path d="M105.57,125.5h-3.02v-4.03h3.02v4.03ZM102.54,132.03h3.02v24.48h-3.02v-24.48Z" fill="#fff" stroke="white" strokeWidth="1.2"/>
          <path d="M113.2,137.79c0-1.87,0-3.79-.19-5.76h2.93v4.37h.1c1.01-2.21,2.83-4.95,7.92-4.95,6.05,0,8.35,4.03,8.35,9.41v15.65h-3.02v-14.88c0-4.61-1.63-7.59-5.81-7.59-5.52,0-7.25,4.85-7.25,8.93v13.54h-3.02v-18.72Z" fill="#fff" stroke="white" strokeWidth="1.2"/>
        </g>

        {/* Ball (top layer) */}
        <g
          style={{
            transform: `translateX(${isRolled ? -180 : 0}px)`,
            transition: disableTransition ? 'none' : 'transform 0.8s ease-in-out'
          }}
        >
          <circle cx="290" cy="110" r="104" fill="#ff00a0"/>
        </g>

        {/* .design text (front layer) */}
        <g
          style={{
            transform: `translateX(${isRolled ? -180 : 0}px) rotate(${isRolled ? -90 : 0}deg)`,
            transformOrigin: '290px 110px',
            transition: disableTransition ? 'none' : 'transform 0.8s ease-in-out'
          }}
        >
          <path d="M230.04,68.45l2.75,2.75-2.85,2.85-2.75-2.75,2.85-2.85Z" fill="#fff" stroke="white" strokeWidth="1.2"/>
          <path d="M249.69,93.8l-2.14-2.14,2.75-2.75-.07-.07c-3.36,1.05-6.07.24-8.55-2.24-4.75-4.75-3.19-11.06,1.93-16.19,5.26-5.26,11.1-7.03,16.19-1.94,3.39,3.39,2.61,7.57,2.07,8.72l.07.07,11.07-11.07,2.14,2.14-25.46,25.46ZM243.85,85.11c3.8,3.8,9.2,1.05,12.36-2.11s5.91-8.55,2.1-12.36c-4.07-4.07-8.99-1.26-12.36,2.11-3.36,3.36-6.18,8.28-2.11,12.36Z" fill="#fff" stroke="white" strokeWidth="1.2"/>
          <path d="M267,110.03c-2.11-.88-4.38-2.48-5.97-4.07-5.74-5.73-4.01-11.74,1.19-16.94,5.29-5.3,11.98-6.14,16.36-1.77,4.89,4.89,2.95,10.83-1.7,15.48l-1.09,1.09-11.85-11.85c-3.67,3.66-4.65,8.59-.92,12.32,1.56,1.56,4.48,3.19,6.14,3.56l-2.17,2.17ZM275.28,99.64c3.02-3.02,4.79-7.23,1.6-10.42-3.16-3.16-8.25-1.93-11.1.92l9.5,9.5Z" fill="#fff" stroke="white" strokeWidth="1.2"/>
          <path d="M273.01,112.1c.65,1.94,1.76,3.94,3.43,5.6,2.04,2.04,4.96,2.72,6.93.75,4.11-4.11-4.86-11.78.17-16.8,3.43-3.43,7.5-1.93,10.36.92.92.92,2.54,2.95,3.49,5.06l-2.07,1.66c-.61-1.63-1.83-3.46-3.02-4.65-2.21-2.21-4.41-3.06-6.62-.85-3.22,3.22,5.7,11.34.04,17.01-3.67,3.67-8.35,1.5-10.96-1.12-1.66-1.66-3.12-3.53-4.04-5.67l2.31-1.9Z" fill="#fff" stroke="white" strokeWidth="1.2"/>
          <path d="M302.33,111.82l2.14,2.14-17.31,17.31-2.14-2.14,17.31-17.31ZM309.09,109.35l-2.14-2.14,2.85-2.85,2.14,2.14-2.85,2.85Z" fill="#fff" stroke="white" strokeWidth="1.2"/>
          <path d="M307.7,148.96c-4.82,4.82-10.93,6.59-16.87.64-2.27-2.27-3.7-4.99-4.31-6.14l2.31-1.97c.65,2,2,4.45,3.87,6.31,5.5,5.5,9.98,1.97,14.87-2.92l-.07-.07c-3.67,1.36-6.45.34-8.66-1.87-5.53-5.53-2.48-12.12,1.36-15.95,5.26-5.26,11.1-7.03,16.19-1.94,2.31,2.31,3.5,4.11,3.02,7.77l.07.07,1.97-1.97,2.14,2.14-15.89,15.89ZM300.7,141.15c3.87,3.87,8.93,1.6,12.08-1.56,4.18-4.18,6.01-8.45,2.11-12.36-4.07-4.07-8.99-1.26-12.36,2.1-3.39,3.39-5.46,8.18-1.83,11.81Z" fill="#fff" stroke="white" strokeWidth="1.2"/>
          <path d="M324.67,142.3c1.32-1.32,2.68-2.68,3.94-4.21l2.07,2.07-3.09,3.09.07.07c2.27-.85,5.5-1.49,9.1,2.11,4.28,4.28,3.05,8.76-.75,12.56l-11.06,11.06-2.14-2.14,10.52-10.52c3.26-3.26,4.21-6.52,1.26-9.47-3.9-3.9-8.55-1.7-11.44,1.19l-9.57,9.57-2.14-2.14,13.24-13.24Z" fill="#fff" stroke="white" strokeWidth="1.2"/>
        </g>
      </svg>
    </div>
  )
}
