

import { Lightbulb, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const tips = [
  {
    titleEn: "Optimal Rice Drying",
    titleBn: "সর্বোত্তম ধান শুকানো",
    contentEn: "Dry rice to 14% moisture content before storage to prevent mold.",
    contentBn: "ছাঁচ প্রতিরোধে সংরক্ষণের আগে ধান ১৪% আর্দ্রতায় শুকান।",
    categoryEn: "Storage",
    categoryBn: "সংরক্ষণ",
  },
  {
    titleEn: "Pest Prevention",
    titleBn: "কীটপতঙ্গ প্রতিরোধ",
    contentEn: "Use airtight containers or hermetic bags to protect grains.",
    contentBn: "শস্য রক্ষা করতে এয়ারটাইট পাত্র বা হার্মেটিক ব্যাগ ব্যবহার করুন।",
    categoryEn: "Protection",
    categoryBn: "সুরক্ষা",
  },
  {
    titleEn: "Market Timing",
    titleBn: "বাজার সময়",
    contentEn: "Check market prices before selling. Prices typically rise 2-3 months after harvest.",
    contentBn: "বিক্রির আগে বাজার দর দেখুন। ফসল কাটার ২-৩ মাস পরে দাম বাড়ে।",
    categoryEn: "Market",
    categoryBn: "বাজার",
  },
]

export function TipsCard() {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold text-emerald-800">{isEn ? "Today's Tips" : "আজকের টিপস"}</h3>
        <Lightbulb className="h-5 w-5 text-amber-500" />
      </div>
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
            <span className="mb-2 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
              {isEn ? tip.categoryEn : tip.categoryBn}
            </span>
            <h4 className="font-medium text-emerald-800">{isEn ? tip.titleEn : tip.titleBn}</h4>
            <p className="mt-1 text-sm text-gray-600">{isEn ? tip.contentEn : tip.contentBn}</p>
          </div>
        ))}
      </div>
      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-600/30 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-50">
        {isEn ? "View All Tips" : "সব টিপস দেখুন"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  )
}
