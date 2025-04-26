"use client"

import { useState, useEffect } from "react"
import { Clock, AlertTriangle } from "lucide-react"

interface MissionContinuousTimerProps {
  startTime?: number
  onTimeUpdate?: (elapsedTime: number) => void
  className?: string
}

export function MissionContinuousTimer({
  startTime = Date.now(),
  onTimeUpdate,
  className = "",
}: MissionContinuousTimerProps) {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isWarning, setIsWarning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const newElapsedTime = Math.floor((Date.now() - startTime) / 1000)
      setElapsedTime(newElapsedTime)

      if (onTimeUpdate) {
        onTimeUpdate(newElapsedTime)
      }

      // Show warning animation every 5 minutes
      if (newElapsedTime % 300 === 0 && newElapsedTime > 0) {
        setIsWarning(true)
        setTimeout(() => setIsWarning(false), 3000)

        // Play warning sound
        const audio = new Audio("/sounds/timer-warning.mp3")
        audio.volume = 0.3
        audio.play().catch((e) => console.log("Audio play failed:", e))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime, onTimeUpdate])

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className={`flex items-center gap-2 ${isWarning ? "animate-pulse" : ""} ${className}`}>
      {isWarning ? <AlertTriangle className="h-5 w-5 text-amber-400" /> : <Clock className="h-5 w-5 text-cyan-400" />}
      <div className={`font-mono font-bold ${isWarning ? "text-amber-400" : "text-cyan-400"}`}>
        {formatTime(elapsedTime)}
      </div>
    </div>
  )
}
