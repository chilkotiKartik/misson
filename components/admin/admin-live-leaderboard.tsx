"use client"

import { useState, useEffect } from "react"
import { EnhancedAvatarGenerator } from "@/components/enhanced-avatar-generator"
import { Flame, ArrowUp, ArrowDown, Minus } from "lucide-react"

interface AdminLiveLeaderboardProps {
  isLoading: boolean
  limit?: number
}

export function AdminLiveLeaderboard({ isLoading, limit = 10 }: AdminLiveLeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<any[]>([])

  useEffect(() => {
    if (!isLoading) {
      // Sample leaderboard data
      const data = [
        {
          id: 1,
          username: "cosmic_coder",
          title: "Spectral Codebreaker",
          rank: "Commander",
          rounds: 3,
          time: "03:45",
          score: 950,
          change: 0,
        },
        {
          id: 2,
          username: "agent_nebula",
          title: "Quantum Vault Guardian",
          rank: "Crypto Cadet",
          rounds: 3,
          time: "04:32",
          score: 820,
          change: 2,
        },
        {
          id: 3,
          username: "space_hacker",
          title: "Orbital Cipher Master",
          rank: "Pilot",
          rounds: 3,
          time: "05:12",
          score: 780,
          change: -1,
        },
        {
          id: 4,
          username: "quantum_queen",
          title: "Decryptor - Class Z",
          rank: "Commander",
          rounds: 3,
          time: "05:30",
          score: 750,
          change: -1,
        },
        {
          id: 5,
          username: "binary_boss",
          title: "Stellar Code Analyst",
          rank: "Pilot",
          rounds: 3,
          time: "06:15",
          score: 700,
          change: 0,
        },
        {
          id: 6,
          username: "crypto_king",
          title: "Nebula Signal Decoder",
          rank: "Crypto Cadet",
          rounds: 2,
          time: "04:20",
          score: 550,
          change: 1,
        },
        {
          id: 7,
          username: "neural_ninja",
          title: "Quantum Vault Guardian",
          rank: "Crypto Cadet",
          rounds: 2,
          time: "05:45",
          score: 480,
          change: 1,
        },
        {
          id: 8,
          username: "data_dynamo",
          title: "Spectral Codebreaker",
          rank: "Crypto Cadet",
          rounds: 1,
          time: "02:30",
          score: 320,
          change: 2,
        },
        {
          id: 9,
          username: "algo_ace",
          title: "Orbital Cipher Master",
          rank: "Crypto Cadet",
          rounds: 1,
          time: "03:10",
          score: 280,
          change: -2,
        },
        {
          id: 10,
          username: "byte_breaker",
          title: "Stellar Code Analyst",
          rank: "Crypto Cadet",
          rounds: 1,
          time: "03:45",
          score: 250,
          change: 0,
        },
        {
          id: 11,
          username: "pixel_pioneer",
          title: "Quantum Vault Guardian",
          rank: "Crypto Cadet",
          rounds: 1,
          time: "04:10",
          score: 220,
          change: 3,
        },
        {
          id: 12,
          username: "logic_lord",
          title: "Orbital Cipher Master",
          rank: "Crypto Cadet",
          rounds: 1,
          time: "04:25",
          score: 200,
          change: -1,
        },
        {
          id: 13,
          username: "cyber_sentinel",
          title: "Spectral Codebreaker",
          rank: "Crypto Cadet",
          rounds: 1,
          time: "04:40",
          score: 180,
          change: 0,
        },
        {
          id: 14,
          username: "matrix_maven",
          title: "Stellar Code Analyst",
          rank: "Crypto Cadet",
          rounds: 1,
          time: "04:55",
          score: 160,
          change: -3,
        },
        {
          id: 15,
          username: "code_crusader",
          title: "Nebula Signal Decoder",
          rank: "Crypto Cadet",
          rounds: 1,
          time: "05:10",
          score: 140,
          change: 1,
        },
      ]
      setLeaderboard(data.slice(0, limit))
    }
  }, [isLoading, limit])

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

  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return (
        <div className="flex items-center text-green-400 text-xs">
          <ArrowUp className="h-3 w-3 mr-1" />
          {change}
        </div>
      )
    }
    if (change < 0) {
      return (
        <div className="flex items-center text-red-400 text-xs">
          <ArrowDown className="h-3 w-3 mr-1" />
          {Math.abs(change)}
        </div>
      )
    }
    return (
      <div className="flex items-center text-gray-400 text-xs">
        <Minus className="h-3 w-3 mr-1" />0
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-900/60">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-400">Rank</th>
            <th className="px-4 py-3 text-left font-medium text-gray-400">Agent</th>
            <th className="px-4 py-3 text-left font-medium text-gray-400">Status</th>
            <th className="px-4 py-3 text-left font-medium text-gray-400">Rounds</th>
            <th className="px-4 py-3 text-left font-medium text-gray-400">Time</th>
            <th className="px-4 py-3 text-left font-medium text-gray-400">Score</th>
            <th className="px-4 py-3 text-left font-medium text-gray-400">Change</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {leaderboard.map((agent, index) => (
            <tr key={agent.id} className="bg-gray-900/30 hover:bg-gray-900/60">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-lg font-bold">{index + 1}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="relative flex-shrink-0 mr-3">
                    <EnhancedAvatarGenerator seed={agent.username} size={36} animated={false} />
                    {getPositionBadge(index + 1)}
                    {index < 3 && (
                      <div className="absolute -bottom-1 -right-1">
                        <Flame className="h-4 w-4 text-amber-500" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-white">{agent.username}</div>
                    <div className="text-xs text-gray-400">{agent.title}</div>
                    <div className={`text-xs ${getRankColor(agent.rank)}`}>{agent.rank}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${
                      agent.rounds === 3 ? "bg-emerald-500" : agent.rounds === 2 ? "bg-amber-500" : "bg-gray-500"
                    }`}
                  ></div>
                  <span className="text-sm text-gray-300">
                    {agent.rounds === 3 ? "Completed" : agent.rounds === 2 ? "Round 2" : "Round 1"}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm">{agent.rounds}/3</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="font-mono text-cyan-400">{agent.time}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="font-bold text-amber-400">{agent.score}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">{getChangeIndicator(agent.change)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
