"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Rocket, Clock, PauseCircle, PlayCircle, Key, Home, ChevronLeft, AlertCircle } from "lucide-react"
import { EnhancedAvatarGenerator } from "@/components/enhanced-avatar-generator"

interface MissionControlPanelProps {
  username: string
  roundId: number
  timeElapsed: number
  isPaused: boolean
  togglePause: () => void
  progress: number
  collectedPasswordParts: string[]
  isFinalStage?: boolean
  isLeaderboard?: boolean
  continuousTimer?: boolean
}

export function MissionControlPanel({
  username,
  roundId,
  timeElapsed,
  isPaused,
  togglePause,
  progress,
  collectedPasswordParts,
  isFinalStage = false,
  isLeaderboard = false,
  continuousTimer = false,
}: MissionControlPanelProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showHints, setShowHints] = useState(false)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const toggleHints = () => {
    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))

    setShowHints(!showHints)
  }

  return (
    <header className="relative z-20 border-b border-gray-800 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-cyan-400" />
              <span className="font-bold tracking-wider text-lg">MISSION DECRYPT</span>
            </Link>

            {!isLeaderboard && !isFinalStage && (
              <div className="hidden md:flex ml-6 items-center">
                <div className="text-sm text-gray-400 mr-2">Mission Progress:</div>
                <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="text-xs text-gray-400 ml-2">{Math.round(progress)}%</div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {!isLeaderboard && (
              <>
                <div className="hidden md:flex items-center bg-gray-900/80 backdrop-blur-sm px-3 py-1.5 rounded-md">
                  <Clock className="h-4 w-4 mr-2 text-cyan-400" />
                  <span className="font-mono text-sm">{formatTime(timeElapsed)}</span>
                </div>

                {!isFinalStage && !continuousTimer && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="hidden md:flex border-gray-700 text-gray-300 hover:bg-gray-800"
                    onClick={togglePause}
                  >
                    {isPaused ? (
                      <PlayCircle className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <PauseCircle className="h-4 w-4" />
                    )}
                    <span className="sr-only">{isPaused ? "Resume" : "Pause"}</span>
                  </Button>
                )}

                {continuousTimer && (
                  <div className="hidden md:flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2 py-1 rounded-md">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-xs">Timer Running</span>
                  </div>
                )}

                {collectedPasswordParts.length > 0 && (
                  <div className="hidden md:flex items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 flex items-center gap-2"
                      onClick={toggleHints}
                    >
                      <Key className="h-3.5 w-3.5 text-amber-400" />
                      <span className="text-xs">Password Parts</span>
                    </Button>

                    {showHints && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute top-16 right-32 bg-gray-900/90 backdrop-blur-sm border border-gray-800 rounded-md p-3 shadow-lg z-50"
                      >
                        <div className="text-xs text-gray-400 mb-2">Collected Password Parts:</div>
                        <div className="flex gap-1">
                          {collectedPasswordParts.map((part, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 flex items-center justify-center bg-amber-500/20 border border-amber-500/30 rounded text-amber-400 text-xs font-mono"
                            >
                              {part}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </>
            )}

            <div className="flex items-center gap-2">
              {isLeaderboard && (
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              )}

              {roundId > 0 && !isLeaderboard && (
                <Link href={roundId === 4 ? "/dashboard" : "/dashboard"}>
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Exit
                  </Button>
                </Link>
              )}

              {!isLeaderboard && (
                <div className="flex items-center gap-2">
                  <EnhancedAvatarGenerator seed={username} size={32} animated={false} />
                  <span className="text-sm font-medium hidden sm:inline">{username}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
