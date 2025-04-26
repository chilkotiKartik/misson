"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EnhancedAvatarGenerator } from "@/components/enhanced-avatar-generator"
import { Eye, Search, Filter, ArrowUpDown, MoreHorizontal, AlertCircle } from "lucide-react"

interface AdminParticipantTableProps {
  isLoading: boolean
}

export function AdminParticipantTable({ isLoading }: AdminParticipantTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<"name" | "progress" | "time" | "score">("score")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Sample participant data
  const participants = [
    {
      id: 1,
      username: "cosmic_coder",
      title: "Spectral Codebreaker",
      email: "cosmic@example.com",
      progress: 100,
      round: "Completed",
      time: "03:45",
      score: 950,
      status: "online",
    },
    {
      id: 2,
      username: "agent_nebula",
      title: "Quantum Vault Guardian",
      email: "agent@example.com",
      progress: 100,
      round: "Completed",
      time: "04:32",
      score: 820,
      status: "online",
    },
    {
      id: 3,
      username: "space_hacker",
      title: "Orbital Cipher Master",
      email: "space@example.com",
      progress: 100,
      round: "Completed",
      time: "05:12",
      score: 780,
      status: "offline",
    },
    {
      id: 4,
      username: "quantum_queen",
      title: "Decryptor - Class Z",
      email: "quantum@example.com",
      progress: 100,
      round: "Completed",
      time: "05:30",
      score: 750,
      status: "online",
    },
    {
      id: 5,
      username: "binary_boss",
      title: "Stellar Code Analyst",
      email: "binary@example.com",
      progress: 100,
      round: "Completed",
      time: "06:15",
      score: 700,
      status: "offline",
    },
    {
      id: 6,
      username: "crypto_king",
      title: "Nebula Signal Decoder",
      email: "crypto@example.com",
      progress: 67,
      round: "Round 2",
      time: "04:20",
      score: 550,
      status: "online",
    },
    {
      id: 7,
      username: "neural_ninja",
      title: "Quantum Vault Guardian",
      email: "neural@example.com",
      progress: 67,
      round: "Round 2",
      time: "05:45",
      score: 480,
      status: "online",
    },
    {
      id: 8,
      username: "data_dynamo",
      title: "Spectral Codebreaker",
      email: "data@example.com",
      progress: 33,
      round: "Round 1",
      time: "02:30",
      score: 320,
      status: "offline",
    },
    {
      id: 9,
      username: "algo_ace",
      title: "Orbital Cipher Master",
      email: "algo@example.com",
      progress: 33,
      round: "Round 1",
      time: "03:10",
      score: 280,
      status: "online",
    },
    {
      id: 10,
      username: "byte_breaker",
      title: "Stellar Code Analyst",
      email: "byte@example.com",
      progress: 33,
      round: "Round 1",
      time: "03:45",
      score: 250,
      status: "offline",
    },
  ]

  const handleSort = (column: "name" | "progress" | "time" | "score") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  // Filter participants based on search term
  const filteredParticipants = participants.filter(
    (participant) =>
      participant.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search participants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-900/60">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-400">Participant</th>
                <th className="px-4 py-3 text-left font-medium text-gray-400">
                  <button className="flex items-center" onClick={() => handleSort("progress")}>
                    Progress
                    <ArrowUpDown className="h-3 w-3 ml-1" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-400">
                  <button className="flex items-center" onClick={() => handleSort("time")}>
                    Time
                    <ArrowUpDown className="h-3 w-3 ml-1" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-400">
                  <button className="flex items-center" onClick={() => handleSort("score")}>
                    Score
                    <ArrowUpDown className="h-3 w-3 ml-1" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-400">Status</th>
                <th className="px-4 py-3 text-right font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredParticipants.map((participant) => (
                <tr key={participant.id} className="bg-gray-900/30 hover:bg-gray-900/60">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="relative flex-shrink-0 mr-3">
                        <EnhancedAvatarGenerator seed={participant.username} size={36} animated={false} />
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-gray-800 ${
                            participant.status === "online" ? "bg-green-500" : "bg-gray-500"
                          }`}
                        ></div>
                      </div>
                      <div>
                        <div className="font-medium text-white">{participant.username}</div>
                        <div className="text-xs text-gray-400">{participant.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-800 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              participant.progress === 100
                                ? "bg-green-500"
                                : participant.progress > 66
                                  ? "bg-blue-500"
                                  : "bg-amber-500"
                            }`}
                            style={{ width: `${participant.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">{participant.progress}%</span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{participant.round}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-mono text-cyan-400">{participant.time}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-bold text-amber-400">{participant.score}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        participant.status === "online"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          participant.status === "online" ? "bg-green-500" : "bg-gray-500"
                        }`}
                      ></div>
                      {participant.status === "online" ? "Online" : "Offline"}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredParticipants.length === 0 && (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 mb-4">
              <AlertCircle className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-1">No participants found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}

        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800 bg-gray-900/60">
          <div className="text-sm text-gray-400">
            Showing <span className="font-medium">{filteredParticipants.length}</span> of{" "}
            <span className="font-medium">{participants.length}</span> participants
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300"
              disabled={filteredParticipants.length < 10}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
