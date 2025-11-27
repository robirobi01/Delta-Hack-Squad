

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { WeatherWidget } from "@/components/weather-widget"
import { TipsCard } from "@/components/tips-card"
import { AlertsCard } from "@/components/alerts-card"
import { MarketPricesCard } from "@/components/market-prices-card"
import { useLanguage } from "@/lib/language-context"
import { User, MessageCircle, BookOpen, Settings, ArrowRight, Warehouse, Phone } from "lucide-react"

export default function DashboardPage() {
  const { language } = useLanguage()
  const isEn = language === "en"

  const quickActions = [
    {
      icon: MessageCircle,
      titleEn: "AI Chatbot",
      titleBn: "এআই চ্যাটবট",
      descEn: "Get instant advice",
      descBn: "তাত্ক্ষণিক পরামর্শ পান",
      href: "/chatbot",
      color: "bg-amber-500",
    },
    {
      icon: Warehouse,
      titleEn: "Storage Guide",
      titleBn: "সংরক্ষণ গাইড",
      descEn: "Best practices",
      descBn: "সর্বোত্তম অনুশীলন",
      href: "#",
      color: "bg-emerald-600",
    },
    {
      icon: BookOpen,
      titleEn: "Resources",
      titleBn: "সংস্থান",
      descEn: "Training materials",
      descBn: "প্রশিক্ষণ সামগ্রী",
      href: "#",
      color: "bg-emerald-500",
    },
    {
      icon: Phone,
      titleEn: "Helpline",
      titleBn: "হেল্পলাইন",
      descEn: "Expert support",
      descBn: "বিশেষজ্ঞ সহায়তা",
      href: "/contact",
      color: "bg-emerald-700",
    },
  ]

  return (
    <div className="min-h-screen bg-emerald-50">
      {/* Dashboard Header */}
      <div className="border-b border-emerald-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 shadow-lg">
                <User className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{isEn ? "Welcome back," : "স্বাগতম,"}</p>
                <h1 className="font-serif text-2xl font-bold text-emerald-800">{isEn ? "Abdul Karim" : "আব্দুল করিম"}</h1>
                <p className="text-sm text-gray-500">
                  {isEn ? "Rangpur Division • Rice Farmer" : "রংপুর বিভাগ • ধান চাষি"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/chatbot">
                <Button className="bg-amber-500 text-white hover:bg-amber-600">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {isEn ? "Ask AI Assistant" : "এআই সহকারীকে জিজ্ঞাসা করুন"}
                </Button>
              </Link>
              <Button variant="outline" size="icon" className="border-emerald-200 bg-transparent">
                <Settings className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Banner */}
      <div className="bg-emerald-700 px-4 py-3 text-center">
        <p className="text-sm text-white">
          <span className="font-semibold">{isEn ? "Demo Mode:" : "ডেমো মোড:"}</span>{" "}
          {isEn ? "This is a preview of the farmer dashboard." : "এটি কৃষক ড্যাশবোর্ডের একটি প্রিভিউ।"}{" "}
          <Link to="/login" className="underline hover:text-amber-300">
            {isEn ? "Register for free" : "বিনামূল্যে নিবন্ধন করুন"}
          </Link>{" "}
          {isEn ? "to access personalized data." : "ব্যক্তিগত ডেটা অ্যাক্সেস করতে।"}
        </p>
      </div>

      {/* Dashboard Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="group flex items-center gap-4 rounded-xl border border-emerald-100 bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${action.color}`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-emerald-800 group-hover:text-amber-600">
                  {isEn ? action.titleEn : action.titleBn}
                </h3>
                <p className="text-xs text-gray-500">{isEn ? action.descEn : action.descBn}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Weather */}
          <div className="lg:col-span-2">
            <WeatherWidget />
          </div>

          {/* Right Column - Alerts */}
          <div>
            <AlertsCard />
          </div>

          {/* Tips */}
          <div>
            <TipsCard />
          </div>

          {/* Market Prices */}
          <div>
            <MarketPricesCard />
          </div>

          {/* Storage Status (Mock) */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-serif text-lg font-semibold text-emerald-800">
              {isEn ? "My Storage Status" : "আমার সংরক্ষণ অবস্থা"}
            </h3>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-gray-600">{isEn ? "Rice Storage" : "ধান সংরক্ষণ"}</span>
                  <span className="font-medium text-emerald-700">75% {isEn ? "full" : "পূর্ণ"}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-emerald-100">
                  <div className="h-full w-3/4 rounded-full bg-emerald-600" />
                </div>
                <p className="mt-1 text-xs text-gray-500">~450 kg {isEn ? "stored" : "সংরক্ষিত"}</p>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-gray-600">{isEn ? "Wheat Storage" : "গম সংরক্ষণ"}</span>
                  <span className="font-medium text-emerald-700">30% {isEn ? "full" : "পূর্ণ"}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-emerald-100">
                  <div className="h-full w-[30%] rounded-full bg-amber-500" />
                </div>
                <p className="mt-1 text-xs text-gray-500">~120 kg {isEn ? "stored" : "সংরক্ষিত"}</p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-3">
                <p className="text-xs text-gray-600">
                  <strong className="text-emerald-700">{isEn ? "Tip:" : "টিপ:"}</strong>{" "}
                  {isEn
                    ? "Check moisture levels weekly. Current conditions are good for storage."
                    : "সাপ্তাহিক আর্দ্রতা স্তর পরীক্ষা করুন। বর্তমান অবস্থা সংরক্ষণের জন্য ভাল।"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 p-8 text-center shadow-lg">
          <h2 className="font-serif text-2xl font-bold text-white">
            {isEn ? "Need Personalized Advice?" : "ব্যক্তিগত পরামর্শ প্রয়োজন?"}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-white/80">
            {isEn
              ? "Our AI chatbot can help you with specific questions about your crops, storage, and post-harvest management."
              : "আমাদের এআই চ্যাটবট আপনার ফসল, সংরক্ষণ এবং ফসল পরবর্তী ব্যবস্থাপনা সম্পর্কে নির্দিষ্ট প্রশ্নে আপনাকে সাহায্য করতে পারে।"}
          </p>
          <Link to="/chatbot" className="mt-6 inline-block">
            <Button size="lg" className="bg-amber-500 text-white hover:bg-amber-600">
              {isEn ? "Chat with AI Assistant" : "এআই সহকারীর সাথে চ্যাট করুন"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
