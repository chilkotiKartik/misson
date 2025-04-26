"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, AlertTriangle, CheckCircle, Info, Clock, LogIn, LogOut, Send, User } from "lucide-react"

interface AdminParticipantActivityProps {
  isLoading: boolean
  participantId: number
}

export function AdminParticipantActivity({ isLoading, participantId }: AdminParticipantActivityProps) {
  const [activities, setActivities] = useState<any[]>([])

  useEffect(() => {
    if (!isLoading) {
      // Generate sample activity data for the participant
      const sampleActivities = [
        {
          id: 1,
          action: "login",
          details: "Logged in successfully",
          timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
          severity: "info",
        },
        {
          id: 2,
          action: "started_mission",
          details: "Started Round 1",
          timestamp: new Date(Date.now() - 115 * 60000).toISOString(),
          severity: "info",
        },
        {
          id: 3,
          action: "submitted_answer",
          details: "Submitted correct answer for Question 1 in Round 1",
          timestamp: new Date(Date.now() - 110 * 60000).toISOString(),
          severity: "success",
        },
        {
          id: 4,
          action: "submitted_answer",
          details: "Submitted correct answer for Question 2 in Round 1",
          timestamp: new Date(Date.now() - 105 * 60000).toISOString(),
          severity: "success",
        },
        {
          id: 5,
          action: "tab_switch",
          details: "Switched tabs during Round 1",
          timestamp: new Date(Date.now() - 100 * 60000).toISOString(),
          severity: "warning",
        },
        {
          id: 6,
          action: "submitted_answer",
          details: "Submitted incorrect answer for Question 3 in Round 1",
          timestamp: new Date(Date.now() - 95 * 60000).toISOString(),
          severity: "warning",
        },
        {
          id: 7,
          action: "submitted_answer",
          details: "Submitted correct answer for Question 3 in Round 1",
          timestamp: new Date(Date.now() - 90 * 60000).toISOString(),
          severity: "success",
        },
        {
          id: 8,
          action: "submitted_answer",
          details: "Submitted correct answer for Question 4 in Round 1",
          timestamp: new Date(Date.now() - 85 * 60000).toISOString(),
          severity: "success",
        },
        {
          id: 9,
          action: "submitted_answer",
          details: "Submitted correct answer for Question 5 in Round 1",
          timestamp: new Date(Date.now() - 80 * 60000).toISOString(),
          severity: "success",
        },
        {
          id: 10,
          action: "completed_mission",
          details: "Completed Round 1 with score 80/100",
          timestamp: new Date(Date.now() - 75 * 60000).toISOString(),
          severity: "success",
        },
        {
          id: 11,
          action: "started_mission",
          details: "Started Round 2",
          timestamp: new Date(Date.now() - 70 * 60000).toISOString(),
          severity: "info",
        },
        {
          id: 12,
          action: "submitted_answer",
          details: "Submitted correct answer for Question 1 in Round 2",
          timestamp: new Date(Date.now() - 65 * 60000).toISOString(),
          severity: "success",
        },
        {
          id: 13,
          action: "submitted_answer",
          details: "Submitted correct answer for Question 2 in Round 2",
          timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
          severity: "success",
        },
        {
          id: 14,
          action: "tab_switch",
          details: "Switched tabs multiple times during Round 2",
          timestamp: new Date(Date.now() - 55 * 60000).toISOString(),
          severity: "warning",
        },
        {
          id: 15,
          action: "submitted_answer",
          details: "Submitted incorrect answer for Question 3 in Round 2",
          timestamp: new Date(Date.now() - 50 * 60000).toISOString(),
          severity: "warning",
        },
        {
          id: 16,
          action: "idle_timeout",
          details: "No activity detected for 5 minutes",
          timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
          severity: "warning",
        },
        {
          id: 17,
          action: "submitted_answer",
          details: "Submitted correct answer for Question 3 in Round 2",
          timestamp: new Date(Date.now() - 40 * 60000).toISOString(),
          severity: "success",
        },
        {
          id: 18,
          action: "logout",
          details: "Logged out",
          timestamp: new Date(Date.now() - 35 * 60000).toISOString(),
          severity: "info",
        },
        {
          id: 19,
          action: "login",
          details: "Logged in successfully",
          timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
          severity: "info",
        },
        {
          id: 20,
          action: "resumed_mission",
          details: "Resumed Round 2",
          timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
          severity: "info",
        },
      ]
      setActivities(sampleActivities)
    }
  }, [isLoading, participantId])

  const getActionIcon = (action: string) => {
    switch (action) {
      case "completed_mission":
        return <CheckCircle className="h-4 w-4 text-emerald-400" />
      case "started_mission":
      case "resumed_mission":
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
      case "idle_timeout":
        return <AlertTriangle className="h-4 w-4 text-amber-400" />
      case "registered":
        return <User className="h-4 w-4 text-purple-400" />
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

  if (isLoading) {
    return (
      <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
        <CardContent className="p-6">
          <div className="h-[400px] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Activity Timeline</h3>

          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-800"></div>
            <div className="space-y-6">
              {activities.map((activity) => (
                <div key={activity.id} className="relative pl-8">
                  <div
                    className={`absolute left-0 w-6 h-6 rounded-full flex items-center justify-center ${getSeverityClass(activity.severity)}`}
                  >
                    {getActionIcon(activity.action)}
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-md border border-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm capitalize">{activity.action.replace(/_/g, " ")}</div>
                        <p className="text-sm text-gray-400">{activity.details}</p>
                      </div>
                      <div className="text-xs text-gray-400 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(activity.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
