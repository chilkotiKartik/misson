"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface MissionConsoleProps {
  children: ReactNode
  roundTheme?: string
}

export function MissionConsole({ children, roundTheme = "cyan" }: MissionConsoleProps) {
  return (
    <div className="relative">
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-${roundTheme}-500/30 to-blue-600/30 rounded-lg blur opacity-30`}
      ></div>
      <motion.div
        className="relative bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-800 bg-gray-900/50">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <div className="flex-1 text-center">
            <span className="text-xs text-gray-400">ISRO MISSION TERMINAL</span>
          </div>
        </div>
        {children}
      </motion.div>
    </div>
  )
}
