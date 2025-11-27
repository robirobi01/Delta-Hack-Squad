"use client"

interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
  centered?: boolean
  light?: boolean
}

export function SectionHeader({ label, title, description, centered = false, light = false }: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      {label && (
        <span
          className={`mb-2 inline-block rounded-full px-4 py-1 text-sm font-medium ${
            light ? "bg-amber-500/20 text-amber-300" : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {label}
        </span>
      )}
      <h2
        className={`font-serif text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-emerald-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-lg leading-relaxed ${
            centered ? "mx-auto" : ""
          } ${light ? "text-white/80" : "text-gray-600"}`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
