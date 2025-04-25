"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Rocket, Mail, ChevronRight, Lock, Clock } from "lucide-react"
import { SpaceBackground } from "@/components/space-background"
import { EnhancedAvatarGenerator } from "@/components/enhanced-avatar-generator"
import { HolographicLogo } from "@/components/holographic-logo"

export default function InboxPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [showEmail, setShowEmail] = useState(false)
  const [typingComplete, setTypingComplete] = useState(false)
  const [username, setUsername] = useState("agent_nebula")
  const emailContentRef = useRef(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Show email after a short delay
      setTimeout(() => setShowEmail(true), 500)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Play sound effects
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isLoading && showEmail) {
        const audio = new Audio("/sounds/email-received.mp3")
        audio.volume = 0.3
        audio.play().catch((e) => console.log("Audio play failed:", e))
      }
    }
  }, [isLoading, showEmail])

  const handleAcceptMission = () => {
    // Play button sound
    const audio = new Audio("/sounds/mission-accept.mp3")
    audio.volume = 0.3
    audio.play().catch((e) => console.log("Audio play failed:", e))

    // Navigate to mission
    setTimeout(() => {
      router.push("/mission/round/1")
    }, 1000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <SpaceBackground />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 border-b border-gray-800/50">
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-cyan-400" />
          <span className="font-bold tracking-wider text-lg">MISSION DECRYPT</span>
        </div>
        <div className="flex items-center gap-3">
          <EnhancedAvatarGenerator seed={username} size={32} />
          <span className="text-sm font-medium hidden sm:inline">{username}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <Mail className="h-16 w-16 text-cyan-400 mx-auto" />
              </motion.div>
              <h2 className="mt-4 text-xl font-bold text-white">Accessing Secure Inbox...</h2>
              <p className="mt-2 text-gray-400">Establishing encrypted connection</p>
            </div>
          </div>
        ) : (
          <motion.div className="max-w-4xl mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                <Mail className="h-6 w-6 mr-2 text-cyan-400" />
                ISRO Secure Inbox
              </h1>
              <p className="text-gray-400 mt-1">Encrypted communications channel</p>
            </motion.div>

            <AnimatePresence>
              {showEmail && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-30"></div>
                    <Card className="relative bg-black/80 backdrop-blur-md border-gray-800 overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-800 bg-gray-900/50">
                        <Lock className="h-4 w-4 text-cyan-400" />
                        <div className="text-sm text-cyan-400 font-mono">ENCRYPTED TRANSMISSION</div>
                        <div className="ml-auto flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <div className="text-xs text-gray-400">
                            {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-1/4 flex flex-col items-center">
                            <HolographicLogo />
                            <div className="text-center mt-4">
                              <div className="text-xs text-gray-400">FROM:</div>
                              <div className="text-sm font-medium text-white">ISRO Cyber-Command HQ</div>
                            </div>
                          </div>

                          <div className="md:w-3/4">
                            <div className="mb-4">
                              <h2 className="text-xl font-bold text-white">
                                🔐 [TOP SECRET] Mission Decrypt - Codebreaking Assignment
                              </h2>
                              <div className="flex items-center gap-2 mt-2">
                                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                                <div className="text-xs text-gray-400">PRIORITY: URGENT</div>
                              </div>
                            </div>

                            <div
                              ref={emailContentRef}
                              className="prose prose-invert max-w-none font-mono text-sm leading-relaxed"
                            >
                              <TypewriterText
                                text={`Greetings Agent ${username},

You have been selected by ISRO's Cyber Division to decrypt mission-critical codes.

You will face 3 classified rounds:
  - Round 1: Indian Space History & Riddles
  - Round 2: Global Aviation & Aerospace Encryption
  - Round 3: World Pattern Recognition & Logic

Crack them all. Assemble the Final Password. Launch the Future.

Regards,
[ISRO Cyber-Command HQ]`}
                                speed={20}
                                onComplete={() => setTypingComplete(true)}
                              />
                            </div>

                            <div
                              className={`mt-8 transition-opacity duration-500 ${
                                typingComplete ? "opacity-100" : "opacity-0"
                              }`}
                            >
                              <Button
                                onClick={handleAcceptMission}
                                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:from-cyan-400 hover:to-blue-500 font-bold text-lg px-8 py-6 rounded-lg shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40 group w-full sm:w-auto"
                                disabled={!typingComplete}
                              >
                                ACCEPT MISSION
                                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  )
}

// Typewriter effect component
function TypewriterText({ text, speed = 50, onComplete = () => {} }) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  return (
    <div className="whitespace-pre-line">
      {displayedText}
      {currentIndex < text.length && <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse"></span>}
    </div>
  )
}
