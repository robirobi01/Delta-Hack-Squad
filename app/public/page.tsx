import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { AnimatedCounter } from "@/components/animated-counter"
import {
  Heart,
  Share2,
  Users,
  BookOpen,
  HandHeart,
  Megaphone,
  Globe,
  ArrowRight,
  CheckCircle,
  ExternalLink,
} from "lucide-react"

const waysToHelp = [
  {
    icon: Heart,
    title: "Donate",
    description: "Your contribution helps us build tools, train farmers, and expand our reach to more communities.",
    cta: "Make a Donation",
    href: "/contact",
  },
  {
    icon: Users,
    title: "Volunteer",
    description: "Join our team as a volunteer — help with outreach, translation, content creation, or technical work.",
    cta: "Join as Volunteer",
    href: "/contact",
  },
  {
    icon: Share2,
    title: "Spread Awareness",
    description: "Share our mission on social media, talk to friends and family, and help others understand the issue.",
    cta: "Share Our Story",
    href: "#",
  },
  {
    icon: HandHeart,
    title: "Partner With Us",
    description: "Organizations, businesses, and institutions can partner with us to amplify impact.",
    cta: "Become a Partner",
    href: "/contact",
  },
]

const impactStats = [
  { value: 4.5, suffix: "M", label: "Tonnes of food we aim to save", decimals: 1 },
  { value: 50, suffix: "K+", label: "Farmers to reach by 2026", decimals: 0 },
  { value: 8, suffix: "", label: "Districts in pilot program", decimals: 0 },
  { value: 100, suffix: "%", label: "Free services for farmers", decimals: 0 },
]

const learnTopics = [
  {
    title: "Understanding Food Loss in Bangladesh",
    description: "Learn about the causes, scale, and impact of post-harvest losses on farmers and food security.",
    icon: BookOpen,
    href: "/problem",
  },
  {
    title: "Our Technology Solutions",
    description: "Discover how we use AI, weather data, and mobile technology to help farmers.",
    icon: Globe,
    href: "/approach",
  },
  {
    title: "Impact of Your Support",
    description: "See how donations and volunteer efforts translate into real-world change.",
    icon: Heart,
    href: "/about",
  },
  {
    title: "Future Plans & Roadmap",
    description: "Explore our vision for scaling impact across Bangladesh and beyond.",
    icon: Megaphone,
    href: "/roadmap",
  },
]

const testimonials = [
  {
    quote:
      "Supporting Harvest-Guard means directly helping farmers protect their livelihoods. The impact is immediate and measurable.",
    name: "Sarah Johnson",
    role: "Monthly Donor",
  },
  {
    quote:
      "As a volunteer translator, I helped make resources accessible in Bengali. It's fulfilling to bridge the gap between technology and farmers.",
    name: "Anik Das",
    role: "Volunteer",
  },
]

export default function PublicPage() {
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
              For Supporters
            </span>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
              Be Part of the Solution to Food Loss
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              Your support — whether through donations, volunteering, or simply spreading awareness — can help protect
              harvests and secure livelihoods for millions of farmers.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-[#E8A838] text-white hover:bg-[#E8A838]/90">
                  Donate Now
                  <Heart className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/problem">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="border-b border-[#2D5016]/10 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-serif text-3xl font-bold text-[#2D5016] sm:text-4xl">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </div>
                <p className="mt-2 text-sm text-[#8B7355]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="bg-[#FAF8F5] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Get Involved"
            title="How You Can Help"
            description="There are many ways to contribute to our mission, regardless of your background or resources."
            centered
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {waysToHelp.map((way, index) => (
              <div key={index} className="group flex flex-col rounded-2xl border border-[#2D5016]/10 bg-white p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#E8A838]/10 transition-colors group-hover:bg-[#E8A838]/20">
                  <way.icon className="h-7 w-7 text-[#E8A838]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#2D5016]">{way.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#8B7355]">{way.description}</p>
                <Link href={way.href} className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full border-[#2D5016] text-[#2D5016] hover:bg-[#2D5016]/5 bg-transparent"
                  >
                    {way.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learn More */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Education"
            title="Learn About the Issue"
            description="Understanding the problem is the first step to being part of the solution."
            centered
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {learnTopics.map((topic, index) => (
              <Link
                key={index}
                href={topic.href}
                className="group flex items-start gap-4 rounded-2xl border border-[#2D5016]/10 bg-[#FAF8F5] p-6 transition-all hover:border-[#E8A838]/30 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2D5016]/10 transition-colors group-hover:bg-[#E8A838]/10">
                  <topic.icon className="h-6 w-6 text-[#2D5016] transition-colors group-hover:text-[#E8A838]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#2D5016] group-hover:text-[#E8A838]">
                    {topic.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#8B7355]">{topic.description}</p>
                </div>
                <ExternalLink className="ml-auto h-5 w-5 shrink-0 text-[#8B7355] transition-colors group-hover:text-[#E8A838]" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#2D5016] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Supporter Stories" title="Why People Support Us" centered light />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <blockquote className="font-serif text-xl leading-relaxed text-white">"{testimonial.quote}"</blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-white/10">
                    <img
                      src={`/placeholder.svg?height=48&width=48&query=professional portrait ${index === 0 ? "female" : "male"}`}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-white/70">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="bg-[#FAF8F5] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                label="Your Impact"
                title="What Your Support Achieves"
                description="Every contribution, big or small, creates real change for farmers and communities across Bangladesh."
              />
              <ul className="mt-8 space-y-4">
                {[
                  "Fund development of free tools for farmers",
                  "Train agricultural extension workers",
                  "Expand weather alert coverage to new districts",
                  "Support research on local storage solutions",
                  "Create educational content in Bengali",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#E8A838]" />
                    <span className="text-[#8B7355]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="/placeholder.svg?height=500&width=600"
                  alt="Community impact"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#E8A838] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">Ready to Make a Difference?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Join our community of supporters and help us build a future where no harvest is lost to preventable causes.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#2D5016] text-white hover:bg-[#2D5016]/90">
                Donate Now
                <Heart className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white bg-white/10 text-white hover:bg-white/20">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
