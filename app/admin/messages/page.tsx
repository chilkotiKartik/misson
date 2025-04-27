"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, ArrowLeft, Construction } from "lucide-react"
import Link from "next/link"

export default function AdminMessagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-gray-400">Communication center for Mission Decrypt</p>
        </div>
        <Link href="/admin">
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Construction className="h-5 w-5 text-amber-400" />
            <CardTitle>Coming Soon</CardTitle>
          </div>
          <CardDescription>This feature is currently under development</CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
              <MessageSquare className="h-12 w-12 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Messaging System Coming Soon</h2>
            <p className="text-gray-400 text-center max-w-md mb-6">
              We're building a powerful messaging system to help you communicate with participants and other
              administrators. Check back soon!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
              <Card className="bg-gray-800/60 border-gray-700">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">Direct Messages</h3>
                  <p className="text-sm text-gray-400">One-on-one communication</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/60 border-gray-700">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">Group Chats</h3>
                  <p className="text-sm text-gray-400">Team collaboration</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/60 border-gray-700">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">Announcements</h3>
                  <p className="text-sm text-gray-400">Broadcast important updates</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/60 border-gray-700">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">File Sharing</h3>
                  <p className="text-sm text-gray-400">Share resources securely</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
