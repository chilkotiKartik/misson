"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
  UserPlus,
  Download,
  Upload,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Copy,
  Check,
  Search,
  RefreshCw,
  CheckCircle2,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Participant {
  id: string
  email: string
  username: string
  password: string
  program: string
  phone: string
  status: "active" | "pending" | "blocked"
  createdAt: string
}

// Real participant data from the provided list
const realParticipants: Participant[] = [
  {
    id: "1",
    email: "23f2004422@ds.study.iitm.ac.in",
    username: "Meikanda Sivam Sivakumar",
    password: "12345",
    program: "Diploma",
    phone: "8667500082",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "2",
    email: "23f3001480@ds.study.iitm.ac.in",
    username: "Naini Diwan",
    password: "12345",
    program: "Diploma",
    phone: "9407127889",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "3",
    email: "23f3001874@ds.study.iitm.ac.in",
    username: "Aayush",
    password: "12345",
    program: "Diploma",
    phone: "8103997553",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "4",
    email: "24f3002739@ds.study.iitm.ac.in",
    username: "Chetan Sarup Mishra",
    password: "12345",
    program: "Foundation",
    phone: "8826062632",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "5",
    email: "24f3005137@ds.study.iitm.ac.in",
    username: "Aditya Kashyap Mohanty",
    password: "12345",
    program: "Foundation",
    phone: "9551669797",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "6",
    email: "25f1001578@ds.study.iitm.ac.in",
    username: "Khushal Shadija",
    password: "12345",
    program: "Foundation",
    phone: "9172364355",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "7",
    email: "23f1002312@ds.study.iitm.ac.in",
    username: "Chandrasekhar",
    password: "12345",
    program: "Diploma",
    phone: "9444380425",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "8",
    email: "24f2001208@ds.study.iitm.ac.in",
    username: "Yash Vania",
    password: "12345",
    program: "Foundation",
    phone: "9313687451",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "9",
    email: "25f1000135@ds.study.iitm.ac.in",
    username: "Bhupendra Kumar Sahu",
    password: "12345",
    program: "Foundation",
    phone: "7974205474",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "10",
    email: "24f2006542@ds.study.iitm.ac.in",
    username: "Devansh Bhatia",
    password: "12345",
    program: "Foundation",
    phone: "8607500077",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "11",
    email: "24f3100084@es.study.iitm.ac.in",
    username: "ADHITHYAN N",
    password: "12345",
    program: "Foundation",
    phone: "8838813860",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "12",
    email: "24f1000325@ds.study.iitm.ac.in",
    username: "Ojas Singwi",
    password: "12345",
    program: "Diploma",
    phone: "8888619443",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "13",
    email: "24f2008339@ds.study.iitm.ac.in",
    username: "SHAIF ALI",
    password: "12345",
    program: "Foundation",
    phone: "9415825661",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "14",
    email: "24f2004346@ds.study.iitm.ac.in",
    username: "SUDEEP DAS",
    password: "12345",
    program: "Diploma",
    phone: "8509246169",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "15",
    email: "24ds3000019@ds.study.iitm.ac.in",
    username: "Uday Pratap",
    password: "12345",
    program: "Diploma",
    phone: "9988423240",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "16",
    email: "22f3001905@ds.study.iitm.ac.in",
    username: "Vikram Negi",
    password: "12345",
    program: "Diploma",
    phone: "8850926613",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "17",
    email: "24f3000650@ds.study.iitm.ac.in",
    username: "M S Rishav Subhin",
    password: "12345",
    program: "Foundation",
    phone: "9835597637",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "18",
    email: "24f2005361@ds.study.iitm.ac.in",
    username: "Molik Mittal",
    password: "12345",
    program: "Foundation",
    phone: "8287912477",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "19",
    email: "23f3004052@ds.study.iitm.ac.in",
    username: "Anjalee Chaudhary",
    password: "12345",
    program: "Foundation",
    phone: "9720206835",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "20",
    email: "25f1001932@ds.study.iitm.ac.in",
    username: "Afzal Akhtar Khan",
    password: "12345",
    program: "Foundation",
    phone: "9619172979",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "21",
    email: "23f3000705@ds.study.iitm.ac.in",
    username: "S Pathmhajam",
    password: "12345",
    program: "Diploma",
    phone: "9940004227",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "22",
    email: "24f2009029@ds.study.iitm.ac.in",
    username: "Srishti",
    password: "12345",
    program: "Diploma",
    phone: "9654254319",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "23",
    email: "24f2002831@ds.study.iitm.ac.in",
    username: "Abinaya S",
    password: "12345",
    program: "Foundation",
    phone: "9884178122",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "24",
    email: "24f2000808@ds.study.iitm.ac.in",
    username: "Athar",
    password: "12345",
    program: "Diploma",
    phone: "9142295874",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "25",
    email: "24f3001303@ds.study.iitm.ac.in",
    username: "Harshal Kokate",
    password: "12345",
    program: "Foundation",
    phone: "8421001055",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "26",
    email: "24f3005053@ds.study.iitm.ac.in",
    username: "Rounak Sengupta",
    password: "12345",
    program: "Diploma",
    phone: "9474120501",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "27",
    email: "24f2007473@ds.study.iitm.ac.in",
    username: "Vishaal S",
    password: "12345",
    program: "Diploma",
    phone: "8270662107",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "28",
    email: "23f1002144@ds.study.iitm.ac.in",
    username: "Gursimar Singh Miglani",
    password: "12345",
    program: "Diploma",
    phone: "8557054411",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "29",
    email: "24f3005120@ds.study.iitm.ac.in",
    username: "Aditya Pal",
    password: "12345",
    program: "Foundation",
    phone: "8169531060",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "30",
    email: "24f3003029@ds.study.iitm.ac.in",
    username: "Oum Gupta",
    password: "12345",
    program: "Foundation",
    phone: "9335733040",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "31",
    email: "24f2003159@ds.study.iitm.ac.in",
    username: "Sohith Avvari",
    password: "12345",
    program: "Foundation",
    phone: "8897564752",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "32",
    email: "22f3000565@ds.study.iitm.ac.in",
    username: "Janesh E",
    password: "12345",
    program: "Diploma",
    phone: "7806851741",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "33",
    email: "24f2004518@ds.study.iitm.ac.in",
    username: "SIDDHARTH K P",
    password: "12345",
    program: "Foundation",
    phone: "6282671991",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "34",
    email: "24f3003810@ds.study.iitm.ac.in",
    username: "tanisha rani",
    password: "12345",
    program: "Foundation",
    phone: "9577026000",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "35",
    email: "24f2005264@ds.study.iitm.ac.in",
    username: "Pratham",
    password: "12345",
    program: "Foundation",
    phone: "9311977499",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "36",
    email: "24f3003089@ds.study.iitm.ac.in",
    username: "Shivesh kumar satyam",
    password: "12345",
    program: "Foundation",
    phone: "6201687316",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "37",
    email: "23f3001208@ds.study.iitm.ac.in",
    username: "SADIYA MAHEEN SIDDIQUI",
    password: "12345",
    program: "Degree",
    phone: "9963661025",
    status: "active",
    createdAt: "2025-04-27",
  },
  {
    id: "38",
    email: "24f2003909@ds.study.iitm.ac.in",
    username: "Pratham Amritkar",
    password: "12345",
    program: "Foundation",
    phone: "9309224806",
    status: "active",
    createdAt: "2025-04-27",
  },
]

