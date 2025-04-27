"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Users, Construction } from "lucide-react"

export default function AdminMessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-gray-400">Communicate with participants and other administrators</p>
      </div>

      <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <Construction className="h-5 w-5 mr-2 text-cyan-400" />
            Coming Soon
          </CardTitle>
          <CardDescription>This feature is currently under development</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-24 h-24 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6">
              <MessageSquare className="h-12 w-12 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Messaging System Coming Soon</h2>
            <p className="text-gray-400 max-w-md mb-6">
              We're building a real-time messaging system to help you communicate with participants and other
              administrators during the Mission Decrypt event.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                <Users className="h-4 w-4 mr-2" />
                View Participants
              </Button>
              <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                <MessageSquare className="h-4 w-4 mr-2" />
                Request Early Access
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
