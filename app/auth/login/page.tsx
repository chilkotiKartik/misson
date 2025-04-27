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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Rocket, ArrowLeft, Eye, EyeOff, GraduationCap, BookOpen, Shield } from "lucide-react"
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
  const [activeRole, setActiveRole] = useState("participant")
  const [error, setError] = useState("")

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
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Play button sound
    const audio = new Audio("/sounds/button-click.mp3")
    audio.volume = 0.3
    audio.play().catch((e) => console.log("Audio play failed:", e))

    // Simulate login
    setTimeout(() => {
      if (activeRole === "admin") {
        // Admin login
        if (formData.username === "admin" && formData.password === "admin123") {
          localStorage.setItem("adminLoggedIn", "true")
          localStorage.setItem("adminUsername", formData.username)
          localStorage.setItem("adminRole", "Super Admin")
          router.push("/admin")
        } else if (formData.username === "moderator" && formData.password === "mod123") {
          localStorage.setItem("adminLoggedIn", "true")
          localStorage.setItem("adminUsername", formData.username)
          localStorage.setItem("adminRole", "Moderator")
          router.push("/admin")
        } else {
          setError("Invalid admin credentials")
          const errorAudio = new Audio("/sounds/error-beep.mp3")
          errorAudio.volume = 0.3
          errorAudio.play().catch((e) => console.log("Audio play failed:", e))
        }
      } else {
        // Participant login
        if (formData.username && formData.password) {
          localStorage.setItem("participantLoggedIn", "true")
          localStorage.setItem("participantUsername", formData.username)
          router.push("/inbox")
        } else {
          setError("Please enter both username and password")
          const errorAudio = new Audio("/sounds/error-beep.mp3")
          errorAudio.volume = 0.3
          errorAudio.play().catch((e) => console.log("Audio play failed:", e))
        }
      }
      setIsLoading(false)
    }, 1500)
  }

  const useDemoAccount = (role: string) => {
    if (role === "admin") {
      setFormData({
        username: "admin",
        password: "admin123",
      })
    } else if (role === "moderator") {
      setFormData({
        username: "moderator",
        password: "mod123",
      })
    } else {
      setFormData({
        username: "agent_nebula",
        password: "isro123",
      })
    }
    setError("")
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
            <motion.div
              className="w-full max-w-md"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    when: "beforeChildren",
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-30"></div>
                <Card className="relative bg-black/80 backdrop-blur-md border-gray-800">
                  <CardHeader>
                    <motion.div
                      variants={{
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
                      }}
                    >
                      <CardTitle className="text-2xl text-white text-center">Login</CardTitle>
                      <CardDescription className="text-center">
                        Choose your role and enter your credentials
                      </CardDescription>
                    </motion.div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="participant" onValueChange={setActiveRole} className="mb-6">
                      <TabsList className="grid grid-cols-3 bg-gray-800/50">
                        <TabsTrigger
                          value="participant"
                          className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                        >
                          <GraduationCap className="h-4 w-4 mr-2" />
                          Participant
                        </TabsTrigger>
                        <TabsTrigger
                          value="instructor"
                          className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Instructor
                        </TabsTrigger>
                        <TabsTrigger
                          value="admin"
                          className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Admin
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <motion.div
                        className="space-y-2"
                        variants={{
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
                        }}
                      >
                        <Label htmlFor="username" className="text-white">
                          {activeRole === "admin" ? "Admin ID / Email" : "Agent Codename"}
                        </Label>
                        <Input
                          id="username"
                          name="username"
                          placeholder={activeRole === "admin" ? "admin" : "agent_nebula"}
                          value={formData.username}
                          onChange={handleChange}
                          required
                          className="bg-gray-800/50 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500"
                        />
                        {activeRole === "admin" && <p className="text-xs text-gray-400">Example: admin or moderator</p>}
                      </motion.div>
                      <motion.div
                        className="space-y-2"
                        variants={{
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
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password" className="text-white">
                            {activeRole === "admin" ? "Password" : "Access Code"}
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
                        {activeRole === "admin" && (
                          <p className="text-xs text-gray-400">For demo: admin/admin123 or moderator/mod123</p>
                        )}
                      </motion.div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded-md text-sm"
                        >
                          {error}
                        </motion.div>
                      )}

                      <motion.div
                        variants={{
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
                        }}
                      >
                        <Button
                          type="submit"
                          className={`w-full ${
                            activeRole === "admin"
                              ? "bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-400 hover:to-blue-500"
                              : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
                          } text-black font-medium`}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center">
                              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                              Authenticating...
                            </div>
                          ) : (
                            "Sign In"
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <motion.div
                      variants={{
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
                      }}
                      className="w-full"
                    >
                      {activeRole === "admin" ? (
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                            onClick={() => useDemoAccount("admin")}
                          >
                            Admin Demo
                          </Button>
                          <Button
                            variant="outline"
                            className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                            onClick={() => useDemoAccount("moderator")}
                          >
                            Moderator Demo
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                          onClick={() => useDemoAccount("participant")}
                        >
                          Use Demo Account
                        </Button>
                      )}
                    </motion.div>
                    <motion.div
                      variants={{
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
                      }}
                      className="text-center text-sm text-gray-400 w-full"
                    >
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
