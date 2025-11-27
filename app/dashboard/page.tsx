import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WeatherWidget } from "@/components/weather-widget"
import { TipsCard } from "@/components/tips-card"
import { AlertsCard } from "@/components/alerts-card"
import { MarketPricesCard } from "@/components/market-prices-card"
import { User, MessageCircle, BookOpen, Settings, ArrowRight, Warehouse, Phone } from "lucide-react"

const quickActions = [
  {
    icon: MessageCircle,
    title: "AI Chatbot",
    description: "Get instant advice",
    href: "/chatbot",
    color: "bg-[#E8A838]",
  },
  {
    icon: Warehouse,
    title: "Storage Guide",
    description: "Best practices",
    href: "#",
    color: "bg-[#2D5016]",
  },
  {
    icon: BookOpen,
    title: "Resources",
    description: "Training materials",
    href: "#",
    color: "bg-[#8B7355]",
  },
  {
    icon: Phone,
    title: "Helpline",
    description: "Expert support",
    href: "/contact",
    color: "bg-[#4A7C23]",
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Dashboard Header */}
      <div className="border-b border-[#2D5016]/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2D5016]">
                <User className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#8B7355]">Welcome back,</p>
                <h1 className="font-serif text-2xl font-bold text-[#2D5016]">Abdul Karim</h1>
                <p className="text-sm text-[#8B7355]">Rangpur Division • Rice Farmer</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/chatbot">
                <Button className="bg-[#E8A838] text-white hover:bg-[#E8A838]/90">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Ask AI Assistant
                </Button>
              </Link>
              <Button variant="outline" size="icon" className="border-[#2D5016]/20 bg-transparent">
                <Settings className="h-4 w-4 text-[#8B7355]" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Banner */}
      <div className="bg-[#2D5016] px-4 py-3 text-center">
        <p className="text-sm text-white">
          <span className="font-semibold">Demo Mode:</span> This is a preview of the farmer dashboard.{" "}
          <Link href="/login" className="underline hover:text-[#E8A838]">
            Register for free
          </Link>{" "}
          to access personalized data.
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
              className="group flex items-center gap-4 rounded-xl border border-[#2D5016]/10 bg-white p-4 transition-all hover:shadow-md"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${action.color}`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-[#2D5016] group-hover:text-[#E8A838]">{action.title}</h3>
                <p className="text-xs text-[#8B7355]">{action.description}</p>
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
          <div className="rounded-2xl border border-[#2D5016]/10 bg-white p-6">
            <h3 className="mb-4 font-serif text-lg font-semibold text-[#2D5016]">My Storage Status</h3>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-[#8B7355]">Rice Storage</span>
                  <span className="font-medium text-[#2D5016]">75% full</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-[#2D5016]/10">
                  <div className="h-full w-3/4 rounded-full bg-[#2D5016]" />
                </div>
                <p className="mt-1 text-xs text-[#8B7355]">~450 kg stored</p>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-[#8B7355]">Wheat Storage</span>
                  <span className="font-medium text-[#2D5016]">30% full</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-[#2D5016]/10">
                  <div className="h-full w-[30%] rounded-full bg-[#E8A838]" />
                </div>
                <p className="mt-1 text-xs text-[#8B7355]">~120 kg stored</p>
              </div>
              <div className="rounded-lg bg-[#FAF8F5] p-3">
                <p className="text-xs text-[#8B7355]">
                  <strong className="text-[#2D5016]">Tip:</strong> Check moisture levels weekly. Current conditions are
                  good for storage.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#2D5016] to-[#4A7C23] p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white">Need Personalized Advice?</h2>
          <p className="mx-auto mt-2 max-w-xl text-white/80">
            Our AI chatbot can help you with specific questions about your crops, storage, and post-harvest management.
          </p>
          <Link href="/chatbot" className="mt-6 inline-block">
            <Button size="lg" className="bg-[#E8A838] text-white hover:bg-[#E8A838]/90">
              Chat with AI Assistant
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
