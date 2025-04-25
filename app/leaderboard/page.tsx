"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SpaceBackground } from "@/components/space-background"
import { MissionControlPanel } from "@/components/mission-control-panel"
import { EnhancedAvatarGenerator } from "@/components/enhanced-avatar-generator"
import { Clock, Trophy, Filter, ArrowUpDown, Flame } from "lucide-react"

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
  },
  {
    id: 2,
    username: "agent_nebula",
    title: "Quantum Vault Guardian",
    rank: "Crypto Cadet",
    rounds: 3,
    time: "04:32",
    score: 820,
  },
  {
    id: 3,
    username: "space_hacker",
    title: "Orbital Cipher Master",
    rank: "Pilot",
    rounds: 3,
    time: "05:12",
    score: 780,
  },
  {
    id: 4,
    username: "quantum_queen",
    title: "Decryptor - Class Z",
    rank: "Commander",
    rounds: 3,
    time: "05:30",
    score: 750,
  },
  {
    id: 5,
    username: "binary_boss",
    title: "Stellar Code Analyst",
    rank: "Pilot",
    rounds: 3,
    time: "06:15",
    score: 700,
  },
  {
    id: 6,
    username: "crypto_king",
    title: "Nebula Signal Decoder",
    rank: "Crypto Cadet",
    rounds: 2,
    time: "04:20",
    score: 550,
  },
  {
    id: 7,
    username: "neural_ninja",
    title: "Quantum Vault Guardian",
    rank: "Crypto Cadet",
    rounds: 2,
    time: "05:45",
    score: 480,
  },
  {
    id: 8,
    username: "data_dynamo",
    title: "Spectral Codebreaker",
    rank: "Crypto Cadet",
    rounds: 1,
    time: "02:30",
    score: 320,
  },
  {
    id: 9,
    username: "algo_ace",
    title: "Orbital Cipher Master",
    rank: "Crypto Cadet",
    rounds: 1,
    time: "03:10",
    score: 280,
  },
  {
    id: 10,
    username: "byte_breaker",
    title: "Stellar Code Analyst",
    rank: "Crypto Cadet",
    rounds: 1,
    time: "03:45",
    score: 250,
  },
]

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState(leaderboardData)
  const [sortBy, setSortBy] = useState<"score" | "time">("score")
  const [isLoading, setIsLoading] = useState(true)
  const [newEntryIndex, setNewEntryIndex] = useState<number | null>(null)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)

      // Simulate new entry animation after a delay
      setTimeout(() => {
        setNewEntryIndex(1) // agent_nebula is at index 1

        // Play sound
        const audio = new Audio("/sounds/leaderboard-entry.mp3")
        audio.volume = 0.3
        audio.play().catch((e) => console.log("Audio play failed:", e))

        // Reset after animation
        setTimeout(() => {
          setNewEntryIndex(null)
        }, 3000)
      }, 1500)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

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

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "Commander":
        return "text-purple-400"
      case "Pilot":
        return "text-cyan-400"
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

      <MissionControlPanel
        username="agent_nebula"
        roundId={0}
        timeElapsed={0}
        isPaused={false}
        togglePause={() => {}}
        progress={100}
        collectedPasswordParts={[]}
        isLeaderboard={true}
      />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Trophy className="h-7 w-7 mr-2 text-amber-400" />
              Agent Leaderboard
            </h1>
            <p className="text-gray-300">Top performing agents in Mission Decrypt</p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
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
            <CardTitle className="text-lg">Top Agents</CardTitle>
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
                          initial={newEntryIndex === index ? { backgroundColor: "rgba(245, 158, 11, 0.3)" } : {}}
                          animate={
                            newEntryIndex === index
                              ? {
                                  backgroundColor: ["rgba(245, 158, 11, 0.3)", "rgba(0, 0, 0, 0)"],
                                  transition: { duration: 2 },
                                }
                              : {}
                          }
                          className={`border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${
                            agent.username === "agent_nebula" ? "bg-amber-500/10" : ""
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
                                <div className="font-medium">{agent.username}</div>
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

        {newEntryIndex === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center"
          >
            <p className="text-amber-400 font-medium">Decryptor Has Joined The Grid...</p>
          </motion.div>
        )}
      </main>
    </div>
  )
}
