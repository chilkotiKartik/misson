"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { X } from "lucide-react"

interface MissionBriefDrawerProps {
  open: boolean
  onClose: () => void
  roundId: number
  roundTheme: string
  roundTitle: string
  roundDescription: string
  progress: number
  collectedPasswordParts: string[]
}

export function MissionBriefDrawer({
  open,
  onClose,
  roundId,
  roundTheme,
  roundTitle,
  roundDescription,
  progress,
  collectedPasswordParts,
}: MissionBriefDrawerProps) {
  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (open && target.classList.contains("drawer-backdrop")) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 rounded-t-xl z-50 max-h-[80vh] overflow-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-bold text-${roundTheme}-400`}>
                  Round {roundId}: {roundTitle}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-white"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-gray-300">{roundDescription}</p>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Mission Tips:</h4>
                  <ul className="space-y-1">
                    <li className="flex items-start text-sm text-gray-300">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-500 mt-1.5 mr-2"></span>
                      Each correct answer contributes to your final password
                    </li>
                    <li className="flex items-start text-sm text-gray-300">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-500 mt-1.5 mr-2"></span>
                      Use hints if you're stuck, but they reduce your score
                    </li>
                    <li className="flex items-start text-sm text-gray-300">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-500 mt-1.5 mr-2"></span>
                      Speed matters for your final ranking
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-800">
                  <h4 className="text-sm font-semibold mb-2">Password Fragments Collected:</h4>
                  <div className="flex flex-wrap gap-2">
                    {collectedPasswordParts.map((part, index) => (
                      <div
                        key={index}
                        className={`px-2 py-1 rounded bg-${roundTheme}-500/20 border border-${roundTheme}-500/30 text-${roundTheme}-400 text-xs font-mono`}
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
                      indicatorClassName={`bg-gradient-to-r from-${roundTheme}-500 to-blue-600`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
