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
import { Rocket, ArrowLeft, Eye, EyeOff, RefreshCw, Shuffle } from "lucide-react"
import { SpaceBackground } from "@/components/space-background"
import { EnhancedAvatarGenerator } from "@/components/enhanced-avatar-generator"
import { AgentTitleGenerator } from "@/components/agent-title-generator"

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [avatarSeed, setAvatarSeed] = useState(Math.random().toString(36).substring(2, 8))
  const [agentTitle, setAgentTitle] = useState("")

  useEffect(() => {
    // Generate a random agent title
    setAgentTitle(AgentTitleGenerator.generateTitle())
  }, [])

  // Play sound effect
  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio("/sounds/interface-login.mp3")
      audio.volume = 0.3
      audio.play().catch((e) => console.log("Audio play failed:", e))
    }
  }, [])

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

    // Simulate signup
    setTimeout(() => {
      router.push("/inbox")
      setIsLoading(false)
    }, 1500)
  }

  const regenerateAvatar = () => {
    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.3
    audio.play().catch((e) => console.log("Audio play failed:", e))

    setAvatarSeed(Math.random().toString(36).substring(2, 8))
  }

  const regenerateTitle = () => {
    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.3
    audio.play().catch((e) => console.log("Audio play failed:", e))

    setAgentTitle(AgentTitleGenerator.generateTitle())
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

      {/* Signup Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div className="w-full max-w-md" initial="hidden" animate="visible" variants={containerVariants}>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-30"></div>
            <Card className="relative bg-black/80 backdrop-blur-md border-gray-800">
              <CardHeader>
                <motion.div variants={itemVariants}>
                  <CardTitle className="text-2xl text-white">Create Agent Profile</CardTitle>
                  <CardDescription>Join the elite team of ISRO codebreakers</CardDescription>
                </motion.div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
                    <div className="relative">
                      <EnhancedAvatarGenerator seed={avatarSeed} size={120} />
                      <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        className="absolute -bottom-2 -right-2 rounded-full bg-cyan-500 text-black hover:bg-cyan-400 h-8 w-8"
                        onClick={regenerateAvatar}
                      >
                        <RefreshCw className="h-4 w-4" />
                        <span className="sr-only">Generate new avatar</span>
                      </Button>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">Your agent avatar</p>
                  </motion.div>

                  <motion.div className="space-y-2" variants={itemVariants}>
                    <Label htmlFor="title" className="text-white">
                      Agent Title
                    </Label>
                    <div className="relative">
                      <Input
                        id="title"
                        value={agentTitle}
                        readOnly
                        className="bg-gray-800/50 border-gray-700 text-cyan-400 pr-10 focus:border-cyan-500 focus:ring-cyan-500"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                        onClick={regenerateTitle}
                      >
                        <Shuffle className="h-4 w-4" />
                        <span className="sr-only">Generate new title</span>
                      </Button>
                    </div>
                  </motion.div>

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
                    <Label htmlFor="password" className="text-white">
                      Access Code
                    </Label>
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
                    <p className="text-xs text-gray-400 mt-1">Password must be at least 8 characters</p>
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
                          Creating Profile...
                        </div>
                      ) : (
                        "Create Agent Profile"
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
              <CardFooter>
                <motion.div variants={itemVariants} className="text-center w-full text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300">
                    Login
                  </Link>
                </motion.div>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
