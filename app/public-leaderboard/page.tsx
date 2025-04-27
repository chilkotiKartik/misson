"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Rocket, Trophy, Clock, Search, ArrowLeft, RefreshCw } from "lucide-react"
import { AvatarGenerator } from "@/components/avatar-generator"
import { SpaceBackground } from "@/components/space-background"

interface Participant {
  id: string
  rank: number
  username: string
  program: string
  completionTime: string
  score: number
  status: "completed" | "in_progress" | "not_started"
}

export default function PublicLeaderboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [leaderboardData, setLeaderboardData] = useState<Participant[]>([])
  const [filteredData, setFilteredData] = useState<Participant[]>([])
  const [refreshing, setRefreshing] = useState(false)

  // Generate mock leaderboard data
  useEffect(() => {
    const generateLeaderboardData = () => {
      // Sample participant names
      const names = [
        "Meikanda Sivam Sivakumar",
        "Naini Diwan",
        "Aayush",
        "Chetan Sarup Mishra",
        "Aditya Kashyap Mohanty",
        "Khushal Shadija",
        "Chandrasekhar",
        "Yash Vania",
        "Bhupendra Kumar Sahu",
        "Devansh Bhatia",
        "ADHITHYAN N",
        "Ojas Singwi",
        "SHAIF ALI",
        "SUDEEP DAS",
        "Uday Pratap",
        "Vikram Negi",
        "M S Rishav Subhin",
        "Molik Mittal",
        "Anjalee Chaudhary",
        "Afzal Akhtar Khan",
        "S Pathmhajam",
        "Srishti",
        "Abinaya S",
        "Athar",
        "Harshal Kokate",
        "Rounak Sengupta",
        "Vishaal S",
        "Gursimar Singh Miglani",
        "Aditya Pal",
        "Oum Gupta",
        "Sohith Avvari",
        "Janesh E",
        "SIDDHARTH K P",
        "tanisha rani",
        "Pratham",
        "Shivesh kumar satyam",
        "SADIYA MAHEEN SIDDIQUI",
        "Pratham Amritkar",
      ]

      // Generate random completion times (between 10 and 30 minutes)
      const generateTime = () => {
        const minutes = Math.floor(Math.random() * 20) + 10
        const seconds = Math.floor(Math.random() * 60)
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
      }

      // Generate random scores (between 70 and 100)
      const generateScore = () => Math.floor(Math.random() * 31) + 70

      // Generate random program
      const generateProgram = () => {
        const programs = ["Foundation", "Diploma", "Degree"]
        return programs[Math.floor(Math.random() * programs.length)]
      }

      // Generate random status with weighted distribution
      const generateStatus = () => {
        const rand = Math.random()
        if (rand < 0.6) return "completed"
        if (rand < 0.8) return "in_progress"
        return "not_started"
      }

      // Create leaderboard data
      const data: Participant[] = names.map((name, index) => {
        const status = generateStatus()
        return {
          id: (index + 1).toString(),
          rank: index + 1,
          username: name,
          program: generateProgram(),
          completionTime: status === "completed" ? generateTime() : "--:--",
          score: status === "completed" ? generateScore() : 0,
          status,
        }
      })

      // Sort by score (descending) and then by completion time (ascending)
      return data
        .sort((a, b) => {
          if (a.status !== "completed" && b.status === "completed") return 1
          if (a.status === "completed" && b.status !== "completed") return -1
          if (a.status !== "completed" && b.status !== "completed") return 0

          if (b.score !== a.score) return b.score - a.score

          const [aMin, aSec] = a.completionTime.split(":").map(Number)
          const [bMin, bSec] = b.completionTime.split(":").map(Number)
          const aTime = aMin * 60 + aSec
          const bTime = bMin * 60 + bSec
          return aTime - bTime
        })
        .map((participant, index) => ({
          ...participant,
          rank: index + 1,
        }))
    }

    // Simulate loading data
    setTimeout(() => {
      const data = generateLeaderboardData()
      setLeaderboardData(data)
      setFilteredData(data)
      setIsLoading(false)
    }, 1500)
  }, [])

  // Filter leaderboard data based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(leaderboardData)
    } else {
      const filtered = leaderboardData.filter((participant) =>
        participant.username.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredData(filtered)
    }
  }, [searchTerm, leaderboardData])

  const handleRefresh = () => {
    setRefreshing(true)
    // Play refresh sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.1
    audio.play().catch((e) => console.log("Audio play failed:", e))

    // Simulate refreshing data
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">Completed</Badge>
      case "in_progress":
        return <Badge className="bg-amber-500 hover:bg-amber-600">In Progress</Badge>
      case "not_started":
        return <Badge className="bg-gray-500 hover:bg-gray-600">Not Started</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Animated background */}
      <SpaceBackground />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-cyan-400" />
          <span className="font-bold tracking-wider text-lg">MISSION DECRYPT</span>
        </div>
        <Link href="/">
          <Button variant="ghost" className="text-white hover:text-cyan-400 hover:bg-black/20">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Button>
        </Link>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="inline-block w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-300">Loading leaderboard data...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Live <span className="text-emerald-400">Leaderboard</span>
                </h1>
                <p className="text-gray-300">
                  Track real-time performance of all participants in the Mission Decrypt challenge
                </p>
              </div>

              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search participants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 w-full md:w-64"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-700 text-gray-300"
                  onClick={handleRefresh}
                  disabled={refreshing}
                >
                  <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="bg-gray-900/60 border border-gray-800">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                >
                  All Participants
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                >
                  Completed
                </TabsTrigger>
                <TabsTrigger
                  value="in_progress"
                  className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                >
                  In Progress
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <LeaderboardTable data={filteredData} getStatusBadge={getStatusBadge} />
              </TabsContent>

              <TabsContent value="completed">
                <LeaderboardTable
                  data={filteredData.filter((p) => p.status === "completed")}
                  getStatusBadge={getStatusBadge}
                />
              </TabsContent>

              <TabsContent value="in_progress">
                <LeaderboardTable
                  data={filteredData.filter((p) => p.status === "in_progress")}
                  getStatusBadge={getStatusBadge}
                />
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-amber-400" />
                    Top Performer
                  </CardTitle>
                  <CardDescription>Highest score with fastest time</CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredData.filter((p) => p.status === "completed").length > 0 ? (
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <AvatarGenerator
                          seed={filteredData.filter((p) => p.status === "completed")[0]?.username || ""}
                          size={60}
                        />
                      </div>
                      <div>
                        <p className="font-bold text-lg">
                          {filteredData.filter((p) => p.status === "completed")[0]?.username}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center text-amber-400">
                            <Trophy className="h-4 w-4 mr-1" />
                            <span>{filteredData.filter((p) => p.status === "completed")[0]?.score} pts</span>
                          </div>
                          <div className="flex items-center text-cyan-400">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{filteredData.filter((p) => p.status === "completed")[0]?.completionTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-400">No completed missions yet</div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-cyan-400" />
                    Fastest Completion
                  </CardTitle>
                  <CardDescription>Quickest mission completion time</CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredData.filter((p) => p.status === "completed").length > 0 ? (
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <AvatarGenerator
                          seed={
                            filteredData
                              .filter((p) => p.status === "completed")
                              .sort((a, b) => {
                                const [aMin, aSec] = a.completionTime.split(":").map(Number)
                                const [bMin, bSec] = b.completionTime.split(":").map(Number)
                                const aTime = aMin * 60 + aSec
                                const bTime = bMin * 60 + bSec
                                return aTime - bTime
                              })[0]?.username || ""
                          }
                          size={60}
                        />
                      </div>
                      <div>
                        <p className="font-bold text-lg">
                          {
                            filteredData
                              .filter((p) => p.status === "completed")
                              .sort((a, b) => {
                                const [aMin, aSec] = a.completionTime.split(":").map(Number)
                                const [bMin, bSec] = b.completionTime.split(":").map(Number)
                                const aTime = aMin * 60 + aSec
                                const bTime = bMin * 60 + bSec
                                return aTime - bTime
                              })[0]?.username
                          }
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center text-cyan-400">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>
                              {
                                filteredData
                                  .filter((p) => p.status === "completed")
                                  .sort((a, b) => {
                                    const [aMin, aSec] = a.completionTime.split(":").map(Number)
                                    const [bMin, bSec] = b.completionTime.split(":").map(Number)
                                    const aTime = aMin * 60 + aSec
                                    const bTime = bMin * 60 + bSec
                                    return aTime - bTime
                                  })[0]?.completionTime
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-400">No completed missions yet</div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Rocket className="h-5 w-5 mr-2 text-purple-400" />
                    Mission Stats
                  </CardTitle>
                  <CardDescription>Current mission progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Completed</span>
                        <span className="text-emerald-400">
                          {filteredData.filter((p) => p.status === "completed").length}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500"
                          style={{
                            width: `${
                              (filteredData.filter((p) => p.status === "completed").length / filteredData.length) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>In Progress</span>
                        <span className="text-amber-400">
                          {filteredData.filter((p) => p.status === "in_progress").length}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500"
                          style={{
                            width: `${
                              (filteredData.filter((p) => p.status === "in_progress").length / filteredData.length) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Not Started</span>
                        <span className="text-gray-400">
                          {filteredData.filter((p) => p.status === "not_started").length}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gray-500"
                          style={{
                            width: `${
                              (filteredData.filter((p) => p.status === "not_started").length / filteredData.length) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

interface LeaderboardTableProps {
  data: Participant[]
  getStatusBadge: (status: string) => React.ReactNode
}

function LeaderboardTable({ data, getStatusBadge }: LeaderboardTableProps) {
  return (
    <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Participant</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                    No participants found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                data.map((participant) => (
                  <TableRow key={participant.id} className="border-gray-800">
                    <TableCell>
                      {participant.rank <= 3 ? (
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            participant.rank === 1
                              ? "bg-amber-500 text-black"
                              : participant.rank === 2
                                ? "bg-gray-400 text-black"
                                : "bg-amber-800 text-white"
                          }`}
                        >
                          {participant.rank}
                        </div>
                      ) : (
                        participant.rank
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <AvatarGenerator seed={participant.username} size={32} />
                        <span className="font-medium">{participant.username}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          participant.program === "Foundation"
                            ? "border-cyan-500/50 text-cyan-400"
                            : participant.program === "Diploma"
                              ? "border-purple-500/50 text-purple-400"
                              : "border-amber-500/50 text-amber-400"
                        }
                      >
                        {participant.program}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={participant.status === "completed" ? "text-amber-400 font-bold" : "text-gray-400"}
                      >
                        {participant.status === "completed" ? participant.score : "-"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={participant.status === "completed" ? "text-cyan-400 font-mono" : "text-gray-400"}
                      >
                        {participant.completionTime}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(participant.status)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
