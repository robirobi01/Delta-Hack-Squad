import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, GeoPoint } from 'firebase/firestore';
import { MapPin, AlertTriangle, Send, Loader2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';

export function AddRiskReport() {
    const { user } = useAuth();
    const { language } = useLanguage();
    const isEn = language === 'en';

    const [location, setLocation] = useState<GeolocationPosition | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [isLocating, setIsLocating] = useState(false);

    const [cropType, setCropType] = useState('');
    const [riskLevel, setRiskLevel] = useState<'Low' | 'Medium' | 'High' | ''>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchLocation = () => {
        setIsLocating(true);
        setLocationError(null);

        if (!navigator.geolocation) {
            setLocationError(isEn ? "Geolocation is not supported by your browser." : "আপনার ব্রাউজারে জিওলোকেশন সমর্থিত নয়।");
            setIsLocating(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation(position);
                setIsLocating(false);
            },
            (error) => {
                console.error("Error getting location:", error);
                let msg = isEn ? "Unable to retrieve your location." : "আপনার অবস্থান পুনরুদ্ধার করতে অক্ষম।";
                if (error.code === error.PERMISSION_DENIED) {
                    msg = isEn ? "Location permission denied." : "অবস্থান অনুমতি প্রত্যাখ্যান করা হয়েছে।";
                }
                setLocationError(msg);
                setIsLocating(false);
            }
        );
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        if (!location || !cropType || !riskLevel) return;

        setIsSubmitting(true);

        try {
            await addDoc(collection(db, 'risk_reports'), {
                userId: user.uid,
                cropType: cropType,
                riskLevel: riskLevel,
                location: new GeoPoint(location.coords.latitude, location.coords.longitude),
                district: "Unknown", // Placeholder as requested
                timestamp: serverTimestamp()
            });

            alert(isEn ? "Risk report submitted successfully!" : "ঝুঁকি রিপোর্ট সফলভাবে জমা দেওয়া হয়েছে!");
            setCropType('');
            setRiskLevel('');
        } catch (error: any) {
            console.error("Error submitting report:", error);
            if (error.code === 'permission-denied') {
                alert(isEn ? "Security Block: Data format incorrect or ID mismatch." : "নিরাপত্তা ব্লক: ডেটা ফর্ম্যাট ভুল বা আইডি অমিল।");
            } else {
                alert(isEn ? "Failed to submit report." : "রিপোর্ট জমা দিতে ব্যর্থ হয়েছে।");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) {
        return (
            <div className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm text-center">
                <p className="text-gray-500">
                    {isEn ? "Please log in to report risks." : "ঝুঁকি রিপোর্ট করতে অনুগ্রহ করে লগ ইন করুন।"}
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h3 className="font-serif text-lg font-semibold text-emerald-800">
                    {isEn ? "Report Local Risk" : "স্থানীয় ঝুঁকি রিপোর্ট করুন"}
                </h3>
            </div>

            {/* Location Status */}
            <div className="mb-6 rounded-lg bg-emerald-50 p-3 text-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                        {isLocating ? (
                            <span className="text-emerald-700">{isEn ? "Locating..." : "অবস্থান নির্ণয় করা হচ্ছে..."}</span>
                        ) : location ? (
                            <span className="text-emerald-700">
                                {isEn ? "Location detected" : "অবস্থান শনাক্ত হয়েছে"}
                                <span className="text-xs text-emerald-500 ml-1">
                                    ({location.coords.latitude.toFixed(4)}, {location.coords.longitude.toFixed(4)})
                                </span>
                            </span>
                        ) : (
                            <span className="text-red-600">{locationError || (isEn ? "Location missing" : "অবস্থান অনুপস্থিত")}</span>
                        )}
                    </div>
                    {!isLocating && !location && (
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={fetchLocation}
                            className="h-8 px-2 text-emerald-700 hover:bg-emerald-100"
                        >
                            <RotateCcw className="h-3 w-3 mr-1" />
                            {isEn ? "Retry" : "পুনরায় চেষ্টা করুন"}
                        </Button>
                    )}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isEn ? "Crop Name" : "ফসলের নাম"}
                    </label>
                    <input
                        type="text"
                        value={cropType}
                        onChange={(e) => setCropType(e.target.value)}
                        className="w-full rounded-lg border border-emerald-200 px-3 py-2 focus:border-emerald-500 focus:outline-none"
                        placeholder={isEn ? "e.g. Rice, Wheat" : "যেমন: ধান, গম"}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {isEn ? "Risk Level" : "ঝুঁকির মাত্রা"}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        <button
                            type="button"
                            onClick={() => setRiskLevel('Low')}
                            className={`rounded-lg border py-2 text-sm font-medium transition-all ${riskLevel === 'Low'
                                    ? "border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500"
                                    : "border-gray-200 hover:border-green-200 hover:bg-green-50/50"
                                }`}
                        >
                            {isEn ? "Low" : "কম"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setRiskLevel('Medium')}
                            className={`rounded-lg border py-2 text-sm font-medium transition-all ${riskLevel === 'Medium'
                                    ? "border-amber-500 bg-amber-50 text-amber-700 ring-1 ring-amber-500"
                                    : "border-gray-200 hover:border-amber-200 hover:bg-amber-50/50"
                                }`}
                        >
                            {isEn ? "Medium" : "মাঝারি"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setRiskLevel('High')}
                            className={`rounded-lg border py-2 text-sm font-medium transition-all ${riskLevel === 'High'
                                    ? "border-red-500 bg-red-50 text-red-700 ring-1 ring-red-500"
                                    : "border-gray-200 hover:border-red-200 hover:bg-red-50/50"
                                }`}
                        >
                            {isEn ? "High" : "উচ্চ"}
                        </button>
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                    disabled={isSubmitting || !location || !cropType || !riskLevel}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {isEn ? "Submitting..." : "জমা দেওয়া হচ্ছে..."}
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-4 w-4" />
                            {isEn ? "Submit Report" : "জমা দিন"}
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
}
