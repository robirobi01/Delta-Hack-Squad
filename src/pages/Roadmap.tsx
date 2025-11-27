
import { SectionHeader } from "@/components/section-header"
import { useLanguage } from "@/lib/language-context"
import { CheckCircle, Circle, Clock, Rocket, Brain, Smartphone, Users, Globe, BarChart3, Shield } from "lucide-react"

export default function RoadmapPage() {
  const { language } = useLanguage()
  const isEn = language === "en"

  const roadmapPhases = [
    {
      phase: isEn ? "Phase 1" : "পর্ব ১", titleEn: "Foundation", titleBn: "ভিত্তি", status: "completed", timeline: "2023 - Q2 2024",
      items: [
        { textEn: "Research & problem validation", textBn: "গবেষণা ও সমস্যা যাচাই", done: true },
        { textEn: "Platform design & architecture", textBn: "প্ল্যাটফর্ম ডিজাইন ও আর্কিটেকচার", done: true },
        { textEn: "Core website development", textBn: "মূল ওয়েবসাইট উন্নয়ন", done: true },
        { textEn: "Static dashboard prototype", textBn: "স্ট্যাটিক ড্যাশবোর্ড প্রোটোটাইপ", done: true },
        { textEn: "AI chatbot demo", textBn: "এআই চ্যাটবট ডেমো", done: true },
      ],
    },
    {
      phase: isEn ? "Phase 2" : "পর্ব ২", titleEn: "Pilot Launch", titleBn: "পাইলট লঞ্চ", status: "current", timeline: "Q3 2024 - Q1 2025",
      items: [
        { textEn: "Weather API integration", textBn: "আবহাওয়া API ইন্টিগ্রেশন", done: true },
        { textEn: "Farmer registration system", textBn: "কৃষক নিবন্ধন সিস্টেম", done: true },
        { textEn: "Pilot in 3 districts", textBn: "৩ জেলায় পাইলট", done: false },
        { textEn: "Community feedback collection", textBn: "সম্প্রদায় প্রতিক্রিয়া সংগ্রহ", done: false },
        { textEn: "Training materials in Bengali", textBn: "বাংলায় প্রশিক্ষণ উপকরণ", done: false },
      ],
    },
    {
      phase: isEn ? "Phase 3" : "পর্ব ৩", titleEn: "AI & Automation", titleBn: "এআই ও অটোমেশন", status: "upcoming", timeline: "Q2 2025 - Q4 2025",
      items: [
        { textEn: "AI-powered spoilage detection", textBn: "এআই-চালিত পচন সনাক্তকরণ", done: false },
        { textEn: "Photo-based crop health analysis", textBn: "ছবি-ভিত্তিক ফসল স্বাস্থ্য বিশ্লেষণ", done: false },
        { textEn: "Automated alerts & recommendations", textBn: "স্বয়ংক্রিয় সতর্কতা ও সুপারিশ", done: false },
        { textEn: "Voice assistant in Bengali", textBn: "বাংলায় ভয়েস সহকারী", done: false },
        { textEn: "Offline-capable mobile app", textBn: "অফলাইন-সক্ষম মোবাইল অ্যাপ", done: false },
      ],
    },
    {
      phase: isEn ? "Phase 4" : "পর্ব ৪", titleEn: "Scale & Impact", titleBn: "স্কেল ও প্রভাব", status: "upcoming", timeline: "2026 & Beyond",
      items: [
        { textEn: "Expand to all 8 divisions", textBn: "সব ৮ বিভাগে সম্প্রসারণ", done: false },
        { textEn: "Supply chain partnerships", textBn: "সরবরাহ শৃঙ্খল অংশীদারিত্ব", done: false },
        { textEn: "Real-time market integration", textBn: "রিয়েল-টাইম বাজার ইন্টিগ্রেশন", done: false },
        { textEn: "Policy advocacy & government collaboration", textBn: "নীতি অ্যাডভোকেসি ও সরকারি সহযোগিতা", done: false },
        { textEn: "Regional expansion (South Asia)", textBn: "আঞ্চলিক সম্প্রসারণ (দক্ষিণ এশিয়া)", done: false },
      ],
    },
  ]

  const futureFeatures = [
    { icon: Brain, titleEn: "AI Spoilage Detection", titleBn: "এআই পচন সনাক্তকরণ", descEn: "Upload photos to detect early signs of spoilage using computer vision.", descBn: "কম্পিউটার ভিশন ব্যবহার করে পচনের প্রাথমিক লক্ষণ সনাক্ত করতে ছবি আপলোড করুন।" },
    { icon: Smartphone, titleEn: "Offline Mobile App", titleBn: "অফলাইন মোবাইল অ্যাপ", descEn: "Native app that works without internet, syncing when connectivity is available.", descBn: "নেটিভ অ্যাপ যা ইন্টারনেট ছাড়া কাজ করে, সংযোগ পাওয়া গেলে সিঙ্ক করে।" },
    { icon: Users, titleEn: "Farmer Marketplace", titleBn: "কৃষক মার্কেটপ্লেস", descEn: "Connect farmers directly with buyers for better prices.", descBn: "ভাল দামের জন্য কৃষকদের সরাসরি ক্রেতাদের সাথে সংযুক্ত করুন।" },
    { icon: Globe, titleEn: "Regional Weather Network", titleBn: "আঞ্চলিক আবহাওয়া নেটওয়ার্ক", descEn: "Hyper-local weather stations for micro-climate forecasts.", descBn: "মাইক্রো-ক্লাইমেট পূর্বাভাসের জন্য হাইপার-লোকাল আবহাওয়া স্টেশন।" },
    { icon: BarChart3, titleEn: "Analytics Dashboard", titleBn: "অ্যানালিটিক্স ড্যাশবোর্ড", descEn: "Track your farm's performance and loss reduction over time.", descBn: "সময়ের সাথে আপনার খামারের কর্মক্ষমতা এবং ক্ষতি হ্রাস ট্র্যাক করুন।" },
    { icon: Shield, titleEn: "Crop Insurance Integration", titleBn: "ফসল বীমা ইন্টিগ্রেশন", descEn: "Simplified access to crop insurance with data-driven risk assessment.", descBn: "ডেটা-চালিত ঝুঁকি মূল্যায়ন সহ ফসল বীমায় সরলীকৃত অ্যাক্সেস।" },
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
              {isEn ? "Our Vision" : "আমাদের ভিশন"}
            </span>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
              {isEn ? "Building the Future of Food Security" : "খাদ্য নিরাপত্তার ভবিষ্যত তৈরি করা"}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              {isEn 
                ? "Our roadmap outlines the journey from a prototype to a comprehensive platform that empowers farmers across Bangladesh."
                : "আমাদের রোডম্যাপ একটি প্রোটোটাইপ থেকে একটি ব্যাপক প্ল্যাটফর্মে যাত্রার রূপরেখা দেয় যা বাংলাদেশ জুড়ে কৃষকদের ক্ষমতায়ন করে।"}
            </p>
          </div>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="bg-emerald-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label={isEn ? "Development Roadmap" : "উন্নয়ন রোডম্যাপ"}
            title={isEn ? "Our Journey to Impact" : "প্রভাবের দিকে আমাদের যাত্রা"}
            description={isEn ? "From research to nationwide scale, here's how we're building Harvest-Guard." : "গবেষণা থেকে দেশব্যাপী স্কেল, এভাবে আমরা হার্ভেস্ট-গার্ড তৈরি করছি।"}
            centered
          />

          <div className="relative mt-16">
            <div className="absolute left-4 top-0 hidden h-full w-1 bg-emerald-200 md:left-1/2 md:-translate-x-1/2 lg:block" />

            <div className="space-y-12">
              {roadmapPhases.map((phase, index) => (
                <div key={index} className={`relative flex flex-col lg:flex-row ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                  <div className="flex-1 lg:px-8">
                    <div className={`rounded-2xl border p-6 lg:p-8 ${
                      phase.status === "completed" ? "border-emerald-200 bg-white shadow-sm" :
                      phase.status === "current" ? "border-amber-400 bg-white shadow-lg" :
                      "border-emerald-100 bg-white/50"
                    }`}>
                      <div className="mb-4 flex items-center gap-3">
                        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${
                          phase.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                          phase.status === "current" ? "bg-amber-500 text-white" :
                          "bg-gray-100 text-gray-500"
                        }`}>{phase.phase}</span>
                        <span className="text-sm text-gray-500">{phase.timeline}</span>
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-emerald-800">{isEn ? phase.titleEn : phase.titleBn}</h3>
                      <ul className="mt-4 space-y-3">
                        {phase.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3">
                            {item.done ? (
                              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                            ) : phase.status === "current" ? (
                              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                            ) : (
                              <Circle className="mt-0.5 h-5 w-5 shrink-0 text-gray-300" />
                            )}
                            <span className={item.done ? "text-emerald-800" : "text-gray-500"}>{isEn ? item.textEn : item.textBn}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={`absolute left-4 top-8 hidden h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-4 lg:left-1/2 lg:flex ${
                    phase.status === "completed" ? "border-emerald-600 bg-emerald-600" :
                    phase.status === "current" ? "border-amber-500 bg-amber-500" :
                    "border-gray-300 bg-emerald-50"
                  }`}>
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
            label={isEn ? "Coming Soon" : "শীঘ্রই আসছে"}
            title={isEn ? "Features We're Building" : "আমরা যে ফিচারগুলি তৈরি করছি"}
            description={isEn ? "Exciting capabilities on our roadmap that will transform how farmers protect their harvest." : "আমাদের রোডম্যাপে উত্তেজনাপূর্ণ ক্ষমতা যা কৃষকদের তাদের ফসল রক্ষার পদ্ধতি রূপান্তরিত করবে।"}
            centered
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {futureFeatures.map((feature, index) => (
              <div key={index} className="group rounded-2xl border border-emerald-100 bg-emerald-50 p-6 transition-all hover:border-amber-200 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 transition-colors group-hover:bg-amber-100">
                  <feature.icon className="h-6 w-6 text-emerald-600 transition-colors group-hover:text-amber-\
