"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { EnhancedAvatarGenerator } from "@/components/enhanced-avatar-generator"
import { AdminParticipantActivity } from "@/components/admin/admin-participant-activity"
import { ChevronLeft, User, Clock, Trophy, Activity, MessageSquare, Ban, Download } from "lucide-react"

export default function ParticipantDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [participant, setParticipant] = useState<any>(null)

  useEffect(() => {
    // Simulate loading participant data
    const timer = setTimeout(() => {
      setIsLoading(false)
      setParticipant({
        id: Number(params.id),
        username: "agent_nebula",
        title: "Quantum Vault Guardian",
        email: "agent@example.com",
        progress: 67,
        round: "Round 2",
        time: "04:32",
        score: 820,
        status: "online",
        rank: "Crypto Cadet",
        registeredAt: "2025-04-20T14:30:00Z",
        lastActive: new Date().toISOString(),
        completedRounds: [
          {
            id: 1,
            name: "Indian Space History & Riddles",
            score: 80,
            time: "14:00",
            correctAnswers: 4,
            totalQuestions: 5,
          },
        ],
        currentRound: {
          id: 2,
          name: "Aviation & Aerospace Encryption",
          progress: 40,
          currentQuestion: 2,
          totalQuestions: 5,
        },
      })
    }, 1500)

    return () => clearTimeout(timer)
  }, [params.id])

  const goBack = () => {
    router.back()
  }

  if (isLoading || !participant) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={goBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Participant Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800 lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <EnhancedAvatarGenerator seed={participant.username} size={120} animated={false} />
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border border-gray-800 ${
                    participant.status === "online" ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></div>
              </div>

              <h2 className="text-xl font-bold">{participant.username}</h2>
              <p className="text-sm text-gray-400">{participant.title}</p>
              <p className={`text-sm ${participant.rank === "Commander" ? "text-purple-400" : "text-emerald-400"}`}>
                {participant.rank}
              </p>

              <div className="w-full mt-6 pt-6 border-t border-gray-800 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Email:</span>
                  <span className="text-sm">{participant.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Registered:</span>
                  <span className="text-sm">{new Date(participant.registeredAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Last Active:</span>
                  <span className="text-sm">{new Date(participant.lastActive).toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Status:</span>
                  <span
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
                  </span>
                </div>
              </div>

              <div className="w-full mt-6 pt-6 border-t border-gray-800 space-y-4">
                <Button variant="outline" className="w-full border-gray-700 text-gray-300">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10">
                  <Ban className="h-4 w-4 mr-2" />
                  Suspend Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-400">Current Progress</p>
                    <h3 className="text-3xl font-bold mt-1">{participant.progress}%</h3>
                    <p className="text-xs text-gray-500 mt-1">{participant.round}</p>
                  </div>
                  <div className="p-2 rounded-full bg-purple-500/20 text-purple-400 border-purple-500/30">
                    <Activity className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-400">Total Time</p>
                    <h3 className="text-3xl font-bold mt-1">{participant.time}</h3>
                    <p className="text-xs text-gray-500 mt-1">Minutes:seconds</p>
                  </div>
                  <div className="p-2 rounded-full bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                    <Clock className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-400">Current Score</p>
                    <h3 className="text-3xl font-bold mt-1">{participant.score}</h3>
                    <p className="text-xs text-gray-500 mt-1">Leaderboard rank: #2</p>
                  </div>
                  <div className="p-2 rounded-full bg-amber-500/20 text-amber-400 border-amber-500/30">
                    <Trophy className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="progress" className="space-y-4">
            <TabsList className="bg-gray-900/60 border border-gray-800">
              <TabsTrigger
                value="progress"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
              >
                <Activity className="h-4 w-4 mr-2" />
                Mission Progress
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
              >
                <Clock className="h-4 w-4 mr-2" />
                Activity Log
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="progress" className="space-y-4">
              <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
                <CardHeader>
                  <CardTitle>Current Mission</CardTitle>
                  <CardDescription>
                    Currently on {participant.currentRound.name} (Question {participant.currentRound.currentQuestion}/
                    {participant.currentRound.totalQuestions})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Round {participant.currentRound.id} Progress</span>
                        <span className="text-purple-400">{participant.currentRound.progress}%</span>
                      </div>
                      <Progress
                        value={participant.currentRound.progress}
                        className="h-2 bg-gray-800"
                        indicatorClassName="bg-purple-500"
                      />
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                      <h4 className="text-sm font-medium mb-2">Round Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 p-3 rounded-md">
                          <p className="text-xs text-gray-400">Current Question</p>
                          <p className="font-medium">{participant.currentRound.currentQuestion}</p>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-md">
                          <p className="text-xs text-gray-400">Total Questions</p>
                          <p className="font-medium">{participant.currentRound.totalQuestions}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
                <CardHeader>
                  <CardTitle>Completed Rounds</CardTitle>
                  <CardDescription>Summary of completed mission rounds</CardDescription>
                </CardHeader>
                <CardContent>
                  {participant.completedRounds.length > 0 ? (
                    <div className="space-y-4">
                      {participant.completedRounds.map((round: any) => (
                        <div key={round.id} className="p-4 bg-gray-800/50 rounded-md">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-medium">
                                Round {round.id}: {round.name}
                              </h4>
                              <p className="text-sm text-gray-400">
                                Completed with score {round.score}/100 in {round.time}
                              </p>
                            </div>
                            <div className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs">
                              Completed
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-400 mb-1">Correct Answers</p>
                              <div className="flex items-center">
                                <div className="w-full bg-gray-700 rounded-full h-2 mr-2">
                                  <div
                                    className="h-2 rounded-full bg-emerald-500"
                                    style={{ width: `${(round.correctAnswers / round.totalQuestions) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-400">
                                  {round.correctAnswers}/{round.totalQuestions}
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 mb-1">Score</p>
                              <div className="flex items-center">
                                <div className="w-full bg-gray-700 rounded-full h-2 mr-2">
                                  <div
                                    className="h-2 rounded-full bg-amber-500"
                                    style={{ width: `${round.score}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-400">{round.score}/100</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">No completed rounds yet</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <AdminParticipantActivity isLoading={false} participantId={participant.id} />
            </TabsContent>

            <TabsContent value="profile">
              <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Detailed participant information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Username</label>
                        <input
                          type="text"
                          value={participant.username}
                          readOnly
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input
                          type="email"
                          value={participant.email}
                          readOnly
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <input
                          type="text"
                          value={participant.title}
                          readOnly
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Rank</label>
                        <input
                          type="text"
                          value={participant.rank}
                          readOnly
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                      <Button variant="outline" className="border-gray-700 text-gray-300">
                        <Download className="h-4 w-4 mr-2" />
                        Export Participant Data
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
