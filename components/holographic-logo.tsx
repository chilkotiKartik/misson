"use client"

import { motion } from "framer-motion"

export function HolographicLogo() {
  return (
    <div className="relative w-32 h-32">
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      />

      <motion.div
        className="absolute inset-4 flex items-center justify-center"
        animate={{
          rotateY: [0, 360],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <div className="relative w-full h-full">
          {/* ISRO Logo */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-cyan-400"
            style={{ filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))" }}
          >
            <motion.path
              d="M50 10 A40 40 0 1 0 50 90 A40 40 0 1 0 50 10 Z M50 20 A30 30 0 1 1 50 80 A30 30 0 1 1 50 20 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              animate={{
                strokeDasharray: ["0, 1000", "1000, 0"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
            <motion.path
              d="M30 40 L70 40 L70 60 L30 60 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              animate={{
                strokeDasharray: ["0, 1000", "1000, 0"],
              }}
              transition={{ duration: 3, delay: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
            <motion.path
              d="M40 30 L60 30 L60 70 L40 70 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              animate={{
                strokeDasharray: ["0, 1000", "1000, 0"],
              }}
              transition={{ duration: 3, delay: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
            <motion.text
              x="50"
              y="53"
              textAnchor="middle"
              fontSize="12"
              fill="currentColor"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              ISRO
            </motion.text>
          </svg>

          {/* Holographic scan line */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
            style={{ height: "2px" }}
            animate={{
              top: ["0%", "100%", "0%"],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>

      {/* Floating particles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan-400"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 20 - 10],
            y: [0, Math.random() * 20 - 10],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}
