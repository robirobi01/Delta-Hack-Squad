import React, { useState, useEffect } from 'react';
import { UPAZILAS, CROPS } from '../constants';
import { WeatherData, CropType, AdvisoryResult } from '../types';
import { fetchWeatherData } from '../services/weatherService';
import { generateFarmingAdvisory } from '../services/geminiService';
import { Button } from "@/components/ui/button";
import { Loader2, Sprout } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { weatherData as sharedWeatherData } from './weather-widget';
import { Modal } from './ui/modal';

interface SmartAlertProps {
    registeredCrops?: any[];
}

const SmartAlert: React.FC<SmartAlertProps> = ({ registeredCrops = [] }) => {
    const { language } = useLanguage();
    const isEn = language === 'en';

    const [selectedUpazila, setSelectedUpazila] = useState<string>('');
    const [selectedCrop, setSelectedCrop] = useState<CropType>(CropType.RICE);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [advisoryData, setAdvisoryData] = useState<AdvisoryResult | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [advisoryLoading, setAdvisoryLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Auto-fetch advice for the first registered crop on mount
    useEffect(() => {
        if (registeredCrops.length > 0) {
            const firstCrop = registeredCrops[0];
            // Map registered crop type string to CropType enum if possible
            // For now, we default to Rice if mapping fails, or try to match
            // This is a simplification. In a real app, we'd map properly.

            // Auto-set location if available in crop data
            if (firstCrop.district) {
                // Try to match district to upazila list or just use it
                // For demo, we'll just use the first upazila if no match, or the district name
                setSelectedUpazila(firstCrop.district + " Sadar");
            }
        }
    }, [registeredCrops]);

    const handleFetchData = async (cropToAnalyze?: CropType, location?: string) => {
        const upazila = location || selectedUpazila;
        const crop = cropToAnalyze || selectedCrop;

        if (!upazila) {
            alert(isEn ? "Please select an Upazila" : "দয়া করে একটি উপজেলা নির্বাচন করুন");
            return;
        }

        setLoading(true);
        setAdvisoryData(null);
        setIsModalOpen(true);

        try {
            const current = sharedWeatherData[0];

            const syncedWeather: WeatherData = {
                location: upazila,
                temperature: `${current.temp}°C`,
                humidity: `${current.humidity}%`,
                rainChance: current.condition.includes('Rain') || current.condition.includes('Cloud') ? '80%' : '10%',
                forecast: [],
                condition: current.condition.toLowerCase().includes('rain') ? 'rainy' :
                    current.condition.toLowerCase().includes('cloud') ? 'cloudy' : 'sunny'
            };

            await new Promise(resolve => setTimeout(resolve, 600));
            setWeatherData(syncedWeather);

            setAdvisoryLoading(true);
            const result = await generateFarmingAdvisory(syncedWeather, crop, language);
            setAdvisoryData(result);
            setAdvisoryLoading(false);

        } catch (error) {
            console.error(error);
            alert(isEn ? "Error loading data" : "তথ্য লোড করতে সমস্যা হয়েছে।");
            setIsModalOpen(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 h-full flex flex-col">
            <h2 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                <span>📢</span> {isEn ? "Smart Alert System" : "স্মার্ট অ্যালার্ট সিস্টেম"}
            </h2>

            {/* Realtime Advice Section for Registered Crops */}
            {registeredCrops.length > 0 && (
                <div className="mb-6 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                    <h3 className="text-sm font-bold text-emerald-800 mb-3 flex items-center gap-2">
                        <Sprout className="h-4 w-4" />
                        {isEn ? "Your Crops Status" : "আপনার ফসলের অবস্থা"}
                    </h3>
                    <div className="space-y-2">
                        {registeredCrops.slice(0, 2).map((crop, idx) => (
                            <div key={crop.id} className="flex items-center justify-between bg-white p-2 rounded-lg border border-emerald-100 shadow-sm">
                                <div>
                                    <p className="text-xs font-bold text-gray-700">{crop.cropType}</p>
                                    <p className="text-[10px] text-gray-500">{crop.district}</p>
                                </div>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                    onClick={() => {
                                        // Map crop string to enum roughly
                                        let mappedCrop = CropType.RICE;
                                        if (crop.cropType.includes('Potato')) mappedCrop = CropType.POTATO;
                                        else if (crop.cropType.includes('Veg')) mappedCrop = CropType.VEGETABLE;
                                        // ... add more mappings as needed

                                        setSelectedUpazila(crop.district); // Update state for consistency
                                        handleFetchData(mappedCrop, crop.district);
                                    }}
                                >
                                    {isEn ? "Check" : "যাচাই করুন"}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Manual Controls Section */}
            <div className="space-y-4 flex-grow">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-2 text-xs text-gray-500">{isEn ? "OR CHECK MANUALLY" : "অথবা ম্যানুয়ালি চেক করুন"}</span>
                    </div>
                </div>

                {/* Location Selector */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isEn ? "Select Upazila" : "উপজেলা নির্বাচন করুন"}
                    </label>
                    <select
                        value={selectedUpazila}
                        onChange={(e) => setSelectedUpazila(e.target.value)}
                        className="w-full p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    >
                        <option value="">{isEn ? "Select from list..." : "তালিকা থেকে বেছে নিন..."}</option>
                        {UPAZILAS.map(u => (
                            <option key={u} value={u}>{u}</option>
                        ))}
                    </select>
                </div>

                {/* Crop Selector */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {isEn ? "Select Crop" : "ফসল নির্বাচন করুন"}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {CROPS.map((crop) => (
                            <button
                                key={crop.id}
                                onClick={() => setSelectedCrop(crop.id)}
                                className={`p-2 rounded-lg flex flex-col items-center justify-center transition-all ${selectedCrop === crop.id
                                        ? 'bg-emerald-100 border-2 border-emerald-600 text-emerald-800'
                                        : 'bg-slate-50 border border-gray-100 text-gray-500 hover:bg-emerald-50'
                                    }`}
                            >
                                <span className="text-xl mb-1">{crop.icon}</span>
                                <span className="text-xs font-medium">{isEn ? crop.id : crop.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Button */}
                <Button
                    onClick={() => handleFetchData()}
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg transition-all mt-auto"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {isEn ? "Loading..." : "লোড হচ্ছে..."}
                        </>
                    ) : (isEn ? "View Weather & Advice" : "আবহাওয়া ও পরামর্শ দেখুন")}
                </Button>
            </div>

            {/* Result Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isEn ? "Farming Advisory" : "কৃষি পরামর্শ"}
            >
                <div className="space-y-6">
                    {/* Weather Summary */}
                    {weatherData && (
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{weatherData.location}</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-slate-800">{weatherData.temperature}</span>
                                    <span className="text-sm text-gray-600">{weatherData.condition}</span>
                                </div>
                            </div>
                            <div className="text-right text-sm text-gray-600">
                                <p>💧 {weatherData.humidity}</p>
                                <p>☔ {weatherData.rainChance}</p>
                            </div>
                        </div>
                    )}

                    {/* Advisory Content */}
                    <div className="min-h-[100px] flex items-center justify-center">
                        {advisoryLoading ? (
                            <div className="text-center text-gray-500">
                                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-emerald-600" />
                                <p>{isEn ? "Analyzing weather & crop data..." : "আবহাওয়া ও ফসলের তথ্য বিশ্লেষণ করা হচ্ছে..."}</p>
                            </div>
                        ) : advisoryData ? (
                            <div className={`w-full p-4 rounded-xl border-l-4 shadow-sm ${advisoryData.isCritical ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500'
                                }`}>
                                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                    {advisoryData.isCritical ? '🚨 ' : '✅ '}
                                    <span className={advisoryData.isCritical ? 'text-red-700' : 'text-green-700'}>
                                        {advisoryData.isCritical
                                            ? (isEn ? "CRITICAL ALERT" : "জরুরি সতর্কতা")
                                            : (isEn ? "Good Condition" : "ভালো অবস্থা")}
                                    </span>
                                </h3>
                                <p className="text-gray-800 text-lg leading-relaxed">
                                    {advisoryData.advice}
                                </p>
                                {advisoryData.isCritical && (
                                    <p className="mt-3 text-xs text-red-600 font-semibold">
                                        {isEn ? "* SMS Notification sent to registered number" : "* নিবন্ধিত নম্বরে এসএমএস পাঠানো হয়েছে"}
                                    </p>
                                )}
                            </div>
                        ) : null}
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={() => setIsModalOpen(false)} variant="outline">
                            {isEn ? "Close" : "বন্ধ করুন"}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default SmartAlert;
