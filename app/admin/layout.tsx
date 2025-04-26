import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminAuthProvider } from "@/components/admin/admin-auth-provider"
import { SpaceBackground } from "@/components/space-background"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-black text-white flex flex-col">
        <SpaceBackground roundTheme="purple" />
        <div className="flex flex-1 overflow-hidden">
          <AdminSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <AdminHeader />
            <main className="flex-1 overflow-auto p-6">
              <div className="container mx-auto">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </AdminAuthProvider>
  )
}
