"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SpaceBackground } from "@/components/space-background"
import { RocketLaunch } from "@/components/rocket-launch"
import { MissionRecap } from "@/components/mission-recap"
import { SecretBoxReveal } from "@/components/secret-box-reveal"
import { MissionCertificate } from "@/components/mission-certificate"
import { HolographicLogo } from "@/components/holographic-logo"
import { Trophy, Home, ArrowRight, Award } from "lucide-react"
import Link from "next/link"

export default function MissionSuccessPage() {
  const router = useRouter()
  const [showRecap, setShowRecap] = useState(false)
  const [showSecretBox, setShowSecretBox] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)
  const [missionStats, setMissionStats] = useState({
    username: "agent_nebula",
    completionDate: new Date().toLocaleDateString(),
    score: 850,
    timeElapsed: "18:42",
    passwordParts: ["L", "A", "U", "N", "C", "H"],
  })

  useEffect(() => {
    // Play success sound
    const audio = new Audio("/sounds/mission-complete.mp3")
    audio.volume = 0.3
    audio.play().catch((e) => console.log("Audio play failed:", e))

    // Show recap after delay
    const recapTimer = setTimeout(() => {
      setShowRecap(true)
    }, 5000)

    return () => clearTimeout(recapTimer)
  }, [])

  const handleViewCertificate = () => {
    setShowSecretBox(false)

    // Play sound
    const audio = new Audio("/sounds/success-chime.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))

    setTimeout(() => {
      setShowCertificate(true)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <SpaceBackground roundTheme="amber" />

      <header className="relative z-10 border-b border-gray-800 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <HolographicLogo size={40} />
            <div className="ml-3">
              <h1 className="text-xl font-bold">Mission Decrypt</h1>
              <p className="text-sm text-gray-400">Mission Complete</p>
            </div>
          </div>
          <Link href="/">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <Home className="h-4 w-4 mr-2" />
              Return Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        {!showCertificate ? (
          <div className="flex flex-col items-center justify-center h-full">
            <RocketLaunch />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-center mt-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-400">Mission Accomplished!</h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Congratulations, Agent! You've successfully decrypted all codes and completed Mission Decrypt.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.5 }}
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500"
                  onClick={() => setShowSecretBox(true)}
                >
                  <Trophy className="h-5 w-5 mr-2" />
                  Claim Your Reward
                </Button>
                <Button
                  variant="outline"
                  className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
                  onClick={() => router.push("/leaderboard")}
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  View Leaderboard
                </Button>
              </motion.div>
            </motion.div>
          </div>
        ) : (
          <div className="py-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-8">
              <Award className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-amber-400">Mission Certificate</h1>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Your achievement has been recognized. Here's your official Mission Decrypt certificate.
              </p>
            </motion.div>

            <MissionCertificate
              username={missionStats.username}
              completionDate={missionStats.completionDate}
              score={missionStats.score}
              timeElapsed={missionStats.timeElapsed}
            />

            <div className="mt-8 text-center">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => router.push("/leaderboard")}
              >
                <Trophy className="h-4 w-4 mr-2" />
                View Leaderboard
              </Button>
            </div>
          </div>
        )}
      </main>

      <AnimatePresence>
        {showRecap && (
          <MissionRecap
            open={showRecap}
            onClose={() => setShowRecap(false)}
            username={missionStats.username}
            score={missionStats.score}
            timeElapsed={missionStats.timeElapsed}
            passwordParts={missionStats.passwordParts}
          />
        )}
      </AnimatePresence>

      <SecretBoxReveal open={showSecretBox} onClose={handleViewCertificate} />
    </div>
  )
}
