"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { HolographicLogo } from "@/components/holographic-logo"
import {
  LayoutDashboard,
  Users,
  Trophy,
  Settings,
  Activity,
  LogOut,
  ChevronRight,
  HelpCircle,
  MessageSquare,
  Bell,
  Menu,
} from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleLogout = () => {
    // Clear admin login info
    localStorage.removeItem("adminLoggedIn")
    localStorage.removeItem("adminUsername")
    localStorage.removeItem("adminRole")

    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play failed:", e))

    // Redirect to login page
    window.location.href = "/admin/login"
  }

  const toggleSidebar = () => {
    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.1
    audio.play().catch((e) => console.log("Audio play failed:", e))

    setIsCollapsed(!isCollapsed)
  }

  const toggleMobileSidebar = () => {
    // Play sound
    const audio = new Audio("/sounds/interface-beep.mp3")
    audio.volume = 0.1
    audio.play().catch((e) => console.log("Audio play failed:", e))

    setIsMobileOpen(!isMobileOpen)
  }

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Participants", path: "/admin/participants", icon: Users },
    { name: "Activity", path: "/admin/activity", icon: Activity },
    { name: "Leaderboard", path: "/admin/leaderboard", icon: Trophy },
    { name: "Analytics", path: "/admin/analytics", icon: Activity },
    { name: "Security", path: "/admin/security", icon: Settings },
  ]

  const secondaryNavItems = [
    { name: "Help", path: "/admin/help", icon: HelpCircle, comingSoon: true },
    { name: "Messages", path: "/admin/messages", icon: MessageSquare, comingSoon: true },
    { name: "Notifications", path: "/admin/notifications", icon: Bell, comingSoon: true },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 right-4 z-50 text-gray-300"
        onClick={toggleMobileSidebar}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900/90 backdrop-blur-md border-r border-gray-800 transition-all duration-300 ease-in-out z-50 md:z-30 ${
          isCollapsed ? "w-[70px]" : "w-[250px]"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <div className={`flex items-center ${isCollapsed ? "justify-center w-full" : ""}`}>
              <HolographicLogo size={isCollapsed ? 30 : 36} />
              {!isCollapsed && (
                <div className="ml-3">
                  <h1 className="text-lg font-bold">Mission Decrypt</h1>
                  <p className="text-xs text-gray-400">Admin Portal</p>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <Button variant="ghost" size="icon" className="text-gray-400" onClick={toggleSidebar}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <div
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      isActive(item.path) ? "bg-purple-500/20 text-purple-400" : "text-gray-300 hover:bg-gray-800"
                    } ${isCollapsed ? "justify-center" : ""}`}
                  >
                    <item.icon className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </div>
                </Link>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-gray-800">
              <h3
                className={`px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider ${isCollapsed ? "text-center" : ""}`}
              >
                {isCollapsed ? "More" : "Additional Features"}
              </h3>
              <nav className="mt-2 px-2 space-y-1">
                {secondaryNavItems.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <div
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                        isActive(item.path) ? "bg-purple-500/20 text-purple-400" : "text-gray-300 hover:bg-gray-800"
                      } ${isCollapsed ? "justify-center" : ""}`}
                    >
                      <item.icon className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
                      {!isCollapsed && (
                        <div className="flex items-center justify-between w-full">
                          <span>{item.name}</span>
                          {item.comingSoon && (
                            <span className="text-xs bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">Soon</span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-800">
            <Button
              variant="ghost"
              className={`text-gray-300 hover:bg-gray-800 w-full ${isCollapsed ? "justify-center" : ""}`}
              onClick={handleLogout}
            >
              <LogOut className={`h-5 w-5 ${isCollapsed ? "" : "mr-2"}`} />
              {!isCollapsed && <span>Logout</span>}
            </Button>
          </div>

          {/* Collapse Button (Only visible on desktop when collapsed) */}
          {isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-gray-800 border border-gray-700 text-gray-400 hidden md:flex"
              onClick={toggleSidebar}
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
            </Button>
          )}
        </div>
      </aside>
    </>
  )
}