export function AdminParticipantManagement() {
  const [participants, setParticipants] = useState<Participant[]>(realParticipants)
  const [searchTerm, setSearchTerm] = useState("")
  const [programFilter, setProgramFilter] = useState<string>("all")
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([])
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [isAddingParticipant, setIsAddingParticipant] = useState(false)
  const [isBulkImporting, setIsBulkImporting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [isEditingParticipant, setIsEditingParticipant] = useState(false)
  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null)
  const [newParticipant, setNewParticipant] = useState({
    email: "",
    username: "",
    password: "12345", // Default password
    program: "Foundation",
    phone: "",
  })

  // Filter participants based on search term and program filter
  const filteredParticipants = participants.filter((participant) => {
    const matchesSearch =
      participant.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.phone.includes(searchTerm)

    const matchesProgram = programFilter === "all" || participant.program === programFilter

    return matchesSearch && matchesProgram
  })

  const handleAddParticipant = () => {
    if (!newParticipant.username || !newParticipant.email) return

    const participant: Participant = {
      id: (participants.length + 1).toString(),
      email: newParticipant.email,
      username: newParticipant.username,
      password: newParticipant.password,
      program: newParticipant.program,
      phone: newParticipant.phone,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    }

    setParticipants([...participants, participant])
    setNewParticipant({
      email: "",
      username: "",
      password: "12345",
      program: "Foundation",
      phone: "",
    })
    setIsAddingParticipant(false)

    // Play success sound
    const audio = new Audio("/sounds/success-chime.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))
  }

  const handleUpdateParticipant = () => {
    if (!currentParticipant) return

    setParticipants(participants.map((p) => (p.id === currentParticipant.id ? { ...currentParticipant } : p)))
    setIsEditingParticipant(false)
    setCurrentParticipant(null)

    // Play success sound
    const audio = new Audio("/sounds/success-chime.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))
  }

  const handleEditParticipant = (participant: Participant) => {
    setCurrentParticipant({ ...participant })
    setIsEditingParticipant(true)

    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.1
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
    const credentials = `Email: ${participant.email}\nUsername: ${participant.username}\nPassword: ${participant.password}`
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
    setSelectedParticipants(selectedParticipants.filter((pId) => pId !== id))

    // Play sound
    const audio = new Audio("/sounds/error-beep.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))
  }

  const handleDeleteSelected = () => {
    setParticipants(participants.filter((p) => !selectedParticipants.includes(p.id)))
    setSelectedParticipants([])
    setIsAllSelected(false)

    // Play sound
    const audio = new Audio("/sounds/error-beep.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))
  }

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedParticipants([])
    } else {
      setSelectedParticipants(filteredParticipants.map((p) => p.id))
    }
    setIsAllSelected(!isAllSelected)

    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.1
    audio.play().catch((e) => console.log("Audio play failed:", e))
  }

  const toggleSelectParticipant = (id: string) => {
    if (selectedParticipants.includes(id)) {
      setSelectedParticipants(selectedParticipants.filter((pId) => pId !== id))
    } else {
      setSelectedParticipants([...selectedParticipants, id])
    }

    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.1
    audio.play().catch((e) => console.log("Audio play failed:", e))
  }

  const resetFilters = () => {
    setSearchTerm("")
    setProgramFilter("all")

    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.1
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

  const handleBulkStatusChange = (status: "active" | "pending" | "blocked") => {
    setParticipants(participants.map((p) => (selectedParticipants.includes(p.id) ? { ...p, status } : p)))

    // Play sound
    const audio = new Audio("/sounds/success-chime.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle>Participant Management</CardTitle>
          <CardDescription>Manage participant accounts for Mission Decrypt</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700"
              />
            </div>
            <div className="flex gap-2">
              <div className="w-40">
                <Select value={programFilter} onValueChange={setProgramFilter}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Filter by program" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Programs</SelectItem>
                    <SelectItem value="Foundation">Foundation</SelectItem>
                    <SelectItem value="Diploma">Diploma</SelectItem>
                    <SelectItem value="Degree">Degree</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="icon" className="border-gray-700 text-gray-300" onClick={resetFilters}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {selectedParticipants.length > 0 && (
            <div className="flex items-center justify-between bg-purple-500/10 p-3 rounded-md mb-4">
              <div className="text-sm text-purple-300">
                <span className="font-medium">{selectedParticipants.length}</span> participants selected
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => handleBulkStatusChange("active")}
                >
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Activate
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  onClick={handleDeleteSelected}
                >
                  <Trash2 className="h-3 w-3 mr-1" /> Delete
                </Button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="w-10">
                    <Checkbox checked={isAllSelected} onCheckedChange={toggleSelectAll} aria-label="Select all" />
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Password</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParticipants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-400">
                      No participants found matching your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredParticipants.map((participant) => (
                    <TableRow key={participant.id} className="border-gray-800">
                      <TableCell>
                        <Checkbox
                          checked={selectedParticipants.includes(participant.id)}
                          onCheckedChange={() => toggleSelectParticipant(participant.id)}
                          aria-label={`Select ${participant.username}`}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-xs">{participant.email}</TableCell>
                      <TableCell className="font-medium">{participant.username}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono">
                            {showPasswords[participant.id] ? participant.password : "•••••"}
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
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            participant.program === "Foundation"
                              ? "border-cyan-500/50 text-cyan-400"
                              : participant.program === "Diploma"
                                ? "border-purple-500/50 text-purple-400"
                                : "border-amber-500/50 text-amber-400"
                          }
                        >
                          {participant.program}
                        </Badge>
                      </TableCell>
                      <TableCell>{participant.phone}</TableCell>
                      <TableCell>{getStatusBadge(participant.status)}</TableCell>
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
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleEditParticipant(participant)}
                          >
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
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t border-gray-800 pt-6">
          <div className="text-sm text-gray-400">
            Showing {filteredParticipants.length} of {participants.length} participants
          </div>
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
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="participant@example.com"
                      value={newParticipant.email}
                      onChange={(e) => setNewParticipant({ ...newParticipant, email: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Full Name</Label>
                    <Input
                      id="username"
                      placeholder="John Doe"
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
                    <Label htmlFor="program">Program</Label>
                    <Select
                      value={newParticipant.program}
                      onValueChange={(value) => setNewParticipant({ ...newParticipant, program: value })}
                    >
                      <SelectTrigger id="program" className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Foundation">Foundation</SelectItem>
                        <SelectItem value="Diploma">Diploma</SelectItem>
                        <SelectItem value="Degree">Degree</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="9876543210"
                      value={newParticipant.phone}
                      onChange={(e) => setNewParticipant({ ...newParticipant, phone: e.target.value })}
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

            <Dialog open={isEditingParticipant} onOpenChange={setIsEditingParticipant}>
              <DialogContent className="bg-gray-900 border-gray-800">
                <DialogHeader>
                  <DialogTitle>Edit Participant</DialogTitle>
                  <DialogDescription>Update participant information</DialogDescription>
                </DialogHeader>
                {currentParticipant && (
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-email">Email</Label>
                      <Input
                        id="edit-email"
                        type="email"
                        value={currentParticipant.email}
                        onChange={(e) => setCurrentParticipant({ ...currentParticipant, email: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-username">Full Name</Label>
                      <Input
                        id="edit-username"
                        value={currentParticipant.username}
                        onChange={(e) => setCurrentParticipant({ ...currentParticipant, username: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-password">Password</Label>
                      <Input
                        id="edit-password"
                        value={currentParticipant.password}
                        onChange={(e) => setCurrentParticipant({ ...currentParticipant, password: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-program">Program</Label>
                      <Select
                        value={currentParticipant.program}
                        onValueChange={(value) => setCurrentParticipant({ ...currentParticipant, program: value })}
                      >
                        <SelectTrigger id="edit-program" className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select program" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="Foundation">Foundation</SelectItem>
                          <SelectItem value="Diploma">Diploma</SelectItem>
                          <SelectItem value="Degree">Degree</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-phone">Phone Number</Label>
                      <Input
                        id="edit-phone"
                        value={currentParticipant.phone}
                        onChange={(e) => setCurrentParticipant({ ...currentParticipant, phone: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-status">Status</Label>
                      <Select
                        value={currentParticipant.status}
                        onValueChange={(value: "active" | "pending" | "blocked") =>
                          setCurrentParticipant({ ...currentParticipant, status: value })
                        }
                      >
                        <SelectTrigger id="edit-status" className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="blocked">Blocked</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditingParticipant(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateParticipant} className="bg-purple-600 hover:bg-purple-700 text-white">
                    Update Participant
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
                    <p className="text-xs text-gray-500">Format: email,name,password,program,phone</p>
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

            <Dialog open={isExporting} onOpenChange={setIsExporting}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800">
                <DialogHeader>
                  <DialogTitle>Export Participants</DialogTitle>
                  <DialogDescription>Download participant data as CSV or Excel</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex flex-col gap-4">
                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Export as CSV
                    </Button>
                    <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                      <Download className="h-4 w-4 mr-2" />
                      Export as Excel
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsExporting(false)}>
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
