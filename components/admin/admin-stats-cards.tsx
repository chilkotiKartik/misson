"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Trophy, Clock } from "lucide-react"

interface AdminStatsCardsProps {
  isLoading: boolean
  activeParticipants: number
  totalParticipants: number
  completedMissions: number
}

export function AdminStatsCards({
  isLoading,
  activeParticipants,
  totalParticipants,
  completedMissions,
}: AdminStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Active Participants"
        value={activeParticipants}
        description="Currently online"
        icon={<Users className="h-5 w-5 text-purple-400" />}
        trend="+12% from last hour"
        isLoading={isLoading}
        color="purple"
      />
      <StatCard
        title="Total Participants"
        value={totalParticipants}
        description="Registered for event"
        icon={<Users className="h-5 w-5 text-cyan-400" />}
        trend="+5 new registrations"
        isLoading={isLoading}
        color="cyan"
      />
      <StatCard
        title="Completed Missions"
        value={completedMissions}
        description="Finished all rounds"
        icon={<Trophy className="h-5 w-5 text-emerald-400" />}
        trend="+8 in the last hour"
        isLoading={isLoading}
        color="emerald"
      />
      <StatCard
        title="Avg. Completion Time"
        value="18:42"
        description="Minutes:seconds"
        icon={<Clock className="h-5 w-5 text-amber-400" />}
        trend="-2:15 from average"
        isLoading={isLoading}
        color="amber"
      />
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number | string
  description: string
  icon: React.ReactNode
  trend: string
  isLoading: boolean
  color: "purple" | "cyan" | "emerald" | "amber"
}

function StatCard({ title, value, description, icon, trend, isLoading, color }: StatCardProps) {
  const colorClasses = {
    purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    cyan: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    amber: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  }

  return (
    <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
      <CardContent className="p-6">
        {isLoading ? (
          <div className="flex flex-col space-y-3">
            <div className="w-1/2 h-4 bg-gray-800 rounded animate-pulse"></div>
            <div className="w-1/3 h-8 bg-gray-800 rounded animate-pulse"></div>
            <div className="w-2/3 h-3 bg-gray-800 rounded animate-pulse"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">{title}</p>
                <h3 className="text-2xl font-bold mt-1">{value}</h3>
                <p className="text-xs text-gray-500 mt-1">{description}</p>
              </div>
              <div className={`p-2 rounded-full ${colorClasses[color]}`}>{icon}</div>
            </div>
            <div className={`text-xs mt-4 ${colorClasses[color]} px-2 py-1 rounded inline-block`}>{trend}</div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
