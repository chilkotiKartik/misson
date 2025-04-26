"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AdminAuthContextType {
  isAuthenticated: boolean
  username: string | null
  role: string | null
  login: (username: string, role: string) => void
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAuthenticated: false,
  username: null,
  role: null,
  login: () => {},
  logout: () => {},
})

export const useAdminAuth = () => useContext(AdminAuthContext)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const adminLoggedIn = localStorage.getItem("adminLoggedIn")
    const adminUsername = localStorage.getItem("adminUsername")
    const adminRole = localStorage.getItem("adminRole")

    if (adminLoggedIn === "true" && adminUsername) {
      setIsAuthenticated(true)
      setUsername(adminUsername)
      setRole(adminRole)
    } else {
      setIsAuthenticated(false)
      setUsername(null)
      setRole(null)

      // Redirect to login if on admin page and not authenticated
      if (pathname?.startsWith("/admin") && pathname !== "/admin/login") {
        router.push("/admin/login")
      }
    }

    setIsLoading(false)
  }, [pathname, router])

  const login = (username: string, role: string) => {
    localStorage.setItem("adminLoggedIn", "true")
    localStorage.setItem("adminUsername", username)
    localStorage.setItem("adminRole", role)
    setIsAuthenticated(true)
    setUsername(username)
    setRole(role)
  }

  const logout = () => {
    localStorage.removeItem("adminLoggedIn")
    localStorage.removeItem("adminUsername")
    localStorage.removeItem("adminRole")
    setIsAuthenticated(false)
    setUsername(null)
    setRole(null)
    router.push("/admin/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, username, role, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}
