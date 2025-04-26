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

  const themes = [
    { id: "dark", name: "Dark Nebula", color: "bg-cyan-500" },
    { id: "system", name: "System Theme", color: "bg-purple-500" },
    { id: "light", name: "Light Mode", color: "bg-amber-500" },
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
            className="absolute right-0 mt-2 w-48 bg-gray-900/90 backdrop-blur-sm border border-gray-800 rounded-md shadow-lg z-50"
          >
            <div className="p-2">
              <div className="text-xs text-gray-400 px-2 py-1">Select Theme</div>
              {themes.map((themeOption) => (
                <button
                  key={themeOption.id}
                  className={`w-full text-left px-2 py-1.5 rounded-md text-sm flex items-center gap-2 ${
                    theme === themeOption.id ? "bg-gray-800" : "hover:bg-gray-800/50"
                  }`}
                  onClick={() => selectTheme(themeOption.id)}
                >
                  <div className={`w-3 h-3 rounded-full ${themeOption.color}`}></div>
                  <span>{themeOption.name}</span>
                  {theme === themeOption.id && <span className="ml-auto text-xs text-cyan-400">Active</span>}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
