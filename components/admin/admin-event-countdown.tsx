"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, AlertCircle, Play, Pause } from "lucide-react"

export function AdminEventCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [eventStarted, setEventStarted] = useState(false)
  const [eventPaused, setEventPaused] = useState(false)

  useEffect(() => {
    // Set event date to April 27, 2025, 7 PM
    const eventDate = new Date("2025-04-27T19:00:00")

    const calculateTimeLeft = () => {
      const difference = +eventDate - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // Event date has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    // Calculate immediately
    calculateTimeLeft()

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleStartEvent = () => {
    setEventStarted(true)
  }

  const handlePauseEvent = () => {
    setEventPaused(!eventPaused)
  }

  return (
    <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800 border-purple-500/20">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2 text-white">Mission Decrypt Event</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-purple-400">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">April 27, 2025</span>
              </div>
              <div className="flex items-center text-purple-400">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm">7:00 PM onwards</span>
              </div>
            </div>
          </div>

          {!eventStarted ? (
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex gap-3">
                <CountdownUnit value={timeLeft.days} label="Days" />
                <CountdownUnit value={timeLeft.hours} label="Hours" />
                <CountdownUnit value={timeLeft.minutes} label="Minutes" />
                <CountdownUnit value={timeLeft.seconds} label="Seconds" />
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleStartEvent}>
                Start Event Now
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium">Event in Progress</span>
              </div>
              <Button
                variant="outline"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                onClick={handlePauseEvent}
              >
                {eventPaused ? (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Resume Event
                  </>
                ) : (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause Event
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {eventStarted && eventPaused && (
          <div className="mt-4 flex items-center gap-2 bg-amber-500/20 text-amber-400 p-2 rounded-md">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">Event is currently paused. Participants cannot proceed until you resume.</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-purple-500/10 rounded-md blur-sm"></div>
        <div className="relative bg-gray-900 border border-gray-800 rounded-md w-16 h-16 flex items-center justify-center">
          <Clock className="absolute opacity-10 h-8 w-8 text-purple-400" />
          <span className="text-2xl font-bold text-white">{value}</span>
        </div>
      </div>
      <span className="text-xs text-gray-400 mt-1">{label}</span>
    </div>
  )
}
