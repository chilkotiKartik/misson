"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DashboardHeader } from "@/components/dashboard-header"
import { MissionConsole } from "@/components/mission-console"
import { Clock, PauseCircle, HelpCircle, ArrowRight } from "lucide-react"

// Sample questions for Round 1
const round1Questions = [
  {
    id: 1,
    question: "Decode the mission that first orbited Mars from India.",
    options: ["Chandrayaan-1", "Mars Orbiter Mission", "Aditya-L1", "GSAT-7A"],
    correctAnswer: "Mars Orbiter Mission",
    hint: "Also known as Mangalyaan, launched in 2013.",
  },
  {
    id: 2,
    question: "I carry a payload, I'm no toy. I launched in '75, what's my name, boy?",
    options: ["Aryabhata", "Bhaskara", "Rohini", "INSAT-1A"],
    correctAnswer: "Aryabhata",
    hint: "Named after the ancient Indian mathematician.",
  },
  {
    id: 3,
    question: "Translate this binary: 01001001 01110011 01110010 01101111",
    options: ["ISRO", "NASA", "CNSA", "ESA"],
    correctAnswer: "ISRO",
    hint: "Convert each 8-bit binary to ASCII.",
  },
  {
    id: 4,
    question: "Which year was Chandrayaan-2 launched?",
    options: ["2017", "2018", "2019", "2020"],
    correctAnswer: "2019",
    hint: "It was launched in July of this year.",
  },
  {
    id: 5,
    question: "What was the name of India's first satellite?",
    options: ["Rohini", "Aryabhata", "Bhaskara", "INSAT-1A"],
    correctAnswer: "Aryabhata",
    hint: "Launched in 1975, named after an ancient astronomer.",
  },
]

export default function MissionStartPage() {
  const router = useRouter()
  const [currentRound, setCurrentRound] = useState(1)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [answers, setAnswers] = useState<string[]>([])
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const questions = round1Questions
  const currentQuestionData = questions[currentQuestion]
  const progress = (currentQuestion / questions.length) * 100

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (!isPaused) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPaused])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return

    setIsSubmitting(true)

    // Check if answer is correct
    const isAnswerCorrect = selectedAnswer === currentQuestionData.correctAnswer
    setIsCorrect(isAnswerCorrect)

    // Save the answer
    setAnswers((prev) => [...prev, selectedAnswer])

    // Show feedback
    setShowFeedback(true)

    // Move to next question after delay
    setTimeout(() => {
      setShowFeedback(false)
      setSelectedAnswer(null)
      setShowHint(false)
      setIsSubmitting(false)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
      } else {
        // End of round, would navigate to next round or final password
        router.push("/mission/final-password")
      }
    }, 2000)
  }

  const togglePause = () => {
    setIsPaused((prev) => !prev)
  }

  const toggleHint = () => {
    setShowHint((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
      </div>

      <DashboardHeader username="demo_agent" />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Mission Header */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Round {currentRound}: <span className="text-emerald-400">Indian Space History & Riddles</span>
            </h1>
            <p className="text-gray-300">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="flex items-center bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-md">
              <Clock className="h-5 w-5 mr-2 text-cyan-400" />
              <span className="font-mono text-lg">{formatTime(timeElapsed)}</span>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={togglePause}
            >
              <PauseCircle className="h-5 w-5" />
              <span className="sr-only">{isPaused ? "Resume" : "Pause"}</span>
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress
            value={progress}
            className="h-2 bg-gray-700"
            indicatorClassName="bg-gradient-to-r from-emerald-500 to-purple-500"
          />
        </div>

        {/* Mission Console */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MissionConsole>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                  <div className="font-mono text-emerald-400 text-sm">
                    MISSION_DECRYPT &gt; ROUND_1 &gt; QUESTION_{currentQuestion + 1}
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4 text-white">{currentQuestionData.question}</h2>

                  {showHint && (
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-md p-3 mb-4">
                      <p className="text-amber-400 text-sm">
                        <span className="font-bold">HINT:</span> {currentQuestionData.hint}
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {currentQuestionData.options.map((option, index) => (
                      <button
                        key={index}
                        className={`w-full text-left p-3 rounded-md border transition-all ${
                          selectedAnswer === option
                            ? "bg-cyan-500/20 border-cyan-500 text-white"
                            : "bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600"
                        } ${showFeedback && option === currentQuestionData.correctAnswer ? "bg-emerald-500/20 border-emerald-500" : ""}`}
                        onClick={() => handleAnswerSelect(option)}
                        disabled={isSubmitting || showFeedback}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                              selectedAnswer === option ? "bg-cyan-500 text-black" : "bg-gray-700"
                            } ${showFeedback && option === currentQuestionData.correctAnswer ? "bg-emerald-500" : ""}`}
                          >
                            {String.fromCharCode(65 + index)}
                          </div>
                          {option}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {showFeedback && (
                  <div
                    className={`mb-4 p-3 rounded-md ${isCorrect ? "bg-emerald-500/20 border border-emerald-500/30" : "bg-red-500/20 border border-red-500/30"}`}
                  >
                    <p className={isCorrect ? "text-emerald-400" : "text-red-400"}>
                      {isCorrect
                        ? "Correct! Well done, agent."
                        : `Incorrect. The correct answer is: ${currentQuestionData.correctAnswer}`}
                    </p>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
                    onClick={toggleHint}
                    disabled={showHint || isSubmitting || showFeedback}
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Use Hint
                  </Button>

                  <Button
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400"
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer || isSubmitting || showFeedback}
                  >
                    Submit Answer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </MissionConsole>
          </div>

          <div>
            <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800 h-full">
              <CardHeader>
                <CardTitle className="text-lg">Mission Briefing</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 text-sm">
                <p className="mb-4">
                  Welcome to Round 1 of Mission Decrypt, Agent. This round focuses on Indian space history and cryptic
                  riddles.
                </p>
                <p className="mb-4">
                  Each correct answer will contribute to your final decryption code. Choose wisely, as your answers will
                  determine your success.
                </p>
                <p>
                  You may use hints, but they will add a time penalty to your final score. The faster you complete the
                  mission, the higher your rank will be.
                </p>
              </CardContent>
              <CardFooter className="border-t border-gray-800 pt-4">
                <div className="w-full">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Round Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress
                    value={progress}
                    className="h-1 bg-gray-700"
                    indicatorClassName="bg-gradient-to-r from-emerald-500 to-purple-500"
                  />
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
