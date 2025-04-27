"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Trophy,
  Activity,
  LogOut,
  HelpCircle,
  Bell,
  MessageSquare,
  BarChart3,
  ShieldAlert,
  FileQuestion,
} from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-gray-800 flex flex-col fixed left-0 top-0">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-black font-bold">
            MD
          </div>
          <div>
            <h2 className="font-bold text-white">Mission Decrypt</h2>
            <p className="text-xs text-gray-400">Admin Portal</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-4 px-3">
        <nav className="space-y-1">
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              isActive("/admin")
                ? "bg-emerald-500/10 text-emerald-400"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/admin/participants"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              isActive("/admin/participants")
                ? "bg-emerald-500/10 text-emerald-400"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Participants</span>
          </Link>

          <Link
            href="/admin/leaderboard"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              isActive("/admin/leaderboard")
                ? "bg-emerald-500/10 text-emerald-400"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <Trophy className="h-5 w-5" />
            <span>Leaderboard</span>
          </Link>

          <Link
            href="/admin/activity"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              isActive("/admin/activity")
                ? "bg-emerald-500/10 text-emerald-400"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <Activity className="h-5 w-5" />
            <span>Activity</span>
          </Link>

          <Link
            href="/admin/questions"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              isActive("/admin/questions")
                ? "bg-emerald-500/10 text-emerald-400"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <FileQuestion className="h-5 w-5" />
            <span>Questions</span>
          </Link>

          <Link
            href="/admin/analytics"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              isActive("/admin/analytics")
                ? "bg-emerald-500/10 text-emerald-400"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <BarChart3 className="h-5 w-5" />
            <span>Analytics</span>
          </Link>

          <div className="pt-4 pb-2">
            <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Communication</div>
          </div>

          <Link
            href="/admin/messages"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              isActive("/admin/messages")
                ? "bg-emerald-500/10 text-emerald-400"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <MessageSquare className="h-5 w-5" />
            <span>Messages</span>
            <span className="ml-auto bg-cyan-500 text-xs font-medium px-2 py-0.5 rounded-full text-black">Soon</span>
          </Link>

          <Link
            href="/admin/notifications"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              isActive("/admin/notifications")
                ? "bg-emerald-500/10 text-emerald-400"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
            <span className="ml-auto bg-purple-500 text-xs font-medium px-2 py-0.5 rounded-full text-black">Soon</span>
          </Link>

          <div className="pt-4 pb-2">
            <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Settings</div>
          </div>

          <Link
            href="/admin/security"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              isActive("/admin/security")
                ? "bg-emerald-500/10 text-emerald-400"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <ShieldAlert className="h-5 w-5" />
            <span>Security</span>
          </Link>

          <Link
            href="/admin/help"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              isActive("/admin/help")
                ? "bg-emerald-500/10 text-emerald-400"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <HelpCircle className="h-5 w-5" />
            <span>Help & Support</span>
            <span className="ml-auto bg-amber-500 text-xs font-medium px-2 py-0.5 rounded-full text-black">Soon</span>
          </Link>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800">
        <Link
          href="/admin/login"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  )
}
