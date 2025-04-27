"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SpaceBackground } from "@/components/space-background"
import { EnhancedAvatarGenerator } from "@/components/enhanced-avatar-generator"
import { HolographicLogo } from "@/components/holographic-logo"
import { Clock, Trophy, Filter, ArrowUpDown, Flame, RefreshCw, Home } from "lucide-react"

// Sample leaderboard data
const leaderboardData = [
  {
    id: 1,
    username: "cosmic_coder",
    title: "Spectral Codebreaker",
    rank: "Commander",
    rounds: 3,
    time: "03:45",
    score: 950,
    isAdmin: false,
  },
  {
    id: 2,
    username: "agent_nebula",
    title: "Quantum Vault Guardian",
    rank: "Crypto Cadet",
    rounds: 3,
    time: "04:32",
    score: 820,
    isAdmin: false,
  },
  {
    id: 3,
    username: "space_hacker",
    title: "Orbital Cipher Master",
    rank: "Pilot",
    rounds: 3,
    time: "05:12",
    score: 780,
    isAdmin: false,
  },
  {
    id: 4,
    username: "quantum_queen",
    title: "Decryptor - Class Z",
    rank: "Commander",
    rounds: 3,
    time: "05:30",
    score: 750,
    isAdmin: false,
  },
  {
    id: 5,
    username: "binary_boss",
    title: "Stellar Code Analyst",
    rank: "Pilot",
    rounds: 3,
    time: "06:15",
    score: 700,
    isAdmin: false,
  },
  {
    id: 6,
    username: "crypto_king",
    title: "Nebula Signal Decoder",
    rank: "Crypto Cadet",
    rounds: 2,
    time: "04:20",
    score: 550,
    isAdmin: false,
  },
  {
    id: 7,
    username: "neural_ninja",
    title: "Quantum Vault Guardian",
    rank: "Crypto Cadet",
    rounds: 2,
    time: "05:45",
    score: 480,
    isAdmin: false,
  },
  {
    id: 8,
    username: "admin_alpha",
    title: "Mission Controller",
    rank: "Administrator",
    rounds: 3,
    time: "02:30",
    score: 920,
    isAdmin: true,
  },
  {
    id: 9,
    username: "admin_beta",
    title: "Security Chief",
    rank: "Administrator",
    rounds: 3,
    time: "03:10",
    score: 880,
    isAdmin: true,
  },
  {
    id: 10,
    username: "byte_breaker",
    title: "Stellar Code Analyst",
    rank: "Crypto Cadet",
    rounds: 1,
    time: "03:45",
    score: 250,
    isAdmin: false,
  },
]

