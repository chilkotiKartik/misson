"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, ArrowLeft, Eye, EyeOff } from "lucide-react"
import { SpaceBackground } from "@/components/space-background"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showAnimation, setShowAnimation] = useState(true)

  useEffect(() => {
    // Hide animation after 2 seconds
    const timer = setTimeout(() => {
      setShowAnimation(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Play sound effect
  useEffect(() => {
    if (typeof window !== "undefined" && !showAnimation) {
      const audio = new Audio("/sounds/interface-login.mp3")
      audio.volume = 0.3
      audio.play().catch((e) => console.log("Audio play failed:", e))
    }
  }, [showAnimation])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Play button sound
    const audio = new Audio("/sounds/button-click.mp3")
    audio.volume = 0.3
    audio.play().catch((e) => console.log("Audio play failed:", e))

    // Simulate login
    setTimeout(() => {
      router.push("/inbox")
      setIsLoading(false)
    }, 1500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <SpaceBackground />

      {showAnimation ? (
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
              <Rocket className="h-16 w-16 text-cyan-400 mx-auto" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-4 text-2xl font-bold text-cyan-400"
            >
              Initializing Secure Connection...
            </motion.h1>
          </motion.div>
        </div>
      ) : (
        <>
          {/* Header */}
          <motion.header
            className="relative z-10 flex items-center justify-between p-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-cyan-400" />
              <span className="font-bold tracking-wider text-lg">MISSION DECRYPT</span>
            </div>
            <Link href="/">
              <Button variant="ghost" className="text-white hover:text-cyan-400 hover:bg-black/20">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
              </Button>
            </Link>
          </motion.header>

          {/* Login Form */}
          <div className="flex-1 flex items-center justify-center p-4">
            <motion.div className="w-full max-w-md" initial="hidden" animate="visible" variants={containerVariants}>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-30"></div>
                <Card className="relative bg-black/80 backdrop-blur-md border-gray-800">
                  <CardHeader>
                    <motion.div variants={itemVariants}>
                      <CardTitle className="text-2xl text-white">Agent Login</CardTitle>
                      <CardDescription>Enter your credentials to access the mission</CardDescription>
                    </motion.div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <motion.div className="space-y-2" variants={itemVariants}>
                        <Label htmlFor="username" className="text-white">
                          Agent Codename
                        </Label>
                        <Input
                          id="username"
                          name="username"
                          placeholder="agent_nebula"
                          value={formData.username}
                          onChange={handleChange}
                          required
                          className="bg-gray-800/50 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500"
                        />
                      </motion.div>
                      <motion.div className="space-y-2" variants={itemVariants}>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password" className="text-white">
                            Access Code
                          </Label>
                          <Link href="#" className="text-xs text-cyan-400 hover:text-cyan-300">
                            Forgot code?
                          </Link>
                        </div>
                        <div className="relative">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="bg-gray-800/50 border-gray-700 text-white pr-10 focus:border-cyan-500 focus:ring-cyan-500"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                          </Button>
                        </div>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:from-cyan-400 hover:to-blue-500 font-medium"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center">
                              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                              Authenticating...
                            </div>
                          ) : (
                            "Access Mission"
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <motion.div variants={itemVariants} className="w-full">
                      <Button
                        variant="outline"
                        className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                        onClick={() => {
                          setFormData({
                            username: "agent_nebula",
                            password: "isro123",
                          })
                        }}
                      >
                        Use Demo Account
                      </Button>
                    </motion.div>
                    <motion.div variants={itemVariants} className="text-center text-sm text-gray-400 w-full">
                      New to the mission?{" "}
                      <Link href="/auth/signup" className="text-cyan-400 hover:text-cyan-300">
                        Create agent profile
                      </Link>
                    </motion.div>
                  </CardFooter>
                </Card>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  )
}
