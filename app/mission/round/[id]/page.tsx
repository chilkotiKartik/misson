"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { SpaceBackground } from "@/components/space-background"
import { MissionControlPanel } from "@/components/mission-control-panel"
import { MissionConsole } from "@/components/mission-console"
import { MissionBriefDrawer } from "@/components/mission-brief-drawer"
import { HelpCircle, ArrowRight, ChevronDown, ChevronUp, AlertCircle } from "lucide-react"
import { questions } from "@/data/questions"

export default function MissionRoundPage() {
  const router = useRouter()
  const params = useParams()
  const roundId = Number.parseInt(params.id as string, 10)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [answers, setAnswers] = useState<string[]>([])
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showBriefDrawer, setShowBriefDrawer] = useState(false)
  const [collectedPasswordParts, setCollectedPasswordParts] = useState<string[]>([])
  const [isInitializing, setIsInitializing] = useState(true)
  const [showTimerWarning, setShowTimerWarning] = useState(false)

  const roundQuestions = questions[roundId - 1] || []
  const currentQuestionData = roundQuestions[currentQuestion]
  const progress = (currentQuestion / roundQuestions.length) * 100

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/sounds/ambient-space.mp3")
      audioRef.current.volume = 0.1
      audioRef.current.loop = true
    }

    // Simulate initialization
    const timer = setTimeout(() => {
      setIsInitializing(false)
      // Start ambient sound
      audioRef.current?.play().catch((e) => console.log("Audio play failed:", e))

      // Show timer warning
      setShowTimerWarning(true)
      setTimeout(() => {
        setShowTimerWarning(false)
      }, 5000)
    }, 2000)

    return () => {
      clearTimeout(timer)
      audioRef.current?.pause()
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout

    // Timer is always running once initialized (no pause functionality)
    if (!isInitializing) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isInitializing])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answer: string) => {
    // Play sound
    const audio = new Audio("/sounds/select-option.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))

    setSelectedAnswer(answer)
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return

    setIsSubmitting(true)

    // Play sound
    const audio = new Audio("/sounds/submit-answer.mp3")
    audio.volume = 0.3
    audio.play().catch((e) => console.log("Audio play failed:", e))

    // Check if answer is correct
    const isAnswerCorrect = selectedAnswer === currentQuestionData.correctAnswer
    setIsCorrect(isAnswerCorrect)

    // Save the answer
    setAnswers((prev) => [...prev, selectedAnswer])

    // If correct, collect password part
    if (isAnswerCorrect) {
      setCollectedPasswordParts((prev) => [...prev, currentQuestionData.passwordPart])
    }

    // Show feedback
    setShowFeedback(true)

    // Play feedback sound
    setTimeout(() => {
      const feedbackAudio = new Audio(isAnswerCorrect ? "/sounds/correct-answer.mp3" : "/sounds/wrong-answer.mp3")
      feedbackAudio.volume = 0.3
      feedbackAudio.play().catch((e) => console.log("Audio play failed:", e))
    }, 300)

    // Move to next question after delay
    setTimeout(() => {
      setShowFeedback(false)
      setSelectedAnswer(null)
      setShowHint(false)
      setIsSubmitting(false)

      if (currentQuestion < roundQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
      } else {
        // End of round
        if (roundId < 3) {
          // Move to next round
          router.push(`/mission/round/${roundId + 1}`)
        } else {
          // Move to final password
          router.push("/mission/final-password")
        }
      }
    }, 2500)
  }

  const toggleHint = () => {
    // Play sound
    const audio = new Audio("/sounds/hint-reveal.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))

    setShowHint((prev) => !prev)
  }

  const toggleBriefDrawer = () => {
    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))

    setShowBriefDrawer((prev) => !prev)
  }

  // Get round theme
  const getRoundTheme = () => {
    switch (roundId) {
      case 1:
        return {
          title: "Indian Space History & Riddles",
          color: "cyan",
          description: "Decode ISRO's historical missions and space achievements",
        }
      case 2:
        return {
          title: "Aviation & Aerospace Encryption",
          color: "purple",
          description: "Crack codes related to global aviation and aerospace technology",
        }
      case 3:
        return {
          title: "Pattern Recognition & Logic",
          color: "emerald",
          description: "Solve complex pattern-based puzzles and logical challenges",
        }
      default:
        return {
          title: "Unknown Round",
          color: "gray",
          description: "Mission data unavailable",
        }
    }
  }

  const roundTheme = getRoundTheme()
  const themeColor = roundTheme.color

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <SpaceBackground roundTheme={themeColor} />

      {isInitializing ? (
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [1, 0.8, 1],
              }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <div
                className={`h-16 w-16 mx-auto rounded-full border-4 border-${themeColor}-500 border-t-transparent animate-spin`}
              ></div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className={`mt-4 text-2xl font-bold text-${themeColor}-400`}
            >
              Initializing Round {roundId}...
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-2 text-gray-400"
            >
              Loading mission parameters
            </motion.p>
          </motion.div>
        </div>
      ) : (
        <>
          <MissionControlPanel
            username="agent_nebula"
            roundId={roundId}
            timeElapsed={timeElapsed}
            isPaused={false}
            togglePause={() => {}}
            progress={progress}
            collectedPasswordParts={collectedPasswordParts}
            continuousTimer={true}
          />

          {showTimerWarning && (
            <motion.div
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-amber-500/90 text-black px-4 py-2 rounded-md shadow-lg flex items-center gap-2 max-w-md"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm font-medium">
                Timer is running continuously and cannot be paused. Good luck, agent!
              </p>
            </motion.div>
          )}

          <main className="flex-1 container mx-auto px-4 py-6">
            {/* Round Header */}
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className={`text-2xl md:text-3xl font-bold mb-2 text-${themeColor}-400`}>
                  Round {roundId}: {roundTheme.title}
                </h1>
                <p className="text-gray-300">
                  Question {currentQuestion + 1} of {roundQuestions.length}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-${themeColor}-500/50 text-${themeColor}-400 hover:bg-${themeColor}-500/10 md:hidden`}
                  onClick={toggleBriefDrawer}
                >
                  {showBriefDrawer ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronUp className="h-4 w-4 mr-2" />}
                  Mission Brief
                </Button>
              </div>
            </div>

            {/* Mission Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MissionConsole roundTheme={themeColor}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuestion}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-6"
                    >
                      <div className="flex items-center mb-4">
                        <div className={`w-3 h-3 rounded-full bg-${themeColor}-500 mr-2`}></div>
                        <div className={`font-mono text-${themeColor}-400 text-sm`}>
                          MISSION_DECRYPT &gt; ROUND_{roundId} &gt; QUESTION_{currentQuestion + 1}
                        </div>
                      </div>

                      <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4 text-white">{currentQuestionData?.question}</h2>

                        {showHint && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-amber-500/10 border border-amber-500/30 rounded-md p-3 mb-4"
                          >
                            <p className="text-amber-400 text-sm">
                              <span className="font-bold">HINT:</span> {currentQuestionData?.hint}
                            </p>
                          </motion.div>
                        )}

                        <div className="space-y-3">
                          {currentQuestionData?.options.map((option, index) => (
                            <motion.button
                              key={index}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              className={`w-full text-left p-3 rounded-md border transition-all ${
                                selectedAnswer === option
                                  ? `bg-${themeColor}-500/20 border-${themeColor}-500 text-white`
                                  : "bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600"
                              } ${
                                showFeedback && option === currentQuestionData.correctAnswer
                                  ? "bg-emerald-500/20 border-emerald-500"
                                  : ""
                              }`}
                              onClick={() => handleAnswerSelect(option)}
                              disabled={isSubmitting || showFeedback}
                            >
                              <div className="flex items-center">
                                <div
                                  className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                                    selectedAnswer === option ? `bg-${themeColor}-500 text-black` : "bg-gray-700"
                                  } ${
                                    showFeedback && option === currentQuestionData.correctAnswer ? "bg-emerald-500" : ""
                                  }`}
                                >
                                  {String.fromCharCode(65 + index)}
                                </div>
                                {option}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {showFeedback && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`mb-4 p-3 rounded-md ${
                            isCorrect
                              ? "bg-emerald-500/20 border border-emerald-500/30"
                              : "bg-red-500/20 border border-red-500/30"
                          }`}
                        >
                          <p className={isCorrect ? "text-emerald-400" : "text-red-400"}>
                            {isCorrect
                              ? "Correct! Password fragment acquired."
                              : `Incorrect. The correct answer is: ${currentQuestionData.correctAnswer}`}
                          </p>
                        </motion.div>
                      )}

                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          className={`border-amber-500/50 text-amber-400 hover:bg-amber-500/10`}
                          onClick={toggleHint}
                          disabled={showHint || isSubmitting || showFeedback}
                        >
                          <HelpCircle className="h-4 w-4 mr-2" />
                          Use Hint
                        </Button>

                        <Button
                          className={`bg-gradient-to-r from-${themeColor}-500 to-blue-600 text-black hover:from-${themeColor}-400 hover:to-blue-500`}
                          onClick={handleSubmitAnswer}
                          disabled={!selectedAnswer || isSubmitting || showFeedback}
                        >
                          Submit Answer
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </MissionConsole>
              </div>

              <div className="hidden lg:block">
                <Card className={`bg-black/60 backdrop-blur-sm border-gray-800 h-full border-${themeColor}-500/20`}>
                  <CardContent className="p-6">
                    <h3 className={`text-lg font-bold mb-4 text-${themeColor}-400`}>Mission Brief</h3>
                    <div className="text-gray-300 text-sm space-y-4">
                      <p>
                        Welcome to Round {roundId} of Mission Decrypt, Agent. This round focuses on{" "}
                        {roundTheme.title.toLowerCase()}.
                      </p>
                      <p>{roundTheme.description}</p>
                      <p>
                        Each correct answer will contribute to your final decryption code. Choose wisely, as your
                        answers will determine your success.
                      </p>

                      <div className="mt-6 pt-4 border-t border-gray-800">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                          <span className="text-amber-400 text-sm font-medium">Timer Running</span>
                        </div>
                        <p className="text-xs text-gray-400">
                          Your timer is running continuously and cannot be paused. Complete the mission as quickly as
                          possible for a higher ranking.
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-800">
                        <h4 className="text-sm font-semibold mb-2">Password Fragments Collected:</h4>
                        <div className="flex flex-wrap gap-2">
                          {collectedPasswordParts.map((part, index) => (
                            <div
                              key={index}
                              className={`px-2 py-1 rounded bg-${themeColor}-500/20 border border-${themeColor}-500/30 text-${themeColor}-400 text-xs font-mono`}
                            >
                              {part}
                            </div>
                          ))}
                          {Array.from({ length: Math.max(0, 5 - collectedPasswordParts.length) }).map((_, index) => (
                            <div
                              key={`empty-${index}`}
                              className="px-2 py-1 rounded bg-gray-800/50 border border-gray-700 text-gray-500 text-xs font-mono"
                            >
                              ???
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="w-full">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Round Progress</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <Progress
                            value={progress}
                            className="h-1 bg-gray-700"
                            indicatorClassName={`bg-gradient-to-r from-${themeColor}-500 to-blue-600`}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>

          {/* Mobile Mission Brief Drawer */}
          <MissionBriefDrawer
            open={showBriefDrawer}
            onClose={() => setShowBriefDrawer(false)}
            roundId={roundId}
            roundTheme={themeColor}
            roundTitle={roundTheme.title}
            roundDescription={roundTheme.description}
            progress={progress}
            collectedPasswordParts={collectedPasswordParts}
          />
        </>
      )}
    </div>
  )
}
