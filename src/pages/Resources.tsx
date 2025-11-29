
import { useLanguage } from "@/lib/language-context"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, ExternalLink, Video, FileText, Globe } from "lucide-react"

export default function ResourcesPage() {
    const { language } = useLanguage()
    const isEn = language === "en"

    const resources = [
        {
            category: isEn ? "Official Portals" : "অফিসিয়াল পোর্টাল",
            items: [
                {
                    title: isEn ? "Bangladesh Agrometeorological Information System (BAMIS)" : "বাংলাদেশ কৃষি আবহাওয়া তথ্য পদ্ধতি (বামিস)",
                    desc: isEn ? "Real-time weather and crop advisories." : "রিয়েল-টাইম আবহাওয়া এবং ফসল পরামর্শ।",
                    link: "https://www.bamis.gov.bd/",
                    icon: Globe
                },
                {
                    title: isEn ? "Agriculture Information Service (AIS)" : "কৃষি তথ্য সার্ভিস (এআইএস)",
                    desc: isEn ? "Official government source for agricultural news and tech." : "কৃষি সংবাদ এবং প্রযুক্তির জন্য সরকারি উৎস।",
                    link: "http://www.ais.gov.bd/",
                    icon: Globe
                },
                {
                    title: isEn ? "Department of Agricultural Extension" : "কৃষি সম্প্রসারণ অধিদপ্তর",
                    desc: isEn ? "Field level extension services and crop info." : "মাঠ পর্যায়ের সম্প্রসারণ সেবা এবং ফসলের তথ্য।",
                    link: "http://www.dae.gov.bd/",
                    icon: Globe
                },
                {
                    title: isEn ? "Bangladesh Rice Knowledge Bank" : "বাংলাদেশ ধান জ্ঞান ব্যাংক",
                    desc: isEn ? "Comprehensive guide for rice farming." : "ধান চাষের জন্য বিস্তারিত গাইড।",
                    link: "http://knowledgebank-brri.org/",
                    icon: BookOpen
                }
            ]
        },
        {
            category: isEn ? "Farming Guides" : "চাষাবাদ গাইড",
            items: [
                {
                    title: isEn ? "Modern Potato Cultivation" : "আধুনিক আলু চাষ পদ্ধতি",
                    desc: isEn ? "Step-by-step guide for higher yield." : "উচ্চ ফলনের জন্য ধাপে ধাপে নির্দেশিকা।",
                    link: "#",
                    icon: FileText
                },
                {
                    title: isEn ? "Pest Management Handbook" : "পোকামাকড় ব্যবস্থাপনা হ্যান্ডবুক",
                    desc: isEn ? "Identify and treat common crop pests." : "সাধারণ ফসলের পোকা শনাক্ত এবং দমন করুন।",
                    link: "#",
                    icon: FileText
                }
            ]
        },
        {
            category: isEn ? "Video Tutorials" : "ভিডিও টিউটোরিয়াল",
            items: [
                {
                    title: isEn ? "Seed Preservation Techniques" : "বীজ সংরক্ষণ কৌশল",
                    desc: isEn ? "Learn how to store seeds for next season." : "পরবর্তী মৌসুমের জন্য বীজ সংরক্ষণ করতে শিখুন।",
                    link: "https://www.youtube.com/results?search_query=seed+preservation+bangladesh",
                    icon: Video
                },
                {
                    title: isEn ? "Organic Fertilizer Making" : "জৈব সার তৈরি",
                    desc: isEn ? "Make compost at home." : "বাড়িতে কম্পোস্ট তৈরি করুন।",
                    link: "https://www.youtube.com/results?search_query=organic+fertilizer+making+bangla",
                    icon: Video
                }
            ]
        }
    ]

    return (
        <div className="min-h-screen bg-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <Link to="/dashboard">
                        <Button variant="ghost" className="pl-0 hover:bg-transparent text-emerald-700 hover:text-emerald-800">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {isEn ? "Back to Dashboard" : "ড্যাশবোর্ডে ফিরে যান"}
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-serif font-bold text-emerald-900 mt-4">
                        {isEn ? "Agricultural Resources" : "কৃষি সংস্থান"}
                    </h1>
                    <p className="text-emerald-700 mt-2">
                        {isEn
                            ? "Curated list of official portals, guides, and tutorials."
                            : "অফিসিয়াল পোর্টাল, গাইড এবং টিউটোরিয়ালের তালিকা।"}
                    </p>
                </div>

                <div className="space-y-8">
                    {resources.map((section, idx) => (
                        <div key={idx}>
                            <h2 className="text-xl font-bold text-emerald-800 mb-4 pl-1 border-l-4 border-emerald-500">
                                {section.category}
                            </h2>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {section.items.map((item, itemIdx) => (
                                    <a
                                        key={itemIdx}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block bg-white rounded-xl p-5 shadow-sm border border-emerald-100 hover:shadow-md transition-all hover:border-emerald-300"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                                                <item.icon className="h-6 w-6 text-emerald-600" />
                                            </div>
                                            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-emerald-500" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700 mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 line-clamp-2">
                                            {item.desc}
                                        </p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
