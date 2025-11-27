import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { AnimatedCounter } from "@/components/animated-counter"
import {
  Wheat,
  Warehouse,
  Truck,
  Store,
  AlertTriangle,
  TrendingDown,
  DollarSign,
  Users,
  Thermometer,
  Droplets,
  Bug,
  ArrowRight,
} from "lucide-react"

const mainStats = [
  {
    icon: Wheat,
    value: 4.5,
    suffix: "M",
    label: "Tonnes Lost Annually",
    description: "Of food grains and staples lost post-harvest each year",
    decimals: 1,
  },
  {
    icon: DollarSign,
    value: 1.5,
    suffix: "B",
    label: "Economic Impact",
    description: "Estimated yearly economic loss to farmers and the nation",
    decimals: 1,
  },
  {
    icon: Users,
    value: 160,
    suffix: "M+",
    label: "People Affected",
    description: "Citizens impacted by food insecurity and price volatility",
    decimals: 0,
  },
  {
    icon: TrendingDown,
    value: 32,
    suffix: "%",
    label: "Post-Harvest Loss",
    description: "Maximum loss rate for certain staple crops",
    decimals: 0,
  },
]

const supplyChainLosses = [
  {
    stage: "Harvesting",
    icon: Wheat,
    lossRange: "2-6%",
    description: "Improper timing, manual methods, and lack of mechanization lead to immediate losses.",
  },
  {
    stage: "Drying & Processing",
    icon: Thermometer,
    lossRange: "3-8%",
    description: "Inadequate drying facilities and traditional processing methods cause spoilage.",
  },
  {
    stage: "Storage",
    icon: Warehouse,
    lossRange: "5-15%",
    description: "Poor storage conditions, pests, rodents, and moisture damage stored produce.",
  },
  {
    stage: "Transportation",
    icon: Truck,
    lossRange: "2-10%",
    description: "Rough handling, delays, and lack of cold chain cause deterioration during transit.",
  },
  {
    stage: "Market & Distribution",
    icon: Store,
    lossRange: "2-8%",
    description: "Market infrastructure gaps and delayed sales lead to further spoilage.",
  },
]

const lossReasons = [
  {
    icon: Thermometer,
    title: "Climate & Weather",
    description: "Unpredictable monsoons, floods, and extreme heat accelerate spoilage and complicate harvest timing.",
  },
  {
    icon: Warehouse,
    title: "Poor Storage Facilities",
    description:
      "Lack of modern silos, cold storage, and hermetic containers leaves produce vulnerable to pests and moisture.",
  },
  {
    icon: Bug,
    title: "Pest & Disease",
    description: "Insects, rodents, and fungal infections destroy significant portions of stored grains each year.",
  },
  {
    icon: Droplets,
    title: "Moisture Damage",
    description: "Inadequate drying and humid storage conditions lead to mold growth and quality degradation.",
  },
  {
    icon: Truck,
    title: "Transport Challenges",
    description:
      "Poor road infrastructure, lack of refrigerated vehicles, and long distances to markets cause deterioration.",
  },
  {
    icon: AlertTriangle,
    title: "Limited Information",
    description:
      "Farmers lack access to weather forecasts, market prices, and best practices for post-harvest handling.",
  },
]

const cropLosses = [
  { crop: "Rice", loss: 12, color: "bg-[#2D5016]" },
  { crop: "Wheat", loss: 8, color: "bg-[#4A7C23]" },
  { crop: "Vegetables", loss: 32, color: "bg-[#E8A838]" },
  { crop: "Fruits", loss: 25, color: "bg-[#D4A574]" },
  { crop: "Pulses", loss: 10, color: "bg-[#8B7355]" },
]

