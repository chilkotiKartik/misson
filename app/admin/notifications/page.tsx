"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Settings, Construction } from "lucide-react"

export default function AdminNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-gray-400">Manage system and participant notifications</p>
      </div>

      <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <Construction className="h-5 w-5 mr-2 text-purple-400" />
            Coming Soon
          </CardTitle>
          <CardDescription>This feature is currently under development</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-24 h-24 rounded-full bg-purple-500/10 flex items-center justify-center mb-6">
              <Bell className="h-12 w-12 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Notification Center Coming Soon</h2>
            <p className="text-gray-400 max-w-md mb-6">
              We're building a comprehensive notification system to keep you updated on participant progress, system
              alerts, and important events during Mission Decrypt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Settings className="h-4 w-4 mr-2" />
                Notification Preferences
              </Button>
              <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                <Bell className="h-4 w-4 mr-2" />
                Request Early Access
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
