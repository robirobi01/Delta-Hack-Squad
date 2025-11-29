

import { useEffect, useState } from "react"
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
  {
    type: "warning",
    icon: AlertTriangle,
    titleEn: "Pest Alert",
    titleBn: "পোকামাকড় সতর্কতা",
    messageEn: "High risk of Brown Planthopper in your area.",
    messageBn: "আপনার এলাকায় বাদামী গাছফড়িংয়ের উচ্চ ঝুঁকি।",
    timeEn: "3 hours ago",
    timeBn: "৩ ঘণ্টা আগে",
  },
  {
    type: "info",
    icon: Info,
    titleEn: "Fertilizer Subsidy",
    titleBn: "সার ভর্তুকি",
    messageEn: "New government subsidy for urea fertilizer available.",
    messageBn: "ইউরিয়া সারের জন্য নতুন সরকারি ভর্তুকি উপলব্ধ।",
    timeEn: "6 hours ago",
    timeBn: "৬ ঘণ্টা আগে",
  },
  {
    type: "success",
    icon: CheckCircle,
    titleEn: "Harvest Goal Met",
    titleBn: "ফসলের লক্ষ্য পূরণ",
    messageEn: "You have reached 80% of your seasonal target.",
    messageBn: "আপনি আপনার মৌসুমী লক্ষ্যের ৮০% এ পৌঁছেছেন।",
    timeEn: "2 days ago",
    timeBn: "২ দিন আগে",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    titleEn: "Cold Wave",
    titleBn: "শৈত্যপ্রবাহ",
    messageEn: "Temperature dropping below 10°C tonight.",
    messageBn: "আজ রাতে তাপমাত্রা ১০°C এর নিচে নামছে।",
    timeEn: "4 hours ago",
    timeBn: "৪ ঘণ্টা আগে",
  },
  {
    type: "info",
    icon: Info,
    titleEn: "Training Session",
    titleBn: "প্রশিক্ষণ সেশন",
    messageEn: "Free workshop on modern irrigation this Friday.",
    messageBn: "এই শুক্রবার আধুনিক সেচ বিষয়ে বিনামূল্যে কর্মশালা।",
    timeEn: "1 day ago",
    timeBn: "১ দিন আগে",
  },
  {
    type: "success",
    icon: CheckCircle,
    titleEn: "Loan Approved",
    titleBn: "ঋণ অনুমোদিত",
    messageEn: "Your agricultural loan application has been approved.",
    messageBn: "আপনার কৃষি ঋণের আবেদন অনুমোদিত হয়েছে।",
    timeEn: "3 days ago",
    timeBn: "৩ দিন আগে",
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

  // Batching State
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(0)
  const BATCH_SIZE = 3

  useEffect(() => {
    // Reset visible count when batch changes
    setVisibleCount(0)

    // Sequence timer to show alerts 1-by-1
    const sequenceInterval = setInterval(() => {
      setVisibleCount(prev => {
        if (prev < BATCH_SIZE) {
          return prev + 1
        }
        return prev
      })
    }, 800) // Show next alert every 800ms

    // Cycle timer to switch to next batch
    const cycleTimeout = setTimeout(() => {
      setCurrentBatchIndex(prev => (prev + 1) % Math.ceil(alerts.length / BATCH_SIZE))
    }, 800 * BATCH_SIZE + 5000) // Wait for sequence + 5 seconds reading time

    return () => {
      clearInterval(sequenceInterval)
      clearTimeout(cycleTimeout)
    }
  }, [currentBatchIndex])

  // Get current batch of alerts
  const currentBatch = alerts.slice(
    currentBatchIndex * BATCH_SIZE,
    (currentBatchIndex + 1) * BATCH_SIZE
  )

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold text-emerald-800">
          {isEn ? "Recent Alerts" : "সাম্প্রতিক সতর্কতা"}
        </h3>
        <div className="relative animate-bounce">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white shadow-sm">
            {alerts.length}
          </span>
        </div>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto max-h-[400px] pr-1 custom-scrollbar min-h-[300px]">
        {currentBatch.slice(0, visibleCount).map((alert, index) => (
          <div
            key={`${currentBatchIndex}-${index}`} // Unique key triggers re-render for animation
            className={`flex items-start gap-3 rounded-lg border-l-4 p-4 shadow-sm transition-all hover:translate-x-1 hover:shadow-md ${typeStyles[alert.type as keyof typeof typeStyles]} animate-slide-in`}
          >
            <alert.icon className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold text-emerald-900">{isEn ? alert.titleEn : alert.titleBn}</p>
              <p className="text-xs text-gray-700 mt-1">{isEn ? alert.messageEn : alert.messageBn}</p>
              <p className="mt-2 text-[10px] font-medium uppercase tracking-wider opacity-70">{isEn ? alert.timeEn : alert.timeBn}</p>
            </div>
          </div>
        ))}

        {/* Placeholder to maintain height consistency if fewer than 3 alerts in batch */}
        {visibleCount < BATCH_SIZE && (
          <div className="h-24 opacity-0 transition-all duration-500"></div>
        )}
      </div>

      {/* Pagination Dots */}
      <div className="mt-4 flex justify-center gap-1.5">
        {Array.from({ length: Math.ceil(alerts.length / BATCH_SIZE) }).map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentBatchIndex ? "w-6 bg-emerald-500" : "w-1.5 bg-emerald-200"
              }`}
          />
        ))}
      </div>

      <style>{`
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in-right 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}
