import { Link } from "react-router-dom"
import Image from "@/components/image"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { FeatureCard } from "@/components/feature-card"
import { AnimatedCounter } from "@/components/animated-counter"
import { useLanguage } from "@/lib/language-context"
import {
    CloudSun,
    MessageCircle,
    BookOpen,
    Users,
    TrendingDown,
    Warehouse,
    Truck,
    ArrowRight,
    CheckCircle,
    Play,
    Leaf,
    Shield,
} from "lucide-react"

export default function HomePage() {
    const { t, language } = useLanguage()

    const stats = [
        { value: 4.5, suffix: "M", label: t("stats.foodLost"), decimals: 1 },
        { value: 1.5, prefix: "$", suffix: "B", label: t("stats.economicLoss"), decimals: 1 },
        { value: 32, suffix: "%", label: t("stats.postHarvestLoss"), decimals: 0 },
        { value: 160, suffix: "M+", label: t("stats.peopleAffected"), decimals: 0 },
    ]

    const features = [
        { icon: CloudSun, title: t("features.weather.title"), description: t("features.weather.desc") },
        { icon: MessageCircle, title: t("features.chatbot.title"), description: t("features.chatbot.desc") },
        { icon: Warehouse, title: t("features.storage.title"), description: t("features.storage.desc") },
        { icon: Truck, title: t("features.supply.title"), description: t("features.supply.desc") },
        { icon: BookOpen, title: t("features.education.title"), description: t("features.education.desc") },
        { icon: Users, title: t("features.community.title"), description: t("features.community.desc") },
    ]

    const testimonials = [
        {
            quote:
                language === "bn"
                    ? "হার্ভেস্ট-গার্ড আমার ফসল কাটার পরের ক্ষতি ৪০% কমাতে সাহায্য করেছে। আবহাওয়া সতর্কতা অমূল্য।"
                    : "Harvest-Guard helped me reduce my post-harvest losses by 40%. The weather alerts are invaluable.",
            name: language === "bn" ? "আব্দুল করিম" : "Abdul Karim",
            role: language === "bn" ? "ধান চাষী, রংপুর" : "Rice Farmer, Rangpur",
        },
        {
            quote:
                language === "bn"
                    ? "এআই চ্যাটবট আমাকে তাৎক্ষণিক পরামর্শ দিয়েছে যখন আমি আমার সংরক্ষিত শস্যে ছত্রাক দেখেছি। এটি আমার পুরো ফসল বাঁচিয়েছে।"
                    : "The AI chatbot gave me instant advice when I noticed mold on my stored grains. It saved my entire harvest.",
            name: language === "bn" ? "ফাতেমা বেগম" : "Fatima Begum",
            role: language === "bn" ? "গম চাষী, রাজশাহী" : "Wheat Farmer, Rajshahi",
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
            <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 min-h-[90vh] flex items-center">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/placeholder.svg?height=1080&width=1920"
                        alt="Bangladesh rice paddy field"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 via-emerald-800/90 to-emerald-900/80" />
                </div>

                {/* Decorative elements */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl animate-breathing" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-breathing" style={{ animationDelay: "2s" }} />

                <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="max-w-2xl">
                            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2 text-sm font-medium text-amber-300 backdrop-blur-sm border border-amber-400/20">
                                <Shield className="h-4 w-4" />
                                {t("hero.badge")}
                            </span>
                            <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                {t("hero.title1")}
                                <br />
                                <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                    {t("hero.title2")}
                                </span>
                            </h1>
                            <p className="mt-6 max-w-xl text-lg leading-relaxed text-emerald-100/90">{t("hero.description")}</p>
                            <div className="mt-10 flex flex-wrap gap-4">
                                <Link to="/farmers">
                                    <Button
                                        size="lg"
                                        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/30 text-base px-8"
                                    >
                                        {t("hero.getStarted")}
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link to="/about">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm text-base px-8"
                                    >
                                        <Play className="mr-2 h-4 w-4" />
                                        {t("hero.learnMore")}
                                    </Button>
                                </Link>
                            </div>

                            {/* Trust badges */}
                            <div className="mt-12 flex items-center gap-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="h-10 w-10 rounded-full border-2 border-emerald-800 overflow-hidden">
                                            <Image
                                                src={`/placeholder.svg?height=40&width=40&query=bangladeshi farmer portrait ${i}`}
                                                alt="Farmer"
                                                width={40}
                                                height={40}
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-emerald-100/80 text-sm">
                                    <span className="text-amber-400 font-semibold">10,000+</span>{" "}
                                    {language === "bn" ? "কৃষক যুক্ত হয়েছেন" : "farmers joined"}
                                </div>
                            </div>
                        </div>

                        {/* Hero Image Card */}
                        <div className="relative hidden lg:block">
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl animate-breathing">
                                <Image
                                    src="/img/CropsProtected.avif"
                                    alt="Bangladeshi farmer harvesting crops"
                                    width={500}
                                    height={600}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-breathing-glow">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                                                <Leaf className="h-6 w-6 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-emerald-900">
                                                    {language === "bn" ? "ফসল সুরক্ষিত" : "Crops Protected"}
                                                </p>
                                                <p className="text-sm text-gray-600">2.5M+ {language === "bn" ? "টন" : "tonnes"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative -mt-12 z-10 mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl">
                <div className="rounded-3xl bg-white shadow-2xl shadow-emerald-900/10 border border-emerald-100 p-8 animate-breathing">

                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="font-serif text-3xl font-bold text-emerald-700 sm:text-4xl lg:text-5xl">
                                    <AnimatedCounter
                                        end={stat.value}
                                        suffix={stat.suffix}
                                        prefix={stat.prefix}
                                        decimals={stat.decimals}
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Problem Preview */}
            <section className="bg-gradient-to-b from-white to-emerald-50/50 py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        <div>
                            <SectionHeader
                                label={t("problem.label")}
                                title={t("problem.title")}
                                description={t("problem.description")}
                            />
                            <ul className="mt-8 space-y-4">
                                {[t("problem.point1"), t("problem.point2"), t("problem.point3"), t("problem.point4")].map(
                                    (item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100">
                                                <CheckCircle className="h-4 w-4 text-amber-600" />
                                            </div>
                                            <span className="text-gray-600">{item}</span>
                                        </li>
                                    ),
                                )}
                            </ul>
                            <Link to="/problem" className="mt-8 inline-block">
                                <Button
                                    variant="outline"
                                    className="border-emerald-600/30 text-emerald-700 hover:bg-emerald-50 bg-transparent"
                                >
                                    {t("problem.learnMore")}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl animate-breathing">
                                <Image
                                    src="/placeholder.svg?height=600&width=800"
                                    alt="Food storage in Bangladesh"
                                    width={800}
                                    height={600}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-5 shadow-xl border border-emerald-100 animate-breathing-glow">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
                                        <TrendingDown className="h-7 w-7 text-red-600" />
                                    </div>
                                    <div>
                                        <p className="font-serif text-3xl font-bold text-emerald-900">32%</p>
                                        <p className="text-sm text-gray-600">{t("stats.postHarvestLoss")}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Additional floating card */}
                            <div className="absolute -top-4 -right-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-4 shadow-xl text-white animate-breathing-glow" style={{ animationDelay: "1s" }}>
                                <p className="text-2xl font-bold">$1.5B</p>
                                <p className="text-xs opacity-90">{language === "bn" ? "বার্ষিক ক্ষতি" : "Annual Loss"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        label={t("features.label")}
                        title={t("features.title")}
                        description={t("features.description")}
                        centered
                    />
                    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} {...feature} />
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Link to="/approach">
                            <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 shadow-lg shadow-emerald-500/25 px-8">
                                {t("features.explore")}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Dashboard Preview */}
            <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 py-24 lg:py-32">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <Image src="/placeholder.svg?height=800&width=1600" alt="" fill className="object-cover" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <SectionHeader
                                label={t("dashboard.label")}
                                title={t("dashboard.title")}
                                description={t("dashboard.description")}
                                light
                            />
                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {[t("dashboard.weather"), t("dashboard.crop"), t("dashboard.market"), t("dashboard.storage")].map(
                                    (item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-sm px-4 py-3 border border-white/10"
                                        >
                                            <CheckCircle className="h-5 w-5 text-amber-400" />
                                            <span className="text-sm text-white">{item}</span>
                                        </div>
                                    ),
                                )}
                            </div>
                            <Link to="/dashboard" className="mt-8 inline-block">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/30"
                                >
                                    {t("dashboard.tryDemo")}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm shadow-2xl animate-breathing">
                                <Image
                                    src="/placeholder.svg?height=500&width=700"
                                    alt="Dashboard preview"
                                    width={700}
                                    height={500}
                                    className="rounded-2xl"
                                />
                            </div>
                            {/* Floating notification */}
                            <div className="absolute -top-4 -right-4 rounded-2xl bg-white p-4 shadow-xl animate-breathing-glow" style={{ animationDelay: "1s" }}>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
                                        <CloudSun className="h-5 w-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">{language === "bn" ? "আবহাওয়া সতর্কতা" : "Weather Alert"}</p>
                                        <p className="text-sm font-semibold text-emerald-900">
                                            {language === "bn" ? "আগামীকাল বৃষ্টি" : "Rain Tomorrow"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-gradient-to-b from-emerald-50/50 to-white py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeader label={t("testimonials.label")} title={t("testimonials.title")} centered />
                    <div className="mt-16 grid gap-8 md:grid-cols-2">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-lg hover:shadow-xl transition-shadow animate-breathing"
                                style={{ animationDelay: `${index * 0.3}s` }}
                            >
                                <div className="flex gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="h-5 w-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <blockquote className="font-serif text-xl leading-relaxed text-emerald-900">
                                    "{testimonial.quote}"
                                </blockquote>
                                <div className="mt-6 flex items-center gap-4">
                                    <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-emerald-100">
                                        <Image
                                            src={`/placeholder.svg?height=56&width=56&query=bangladeshi farmer portrait ${index === 0 ? "male elderly" : "female middle aged"} smiling`}
                                            alt={testimonial.name}
                                            width={56}
                                            height={56}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-emerald-900">{testimonial.name}</p>
                                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 py-24">
                <div className="absolute inset-0 opacity-20">
                    <Image src="/placeholder.svg?height=400&width=1600" alt="" fill className="object-cover" />
                </div>
                <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance">
                        {t("cta.title")}
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">{t("cta.description")}</p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Link to="/farmers">
                            <Button size="lg" className="bg-emerald-700 text-white hover:bg-emerald-800 shadow-lg px-8 text-base">
                                {t("cta.farmer")}
                            </Button>
                        </Link>
                        <Link to="/public">
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm px-8 text-base"
                            >
                                {t("cta.help")}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
