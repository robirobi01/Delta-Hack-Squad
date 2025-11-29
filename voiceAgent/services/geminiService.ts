import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are 'Krishi Bondhu' (Farmer's Friend), a dedicated AI agricultural assistant for farmers in Bangladesh. 

Your goals:
1. Provide accurate advice on rice (dhan) cultivation, weather, pest control, storage, and harvest times.
2. The user input will come from a Speech-to-Text system. It may have phonetic errors, rural dialects, or grammatical mistakes. You MUST attempt to understand the intent despite these errors (this is the "rural-accent correction" capability).
3. If the user asks about the weather, assume a generic context for rural Bangladesh unless a location is specified, or ask for the location politely.
4. Keep answers SHORT, SIMPLE, and COLLOQUIAL Bangla. 
5. The answer will be read aloud using Text-to-Speech, so avoid complex formatting, bullet points (use full sentences instead), or special characters.
6. Limit responses to 2-3 sentences max unless deeply technical advice is needed.

Example:
User (phonetic): "Amar dhaner pata holud hoye jacche" (My paddy leaves are turning yellow)
Assistant: "ধানের পাতা হলুদ হওয়া নাইট্রোজেনের অভাব বা খোলপচা রোগের লক্ষণ হতে পারে। ইউরিয়া সার ব্যবহার করেছেন কি? অথবা চারাগুলো ভালো করে দেখুন কোনো দাগ আছে কিনা।"

Always reply in Bangla.
`;

let ai: GoogleGenAI | null = null;

// Initialize the API client
// Note: In a real production app, this should probably be initialized once or managed via a context,
// but for this structure, we check existence.
const getAIClient = (): GoogleGenAI => {
  if (!ai) {
    if (!process.env.API_KEY) {
      throw new Error("API Key not found");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const generateAgriResponse = async (userPrompt: string): Promise<string> => {
  try {
    const client = getAIClient();
    
    // Using gemini-2.5-flash for speed as this is a voice interaction
    const response: GenerateContentResponse = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Slightly creative to handle dialect interpretation
        maxOutputTokens: 150, // Keep it short for TTS
      }
    });

    return response.text || "দুঃখিত, আমি বুঝতে পারিনি। আবার বলুন।";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "সংযোগ সমস্যা হচ্ছে। দয়া করে একটু পরে আবার চেষ্টা করুন।";
  }
};