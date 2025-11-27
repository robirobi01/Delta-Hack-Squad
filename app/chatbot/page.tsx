"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { Send, Bot, User, Sparkles, ArrowLeft, Camera, Mic, Lightbulb } from "lucide-react"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
}

export default function ChatbotPage() {
  const { language } = useLanguage()
  const isEn = language === "en"

  const sampleResponses: { [key: string]: { en: string; bn: string } } = {
    default: {
      en: "I'm your AI farming assistant! I can help you with:\n\n• Post-harvest storage advice\n• Weather-related questions\n• Pest and disease identification\n• Crop management tips\n• Market timing guidance\n\nWhat would you like to know?",
      bn: "আমি আপনার এআই কৃষি সহকারী! আমি আপনাকে সাহায্য করতে পারি:\n\n• ফসল পরবর্তী সংরক্ষণ পরামর্শ\n• আবহাওয়া সম্পর্কিত প্রশ্ন\n• কীটপতঙ্গ এবং রোগ সনাক্তকরণ\n• ফসল ব্যবস্থাপনা টিপস\n• বাজার সময় নির্দেশিকা\n\nআপনি কী জানতে চান?",
    },
    storage: {
      en: "For proper rice storage, follow these steps:\n\n1. **Dry properly**: Ensure moisture content is below 14%\n2. **Clean storage area**: Remove old grains and debris\n3. **Use airtight containers**: Hermetic bags work great\n4. **Monitor regularly**: Check for pests every 2 weeks\n5. **Keep dry**: Avoid areas prone to flooding\n\nWould you like more specific advice?",
      bn: "সঠিক ধান সংরক্ষণের জন্য, এই পদক্ষেপগুলি অনুসরণ করুন:\n\n১. **সঠিকভাবে শুকান**: আর্দ্রতা ১৪% এর নিচে নিশ্চিত করুন\n২. **সংরক্ষণ এলাকা পরিষ্কার করুন**: পুরানো শস্য এবং ধ্বংসাবশেষ সরান\n৩. **এয়ারটাইট পাত্র ব্যবহার করুন**: হার্মেটিক ব্যাগ দুর্দান্ত কাজ করে\n৪. **নিয়মিত পর্যবেক্ষণ করুন**: প্রতি ২ সপ্তাহে কীটপতঙ্গ পরীক্ষা করুন\n৫. **শুকনো রাখুন**: বন্যাপ্রবণ এলাকা এড়িয়ে চলুন\n\nআরও নির্দিষ্ট পরামর্শ চান?",
    },
    pest: {
      en: "Common storage pests in Bangladesh include:\n\n• **Rice weevils**: Small beetles that bore into grains\n• **Lesser grain borer**: Creates holes and dust\n• **Khapra beetle**: Serious pest for stored grains\n\n**Prevention tips:**\n- Use airtight containers\n- Apply neem leaves (natural repellent)\n- Maintain cleanliness\n- Consider hermetic storage bags\n\nAre you seeing any specific signs of pest damage?",
      bn: "বাংলাদেশে সাধারণ সংরক্ষণ কীটপতঙ্গ:\n\n• **ধান উইভিল**: ছোট পোকা যা শস্যে ছিদ্র করে\n• **লেসার গ্রেইন বোরার**: ছিদ্র এবং ধুলো তৈরি করে\n• **খাপরা বিটল**: সংরক্ষিত শস্যের জন্য গুরুতর কীটপতঙ্গ\n\n**প্রতিরোধ টিপস:**\n- এয়ারটাইট পাত্র ব্যবহার করুন\n- নিম পাতা প্রয়োগ করুন (প্রাকৃতিক প্রতিরোধক)\n- পরিচ্ছন্নতা বজায় রাখুন\n- হার্মেটিক স্টোরেজ ব্যাগ বিবেচনা করুন\n\nআপনি কি কীটপতঙ্গের ক্ষতির কোনো নির্দিষ্ট লক্ষণ দেখছেন?",
    },
    weather: {
      en: "Based on current forecasts for your area:\n\n**This Week:**\n- Rain expected Thursday-Friday\n- Good drying conditions until Wednesday\n\n**Recommendations:**\n- Complete harvesting by Wednesday if possible\n- Ensure storage areas are waterproof\n- Delay selling if prices typically rise after rain\n\nWould you like me to explain more about weather-based planning?",
      bn: "আপনার এলাকার জন্য বর্তমান পূর্বাভাসের উপর ভিত্তি করে:\n\n**এই সপ্তাহ:**\n- বৃহস্পতি-শুক্রবার বৃষ্টি প্রত্যাশিত\n- বুধবার পর্যন্ত ভাল শুকানোর অবস্থা\n\n**সুপারিশ:**\n- সম্ভব হলে বুধবারের মধ্যে ফসল কাটা সম্পূর্ণ করুন\n- সংরক্ষণ এলাকা জলরোধী নিশ্চিত করুন\n- বৃষ্টির পরে দাম সাধারণত বাড়লে বিক্রি বিলম্বিত করুন\n\nআবহাওয়া-ভিত্তিক পরিকল্পনা সম্পর্কে আরও ব্যাখ্যা করব?",
    },
    price: {
      en: "Current market insights:\n\n**Rice prices** are trending upward due to:\n- Strong domestic demand\n- Limited imports this season\n\n**Best practices:**\n- Monitor prices weekly\n- Consider storing for 2-3 months post-harvest when prices typically peak\n- Connect with multiple buyers for better rates\n\nWould you like tips on finding the best market for your produce?",
      bn: "বর্তমান বাজার অন্তর্দৃষ্টি:\n\n**ধানের দাম** ঊর্ধ্বমুখী কারণ:\n- শক্তিশালী অভ্যন্তরীণ চাহিদা\n- এই মৌসুমে সীমিত আমদানি\n\n**সর্বোত্তম অনুশীলন:**\n- সাপ্তাহিক দাম পর্যবেক্ষণ করুন\n- ফসল কাটার পর ২-৩ মাস সংরক্ষণ বিবেচনা করুন যখন দাম সাধারণত সর্বোচ্চ থাকে\n- ভাল দরের জন্য একাধিক ক্রেতার সাথে সংযোগ করুন\n\nআপনার উৎপাদনের জন্য সেরা বাজার খুঁজে পেতে টিপস চান?",
    },
  }

  const suggestedQuestions = isEn
    ? [
        "How should I store my rice?",
        "How do I prevent pests?",
        "What's the weather forecast?",
        "When should I sell my harvest?",
      ]
    : ["আমি কিভাবে আমার ধান সংরক্ষণ করব?", "কীটপতঙ্গ কিভাবে প্রতিরোধ করব?", "আবহাওয়ার পূর্বাভাস কী?", "কখন আমার ফসল বিক্রি করব?"]

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "assistant", content: isEn ? sampleResponses.default.en : sampleResponses.default.bn },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()
    if (lowerQuestion.includes("storage") || lowerQuestion.includes("store") || lowerQuestion.includes("সংরক্ষণ")) {
      return isEn ? sampleResponses.storage.en : sampleResponses.storage.bn
    }
    if (
      lowerQuestion.includes("pest") ||
      lowerQuestion.includes("insect") ||
      lowerQuestion.includes("কীটপতঙ্গ") ||
      lowerQuestion.includes("পোকা")
    ) {
      return isEn ? sampleResponses.pest.en : sampleResponses.pest.bn
    }
    if (
      lowerQuestion.includes("weather") ||
      lowerQuestion.includes("rain") ||
      lowerQuestion.includes("আবহাওয়া") ||
      lowerQuestion.includes("বৃষ্টি")
    ) {
      return isEn ? sampleResponses.weather.en : sampleResponses.weather.bn
    }
    if (
      lowerQuestion.includes("price") ||
      lowerQuestion.includes("sell") ||
      lowerQuestion.includes("market") ||
      lowerQuestion.includes("দাম") ||
      lowerQuestion.includes("বিক্রি") ||
      lowerQuestion.includes("বাজার")
    ) {
      return isEn ? sampleResponses.price.en : sampleResponses.price.bn
    }
    return isEn
      ? "That's a great question! In the full version, I'll provide personalized advice based on your location, crops, and current conditions. For now, you can ask me about:\n\n• Storage best practices\n• Pest prevention\n• Weather planning\n• Market timing\n\nWhat would you like to explore?"
      : "এটি একটি দুর্দান্ত প্রশ্ন! সম্পূর্ণ সংস্করণে, আমি আপনার অবস্থান, ফসল এবং বর্তমান পরিস্থিতির উপর ভিত্তি করে ব্যক্তিগত পরামর্শ দেব। আপাতত, আপনি আমাকে জিজ্ঞাসা করতে পারেন:\n\n• সংরক্ষণ সর্বোত্তম অনুশীলন\n• কীটপতঙ্গ প্রতিরোধ\n• আবহাওয়া পরিকল্পনা\n• বাজার সময়\n\nআপনি কী অন্বেষণ করতে চান?"
  }

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = { id: messages.length + 1, role: "user", content: messageText }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const assistantMessage: Message = { id: messages.length + 2, role: "assistant", content: getResponse(messageText) }
    setMessages((prev) => [...prev, assistantMessage])
    setIsTyping(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-emerald-50">
      {/* Header */}
      <div className="border-b border-emerald-100 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 transition-colors hover:bg-emerald-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 shadow-lg">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-emerald-800">{isEn ? "AI Assistant" : "এআই সহকারী"}</h1>
                <p className="text-xs text-gray-500">
                  <span className="mr-1 inline-block h-2 w-2 rounded-full bg-green-500" />
                  {isEn ? "Online • Demo Mode" : "অনলাইন • ডেমো মোড"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-medium text-gray-500">{isEn ? "Powered by AI" : "এআই দ্বারা চালিত"}</span>
          </div>
        </div>
      </div>

      {/* Demo Banner */}
      <div className="bg-amber-100 px-4 py-2 text-center">
        <p className="text-sm text-amber-800">
          <Lightbulb className="mr-1 inline-block h-4 w-4 text-amber-600" />
          <strong>{isEn ? "Demo Mode:" : "ডেমো মোড:"}</strong>{" "}
          {isEn
            ? "Try asking about storage, pests, weather, or market prices!"
            : "সংরক্ষণ, কীটপতঙ্গ, আবহাওয়া বা বাজার দর সম্পর্কে জিজ্ঞাসা করুন!"}
        </p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${message.role === "user" ? "bg-amber-500" : "bg-emerald-600"}`}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === "user" ? "bg-amber-500 text-white" : "border border-emerald-100 bg-white text-emerald-800"}`}
                >
                  <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-2xl border border-emerald-100 bg-white px-4 py-3">
                  <div className="flex gap-1">
                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Suggested Questions */}
      {messages.length <= 2 && (
        <div className="border-t border-emerald-100 bg-white px-4 py-4">
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 text-xs font-medium text-gray-500">{isEn ? "Suggested questions:" : "প্রস্তাবিত প্রশ্ন:"}</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(question)}
                  className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700 transition-colors hover:border-amber-300 hover:bg-amber-50"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-emerald-100 bg-white px-4 py-4">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-end gap-3">
            <div className="flex gap-2">
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-gray-500 transition-colors hover:bg-emerald-100"
                title={isEn ? "Upload image (coming soon)" : "ছবি আপলোড করুন (শীঘ্রই আসছে)"}
                disabled
              >
                <Camera className="h-5 w-5" />
              </button>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-gray-500 transition-colors hover:bg-emerald-100"
                title={isEn ? "Voice input (coming soon)" : "ভয়েস ইনপুট (শীঘ্রই আসছে)"}
                disabled
              >
                <Mic className="h-5 w-5" />
              </button>
            </div>
            <div className="relative flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isEn ? "Ask me anything about farming..." : "কৃষি সম্পর্কে যেকোনো কিছু জিজ্ঞাসা করুন..."}
                className="w-full resize-none rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 pr-12 text-sm text-emerald-800 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                rows={1}
              />
            </div>
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="h-10 w-10 rounded-full bg-emerald-600 p-0 hover:bg-emerald-700 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-center text-xs text-gray-400">
            {isEn
              ? "AI responses are for guidance only. For critical issues, consult local experts."
              : "এআই প্রতিক্রিয়া শুধুমাত্র নির্দেশনার জন্য। গুরুত্বপূর্ণ সমস্যার জন্য স্থানীয় বিশেষজ্ঞদের পরামর্শ নিন।"}
          </p>
        </div>
      </div>
    </div>
  )
}
