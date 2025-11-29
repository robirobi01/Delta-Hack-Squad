import { GoogleGenAI, Type } from "@google/genai";
import { WeatherData, CropType, AdvisoryResult } from '../types';

export const generateFarmingAdvisory = async (
  weather: WeatherData,
  crop: CropType
): Promise<AdvisoryResult> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return {
        advice: "দয়া করে API Key সেট করুন অথবা বৃষ্টির সম্ভাবনা দেখে ব্যবস্থা নিন।",
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
      Generate a specific, actionable Bangla farming advisory.
      - Bad Example: "Weather is bad."
      - Good Example: "আগামীকাল বৃষ্টি হবে এবং আপনার আলুর গুদামে আর্দ্রতা বেশি। এখনই ফ্যান চালু করুন।"
      - Format: Action first, then Reason. Keep it under 20 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
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
              description: "The actionable advice in Bangla."
            }
          },
          required: ["riskLevel", "advice"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    const isCritical = result.riskLevel === 'CRITICAL';
    const adviceText = result.advice || "বর্তমানে পরামর্শ দেওয়া সম্ভব হচ্ছে না।";

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
      advice: "সার্ভারে সমস্যা হয়েছে। সাধারণ আবহাওয়া বার্তা মেনে চলুন।",
      isCritical: false
    };
  }
};