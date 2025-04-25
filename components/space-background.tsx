"use client"

import { useEffect, useRef } from "react"

interface SpaceBackgroundProps {
  roundTheme?: string
}

export function SpaceBackground({ roundTheme = "cyan" }: SpaceBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Star properties
    const stars: { x: number; y: number; radius: number; speed: number; opacity: number }[] = []
    const starCount = Math.floor((window.innerWidth * window.innerHeight) / 2000)

    // Get theme color
    const getThemeColor = () => {
      switch (roundTheme) {
        case "cyan":
          return { r: 34, g: 211, b: 238 } // cyan-400
        case "purple":
          return { r: 192, g: 132, b: 252 } // purple-400
        case "emerald":
          return { r: 52, g: 211, b: 153 } // emerald-400
        case "amber":
          return { r: 251, g: 191, b: 36 } // amber-400
        case "blue":
          return { r: 96, g: 165, b: 250 } // blue-400
        default:
          return { r: 34, g: 211, b: 238 } // cyan-400
      }
    }

    const themeColor = getThemeColor()

    // Create stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.05,
        opacity: Math.random(),
      })
    }

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()

        // Move stars
        star.y += star.speed

        // Reset stars that go off screen
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      // Draw nebula-like effects
      for (let i = 0; i < 3; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 100 + 50

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, `rgba(${themeColor.r}, ${themeColor.g}, ${themeColor.b}, 0.03)`)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [roundTheme])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 bg-black" />
}
