import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import {
  CheckCircle,
  Circle,
  Clock,
  Rocket,
  Brain,
  Smartphone,
  Users,
  Globe,
  BarChart3,
  Shield,
  ArrowRight,
} from "lucide-react"

const roadmapPhases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "completed",
    timeline: "2023 - Q2 2024",
    items: [
      { text: "Research & problem validation", done: true },
      { text: "Platform design & architecture", done: true },
      { text: "Core website development", done: true },
      { text: "Static dashboard prototype", done: true },
      { text: "AI chatbot demo", done: true },
    ],
  },
  {
    phase: "Phase 2",
    title: "Pilot Launch",
    status: "current",
    timeline: "Q3 2024 - Q1 2025",
    items: [
      { text: "Weather API integration", done: true },
      { text: "Farmer registration system", done: true },
      { text: "Pilot in 3 districts", done: false },
      { text: "Community feedback collection", done: false },
      { text: "Training materials in Bengali", done: false },
    ],
  },
  {
    phase: "Phase 3",
    title: "AI & Automation",
    status: "upcoming",
    timeline: "Q2 2025 - Q4 2025",
    items: [
      { text: "AI-powered spoilage detection", done: false },
      { text: "Photo-based crop health analysis", done: false },
      { text: "Automated alerts & recommendations", done: false },
      { text: "Voice assistant in Bengali", done: false },
      { text: "Offline-capable mobile app", done: false },
    ],
  },
  {
    phase: "Phase 4",
    title: "Scale & Impact",
    status: "upcoming",
    timeline: "2026 & Beyond",
    items: [
      { text: "Expand to all 8 divisions", done: false },
      { text: "Supply chain partnerships", done: false },
      { text: "Real-time market integration", done: false },
      { text: "Policy advocacy & government collaboration", done: false },
      { text: "Regional expansion (South Asia)", done: false },
    ],
  },
]

const futureFeatures = [
  {
    icon: Brain,
    title: "AI Spoilage Detection",
    description: "Upload photos to detect early signs of spoilage, mold, or pest damage using computer vision.",
  },
  {
    icon: Smartphone,
    title: "Offline Mobile App",
    description: "Native app that works without internet, syncing data when connectivity is available.",
  },
  {
    icon: Users,
    title: "Farmer Marketplace",
    description: "Connect farmers directly with buyers, cutting out middlemen for better prices.",
  },
  {
    icon: Globe,
    title: "Regional Weather Network",
    description: "Hyper-local weather stations providing micro-climate forecasts for precise planning.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track your farm's performance, loss reduction, and income improvements over time.",
  },
  {
    icon: Shield,
    title: "Crop Insurance Integration",
    description: "Simplified access to crop insurance with data-driven risk assessment.",
  },
]

export default function RoadmapPage() {
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
              Our Vision
            </span>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
              Building the Future of Food Security
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              Our roadmap outlines the journey from a prototype to a comprehensive platform that empowers farmers and
              reduces food loss across Bangladesh.
            </p>
          </div>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="bg-[#FAF8F5] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Development Roadmap"
            title="Our Journey to Impact"
            description="From research to nationwide scale, here's how we're building Harvest-Guard."
            centered
          />

          <div className="relative mt-16">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 hidden h-full w-1 bg-[#2D5016]/20 md:left-1/2 md:-translate-x-1/2 lg:block" />

            <div className="space-y-12">
              {roadmapPhases.map((phase, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col lg:flex-row ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1 lg:px-8">
                    <div
                      className={`rounded-2xl border p-6 lg:p-8 ${
                        phase.status === "completed"
                          ? "border-[#2D5016]/20 bg-white"
                          : phase.status === "current"
                            ? "border-[#E8A838] bg-white shadow-lg"
                            : "border-[#2D5016]/10 bg-white/50"
                      }`}
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            phase.status === "completed"
                              ? "bg-[#2D5016]/10 text-[#2D5016]"
                              : phase.status === "current"
                                ? "bg-[#E8A838] text-white"
                                : "bg-[#8B7355]/10 text-[#8B7355]"
                          }`}
                        >
                          {phase.phase}
                        </span>
                        <span className="text-sm text-[#8B7355]">{phase.timeline}</span>
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-[#2D5016]">{phase.title}</h3>
                      <ul className="mt-4 space-y-3">
                        {phase.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3">
                            {item.done ? (
                              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#2D5016]" />
                            ) : phase.status === "current" ? (
                              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#E8A838]" />
                            ) : (
                              <Circle className="mt-0.5 h-5 w-5 shrink-0 text-[#8B7355]/40" />
                            )}
                            <span className={item.done ? "text-[#2D5016]" : "text-[#8B7355]"}>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div
                    className={`absolute left-4 top-8 hidden h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-4 lg:left-1/2 lg:flex ${
                      phase.status === "completed"
                        ? "border-[#2D5016] bg-[#2D5016]"
                        : phase.status === "current"
                          ? "border-[#E8A838] bg-[#E8A838]"
                          : "border-[#8B7355]/40 bg-[#FAF8F5]"
                    }`}
                  >
                    {phase.status === "completed" && <CheckCircle className="h-3 w-3 text-white" />}
                    {phase.status === "current" && <Rocket className="h-3 w-3 text-white" />}
                  </div>

                  <div className="hidden flex-1 lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Features */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Coming Soon"
            title="Features We're Building"
            description="Exciting capabilities on our roadmap that will transform how farmers protect their harvest."
            centered
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {futureFeatures.map((feature, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-[#2D5016]/10 bg-[#FAF8F5] p-6 transition-all hover:border-[#E8A838]/30 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2D5016]/10 transition-colors group-hover:bg-[#E8A838]/10">
                  <feature.icon className="h-6 w-6 text-[#2D5016] transition-colors group-hover:text-[#E8A838]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#2D5016]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8B7355]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="bg-[#2D5016] py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">Our Long-Term Vision</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/80">
            By 2030, we envision a Bangladesh where post-harvest food loss is reduced by 50%, where every farmer has
            access to the tools and knowledge they need, and where our model is replicated across South Asia to secure
            food for millions.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-6">
              <p className="font-serif text-4xl font-bold text-[#E8A838]">50%</p>
              <p className="mt-2 text-sm text-white/70">Reduction in food loss</p>
            </div>
            <div className="rounded-xl bg-white/10 p-6">
              <p className="font-serif text-4xl font-bold text-[#E8A838]">1M+</p>
              <p className="mt-2 text-sm text-white/70">Farmers empowered</p>
            </div>
            <div className="rounded-xl bg-white/10 p-6">
              <p className="font-serif text-4xl font-bold text-[#E8A838]">5+</p>
              <p className="mt-2 text-sm text-white/70">Countries reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#E8A838] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">Help Us Build This Future</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Your support accelerates our roadmap. Whether through funding, volunteering, or partnerships, you can help
            us reach these milestones faster.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#2D5016] text-white hover:bg-[#2D5016]/90">
                Support Our Mission
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/public">
              <Button size="lg" variant="outline" className="border-white bg-white/10 text-white hover:bg-white/20">
                Learn How to Help
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
