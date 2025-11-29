import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = 'AIzaSyBw45vFgUNx95Ta2EwyG_T9nP5izzMNxtU';

export interface CropAnalysisResult {
    status: 'Fresh' | 'Rotten' | 'Partially Damaged';
    confidence: number;
    details: string;
    recommendations: string[];
}

/**
 * Analyzes crop image to determine freshness using Gemini Vision API
 * Optimized for fast mobile browser performance
 */
export const analyzeCropFreshness = async (
    imageFile: File,
    language: 'en' | 'bn' = 'en'
): Promise<CropAnalysisResult> => {
    try {
        // Convert image to base64
        const base64Image = await fileToBase64(imageFile);

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

        const prompt = language === 'en'
            ? `Analyze this crop/food image and determine its freshness status. 
         
         Classify as:
         - "Fresh": Looks healthy, vibrant, no visible decay
         - "Rotten": Shows clear signs of decay, mold, or spoilage
         - "Partially Damaged": Some damage but mostly salvageable
         
         Provide:
         1. Status (Fresh/Rotten/Partially Damaged)
         2. Confidence level (0-100)
         3. Brief description of what you see
         4. 2-3 specific recommendations
         
         Be concise and practical for farmers.`
            : `এই ফসল/খাদ্য ছবি বিশ্লেষণ করুন এবং এর তাজা অবস্থা নির্ধারণ করুন।
      
         শ্রেণীবদ্ধ করুন:
         - "Fresh": সুস্থ, প্রাণবন্ত, কোনো দৃশ্যমান ক্ষয় নেই
         - "Rotten": ক্ষয়, ছাঁচ বা নষ্ট হওয়ার স্পষ্ট লক্ষণ
         - "Partially Damaged": কিছু ক্ষতি কিন্তু বেশিরভাগ ব্যবহারযোগ্য
         
         প্রদান করুন:
         1. অবস্থা (Fresh/Rotten/Partially Damaged)
         2. আত্মবিশ্বাসের স্তর (0-100)
         3. আপনি কী দেখছেন তার সংক্ষিপ্ত বিবরণ
         4. 2-3টি নির্দিষ্ট সুপারিশ
         
         কৃষকদের জন্য সংক্ষিপ্ত এবং ব্যবহারিক হন।`;

        const imagePart = {
            inlineData: {
                data: base64Image,
                mimeType: imageFile.type
            }
        };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const resultText = response.text();

        console.log('AI Response:', resultText); // Debug log

        // Parse the response to extract structured data
        const analysis = parseAnalysisResponse(resultText, language);

        return analysis;

    } catch (error) {
        console.error('Crop analysis error:', error);

        // Fallback response with error details
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        return {
            status: 'Fresh',
            confidence: 50,
            details: language === 'en'
                ? `Unable to analyze image. Error: ${errorMessage}. Please try again.`
                : `ছবি বিশ্লেষণ করতে অক্ষম। ত্রুটি: ${errorMessage}। আবার চেষ্টা করুন।`,
            recommendations: language === 'en'
                ? ['Check internet connection', 'Ensure API key is valid', 'Try a different photo']
                : ['ইন্টারনেট সংযোগ পরীক্ষা করুন', 'API কি সঠিক কিনা দেখুন', 'অন্য ছবি চেষ্টা করুন']
        };
    }
};

/**
 * Convert File to base64 string
 */
function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = (reader.result as string).split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Parse AI response to extract structured analysis
 */
function parseAnalysisResponse(text: string, language: 'en' | 'bn'): CropAnalysisResult {
    // Determine status from keywords
    let status: 'Fresh' | 'Rotten' | 'Partially Damaged' = 'Fresh';
    const lowerText = text.toLowerCase();

    if (lowerText.includes('rotten') || lowerText.includes('spoil') || lowerText.includes('decay') ||
        lowerText.includes('নষ্ট') || lowerText.includes('পচা')) {
        status = 'Rotten';
    } else if (lowerText.includes('partial') || lowerText.includes('damage') ||
        lowerText.includes('আংশিক') || lowerText.includes('ক্ষতি')) {
        status = 'Partially Damaged';
    }

    // Extract confidence (look for percentage or number)
    let confidence = 85; // Default higher confidence
    const confMatch = text.match(/(\d+)%?/);
    if (confMatch) {
        const num = parseInt(confMatch[1]);
        if (num >= 0 && num <= 100) {
            confidence = num;
        }
    }

    // Extract recommendations (lines starting with bullets or numbers)
    const recommendations: string[] = [];
    const lines = text.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.match(/^[-•*\d.]/)) {
            const cleaned = trimmed.replace(/^[-•*\d.]\s*/, '');
            if (cleaned.length > 5 && cleaned.length < 200) {
                recommendations.push(cleaned);
            }
        }
    }

    // If no recommendations found, provide defaults based on status
    if (recommendations.length === 0) {
        if (language === 'en') {
            if (status === 'Fresh') {
                recommendations.push('Store in cool, dry place', 'Use within recommended timeframe', 'Monitor regularly');
            } else if (status === 'Rotten') {
                recommendations.push('Discard immediately', 'Check other stored crops', 'Improve ventilation');
            } else {
                recommendations.push('Separate damaged portions', 'Use soon', 'Monitor closely');
            }
        } else {
            if (status === 'Fresh') {
                recommendations.push('ঠান্ডা, শুষ্ক জায়গায় সংরক্ষণ করুন', 'প্রস্তাবিত সময়সীমার মধ্যে ব্যবহার করুন', 'নিয়মিত পর্যবেক্ষণ করুন');
            } else if (status === 'Rotten') {
                recommendations.push('অবিলম্বে ফেলে দিন', 'অন্যান্য সংরক্ষিত ফসল পরীক্ষা করুন', 'বায়ুচলাচল উন্নত করুন');
            } else {
                recommendations.push('ক্ষতিগ্রস্ত অংশ আলাদা করুন', 'শীঘ্রই ব্যবহার করুন', 'ঘনিষ্ঠভাবে পর্যবেক্ষণ করুন');
            }
        }
    }

    return {
        status,
        confidence,
        details: text.substring(0, 300), // First 300 chars as details
        recommendations: recommendations.slice(0, 3) // Max 3 recommendations
    };
}
