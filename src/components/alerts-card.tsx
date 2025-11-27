

import { AlertTriangle, CheckCircle, Info, Bell } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const alerts = [
  {
    type: "warning",
    icon: AlertTriangle,
    titleEn: "Heavy Rain Warning",
    titleBn: "ভারী বৃষ্টির সতর্কতা",
    messageEn: "Heavy rainfall expected Thursday. Secure stored grains.",
    messageBn: "বৃহস্পতিবার ভারী বৃষ্টি প্রত্যাশিত। সংরক্ষিত শস্য সুরক্ষিত করুন।",
    timeEn: "2 hours ago",
    timeBn: "২ ঘণ্টা আগে",
  },
  {
    type: "info",
    icon: Info,
    titleEn: "Market Update",
    titleBn: "বাজার আপডেট",
    messageEn: "Rice prices up 5% in Dhaka wholesale markets.",
    messageBn: "ঢাকার পাইকারি বাজারে ধানের দাম ৫% বেড়েছে।",
    timeEn: "5 hours ago",
    timeBn: "৫ ঘণ্টা আগে",
  },
  {
    type: "success",
    icon: CheckCircle,
    titleEn: "Drying Complete",
    titleBn: "শুকানো সম্পূর্ণ",
    messageEn: "Optimal drying conditions for next 3 days.",
    messageBn: "পরবর্তী ৩ দিনের জন্য সর্বোত্তম শুকানোর অবস্থা।",
    timeEn: "1 day ago",
    timeBn: "১ দিন আগে",
  },
]

const typeStyles = {
  warning: "border-amber-500 bg-amber-50 text-amber-600",
  info: "border-blue-500 bg-blue-50 text-blue-500",
  success: "border-emerald-500 bg-emerald-50 text-emerald-600",
}

export function AlertsCard() {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold text-emerald-800">
          {isEn ? "Recent Alerts" : "সাম্প্রতিক সতর্কতা"}
        </h3>
        <div className="relative">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
            3
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 rounded-lg border-l-4 p-3 ${typeStyles[alert.type as keyof typeof typeStyles]}`}
          >
            <alert.icon className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-emerald-800">{isEn ? alert.titleEn : alert.titleBn}</p>
              <p className="text-xs text-gray-600">{isEn ? alert.messageEn : alert.messageBn}</p>
              <p className="mt-1 text-xs text-gray-400">{isEn ? alert.timeEn : alert.timeBn}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