export default function PublicLeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState(leaderboardData)
  const [sortBy, setSortBy] = useState<"score" | "time">("score")
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isAutoRefreshing, setIsAutoRefreshing] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Auto refresh every 30 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoRefreshing && !isLoading) {
      interval = setInterval(() => {
        handleRefresh()
      }, 30000)
    }

    return () => clearInterval(interval)
  }, [isAutoRefreshing, isLoading])

  // Play ambient sound
  useEffect(() => {
    if (typeof window !== "undefined" && !isLoading) {
      const audio = new Audio("/sounds/ambient-space.mp3")
      audio.volume = 0.1
      audio.loop = true
      audio.play().catch((e) => console.log("Audio play failed:", e))

      return () => {
        audio.pause()
      }
    }
  }, [isLoading])

  const handleSort = (type: "score" | "time") => {
    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))

    setSortBy(type)

    if (type === "score") {
      setLeaderboard([...leaderboard].sort((a, b) => b.score - a.score))
    } else {
      setLeaderboard(
        [...leaderboard].sort((a, b) => {
          const timeA = a.time.split(":").map(Number)
          const timeB = b.time.split(":").map(Number)

          // Convert to seconds for comparison
          const secondsA = timeA[0] * 60 + timeA[1]
          const secondsB = timeB[0] * 60 + timeB[1]

          return secondsA - secondsB
        }),
      )
    }
  }

  const handleRefresh = () => {
    setIsLoading(true)

    // Simulate data refresh
    setTimeout(() => {
      // Randomly adjust some scores to simulate real-time updates
      const updatedLeaderboard = leaderboard.map((player) => {
        if (Math.random() > 0.7) {
          return {
            ...player,
            score: player.score + Math.floor(Math.random() * 20) - 5,
          }
        }
        return player
      })

      // Sort by current sort method
      if (sortBy === "score") {
        updatedLeaderboard.sort((a, b) => b.score - a.score)
      } else {
        updatedLeaderboard.sort((a, b) => {
          const timeA = a.time.split(":").map(Number)
          const timeB = b.time.split(":").map(Number)
          const secondsA = timeA[0] * 60 + timeA[1]
          const secondsB = timeB[0] * 60 + timeB[1]
          return secondsA - secondsB
        })
      }

      setLeaderboard(updatedLeaderboard)
      setLastUpdated(new Date())
      setIsLoading(false)

      // Play refresh sound
      const audio = new Audio("/sounds/interface-beep.mp3")
      audio.volume = 0.2
      audio.play().catch((e) => console.log("Audio play failed:", e))
    }, 1000)
  }

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "Commander":
        return "text-purple-400"
      case "Pilot":
        return "text-cyan-400"
      case "Administrator":
        return "text-red-400"
      default:
        return "text-emerald-400"
    }
  }

  const getPositionBadge = (position: number) => {
    if (position === 1) {
      return (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-xs">
          1
        </div>
      )
    }
    if (position === 2) {
      return (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-black font-bold text-xs">
          2
        </div>
      )
    }
    if (position === 3) {
      return (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-700 rounded-full flex items-center justify-center text-black font-bold text-xs">
          3
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <SpaceBackground roundTheme="amber" />

      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <HolographicLogo size={40} />
            <div className="ml-3">
              <h1 className="text-xl font-bold">Mission Decrypt</h1>
              <p className="text-sm text-gray-400">Live Leaderboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-400">
              Event Date: <span className="text-white">April 27, 2025</span>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Trophy className="h-7 w-7 mr-2 text-amber-400" />
              Live Leaderboard
            </h1>
            <p className="text-gray-300">
              Real-time rankings of all participants in Mission Decrypt
              <span className="ml-2 text-xs text-gray-400">Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              variant={sortBy === "score" ? "default" : "outline"}
              className={
                sortBy === "score"
                  ? "bg-amber-500 text-black hover:bg-amber-400"
                  : "border-gray-700 text-gray-300 hover:bg-gray-800"
              }
              onClick={() => handleSort("score")}
            >
              <Trophy className="h-4 w-4 mr-2" />
              Sort by Score
            </Button>
            <Button
              variant={sortBy === "time" ? "default" : "outline"}
              className={
                sortBy === "time"
                  ? "bg-cyan-500 text-black hover:bg-cyan-400"
                  : "border-gray-700 text-gray-300 hover:bg-gray-800"
              }
              onClick={() => handleSort("time")}
            >
              <Clock className="h-4 w-4 mr-2" />
              Sort by Time
            </Button>
          </div>
        </div>

        <Card className="bg-black/60 backdrop-blur-sm border-gray-800 border-amber-500/20">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-lg">Mission Decrypt Participants</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="inline-block w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-300">Loading leaderboard data...</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Agent
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <div className="flex items-center">
                          Rounds
                          <Filter className="h-3 w-3 ml-1" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <div className="flex items-center">
                          Time
                          <ArrowUpDown className="h-3 w-3 ml-1" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <div className="flex items-center">
                          Score
                          <ArrowUpDown className="h-3 w-3 ml-1" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {leaderboard.map((agent, index) => (
                        <motion.tr
                          key={agent.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${
                            agent.isAdmin ? "bg-red-500/5" : ""
                          }`}
                        >
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-lg font-bold">{index + 1}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="relative flex-shrink-0 mr-3">
                                <EnhancedAvatarGenerator seed={agent.username} size={40} />
                                {getPositionBadge(index + 1)}
                                {index < 3 && (
                                  <motion.div
                                    className="absolute -bottom-1 -right-1"
                                    animate={{
                                      scale: [1, 1.2, 1],
                                    }}
                                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                                  >
                                    <Flame className="h-4 w-4 text-amber-500" />
                                  </motion.div>
                                )}
                              </div>
                              <div>
                                <div className="font-medium flex items-center">
                                  {agent.username}
                                  {agent.isAdmin && (
                                    <span className="ml-2 px-1.5 py-0.5 text-xs bg-red-500/20 text-red-400 rounded-md">
                                      Admin
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-400">{agent.title}</div>
                                <div className={`text-xs ${getRankColor(agent.rank)}`}>{agent.rank}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div
                                className={`w-2 h-2 rounded-full mr-2 ${
                                  agent.rounds === 3
                                    ? "bg-emerald-500"
                                    : agent.rounds === 2
                                      ? "bg-amber-500"
                                      : "bg-gray-500"
                                }`}
                              ></div>
                              <span className="text-sm text-gray-300">
                                {agent.rounds === 3 ? "Completed" : agent.rounds === 2 ? "Round 2" : "Round 1"}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm">{agent.rounds}/3</td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="font-mono text-cyan-400">{agent.time}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="font-bold text-amber-400">{agent.score}</div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-black/60 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle className="text-sm">Event Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                <span className="text-emerald-400 font-medium">In Progress</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Mission Decrypt is currently active with {leaderboard.length} participants
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/60 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle className="text-sm">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-400">
                {Math.round((leaderboard.filter((a) => a.rounds === 3).length / leaderboard.length) * 100)}%
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {leaderboard.filter((a) => a.rounds === 3).length} out of {leaderboard.length} participants have
                completed all rounds
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/60 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle className="text-sm">Top Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-400">
                {leaderboard.sort((a, b) => b.score - a.score)[0].score}
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Achieved by {leaderboard.sort((a, b) => b.score - a.score)[0].username} with a time of{" "}
                {leaderboard.sort((a, b) => b.score - a.score)[0].time}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-md py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          <p>Mission Decrypt - Real-time Leaderboard</p>
          <p className="mt-1">© 2025 Mission Decrypt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
