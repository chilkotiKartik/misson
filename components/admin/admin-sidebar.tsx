"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAdminAuth } from "./admin-auth-provider"
import {
  Rocket,
  LayoutDashboard,
  Users,
  Trophy,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Activity,
  Clock,
  Shield,
  FileText,
  BarChart3,
  MessageSquare,
  Bell,
} from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { role, logout } = useAdminAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  const handleLogout = () => {
    // Play sound effect
    const audio = new Audio("/sounds/button-click.mp3")
    audio.volume = 0.3
    audio.play().catch((e) => console.log("Audio play failed:", e))

    logout()
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
      access: ["Super Admin", "Moderator"],
    },
    {
      name: "Participants",
      href: "/admin/participants",
      icon: <Users className="h-5 w-5" />,
      access: ["Super Admin", "Moderator"],
    },
    {
      name: "Leaderboard",
      href: "/admin/leaderboard",
      icon: <Trophy className="h-5 w-5" />,
      access: ["Super Admin", "Moderator"],
    },
    {
      name: "Activity Logs",
      href: "/admin/activity",
      icon: <Activity className="h-5 w-5" />,
      access: ["Super Admin", "Moderator"],
    },
    {
      name: "Event Timer",
      href: "/admin/timer",
      icon: <Clock className="h-5 w-5" />,
      access: ["Super Admin"],
    },
    {
      name: "Security",
      href: "/admin/security",
      icon: <Shield className="h-5 w-5" />,
      access: ["Super Admin"],
    },
    {
      name: "Questions",
      href: "/admin/questions",
      icon: <FileText className="h-5 w-5" />,
      access: ["Super Admin"],
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      access: ["Super Admin", "Moderator"],
    },
    {
      name: "Notifications",
      href: "/admin/notifications",
      icon: <Bell className="h-5 w-5" />,
      access: ["Super Admin", "Moderator"],
    },
    {
      name: "Messages",
      href: "/admin/messages",
      icon: <MessageSquare className="h-5 w-5" />,
      access: ["Super Admin", "Moderator"],
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
      access: ["Super Admin"],
    },
    {
      name: "Help",
      href: "/admin/help",
      icon: <HelpCircle className="h-5 w-5" />,
      access: ["Super Admin", "Moderator"],
    },
  ]

  // Filter nav items based on user role
  const filteredNavItems = mounted && role ? navItems.filter((item) => item.access.includes(role)) : navItems

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden text-white"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar backdrop for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900/90 backdrop-blur-md border-r border-gray-800 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-800">
            <Link href="/admin" className="flex items-center gap-2" onClick={closeSidebar}>
              <Rocket className="h-6 w-6 text-purple-400" />
              <div>
                <div className="font-bold tracking-wider text-lg">MISSION DECRYPT</div>
                <div className="text-xs text-purple-400">Admin Console</div>
              </div>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {filteredNavItems.map((item) => (
              <Link key={item.name} href={item.href} onClick={closeSidebar}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    pathname === item.href
                      ? "bg-purple-500/20 text-purple-400"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Button>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-800">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
