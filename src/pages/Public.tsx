

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { AnimatedCounter } from "@/components/animated-counter"
import { useLanguage } from "@/lib/language-context"
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

export default function PublicPage() {
  const { language } = useLanguage()
  const isEn = language === "en"

  const waysToHelp = [
    {
      icon: Heart,
      titleEn: "Donate",
      titleBn: "দান করুন",
      descEn: "Your contribution helps us build tools and expand our reach.",
      descBn: "আপনার অবদান আমাদের সরঞ্জাম তৈরি করতে এবং আমাদের নাগাল প্রসারিত করতে সাহায্য করে।",
      ctaEn: "Make a Donation",
      ctaBn: "দান করুন",
      href: "/contact",
    },
    {
      icon: Users,
      titleEn: "Volunteer",
      titleBn: "স্বেচ্ছাসেবক হোন",
      descEn: "Join our team as a volunteer — help with outreach or translation.",
      descBn: "একজন স্বেচ্ছাসেবক হিসাবে আমাদের দলে যোগ দিন — আউটরিচ বা অনুবাদে সাহায্য করুন।",
      ctaEn: "Join as Volunteer",
      ctaBn: "স্বেচ্ছাসেবক হিসাবে যোগ দিন",
      href: "/contact",
    },
    {
      icon: Share2,
      titleEn: "Spread Awareness",
      titleBn: "সচেতনতা ছড়িয়ে দিন",
      descEn: "Share our mission on social media and help others understand.",
      descBn: "সোশ্যাল মিডিয়ায় আমাদের মিশন শেয়ার করুন এবং অন্যদের বুঝতে সাহায্য করুন।",
      ctaEn: "Share Our Story",
      ctaBn: "আমাদের গল্প শেয়ার করুন",
      href: "#",
    },
    {
      icon: HandHeart,
      titleEn: "Partner With Us",
      titleBn: "আমাদের সাথে অংশীদার হোন",
      descEn: "Organizations can partner with us to amplify impact.",
      descBn: "সংস্থাগুলি প্রভাব বাড়াতে আমাদের সাথে অংশীদার হতে পারে।",
      ctaEn: "Become a Partner",
      ctaBn: "অংশীদার হোন",
      href: "/contact",
    },
  ]

  const impactStats = [
    { value: 4.5, suffix: "M", labelEn: "Tonnes of food we aim to save", labelBn: "টন খাদ্য বাঁচানোর লক্ষ্য", decimals: 1 },
    {
      value: 50,
      suffix: "K+",
      labelEn: "Farmers to reach by 2026",
      labelBn: "২০২৬ সালের মধ্যে কৃষকদের কাছে পৌঁছানো",
      decimals: 0,
    },
    { value: 8, suffix: "", labelEn: "Districts in pilot program", labelBn: "পাইলট প্রোগ্রামে জেলা", decimals: 0 },
    { value: 100, suffix: "%", labelEn: "Free services for farmers", labelBn: "কৃষকদের জন্য বিনামূল্যে সেবা", decimals: 0 },
  ]

  const learnTopics = [
    {
      titleEn: "Understanding Food Loss",
      titleBn: "খাদ্য অপচয় বোঝা",
      descEn: "Learn about the causes and impact of post-harvest losses.",
      descBn: "ফসল পরবর্তী ক্ষতির কারণ এবং প্রভাব সম্পর্কে জানুন।",
      icon: BookOpen,
      href: "/problem",
    },
    {
      titleEn: "Our Technology Solutions",
      titleBn: "আমাদের প্রযুক্তি সমাধান",
      descEn: "Discover how we use AI and weather data to help farmers.",
      descBn: "আমরা কিভাবে এআই এবং আবহাওয়া ডেটা ব্যবহার করি তা আবিষ্কার করুন।",
      icon: Globe,
      href: "/approach",
    },
    {
      titleEn: "Impact of Your Support",
      titleBn: "আপনার সহায়তার প্রভাব",
      descEn: "See how donations translate into real-world change.",
      descBn: "দান কিভাবে বাস্তব-বিশ্বের পরিবর্তনে রূপান্তরিত হয় দেখুন।",
      icon: Heart,
      href: "/about",
    },
    {
      titleEn: "Future Plans & Roadmap",
      titleBn: "ভবিষ্যত পরিকল্পনা ও রোডম্যাপ",
      descEn: "Explore our vision for scaling impact across Bangladesh.",
      descBn: "বাংলাদেশ জুড়ে প্রভাব স্কেলিং এর জন্য আমাদের দৃষ্টিভঙ্গি অন্বেষণ করুন।",
      icon: Megaphone,
      href: "/roadmap",
    },
  ]

  const testimonials = [
    {
      quote: isEn
        ? "Supporting Harvest-Guard means directly helping farmers protect their livelihoods. The impact is immediate and measurable."
        : "হার্ভেস্ট-গার্ড সমর্থন করা মানে সরাসরি কৃষকদের তাদের জীবিকা রক্ষা করতে সাহায্য করা।",
      name: isEn ? "Sarah Johnson" : "সারাহ জনসন",
      role: isEn ? "Monthly Donor" : "মাসিক দাতা",
    },
    {
      quote: isEn
        ? "As a volunteer translator, I helped make resources accessible in Bengali. It's fulfilling to bridge the gap."
        : "একজন স্বেচ্ছাসেবক অনুবাদক হিসাবে, আমি বাংলায় সংস্থান অ্যাক্সেসযোগ্য করতে সাহায্য করেছি।",
      name: isEn ? "Anik Das" : "অনিক দাস",
      role: isEn ? "Volunteer" : "স্বেচ্ছাসেবক",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-20">
          <img src="/placeholder.svg?height=600&width=1600" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-amber-500/20 px-4 py-1.5 text-sm font-medium text-amber-300">
              {isEn ? "For Supporters" : "সমর্থকদের জন্য"}
            </span>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
              {isEn ? "Be Part of the Solution to Food Loss" : "খাদ্য অপচয়ের সমাধানের অংশ হোন"}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              {isEn
                ? "Your support — whether through donations, volunteering, or simply spreading awareness — can help protect harvests and secure livelihoods for millions of farmers."
                : "আপনার সহায়তা — দান, স্বেচ্ছাসেবা বা সচেতনতা ছড়িয়ে দেওয়ার মাধ্যমে — লক্ষ লক্ষ কৃষকের ফসল রক্ষা এবং জীবিকা সুরক্ষিত করতে সাহায্য করতে পারে।"}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-amber-500 text-white hover:bg-amber-600">
                  {isEn ? "Donate Now" : "এখনই দান করুন"}
                  <Heart className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/problem">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  {isEn ? "Learn More" : "আরও জানুন"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="border-b border-emerald-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-serif text-3xl font-bold text-emerald-700 sm:text-4xl">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </div>
                <p className="mt-2 text-sm text-gray-600">{isEn ? stat.labelEn : stat.labelBn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="bg-emerald-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label={isEn ? "Get Involved" : "যুক্ত হোন"}
            title={isEn ? "How You Can Help" : "আপনি কিভাবে সাহায্য করতে পারেন"}
            description={
              isEn ? "There are many ways to contribute to our mission." : "আমাদের মিশনে অবদান রাখার অনেক উপায় রয়েছে।"
            }
            centered
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {waysToHelp.map((way, index) => (
              <div
                key={index}
                className="group flex flex-col rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100 transition-colors group-hover:bg-amber-200">
                  <way.icon className="h-7 w-7 text-amber-600" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-emerald-800">
                  {isEn ? way.titleEn : way.titleBn}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">{isEn ? way.descEn : way.descBn}</p>
                <Link to={way.href} className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full border-emerald-600/30 text-emerald-700 hover:bg-emerald-50 bg-transparent"
                  >
                    {isEn ? way.ctaEn : way.ctaBn}
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
            label={isEn ? "Education" : "শিক্ষা"}
            title={isEn ? "Learn About the Issue" : "সমস্যা সম্পর্কে জানুন"}
            description={
              isEn
                ? "Understanding the problem is the first step to being part of the solution."
                : "সমস্যা বোঝা সমাধানের অংশ হওয়ার প্রথম পদক্ষেপ।"
            }
            centered
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {learnTopics.map((topic, index) => (
              <Link
                key={index}
                to={topic.href}
                className="group flex items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-6 transition-all hover:border-amber-200 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 transition-colors group-hover:bg-amber-100">
                  <topic.icon className="h-6 w-6 text-emerald-600 transition-colors group-hover:text-amber-600" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-emerald-800 group-hover:text-amber-600">
                    {isEn ? topic.titleEn : topic.titleBn}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{isEn ? topic.descEn : topic.descBn}</p>
                </div>
                <ExternalLink className="ml-auto h-5 w-5 shrink-0 text-gray-400 transition-colors group-hover:text-amber-600" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-emerald-700 to-emerald-800 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label={isEn ? "Supporter Stories" : "সমর্থকদের গল্প"}
            title={isEn ? "Why People Support Us" : "কেন মানুষ আমাদের সমর্থন করে"}
            centered
            light
          />
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

      {/* What Support Achieves */}
      <section className="bg-emerald-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                label={isEn ? "Your Impact" : "আপনার প্রভাব"}
                title={isEn ? "What Your Support Achieves" : "আপনার সহায়তা কী অর্জন করে"}
                description={
                  isEn
                    ? "Every contribution creates real change for farmers and communities."
                    : "প্রতিটি অবদান কৃষক এবং সম্প্রদায়ের জন্য প্রকৃত পরিবর্তন তৈরি করে।"
                }
              />
              <ul className="mt-8 space-y-4">
                {(isEn
                  ? [
                    "Fund development of free tools for farmers",
                    "Train agricultural extension workers",
                    "Expand weather alert coverage",
                    "Support research on local storage solutions",
                    "Create educational content in Bengali",
                  ]
                  : [
                    "কৃষকদের জন্য বিনামূল্যে সরঞ্জাম উন্নয়নে অর্থায়ন",
                    "কৃষি সম্প্রসারণ কর্মীদের প্রশিক্ষণ দিন",
                    "আবহাওয়া সতর্কতা কভারেজ প্রসারিত করুন",
                    "স্থানীয় সংরক্ষণ সমাধান গবেষণা সমর্থন",
                    "বাংলায় শিক্ষামূলক বিষয়বস্তু তৈরি করুন",
                  ]
                ).map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img src="/placeholder.svg?height=500&width=600" alt="" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-500 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            {isEn ? "Ready to Make a Difference?" : "পার্থক্য তৈরি করতে প্রস্তুত?"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            {isEn
              ? "Join our community of supporters and help us build a future where no harvest is lost."
              : "আমাদের সমর্থক সম্প্রদায়ে যোগ দিন এবং এমন ভবিষ্যত তৈরি করতে সাহায্য করুন যেখানে কোনো ফসল নষ্ট হয় না।"}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-emerald-700 text-white hover:bg-emerald-800">
                {isEn ? "Donate Now" : "এখনই দান করুন"}
                <Heart className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white bg-white/10 text-white hover:bg-white/20">
                {isEn ? "Contact Us" : "যোগাযোগ করুন"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
