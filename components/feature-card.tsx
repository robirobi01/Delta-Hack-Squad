import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group rounded-2xl border border-emerald-100 bg-white p-6 transition-all duration-300 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 transition-all group-hover:from-amber-50 group-hover:to-amber-100">
        <Icon className="h-7 w-7 text-emerald-600 transition-colors group-hover:text-amber-600" />
      </div>
      <h3 className="mb-2 font-serif text-xl font-semibold text-emerald-900">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-600">{description}</p>
    </div>
  )
}
