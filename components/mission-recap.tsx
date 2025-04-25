"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Clock, Trophy, CheckCircle } from "lucide-react"

interface MissionRecapProps {
  open: boolean
  onClose: () => void
}

export function MissionRecap({ open, onClose }: MissionRecapProps) {
  // Sample mission data - in a real app, this would come from a database or state
  const missionData = {
    rounds: [
      {
        id: 1,
        name: "Indian Space History & Riddles",
        correctAnswers: 4,
        totalQuestions: 5,
        timeSpent: "01:45",
      },
      {
        id: 2,
        name: "Aviation & Aerospace Encryption",
        correctAnswers: 5,
        totalQuestions: 5,
        timeSpent: "01:32",
      },
      {
        id: 3,
        name: "Pattern Recognition & Logic",
        correctAnswers: 4,
        totalQuestions: 5,
        timeSpent: "01:15",
      },
    ],
    totalTime: "04:32",
    totalScore: 820,
    rank: "Commander",
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-gray-900/90 backdrop-blur-md border border-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Mission Recap</h3>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Trophy className="h-5 w-5 text-amber-400 mr-2" />
                    <h4 className="text-lg font-bold text-white">Mission Performance</h4>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-cyan-400 mr-2" />
                    <span className="text-sm text-cyan-400 font-mono">{missionData.totalTime}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-black/30 border border-gray-800 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Total Score</div>
                    <div className="text-2xl font-bold text-amber-400">{missionData.totalScore}</div>
                  </div>
                  <div className="bg-black/30 border border-gray-800 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Final Rank</div>
                    <div className="text-2xl font-bold text-purple-400">{missionData.rank}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-4">Round Performance</h4>

                {missionData.rounds.map((round) => (
                  <div key={round.id} className="mb-4 last:mb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full bg-${round.id === 1 ? "cyan" : round.id === 2 ? "purple" : "emerald"}-500 mr-2`}
                        ></div>
                        <h5 className="font-medium text-white">
                          Round {round.id}: {round.name}
                        </h5>
                      </div>
                      <div className="text-sm text-gray-400">{round.timeSpent}</div>
                    </div>

                    <div className="bg-black/30 border border-gray-800 rounded-lg p-4 mb-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-400">Correct Answers</div>
                        <div className="flex items-center">
                          <CheckCircle className="h-3 w-3 text-emerald-400 mr-1" />
                          <span className="text-sm text-emerald-400">
                            {round.correctAnswers}/{round.totalQuestions}
                          </span>
                        </div>
                      </div>

                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-${round.id === 1 ? "cyan" : round.id === 2 ? "purple" : "emerald"}-500`}
                          style={{ width: `${(round.correctAnswers / round.totalQuestions) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-gray-800">
                <p className="text-sm text-gray-400 text-center">
                  Mission data has been recorded in the ISRO database.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
