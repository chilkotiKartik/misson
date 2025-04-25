"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Rocket, ChevronRight, Shield, Brain, Trophy, Zap } from "lucide-react"
import { InitializingAnimation } from "@/components/initializing-animation"
import { SpaceBackground } from "@/components/space-background"
import { MissionCountdown } from "@/components/mission-countdown"
import { ThemeSelector } from "@/components/theme-selector"

export default function Home() {
  const [isInitializing, setIsInitializing] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Simulate initialization sequence
    const timer = setTimeout(() => {
      setIsInitializing(false)
      // Add a small delay before showing content for smoother transition
      setTimeout(() => setShowContent(true), 300)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  // Play terminal typing sound effect
  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio("/sounds/terminal-typing.mp3")
      audio.volume = 0.3
      audio.play().catch((e) => console.log("Audio play failed:", e))
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
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
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <SpaceBackground />

      {isInitializing ? (
        <InitializingAnimation />
      ) : (
        <div className={`transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}>
          {/* Header */}
          <header className="relative z-10 flex items-center justify-between p-4 md:p-6">
            <div className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-cyan-400" />
              <span className="font-bold tracking-wider text-lg">MISSION DECRYPT</span>
            </div>
            <div className="flex gap-2 md:gap-4">
              <ThemeSelector />
              <Link href="/auth/login">
                <Button variant="outline" size="sm" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                  Login
                </Button>
              </Link>
            </div>
          </header>

          {/* Hero Section */}
          <motion.section
            className="relative z-10 flex flex-col items-center justify-center px-4 py-12 md:py-20 text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              className="absolute top-0 left-0 right-0 w-full flex justify-center overflow-hidden"
              variants={itemVariants}
            >
              <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
              variants={itemVariants}
            >
              MISSION DECRYPT
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              You've been selected for a top-secret ISRO mission to decrypt codes that could save humanity.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Link href="/auth/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:from-cyan-400 hover:to-blue-500 font-bold text-lg px-8 py-6 rounded-lg shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40 group"
                >
                  BEGIN MISSION
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="mt-16 w-full max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <MissionCountdown />
            </motion.div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            className="relative z-10 py-16 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-white">Your Mission Awaits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <FeatureCard
                icon={<Shield className="h-8 w-8 text-cyan-400" />}
                title="Secure Briefings"
                description="Receive top-secret mission briefings directly from ISRO HQ"
                delay={0}
              />
              <FeatureCard
                icon={<Brain className="h-8 w-8 text-purple-400" />}
                title="Multi-Round Challenges"
                description="Face increasingly difficult cryptography puzzles across 3 rounds"
                delay={0.1}
              />
              <FeatureCard
                icon={<Trophy className="h-8 w-8 text-amber-400" />}
                title="Agent Rankings"
                description="Compete with other agents on the global leaderboard"
                delay={0.2}
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-emerald-400" />}
                title="Unlock Secrets"
                description="Crack the final code to trigger the mission launch sequence"
                delay={0.3}
              />
            </div>
          </motion.section>

          {/* Mission Preview */}
          <motion.section
            className="relative z-10 py-16 px-4 bg-gradient-to-b from-transparent to-blue-950/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">Mission Preview</h2>

              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-25"></div>
                <div className="relative bg-black/60 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-800">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-gray-400">ISRO MISSION TERMINAL</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
                      <div className="font-mono text-cyan-400 text-sm">MISSION_DECRYPT &gt; BRIEFING</div>
                    </div>

                    <div className="font-mono text-sm text-gray-300 terminal-text max-w-3xl mx-auto">
                      <p className="mb-4">
                        ATTENTION AGENT: You have been selected for a critical mission by ISRO Cyber Command.
                      </p>
                      <p className="mb-4">
                        Your task is to decrypt a series of codes that will unlock a vital satellite communication
                        system.
                      </p>
                      <p className="mb-4">You will face three rounds of increasingly difficult challenges:</p>
                      <ul className="list-disc list-inside mb-4 space-y-2 pl-4">
                        <li>Round 1: Indian Space History & Riddles</li>
                        <li>Round 2: Global Aviation & Aerospace Encryption</li>
                        <li>Round 3: Pattern Recognition & Logic</li>
                      </ul>
                      <p>Your answers will form the final decryption code. The future depends on your success.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link href="/auth/login">
                  <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                    Accept the Mission
                  </Button>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Footer */}
          <footer className="relative z-10 py-8 px-4 border-t border-gray-800">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-400 text-sm">
                  &copy; {new Date().getFullYear()} Mission Decrypt. All rights reserved.
                </p>
              </div>
              <div className="text-gray-400 text-sm italic">"The universe speaks in codes. Are you listening?"</div>
            </div>
          </footer>
        </div>
      )}
    </div>
  )
}

function FeatureCard({ icon, title, description, delay = 0 }) {
  return (
    <motion.div
      className="bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-gray-800 hover:border-cyan-500/30 transition-all hover:shadow-lg hover:shadow-cyan-500/5 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + 1.5, duration: 0.5 }}
    >
      <div className="mb-4 transform transition-transform group-hover:scale-110 group-hover:-rotate-3">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}
