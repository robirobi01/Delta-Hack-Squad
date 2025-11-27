import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import {
  CloudSun,
  MessageCircle,
  Warehouse,
  BookOpen,
  Users,
  Smartphone,
  ArrowRight,
  CheckCircle,
  Play,
  FileText,
  Phone,
  Shield,
} from "lucide-react"

const benefits = [
  {
    icon: CloudSun,
    title: "Weather Forecasts",
    description: "Get accurate 7-day forecasts for your area to plan harvesting and storage activities.",
  },
  {
    icon: MessageCircle,
    title: "AI Chatbot Support",
    description: "Ask questions anytime about crop health, storage techniques, and pest control.",
  },
  {
    icon: Warehouse,
    title: "Storage Guidance",
    description: "Learn proper storage methods to keep your harvest safe from pests and moisture.",
  },
  {
    icon: BookOpen,
    title: "Training Materials",
    description: "Access videos and guides on modern farming and post-harvest techniques.",
  },
  {
    icon: Users,
    title: "Farmer Network",
    description: "Connect with other farmers to share experiences and learn together.",
  },
  {
    icon: Phone,
    title: "Expert Helpline",
    description: "Reach agricultural experts for personalized advice when you need it most.",
  },
]

const howItWorks = [
  {
    step: "1",
    title: "Register",
    description: "Sign up with your name, phone number, and location to get personalized services.",
  },
  {
    step: "2",
    title: "Access Dashboard",
    description: "View weather forecasts, tips, and alerts tailored to your area and crops.",
  },
  {
    step: "3",
    title: "Get Support",
    description: "Use the AI chatbot or helpline for instant advice on any farming challenge.",
  },
  {
    step: "4",
    title: "Reduce Losses",
    description: "Apply the guidance to protect your harvest and improve your income.",
  },
]

const resources = [
  {
    title: "Post-Harvest Storage Guide",
    type: "PDF Guide",
    icon: FileText,
  },
  {
    title: "Grain Drying Best Practices",
    type: "Video Tutorial",
    icon: Play,
  },
  {
    title: "Pest Prevention Methods",
    type: "PDF Guide",
    icon: FileText,
  },
  {
    title: "Using Weather Forecasts",
    type: "Video Tutorial",
    icon: Play,
  },
]

const faqs = [
  {
    question: "Is the service free?",
    answer:
      "Yes, all our services are completely free for farmers. We are funded by donors and partners who share our mission to reduce food loss.",
  },
  {
    question: "Do I need internet all the time?",
    answer:
      "No. Many of our resources can be downloaded for offline use. The chatbot requires internet, but you can also call our helpline.",
  },
  {
    question: "What crops do you support?",
    answer:
      "We provide guidance for rice, wheat, vegetables, fruits, pulses, and other major crops grown in Bangladesh.",
  },
  {
    question: "Is my information safe?",
    answer: "Yes. We protect your data and never share personal information with third parties without your consent.",
  },
]

export default function FarmersPage() {
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
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-4 inline-block rounded-full bg-[#E8A838]/20 px-4 py-1.5 text-sm font-medium text-[#E8A838]">
                For Farmers
              </span>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
                Protect Your Harvest. Secure Your Income.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                Free tools and resources to help you reduce post-harvest losses, get better prices, and connect with a
                supportive farming community.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/login">
                  <Button size="lg" className="bg-[#E8A838] text-white hover:bg-[#E8A838]/90">
                    Register Now - Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                  >
                    Try Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="/placeholder.svg?height=500&width=500"
                  alt="Farmer using smartphone"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="What You Get"
            title="Free Tools & Resources"
            description="Everything you need to protect your crops and improve your farming success."
            centered
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="rounded-2xl border border-[#2D5016]/10 bg-[#FAF8F5] p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2D5016]/10">
                  <benefit.icon className="h-6 w-6 text-[#2D5016]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#2D5016]">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8B7355]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#FAF8F5] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Getting Started"
            title="How It Works"
            description="Start protecting your harvest in just a few simple steps."
            centered
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#2D5016] font-serif text-2xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#2D5016]">{item.title}</h3>
                <p className="mt-3 text-sm text-[#8B7355]">{item.description}</p>
                {index < howItWorks.length - 1 && (
                  <ArrowRight className="absolute -right-4 top-8 hidden h-8 w-8 text-[#E8A838] lg:block" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/login">
              <Button size="lg" className="bg-[#2D5016] text-white hover:bg-[#2D5016]/90">
                Register Now - It's Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Resources Preview */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                label="Learning Materials"
                title="Free Training Resources"
                description="Access guides and videos to learn better farming and storage techniques — even offline."
              />
              <div className="mt-8 space-y-4">
                {resources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-xl border border-[#2D5016]/10 bg-[#FAF8F5] p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2D5016]/10">
                      <resource.icon className="h-5 w-5 text-[#2D5016]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#2D5016]">{resource.title}</h4>
                      <p className="text-sm text-[#8B7355]">{resource.type}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-[#8B7355]" />
                  </div>
                ))}
              </div>
              <Link href="/dashboard" className="mt-8 inline-block">
                <Button variant="outline" className="border-[#2D5016] text-[#2D5016] bg-transparent">
                  View All Resources
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="/placeholder.svg?height=500&width=600"
                  alt="Farmer learning on phone"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-[#FAF8F5] py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Questions?" title="Frequently Asked Questions" centered />
          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-xl border border-[#2D5016]/10 bg-white p-6">
                <h3 className="font-semibold text-[#2D5016]">{faq.question}</h3>
                <p className="mt-2 text-sm text-[#8B7355]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-[#2D5016] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-[#E8A838]" />
              <span className="text-white">Your Data is Safe</span>
            </div>
            <div className="flex items-center gap-3">
              <Smartphone className="h-8 w-8 text-[#E8A838]" />
              <span className="text-white">Works on Any Phone</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-[#E8A838]" />
              <span className="text-white">100% Free Forever</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#E8A838] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">Ready to Protect Your Harvest?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Join thousands of farmers who are reducing losses and improving their income with Harvest-Guard.
          </p>
          <div className="mt-10">
            <Link href="/login">
              <Button size="lg" className="bg-[#2D5016] text-white hover:bg-[#2D5016]/90">
                Register Now - It's Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
