import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-lg border border-gray-800 hover:border-emerald-500/30 transition-all hover:shadow-lg hover:shadow-emerald-500/5">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}