export default function ProblemPage() {
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
            <span className="mb-4 inline-block rounded-full bg-red-500/20 px-4 py-1.5 text-sm font-medium text-red-300">
              The Challenge
            </span>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
              Bangladesh Loses Millions of Tonnes of Food Every Year
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              From farm to table, food is lost at every stage of the supply chain. This preventable loss affects food
              security, farmer incomes, and the environment — impacting over 160 million people.
            </p>
          </div>
        </div>
      </section>

      {/* Main Statistics */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mainStats.map((stat, index) => (
              <div key={index} className="rounded-2xl border border-[#2D5016]/10 bg-[#FAF8F5] p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#2D5016]/10">
                  <stat.icon className="h-7 w-7 text-[#2D5016]" />
                </div>
                <div className="font-serif text-4xl font-bold text-[#2D5016]">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </div>
                <h3 className="mt-2 font-semibold text-[#2D5016]">{stat.label}</h3>
                <p className="mt-2 text-sm text-[#8B7355]">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supply Chain Losses */}
      <section className="bg-[#FAF8F5] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="The Supply Chain"
            title="Where Food Gets Lost"
            description="Food loss occurs at every stage from harvest to market. Understanding these points is key to intervention."
            centered
          />
          <div className="mt-16">
            {/* Visual Pipeline */}
            <div className="relative">
              {/* Connection line for desktop */}
              <div className="absolute left-0 right-0 top-16 hidden h-1 bg-gradient-to-r from-[#2D5016] via-[#E8A838] to-[#8B7355] lg:block" />
              <div className="grid gap-6 lg:grid-cols-5">
                {supplyChainLosses.map((stage, index) => (
                  <div key={index} className="relative text-center">
                    <div className="relative z-10 mx-auto mb-4 flex h-32 w-32 flex-col items-center justify-center rounded-full border-4 border-[#2D5016]/20 bg-white">
                      <stage.icon className="h-10 w-10 text-[#2D5016]" />
                      <span className="mt-2 text-lg font-bold text-[#E8A838]">{stage.lossRange}</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-[#2D5016]">{stage.stage}</h3>
                    <p className="mt-2 text-sm text-[#8B7355]">{stage.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crop Loss Chart */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                label="By Crop Type"
                title="Post-Harvest Loss Varies by Produce"
                description="Perishable items like vegetables and fruits suffer the highest losses, while grains also face significant challenges."
              />
              <div className="mt-8 space-y-4">
                {cropLosses.map((item, index) => (
                  <div key={index}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-[#2D5016]">{item.crop}</span>
                      <span className="text-sm font-semibold text-[#8B7355]">{item.loss}% loss</span>
                    </div>
                    <div className="h-4 overflow-hidden rounded-full bg-[#2D5016]/10">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-1000`}
                        style={{ width: `${item.loss * 3}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl">
                <img
                  src="/placeholder.svg?height=600&width=600"
                  alt="Bangladesh food loss map"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Loss Happens */}
      <section className="bg-[#2D5016] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Root Causes"
            title="Why Food Gets Lost"
            description="Multiple interconnected factors contribute to post-harvest losses in Bangladesh."
            centered
            light
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lossReasons.map((reason, index) => (
              <div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8A838]/20">
                  <reason.icon className="h-6 w-6 text-[#E8A838]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-white">{reason.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Human Impact */}
      <section className="bg-[#FAF8F5] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Farmer with crops"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Storage damage"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl sm:col-span-2">
                  <img
                    src="/placeholder.svg?height=200&width=600"
                    alt="Village market"
                    className="h-48 w-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeader
                label="Human Cost"
                title="The Real Impact on Lives"
                description="Behind these statistics are real people — farmers who lose their income, families facing food insecurity, and communities struggling with poverty."
              />
              <div className="mt-8 space-y-4">
                <div className="rounded-xl border-l-4 border-[#E8A838] bg-white p-4">
                  <p className="text-[#8B7355]">
                    <strong className="text-[#2D5016]">40% of farmers</strong> report significant income loss due to
                    post-harvest spoilage
                  </p>
                </div>
                <div className="rounded-xl border-l-4 border-[#E8A838] bg-white p-4">
                  <p className="text-[#8B7355]">
                    <strong className="text-[#2D5016]">Food price volatility</strong> affects the poorest households
                    most severely
                  </p>
                </div>
                <div className="rounded-xl border-l-4 border-[#E8A838] bg-white p-4">
                  <p className="text-[#8B7355]">
                    <strong className="text-[#2D5016]">Environmental impact</strong> — wasted resources and increased
                    emissions from food loss
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#E8A838] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">The Good News? This Is Preventable.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            With the right tools, knowledge, and support, we can significantly reduce food loss in Bangladesh. Learn how
            we're tackling this challenge.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/approach">
              <Button size="lg" className="bg-[#2D5016] text-white hover:bg-[#2D5016]/90">
                See Our Solutions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="border-white bg-white/10 text-white hover:bg-white/20">
                Try Our Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
