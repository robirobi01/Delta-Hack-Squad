import { Lightbulb, ArrowRight } from "lucide-react"

const tips = [
  {
    title: "Optimal Rice Drying",
    content: "Dry rice to 14% moisture content before storage to prevent mold growth.",
    category: "Storage",
  },
  {
    title: "Pest Prevention",
    content: "Use airtight containers or hermetic bags to protect grains from weevils.",
    category: "Protection",
  },
  {
    title: "Market Timing",
    content: "Check market prices before selling. Prices typically rise 2-3 months after harvest.",
    category: "Market",
  },
]

export function TipsCard() {
  return (
    <div className="rounded-2xl border border-[#2D5016]/10 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold text-[#2D5016]">Today's Tips</h3>
        <Lightbulb className="h-5 w-5 text-[#E8A838]" />
      </div>
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="rounded-lg border border-[#2D5016]/10 bg-[#FAF8F5] p-4">
            <span className="mb-2 inline-block rounded-full bg-[#2D5016]/10 px-2 py-0.5 text-xs font-medium text-[#2D5016]">
              {tip.category}
            </span>
            <h4 className="font-medium text-[#2D5016]">{tip.title}</h4>
            <p className="mt-1 text-sm text-[#8B7355]">{tip.content}</p>
          </div>
        ))}
      </div>
      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#2D5016] py-2 text-sm font-medium text-[#2D5016] transition-colors hover:bg-[#2D5016]/5">
        View All Tips
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  )
}
