import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import {
  CloudSun,
  MessageCircle,
  Warehouse,
  Truck,
  BookOpen,
  Users,
  Smartphone,
  BarChart3,
  Bell,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react"

const services = [
  {
    icon: CloudSun,
    title: "Weather Forecasting",
    description:
      "Accurate, localized weather forecasts help farmers plan harvesting, drying, and storage activities to minimize weather-related losses.",
    features: [
      "7-day local forecasts",
      "Rain and storm alerts",
      "Optimal harvest timing",
      "Drying condition indicators",
    ],
  },
  {
    icon: MessageCircle,
    title: "AI-Powered Chatbot",
    description:
      "24/7 intelligent assistant that answers questions about crop health, storage techniques, pest control, and market information.",
    features: [
      "Instant crop advice",
      "Spoilage detection (coming soon)",
      "Storage recommendations",
      "Multi-language support",
    ],
  },
  {
    icon: Warehouse,
    title: "Storage Advisory",
    description:
      "Best practices and guidance for proper post-harvest storage, from traditional methods to modern techniques accessible to all farmers.",
    features: ["Crop-specific guides", "Moisture management", "Pest prevention tips", "Low-cost solutions"],
  },
  {
    icon: Truck,
    title: "Supply Chain Support",
    description:
      "Guidance on transportation, handling, and distribution to minimize losses during the journey from farm to market.",
    features: ["Handling best practices", "Transport timing", "Market connection", "Quality preservation"],
  },
  {
    icon: BookOpen,
    title: "Educational Resources",
    description:
      "Comprehensive training materials, videos, and guides on modern farming techniques and post-harvest management.",
    features: ["Video tutorials", "Illustrated guides", "Offline accessible", "Regional languages"],
  },
  {
    icon: Users,
    title: "Community Network",
    description:
      "Connect with other farmers, share experiences, access shared resources, and learn from success stories in your region.",
    features: ["Farmer forums", "Expert Q&A sessions", "Resource sharing", "Success stories"],
  },
]

const approach = [
  {
    step: "01",
    title: "Awareness & Education",
    description:
      "We start by raising awareness about post-harvest losses and educating stakeholders on the causes, impacts, and solutions through accessible content.",
    icon: BookOpen,
  },
  {
    step: "02",
    title: "Technology & Tools",
    description:
      "We provide farmers with practical digital tools — weather forecasts, AI chatbot, dashboards — designed for low-bandwidth, mobile-first access.",
    icon: Smartphone,
  },
  {
    step: "03",
    title: "Community Building",
    description:
      "We foster farmer networks for knowledge sharing, collective problem-solving, and collaborative access to storage and transport resources.",
    icon: Users,
  },
  {
    step: "04",
    title: "Data & Insights",
    description:
      "We collect and analyze data on food losses to identify patterns, measure impact, and inform policy recommendations for systemic change.",
    icon: BarChart3,
  },
]

const techFeatures = [
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "All tools optimized for smartphones with low-bandwidth considerations for rural connectivity.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Timely notifications for weather changes, optimal harvest windows, and storage warnings.",
  },
  {
    icon: Shield,
    title: "Data Privacy",
    description: "Secure handling of farmer data with transparency about how information is used.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Dashboard to track storage conditions, market prices, and loss reduction over time.",
  },
]

export default function ApproachPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#2D5016] py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: "url('/placeholder.svg?height=600&width=1600')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-[#E8A838]/20 px-4 py-1.5 text-sm font-medium text-[#E8A838]">
              Our Approach
            </span>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
              Technology Meets Traditional Wisdom
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              We combine modern digital tools with community-based knowledge sharing to create practical, accessible
              solutions for reducing food loss across Bangladesh.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach Steps */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="How We Work"
            title="A Multi-Pronged Approach"
            description="Our strategy addresses food loss from multiple angles — awareness, technology, community, and data-driven insights."
            centered
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {approach.map((item, index) => (
              <div key={index} className="relative rounded-2xl border border-[#2D5016]/10 bg-[#FAF8F5] p-6">
                <span className="absolute -top-4 left-6 rounded-full bg-[#E8A838] px-4 py-1 font-serif text-lg font-bold text-white">
                  {item.step}
                </span>
                <div className="mb-4 mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2D5016]/10">
                  <item.icon className="h-6 w-6 text-[#2D5016]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#2D5016]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8B7355]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-[#FAF8F5] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Our Services"
            title="Tools & Resources for Farmers"
            description="Everything a farmer needs to protect their harvest, from weather forecasts to expert advice."
            centered
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-[#2D5016]/10 bg-white p-6 transition-all hover:shadow-lg"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#2D5016]/5 transition-colors group-hover:bg-[#E8A838]/10">
                  <service.icon className="h-7 w-7 text-[#2D5016] transition-colors group-hover:text-[#E8A838]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#2D5016]">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8B7355]">{service.description}</p>
                <ul className="mt-4 space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 shrink-0 text-[#E8A838]" />
                      <span className="text-sm text-[#8B7355]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="bg-[#2D5016] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                label="Our Technology"
                title="Designed for Rural Bangladesh"
                description="We build tools that work in real-world conditions — low bandwidth, feature phones, and varying digital literacy."
                light
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {techFeatures.map((feature, index) => (
                  <div key={index} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <feature.icon className="mb-3 h-6 w-6 text-[#E8A838]" />
                    <h4 className="font-semibold text-white">{feature.title}</h4>
                    <p className="mt-1 text-sm text-white/70">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
                <img src="/placeholder.svg?height=500&width=600" alt="Mobile app interface" className="rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Paths CTA */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Get Started"
            title="How Can We Help You?"
            description="Whether you're a farmer looking for support or someone who wants to make a difference, we have a path for you."
            centered
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* For Farmers */}
            <div className="rounded-2xl border-2 border-[#2D5016] bg-[#FAF8F5] p-8 lg:p-10">
              <span className="inline-block rounded-full bg-[#2D5016] px-4 py-1.5 text-sm font-medium text-white">
                For Farmers
              </span>
              <h3 className="mt-6 font-serif text-2xl font-bold text-[#2D5016] lg:text-3xl">Protect Your Harvest</h3>
              <p className="mt-4 text-[#8B7355]">
                Access weather forecasts, storage advice, AI chatbot support, and connect with a community of fellow
                farmers.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Free weather forecasts",
                  "AI-powered crop advice",
                  "Storage best practices",
                  "Community support network",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 shrink-0 text-[#E8A838]" />
                    <span className="text-[#8B7355]">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/farmers" className="mt-8 inline-block">
                <Button size="lg" className="bg-[#2D5016] text-white hover:bg-[#2D5016]/90">
                  Start as Farmer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* For Public */}
            <div className="rounded-2xl border-2 border-[#E8A838] bg-[#FAF8F5] p-8 lg:p-10">
              <span className="inline-block rounded-full bg-[#E8A838] px-4 py-1.5 text-sm font-medium text-white">
                For Public
              </span>
              <h3 className="mt-6 font-serif text-2xl font-bold text-[#2D5016] lg:text-3xl">Make a Difference</h3>
              <p className="mt-4 text-[#8B7355]">
                Learn about food loss, support our mission through donations or volunteering, and help spread awareness.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Learn about the crisis",
                  "Support through donations",
                  "Volunteer opportunities",
                  "Share and spread awareness",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 shrink-0 text-[#E8A838]" />
                    <span className="text-[#8B7355]">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/public" className="mt-8 inline-block">
                <Button size="lg" className="bg-[#E8A838] text-white hover:bg-[#E8A838]/90">
                  Get Involved
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
