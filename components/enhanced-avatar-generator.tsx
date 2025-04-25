"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"

interface EnhancedAvatarGeneratorProps {
  seed: string
  size?: number
  animated?: boolean
}

export function EnhancedAvatarGenerator({ seed, size = 40, animated = true }: EnhancedAvatarGeneratorProps) {
  // Generate a deterministic color based on the seed
  const avatarStyle = useMemo(() => {
    const colors = [
      { bg: "bg-cyan-500", text: "text-black", glow: "cyan" },
      { bg: "bg-purple-500", text: "text-black", glow: "purple" },
      { bg: "bg-emerald-500", text: "text-black", glow: "emerald" },
      { bg: "bg-amber-500", text: "text-black", glow: "amber" },
      { bg: "bg-blue-500", text: "text-black", glow: "blue" },
      { bg: "bg-pink-500", text: "text-black", glow: "pink" },
    ]

    // Simple hash function to get a consistent index
    let hash = 0
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i)
      hash = hash & hash
    }

    const index = Math.abs(hash) % colors.length
    return colors[index]
  }, [seed])

  // Generate initials from the seed
  const initials = useMemo(() => {
    if (!seed) return "?"

    // If seed contains underscores or hyphens, use them to split
    if (seed.includes("_") || seed.includes("-")) {
      const parts = seed.split(/[_-]/)
      return parts
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("")
    }

    // Otherwise, use the first two characters
    return seed.slice(0, 2).toUpperCase()
  }, [seed])

  return (
    <motion.div
      className={`rounded-full ${avatarStyle.bg} flex items-center justify-center ${avatarStyle.text} relative`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size / 2.5}px`,
        boxShadow: `0 0 ${size / 10}px rgba(var(--${avatarStyle.glow}-500), 0.5)`,
      }}
      whileHover={animated ? { scale: 1.05 } : {}}
      animate={
        animated
          ? {
              y: [0, -3, 0],
              transition: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              },
            }
          : {}
      }
    >
      {initials}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      )}
    </motion.div>
  )
}
