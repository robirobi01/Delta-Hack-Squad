import { useLanguage } from "@/lib/language-context"
import { Award, ShieldCheck, Sprout, TrendingUp, Droplets, Sun } from "lucide-react"

const badges = [
    {
        id: "first-harvest",
        titleEn: "First Harvest",
        titleBn: "প্রথম ফসল",
        descriptionEn: "Logged your first harvest successfully.",
        descriptionBn: "আপনার প্রথম ফসল সফলভাবে লগ করেছেন।",
        icon: Sprout,
        rank: "bronze",
        earned: true,
    },
    {
        id: "risk-mitigator",
        titleEn: "Risk Expert",
        titleBn: "ঝুঁকি বিশেষজ্ঞ",
        descriptionEn: "Mitigated 5 high-risk alerts.",
        descriptionBn: "৫টি উচ্চ-ঝুঁকির সতর্কতা প্রশমিত করেছেন।",
        icon: ShieldCheck,
        rank: "silver",
        earned: true,
    },
    {
        id: "market-guru",
        titleEn: "Market Guru",
        titleBn: "বাজার গুরু",
        descriptionEn: "Sold crops at peak market price.",
        descriptionBn: "সর্বোচ্চ বাজার মূল্যে ফসল বিক্রি করেছেন।",
        icon: TrendingUp,
        rank: "gold",
        earned: true,
    },
    {
        id: "water-saver",
        titleEn: "Water Saver",
        titleBn: "পানি সাশ্রয়কারী",
        descriptionEn: "Optimized irrigation for 1 month.",
        descriptionBn: "১ মাসের জন্য সেচ অপ্টিমাইজ করেছেন।",
        icon: Droplets,
        rank: "platinum",
        earned: false,
    },
    {
        id: "climate-hero",
        titleEn: "Climate Hero",
        titleBn: "জলবায়ু বীর",
        descriptionEn: "Adopted climate-resilient seeds.",
        descriptionBn: "জলবায়ু-সহনশীল বীজ গ্রহণ করেছেন।",
        icon: Sun,
        rank: "gold",
        earned: false,
    },
]

const rankStyles = {
    bronze: {
        border: "border-amber-200",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-700",
        glow: "shadow-amber-100",
        ring: "ring-amber-100",
    },
    silver: {
        border: "border-slate-200",
        iconBg: "bg-slate-50",
        iconColor: "text-slate-600",
        glow: "shadow-slate-100",
        ring: "ring-slate-100",
    },
    gold: {
        border: "border-yellow-200",
        iconBg: "bg-yellow-50",
        iconColor: "text-yellow-600",
        glow: "shadow-yellow-100",
        ring: "ring-yellow-100",
        animation: "animate-pulse-slow",
    },
    platinum: {
        border: "border-cyan-200",
        iconBg: "bg-cyan-50",
        iconColor: "text-cyan-600",
        glow: "shadow-cyan-100",
        ring: "ring-cyan-100",
        animation: "animate-pulse-slow",
    },
}

export function BadgesCard() {
    const { language } = useLanguage()
    const isEn = language === "en"

    return (
        <div className="rounded-2xl border border-emerald-100 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h3 className="font-serif text-xl font-bold text-emerald-900">
                        {isEn ? "Your Achievements" : "আপনার অর্জনসমূহ"}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {isEn ? "Track your progress and earn rewards." : "আপনার অগ্রগতি ট্র্যাক করুন এবং পুরস্কার অর্জন করুন।"}
                    </p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-emerald-700">
                    <Award className="h-5 w-5" />
                    <span className="text-sm font-semibold">3/5 {isEn ? "Earned" : "অর্জিত"}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
                {badges.map((badge) => {
                    const style = rankStyles[badge.rank as keyof typeof rankStyles]

                    return (
                        <div
                            key={badge.id}
                            className={`group relative flex flex-col items-center text-center transition-all duration-300 ${badge.earned ? "opacity-100" : "opacity-50 grayscale hover:opacity-75 hover:grayscale-0"
                                }`}
                        >
                            {/* Icon Container */}
                            <div
                                className={`relative mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 transition-all duration-500 group-hover:scale-110 ${badge.earned
                                        ? `${style.border} ${style.iconBg} ${style.glow} shadow-xl ring-4 ${style.ring}`
                                        : "border-gray-100 bg-gray-50"
                                    }`}
                            >
                                {/* Flare Effect */}
                                {badge.earned && (
                                    <div className="absolute inset-0 overflow-hidden rounded-full">
                                        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
                                    </div>
                                )}

                                <badge.icon
                                    className={`h-8 w-8 transition-colors duration-300 ${badge.earned ? style.iconColor : "text-gray-300"
                                        }`}
                                />
                            </div>

                            {/* Text Content */}
                            <h4 className={`mb-1 font-serif font-bold ${badge.earned ? "text-gray-900" : "text-gray-400"}`}>
                                {isEn ? badge.titleEn : badge.titleBn}
                            </h4>
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${badge.earned ? style.iconColor : "text-gray-400"}`}>
                                {badge.rank}
                            </span>

                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-3 hidden w-40 rounded-xl bg-gray-900 p-3 text-xs text-white shadow-xl group-hover:block z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <p className="font-medium">{isEn ? badge.descriptionEn : badge.descriptionBn}</p>
                                <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-900"></div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <style>{`
        @keyframes shine {
          100% {
            left: 125%;
          }
        }
        .animate-shine {
          animation: shine 0.7s;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
        </div>
    )
}
