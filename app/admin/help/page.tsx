"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Mail, MessageSquare, Construction } from "lucide-react"

export default function AdminHelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-gray-400">Get assistance with Mission Decrypt administration</p>
      </div>

      <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <Construction className="h-5 w-5 mr-2 text-amber-400" />
            Coming Soon
          </CardTitle>
          <CardDescription>This feature is currently under development</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-24 h-24 rounded-full bg-amber-500/10 flex items-center justify-center mb-6">
              <HelpCircle className="h-12 w-12 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Help Center Coming Soon</h2>
            <p className="text-gray-400 max-w-md mb-6">
              We're working on building a comprehensive help center to assist you with all aspects of Mission Decrypt
              administration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10">
                <MessageSquare className="h-4 w-4 mr-2" />
                Submit Feedback
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
