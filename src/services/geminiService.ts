import { GoogleGenAI, Type } from "@google/genai";
import { WeatherData, CropType, AdvisoryResult } from '../types';

export const generateFarmingAdvisory = async (
    weather: WeatherData,
    crop: CropType,
    language: 'en' | 'bn' = 'bn'
): Promise<AdvisoryResult> => {
    try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.API_KEY;
        if (!apiKey) {
            console.warn("API Key not found. Please set VITE_GEMINI_API_KEY in .env");
            return {
                advice: language === 'en'
                    ? "Please set API Key or take action based on rain chance."
                    : "দয়া করে API Key সেট করুন অথবা বৃষ্টির সম্ভাবনা দেখে ব্যবস্থা নিন।",
                isCritical: false
            };
        }

        const ai = new GoogleGenAI({ apiKey: apiKey });

        const prompt = `
      Act as an agricultural expert for Bangladesh.
      Analyze the weather data for the selected crop and determine the Risk Level (CRITICAL or NORMAL).

      Data:
      - Location: ${weather.location}
      - Temperature: ${weather.temperature}
      - Rain Chance: ${weather.rainChance}
      - Humidity: ${weather.humidity}
      - Crop: ${crop}

      Risk Logic (Strict Rules):
      - CRITICAL if Rain > 70% AND Crop is 'Rice' (ধান) or 'Vegetable' (সবজি).
      - CRITICAL if Temperature > 36°C (High Heat Shock).
      - CRITICAL if Humidity > 85% AND Crop is 'Potato' (আলু) (Late Blight risk).
      - Otherwise, risk is NORMAL.

      Output Requirement:
      Generate a specific, actionable farming advisory in ${language === 'en' ? 'English' : 'Bangla'}.
      - Bad Example: "Weather is bad."
      - Good Example (Bn): "আগামীকাল বৃষ্টি হবে এবং আপনার আলুর গুদামে আর্দ্রতা বেশি। এখনই ফ্যান চালু করুন।"
      - Good Example (En): "Rain expected tomorrow and humidity is high in potato storage. Turn on fans now."
      - Format: Action first, then Reason. Keep it under 20 words.
    `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        riskLevel: {
                            type: Type.STRING,
                            enum: ["CRITICAL", "NORMAL"],
                            description: "The calculated risk level based on weather and crop."
                        },
                        advice: {
                            type: Type.STRING,
                            description: `The actionable advice in ${language === 'en' ? 'English' : 'Bangla'}.`
                        }
                    },
                    required: ["riskLevel", "advice"]
                }
            }
        });

        const result = JSON.parse(response.text || "{}");
        const isCritical = result.riskLevel === 'CRITICAL';
        const adviceText = result.advice || (language === 'en' ? "Advice currently unavailable." : "বর্তমানে পরামর্শ দেওয়া সম্ভব হচ্ছে না।");

        // Simulate SMS Notification in Browser Console
        if (isCritical) {
            console.log(
                `%c🚨 URGENT SMS SENT TO FARMER 🚨\n%cTo: +88017XXXXXXXX\nMessage: ${adviceText}`,
                "color: red; font-weight: bold; font-size: 14px;",
                "color: black; font-weight: bold;"
            );
        } else {
            console.log(`ℹ️ Advisory Generated: ${adviceText}`);
        }

        return {
            advice: adviceText,
            isCritical: isCritical
        };

    } catch (error) {
        console.error("Gemini Error:", error);
        return {
            advice: language === 'en'
                ? "Server error. Please follow standard weather advice."
                : "সার্ভারে সমস্যা হয়েছে। সাধারণ আবহাওয়া বার্তা মেনে চলুন।",
            isCritical: false
        };
    }
};
