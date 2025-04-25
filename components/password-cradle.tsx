"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface PasswordCradleProps {
  children: ReactNode
  isSuccess: boolean
  isError?: boolean
  dialRotation: number
}

export function PasswordCradle({ children, isSuccess, isError = false, dialRotation }: PasswordCradleProps) {
  return (
    <div className="relative">
      <div
        className={`absolute -inset-1 rounded-xl blur-lg opacity-30 transition-colors duration-500 ${
          isSuccess
            ? "bg-gradient-to-r from-emerald-500 to-green-600"
            : isError
              ? "bg-gradient-to-r from-red-500 to-pink-600"
              : "bg-gradient-to-r from-blue-500 to-purple-600"
        }`}
      ></div>

      <motion.div
        className={`relative bg-black/80 backdrop-blur-md border border-gray-800 rounded-xl overflow-hidden transition-colors duration-500 ${
          isSuccess ? "border-emerald-500/50" : isError ? "border-red-500/50" : ""
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-800 bg-gray-900/50">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <div className="flex-1 text-center">
            <span className="text-xs text-gray-400">ISRO SECURE VAULT</span>
          </div>
        </div>

        {/* Vault Mechanism Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-4 border-gray-800/50 z-0"></div>

        {/* Rotating Dial */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-blue-500/30 z-0"
          style={{
            background: "radial-gradient(circle, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0) 70%)",
          }}
          animate={{ rotate: dialRotation }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
          {/* Dial markers */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-4 bg-blue-500/50"
              style={{
                left: "50%",
                top: "0",
                transform: `translateX(-50%) rotate(${i * 60}deg) translateY(0)`,
                transformOrigin: "bottom center",
                top: "0",
              }}
            />
          ))}

          {/* Center point */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500/30"></div>
        </motion.div>

        {/* Success effect */}
        {isSuccess && (
          <motion.div
            className="absolute inset-0 bg-emerald-500/10 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          />
        )}

        {/* Error effect */}
        {isError && (
          <motion.div
            className="absolute inset-0 bg-red-500/10 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 0.3, repeat: 3 }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    </div>
  )
}
