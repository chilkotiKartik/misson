"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SpaceBackground } from "@/components/space-background"
import { HolographicLogo } from "@/components/holographic-logo"
import { Eye, EyeOff, GraduationCap, User, ShieldCheck } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("admin")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  // Check if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn")
    if (isLoggedIn === "true") {
      router.push("/admin")
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, any credentials work for admin
      if (activeTab === "admin") {
        // Store login info
        localStorage.setItem("adminLoggedIn", "true")
        localStorage.setItem("adminUsername", formData.username || "admin")
        localStorage.setItem("adminRole", "Administrator")

        // Play success sound
        const successAudio = new Audio("/sounds/success-chime.mp3")
        successAudio.volume = 0.3
        successAudio.play().catch((e) => console.log("Audio play failed:", e))

        // Redirect to admin dashboard
        router.push("/admin")
      } else if (activeTab === "participant") {
        // For participant login, redirect to mission start
        localStorage.setItem("participantLoggedIn", "true")
        localStorage.setItem("participantUsername", formData.username || "agent_nebula")

        // Play success sound
        const successAudio = new Audio("/sounds/success-chime.mp3")
        successAudio.volume = 0.3
        successAudio.play().catch((e) => console.log("Audio play failed:", e))

        router.push("/mission/start")
      } else {
        // For instructor login
        setError("Instructor login is not available in this demo")

        // Play error sound
        const errorAudio = new Audio("/sounds/error-beep.mp3")
        errorAudio.volume = 0.2
        errorAudio.play().catch((e) => console.log("Audio play failed:", e))
      }

      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <SpaceBackground roundTheme="purple" />

      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="bg-black/60 backdrop-blur-md border-gray-800">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-2">
                <HolographicLogo size={60} />
              </div>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>Choose your role and enter your credentials to sign in</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="admin" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="participant" className="data-[state=active]:bg-blue-600">
                    <User className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Participant</span>
                    <span className="sm:hidden">User</span>
                  </TabsTrigger>
                  <TabsTrigger value="instructor" className="data-[state=active]:bg-amber-600">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Instructor</span>
                    <span className="sm:hidden">Teach</span>
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="data-[state=active]:bg-purple-600">
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Admin</span>
                    <span className="sm:hidden">Admin</span>
                  </TabsTrigger>
                </TabsList>

                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="username" className="text-sm font-medium">
                        {activeTab === "admin" ? "Admin ID / Email" : "Username / Email"}
                      </label>
                      <Input
                        id="username"
                        name="username"
                        placeholder={
                          activeTab === "admin" ? "Enter your admin ID or email" : "Enter your username or email"
                        }
                        value={formData.username}
                        onChange={handleInputChange}
                        className="bg-gray-800/60 border-gray-700"
                        required
                      />
                      {activeTab === "admin" && (
                        <p className="text-xs text-gray-400">Example: a001 or admin@avasya-lab.com</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="bg-gray-800/60 border-gray-700 pr-10"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-400">For demo purposes, any password will work</p>
                    </div>

                    {error && (
                      <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-3 py-2 rounded-md text-sm">
                        {error}
                      </div>
                    )}

                    <Button
                      type="submit"
                      className={`w-full ${
                        activeTab === "admin"
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                          : activeTab === "instructor"
                            ? "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                            : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                      }`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Signing In...
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </div>
                </form>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <a href="#" className="text-purple-400 hover:underline">
                  Register
                </a>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
