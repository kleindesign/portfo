"use client"

import { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import Matter from "matter-js"

interface Box {
  label: string
  rotation: number
}

interface Chip {
  id: string
  label: string
  rotation: number
}

interface PhysicsSpillProps {
  isActive: boolean
  shouldReset: boolean
  boxes: Box[]
  chips: Chip[]
}

interface PhysicsBody {
  body: Matter.Body
  elem: HTMLDivElement
  label: string
  type: 'box' | 'chip'
  labelRotation: number
}

export default function PhysicsSpill({ isActive, shouldReset, boxes, chips }: PhysicsSpillProps) {
  const engineRef = useRef<Matter.Engine | null>(null)
  const bodiesRef = useRef<PhysicsBody[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    if (shouldReset) {
      // Full cleanup when resetting
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current)
        Matter.World.clear(engineRef.current.world, false)
        engineRef.current = null
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = undefined
      }
      bodiesRef.current.forEach(pb => {
        if (pb.elem && pb.elem.parentNode) {
          pb.elem.parentNode.removeChild(pb.elem)
        }
      })
      bodiesRef.current = []
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
      return
    }

    if (!isActive || engineRef.current) {
      return
    }

    // Initialize Matter.js engine (headless — no renderer)
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1.5 }  // Stronger gravity for faster fall
    })
    engineRef.current = engine

    // Get container dimensions for physics boundaries
    const containerWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800

    // Create ground (invisible floor for items to bounce on)
    // Position it just below the current viewport, in the visible scroll area
    const ground = Matter.Bodies.rectangle(
      containerWidth / 2,
      viewportHeight - 200,  // 200px from bottom of current viewport
      containerWidth * 2,
      60,  // Thinner ground
      {
        isStatic: true,
        restitution: 0.6,  // Bouncy ground
        friction: 0.3
      }
    )
    Matter.World.add(engine.world, ground)

    // Create walls (keep items on screen)
    const leftWall = Matter.Bodies.rectangle(-50, viewportHeight / 2, 100, viewportHeight * 3, { isStatic: true })
    const rightWall = Matter.Bodies.rectangle(containerWidth + 50, viewportHeight / 2, 100, viewportHeight * 3, { isStatic: true })
    Matter.World.add(engine.world, [leftWall, rightWall])

    const newBodies: PhysicsBody[] = []

    // Create box bodies
    boxes.forEach((box, i) => {
      const elem = document.createElement('div')
      elem.className = 'absolute'
      elem.style.width = '200px'
      elem.style.zIndex = String(10 + i)

      // Box SVG content
      elem.innerHTML = `
        <img src="/images/open-box.svg" alt="${box.label} box" class="w-full h-auto" />
        <div class="absolute top-[55%] left-1/2 text-xs font-bold tracking-wider text-black px-2 py-1 bg-white/90 border border-black"
          style="transform: translateX(-50%) rotate(${box.rotation}deg);">
          ${box.label}
        </div>
      `

      // Starting position: spread across top of viewport, well above screen top
      const startX = (containerWidth / (boxes.length + 1)) * (i + 1)
      const startY = -600 - (i * 80)  // Staggered start heights, starting well above viewport

      const body = Matter.Bodies.rectangle(startX, startY, 200, 150, {
        restitution: 0.5,  // Medium bounce
        friction: 0.3,
        density: 0.001,  // Light so they float down nicely
        angle: (Math.random() - 0.5) * 0.3  // Slight initial rotation
      })

      Matter.World.add(engine.world, body)
      newBodies.push({ body, elem, label: box.label, type: 'box', labelRotation: box.rotation })
    })

    // Create chip bodies
    chips.forEach((chip, i) => {
      const elem = document.createElement('div')
      elem.className = 'absolute px-3 py-1 rounded-full text-xs whitespace-nowrap'
      elem.style.border = '1.5px solid #ff00a0'
      elem.style.color = '#ff00a0'
      elem.style.backgroundColor = 'white'
      elem.style.zIndex = String(20 + i)
      elem.style.cursor = 'pointer'
      elem.textContent = chip.label

      // Measure the actual rendered chip size (approximate based on text length)
      const chipWidth = Math.max(60, chip.label.length * 6 + 24)  // Rough estimate
      const chipHeight = 28

      // Starting position: random across top, well above screen top
      const startX = Math.random() * (containerWidth - 100) + 50
      const startY = -400 - (i * 40) - Math.random() * 300  // Staggered, randomized, starting well above viewport

      const body = Matter.Bodies.rectangle(startX, startY, chipWidth, chipHeight, {
        restitution: 0.7,  // More bouncy than boxes
        friction: 0.2,
        density: 0.0005,  // Very light
        angle: (Math.random() - 0.5) * 0.5
      })

      Matter.World.add(engine.world, body)
      newBodies.push({ body, elem, label: chip.label, type: 'chip', labelRotation: chip.rotation })

      // Click handler: apply upward force
      elem.addEventListener('click', () => {
        const forceMagnitude = 0.03
        Matter.Body.applyForce(body, body.position, {
          x: (Math.random() - 0.5) * forceMagnitude * 0.5,
          y: -forceMagnitude
        })
      })
    })

    bodiesRef.current = newBodies

    // Append all elements to container
    if (containerRef.current) {
      newBodies.forEach(pb => containerRef.current!.appendChild(pb.elem))
    }

    // Animation loop
    const render = () => {
      Matter.Engine.update(engine, 1000 / 60)

      bodiesRef.current.forEach(pb => {
        const { x, y } = pb.body.position
        const angle = pb.body.angle

        // Apply physics position/rotation to DOM element
        pb.elem.style.left = `${x}px`
        pb.elem.style.top = `${y}px`
        pb.elem.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`
      })

      animationFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      Matter.Engine.clear(engine)
      Matter.World.clear(engine.world, false)
    }
  }, [isActive, shouldReset, isMounted])

  if (!isMounted || !isActive || typeof window === 'undefined') return null

  const target = document.getElementById('spill-target')
  if (!target) return null

  return ReactDOM.createPortal(
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '0px',
        overflow: 'visible'
      }}
    />,
    target
  )
}
