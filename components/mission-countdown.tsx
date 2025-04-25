"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Calendar, Users } from "lucide-react"

export function MissionCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set a future date for the next mission (7 days from now)
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 7)

    const calculateTimeLeft = () => {
      const difference = +futureDate - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    // Calculate immediately
    calculateTimeLeft()

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="bg-black/60 backdrop-blur-sm border-gray-800 border-cyan-500/20">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2 text-white">Next Global Mission</h3>
            <p className="text-gray-400">Join agents worldwide in the next coordinated mission</p>

            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center text-cyan-400">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">Operation Starfall</span>
              </div>
              <div className="flex items-center text-purple-400">
                <Users className="h-4 w-4 mr-2" />
                <span className="text-sm">142 Agents Enlisted</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <CountdownUnit value={timeLeft.days} label="Days" />
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={{ scale: value === 0 ? [1, 1.1, 1] : 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-cyan-500/10 rounded-md blur-sm"></div>
        <div className="relative bg-gray-900 border border-gray-800 rounded-md w-16 h-16 flex items-center justify-center">
          <Clock className="absolute opacity-10 h-8 w-8 text-cyan-400" />
          <span className="text-2xl font-bold text-white">{value}</span>
        </div>
      </div>
      <span className="text-xs text-gray-400 mt-1">{label}</span>
    </motion.div>
  )
}
