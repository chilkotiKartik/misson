"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedAvatarGenerator } from "@/components/enhanced-avatar-generator"
import {
  Activity,
  RefreshCw,
  Search,
  Filter,
  Download,
  AlertTriangle,
  CheckCircle,
  Info,
  Clock,
  User,
  LogIn,
  LogOut,
  Send,
  Eye,
} from "lucide-react"

export default function ActivityPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [lastRefreshed, setLastRefreshed] = useState(new Date())

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate refreshing data
    setTimeout(() => {
      setIsLoading(false)
      setLastRefreshed(new Date())
    }, 1000)
  }

  // Sample activity logs
  const activityLogs = [
    {
      id: 1,
      username: "cosmic_coder",
      action: "completed_mission",
      details: "Completed Round 3 with score 95/100",
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      severity: "success",
    },
    {
      id: 2,
      username: "agent_nebula",
      action: "started_mission",
      details: "Started Round 2",
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      severity: "info",
    },
    {
      id: 3,
      username: "binary_boss",
      action: "login_attempt_failed",
      details: "Failed login attempt from IP 192.168.1.105",
      timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
      severity: "warning",
    },
    {
      id: 4,
      username: "quantum_queen",
      action: "login",
      details: "Logged in successfully",
      timestamp: new Date(Date.now() - 35 * 60000).toISOString(),
      severity: "info",
    },
    {
      id: 5,
      username: "space_hacker",
      action: "logout",
      details: "Logged out",
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
      severity: "info",
    },
    {
      id: 6,
      username: "crypto_king",
      action: "submitted_answer",
      details: "Submitted incorrect answer for Question 3 in Round 2",
      timestamp: new Date(Date.now() - 55 * 60000).toISOString(),
      severity: "warning",
    },
    {
      id: 7,
      username: "neural_ninja",
      action: "tab_switch",
      details: "Switched tabs 3 times during Round 1",
      timestamp: new Date(Date.now() - 65 * 60000).toISOString(),
      severity: "warning",
    },
    {
      id: 8,
      username: "data_dynamo",
      action: "registered",
      details: "Registered for the event",
      timestamp: new Date(Date.now() - 75 * 60000).toISOString(),
      severity: "info",
    },
    {
      id: 9,
      username: "algo_ace",
      action: "completed_mission",
      details: "Completed Round 1 with score 85/100",
      timestamp: new Date(Date.now() - 85 * 60000).toISOString(),
      severity: "success",
    },
    {
      id: 10,
      username: "byte_breaker",
      action: "suspicious_activity",
      details: "Multiple rapid submissions detected",
      timestamp: new Date(Date.now() - 95 * 60000).toISOString(),
      severity: "error",
    },
  ]

  // Filter logs based on search term
  const filteredLogs = activityLogs.filter(
    (log) =>
      log.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getActionIcon = (action: string) => {
    switch (action) {
      case "completed_mission":
        return <CheckCircle className="h-4 w-4 text-emerald-400" />
      case "started_mission":
        return <Activity className="h-4 w-4 text-cyan-400" />
      case "login_attempt_failed":
        return <AlertTriangle className="h-4 w-4 text-amber-400" />
      case "login":
        return <LogIn className="h-4 w-4 text-purple-400" />
      case "logout":
        return <LogOut className="h-4 w-4 text-gray-400" />
      case "submitted_answer":
        return <Send className="h-4 w-4 text-blue-400" />
      case "tab_switch":
        return <AlertTriangle className="h-4 w-4 text-amber-400" />
      case "registered":
        return <User className="h-4 w-4 text-purple-400" />
      case "suspicious_activity":
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      default:
        return <Info className="h-4 w-4 text-gray-400" />
    }
  }

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case "success":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "info":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "warning":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Activity Logs</h1>
          <p className="text-gray-400">Monitor all participant and system activities</p>
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

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-gray-900/60 border border-gray-800">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              All Activities
            </TabsTrigger>
            <TabsTrigger
              value="warnings"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              Warnings
            </TabsTrigger>
            <TabsTrigger
              value="logins"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              Logins
            </TabsTrigger>
            <TabsTrigger
              value="missions"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              Missions
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-700 text-gray-300">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-300">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
          <CardDescription>Real-time monitoring of all system activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700"
              />
            </div>

            {isLoading ? (
              <div className="h-[400px] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-4 bg-gray-800/50 rounded-md border border-gray-700 flex items-start gap-3"
                    >
                      <div className="flex-shrink-0">
                        <EnhancedAvatarGenerator seed={log.username} size={40} animated={false} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="font-medium text-white">{log.username}</div>
                            <div className="text-sm text-gray-400 flex items-center gap-1">
                              {getActionIcon(log.action)}
                              <span className="capitalize">{log.action.replace(/_/g, " ")}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`px-2 py-1 rounded text-xs ${getSeverityClass(log.severity)}`}>
                              {log.severity.toUpperCase()}
                            </div>
                            <div className="text-xs text-gray-400 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(log.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        <p className="mt-1 text-sm">{log.details}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 h-8 w-8 text-gray-400 hover:text-white"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 mb-4">
                      <AlertTriangle className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-1">No activities found</h3>
                    <p className="text-gray-400">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
