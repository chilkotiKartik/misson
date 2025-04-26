"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell, Moon, Sun, Search, LogOut, Settings, User } from "lucide-react"
import { EnhancedAvatarGenerator } from "@/components/enhanced-avatar-generator"
import { useAdminAuth } from "./admin-auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AdminHeader() {
  const { username, role, logout } = useAdminAuth()
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(3)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    // In a real app, this would toggle the theme
  }

  const handleLogout = () => {
    // Play sound effect
    const audio = new Audio("/sounds/button-click.mp3")
    audio.volume = 0.3
    audio.play().catch((e) => console.log("Audio play failed:", e))

    logout()
  }

  return (
    <header className="border-b border-gray-800 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-between">
      <div className="relative w-full max-w-md hidden md:block">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search participants, settings..."
          className="w-full bg-gray-800/50 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-purple-500"
        />
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-300 hover:text-white"
          onClick={() => setNotifications(0)}
        >
          <Bell className="h-5 w-5" />
          {notifications > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-purple-500 rounded-full text-[10px] flex items-center justify-center">
              {notifications}
            </span>
          )}
        </Button>

        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white" onClick={toggleTheme}>
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-800/50 p-2 rounded-md transition-colors">
              <div className="hidden md:block text-right">
                <div className="text-sm font-medium">{username || "Admin User"}</div>
                <div className="text-xs text-gray-400">{role || "Super Admin"}</div>
              </div>
              <EnhancedAvatarGenerator seed={username || "admin_user"} size={36} animated={false} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800 text-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-red-400" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
