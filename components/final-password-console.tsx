import type { ReactNode } from "react"

interface FinalPasswordConsoleProps {
  children: ReactNode
  isSuccess?: boolean
}

export function FinalPasswordConsole({ children, isSuccess = false }: FinalPasswordConsoleProps) {
  return (
    <div className={`console-screen transition-all duration-500 ${isSuccess ? "shadow-lg shadow-emerald-500/30" : ""}`}>
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-800">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
        <div className="flex-1 text-center">
          <span className="text-xs text-gray-400">ISRO SECURE VAULT</span>
        </div>
      </div>
      {children}
    </div>
  )
}
