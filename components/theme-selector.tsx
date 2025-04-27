"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Palette } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Simplified to just one theme - "cosmic"
  const themes = [
    { id: "cosmic", name: "Cosmic Theme", color: "bg-purple-500", description: "Default space theme" },
    { id: "system", name: "System Theme", color: "bg-gray-500", description: "Follows your system preference" },
  ]

  const toggleOpen = () => {
    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))

    setIsOpen(!isOpen)
  }

  const selectTheme = (themeId: string) => {
    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))

    setTheme(themeId)
    setIsOpen(false)
  }

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="border-gray-700 text-gray-300 hover:bg-gray-800">
        <Palette className="h-4 w-4" />
        <span className="sr-only">Theme</span>
      </Button>
    )
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        className="border-gray-700 text-gray-300 hover:bg-gray-800"
        onClick={toggleOpen}
      >
        <Palette className="h-4 w-4" />
        <span className="sr-only">Theme</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-gray-900/90 backdrop-blur-sm border border-gray-800 rounded-md shadow-lg z-50"
          >
            <div className="p-2">
              <div className="text-xs text-gray-400 px-2 py-1 mb-1">Select Theme</div>
              <div className="max-h-[300px] overflow-y-auto pr-1 space-y-1">
                {themes.map((themeOption) => (
                  <button
                    key={themeOption.id}
                    className={`w-full text-left px-2 py-2 rounded-md text-sm flex items-center gap-2 ${
                      theme === themeOption.id ? "bg-gray-800" : "hover:bg-gray-800/50"
                    }`}
                    onClick={() => selectTheme(themeOption.id)}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${themeOption.color} ${themeOption.id === "light" ? "border border-gray-400" : ""}`}
                    ></div>
                    <div>
                      <div>{themeOption.name}</div>
                      <div className="text-xs text-gray-400">{themeOption.description}</div>
                    </div>
                    {theme === themeOption.id && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto text-xs text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full"
                      >
                        Active
                      </motion.span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
