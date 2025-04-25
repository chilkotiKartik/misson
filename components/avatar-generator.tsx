"use client"

import { useMemo } from "react"

interface AvatarGeneratorProps {
  seed: string
  size?: number
}

export function AvatarGenerator({ seed, size = 40 }: AvatarGeneratorProps) {
  // Generate a deterministic color based on the seed
  const backgroundColor = useMemo(() => {
    const colors = [
      "bg-emerald-500",
      "bg-cyan-500",
      "bg-purple-500",
      "bg-amber-500",
      "bg-rose-500",
      "bg-indigo-500",
      "bg-blue-500",
      "bg-pink-500",
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
    <div
      className={`rounded-full ${backgroundColor} flex items-center justify-center text-black font-bold`}
      style={{ width: `${size}px`, height: `${size}px`, fontSize: `${size / 2.5}px` }}
    >
      {initials}
    </div>
  )
}
