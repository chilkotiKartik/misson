"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Palette } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState("dark-nebula")

  const themes = [
    { id: "dark-nebula", name: "Dark Nebula", color: "bg-cyan-500" },
    { id: "electric-blue", name: "Electric Blue", color: "bg-blue-500" },
    { id: "infrared-matrix", name: "Infrared Matrix", color: "bg-purple-500" },
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

    setSelectedTheme(themeId)
    setIsOpen(false)

    // In a real app, this would apply the theme
    // For now, we'll just store the selection
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
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  className={`w-full text-left px-2 py-1.5 rounded-md text-sm flex items-center gap-2 ${
                    selectedTheme === theme.id ? "bg-gray-800" : "hover:bg-gray-800/50"
                  }`}
                  onClick={() => selectTheme(theme.id)}
                >
                  <div className={`w-3 h-3 rounded-full ${theme.color}`}></div>
                  <span>{theme.name}</span>
                  {selectedTheme === theme.id && <span className="ml-auto text-xs text-cyan-400">Active</span>}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
