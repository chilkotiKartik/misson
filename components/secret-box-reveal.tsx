"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Gift, Award } from "lucide-react"

interface SecretBoxRevealProps {
  open: boolean
  onClose: () => void
}

export function SecretBoxReveal({ open, onClose }: SecretBoxRevealProps) {
  const [isOpening, setIsOpening] = useState(false)
  const [isOpened, setIsOpened] = useState(false)

  const quotes = [
    "The universe speaks in codes. Are you listening?",
    "In the vastness of space, your mission made a difference.",
    "Stars are just distant suns, but your achievement shines brighter.",
    "The greatest codebreakers see patterns where others see chaos.",
    "Your mission was not just about decryption, but about connection.",
  ]

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  const handleOpenBox = () => {
    // Play sound
    const audio = new Audio("/sounds/box-open.mp3")
    audio.volume = 0.3
    audio.play().catch((e) => console.log("Audio play failed:", e))

    setIsOpening(true)
    setTimeout(() => {
      setIsOpened(true)
    }, 1500)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-gray-900/90 backdrop-blur-md border border-gray-800 rounded-lg max-w-md w-full"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Secret Box</h3>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-col items-center justify-center py-8">
                {!isOpened ? (
                  <>
                    <motion.div
                      className="relative w-32 h-32 mb-6"
                      animate={isOpening ? { rotateY: 360, scale: [1, 1.1, 0] } : {}}
                      transition={{ duration: 1.5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-purple-600/20 rounded-lg blur-lg"></div>
                      <div className="relative w-full h-full bg-gray-800 border-2 border-amber-500/50 rounded-lg flex items-center justify-center">
                        <Gift className="h-12 w-12 text-amber-400" />
                      </div>
                    </motion.div>

                    <p className="text-gray-300 mb-6 text-center">
                      A special reward awaits you for completing the mission.
                    </p>

                    <Button
                      className="bg-gradient-to-r from-amber-500 to-purple-600 text-black hover:from-amber-400 hover:to-purple-500"
                      onClick={handleOpenBox}
                      disabled={isOpening}
                    >
                      {isOpening ? "Opening..." : "Open Box"}
                    </Button>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center">
                      <Award className="h-8 w-8 text-white" />
                    </div>

                    <h4 className="text-xl font-bold text-white mb-2">Mission Certificate Unlocked!</h4>

                    <div className="bg-black/30 border border-gray-800 rounded-lg p-4 mb-6">
                      <p className="text-amber-400 italic mb-4">"{randomQuote}"</p>
                      <p className="text-gray-300">
                        You've earned a special certificate for your achievement. It will be available for download on
                        the next screen.
                      </p>
                    </div>

                    <Button
                      className="bg-gradient-to-r from-amber-500 to-purple-600 text-black hover:from-amber-400 hover:to-purple-500"
                      onClick={onClose}
                    >
                      View Certificate
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
