"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface AdminActivityChartProps {
  isLoading: boolean
}

export function AdminActivityChart({ isLoading }: AdminActivityChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    if (!isLoading) {
      // Generate random activity data for the last hour
      const now = new Date()
      const hourData = Array.from({ length: 12 }, (_, i) => {
        const time = new Date(now.getTime() - (11 - i) * 5 * 60000)
        return {
          time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          active: Math.floor(Math.random() * 30) + 20,
          completed: Math.floor(Math.random() * 10),
        }
      })
      setData(hourData)
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="h-[300px]">
      <ChartContainer
        config={{
          active: {
            label: "Active Users",
            color: "hsl(var(--chart-1))",
          },
          completed: {
            label: "Completed Missions",
            color: "hsl(var(--chart-2))",
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
              name="Active Users"
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
  )
}
