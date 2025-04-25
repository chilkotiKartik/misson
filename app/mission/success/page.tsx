"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { RocketLaunch } from "@/components/rocket-launch"
import { Share2, Download, Trophy, Home } from "lucide-react"
import { SpaceBackground } from "@/components/space-background"
import { SecretBoxReveal } from "@/components/secret-box-reveal"
import { MissionRecap } from "@/components/mission-recap"

export default function SuccessPage() {
  const [animationComplete, setAnimationComplete] = useState(false)
  const [showSecretBox, setShowSecretBox] = useState(false)
  const [showRecap, setShowRecap] = useState(false)

  useEffect(() => {
    // Play launch sound
    const audio = new Audio("/sounds/rocket-launch.mp3")
    audio.volume = 0.3
    audio.play().catch((e) => console.log("Audio play failed:", e))

    // Simulate animation completion after 5 seconds
    const timer = setTimeout(() => {
      setAnimationComplete(true)

      // Play success sound
      const successAudio = new Audio("/sounds/mission-complete.mp3")
      successAudio.volume = 0.3
      successAudio.play().catch((e) => console.log("Audio play failed:", e))
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleDownloadBadge = () => {
    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))
  }

  const handleShare = () => {
    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))
  }

  const toggleSecretBox = () => {
    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))

    setShowSecretBox(!showSecretBox)
  }

  const toggleRecap = () => {
    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))

    setShowRecap(!showRecap)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <SpaceBackground roundTheme="emerald" />

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Rocket Launch Animation */}
        <div className="w-full h-[60vh] relative mb-8">
          <RocketLaunch />
        </div>

        {/* Success Message */}
        <div className={`transition-opacity duration-1000 ${animationComplete ? "opacity-100" : "opacity-0"}`}>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl blur opacity-30"></div>
            <Card className="relative bg-black/80 backdrop-blur-md border-gray-800 max-w-2xl mx-auto">
              <CardContent className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6"
                >
                  <Trophy className="h-10 w-10 text-emerald-400" />
                </motion.div>

                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold mb-4 text-white"
                >
                  YOU SAVED THE SIGNAL!
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-xl text-gray-300 mb-8"
                >
                  Welcome to the Hall of ISRO Agents
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="p-6 bg-black/40 rounded-lg border border-emerald-500/20 mb-8"
                >
                  <h2 className="text-lg font-bold mb-2 text-emerald-400">Mission Stats</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Time</p>
                      <p className="text-xl font-mono">04:32</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Rank</p>
                      <p className="text-xl font-bold text-amber-400">Commander</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400">XP Earned</p>
                      <p className="text-xl">+250</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Leaderboard</p>
                      <p className="text-xl">#1</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button
                    className="bg-gradient-to-r from-emerald-500 to-blue-600 text-black hover:from-emerald-400 hover:to-blue-500"
                    onClick={handleDownloadBadge}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Badge
                  </Button>
                  <Button
                    variant="outline"
                    className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
                    onClick={handleShare}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Achievement
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="mt-6 flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button
                    variant="ghost"
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                    onClick={toggleSecretBox}
                  >
                    Open Secret Box
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                    onClick={toggleRecap}
                  >
                    View Mission Recap
                  </Button>
                </motion.div>
              </CardContent>
              <CardFooter className="border-t border-gray-800 p-6 flex justify-center">
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-white hover:text-emerald-400 hover:bg-black/20">
                    <Home className="mr-2 h-4 w-4" />
                    Return to Dashboard
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      {/* Secret Box Modal */}
      <SecretBoxReveal open={showSecretBox} onClose={() => setShowSecretBox(false)} />

      {/* Mission Recap Drawer */}
      <MissionRecap open={showRecap} onClose={() => setShowRecap(false)} />
    </div>
  )
}
