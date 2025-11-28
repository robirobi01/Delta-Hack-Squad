

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { useLanguage } from "@/lib/language-context"
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

export default function ApproachPage() {
  const { language } = useLanguage()
  const isEn = language === "en"

  const services = [
    {
      icon: CloudSun,
      titleEn: "Weather Forecasting",
      titleBn: "আবহাওয়ার পূর্বাভাস",
      descEn: "Accurate, localized weather forecasts help farmers plan harvesting and storage.",
      descBn: "সঠিক, স্থানীয় আবহাওয়ার পূর্বাভাস কৃষকদের ফসল কাটা এবং সংরক্ষণ পরিকল্পনা করতে সাহায্য করে।",
      features: isEn
        ? ["7-day local forecasts", "Rain and storm alerts", "Optimal harvest timing", "Drying condition indicators"]
        : ["৭ দিনের স্থানীয় পূর্বাভাস", "বৃষ্টি এবং ঝড়ের সতর্কতা", "সর্বোত্তম ফসল কাটার সময়", "শুকানোর অবস্থা সূচক"],
    },
    {
      icon: MessageCircle,
      titleEn: "AI-Powered Chatbot",
      titleBn: "এআই-চালিত চ্যাটবট",
      descEn: "24/7 intelligent assistant that answers questions about crop health and storage.",
      descBn: "২৪/৭ বুদ্ধিমান সহকারী যা ফসলের স্বাস্থ্য এবং সংরক্ষণ সম্পর্কে প্রশ্নের উত্তর দেয়।",
      features: isEn
        ? [
          "Instant crop advice",
          "Spoilage detection (coming soon)",
          "Storage recommendations",
          "Multi-language support",
        ]
        : ["তাত্ক্ষণিক ফসল পরামর্শ", "পচন সনাক্তকরণ (শীঘ্রই আসছে)", "সংরক্ষণ সুপারিশ", "বহু-ভাষা সমর্থন"],
    },
    {
      icon: Warehouse,
      titleEn: "Storage Advisory",
      titleBn: "সংরক্ষণ পরামর্শ",
      descEn: "Best practices and guidance for proper post-harvest storage.",
      descBn: "সঠিক ফসল পরবর্তী সংরক্ষণের জন্য সর্বোত্তম অনুশীলন এবং নির্দেশনা।",
      features: isEn
        ? ["Crop-specific guides", "Moisture management", "Pest prevention tips", "Low-cost solutions"]
        : ["ফসল-নির্দিষ্ট গাইড", "আর্দ্রতা ব্যবস্থাপনা", "কীটপতঙ্গ প্রতিরোধ টিপস", "কম খরচের সমাধান"],
    },
    {
      icon: Truck,
      titleEn: "Supply Chain Support",
      titleBn: "সরবরাহ শৃঙ্খল সহায়তা",
      descEn: "Guidance on transportation and distribution to minimize losses.",
      descBn: "ক্ষতি কমাতে পরিবহন এবং বিতরণ সম্পর্কে নির্দেশনা।",
      features: isEn
        ? ["Handling best practices", "Transport timing", "Market connection", "Quality preservation"]
        : ["হ্যান্ডলিং সর্বোত্তম অনুশীলন", "পরিবহন সময়", "বাজার সংযোগ", "গুণমান সংরক্ষণ"],
    },
    {
      icon: BookOpen,
      titleEn: "Educational Resources",
      titleBn: "শিক্ষামূলক সংস্থান",
      descEn: "Comprehensive training materials and guides on modern techniques.",
      descBn: "আধুনিক কৌশলের উপর ব্যাপক প্রশিক্ষণ উপকরণ এবং গাইড।",
      features: isEn
        ? ["Video tutorials", "Illustrated guides", "Offline accessible", "Regional languages"]
        : ["ভিডিও টিউটোরিয়াল", "চিত্রিত গাইড", "অফলাইনে অ্যাক্সেসযোগ্য", "আঞ্চলিক ভাষা"],
    },
    {
      icon: Users,
      titleEn: "Community Network",
      titleBn: "কমিউনিটি নেটওয়ার্ক",
      descEn: "Connect with other farmers and share experiences.",
      descBn: "অন্যান্য কৃষকদের সাথে সংযোগ করুন এবং অভিজ্ঞতা ভাগ করুন।",
      features: isEn
        ? ["Farmer forums", "Expert Q&A sessions", "Resource sharing", "Success stories"]
        : ["কৃষক ফোরাম", "বিশেষজ্ঞ প্রশ্নোত্তর সেশন", "সম্পদ ভাগাভাগি", "সাফল্যের গল্প"],
    },
  ]

  const approach = [
    {
      step: "01",
      titleEn: "Awareness & Education",
      titleBn: "সচেতনতা ও শিক্ষা",
      descEn: "We raise awareness about post-harvest losses and educate stakeholders.",
      descBn: "আমরা ফসল পরবর্তী ক্ষতি সম্পর্কে সচেতনতা বাড়াই।",
      icon: BookOpen,
    },
    {
      step: "02",
      titleEn: "Technology & Tools",
      titleBn: "প্রযুক্তি ও সরঞ্জাম",
      descEn: "We provide farmers with practical digital tools.",
      descBn: "আমরা কৃষকদের ব্যবহারিক ডিজিটাল সরঞ্জাম সরবরাহ করি।",
      icon: Smartphone,
    },
    {
      step: "03",
      titleEn: "Community Building",
      titleBn: "সম্প্রদায় গঠন",
      descEn: "We foster farmer networks for knowledge sharing.",
      descBn: "আমরা জ্ঞান ভাগাভাগির জন্য কৃষক নেটওয়ার্ক তৈরি করি।",
      icon: Users,
    },
    {
      step: "04",
      titleEn: "Data & Insights",
      titleBn: "ডেটা ও অন্তর্দৃষ্টি",
      descEn: "We collect and analyze data to identify patterns.",
      descBn: "আমরা প্যাটার্ন সনাক্ত করতে ডেটা সংগ্রহ এবং বিশ্লেষণ করি।",
      icon: BarChart3,
    },
  ]

  const techFeatures = [
    {
      icon: Smartphone,
      titleEn: "Mobile-First Design",
      titleBn: "মোবাইল-ফার্স্ট ডিজাইন",
      descEn: "All tools optimized for smartphones with low-bandwidth.",
      descBn: "কম ব্যান্ডউইথ সহ স্মার্টফোনের জন্য সমস্ত সরঞ্জাম অপ্টিমাইজ করা।",
    },
    {
      icon: Bell,
      titleEn: "Smart Alerts",
      titleBn: "স্মার্ট সতর্কতা",
      descEn: "Timely notifications for weather changes and storage warnings.",
      descBn: "আবহাওয়া পরিবর্তন এবং সংরক্ষণ সতর্কতার জন্য সময়মত বিজ্ঞপ্তি।",
    },
    {
      icon: Shield,
      titleEn: "Data Privacy",
      titleBn: "ডেটা গোপনীয়তা",
      descEn: "Secure handling of farmer data with transparency.",
      descBn: "স্বচ্ছতার সাথে কৃষক ডেটার নিরাপদ হ্যান্ডলিং।",
    },
    {
      icon: BarChart3,
      titleEn: "Progress Tracking",
      titleBn: "অগ্রগতি ট্র্যাকিং",
      descEn: "Dashboard to track storage conditions and loss reduction.",
      descBn: "সংরক্ষণ অবস্থা এবং ক্ষতি হ্রাস ট্র্যাক করতে ড্যাশবোর্ড।",
    },
  ]

  return (
    <div className="flex flex-col">
      <style>{`
        @keyframes breathing {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes breathingGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(251, 191, 36, 0.6);
          }
        }

        .animate-breathing {
          animation: breathing 4s ease-in-out infinite;
        }

        .animate-breathing-glow {
          animation: breathingGlow 4s ease-in-out infinite;
        }
      `}</style>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-20">
          <img src="/placeholder.svg?height=600&width=1600" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-amber-500/20 px-4 py-1.5 text-sm font-medium text-amber-300">
              {isEn ? "Our Approach" : "আমাদের পদ্ধতি"}
            </span>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
              {isEn ? "Technology Meets Traditional Wisdom" : "প্রযুক্তি ঐতিহ্যগত জ্ঞানের সাথে মিলিত হয়"}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              {isEn
                ? "We combine modern digital tools with community-based knowledge sharing to create practical, accessible solutions."
                : "আমরা ব্যবহারিক, অ্যাক্সেসযোগ্য সমাধান তৈরি করতে সম্প্রদায়-ভিত্তিক জ্ঞান ভাগাভাগির সাথে আধুনিক ডিজিটাল সরঞ্জাম একত্রিত করি।"}
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach Steps */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label={isEn ? "How We Work" : "আমরা কিভাবে কাজ করি"}
            title={isEn ? "A Multi-Pronged Approach" : "একটি বহুমুখী পদ্ধতি"}
            description={
              isEn
                ? "Our strategy addresses food loss from multiple angles."
                : "আমাদের কৌশল একাধিক কোণ থেকে খাদ্য ক্ষতির সমাধান করে।"
            }
            centered
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {approach.map((item, index) => (
              <div key={index} className="relative rounded-2xl border border-emerald-100 bg-emerald-50 p-6 shadow-sm animate-breathing" style={{ animationDelay: `${index * 0.2}s` }}>
                <span className="absolute -top-4 left-6 rounded-full bg-amber-500 px-4 py-1 font-serif text-lg font-bold text-white">
                  {item.step}
                </span>
                <div className="mb-4 mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <item.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-emerald-800">
                  {isEn ? item.titleEn : item.titleBn}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{isEn ? item.descEn : item.descBn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-emerald-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label={isEn ? "Our Services" : "আমাদের সেবা"}
            title={isEn ? "Tools & Resources for Farmers" : "কৃষকদের জন্য সরঞ্জাম ও সংস্থান"}
            description={
              isEn ? "Everything a farmer needs to protect their harvest." : "একজন কৃষকের তাদের ফসল রক্ষা করতে যা প্রয়োজন।"
            }
            centered
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg animate-breathing"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 transition-colors group-hover:bg-amber-100">
                  <service.icon className="h-7 w-7 text-emerald-600 transition-colors group-hover:text-amber-600" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-emerald-800">
                  {isEn ? service.titleEn : service.titleBn}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{isEn ? service.descEn : service.descBn}</p>
                <ul className="mt-4 space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 shrink-0 text-amber-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="bg-gradient-to-br from-emerald-700 to-emerald-800 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                label={isEn ? "Our Technology" : "আমাদের প্রযুক্তি"}
                title={isEn ? "Designed for Rural Bangladesh" : "গ্রামীণ বাংলাদেশের জন্য ডিজাইন করা"}
                description={
                  isEn
                    ? "We build tools that work in real-world conditions — low bandwidth, feature phones, and varying digital literacy."
                    : "আমরা এমন সরঞ্জাম তৈরি করি যা বাস্তব-বিশ্বের পরিস্থিতিতে কাজ করে।"
                }
                light
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {techFeatures.map((feature, index) => (
                  <div key={index} className="rounded-xl border border-white/10 bg-white/5 p-4 animate-breathing" style={{ animationDelay: `${index * 0.2}s` }}>
                    <feature.icon className="mb-3 h-6 w-6 text-amber-400" />
                    <h4 className="font-semibold text-white">{isEn ? feature.titleEn : feature.titleBn}</h4>
                    <p className="mt-1 text-sm text-white/70">{isEn ? feature.descEn : feature.descBn}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 animate-breathing">
                <img src="/placeholder.svg?height=500&width=600" alt="" className="rounded-xl h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Paths CTA */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label={isEn ? "Get Started" : "শুরু করুন"}
            title={isEn ? "How Can We Help You?" : "আমরা কিভাবে আপনাকে সাহায্য করতে পারি?"}
            description={
              isEn
                ? "Whether you're a farmer looking for support or someone who wants to make a difference."
                : "আপনি সহায়তা খুঁজছেন এমন কৃষক হোন বা পরিবর্তন আনতে চান এমন কেউ।"
            }
            centered
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* For Farmers */}
            <div className="rounded-2xl border-2 border-emerald-600 bg-emerald-50 p-8 lg:p-10 animate-breathing">
              <span className="inline-block rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white">
                {isEn ? "For Farmers" : "কৃষকদের জন্য"}
              </span>
              <h3 className="mt-6 font-serif text-2xl font-bold text-emerald-800 lg:text-3xl">
                {isEn ? "Protect Your Harvest" : "আপনার ফসল রক্ষা করুন"}
              </h3>
              <p className="mt-4 text-gray-600">
                {isEn
                  ? "Access weather forecasts, storage advice, AI chatbot support, and connect with a community."
                  : "আবহাওয়ার পূর্বাভাস, সংরক্ষণ পরামর্শ, এআই চ্যাটবট সহায়তা অ্যাক্সেস করুন।"}
              </p>
              <ul className="mt-6 space-y-3">
                {(isEn
                  ? ["Free weather forecasts", "AI-powered crop advice", "Storage best practices", "Community support"]
                  : ["বিনামূল্যে আবহাওয়া পূর্বাভাস", "এআই-চালিত ফসল পরামর্শ", "সংরক্ষণ সর্বোত্তম অনুশীলন", "সম্প্রদায় সহায়তা"]
                ).map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 shrink-0 text-amber-500" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/farmers" className="mt-8 inline-block">
                <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700">
                  {isEn ? "Start as Farmer" : "কৃষক হিসাবে শুরু করুন"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* For Public */}
            <div className="rounded-2xl border-2 border-amber-500 bg-amber-50 p-8 lg:p-10 animate-breathing" style={{ animationDelay: "0.3s" }}>
              <span className="inline-block rounded-full bg-amber-500 px-4 py-1.5 text-sm font-medium text-white">
                {isEn ? "For Public" : "জনগণের জন্য"}
              </span>
              <h3 className="mt-6 font-serif text-2xl font-bold text-emerald-800 lg:text-3xl">
                {isEn ? "Make a Difference" : "একটি পার্থক্য তৈরি করুন"}
              </h3>
              <p className="mt-4 text-gray-600">
                {isEn
                  ? "Learn about food loss, support our mission through donations or volunteering."
                  : "খাদ্য ক্ষতি সম্পর্কে জানুন, দান বা স্বেচ্ছাসেবার মাধ্যমে আমাদের মিশন সমর্থন করুন।"}
              </p>
              <ul className="mt-6 space-y-3">
                {(isEn
                  ? [
                    "Learn about the crisis",
                    "Support through donations",
                    "Volunteer opportunities",
                    "Share and spread awareness",
                  ]
                  : ["সংকট সম্পর্কে জানুন", "দানের মাধ্যমে সহায়তা", "স্বেচ্ছাসেবক সুযোগ", "সচেতনতা ভাগ করুন এবং ছড়িয়ে দিন"]
                ).map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 shrink-0 text-amber-500" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/public" className="mt-8 inline-block">
                <Button size="lg" className="bg-amber-500 text-white hover:bg-amber-600">
                  {isEn ? "Get Involved" : "যুক্ত হোন"}
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
