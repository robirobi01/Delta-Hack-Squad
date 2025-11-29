import { LocalRiskMap } from "@/components/LocalRiskMap"
import { useLanguage } from "@/lib/language-context"
import { AlertTriangle, MapPin, Shield } from "lucide-react"

export default function LocalRiskPage() {
    const { language } = useLanguage()
    const isEn = language === 'en'

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 py-20">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('/img/bg-photo.avif')] bg-cover bg-center mix-blend-overlay"></div>
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2 text-sm font-medium text-amber-300 backdrop-blur-sm border border-amber-400/20">
                        <MapPin className="h-4 w-4" />
                        {isEn ? "Live Monitoring" : "সরাসরি পর্যবেক্ষণ"}
                    </span>
                    <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        {isEn ? "Local Risk Landscape" : "স্থানীয় ঝুঁকির মানচিত্র"}
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-emerald-100/90">
                        {isEn
                            ? "Visualize crop spoilage risks in your area. Stay informed about nearby threats and take preventive measures to protect your harvest."
                            : "আপনার এলাকার ফসলের পচনের ঝুঁকি দেখুন। নিকটবর্তী হুমকি সম্পর্কে অবগত থাকুন এবং আপনার ফসল রক্ষার জন্য প্রতিরোধমূলক ব্যবস্থা নিন।"}
                    </p>
                </div>
            </section>

            {/* Map Section */}
            <section className="flex-grow bg-white py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column: Info & Legend */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-lg">
                                <h3 className="font-serif text-xl font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-emerald-600" />
                                    {isEn ? "How it Works" : "কিভাবে কাজ করে"}
                                </h3>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex gap-3">
                                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                        </div>
                                        <span>{isEn ? "Your location is marked with a blue pin." : "আপনার অবস্থান একটি নীল পিন দিয়ে চিহ্নিত করা হয়েছে।"}</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                        </div>
                                        <span>{isEn ? "High risk areas are marked in red." : "উচ্চ ঝুঁকির এলাকা লাল রঙে চিহ্নিত।"}</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                            <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                                        </div>
                                        <span>{isEn ? "Medium risk areas are marked in orange." : "মাঝারি ঝুঁকির এলাকা কমলা রঙে চিহ্নিত।"}</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="rounded-2xl bg-amber-50 border border-amber-100 p-6">
                                <h3 className="font-serif text-lg font-semibold text-amber-900 mb-2 flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                                    {isEn ? "Risk Alert" : "ঝুঁকি সতর্কতা"}
                                </h3>
                                <p className="text-sm text-amber-800">
                                    {isEn
                                        ? "High risk of fungal infection reported in nearby rice fields due to recent humidity."
                                        : "সাম্প্রতিক আর্দ্রতার কারণে নিকটবর্তী ধান ক্ষেতে ছত্রাক সংক্রমণের উচ্চ ঝুঁকি রিপোর্ট করা হয়েছে।"}
                                </p>
                            </div>
                        </div>

                        {/* Right Column: The Map */}
                        <div className="lg:col-span-2">
                            <div className="rounded-3xl overflow-hidden shadow-2xl border border-emerald-100 h-[600px] relative z-0">
                                <LocalRiskMap />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
