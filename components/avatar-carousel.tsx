"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AvatarGenerator } from "@/components/avatar-generator"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function AvatarCarousel() {
  const [avatars, setAvatars] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // Generate random avatar seeds
    const seeds = Array.from({ length: 10 }, () => Math.random().toString(36).substring(2, 8))
    setAvatars(seeds)
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? avatars.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === avatars.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="flex items-center justify-center gap-4 md:gap-8">
        <Button
          variant="outline"
          size="icon"
          className="border-gray-700 text-gray-300 hover:bg-gray-800"
          onClick={handlePrev}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous avatar</span>
        </Button>

        <div className="flex overflow-hidden">
          {avatars.map((seed, index) => (
            <div
              key={seed}
              className={`transition-all duration-300 flex-shrink-0 w-full ${
                index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 blur-lg"></div>
                  <AvatarGenerator seed={seed} size={180} />
                </div>
                <p className="mt-4 text-gray-400 text-sm">Agent #{index + 1}</p>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="border-gray-700 text-gray-300 hover:bg-gray-800"
          onClick={handleNext}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next avatar</span>
        </Button>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {avatars.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-emerald-500" : "bg-gray-700"}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
