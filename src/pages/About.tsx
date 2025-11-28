import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { Target, Eye, Heart, Users, Globe, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import xamImg from "/img/xam.png.png"
import ritishImg from "/img/ritishvai.jpg"
import jimImg from "/img/jim.jpg"


const values = [
    {
        icon: Target,
        titleEn: "Impact-Driven",
        titleBn: "প্রভাব-চালিত",
        descEn:
            "Every initiative we undertake is measured by its real-world impact on reducing food loss and improving farmer livelihoods.",
        descBn: "আমাদের প্রতিটি উদ্যোগ খাদ্য অপচয় হ্রাস এবং কৃষকদের জীবিকা উন্নত করতে এর বাস্তব-বিশ্বের প্রভাব দ্বারা পরিমাপ করা হয়।",
    },
    {
        icon: Heart,
        titleEn: "Farmer-First",
        titleBn: "কৃষক-প্রথম",
        descEn:
            "We design all our tools and resources with farmers at the center, ensuring accessibility regardless of technical literacy.",
        descBn:
            "আমরা কৃষকদের কেন্দ্রে রেখে আমাদের সমস্ত সরঞ্জাম এবং সংস্থান ডিজাইন করি, প্রযুক্তিগত সাক্ষরতা নির্বিশেষে অ্যাক্সেসযোগ্যতা নিশ্চিত করি।",
    },
    {
        icon: Users,
        titleEn: "Community-Based",
        titleBn: "সম্প্রদায়-ভিত্তিক",
        descEn: "We believe in the power of collective action and community knowledge sharing to create lasting change.",
        descBn: "আমরা স্থায়ী পরিবর্তন তৈরি করতে সম্মিলিত কর্ম এবং সম্প্রদায়ের জ্ঞান ভাগাভাগির শক্তিতে বিশ্বাস করি।",
    },
    {
        icon: Globe,
        titleEn: "Sustainability",
        titleBn: "টেকসইতা",
        descEn:
            "Our work aligns with SDG 12.3 and contributes to a more sustainable and food-secure future for Bangladesh.",
        descBn: "আমাদের কাজ SDG 12.3 এর সাথে সামঞ্জস্যপূর্ণ এবং বাংলাদেশের জন্য আরও টেকসই এবং খাদ্য-নিরাপদ ভবিষ্যতে অবদান রাখে।",
    },
]

const milestones = [
    {
        year: "2023",
        titleEn: "Research & Foundation",
        titleBn: "গবেষণা ও ভিত্তি",
        descEn: "Conducted extensive research on post-harvest losses in Bangladesh and identified key intervention points.",
        descBn: "বাংলাদেশে ফসল কাটার পরের ক্ষতির উপর ব্যাপক গবেষণা পরিচালনা এবং মূল হস্তক্ষেপ পয়েন্ট চিহ্নিত করা।",
    },
    {
        year: "2024",
        titleEn: "Platform Development",
        titleBn: "প্ল্যাটফর্ম উন্নয়ন",
        descEn: "Built the Harvest-Guard platform with weather integration, AI chatbot, and farmer dashboard prototypes.",
        descBn: "আবহাওয়া একীকরণ, এআই চ্যাটবট এবং কৃষক ড্যাশবোর্ড প্রোটোটাইপ সহ হার্ভেস্ট-গার্ড প্ল্যাটফর্ম তৈরি।",
    },
    {
        year: "2025",
        titleEn: "Pilot Launch",
        titleBn: "পাইলট লঞ্চ",
        descEn: "Launching pilot programs in select districts to test and refine our solutions with real farmers.",
        descBn: "প্রকৃত কৃষকদের সাথে আমাদের সমাধান পরীক্ষা এবং পরিমার্জন করতে নির্বাচিত জেলায় পাইলট প্রোগ্রাম চালু করা।",
    },
    {
        year: "Future",
        titleEn: "Scale & Impact",
        titleBn: "স্কেল ও প্রভাব",
        descEn: "Expanding nationwide with AI-powered spoilage detection, supply chain optimization, and policy advocacy.",
        descBn: "এআই-চালিত পচন সনাক্তকরণ, সরবরাহ শৃঙ্খল অপ্টিমাইজেশন এবং নীতি অ্যাডভোকেসি সহ দেশব্যাপী সম্প্রসারণ।",
    },
]

const team = [
    {
        name: "Jamee",
        namebn: "জামী",
        role: "Front End Developer",
        rolebn: "ফ্রন্ট এন্ড ডেভেলপার",
        image: xamImg,
    },
    {
        name: "Ritish",
        namebn: "রিতিশ",
        role: "Back End Developer",
        rolebn: "ব্যাকএন্ড ডেভেলপার",
        image: ritishImg,
    },
    {
        name: "Jim",
        namebn: "জিম",
        role: "Prompt King",
        rolebn: "প্রম্পট কিং",
        image: jimImg,
    },
]

export default function AboutPage() {
    const { language } = useLanguage()
    const isEn = language === "en"

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
                            {isEn ? "About Us" : "আমাদের সম্পর্কে"}
                        </span>
                        <h1 className="font-serif text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
                            {isEn ? "Protecting Bangladesh's Harvest Through Innovation" : "উদ্ভাবনের মাধ্যমে বাংলাদেশের ফসল রক্ষা করা"}
                        </h1>
                        <p className="mt-6 text-lg leading-relaxed text-white/80">
                            {isEn
                                ? "We are a team of researchers, technologists, and community workers united by a single mission: to reduce food loss and secure the livelihoods of millions of Bangladeshi farmers."
                                : "আমরা গবেষক, প্রযুক্তিবিদ এবং সম্প্রদায়কর্মীদের একটি দল যারা একটি একক মিশনে ঐক্যবদ্ধ: খাদ্য অপচয় কমানো এবং লক্ষ লক্ষ বাংলাদেশি কৃষকদের জীবিকা সুরক্ষিত করা।"}
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-white py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2">
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-8 lg:p-12 animate-breathing">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-600">
                                <Target className="h-7 w-7 text-white" />
                            </div>
                            <h2 className="font-serif text-2xl font-bold text-emerald-800 lg:text-3xl">
                                {isEn ? "Our Mission" : "আমাদের মিশন"}
                            </h2>
                            <p className="mt-4 text-lg leading-relaxed text-gray-600">
                                {isEn
                                    ? "To significantly reduce post-harvest food losses in Bangladesh by empowering farmers with accessible technology, timely information, and community support systems that protect their harvest and improve their economic well-being."
                                    : "বাংলাদেশে ফসল কাটার পরে খাদ্য ক্ষতি উল্লেখযোগ্যভাবে কমাতে কৃষকদের অ্যাক্সেসযোগ্য প্রযুক্তি, সময়োপযোগী তথ্য এবং সম্প্রদায় সহায়তা ব্যবস্থা দিয়ে ক্ষমতায়ন করা।"}
                            </p>
                        </div>
                        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-8 lg:p-12 animate-breathing" style={{ animationDelay: "0.3s" }}>
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500">
                                <Eye className="h-7 w-7 text-white" />
                            </div>
                            <h2 className="font-serif text-2xl font-bold text-emerald-800 lg:text-3xl">
                                {isEn ? "Our Vision" : "আমাদের ভিশন"}
                            </h2>
                            <p className="mt-4 text-lg leading-relaxed text-gray-600">
                                {isEn
                                    ? "A Bangladesh where no harvest is lost to preventable causes, where every farmer has the tools and knowledge to protect their produce, and where food security is a reality for all 170 million citizens."
                                    : "এমন একটি বাংলাদেশ যেখানে প্রতিরোধযোগ্য কারণে কোনো ফসল নষ্ট হয় না, প্রতিটি কৃষকের তাদের উৎপাদন রক্ষা করার সরঞ্জাম এবং জ্ঞান আছে।"}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="bg-emerald-50 py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        label={isEn ? "Our Values" : "আমাদের মূল্যবোধ"}
                        title={isEn ? "What Guides Our Work" : "যা আমাদের কাজ পরিচালনা করে"}
                        description={
                            isEn
                                ? "These core principles shape everything we do, from technology development to farmer engagement."
                                : "এই মূল নীতিগুলি প্রযুক্তি উন্নয়ন থেকে কৃষক সম্পৃক্ততা পর্যন্ত আমাদের সমস্ত কিছু গঠন করে।"
                        }
                        centered
                    />
                    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((value, index) => (
                            <div key={index} className="rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-sm animate-breathing" style={{ animationDelay: `${index * 0.15}s` }}>
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100">
                                    <value.icon className="h-7 w-7 text-emerald-600" />
                                </div>
                                <h3 className="font-serif text-xl font-semibold text-emerald-800">
                                    {isEn ? value.titleEn : value.titleBn}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-gray-600">{isEn ? value.descEn : value.descBn}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Timeline */}
            <section className="bg-white py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        label={isEn ? "Our Journey" : "আমাদের যাত্রা"}
                        title={isEn ? "Building a Movement Against Food Loss" : "খাদ্য অপচয়ের বিরুদ্ধে আন্দোলন গড়ে তোলা"}
                        centered
                    />
                    <div className="relative mt-16">
                        <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-emerald-200 md:left-1/2 md:block" />
                        <div className="space-y-12">
                            {milestones.map((milestone, index) => (
                                <div
                                    key={index}
                                    className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                                >
                                    <div className="flex-1 md:px-8">
                                        <div
                                            className={`rounded-2xl border border-emerald-100 bg-emerald-50 p-6 animate-breathing ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                                            style={{ animationDelay: `${index * 0.2}s` }}
                                        >
                                            <span className="inline-block rounded-full bg-amber-500 px-4 py-1 text-sm font-semibold text-white">
                                                {milestone.year}
                                            </span>
                                            <h3 className="mt-4 font-serif text-xl font-bold text-emerald-800">
                                                {isEn ? milestone.titleEn : milestone.titleBn}
                                            </h3>
                                            <p className="mt-2 text-gray-600">{isEn ? milestone.descEn : milestone.descBn}</p>
                                        </div>
                                    </div>
                                    <div className="absolute left-4 top-6 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-amber-500 bg-white md:left-1/2 md:block" />
                                    <div className="hidden flex-1 md:block" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="bg-emerald-50 py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        label={isEn ? "Our Team" : "আমাদের টিম"}
                        title={isEn ? "The People Behind Harvest-Guard" : "হার্ভেস্ট-গার্ডের পেছনের মানুষ"}
                        description={
                            isEn
                                ? "A dedicated team combining expertise in agriculture, technology, and community development."
                                : "কৃষি, প্রযুক্তি এবং সম্প্রদায় উন্নয়নে দক্ষতা সম্পন্ন একটি নিবেদিত দল।"
                        }
                        centered
                    />
                    <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {team.map((member, index) => (
                            <div key={index} className="group text-center">
                                <div className="mx-auto mb-4 h-48 w-48 overflow-hidden rounded-2xl bg-emerald-100 animate-breathing" style={{ animationDelay: `${index * 0.2}s` }}>
                                    <img
                                        src={member.image}
                                        alt={isEn ? member.name : member.namebn}
                                        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="font-serif text-xl font-semibold text-emerald-800">
                                    {isEn ? member.name : member.namebn}
                                </h3>
                                <p className="mt-1 text-sm text-gray-600">{isEn ? member.role : member.rolebn}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 py-20">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
                        {isEn ? "Want to Be Part of Our Mission?" : "আমাদের মিশনের অংশ হতে চান?"}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                        {isEn
                            ? "Whether you're a farmer, researcher, donor, or advocate, there are many ways to contribute to reducing food loss in Bangladesh."
                            : "আপনি কৃষক, গবেষক, দাতা বা অ্যাডভোকেট হোন না কেন, বাংলাদেশে খাদ্য অপচয় কমাতে অবদান রাখার অনেক উপায় রয়েছে।"}
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Link to="/contact">
                            <Button size="lg" className="bg-amber-500 text-white hover:bg-amber-600">
                                {isEn ? "Get Involved" : "যুক্ত হোন"}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link to="/roadmap">
                            <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                                {isEn ? "See Our Roadmap" : "রোডম্যাপ দেখুন"}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
