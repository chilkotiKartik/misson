"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AdminEventCountdown } from "@/components/admin/admin-event-countdown"
import { AdminStatsCards } from "@/components/admin/admin-stats-cards"
import { AdminActivityChart } from "@/components/admin/admin-activity-chart"
import { AdminLiveLeaderboard } from "@/components/admin/admin-live-leaderboard"
import { AdminParticipantManagement } from "@/components/admin/admin-participant-management"
import { Users, Trophy, Settings, Activity, RefreshCw, UserPlus } from "lucide-react"

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeParticipants, setActiveParticipants] = useState(0)
  const [totalParticipants, setTotalParticipants] = useState(0)
  const [completedMissions, setCompletedMissions] = useState(0)
  const [lastRefreshed, setLastRefreshed] = useState(new Date())
  const [adminUsername, setAdminUsername] = useState("admin")
  const [adminRole, setAdminRole] = useState("Super Admin")

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem("adminLoggedIn")
    const storedUsername = localStorage.getItem("adminUsername")
    const storedRole = localStorage.getItem("adminRole")

    if (!isLoggedIn) {
      window.location.href = "/admin/login"
    }

    if (storedUsername) {
      setAdminUsername(storedUsername)
    }

    if (storedRole) {
      setAdminRole(storedRole)
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
      setActiveParticipants(42)
      setTotalParticipants(156)
      setCompletedMissions(28)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate refreshing data
    setTimeout(() => {
      setIsLoading(false)
      setActiveParticipants(Math.floor(Math.random() * 20) + 40)
      setTotalParticipants(156)
      setCompletedMissions(Math.floor(Math.random() * 10) + 25)
      setLastRefreshed(new Date())
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-400">
            Welcome back, <span className="text-purple-400">{adminUsername}</span> ({adminRole}) | Manage Mission
            Decrypt event on April 27, 2025, 7 PM onwards
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-400">Last refreshed: {lastRefreshed.toLocaleTimeString()}</p>
          <Button
            variant="outline"
            size="sm"
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh Data
          </Button>
        </div>
      </div>

      <AdminEventCountdown />

      <AdminStatsCards
        isLoading={isLoading}
        activeParticipants={activeParticipants}
        totalParticipants={totalParticipants}
        completedMissions={completedMissions}
      />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-gray-900/60 border border-gray-800">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
          >
            <Activity className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="participants"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
          >
            <Users className="h-4 w-4 mr-2" />
            Participants
          </TabsTrigger>
          <TabsTrigger
            value="leaderboard"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
          >
            <Trophy className="h-4 w-4 mr-2" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle>Participant Activity</CardTitle>
                <CardDescription>Real-time activity over the last hour</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminActivityChart isLoading={isLoading} />
              </CardContent>
            </Card>

            <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle>Mission Progress</CardTitle>
                <CardDescription>Participant progress through mission rounds</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Round 1: Indian Space History</span>
                        <span className="text-purple-400">78%</span>
                      </div>
                      <Progress value={78} className="h-2 bg-gray-800" indicatorClassName="bg-purple-500" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Round 2: Aerospace Encryption</span>
                        <span className="text-cyan-400">45%</span>
                      </div>
                      <Progress value={45} className="h-2 bg-gray-800" indicatorClassName="bg-cyan-500" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Round 3: Pattern Recognition</span>
                        <span className="text-emerald-400">32%</span>
                      </div>
                      <Progress value={32} className="h-2 bg-gray-800" indicatorClassName="bg-emerald-500" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Final Password</span>
                        <span className="text-amber-400">18%</span>
                      </div>
                      <Progress value={18} className="h-2 bg-gray-800" indicatorClassName="bg-amber-500" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>Participants with the highest scores</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminLiveLeaderboard isLoading={isLoading} limit={5} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="participants" className="space-y-4">
          <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Participant Management</CardTitle>
                <CardDescription>Add and manage participant accounts</CardDescription>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Participant
              </Button>
            </CardHeader>
            <CardContent>
              <AdminParticipantManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle>Live Leaderboard</CardTitle>
              <CardDescription>Real-time ranking of all participants</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminLiveLeaderboard isLoading={isLoading} limit={20} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <AdminEventSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AdminEventSettings() {
  const [eventDate, setEventDate] = useState("2025-04-27T19:00")
  const [questionSets, setQuestionSets] = useState(true)
  const [antiCheat, setAntiCheat] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [certificateEnabled, setCertificateEnabled] = useState(true)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)

      // Play success sound
      const audio = new Audio("/sounds/success-chime.mp3")
      audio.volume = 0.2
      audio.play().catch((e) => console.log("Audio play failed:", e))
    }, 1500)
  }

  return (
    <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
      <CardHeader>
        <CardTitle>Event Settings</CardTitle>
        <CardDescription>Configure Mission Decrypt event parameters</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Event Date & Time</label>
              <input
                type="datetime-local"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Event Duration (minutes)</label>
              <input
                type="number"
                defaultValue={120}
                min={30}
                max={240}
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Security Settings</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Same Questions for All Participants</p>
                <p className="text-sm text-gray-400">Ensure all participants receive identical questions</p>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                <span
                  className={`${
                    questionSets ? "translate-x-6 bg-purple-500" : "translate-x-1 bg-gray-500"
                  } inline-block h-4 w-4 transform rounded-full transition-transform`}
                  onClick={() => setQuestionSets(!questionSets)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Anti-Cheating Measures</p>
                <p className="text-sm text-gray-400">Enable tab switching detection and time monitoring</p>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                <span
                  className={`${
                    antiCheat ? "translate-x-6 bg-purple-500" : "translate-x-1 bg-gray-500"
                  } inline-block h-4 w-4 transform rounded-full transition-transform`}
                  onClick={() => setAntiCheat(!antiCheat)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Certificate Generation</p>
                <p className="text-sm text-gray-400">
                  Enable certificate generation for participants who complete all rounds
                </p>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                <span
                  className={`${
                    certificateEnabled ? "translate-x-6 bg-purple-500" : "translate-x-1 bg-gray-500"
                  } inline-block h-4 w-4 transform rounded-full transition-transform`}
                  onClick={() => setCertificateEnabled(!certificateEnabled)}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving Changes...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
