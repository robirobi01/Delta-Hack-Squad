
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { WeatherWidget } from "@/components/weather-widget"
import { TipsCard } from "@/components/tips-card"
import { AlertsCard } from "@/components/alerts-card"
import { MarketPricesCard } from "@/components/market-prices-card"
import { useLanguage } from "@/lib/language-context"
import { User, MessageCircle, BookOpen, ArrowRight, Warehouse, Phone, Plus, Pencil, Trash2, LogOut, Download } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { doc, getDoc, collection, addDoc, query, where, getDocs, deleteDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface CropBatch {
    id: string
    cropType: string
    estimatedWeight: string
    harvestDate: string
    division: string
    district: string
    storageType: string
}

export default function DashboardPage() {
    const { language } = useLanguage()
    const isEn = language === "en"
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const [userData, setUserData] = useState<any>(null)

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const docRef = doc(db, "users", user.uid)
                    const docSnap = await getDoc(docRef)
                    if (docSnap.exists()) {
                        setUserData(docSnap.data())
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error)
                }
            }
        }
        fetchUserData()
    }, [user])

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }

    // Crop Registration State
    const [showAddCrop, setShowAddCrop] = useState(false)
    const [editingCropId, setEditingCropId] = useState<string | null>(null)
    const [cropData, setCropData] = useState({
        cropType: "Paddy/Rice",
        estimatedWeight: "",
        harvestDate: "",
        division: "",
        district: "",
        storageType: ""
    })
    const [registeredCrops, setRegisteredCrops] = useState<CropBatch[]>([])

    // Fetch crops from Firestore
    useEffect(() => {
        const fetchCrops = async () => {
            if (user) {
                try {
                    const q = query(collection(db, "crops"), where("userId", "==", user.uid))
                    const querySnapshot = await getDocs(q)
                    const crops: CropBatch[] = []
                    querySnapshot.forEach((doc) => {
                        crops.push({ id: doc.id, ...doc.data() } as CropBatch)
                    })
                    setRegisteredCrops(crops)
                } catch (error) {
                    console.error("Error fetching crops:", error)
                }
            }
        }
        fetchCrops()
    }, [user])

    // Bangladesh Divisions and Districts
    const divisions = [
        { en: "Dhaka", bn: "ঢাকা" },
        { en: "Chittagong", bn: "চট্টগ্রাম" },
        { en: "Rajshahi", bn: "রাজশাহী" },
        { en: "Khulna", bn: "খুলনা" },
        { en: "Barisal", bn: "বরিশাল" },
        { en: "Sylhet", bn: "সিলেট" },
        { en: "Rangpur", bn: "রংপুর" },
        { en: "Mymensingh", bn: "ময়মনসিংহ" }
    ]

    const districtsByDivision: Record<string, { en: string; bn: string }[]> = {
        "Dhaka": [{ en: "Dhaka", bn: "ঢাকা" }, { en: "Gazipur", bn: "গাজীপুর" }, { en: "Narayanganj", bn: "নারায়ণগঞ্জ" }],
        "Chittagong": [{ en: "Chittagong", bn: "চট্টগ্রাম" }, { en: "Cox's Bazar", bn: "কক্সবাজার" }, { en: "Comilla", bn: "কুমিল্লা" }],
        "Rajshahi": [{ en: "Rajshahi", bn: "রাজশাহী" }, { en: "Bogra", bn: "বগুড়া" }, { en: "Pabna", bn: "পাবনা" }],
        "Khulna": [{ en: "Khulna", bn: "খুলনা" }, { en: "Jessore", bn: "যশোর" }, { en: "Satkhira", bn: "সাতক্ষীরা" }],
        "Barisal": [{ en: "Barisal", bn: "বরিশাল" }, { en: "Patuakhali", bn: "পটুয়াখালী" }, { en: "Bhola", bn: "ভোলা" }],
        "Sylhet": [{ en: "Sylhet", bn: "সিলেট" }, { en: "Moulvibazar", bn: "মৌলভীবাজার" }, { en: "Habiganj", bn: "হবিগঞ্জ" }],
        "Rangpur": [{ en: "Rangpur", bn: "রংপুর" }, { en: "Dinajpur", bn: "দিনাজপুর" }, { en: "Kurigram", bn: "কুড়িগ্রাম" }],
        "Mymensingh": [{ en: "Mymensingh", bn: "ময়মনসিংহ" }, { en: "Jamalpur", bn: "জামালপুর" }, { en: "Netrokona", bn: "নেত্রকোনা" }]
    }

    const storageTypes = [
        { en: "Jute Bag Stack", bn: "পাটের বস্তা স্তুপ" },
        { en: "Silo", bn: "সাইলো" },
        { en: "Open Area", bn: "খোলা জায়গা" },
        { en: "Warehouse", bn: "গুদাম" }
    ]

    const handleCropSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (cropData.cropType && cropData.estimatedWeight && cropData.harvestDate &&
            cropData.division && cropData.district && cropData.storageType && user) {

            try {
                if (editingCropId !== null) {
                    // Update existing crop
                    const cropRef = doc(db, "crops", editingCropId)
                    await updateDoc(cropRef, { ...cropData })
                    setRegisteredCrops(registeredCrops.map(crop =>
                        crop.id === editingCropId ? { ...cropData, id: editingCropId } : crop
                    ))
                    setEditingCropId(null)
                } else {
                    // Add new crop
                    const docRef = await addDoc(collection(db, "crops"), {
                        userId: user.uid,
                        ...cropData,
                        createdAt: new Date().toISOString()
                    })
                    setRegisteredCrops([...registeredCrops, { ...cropData, id: docRef.id }])
                }

                setCropData({
                    cropType: "Paddy/Rice",
                    estimatedWeight: "",
                    harvestDate: "",
                    division: "",
                    district: "",
                    storageType: ""
                })
                setShowAddCrop(false)
            } catch (error) {
                console.error("Error saving crop:", error)
                alert(isEn ? "Failed to save crop" : "ফসল সংরক্ষণ করতে ব্যর্থ হয়েছে")
            }
        }
    }

    const handleEditCrop = (crop: CropBatch) => {
        setCropData({
            cropType: crop.cropType,
            estimatedWeight: crop.estimatedWeight,
            harvestDate: crop.harvestDate,
            division: crop.division,
            district: crop.district,
            storageType: crop.storageType
        })
        setEditingCropId(crop.id)
        setShowAddCrop(true)
    }

    const handleDeleteCrop = async (cropId: string) => {
        if (confirm(isEn ? "Are you sure you want to delete this crop batch?" : "আপনি কি এই ফসলের ব্যাচ মুছে ফেলতে চান?")) {
            try {
                await deleteDoc(doc(db, "crops", cropId))
                setRegisteredCrops(registeredCrops.filter(crop => crop.id !== cropId))
            } catch (error) {
                console.error("Error deleting crop:", error)
                alert(isEn ? "Failed to delete crop" : "ফসল মুছতে ব্যর্থ হয়েছে")
            }
        }
    }

    const handleCancelEdit = () => {
        setCropData({
            cropType: "Paddy/Rice",
            estimatedWeight: "",
            harvestDate: "",
            division: "",
            district: "",
            storageType: ""
        })
        setEditingCropId(null)
        setShowAddCrop(false)
    }

    const quickActions = [
        {
            icon: MessageCircle,
            titleEn: "AI Chatbot",
            titleBn: "এআই চ্যাটবট",
            descEn: "Get instant advice",
            descBn: "তাত্ক্ষণিক পরামর্শ পান",
            href: "/chatbot",
            color: "bg-amber-500",
        },
        {
            icon: Warehouse,
            titleEn: "Storage Guide",
            titleBn: "সংরক্ষণ গাইড",
            descEn: "Best practices",
            descBn: "সর্বোত্তম অনুশীলন",
            href: "#",
            color: "bg-emerald-600",
        },
        {
            icon: BookOpen,
            titleEn: "Resources",
            titleBn: "সংস্থান",
            descEn: "Training materials",
            descBn: "প্রশিক্ষণ সামগ্রী",
            href: "#",
            color: "bg-emerald-500",
        },
        {
            icon: Phone,
            titleEn: "Helpline",
            titleBn: "হেল্পলাইন",
            descEn: "Expert support",
            descBn: "বিশেষজ্ঞ সহায়তা",
            href: "/contact",
            color: "bg-emerald-700",
        },
    ]

    return (
        <div className="min-h-screen bg-emerald-50">
            {/* Dashboard Header */}
            <div className="border-b border-emerald-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 shadow-lg">
                                <User className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{isEn ? "Welcome back," : "স্বাগতম,"}</p>
                                <h1 className="font-serif text-2xl font-bold text-emerald-800">
                                    {userData ? userData.name : (isEn ? "Loading..." : "লোড হচ্ছে...")}
                                </h1>
                                <p className="text-sm text-gray-500">
                                    {userData
                                        ? `${userData.division} • ${userData.area}`
                                        : (isEn ? "Loading location..." : "অবস্থান লোড হচ্ছে...")
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link to="/chatbot">
                                <Button className="bg-amber-500 text-white hover:bg-amber-600">
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    {isEn ? "Ask AI Assistant" : "এআই সহকারীকে জিজ্ঞাসা করুন"}
                                </Button>
                            </Link>
                            <Button variant="outline" size="icon" className="border-emerald-200 bg-transparent" onClick={handleLogout} title={isEn ? "Logout" : "লগআউট"}>
                                <LogOut className="h-4 w-4 text-gray-500" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo Banner */}
            <div className="bg-emerald-700 px-4 py-3 text-center">
                <p className="text-sm text-white">
                    <span className="font-semibold">{isEn ? "Demo Mode:" : "ডেমো মোড:"}</span>{" "}
                    {isEn ? "This is a preview of the farmer dashboard." : "এটি কৃষক ড্যাশবোর্ডের একটি প্রিভিউ।"}{" "}
                    <Link to="/login" className="underline hover:text-amber-300">
                        {isEn ? "Register for free" : "বিনামূল্যে নিবন্ধন করুন"}
                    </Link>{" "}
                    {isEn ? "to access personalized data." : "ব্যক্তিগত ডেটা অ্যাক্সেস করতে।"}
                </p>
            </div>

            {/* Dashboard Content */}
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Quick Actions */}
                <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {quickActions.map((action, index) => (
                        <Link
                            key={index}
                            to={action.href}
                            className="group flex items-center gap-4 rounded-xl border border-emerald-100 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                        >
                            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${action.color}`}>
                                <action.icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-medium text-emerald-800 group-hover:text-amber-600">
                                    {isEn ? action.titleEn : action.titleBn}
                                </h3>
                                <p className="text-xs text-gray-500">{isEn ? action.descEn : action.descBn}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column - Weather */}
                    <div className="lg:col-span-2">
                        <WeatherWidget />
                    </div>

                    {/* Right Column - Alerts */}
                    <div>
                        <AlertsCard />
                    </div>

                    {/* Tips */}
                    <div>
                        <TipsCard />
                    </div>

                    {/* Crop Registration */}
                    <div className="lg:col-span-2 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-serif text-lg font-semibold text-emerald-800">
                                {isEn ? "My Crop Batches" : "আমার ফসলের ব্যাচ"}
                            </h3>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => {
                                        const headers = ['ID', 'Crop Type', 'Weight (kg)', 'Harvest Date', 'Division', 'District', 'Storage Type']
                                        const rows = registeredCrops.map(crop => [
                                            crop.id,
                                            crop.cropType,
                                            crop.estimatedWeight,
                                            crop.harvestDate,
                                            crop.division,
                                            crop.district,
                                            crop.storageType
                                        ])

                                        const csvContent = [
                                            headers.join(','),
                                            ...rows.map(row => row.join(','))
                                        ].join('\n')

                                        const blob = new Blob([csvContent], { type: 'text/csv' })
                                        const url = URL.createObjectURL(blob)
                                        const a = document.createElement('a')
                                        a.href = url
                                        a.download = `harvest-guard-crops-${new Date().toISOString().split('T')[0]}.csv`
                                        a.click()
                                        URL.revokeObjectURL(url)
                                    }}
                                    size="sm"
                                    variant="outline"
                                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                >
                                    <Download className="h-4 w-4 mr-1" />
                                    CSV
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (!showAddCrop) {
                                            setEditingCropId(null)
                                            setCropData({
                                                cropType: "Paddy/Rice",
                                                estimatedWeight: "",
                                                harvestDate: "",
                                                division: "",
                                                district: "",
                                                storageType: ""
                                            })
                                        }
                                        setShowAddCrop(!showAddCrop)
                                    }}
                                    size="sm"
                                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                                >
                                    <Plus className="h-4 w-4 mr-1" />
                                    {isEn ? "Add Crop" : "ফসল যোগ করুন"}
                                </Button>
                            </div>
                        </div>

                        {showAddCrop && (
                            <form onSubmit={handleCropSubmit} className="mb-6 rounded-xl bg-emerald-50 p-4 space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {isEn ? "Crop Type" : "ফসলের ধরন"}
                                        </label>
                                        <select
                                            value={cropData.cropType}
                                            onChange={(e) => setCropData({ ...cropData, cropType: e.target.value })}
                                            className="w-full rounded-lg border border-emerald-200 px-3 py-2 focus:border-emerald-500 focus:outline-none"
                                            required
                                        >
                                            <option value="Paddy/Rice">{isEn ? "Paddy/Rice" : "ধান/চাল"}</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {isEn ? "Estimated Weight (kg)" : "আনুমানিক ওজন (কেজি)"}
                                        </label>
                                        <input
                                            type="number"
                                            value={cropData.estimatedWeight}
                                            onChange={(e) => setCropData({ ...cropData, estimatedWeight: e.target.value })}
                                            className="w-full rounded-lg border border-emerald-200 px-3 py-2 focus:border-emerald-500 focus:outline-none"
                                            placeholder={isEn ? "Enter weight" : "ওজন লিখুন"}
                                            required
                                            min="1"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {isEn ? "Harvest Date" : "ফসল কাটার তারিখ"}
                                        </label>
                                        <input
                                            type="date"
                                            value={cropData.harvestDate}
                                            onChange={(e) => setCropData({ ...cropData, harvestDate: e.target.value })}
                                            className="w-full rounded-lg border border-emerald-200 px-3 py-2 focus:border-emerald-500 focus:outline-none"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {isEn ? "Division" : "বিভাগ"}
                                        </label>
                                        <select
                                            value={cropData.division}
                                            onChange={(e) => {
                                                setCropData({ ...cropData, division: e.target.value, district: "" })
                                            }}
                                            className="w-full rounded-lg border border-emerald-200 px-3 py-2 focus:border-emerald-500 focus:outline-none"
                                            required
                                        >
                                            <option value="">{isEn ? "Select Division" : "বিভাগ নির্বাচন করুন"}</option>
                                            {divisions.map((div) => (
                                                <option key={div.en} value={div.en}>
                                                    {isEn ? div.en : div.bn}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {isEn ? "District" : "জেলা"}
                                        </label>
                                        <select
                                            value={cropData.district}
                                            onChange={(e) => setCropData({ ...cropData, district: e.target.value })}
                                            className="w-full rounded-lg border border-emerald-200 px-3 py-2 focus:border-emerald-500 focus:outline-none"
                                            required
                                            disabled={!cropData.division}
                                        >
                                            <option value="">{isEn ? "Select District" : "জেলা নির্বাচন করুন"}</option>
                                            {cropData.division && districtsByDivision[cropData.division]?.map((dist) => (
                                                <option key={dist.en} value={dist.en}>
                                                    {isEn ? dist.en : dist.bn}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {isEn ? "Storage Type" : "সংরক্ষণের ধরন"}
                                        </label>
                                        <select
                                            value={cropData.storageType}
                                            onChange={(e) => setCropData({ ...cropData, storageType: e.target.value })}
                                            className="w-full rounded-lg border border-emerald-200 px-3 py-2 focus:border-emerald-500 focus:outline-none"
                                            required
                                        >
                                            <option value="">{isEn ? "Select Storage Type" : "সংরক্ষণের ধরন নির্বাচন করুন"}</option>
                                            {storageTypes.map((type) => (
                                                <option key={type.en} value={type.en}>
                                                    {isEn ? type.en : type.bn}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-2 justify-end">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleCancelEdit}
                                        className="border-emerald-200"
                                    >
                                        {isEn ? "Cancel" : "বাতিল"}
                                    </Button>
                                    <Button type="submit" className="bg-emerald-600 text-white hover:bg-emerald-700">
                                        {editingCropId !== null
                                            ? (isEn ? "Update Batch" : "ব্যাচ আপডেট করুন")
                                            : (isEn ? "Register Batch" : "ব্যাচ নিবন্ধন করুন")
                                        }
                                    </Button>
                                </div>
                            </form>
                        )}

                        {/* Registered Crops List */}
                        {registeredCrops.length > 0 ? (
                            <div className="space-y-3">
                                {registeredCrops.map((crop) => (
                                    <div key={crop.id} className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="inline-block rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium text-white">
                                                        {crop.cropType}
                                                    </span>
                                                    <span className="text-sm font-semibold text-emerald-800">
                                                        {crop.estimatedWeight} kg
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                                    <div>
                                                        <span className="font-medium">{isEn ? "Harvested:" : "ফসল কাটা:"}</span> {crop.harvestDate}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">{isEn ? "Location:" : "অবস্থান:"}</span> {crop.district}, {crop.division}
                                                    </div>
                                                    <div className="col-span-2">
                                                        <span className="font-medium">{isEn ? "Storage:" : "সংরক্ষণ:"}</span> {crop.storageType}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 ml-4">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleEditCrop(crop)}
                                                    className="border-emerald-200 hover:bg-emerald-50"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleDeleteCrop(crop.id)}
                                                    className="border-red-200 hover:bg-red-50 text-red-600"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <Warehouse className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                                <p className="text-sm">
                                    {isEn ? "No crop batches registered yet. Click '+ Add Crop' to get started." : "এখনও কোনো ফসলের ব্যাচ নিবন্ধিত হয়নি। শুরু করতে '+ ফসল যোগ করুন' ক্লিক করুন।"}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Market Prices */}
                    <div>
                        <MarketPricesCard />
                    </div>

                    {/* Storage Status (Mock) */}
                    <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 font-serif text-lg font-semibold text-emerald-800">
                            {isEn ? "My Storage Status" : "আমার সংরক্ষণ অবস্থা"}
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="mb-2 flex items-center justify-between text-sm">
                                    <span className="text-gray-600">{isEn ? "Rice Storage" : "ধান সংরক্ষণ"}</span>
                                    <span className="font-medium text-emerald-700">75% {isEn ? "full" : "পূর্ণ"}</span>
                                </div>
                                <div className="h-3 overflow-hidden rounded-full bg-emerald-100">
                                    <div className="h-full w-3/4 rounded-full bg-emerald-600" />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">~450 kg {isEn ? "stored" : "সংরক্ষিত"}</p>
                            </div>
                            <div>
                                <div className="mb-2 flex items-center justify-between text-sm">
                                    <span className="text-gray-600">{isEn ? "Wheat Storage" : "গম সংরক্ষণ"}</span>
                                    <span className="font-medium text-emerald-700">30% {isEn ? "full" : "পূর্ণ"}</span>
                                </div>
                                <div className="h-3 overflow-hidden rounded-full bg-emerald-100">
                                    <div className="h-full w-[30%] rounded-full bg-amber-500" />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">~120 kg {isEn ? "stored" : "সংরক্ষিত"}</p>
                            </div>
                            <div className="rounded-lg bg-emerald-50 p-3">
                                <p className="text-xs text-gray-600">
                                    <strong className="text-emerald-700">{isEn ? "Tip:" : "টিপ:"}</strong>{" "}
                                    {isEn
                                        ? "Check moisture levels weekly. Current conditions are good for storage."
                                        : "সাপ্তাহিক আর্দ্রতা স্তর পরীক্ষা করুন। বর্তমান অবস্থা সংরক্ষণের জন্য ভাল।"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 p-8 text-center shadow-lg">
                    <h2 className="font-serif text-2xl font-bold text-white">
                        {isEn ? "Need Personalized Advice?" : "ব্যক্তিগত পরামর্শ প্রয়োজন?"}
                    </h2>
                    <p className="mx-auto mt-2 max-w-xl text-white/80">
                        {isEn
                            ? "Our AI chatbot can help you with specific questions about your crops, storage, and post-harvest management."
                            : "আমাদের এআই চ্যাটবট আপনার ফসল, সংরক্ষণ এবং ফসল পরবর্তী ব্যবস্থাপনা সম্পর্কে নির্দিষ্ট প্রশ্নে আপনাকে সাহায্য করতে পারে।"}
                    </p>
                    <Link to="/chatbot" className="mt-6 inline-block">
                        <Button size="lg" className="bg-amber-500 text-white hover:bg-amber-600">
                            {isEn ? "Chat with AI Assistant" : "এআই সহকারীর সাথে চ্যাট করুন"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
