"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus, Edit, Trash2, Copy, Eye, RefreshCw, ChevronDown, ChevronUp, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function QuestionsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedRound, setExpandedRound] = useState<number | null>(1)
  const [lastRefreshed, setLastRefreshed] = useState(new Date())

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate refreshing data
    setTimeout(() => {
      setIsLoading(false)
      setLastRefreshed(new Date())
    }, 1000)
  }

  const toggleRound = (roundId: number) => {
    if (expandedRound === roundId) {
      setExpandedRound(null)
    } else {
      setExpandedRound(roundId)
    }
  }

  // Sample questions data
  const rounds = [
    {
      id: 1,
      name: "Indian Space History & Riddles",
      description: "Questions about ISRO's history and space-themed riddles",
      questions: [
        {
          id: 1,
          text: "When was ISRO founded?",
          type: "multiple_choice",
          options: ["1962", "1969", "1972", "1975"],
          correctAnswer: "1969",
          difficulty: "easy",
        },
        {
          id: 2,
          text: "Who is known as the father of the Indian space program?",
          type: "multiple_choice",
          options: ["A.P.J. Abdul Kalam", "Vikram Sarabhai", "Satish Dhawan", "K. Sivan"],
          correctAnswer: "Vikram Sarabhai",
          difficulty: "medium",
        },
        {
          id: 3,
          text: "Decode this message: 01001001 01010011 01010010 01001111",
          type: "text",
          correctAnswer: "ISRO",
          difficulty: "hard",
        },
        {
          id: 4,
          text: "What was the name of India's first satellite?",
          type: "multiple_choice",
          options: ["Bhaskara", "Rohini", "Aryabhata", "Insat-1A"],
          correctAnswer: "Aryabhata",
          difficulty: "medium",
        },
        {
          id: 5,
          text: "Solve this riddle: I'm the point where Earth's pull is zero. What am I?",
          type: "text",
          correctAnswer: "Lagrange point",
          difficulty: "hard",
        },
      ],
    },
    {
      id: 2,
      name: "Aviation & Aerospace Encryption",
      description: "Questions about aviation technology and encrypted messages",
      questions: [
        {
          id: 6,
          text: "What does GSLV stand for?",
          type: "multiple_choice",
          options: [
            "Global Satellite Launch Vehicle",
            "Geosynchronous Satellite Launch Vehicle",
            "General Space Launch Vehicle",
            "Guided Satellite Launch Vehicle",
          ],
          correctAnswer: "Geosynchronous Satellite Launch Vehicle",
          difficulty: "medium",
        },
        {
          id: 7,
          text: "Decrypt this Caesar cipher: YVJRLAZ",
          type: "text",
          correctAnswer: "ROCKETS",
          difficulty: "hard",
        },
        {
          id: 8,
          text: "Which of these is NOT a type of rocket propellant?",
          type: "multiple_choice",
          options: ["Liquid Hydrogen", "Solid Fuel", "Liquid Oxygen", "Liquid Nitrogen"],
          correctAnswer: "Liquid Nitrogen",
          difficulty: "medium",
        },
        {
          id: 9,
          text: "What is the name of ISRO's Mars orbiter mission?",
          type: "multiple_choice",
          options: ["Chandrayaan", "Mangalyaan", "Gaganyaan", "Aditya"],
          correctAnswer: "Mangalyaan",
          difficulty: "easy",
        },
        {
          id: 10,
          text: "Decode this binary: 01001101 01001111 01001111 01001110",
          type: "text",
          correctAnswer: "MOON",
          difficulty: "hard",
        },
      ],
    },
    {
      id: 3,
      name: "Pattern Recognition & Final Challenge",
      description: "Pattern recognition questions and the final password challenge",
      questions: [
        {
          id: 11,
          text: "What comes next in this sequence: 3, 6, 9, 18, 27, ?",
          type: "multiple_choice",
          options: ["36", "45", "54", "81"],
          correctAnswer: "54",
          difficulty: "medium",
        },
        {
          id: 12,
          text: "Identify the pattern: EARTH, MARS, JUPITER, ?",
          type: "multiple_choice",
          options: ["VENUS", "SATURN", "NEPTUNE", "MERCURY"],
          correctAnswer: "SATURN",
          difficulty: "easy",
        },
        {
          id: 13,
          text: "What is the missing number? 1, 4, 9, 16, 25, 36, ?",
          type: "text",
          correctAnswer: "49",
          difficulty: "medium",
        },
        {
          id: 14,
          text: "Decode this message: -.. . -.-. .-. -.-- .--. -",
          type: "text",
          correctAnswer: "DECRYPT",
          difficulty: "hard",
        },
        {
          id: 15,
          text: "Final Password Challenge: Combine the first letters of all correct answers from Round 1 and 2",
          type: "text",
          correctAnswer: "IVARLMRM",
          difficulty: "extreme",
        },
      ],
    },
  ]

  // Filter rounds and questions based on search term
  const filteredRounds = rounds
    .map((round) => ({
      ...round,
      questions: round.questions.filter(
        (q) =>
          q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (q.type === "multiple_choice" &&
            q.options.some((opt) => opt.toLowerCase().includes(searchTerm.toLowerCase()))) ||
          q.correctAnswer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((round) => round.questions.length > 0 || round.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">Easy</span>
      case "medium":
        return <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-400">Medium</span>
      case "hard":
        return <span className="px-2 py-1 rounded text-xs bg-amber-500/20 text-amber-400">Hard</span>
      case "extreme":
        return <span className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-400">Extreme</span>
      default:
        return <span className="px-2 py-1 rounded text-xs bg-gray-500/20 text-gray-400">Unknown</span>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Questions Management</h1>
          <p className="text-gray-400">Create, edit and manage all mission questions</p>
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
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-gray-900/60 border border-gray-800">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              All Rounds
            </TabsTrigger>
            <TabsTrigger
              value="round1"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              Round 1
            </TabsTrigger>
            <TabsTrigger
              value="round2"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              Round 2
            </TabsTrigger>
            <TabsTrigger
              value="round3"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              Round 3
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </div>
      </div>

      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-800/50 border-gray-700"
        />
      </div>

      {isLoading ? (
        <div className="h-[400px] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRounds.length > 0 ? (
            filteredRounds.map((round) => (
              <Card key={round.id} className="bg-gray-900/60 backdrop-blur-sm border-gray-800">
                <CardHeader className="cursor-pointer" onClick={() => toggleRound(round.id)}>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-purple-400" />
                        Round {round.id}: {round.name}
                      </CardTitle>
                      <CardDescription>{round.description}</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      {expandedRound === round.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                {expandedRound === round.id && (
                  <CardContent>
                    <div className="space-y-4">
                      {round.questions.length > 0 ? (
                        round.questions.map((question) => (
                          <div
                            key={question.id}
                            className="p-4 bg-gray-800/50 rounded-md border border-gray-700 space-y-3"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-400">Q{question.id}</span>
                                  {getDifficultyBadge(question.difficulty)}
                                  <span className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300 capitalize">
                                    {question.type.replace("_", " ")}
                                  </span>
                                </div>
                                <h3 className="text-base font-medium mt-2">{question.text}</h3>
                              </div>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {question.type === "multiple_choice" && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                {question.options.map((option, index) => (
                                  <div
                                    key={index}
                                    className={`p-2 rounded-md border ${
                                      option === question.correctAnswer
                                        ? "border-green-500/50 bg-green-500/10"
                                        : "border-gray-700 bg-gray-800/50"
                                    }`}
                                  >
                                    <div className="flex items-center">
                                      <div
                                        className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                                          option === question.correctAnswer ? "bg-green-500 text-black" : "bg-gray-700"
                                        }`}
                                      >
                                        {option === question.correctAnswer && "✓"}
                                      </div>
                                      <span>{option}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {question.type === "text" && (
                              <div className="mt-2">
                                <div className="flex items-center">
                                  <span className="text-sm text-gray-400 mr-2">Correct Answer:</span>
                                  <span className="px-2 py-1 bg-green-500/10 border border-green-500/50 rounded text-green-400">
                                    {question.correctAnswer}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-400">No questions match your search</div>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))
          ) : (
            <div className="p-8 text-center bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 mb-4">
                <FileText className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-1">No questions found</h3>
              <p className="text-gray-400">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
