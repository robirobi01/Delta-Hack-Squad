
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import { Warehouse, Thermometer, Wind, AlertTriangle, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

interface StorageAdvice {
    crop: string;
    temp: string;
    humidity: string;
    maxDuration: string;
    tips: string[];
}

const STORAGE_DATA: Record<string, StorageAdvice> = {
    "Potato": {
        crop: "Potato",
        temp: "7-10°C",
        humidity: "85-90%",
        maxDuration: "6-8 months",
        tips: [
            "Store in a dark, well-ventilated area.",
            "Avoid storing with onions or apples (releases ethylene).",
            "Cure potatoes before storage to heal skin injuries.",
            "Check regularly for soft spots or sprouts."
        ]
    },
    "Rice": {
        crop: "Rice",
        temp: "< 25°C",
        humidity: "< 14%",
        maxDuration: "12+ months",
        tips: [
            "Dry thoroughly before storage (moisture < 14%).",
            "Use hermetic bags or silos to prevent pest infestation.",
            "Keep storage area clean and dry.",
            "Elevate bags on pallets to avoid ground moisture."
        ]
    },
    "Wheat": {
        crop: "Wheat",
        temp: "< 20°C",
        humidity: "< 12%",
        maxDuration: "12+ months",
        tips: [
            "Ensure grain is dry and cool before binning.",
            "Monitor for weevils and other pests.",
            "Aerate bins regularly to maintain uniform temperature.",
            "Protect from rodents and birds."
        ]
    },
    "Corn": {
        crop: "Corn",
        temp: "< 15°C",
        humidity: "< 13%",
        maxDuration: "6-12 months",
        tips: [
            "Dry to 13-14% moisture for long-term storage.",
            "Screen out fines to improve airflow.",
            "Check for mold or hot spots frequently.",
            "Use insect-resistant packaging if possible."
        ]
    },
    "Onion": {
        crop: "Onion",
        temp: "0-4°C",
        humidity: "65-70%",
        maxDuration: "6-8 months",
        tips: [
            "Cure onions until necks are tight and dry.",
            "Store in mesh bags or crates for airflow.",
            "Keep dry; high humidity causes rot.",
            "Do not store with potatoes."
        ]
    },
    // Fallback for others
    "Default": {
        crop: "General Crop",
        temp: "Cool & Dry",
        humidity: "Low",
        maxDuration: "Varies",
        tips: [
            "Keep storage area clean and pest-free.",
            "Ensure good ventilation.",
            "Protect from direct sunlight and moisture.",
            "Inspect regularly for spoilage."
        ]
    }
};

export default function StorageGuidePage() {
    const { language } = useLanguage()
    const isEn = language === "en"
    const { user } = useAuth()
    const [userCrops, setUserCrops] = useState<string[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserCrops = async () => {
            if (user) {
                try {
                    const q = query(collection(db, "crops"), where("userId", "==", user.uid))
                    const querySnapshot = await getDocs(q)
                    const crops = new Set<string>()
                    querySnapshot.forEach((doc) => {
                        const data = doc.data()
                        // Map localized names or IDs to English keys if needed
                        // Assuming cropType is stored as English ID like "Potato", "Rice"
                        crops.add(data.cropType)
                    })
                    setUserCrops(Array.from(crops))
                } catch (error) {
                    console.error("Error fetching crops:", error)
                } finally {
                    setLoading(false)
                }
            }
        }
        fetchUserCrops()
    }, [user])

    return (
        <div className="min-h-screen bg-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link to="/dashboard">
                        <Button variant="ghost" className="pl-0 hover:bg-transparent text-emerald-700 hover:text-emerald-800">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {isEn ? "Back to Dashboard" : "ড্যাশবোর্ডে ফিরে যান"}
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-serif font-bold text-emerald-900 mt-4">
                        {isEn ? "Smart Storage Guide" : "স্মার্ট সংরক্ষণ গাইড"}
                    </h1>
                    <p className="text-emerald-700 mt-2">
                        {isEn
                            ? "Personalized storage advice based on your registered crops."
                            : "আপনার নিবন্ধিত ফসলের উপর ভিত্তি করে ব্যক্তিগতকৃত সংরক্ষণ পরামর্শ।"}
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-600 border-r-transparent"></div>
                    </div>
                ) : userCrops.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2">
                        {userCrops.map((cropName) => {
                            // Simple normalization to match keys
                            const key = Object.keys(STORAGE_DATA).find(k => cropName.includes(k)) || "Default";
                            const data = STORAGE_DATA[key];

                            return (
                                <div key={cropName} className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
                                    <div className="bg-emerald-600 px-6 py-4">
                                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                            <Warehouse className="h-5 w-5" />
                                            {cropName}
                                        </h3>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div className="bg-blue-50 p-3 rounded-lg">
                                                <Thermometer className="h-5 w-5 mx-auto text-blue-600 mb-1" />
                                                <p className="text-xs text-gray-500">{isEn ? "Temp" : "তাপমাত্রা"}</p>
                                                <p className="font-semibold text-blue-900">{data.temp}</p>
                                            </div>
                                            <div className="bg-cyan-50 p-3 rounded-lg">
                                                <Wind className="h-5 w-5 mx-auto text-cyan-600 mb-1" />
                                                <p className="text-xs text-gray-500">{isEn ? "Humidity" : "আর্দ্রতা"}</p>
                                                <p className="font-semibold text-cyan-900">{data.humidity}</p>
                                            </div>
                                            <div className="bg-amber-50 p-3 rounded-lg">
                                                <AlertTriangle className="h-5 w-5 mx-auto text-amber-600 mb-1" />
                                                <p className="text-xs text-gray-500">{isEn ? "Max Time" : "সর্বোচ্চ সময়"}</p>
                                                <p className="font-semibold text-amber-900">{data.maxDuration}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                {isEn ? "Best Practices" : "সর্বোত্তম অনুশীলন"}
                                            </h4>
                                            <ul className="space-y-2">
                                                {data.tips.map((tip, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                                                        {tip}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center bg-white p-12 rounded-xl border border-dashed border-gray-300">
                        <Warehouse className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">
                            {isEn ? "No crops registered" : "কোনো ফসল নিবন্ধিত নেই"}
                        </h3>
                        <p className="text-gray-500 mt-2 mb-6">
                            {isEn
                                ? "Register your crops in the Dashboard to get personalized storage advice."
                                : "ব্যক্তিগতকৃত সংরক্ষণ পরামর্শ পেতে ড্যাশবোর্ডে আপনার ফসল নিবন্ধন করুন।"}
                        </p>
                        <Link to="/dashboard">
                            <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                                {isEn ? "Go to Dashboard" : "ড্যাশবোর্ডে যান"}
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
