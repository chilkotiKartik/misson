"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AvatarGenerator } from "@/components/avatar-generator"
import { DashboardHeader } from "@/components/dashboard-header"
import { Rocket, Trophy, Clock, Brain, ChevronRight, AlertCircle } from "lucide-react"

export default function DashboardPage() {
  const [username, setUsername] = useState("demo_agent")
  const [rank, setRank] = useState("Crypto Cadet")
  const [xp, setXp] = useState(120)
  const [maxXp, setMaxXp] = useState(500)
  const [isLoading, setIsLoading] = useState(true)
  const [missionStatus, setMissionStatus] = useState<"not_started" | "in_progress" | "completed">("not_started")

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
      </div>

      <DashboardHeader username={username} />

      <main className="flex-1 container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="inline-block w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-300">Loading mission data...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Welcome Section */}
            <section className="mb-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-shrink-0">
                  <AvatarGenerator seed={username} size={120} />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center md:text-left">
                    Agent <span className="text-emerald-400">{username}</span>, your mission awaits.
                  </h1>
                  <p className="text-gray-300 mb-4 text-center md:text-left">
                    Current Rank: <span className="text-purple-400 font-semibold">{rank}</span>
                  </p>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>
                      XP: {xp}/{maxXp}
                    </span>
                    <span>{Math.round((xp / maxXp) * 100)}%</span>
                  </div>
                  <Progress
                    value={(xp / maxXp) * 100}
                    className="h-2 bg-gray-700"
                    indicatorClassName="bg-gradient-to-r from-emerald-500 to-purple-500"
                  />
                </div>
              </div>
            </section>

            {/* Mission Status */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">Mission Status</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Rocket className="h-5 w-5 mr-2 text-emerald-400" />
                      Mission Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold">
                        1
                      </div>
                      <div className="w-px h-1 bg-gray-700 flex-1"></div>
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 font-bold">
                        2
                      </div>
                      <div className="w-px h-1 bg-gray-700 flex-1"></div>
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 font-bold">
                        3
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 text-center">
                      {missionStatus === "not_started"
                        ? "Mission not started"
                        : missionStatus === "in_progress"
                          ? "Mission in progress"
                          : "Mission completed"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-amber-400" />
                      Leaderboard Rank
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <span className="text-4xl font-bold text-amber-400">--</span>
                      <p className="text-sm text-gray-400 mt-2">Complete a mission to rank</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-cyan-400" />
                      Best Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <span className="text-4xl font-bold text-cyan-400">--:--</span>
                      <p className="text-sm text-gray-400 mt-2">No missions completed yet</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Start Mission */}
            <section className="mb-10">
              <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <CardContent className="p-8 relative">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to Begin Your Mission?</h2>
                      <p className="text-gray-300 mb-4 max-w-xl">
                        Crack the codes, solve the puzzles, and unlock the final password to complete your mission and
                        join the elite ranks of ISRO agents.
                      </p>
                      <div className="flex items-center text-amber-400 bg-amber-400/10 p-2 rounded-md mb-4">
                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <p className="text-sm">
                          Once started, the mission timer will begin. You can pause, but your total time will be
                          recorded.
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <Link href="/mission/start">
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 font-bold text-lg px-8 py-6 rounded-lg shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40"
                        >
                          START MISSION
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Training Resources */}
            <section>
              <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">Training Resources</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-purple-400" />
                      Cryptography Basics
                    </CardTitle>
                    <CardDescription>Learn the fundamentals of code breaking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                        Substitution Ciphers
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                        Binary and Hexadecimal
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                        Morse Code
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                    >
                      Access Training
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Rocket className="h-5 w-5 mr-2 text-cyan-400" />
                      ISRO Mission History
                    </CardTitle>
                    <CardDescription>Study past missions to prepare for challenges</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2"></div>
                        Chandrayaan Missions
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2"></div>
                        Mars Orbiter Mission
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2"></div>
                        PSLV and GSLV Launches
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                      Access Archives
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  )
}
