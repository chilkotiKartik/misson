"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Download, Upload, Trash2, Edit, Eye, EyeOff, Copy, Check } from "lucide-react"

interface Participant {
  id: string
  username: string
  password: string
  email: string
  status: "active" | "pending" | "blocked"
  createdAt: string
}

export function AdminParticipantManagement() {
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "1",
      username: "agent_nebula",
      password: "isro123",
      email: "agent_nebula@example.com",
      status: "active",
      createdAt: "2025-04-20",
    },
    {
      id: "2",
      username: "cosmic_coder",
      password: "cosmic123",
      email: "cosmic_coder@example.com",
      status: "active",
      createdAt: "2025-04-21",
    },
    {
      id: "3",
      username: "space_hacker",
      password: "space123",
      email: "space_hacker@example.com",
      status: "pending",
      createdAt: "2025-04-22",
    },
    {
      id: "4",
      username: "quantum_queen",
      password: "quantum123",
      email: "quantum_queen@example.com",
      status: "active",
      createdAt: "2025-04-23",
    },
    {
      id: "5",
      username: "binary_boss",
      password: "binary123",
      email: "binary_boss@example.com",
      status: "blocked",
      createdAt: "2025-04-24",
    },
  ])

  const [newParticipant, setNewParticipant] = useState({
    username: "",
    password: "",
    email: "",
  })

  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({})
  const [isAddingParticipant, setIsAddingParticipant] = useState(false)
  const [isBulkImporting, setIsBulkImporting] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleAddParticipant = () => {
    if (!newParticipant.username || !newParticipant.password) return

    const participant: Participant = {
      id: (participants.length + 1).toString(),
      username: newParticipant.username,
      password: newParticipant.password,
      email: newParticipant.email,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    }

    setParticipants([...participants, participant])
    setNewParticipant({ username: "", password: "", email: "" })
    setIsAddingParticipant(false)

    // Play success sound
    const audio = new Audio("/sounds/success-chime.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))
  }

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))

    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.1
    audio.play().catch((e) => console.log("Audio play failed:", e))
  }

  const copyCredentials = (participant: Participant) => {
    const credentials = `Username: ${participant.username}\nPassword: ${participant.password}`
    navigator.clipboard.writeText(credentials)

    setCopiedId(participant.id)
    setTimeout(() => setCopiedId(null), 2000)

    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.1
    audio.play().catch((e) => console.log("Audio play failed:", e))
  }

  const handleStatusChange = (id: string, status: "active" | "pending" | "blocked") => {
    setParticipants(participants.map((p) => (p.id === id ? { ...p, status } : p)))

    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.1
    audio.play().catch((e) => console.log("Audio play failed:", e))
  }

  const handleDeleteParticipant = (id: string) => {
    setParticipants(participants.filter((p) => p.id !== id))

    // Play sound
    const audio = new Audio("/sounds/error-beep.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">Active</Badge>
      case "pending":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Pending</Badge>
      case "blocked":
        return <Badge className="bg-red-500 hover:bg-red-600">Blocked</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="participants" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList className="bg-gray-900/60 border border-gray-800">
            <TabsTrigger
              value="participants"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              All Participants
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="blocked"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              Blocked
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Dialog open={isAddingParticipant} onOpenChange={setIsAddingParticipant}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Participant
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800">
                <DialogHeader>
                  <DialogTitle>Add New Participant</DialogTitle>
                  <DialogDescription>Create login credentials for a new participant</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username/Codename</Label>
                    <Input
                      id="username"
                      placeholder="agent_nebula"
                      value={newParticipant.username}
                      onChange={(e) => setNewParticipant({ ...newParticipant, username: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      placeholder="••••••••"
                      value={newParticipant.password}
                      onChange={(e) => setNewParticipant({ ...newParticipant, password: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="agent@example.com"
                      value={newParticipant.email}
                      onChange={(e) => setNewParticipant({ ...newParticipant, email: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingParticipant(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddParticipant} className="bg-purple-600 hover:bg-purple-700 text-white">
                    Add Participant
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isBulkImporting} onOpenChange={setIsBulkImporting}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800">
                <DialogHeader>
                  <DialogTitle>Bulk Import Participants</DialogTitle>
                  <DialogDescription>Upload a CSV file with participant details</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
                    <p className="text-sm text-gray-400 mb-2">Drag and drop a CSV file, or click to browse</p>
                    <p className="text-xs text-gray-500">Format: username,password,email (optional)</p>
                    <Button variant="outline" className="mt-4 border-gray-700 text-gray-300">
                      Select File
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsBulkImporting(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => setIsBulkImporting(false)}
                  >
                    Import Participants
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="participants">
          <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle>All Participants</CardTitle>
              <CardDescription>Manage participant accounts and credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead>Username</TableHead>
                      <TableHead>Password</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {participants.map((participant) => (
                      <TableRow key={participant.id} className="border-gray-800">
                        <TableCell className="font-medium">{participant.username}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono">
                              {showPasswords[participant.id] ? participant.password : "••••••••"}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => togglePasswordVisibility(participant.id)}
                            >
                              {showPasswords[participant.id] ? (
                                <EyeOff className="h-3 w-3" />
                              ) : (
                                <Eye className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{participant.email || "-"}</TableCell>
                        <TableCell>{getStatusBadge(participant.status)}</TableCell>
                        <TableCell>{participant.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => copyCredentials(participant)}
                            >
                              {copiedId === participant.id ? (
                                <Check className="h-3 w-3 text-green-400" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-red-400"
                              onClick={() => handleDeleteParticipant(participant.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
              <div className="text-sm text-gray-400">Showing {participants.length} participants</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-300" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-300" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle>Pending Participants</CardTitle>
              <CardDescription>Participants waiting for approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {participants
                      .filter((p) => p.status === "pending")
                      .map((participant) => (
                        <TableRow key={participant.id} className="border-gray-800">
                          <TableCell className="font-medium">{participant.username}</TableCell>
                          <TableCell>{participant.email || "-"}</TableCell>
                          <TableCell>{participant.createdAt}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                onClick={() => handleStatusChange(participant.id, "active")}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                                onClick={() => handleStatusChange(participant.id, "blocked")}
                              >
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
              {participants.filter((p) => p.status === "pending").length === 0 && (
                <div className="text-center py-8 text-gray-400">No pending participants found</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blocked">
          <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle>Blocked Participants</CardTitle>
              <CardDescription>Participants who have been blocked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {participants
                      .filter((p) => p.status === "blocked")
                      .map((participant) => (
                        <TableRow key={participant.id} className="border-gray-800">
                          <TableCell className="font-medium">{participant.username}</TableCell>
                          <TableCell>{participant.email || "-"}</TableCell>
                          <TableCell>{participant.createdAt}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                onClick={() => handleStatusChange(participant.id, "active")}
                              >
                                Unblock
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                                onClick={() => handleDeleteParticipant(participant.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
              {participants.filter((p) => p.status === "blocked").length === 0 && (
                <div className="text-center py-8 text-gray-400">No blocked participants found</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
