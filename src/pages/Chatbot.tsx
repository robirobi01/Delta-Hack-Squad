
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { Bot, User, Sparkles, ArrowLeft, Camera, Image as ImageIcon } from "lucide-react"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  imageUrl?: string
}

export default function ChatbotPage() {
  const { language } = useLanguage()
  const isEn = language === "en"

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: isEn
        ? "Welcome! Upload an image of your crops, pests, or storage conditions, and I'll help you identify issues and provide advice."
        : "স্বাগতম! আপনার ফসল, কীটপতঙ্গ বা সংরক্ষণ অবস্থার একটি ছবি আপলোড করুন এবং আমি আপনাকে সমস্যা সনাক্ত করতে এবং পরামর্শ দিতে সাহায্য করব।"
    },
  ])
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert(isEn ? "Please upload an image file" : "অনুগ্রহ করে একটি ছবি ফাইল আপলোড করুন")
      return
    }

    // Create image URL for preview
    const imageUrl = URL.createObjectURL(file)

    // Add user message with image
    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: isEn ? "Uploaded image" : "ছবি আপলোড করা হয়েছে",
      imageUrl: imageUrl
    }
    setMessages((prev) => [...prev, userMessage])
    setIsProcessing(true)

    // Simulate AI processing (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: isEn
          ? "Thank you for uploading the image! I can see your crop/pest/storage condition. Based on the image:\n\n• This appears to be a common agricultural scenario\n• I recommend proper monitoring and care\n• Consider consulting with local agricultural experts for detailed analysis\n\nWould you like to upload another image for analysis?"
          : "ছবি আপলোড করার জন্য ধন্যবাদ! আমি আপনার ফসল/কীটপতঙ্গ/সংরক্ষণ অবস্থা দেখতে পাচ্ছি। ছবির উপর ভিত্তি করে:\n\n• এটি একটি সাধারণ কৃষি পরিস্থিতি বলে মনে হচ্ছে\n• আমি সঠিক পর্যবেক্ষণ এবং যত্নের সুপারিশ করি\n• বিস্তারিত বিশ্লেষণের জন্য স্থানীয় কৃষি বিশেষজ্ঞদের সাথে পরামর্শ করার কথা বিবেচনা করুন\n\nআপনি কি বিশ্লেষণের জন্য আরেকটি ছবি আপলোড করতে চান?"
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsProcessing(false)
    }, 2000)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleCameraClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex min-h-screen flex-col bg-emerald-50">
      {/* Header */}
      <div className="border-b border-emerald-100 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 transition-colors hover:bg-emerald-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 shadow-lg">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-emerald-800">{isEn ? "AI Image Assistant" : "এআই ছবি সহকারী"}</h1>
                <p className="text-xs text-gray-500">
                  <span className="mr-1 inline-block h-2 w-2 rounded-full bg-green-500" />
                  {isEn ? "Online • Image Analysis" : "অনলাইন • ছবি বিশ্লেষণ"}
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

      {/* Info Banner */}
      <div className="bg-emerald-100 px-4 py-2 text-center text-emerald-800">
        <p className="text-sm">
          <ImageIcon className="mr-1 inline-block h-4 w-4 text-emerald-600" />
          <strong>{isEn ? "Image Analysis:" : "ছবি বিশ্লেষণ:"}</strong>{" "}
          {isEn
            ? "Upload images of crops, pests, or storage for AI-powered insights"
            : "এআই-চালিত অন্তর্দৃষ্টির জন্য ফসল, কীটপতঙ্গ বা সংরক্ষণের ছবি আপলোড করুন"}
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
                  {message.imageUrl && (
                    <div className="mb-2 overflow-hidden rounded-lg">
                      <img
                        src={message.imageUrl}
                        alt="Uploaded"
                        className="max-h-64 w-full object-contain"
                      />
                    </div>
                  )}
                  <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}

            {/* Processing Indicator */}
            {isProcessing && (
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

      {/* Input Area - Image Upload Only */}
      <div className="border-t border-emerald-100 bg-white px-4 py-4">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              onClick={handleCameraClick}
              disabled={isProcessing}
              className="flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 px-6 py-6 rounded-2xl"
            >
              <Camera className="h-5 w-5" />
              <span className="font-medium">
                {isEn ? "Upload Image" : "ছবি আপলোড করুন"}
              </span>
            </Button>
          </div>
          <p className="mt-3 text-center text-xs text-gray-400">
            {isEn
              ? "Upload images of crops, pests, diseases, or storage conditions for AI analysis"
              : "এআই বিশ্লেষণের জন্য ফসল, কীটপতঙ্গ, রোগ বা সংরক্ষণ অবস্থার ছবি আপলোড করুন"}
          </p>
        </div>
      </div>
    </div>
  )
}
