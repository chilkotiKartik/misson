"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, Eye, EyeOff, Shield, AlertCircle } from "lucide-react"
import { SpaceBackground } from "@/components/space-background"

export default function AdminLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showAnimation, setShowAnimation] = useState(true)

  useEffect(() => {
    // Check if already logged in
    const isLoggedIn = localStorage.getItem("adminLoggedIn")
    if (isLoggedIn === "true") {
      router.push("/admin")
    }

    // Hide animation after 2 seconds
    const timer = setTimeout(() => {
      setShowAnimation(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

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

    // Simulate login validation
    setTimeout(() => {
      // Demo account credentials
      if (
        (formData.username === "admin" && formData.password === "admin123") ||
        (formData.username === "moderator" && formData.password === "mod123")
      ) {
        // Store login state
        localStorage.setItem("adminLoggedIn", "true")
        localStorage.setItem("adminUsername", formData.username)
        localStorage.setItem("adminRole", formData.username === "admin" ? "Super Admin" : "Moderator")

        // Success sound
        const successAudio = new Audio("/sounds/success-chime.mp3")
        successAudio.volume = 0.3
        successAudio.play().catch((e) => console.log("Audio play failed:", e))

        router.push("/admin")
      } else {
        setError("Invalid username or password")
        const errorAudio = new Audio("/sounds/error-beep.mp3")
        errorAudio.volume = 0.3
        errorAudio.play().catch((e) => console.log("Audio play failed:", e))
      }
      setIsLoading(false)
    }, 1500)
  }

  const useDemoAccount = useCallback(
    (role: "admin" | "moderator") => {
      if (role === "admin") {
        setFormData({
          username: "admin",
          password: "admin123",
        })
      } else {
        setFormData({
          username: "moderator",
          password: "mod123",
        })
      }
      setError("")
    },
    [setFormData],
  )

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <SpaceBackground roundTheme="purple" />

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
              <Shield className="h-16 w-16 text-purple-400 mx-auto" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-4 text-2xl font-bold text-purple-400"
            >
              Initializing Admin Console...
            </motion.h1>
          </motion.div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl blur opacity-30"></div>
              <Card className="relative bg-black/80 backdrop-blur-md border-gray-800">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-center mb-2">
                    <div className="flex items-center gap-2">
                      <Rocket className="h-6 w-6 text-purple-400" />
                      <span className="font-bold tracking-wider text-lg">MISSION DECRYPT</span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
                  <CardDescription className="text-center">
                    Enter your credentials to access the admin console
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          name="username"
                          placeholder="admin"
                          value={formData.username}
                          onChange={handleChange}
                          required
                          className="bg-gray-800/50 border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="bg-gray-800/50 border-gray-700 text-white pr-10 focus:border-purple-500 focus:ring-purple-500"
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
                      </div>

                      {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded-md flex items-start">
                          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{error}</p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Authenticating...
                          </div>
                        ) : (
                          "Login to Admin Console"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Button
                      variant="outline"
                      className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                      onClick={() => useDemoAccount("admin")}
                    >
                      Admin Demo
                    </Button>
                    <Button
                      variant="outline"
                      className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                      onClick={() => useDemoAccount("moderator")}
                    >
                      Moderator Demo
                    </Button>
                  </div>
                  <div className="text-center text-xs text-gray-400">
                    <div className="mb-1">Demo Account Credentials:</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="font-semibold text-purple-400">Admin</div>
                        <div>
                          Username: <span className="font-mono">admin</span>
                        </div>
                        <div>
                          Password: <span className="font-mono">admin123</span>
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-cyan-400">Moderator</div>
                        <div>
                          Username: <span className="font-mono">moderator</span>
                        </div>
                        <div>
                          Password: <span className="font-mono">mod123</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
