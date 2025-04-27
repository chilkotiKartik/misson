"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Award, Download, Share2 } from "lucide-react"
import { EnhancedAvatarGenerator } from "@/components/enhanced-avatar-generator"

interface MissionCertificateProps {
  username: string
  completionDate: string
  score: number
  timeElapsed: string
}

export function MissionCertificate({ username, completionDate, score, timeElapsed }: MissionCertificateProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const certificateRef = useRef<HTMLDivElement>(null)

  const handleDownload = () => {
    setIsDownloading(true)

    // Play sound
    const audio = new Audio("/sounds/success-chime.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))

    // Simulate download delay
    setTimeout(() => {
      setIsDownloading(false)
    }, 2000)
  }

  const handleShare = () => {
    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))

    // Simulate share functionality
    alert("Share functionality would open here in a real application")
  }

  return (
    <div className="space-y-6">
      <motion.div
        ref={certificateRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-b from-gray-900 to-black border-4 border-amber-500/50 rounded-lg p-8 max-w-3xl mx-auto"
      >
        {/* Certificate Border */}
        <div className="absolute inset-0 border-[12px] border-double border-amber-500/20 rounded-lg pointer-events-none"></div>

        {/* Certificate Content */}
        <div className="relative text-center space-y-6 py-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl"></div>
              <Award className="h-20 w-20 text-amber-400 relative z-10" />
            </div>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Certificate of Achievement</h1>
            <p className="text-amber-400 text-lg">Mission Decrypt</p>
          </div>

          <div className="py-6">
            <p className="text-gray-300 text-lg">This certifies that</p>
            <div className="flex items-center justify-center gap-3 my-4">
              <EnhancedAvatarGenerator seed={username} size={40} />
              <h2 className="text-2xl md:text-3xl font-bold text-amber-400">{username}</h2>
            </div>
            <p className="text-gray-300 text-lg">
              has successfully completed all challenges of Mission Decrypt
              <br />
              demonstrating exceptional skills in cryptography, problem-solving, and logical reasoning.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="bg-gray-800/50 rounded-lg p-3">
              <p className="text-gray-400 text-xs">Score</p>
              <p className="text-amber-400 text-xl font-bold">{score}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <p className="text-gray-400 text-xs">Time</p>
              <p className="text-amber-400 text-xl font-bold">{timeElapsed}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <p className="text-gray-400 text-xs">Date</p>
              <p className="text-amber-400 text-xl font-bold">{completionDate}</p>
            </div>
          </div>

          <div className="pt-6">
            <div className="h-px w-48 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mb-2"></div>
            <p className="text-gray-400">Mission Director</p>
          </div>

          <div className="absolute bottom-4 right-4 text-xs text-gray-500">
            Certificate ID: MD-{Math.random().toString(36).substring(2, 10).toUpperCase()}
          </div>
        </div>
      </motion.div>

      <div className="flex justify-center gap-4">
        <Button
          className="bg-amber-600 hover:bg-amber-700 text-white"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Downloading...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </>
          )}
        </Button>
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  )
}
