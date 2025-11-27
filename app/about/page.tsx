import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { Target, Eye, Heart, Users, Globe, ArrowRight } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Impact-Driven",
    description:
      "Every initiative we undertake is measured by its real-world impact on reducing food loss and improving farmer livelihoods.",
  },
  {
    icon: Heart,
    title: "Farmer-First",
    description:
      "We design all our tools and resources with farmers at the center, ensuring accessibility regardless of technical literacy.",
  },
  {
    icon: Users,
    title: "Community-Based",
    description:
      "We believe in the power of collective action and community knowledge sharing to create lasting change.",
  },
  {
    icon: Globe,
    title: "Sustainability",
    description:
      "Our work aligns with SDG 12.3 and contributes to a more sustainable and food-secure future for Bangladesh.",
  },
]

const milestones = [
  {
    year: "2023",
    title: "Research & Foundation",
    description:
      "Conducted extensive research on post-harvest losses in Bangladesh and identified key intervention points.",
  },
  {
    year: "2024",
    title: "Platform Development",
    description:
      "Built the Harvest-Guard platform with weather integration, AI chatbot, and farmer dashboard prototypes.",
  },
  {
    year: "2025",
    title: "Pilot Launch",
    description: "Launching pilot programs in select districts to test and refine our solutions with real farmers.",
  },
  {
    year: "Future",
    title: "Scale & Impact",
    description:
      "Expanding nationwide with AI-powered spoilage detection, supply chain optimization, and policy advocacy.",
  },
]

const team = [
  {
    name: "Dr. Rafiq Ahmed",
    role: "Founder & Lead Researcher",
    image: "bangladeshi male professor agriculture expert",
  },
  {
    name: "Ayesha Rahman",
    role: "Technology Director",
    image: "bangladeshi female tech professional",
  },
  {
    name: "Kamal Hossain",
    role: "Farmer Outreach Lead",
    image: "bangladeshi male community worker",
  },
  {
    name: "Nusrat Jahan",
    role: "Policy & Partnerships",
    image: "bangladeshi female professional",
  },
]

export default function AboutPage() {
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
              About Us
            </span>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
              Protecting Bangladesh's Harvest Through Innovation
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              We are a team of researchers, technologists, and community workers united by a single mission: to reduce
              food loss and secure the livelihoods of millions of Bangladeshi farmers.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#2D5016]/10 bg-[#FAF8F5] p-8 lg:p-12">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#2D5016]">
                <Target className="h-7 w-7 text-white" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#2D5016] lg:text-3xl">Our Mission</h2>
              <p className="mt-4 text-lg leading-relaxed text-[#8B7355]">
                To significantly reduce post-harvest food losses in Bangladesh by empowering farmers with accessible
                technology, timely information, and community support systems that protect their harvest and improve
                their economic well-being.
              </p>
            </div>
            <div className="rounded-2xl border border-[#2D5016]/10 bg-[#FAF8F5] p-8 lg:p-12">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#E8A838]">
                <Eye className="h-7 w-7 text-white" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#2D5016] lg:text-3xl">Our Vision</h2>
              <p className="mt-4 text-lg leading-relaxed text-[#8B7355]">
                A Bangladesh where no harvest is lost to preventable causes, where every farmer has the tools and
                knowledge to protect their produce, and where food security is a reality for all 170 million citizens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-[#FAF8F5] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Our Values"
            title="What Guides Our Work"
            description="These core principles shape everything we do, from technology development to farmer engagement."
            centered
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="rounded-2xl border border-[#2D5016]/10 bg-white p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#2D5016]/5">
                  <value.icon className="h-7 w-7 text-[#2D5016]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#2D5016]">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8B7355]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Our Journey" title="Building a Movement Against Food Loss" centered />
          <div className="relative mt-16">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-[#2D5016]/20 md:left-1/2 md:block" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1 md:px-8">
                    <div
                      className={`rounded-2xl border border-[#2D5016]/10 bg-[#FAF8F5] p-6 ${
                        index % 2 === 0 ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <span className="inline-block rounded-full bg-[#E8A838] px-4 py-1 text-sm font-semibold text-white">
                        {milestone.year}
                      </span>
                      <h3 className="mt-4 font-serif text-xl font-bold text-[#2D5016]">{milestone.title}</h3>
                      <p className="mt-2 text-[#8B7355]">{milestone.description}</p>
                    </div>
                  </div>
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-6 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[#E8A838] bg-white md:left-1/2 md:block" />
                  <div className="hidden flex-1 md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-[#FAF8F5] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Our Team"
            title="The People Behind Harvest-Guard"
            description="A dedicated team combining expertise in agriculture, technology, and community development."
            centered
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <div key={index} className="group text-center">
                <div className="mx-auto mb-4 h-48 w-48 overflow-hidden rounded-2xl bg-[#2D5016]/10">
                  <img
                    src={`/placeholder.svg?height=192&width=192&query=${member.image}`}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#2D5016]">{member.name}</h3>
                <p className="mt-1 text-sm text-[#8B7355]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-[#8B7355]">
            Our Partners & Supporters
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale">
            {[
              "Bangladesh Agricultural Research Institute",
              "FAO Bangladesh",
              "Ministry of Agriculture",
              "World Food Programme",
            ].map((partner, index) => (
              <div key={index} className="flex h-12 items-center rounded-lg bg-[#2D5016]/5 px-6">
                <span className="text-sm font-medium text-[#2D5016]">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2D5016] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">Want to Be Part of Our Mission?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Whether you're a farmer, researcher, donor, or advocate, there are many ways to contribute to reducing food
            loss in Bangladesh.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#E8A838] text-white hover:bg-[#E8A838]/90">
                Get Involved
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/roadmap">
              <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                See Our Roadmap
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
