"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AvatarGenerator } from "@/components/avatar-generator"
import { Rocket, Menu, X, Home, Trophy, LogOut, Settings, HelpCircle } from "lucide-react"

interface DashboardHeaderProps {
  username: string
}

export function DashboardHeader({ username }: DashboardHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative z-20 border-b border-gray-800 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-emerald-400" />
              <span className="font-bold tracking-wider text-lg">MISSION DECRYPT</span>
            </Link>

            <nav className="hidden md:flex ml-10 space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-white hover:text-emerald-400 hover:bg-black/20">
                  Dashboard
                </Button>
              </Link>
              <Link href="/mission/start">
                <Button variant="ghost" className="text-white hover:text-emerald-400 hover:bg-black/20">
                  Missions
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button variant="ghost" className="text-white hover:text-emerald-400 hover:bg-black/20">
                  Leaderboard
                </Button>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <AvatarGenerator seed={username} size={32} />
              <span className="text-sm font-medium">{username}</span>
            </div>

            <Link href="/auth/login" className="hidden md:block">
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300 hover:bg-gray-800"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm md:hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <Rocket className="h-6 w-6 text-emerald-400" />
                <span className="font-bold tracking-wider text-lg">MISSION DECRYPT</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex items-center gap-3 mb-6 p-3 bg-gray-900/60 rounded-lg">
                <AvatarGenerator seed={username} size={40} />
                <div>
                  <div className="font-medium">{username}</div>
                  <div className="text-xs text-emerald-400">Crypto Cadet</div>
                </div>
              </div>

              <nav className="space-y-1">
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:text-emerald-400 hover:bg-black/20"
                  >
                    <Home className="h-5 w-5 mr-3" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/mission/start" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:text-emerald-400 hover:bg-black/20"
                  >
                    <Rocket className="h-5 w-5 mr-3" />
                    Missions
                  </Button>
                </Link>
                <Link href="/leaderboard" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:text-emerald-400 hover:bg-black/20"
                  >
                    <Trophy className="h-5 w-5 mr-3" />
                    Leaderboard
                  </Button>
                </Link>
                <Link href="/settings" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:text-emerald-400 hover:bg-black/20"
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    Settings
                  </Button>
                </Link>
                <Link href="/help" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:text-emerald-400 hover:bg-black/20"
                  >
                    <HelpCircle className="h-5 w-5 mr-3" />
                    Help
                  </Button>
                </Link>
              </nav>
            </div>

            <div className="p-4 border-t border-gray-800">
              <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
