"use client"

import { AdminParticipantManagement } from "@/components/admin/admin-participant-management"

export default function AdminParticipantsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Participant Management</h1>
        <p className="text-gray-400">Manage participant accounts and credentials</p>
      </div>

      <AdminParticipantManagement />
    </div>
  )
}
