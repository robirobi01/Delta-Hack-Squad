

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { useLanguage } from "@/lib/language-context"
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
import bgPhoto from "/img/bg-photo.avif"
import ruralBangladesh from "/img/ruralBangladesh.png"
import freetrain from "/img/freetrain.png"

export default function FarmersPage() {
  const { language } = useLanguage()
  const isEn = language === "en"

  const benefits = [
    {
      icon: CloudSun,
      titleEn: "Weather Forecasts",
      titleBn: "আবহাওয়া পূর্বাভাস",
      descEn: "Get accurate 7-day forecasts for your area.",
      descBn: "আপনার এলাকার জন্য সঠিক ৭ দিনের পূর্বাভাস পান।",
    },
    {
      icon: MessageCircle,
      titleEn: "AI Chatbot Support",
      titleBn: "এআই চ্যাটবট সহায়তা",
      descEn: "Ask questions anytime about crop health and storage.",
      descBn: "ফসলের স্বাস্থ্য এবং সংরক্ষণ সম্পর্কে যেকোনো সময় প্রশ্ন করুন।",
    },
    {
      icon: Warehouse,
      titleEn: "Storage Guidance",
      titleBn: "সংরক্ষণ নির্দেশিকা",
      descEn: "Learn proper storage methods to keep your harvest safe.",
      descBn: "আপনার ফসল নিরাপদ রাখতে সঠিক সংরক্ষণ পদ্ধতি শিখুন।",
    },
    {
      icon: BookOpen,
      titleEn: "Training Materials",
      titleBn: "প্রশিক্ষণ সামগ্রী",
      descEn: "Access videos and guides on modern techniques.",
      descBn: "আধুনিক কৌশলের ভিডিও এবং গাইড অ্যাক্সেস করুন।",
    },
    {
      icon: Users,
      titleEn: "Farmer Network",
      titleBn: "কৃষক নেটওয়ার্ক",
      descEn: "Connect with other farmers to share experiences.",
      descBn: "অভিজ্ঞতা ভাগ করতে অন্যান্য কৃষকদের সাথে সংযোগ করুন।",
    },
    {
      icon: Phone,
      titleEn: "Expert Helpline",
      titleBn: "বিশেষজ্ঞ হেল্পলাইন",
      descEn: "Reach agricultural experts for personalized advice.",
      descBn: "ব্যক্তিগত পরামর্শের জন্য কৃষি বিশেষজ্ঞদের কাছে পৌঁছান।",
    },
  ]

  const howItWorks = [
    {
      step: "1",
      titleEn: "Register",
      titleBn: "নিবন্ধন করুন",
      descEn: "Sign up with your name, phone, and location.",
      descBn: "আপনার নাম, ফোন এবং অবস্থান দিয়ে সাইন আপ করুন।",
    },
    {
      step: "2",
      titleEn: "Access Dashboard",
      titleBn: "ড্যাশবোর্ড অ্যাক্সেস",
      descEn: "View weather forecasts, tips, and alerts.",
      descBn: "আবহাওয়া পূর্বাভাস, টিপস এবং সতর্কতা দেখুন।",
    },
    {
      step: "3",
      titleEn: "Get Support",
      titleBn: "সহায়তা পান",
      descEn: "Use the AI chatbot or helpline for advice.",
      descBn: "পরামর্শের জন্য এআই চ্যাটবট বা হেল্পলাইন ব্যবহার করুন।",
    },
    {
      step: "4",
      titleEn: "Reduce Losses",
      titleBn: "ক্ষতি কমান",
      descEn: "Apply the guidance to protect your harvest.",
      descBn: "আপনার ফসল রক্ষা করতে নির্দেশিকা প্রয়োগ করুন।",
    },
  ]

  const resources = [
    {
      titleEn: "Post-Harvest Storage Guide",
      titleBn: "ফসল পরবর্তী সংরক্ষণ গাইড",
      type: isEn ? "PDF Guide" : "পিডিএফ গাইড",
      icon: FileText,
    },
    {
      titleEn: "Grain Drying Best Practices",
      titleBn: "শস্য শুকানোর সর্বোত্তম অনুশীলন",
      type: isEn ? "Video Tutorial" : "ভিডিও টিউটোরিয়াল",
      icon: Play,
    },
    {
      titleEn: "Pest Prevention Methods",
      titleBn: "কীটপতঙ্গ প্রতিরোধ পদ্ধতি",
      type: isEn ? "PDF Guide" : "পিডিএফ গাইড",
      icon: FileText,
    },
    {
      titleEn: "Using Weather Forecasts",
      titleBn: "আবহাওয়া পূর্বাভাস ব্যবহার",
      type: isEn ? "Video Tutorial" : "ভিডিও টিউটোরিয়াল",
      icon: Play,
    },
  ]

  const faqs = [
    {
      qEn: "Is the service free?",
      qBn: "সেবা কি বিনামূল্যে?",
      aEn: "Yes, all our services are completely free for farmers.",
      aBn: "হ্যাঁ, আমাদের সমস্ত সেবা কৃষকদের জন্য সম্পূর্ণ বিনামূল্যে।",
    },
    {
      qEn: "Do I need internet all the time?",
      qBn: "আমার কি সবসময় ইন্টারনেট দরকার?",
      aEn: "No. Many resources can be downloaded for offline use.",
      aBn: "না। অনেক সংস্থান অফলাইন ব্যবহারের জন্য ডাউনলোড করা যায়।",
    },
    {
      qEn: "What crops do you support?",
      qBn: "আপনি কোন ফসল সমর্থন করেন?",
      aEn: "We provide guidance for rice, wheat, vegetables, fruits, and more.",
      aBn: "আমরা ধান, গম, সবজি, ফল এবং আরও অনেক কিছুর জন্য নির্দেশিকা প্রদান করি।",
    },
    {
      qEn: "Is my information safe?",
      qBn: "আমার তথ্য কি নিরাপদ?",
      aEn: "Yes. We protect your data and never share it without consent.",
      aBn: "হ্যাঁ। আমরা আপনার ডেটা রক্ষা করি এবং সম্মতি ছাড়া শেয়ার করি না।",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-20">
          <img src={bgPhoto} alt="Background" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-4 inline-block rounded-full bg-amber-500/20 px-4 py-1.5 text-sm font-medium text-amber-300">
                {isEn ? "For Farmers" : "কৃষকদের জন্য"}
              </span>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
                {isEn ? "Protect Your Harvest. Secure Your Income." : "আপনার ফসল রক্ষা করুন। আপনার আয় সুরক্ষিত করুন।"}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                {isEn
                  ? "Free tools and resources to help you reduce post-harvest losses, get better prices, and connect with a supportive farming community."
                  : "ফসল পরবর্তী ক্ষতি কমাতে, ভাল দাম পেতে এবং একটি সহায়ক কৃষি সম্প্রদায়ের সাথে সংযোগ করতে বিনামূল্যে সরঞ্জাম এবং সংস্থান।"}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/login">
                  <Button size="lg" className="bg-amber-500 text-white hover:bg-amber-600">
                    {isEn ? "Register Now - Free" : "এখনই নিবন্ধন করুন - বিনামূল্যে"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                  >
                    {isEn ? "Try Demo" : "ডেমো দেখুন"}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <img src={ruralBangladesh} alt="Rural Bangladesh" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label={isEn ? "What You Get" : "আপনি কি পাবেন"}
            title={isEn ? "Free Tools & Resources" : "বিনামূল্যে সরঞ্জাম ও সংস্থান"}
            description={
              isEn
                ? "Everything you need to protect your crops and improve your farming success."
                : "আপনার ফসল রক্ষা করতে এবং কৃষি সাফল্য উন্নত করতে যা প্রয়োজন।"
            }
            centered
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <benefit.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-emerald-800">
                  {isEn ? benefit.titleEn : benefit.titleBn}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{isEn ? benefit.descEn : benefit.descBn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-emerald-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label={isEn ? "Getting Started" : "শুরু করা"}
            title={isEn ? "How It Works" : "এটি কিভাবে কাজ করে"}
            description={
              isEn
                ? "Start protecting your harvest in just a few simple steps."
                : "মাত্র কয়েকটি সহজ ধাপে আপনার ফসল রক্ষা করা শুরু করুন।"
            }
            centered
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 font-serif text-2xl font-bold text-white shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-serif text-xl font-semibold text-emerald-800">
                  {isEn ? item.titleEn : item.titleBn}
                </h3>
                <p className="mt-3 text-sm text-gray-600">{isEn ? item.descEn : item.descBn}</p>
                {index < howItWorks.length - 1 && (
                  <ArrowRight className="absolute -right-4 top-8 hidden h-8 w-8 text-amber-500 lg:block" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/login">
              <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700">
                {isEn ? "Register Now - It's Free" : "এখনই নিবন্ধন করুন - বিনামূল্যে"}
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
                label={isEn ? "Learning Materials" : "শিক্ষার উপকরণ"}
                title={isEn ? "Free Training Resources" : "বিনামূল্যে প্রশিক্ষণ সংস্থান"}
                description={
                  isEn
                    ? "Access guides and videos to learn better farming techniques — even offline."
                    : "উন্নত কৃষি কৌশল শিখতে গাইড এবং ভিডিও অ্যাক্সেস করুন — এমনকি অফলাইনেও।"
                }
              />
              <div className="mt-8 space-y-4">
                {resources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                      <resource.icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-emerald-800">{isEn ? resource.titleEn : resource.titleBn}</h4>
                      <p className="text-sm text-gray-600">{resource.type}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img src={freetrain} alt="Training Resources" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-emerald-50 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label={isEn ? "Questions?" : "প্রশ্ন?"}
            title={isEn ? "Frequently Asked Questions" : "সচরাচর জিজ্ঞাসিত প্রশ্নাবলী"}
            centered
          />
          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-emerald-800">{isEn ? faq.qEn : faq.qBn}</h3>
                <p className="mt-2 text-sm text-gray-600">{isEn ? faq.aEn : faq.aBn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-emerald-700 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-amber-400" />
              <span className="text-white">{isEn ? "Your Data is Safe" : "আপনার ডেটা নিরাপদ"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Smartphone className="h-8 w-8 text-amber-400" />
              <span className="text-white">{isEn ? "Works on Any Phone" : "যেকোনো ফোনে কাজ করে"}</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-amber-400" />
              <span className="text-white">{isEn ? "100% Free Forever" : "চিরকাল ১০০% বিনামূল্যে"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-500 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            {isEn ? "Ready to Protect Your Harvest?" : "আপনার ফসল রক্ষা করতে প্রস্তুত?"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            {isEn
              ? "Join thousands of farmers who are reducing losses and improving their income with Harvest-Guard."
              : "হাজার হাজার কৃষকদের সাথে যোগ দিন যারা হার্ভেস্ট-গার্ডের মাধ্যমে ক্ষতি কমাচ্ছেন এবং তাদের আয় উন্নত করছেন।"}
          </p>
          <div className="mt-10">
            <Link to="/login">
              <Button size="lg" className="bg-emerald-700 text-white hover:bg-emerald-800">
                {isEn ? "Register Now - It's Free" : "এখনই নিবন্ধন করুন - বিনামূল্যে"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
