"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AdminParticipantTable } from "@/components/admin/admin-participant-table"
import { Users, UserPlus, FileText, RefreshCw } from "lucide-react"

export default function ParticipantsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [lastRefreshed, setLastRefreshed] = useState(new Date())

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate refreshing data
    setTimeout(() => {
      setIsLoading(false)
      setLastRefreshed(new Date())
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Participants</h1>
          <p className="text-gray-400">Manage and monitor all registered participants</p>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Participants</p>
                <h3 className="text-3xl font-bold mt-1">156</h3>
                <p className="text-xs text-gray-500 mt-1">Registered for event</p>
              </div>
              <div className="p-2 rounded-full bg-purple-500/20 text-purple-400 border-purple-500/30">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="text-xs mt-4 bg-purple-500/20 text-purple-400 border-purple-500/30 px-2 py-1 rounded inline-block">
              +12 new today
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Active Now</p>
                <h3 className="text-3xl font-bold mt-1">42</h3>
                <p className="text-xs text-gray-500 mt-1">Currently online</p>
              </div>
              <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="text-xs mt-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-2 py-1 rounded inline-block">
              27% of total
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <h3 className="text-3xl font-bold mt-1">28</h3>
                <p className="text-xs text-gray-500 mt-1">Finished all rounds</p>
              </div>
              <div className="p-2 rounded-full bg-amber-500/20 text-amber-400 border-amber-500/30">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="text-xs mt-4 bg-amber-500/20 text-amber-400 border-amber-500/30 px-2 py-1 rounded inline-block">
              18% completion rate
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-gray-900/60 border border-gray-800">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              All Participants
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              Completed
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-700 text-gray-300">
            <FileText className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Participant
          </Button>
        </div>
      </div>

      <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
        <CardHeader>
          <CardTitle>All Participants</CardTitle>
          <CardDescription>Manage and monitor all registered participants</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminParticipantTable isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  )
}
