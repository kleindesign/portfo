"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"

interface Chip {
  id: string
  label: string
  boxIndex: number
  rotation: number
  xOffset: number
  finalY: number
}

export default function AnimatedBoxes({ footerRef }: { footerRef?: React.RefObject<HTMLDivElement> }) {  const [visibleChips, setVisibleChips] = useState<Chip[]>([])
  const [currentChipIndex, setCurrentChipIndex] = useState(0)
  const [outroStage, setOutroStage] = useState(0)
  const [bouncingBox, setBouncingBox] = useState<number | null>(null)
  const [fallToBottom, setFallToBottom] = useState(false)
  
  const [startAnimation, setStartAnimation] = useState(false)
const isFooterInView = useInView(footerRef || null, { amount: 0.3 })
  useEffect(() => {
    const handleScroll = () => {
      // Start animation when user has scrolled 200px down
      if (window.scrollY > 200 && !startAnimation) {
        setStartAnimation(true)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [startAnimation])

  // Trigger fall to bottom when footer comes into view
  useEffect(() => {
    if (isFooterInView && !fallToBottom) {
      setFallToBottom(true)
    }
  }, [isFooterInView, fallToBottom])

  const boxes = [
    { label: "PRODUCTS", rotation: -4 },
    { label: "PLACES", rotation: 3 },
    { label: "SYSTEMS", rotation: -5 },
  ]

  const chipsByBox = {
    PRODUCTS: [
      "UX/UI design",
      "Product design",
      "User research",
      "Prototyping",
      "Data visualization",
      "Automation design",
    ],
    PLACES: [
      "Wayfinding",
      "Environmental graphics",
      "Exhibitions",
      "Print",
      "Place-based activation",
    ],
    SYSTEMS: [
      "Brand strategy",
      "Visual systems",
      "Design systems",
      "Facilitation",
      "Community engagement",
      "Civic tech",
    ],
  }

  // Generate all chips data upfront
  const allChips: Chip[] = []
  boxes.forEach((box, boxIndex) => {
    const boxChips = chipsByBox[box.label as keyof typeof chipsByBox]
    boxChips.forEach((label, chipIndex) => {
      allChips.push({
        id: `${boxIndex}-${chipIndex}`,
        label,
        boxIndex,
        rotation: Math.random() < 0.3 
          ? -(Math.random() * 90 + 15)
          : Math.random() * 105 - 15,
        xOffset: Math.random() * 40 - 20,
        finalY: -50 + (chipIndex * 16),
      })
    })
  })

  // Drop chips one at a time ONLY when animation starts
  useEffect(() => {
    if (startAnimation && currentChipIndex < allChips.length) {
      const timer = setTimeout(() => {
        setVisibleChips((prev) => [...prev, allChips[currentChipIndex]])
        setCurrentChipIndex((prev) => prev + 1)
      }, 500)

      return () => clearTimeout(timer)
    } else if (startAnimation && currentChipIndex === allChips.length && outroStage < 4) {
      const outroTimer = setTimeout(() => {
        setOutroStage((prev) => prev + 1)
      }, 800)
      return () => clearTimeout(outroTimer)
    }
  }, [startAnimation, currentChipIndex, allChips.length, outroStage])

  const handleBoxClick = (boxIndex: number) => {
    if (fallToBottom) return // Don't bounce if already falling
    setBouncingBox(boxIndex)
    setTimeout(() => setBouncingBox(null), 1200)
  }

  const outroParagraphs = [
    "So yes, I work across boxes. But here's what connects it all:",
    "I start by listening—to people, context, what's actually needed. I design with communities and ecosystems, not just for them. I bring rigor and care to making ideas real.",
    "From printshops to planning studios, cultural institutions to climate dashboards—each project taught me something about craft, collaboration, or how living systems thrive.",
    "Outside the box? That's where the impact happens.",
  ]

  return (
    <div className="relative px-0 py-0">
      {/* INTRO SECTION */}
      <div className="max-w-4xl mx-auto mb-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-black">
          Don't put me<br/> in a box.
        </h1>
        <div className="text-lg text-gray-800 space-y-4">
          <p>
            I'm a creative who connects disciplines, a designer who thinks in systems, 
            someone who's spent decades learning how cities work across three countries 
            and countless contexts.
          </p>
          <p className="font-medium">But if we need labels? Here's what I bring:</p>
        </div>
      </div>

      {/* SCROLL TRIGGER POINT */}
      <div className="min-h-[230px] relative">
        {/* BOXES SECTION */}
        <div className="flex justify-center items-end gap-8 relative">
          {boxes.map((box, boxIndex) => (
            <motion.div
              key={box.label}
              className="relative cursor-pointer"
              onClick={() => handleBoxClick(boxIndex)}
              animate={
                fallToBottom
                  ? {
                      y: 1000, // Fall way down
                      rotate: Math.random() * 60 - 30, // Random rotation
                      x: Math.random() * 200 - 100, // Random horizontal spread
                    }
                  : { y: 0, rotate: 0, x: 0 }
              }
              transition={
                fallToBottom
                  ? {
                      delay: boxIndex * 0.15, // Stagger boxes
                      duration: 1.5,
                      ease: "easeIn",
                    }
                  : {}
              }
            >
              {/* Box SVG */}
              <div className="relative w-[200px]">
                <img
                  src="https://raw.githubusercontent.com/kleindesign/portfo/main/open-box.svg"
                  alt={`${box.label} box`}
                  className="w-full h-auto relative z-10"
                />
                {/* Label on box */}
                <div
                  className="absolute top-[55%] left-1/2 z-20 text-xs font-bold tracking-wider text-black px-2 py-1 bg-white/90 border border-black"
                  style={{
                    transform: `translateX(-50%) rotate(${box.rotation}deg)`,
                  }}
                >
                  {box.label}
                </div>
              </div>

              {/* Chips container */}
              <div className="absolute top-0 left-0 w-full h-[160px]">
                <AnimatePresence>
                  {visibleChips
                    .filter((chip) => chip.boxIndex === boxIndex)
                    .map((chip, chipIdx) => (
                      <motion.div
                        key={chip.id}
                        initial={{ 
                          y: -1000,
                          opacity: 0 
                        }}
                        animate={{
                          y: fallToBottom
                            ? 500 // Fall to bottom
                            : bouncingBox === boxIndex 
                              ? [
                                  chip.finalY,
                                  chip.finalY - 100,
                                  chip.finalY - 100,
                                  chip.finalY - 80,
                                  chip.finalY
                                ]
                              : chip.finalY,
                          x: fallToBottom
                            ? Math.random() * 300 - 150 // Spread randomly
                            : bouncingBox === boxIndex
                              ? [0, chip.xOffset * 2.5, chip.xOffset * 2.5, chip.xOffset * 1.5, 0]
                              : 0,
                          opacity: 1,
                          rotate: fallToBottom
                            ? Math.random() * 180 - 90 // Random rotation
                            : chip.rotation,
                        }}
                        transition={{
                          y: fallToBottom
                            ? {
                                delay: (boxIndex * 6 + chipIdx) * 0.08, // Stagger each chip
                                duration: 1.2,
                                ease: "easeIn",
                              }
                            : bouncingBox === boxIndex 
                              ? { duration: 1.2, times: [0, 0.3, 0.5, 0.7, 1], ease: "easeOut" }
                              : { duration: 1.2, ease: "easeOut" },
                          x: fallToBottom
                            ? { delay: (boxIndex * 6 + chipIdx) * 0.08, duration: 1.2 }
                            : bouncingBox === boxIndex
                              ? { duration: 1.2, times: [0, 0.3, 0.5, 0.7, 1] }
                              : { duration: 1.2 },
                          opacity: { duration: 0.3 },
                          rotate: fallToBottom
                            ? { delay: (boxIndex * 6 + chipIdx) * 0.08, duration: 1.2 }
                            : { duration: 1.2 }
                        }}
                        className="absolute px-3 py-1 rounded-full text-xs whitespace-nowrap"
                        style={{
                          left: `calc(50% + ${chip.xOffset}px - 50px)`,
                          border: "1.5px solid #ff00a0",
                          color: "#ff00a0",
                          backgroundColor: "white",
                          zIndex: 5,
                        }}
                      >
                        {chip.label}
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* OUTRO SECTION */}
      <div className="max-w-2xl mx-auto space-y-6 text-lg text-gray-800 mt-0">
        {outroParagraphs.map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: index < outroStage ? 1 : 0,
              y: index < outroStage ? 0 : 20,
            }}
            transition={{ duration: 0.6 }}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

    </div>
  )
}
