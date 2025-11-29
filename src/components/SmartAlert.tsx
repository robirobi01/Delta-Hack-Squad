import React, { useState } from 'react';
import { CropType, AdvisoryResult } from '../types';
import { generateFarmingAdvisory } from '../services/geminiService';
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { weatherData as sharedWeatherData } from './weather-widget';
import { Modal } from './ui/modal';

interface SmartAlertProps {
    registeredCrops?: any[];
}

const SmartAlert: React.FC<SmartAlertProps> = ({ registeredCrops = [] }) => {
    const { language } = useLanguage();
    const isEn = language === 'en';

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResults, setAnalysisResults] = useState<Array<{ crop: any, advisory: AdvisoryResult }>>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const mapCropTypeToEnum = (cropTypeString: string): CropType => {
        if (cropTypeString.toLowerCase().includes('potato') || cropTypeString.includes('আলু')) {
            return CropType.POTATO;
        } else if (cropTypeString.toLowerCase().includes('veg') || cropTypeString.includes('সবজি')) {
            return CropType.VEGETABLE;
        }
        return CropType.RICE; // Default to rice
    };

    const handleAnalyzeAllCrops = async () => {
        setIsAnalyzing(true);
        setIsModalOpen(true);

        try {
            const current = sharedWeatherData[0];

            // Analyze each registered crop
            const results = await Promise.all(
                registeredCrops.map(async (crop) => {
                    const condition = current.condition.toLowerCase().includes('rain') ? 'rainy' :
                        current.condition.toLowerCase().includes('cloud') ? 'cloudy' : 'sunny';

                    const syncedWeather = {
                        location: crop.district || 'Rangpur',
                        temperature: `${current.temp}°C`,
                        humidity: `${current.humidity}%`,
                        rainChance: current.condition.includes('Rain') || current.condition.includes('Cloud') ? '80%' : '10%',
                        forecast: [],
                        condition: condition as "sunny" | "rainy" | "cloudy" | "stormy"
                    };

                    const cropType = mapCropTypeToEnum(crop.cropType);
                    const advisory = await generateFarmingAdvisory(syncedWeather, cropType, language);

                    return { crop, advisory };
                })
            );

            setAnalysisResults(results);
        } catch (error) {
            console.error('Error analyzing crops:', error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const criticalCount = analysisResults.filter(r => r.advisory.isCritical).length;
    const normalCount = analysisResults.length - criticalCount;

    return (
        <>
            {/* Smart Alert Button */}
            <Button
                onClick={handleAnalyzeAllCrops}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
            >
                <span className="text-2xl">📢</span>
                <div className="text-left">
                    <div className="text-base">
                        {isEn ? "Smart Alert System" : "স্মার্ট অ্যালার্ট সিস্টেম"}
                    </div>
                    <div className="text-xs font-normal opacity-90">
                        {isEn
                            ? `Analyze ${registeredCrops.length} crop${registeredCrops.length > 1 ? 's' : ''} with AI`
                            : `${registeredCrops.length}টি ফসল AI দিয়ে বিশ্লেষণ করুন`}
                    </div>
                </div>
                {isAnalyzing && <Loader2 className="h-5 w-5 animate-spin ml-auto" />}
            </Button>

            {/* Analysis Results Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isEn ? "Smart Alert Analysis" : "স্মার্ট অ্যালার্ট বিশ্লেষণ"}
            >
                <div className="space-y-4">
                    {isAnalyzing ? (
                        <div className="text-center py-8 text-gray-500">
                            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-emerald-600" />
                            <p className="text-lg font-medium">
                                {isEn ? "Analyzing your crops..." : "আপনার ফসল বিশ্লেষণ করা হচ্ছে..."}
                            </p>
                            <p className="text-sm mt-2">
                                {isEn
                                    ? "Combining Crop Type + Weather + Risk Data"
                                    : "ফসলের ধরন + আবহাওয়া + ঝুঁকি ডেটা একত্রিত করা হচ্ছে"}
                            </p>
                        </div>
                    ) : analysisResults.length > 0 ? (
                        <>
                            {/* Summary */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                                    <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-1" />
                                    <div className="text-2xl font-bold text-red-700">{criticalCount}</div>
                                    <div className="text-xs text-red-600">
                                        {isEn ? "Critical Alerts" : "জরুরি সতর্কতা"}
                                    </div>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                                    <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto mb-1" />
                                    <div className="text-2xl font-bold text-green-700">{normalCount}</div>
                                    <div className="text-xs text-green-600">
                                        {isEn ? "Good Conditions" : "ভালো অবস্থা"}
                                    </div>
                                </div>
                            </div>

                            {/* Individual Crop Analysis */}
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {analysisResults.map((result, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-xl border-l-4 ${result.advisory.isCritical
                                            ? 'bg-red-50 border-red-500'
                                            : 'bg-green-50 border-green-500'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                                    {result.advisory.isCritical ? '🚨' : '✅'}
                                                    <span>{result.crop.cropType}</span>
                                                </h4>
                                                <p className="text-xs text-gray-600">
                                                    {result.crop.district} • {result.crop.estimatedWeight} kg
                                                </p>
                                            </div>
                                            <span className={`text-xs font-bold px-2 py-1 rounded ${result.advisory.isCritical
                                                ? 'bg-red-100 text-red-700'
                                                : 'bg-green-100 text-green-700'
                                                }`}>
                                                {result.advisory.isCritical
                                                    ? (isEn ? "CRITICAL" : "জরুরি")
                                                    : (isEn ? "GOOD" : "ভালো")}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-800 leading-relaxed">
                                            {result.advisory.advice}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {criticalCount > 0 && (
                                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                    <p className="text-xs text-amber-800 font-semibold">
                                        {isEn
                                            ? `⚠️ ${criticalCount} SMS notification${criticalCount > 1 ? 's' : ''} sent to your registered number`
                                            : `⚠️ ${criticalCount}টি এসএমএস আপনার নিবন্ধিত নম্বরে পাঠানো হয়েছে`}
                                    </p>
                                </div>
                            )}
                        </>
                    ) : null}

                    <div className="flex justify-end pt-2">
                        <Button onClick={() => setIsModalOpen(false)} variant="outline">
                            {isEn ? "Close" : "বন্ধ করুন"}
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default SmartAlert;
