

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { AnimatedCounter } from "@/components/animated-counter"
import { useLanguage } from "@/lib/language-context"
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

export default function ProblemPage() {
  const { language } = useLanguage()
  const isEn = language === "en"

  const mainStats = [
    {
      icon: Wheat,
      value: 4.5,
      suffix: "M",
      labelEn: "Tonnes Lost Annually",
      labelBn: "টন বার্ষিক অপচয়",
      descEn: "Of food grains and staples lost post-harvest each year",
      descBn: "প্রতি বছর ফসল কাটার পরে নষ্ট হওয়া খাদ্যশস্য",
      decimals: 1,
    },
    {
      icon: DollarSign,
      value: 1.5,
      suffix: "B",
      labelEn: "Economic Impact",
      labelBn: "অর্থনৈতিক প্রভাব",
      descEn: "Estimated yearly economic loss to farmers and the nation",
      descBn: "কৃষক এবং জাতির আনুমানিক বার্ষিক অর্থনৈতিক ক্ষতি",
      decimals: 1,
    },
    {
      icon: Users,
      value: 160,
      suffix: "M+",
      labelEn: "People Affected",
      labelBn: "প্রভাবিত মানুষ",
      descEn: "Citizens impacted by food insecurity and price volatility",
      descBn: "খাদ্য নিরাপত্তাহীনতায় প্রভাবিত নাগরিক",
      decimals: 0,
    },
    {
      icon: TrendingDown,
      value: 32,
      suffix: "%",
      labelEn: "Post-Harvest Loss",
      labelBn: "ফসল পরবর্তী ক্ষতি",
      descEn: "Maximum loss rate for certain staple crops",
      descBn: "নির্দিষ্ট প্রধান ফসলের সর্বোচ্চ ক্ষতির হার",
      decimals: 0,
    },
  ]

  const supplyChainLosses = [
    {
      stage: isEn ? "Harvesting" : "ফসল কাটা",
      icon: Wheat,
      lossRange: "2-6%",
      descEn: "Improper timing and manual methods lead to losses.",
      descBn: "অনুচিত সময় এবং ম্যানুয়াল পদ্ধতি ক্ষতির কারণ।",
    },
    {
      stage: isEn ? "Drying" : "শুকানো",
      icon: Thermometer,
      lossRange: "3-8%",
      descEn: "Inadequate drying facilities cause spoilage.",
      descBn: "অপর্যাপ্ত শুকানোর সুবিধা পচন ঘটায়।",
    },
    {
      stage: isEn ? "Storage" : "সংরক্ষণ",
      icon: Warehouse,
      lossRange: "5-15%",
      descEn: "Poor storage, pests and moisture damage produce.",
      descBn: "খারাপ সংরক্ষণ, কীটপতঙ্গ এবং আর্দ্রতা ক্ষতি করে।",
    },
    {
      stage: isEn ? "Transport" : "পরিবহন",
      icon: Truck,
      lossRange: "2-10%",
      descEn: "Rough handling and delays cause deterioration.",
      descBn: "রুক্ষ হ্যান্ডলিং এবং বিলম্ব অবনতি ঘটায়।",
    },
    {
      stage: isEn ? "Market" : "বাজার",
      icon: Store,
      lossRange: "2-8%",
      descEn: "Infrastructure gaps lead to further spoilage.",
      descBn: "অবকাঠামো ঘাটতি আরও পচন ঘটায়।",
    },
  ]

  const lossReasons = [
    {
      icon: Thermometer,
      titleEn: "Climate & Weather",
      titleBn: "জলবায়ু ও আবহাওয়া",
      descEn: "Unpredictable monsoons, floods, and extreme heat accelerate spoilage.",
      descBn: "অপ্রত্যাশিত বর্ষা, বন্যা এবং চরম তাপ পচন ত্বরান্বিত করে।",
    },
    {
      icon: Warehouse,
      titleEn: "Poor Storage",
      titleBn: "খারাপ সংরক্ষণ",
      descEn: "Lack of modern silos and cold storage leaves produce vulnerable.",
      descBn: "আধুনিক সাইলো এবং কোল্ড স্টোরেজের অভাব উৎপাদনকে ঝুঁকিপূর্ণ করে।",
    },
    {
      icon: Bug,
      titleEn: "Pest & Disease",
      titleBn: "কীটপতঙ্গ ও রোগ",
      descEn: "Insects, rodents, and fungal infections destroy stored grains.",
      descBn: "পোকামাকড়, ইঁদুর এবং ছত্রাক সংক্রমণ সংরক্ষিত শস্য ধ্বংস করে।",
    },
    {
      icon: Droplets,
      titleEn: "Moisture Damage",
      titleBn: "আর্দ্রতা ক্ষতি",
      descEn: "Inadequate drying leads to mold growth.",
      descBn: "অপর্যাপ্ত শুকানো ছাঁচ বৃদ্ধির দিকে নিয়ে যায়।",
    },
    {
      icon: Truck,
      titleEn: "Transport Issues",
      titleBn: "পরিবহন সমস্যা",
      descEn: "Poor roads and lack of refrigerated vehicles.",
      descBn: "খারাপ রাস্তা এবং রেফ্রিজারেটেড গাড়ির অভাব।",
    },
    {
      icon: AlertTriangle,
      titleEn: "Limited Information",
      titleBn: "সীমিত তথ্য",
      descEn: "Farmers lack access to weather and market information.",
      descBn: "কৃষকদের আবহাওয়া এবং বাজার তথ্যে প্রবেশাধিকার নেই।",
    },
  ]

  const cropLosses = [
    { crop: isEn ? "Rice" : "ধান", loss: 12, color: "bg-emerald-600" },
    { crop: isEn ? "Wheat" : "গম", loss: 8, color: "bg-emerald-500" },
    { crop: isEn ? "Vegetables" : "সবজি", loss: 32, color: "bg-amber-500" },
    { crop: isEn ? "Fruits" : "ফল", loss: 25, color: "bg-orange-400" },
    { crop: isEn ? "Pulses" : "ডাল", loss: 10, color: "bg-emerald-400" },
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
            <span className="mb-4 inline-block rounded-full bg-red-500/20 px-4 py-1.5 text-sm font-medium text-red-300">
              {isEn ? "The Challenge" : "চ্যালেঞ্জ"}
            </span>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
              {isEn
                ? "Bangladesh Loses Millions of Tonnes of Food Every Year"
                : "বাংলাদেশে প্রতি বছর লক্ষ লক্ষ টন খাদ্য নষ্ট হয়"}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              {isEn
                ? "From farm to table, food is lost at every stage of the supply chain. This preventable loss affects food security, farmer incomes, and the environment."
                : "খামার থেকে টেবিল পর্যন্ত, সরবরাহ শৃঙ্খলের প্রতিটি পর্যায়ে খাদ্য নষ্ট হয়। এই প্রতিরোধযোগ্য ক্ষতি খাদ্য নিরাপত্তা এবং কৃষকদের আয়কে প্রভাবিত করে।"}
            </p>
          </div>
        </div>
      </section>

      {/* Main Statistics */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mainStats.map((stat, index) => (
              <div key={index} className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100">
                  <stat.icon className="h-7 w-7 text-emerald-600" />
                </div>
                <div className="font-serif text-4xl font-bold text-emerald-700">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </div>
                <h3 className="mt-2 font-semibold text-emerald-800">{isEn ? stat.labelEn : stat.labelBn}</h3>
                <p className="mt-2 text-sm text-gray-600">{isEn ? stat.descEn : stat.descBn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supply Chain Losses */}
      <section className="bg-emerald-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label={isEn ? "The Supply Chain" : "সরবরাহ শৃঙ্খল"}
            title={isEn ? "Where Food Gets Lost" : "কোথায় খাদ্য নষ্ট হয়"}
            description={
              isEn
                ? "Food loss occurs at every stage from harvest to market."
                : "ফসল কাটা থেকে বাজার পর্যন্ত প্রতিটি পর্যায়ে খাদ্য ক্ষতি হয়।"
            }
            centered
          />
          <div className="mt-16">
            <div className="relative">
              <div className="absolute left-0 right-0 top-16 hidden h-1 bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-400 lg:block" />
              <div className="grid gap-6 lg:grid-cols-5">
                {supplyChainLosses.map((stage, index) => (
                  <div key={index} className="relative text-center">
                    <div className="relative z-10 mx-auto mb-4 flex h-32 w-32 flex-col items-center justify-center rounded-full border-4 border-emerald-200 bg-white shadow-lg">
                      <stage.icon className="h-10 w-10 text-emerald-600" />
                      <span className="mt-2 text-lg font-bold text-amber-500">{stage.lossRange}</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-emerald-800">{stage.stage}</h3>
                    <p className="mt-2 text-sm text-gray-600">{isEn ? stage.descEn : stage.descBn}</p>
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
                label={isEn ? "By Crop Type" : "ফসলের ধরন অনুসারে"}
                title={isEn ? "Post-Harvest Loss Varies by Produce" : "ফসল পরবর্তী ক্ষতি উৎপাদন অনুসারে পরিবর্তিত হয়"}
                description={
                  isEn
                    ? "Perishable items like vegetables and fruits suffer the highest losses."
                    : "শাকসবজি এবং ফলের মতো পচনশীল পণ্য সবচেয়ে বেশি ক্ষতিগ্রস্ত হয়।"
                }
              />
              <div className="mt-8 space-y-4">
                {cropLosses.map((item, index) => (
                  <div key={index}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-emerald-800">{item.crop}</span>
                      <span className="text-sm font-semibold text-gray-600">
                        {item.loss}% {isEn ? "loss" : "ক্ষতি"}
                      </span>
                    </div>
                    <div className="h-4 overflow-hidden rounded-full bg-emerald-100">
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
              <div className="aspect-square overflow-hidden rounded-2xl shadow-xl">
                <img src="/placeholder.svg?height=600&width=600" alt="" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Loss Happens */}
      <section className="bg-gradient-to-br from-emerald-700 to-emerald-800 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label={isEn ? "Root Causes" : "মূল কারণ"}
            title={isEn ? "Why Food Gets Lost" : "কেন খাদ্য নষ্ট হয়"}
            description={
              isEn
                ? "Multiple interconnected factors contribute to post-harvest losses."
                : "একাধিক আন্তঃসংযুক্ত কারণ ফসল পরবর্তী ক্ষতিতে অবদান রাখে।"
            }
            centered
            light
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lossReasons.map((reason, index) => (
              <div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20">
                  <reason.icon className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-white">
                  {isEn ? reason.titleEn : reason.titleBn}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{isEn ? reason.descEn : reason.descBn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Human Impact */}
      <section className="bg-emerald-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <img src="/placeholder.svg?height=300&width=300" alt="" className="h-full w-full object-cover" />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <img src="/placeholder.svg?height=300&width=300" alt="" className="h-full w-full object-cover" />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-lg sm:col-span-2">
                  <img src="/placeholder.svg?height=200&width=600" alt="" className="h-48 w-full object-cover" />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeader
                label={isEn ? "Human Cost" : "মানবিক মূল্য"}
                title={isEn ? "The Real Impact on Lives" : "জীবনে প্রকৃত প্রভাব"}
                description={
                  isEn
                    ? "Behind these statistics are real people — farmers who lose their income, families facing food insecurity."
                    : "এই পরিসংখ্যানের পিছনে রয়েছে প্রকৃত মানুষ — কৃষক যারা তাদের আয় হারায়, খাদ্য নিরাপত্তাহীনতার মুখোমুখি পরিবার।"
                }
              />
              <div className="mt-8 space-y-4">
                <div className="rounded-xl border-l-4 border-amber-500 bg-white p-4 shadow-sm">
                  <p className="text-gray-600">
                    <strong className="text-emerald-700">{isEn ? "40% of farmers" : "৪০% কৃষক"}</strong>{" "}
                    {isEn
                      ? "report significant income loss due to post-harvest spoilage"
                      : "ফসল পরবর্তী পচনের কারণে উল্লেখযোগ্য আয় ক্ষতির রিপোর্ট করেন"}
                  </p>
                </div>
                <div className="rounded-xl border-l-4 border-amber-500 bg-white p-4 shadow-sm">
                  <p className="text-gray-600">
                    <strong className="text-emerald-700">{isEn ? "Food price volatility" : "খাদ্যের দাম অস্থিরতা"}</strong>{" "}
                    {isEn
                      ? "affects the poorest households most severely"
                      : "সবচেয়ে দরিদ্র পরিবারগুলোকে সবচেয়ে বেশি প্রভাবিত করে"}
                  </p>
                </div>
                <div className="rounded-xl border-l-4 border-amber-500 bg-white p-4 shadow-sm">
                  <p className="text-gray-600">
                    <strong className="text-emerald-700">{isEn ? "Environmental impact" : "পরিবেশগত প্রভাব"}</strong>{" "}
                    {isEn ? "— wasted resources and increased emissions" : "— সম্পদের অপচয় এবং বর্ধিত নির্গমন"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-500 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            {isEn ? "The Good News? This Is Preventable." : "সুসংবাদ? এটি প্রতিরোধযোগ্য।"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            {isEn
              ? "With the right tools, knowledge, and support, we can significantly reduce food loss in Bangladesh."
              : "সঠিক সরঞ্জাম, জ্ঞান এবং সহায়তার মাধ্যমে, আমরা বাংলাদেশে খাদ্য অপচয় উল্লেখযোগ্যভাবে কমাতে পারি।"}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/approach">
              <Button size="lg" className="bg-emerald-700 text-white hover:bg-emerald-800">
                {isEn ? "See Our Solutions" : "আমাদের সমাধান দেখুন"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="border-white bg-white/10 text-white hover:bg-white/20">
                {isEn ? "Try Our Tools" : "আমাদের সরঞ্জাম ব্যবহার করুন"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
