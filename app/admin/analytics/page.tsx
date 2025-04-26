"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { RefreshCw, Download, BarChart3, PieChartIcon, LineChartIcon, Calendar } from "lucide-react"

export default function AnalyticsPage() {
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

  // Sample data for charts
  const participantActivityData = [
    { time: "7:00 PM", active: 10, completed: 0 },
    { time: "7:15 PM", active: 45, completed: 0 },
    { time: "7:30 PM", active: 78, completed: 0 },
    { time: "7:45 PM", active: 95, completed: 2 },
    { time: "8:00 PM", active: 120, completed: 5 },
    { time: "8:15 PM", active: 135, completed: 12 },
    { time: "8:30 PM", active: 142, completed: 18 },
    { time: "8:45 PM", active: 148, completed: 25 },
    { time: "9:00 PM", active: 152, completed: 32 },
    { time: "9:15 PM", active: 155, completed: 40 },
    { time: "9:30 PM", active: 156, completed: 48 },
    { time: "9:45 PM", active: 156, completed: 55 },
  ]

  const completionRateData = [
    { name: "Round 1", completed: 85, inProgress: 10, notStarted: 5 },
    { name: "Round 2", completed: 60, inProgress: 20, notStarted: 20 },
    { name: "Round 3", completed: 35, inProgress: 25, notStarted: 40 },
    { name: "Final", completed: 18, inProgress: 17, notStarted: 65 },
  ]

  const difficultyDistributionData = [
    { name: "Easy", value: 40, color: "#10b981" },
    { name: "Medium", value: 35, color: "#3b82f6" },
    { name: "Hard", value: 20, color: "#f59e0b" },
    { name: "Extreme", value: 5, color: "#ef4444" },
  ]

  const timeSpentData = [
    { name: "0-5 min", participants: 5 },
    { name: "5-10 min", participants: 15 },
    { name: "10-15 min", participants: 25 },
    { name: "15-20 min", participants: 35 },
    { name: "20-25 min", participants: 30 },
    { name: "25-30 min", participants: 20 },
    { name: "30-35 min", participants: 15 },
    { name: "35-40 min", participants: 8 },
    { name: "40+ min", participants: 3 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-400">Comprehensive event analytics and insights</p>
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
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-gray-900/60 border border-gray-800">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="participation"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              <LineChartIcon className="h-4 w-4 mr-2" />
              Participation
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              <PieChartIcon className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-700 text-gray-300">
            <Calendar className="h-4 w-4 mr-2" />
            Apr 27, 2025
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-300">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="h-[600px] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle>Participant Activity</CardTitle>
                <CardDescription>Active participants and completion rate over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      active: {
                        label: "Active Participants",
                        color: "hsl(var(--chart-1))",
                      },
                      completed: {
                        label: "Completed Missions",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={participantActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="time" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="active"
                          stroke="var(--color-active)"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                          name="Active Participants"
                        />
                        <Line
                          type="monotone"
                          dataKey="completed"
                          stroke="var(--color-completed)"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                          name="Completed Missions"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle>Completion Rate by Round</CardTitle>
                <CardDescription>Participant progress through each mission round</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      completed: {
                        label: "Completed",
                        color: "hsl(var(--chart-1))",
                      },
                      inProgress: {
                        label: "In Progress",
                        color: "hsl(var(--chart-2))",
                      },
                      notStarted: {
                        label: "Not Started",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={completionRateData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="completed" stackId="a" fill="var(--color-completed)" name="Completed" />
                        <Bar dataKey="inProgress" stackId="a" fill="var(--color-inProgress)" name="In Progress" />
                        <Bar dataKey="notStarted" stackId="a" fill="var(--color-notStarted)" name="Not Started" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle>Question Difficulty Distribution</CardTitle>
                <CardDescription>Distribution of questions by difficulty level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={difficultyDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {difficultyDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value}%`, name]}
                        contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", borderRadius: "0.375rem" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle>Time Spent Distribution</CardTitle>
                <CardDescription>Distribution of time spent by participants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      participants: {
                        label: "Participants",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={timeSpentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar
                          dataKey="participants"
                          fill="var(--color-participants)"
                          radius={[4, 4, 0, 0]}
                          name="Participants"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>Important metrics and insights from the event</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <div className="text-sm text-gray-400">Average Completion Time</div>
                  <div className="text-2xl font-bold mt-1">18:42</div>
                  <div className="text-xs text-emerald-400 mt-1">5% faster than expected</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <div className="text-sm text-gray-400">Completion Rate</div>
                  <div className="text-2xl font-bold mt-1">35.3%</div>
                  <div className="text-xs text-amber-400 mt-1">10% below target</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <div className="text-sm text-gray-400">Most Challenging Question</div>
                  <div className="text-lg font-bold mt-1">Round 3, Q4</div>
                  <div className="text-xs text-red-400 mt-1">Only 22% correct answers</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <div className="text-sm text-gray-400">Participant Engagement</div>
                  <div className="text-2xl font-bold mt-1">92%</div>
                  <div className="text-xs text-emerald-400 mt-1">15% above average</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
