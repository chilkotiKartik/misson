"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdminLiveLeaderboard } from "@/components/admin/admin-live-leaderboard"
import { Trophy, RefreshCw, Download, Share2 } from "lucide-react"

export default function LeaderboardPage() {
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
          <h1 className="text-3xl font-bold">Live Leaderboard</h1>
          <p className="text-gray-400">Real-time ranking of all participants</p>
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
                <p className="text-sm text-gray-400">Top Score</p>
                <h3 className="text-3xl font-bold mt-1">950</h3>
                <p className="text-xs text-gray-500 mt-1">cosmic_coder</p>
              </div>
              <div className="p-2 rounded-full bg-amber-500/20 text-amber-400 border-amber-500/30">
                <Trophy className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Best Time</p>
                <h3 className="text-3xl font-bold mt-1">03:45</h3>
                <p className="text-xs text-gray-500 mt-1">cosmic_coder</p>
              </div>
              <div className="p-2 rounded-full bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                <Trophy className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Completion Rate</p>
                <h3 className="text-3xl font-bold mt-1">18%</h3>
                <p className="text-xs text-gray-500 mt-1">28 of 156 participants</p>
              </div>
              <div className="p-2 rounded-full bg-purple-500/20 text-purple-400 border-purple-500/30">
                <Trophy className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" className="border-gray-700 text-gray-300">
          <Download className="h-4 w-4 mr-2" />
          Export Leaderboard
        </Button>
        <Button variant="outline" className="border-gray-700 text-gray-300">
          <Share2 className="h-4 w-4 mr-2" />
          Share Leaderboard
        </Button>
      </div>

      <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
        <CardHeader>
          <CardTitle>Live Leaderboard</CardTitle>
          <CardDescription>Real-time ranking of all participants based on score and time</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminLiveLeaderboard isLoading={isLoading} limit={20} />
        </CardContent>
      </Card>
    </div>
  )
}
