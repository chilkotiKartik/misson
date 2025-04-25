"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function InitializingAnimation() {
  const [text, setText] = useState("")
  const fullText = "Initializing Secure Mission..."
  const [glitchEffect, setGlitchEffect] = useState(false)

  useEffect(() => {
    let currentIndex = 0

    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(fullText.substring(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)

        // Start glitch effect after typing is complete
        const glitchInterval = setInterval(() => {
          setGlitchEffect((prev) => !prev)
        }, 500)

        return () => clearInterval(glitchInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [])

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 rounded-full border-4 border-cyan-500 opacity-20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div className="absolute inset-4 rounded-full border-4 border-r-cyan-500 border-t-transparent border-b-transparent border-l-transparent animate-spin animation-delay-500"></div>
            <div className="absolute inset-8 rounded-full border-4 border-b-cyan-500 border-r-transparent border-t-transparent border-l-transparent animate-spin animation-delay-1000"></div>
          </div>
        </motion.div>

        <motion.h1
          className={`text-3xl font-bold mb-4 text-cyan-400 ${glitchEffect ? "glitch-text" : ""}`}
          animate={{
            textShadow: glitchEffect
              ? [
                  "0 0 5px rgba(34, 211, 238, 0.7)",
                  "0 0 15px rgba(34, 211, 238, 0.5)",
                  "0 0 5px rgba(34, 211, 238, 0.7)",
                ]
              : "0 0 5px rgba(34, 211, 238, 0.7)",
          }}
          transition={{ duration: 0.2 }}
        >
          {text}
        </motion.h1>

        <motion.div
          className="flex justify-center space-x-2"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
          <div className="w-2 h-2 rounded-full bg-cyan-500 animation-delay-200"></div>
          <div className="w-2 h-2 rounded-full bg-cyan-500 animation-delay-400"></div>
        </motion.div>
      </div>
    </div>
  )
}
