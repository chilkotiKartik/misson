"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function RocketLaunch() {
  const [launchStarted, setLaunchStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLaunchStarted(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 1 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Launch platform */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-10 bg-gray-800 rounded-t-lg"></div>

      {/* Rocket */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-20 h-60"
        initial={{ y: 0 }}
        animate={launchStarted ? { y: -800 } : { y: 0 }}
        transition={launchStarted ? { duration: 4, ease: [0.3, 0.1, 0.3, 1] } : {}}
      >
        {/* Rocket body */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-40 bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-full">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-12 bg-red-500 rounded-t-full"></div>
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-10 h-6 bg-gray-800 rounded-full"></div>
          <div className="absolute top-28 left-0 w-full h-2 bg-blue-500"></div>

          {/* ISRO Logo */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-10 h-6 bg-white rounded-sm flex items-center justify-center">
            <span className="text-xs font-bold text-blue-900">ISRO</span>
          </div>
        </div>

        {/* Fins */}
        <div className="absolute bottom-0 left-0 w-6 h-12 bg-red-500 skew-x-[30deg] origin-bottom-right"></div>
        <div className="absolute bottom-0 right-0 w-6 h-12 bg-red-500 -skew-x-[30deg] origin-bottom-left"></div>

        {/* Exhaust */}
        {launchStarted && (
          <>
            <motion.div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-8 h-20 bg-gradient-to-t from-amber-500 via-amber-400 to-transparent rounded-b-full"
              animate={{
                height: [20, 30, 20],
                width: [8, 12, 8],
              }}
              transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
            />

            <motion.div
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-t from-gray-500/80 via-gray-400/50 to-transparent rounded-full"
              animate={{
                height: [20, 30, 20],
                width: [20, 30, 20],
                opacity: [0.8, 0.4, 0.8],
              }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
            />

            {/* Smoke trail */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-800 pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-10 h-10 rounded-full bg-gray-400/30"
                  style={{
                    bottom: i * 40,
                    left: (Math.random() - 0.5) * 20,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.5, 0], scale: [0, 2, 3] }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 4,
                  }}
                />
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}
