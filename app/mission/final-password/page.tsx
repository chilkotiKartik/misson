"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SpaceBackground } from "@/components/space-background"
import { MissionControlPanel } from "@/components/mission-control-panel"
import { PasswordCradle } from "@/components/password-cradle"
import { Lock, Rocket } from "lucide-react"

export default function FinalPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""))
  const [isInitializing, setIsInitializing] = useState(true)
  const [dialRotation, setDialRotation] = useState(0)

  // For demo purposes, the correct password is "LAUNCH"
  const correctPassword = "LAUNCH"

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/sounds/ambient-tense.mp3")
      audioRef.current.volume = 0.15
      audioRef.current.loop = true
    }

    // Simulate initialization
    const timer = setTimeout(() => {
      setIsInitializing(false)
      // Start ambient sound
      audioRef.current?.play().catch((e) => console.log("Audio play failed:", e))
    }, 2000)

    return () => {
      clearTimeout(timer)
      audioRef.current?.pause()
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout

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

  const handleDigitChange = (index: number, value: string) => {
    if (value.length > 1) return

    // Play key sound
    const audio = new Audio("/sounds/key-press.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))

    const newDigits = [...digits]
    newDigits[index] = value.toUpperCase()
    setDigits(newDigits)

    // Rotate the dial
    setDialRotation((prev) => prev + 60)

    // Move to next input if value is entered
    if (value && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`)
      if (nextInput) nextInput.focus()
    }

    // Update the full password
    setPassword(newDigits.join(""))
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      const prevInput = document.getElementById(`digit-${index - 1}`)
      if (prevInput) {
        prevInput.focus()
        // Clear the previous digit
        const newDigits = [...digits]
        newDigits[index - 1] = ""
        setDigits(newDigits)
        setPassword(newDigits.join(""))
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password.length !== 6) {
      setIsError(true)
      setErrorMessage("Final password must be 6 characters")

      // Play error sound
      const audio = new Audio("/sounds/error-beep.mp3")
      audio.volume = 0.3
      audio.play().catch((e) => console.log("Audio play failed:", e))

      setTimeout(() => setIsError(false), 3000)
      return
    }

    setIsSubmitting(true)

    // Play verification sound
    const audio = new Audio("/sounds/password-verify.mp3")
    audio.volume = 0.3
    audio.play().catch((e) => console.log("Audio play failed:", e))

    // Check if password is correct (for demo purposes)
    setTimeout(() => {
      if (password === correctPassword) {
        setIsSuccess(true)

        // Play success sound
        const successAudio = new Audio("/sounds/password-success.mp3")
        successAudio.volume = 0.3
        successAudio.play().catch((e) => console.log("Audio play failed:", e))

        // Stop ambient sound
        audioRef.current?.pause()

        setTimeout(() => {
          router.push("/mission/success")
        }, 3000)
      } else {
        setIsError(true)
        setErrorMessage("Incorrect password. Try again.")

        // Play error sound
        const errorAudio = new Audio("/sounds/password-fail.mp3")
        errorAudio.volume = 0.3
        errorAudio.play().catch((e) => console.log("Audio play failed:", e))

        setTimeout(() => {
          setIsError(false)
          setIsSubmitting(false)
        }, 3000)
      }
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <SpaceBackground roundTheme="blue" />

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
              <Lock className="h-16 w-16 text-blue-400 mx-auto" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-4 text-2xl font-bold text-blue-400"
            >
              Initializing Password Cradle...
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-2 text-gray-400"
            >
              Preparing final decryption interface
            </motion.p>
          </motion.div>
        </div>
      ) : (
        <>
          <MissionControlPanel
            username="agent_nebula"
            roundId={4}
            timeElapsed={timeElapsed}
            isPaused={false}
            togglePause={() => {}}
            progress={100}
            collectedPasswordParts={["L", "A", "U", "N", "C", "H"]}
            isFinalStage={true}
          />

          <main className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
            <div className="w-full max-w-3xl">
              <PasswordCradle isSuccess={isSuccess} isError={isError} dialRotation={dialRotation}>
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <Lock className="h-6 w-6 text-blue-400 mr-2" />
                    <h1 className="text-2xl font-bold text-white">Final Decryption Vault</h1>
                  </div>

                  <div className="mb-8 text-center">
                    <p className="text-lg text-gray-300 mb-4">
                      🧪 All your answers have formed the Final Decryption Code. Enter it to launch.
                    </p>
                    <p className="text-sm text-gray-400">
                      The code consists of 6 characters derived from your mission answers.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-8">
                      <div className="flex justify-center gap-2 md:gap-4">
                        <AnimatePresence>
                          {digits.map((digit, index) => (
                            <motion.div
                              key={index}
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: index * 0.1, duration: 0.3 }}
                            >
                              <Input
                                id={`digit-${index}`}
                                type="text"
                                value={digit}
                                onChange={(e) => handleDigitChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                maxLength={1}
                                className={`w-12 h-14 md:w-16 md:h-20 text-center text-2xl font-mono bg-gray-800/80 border-2 ${
                                  isSuccess
                                    ? "border-emerald-500 text-emerald-400"
                                    : isError
                                      ? "border-red-500 text-red-400"
                                      : "border-blue-500 text-white"
                                } focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all`}
                                disabled={isSubmitting || isSuccess}
                              />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      {isError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 text-center text-red-400 text-sm"
                        >
                          {errorMessage}
                        </motion.div>
                      )}
                    </div>

                    <div className="flex justify-center">
                      <Button
                        type="submit"
                        className={`px-8 py-6 text-lg font-bold rounded-lg shadow-lg transition-all ${
                          isSuccess
                            ? "bg-emerald-500 text-black hover:bg-emerald-400 shadow-emerald-500/20"
                            : "bg-gradient-to-r from-blue-500 to-purple-600 text-black hover:from-blue-400 hover:to-purple-500 shadow-blue-500/20 hover:shadow-blue-500/40"
                        }`}
                        disabled={isSubmitting || isSuccess || digits.some((d) => !d)}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                            Verifying...
                          </div>
                        ) : isSuccess ? (
                          <div className="flex items-center">
                            Launch Sequence Initiated
                            <Rocket className="ml-2 h-5 w-5" />
                          </div>
                        ) : (
                          "Decrypt and Launch"
                        )}
                      </Button>
                    </div>
                  </form>

                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 text-center"
                    >
                      <p className="text-emerald-400 text-lg animate-pulse">
                        Access granted. Initiating launch sequence...
                      </p>
                    </motion.div>
                  )}
                </div>
              </PasswordCradle>

              <div className="mt-6 text-center text-gray-400 text-sm">
                <p>
                  For demo purposes, the final password is: <span className="font-mono font-bold">LAUNCH</span>
                </p>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  )
}
