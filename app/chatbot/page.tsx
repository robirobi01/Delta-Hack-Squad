"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Send, Bot, User, Sparkles, ArrowLeft, Camera, Mic, Lightbulb } from "lucide-react"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
}

const sampleResponses: { [key: string]: string } = {
  default:
    "I'm your AI farming assistant! I can help you with:\n\n• Post-harvest storage advice\n• Weather-related questions\n• Pest and disease identification\n• Crop management tips\n• Market timing guidance\n\nWhat would you like to know?",
  storage:
    "For proper rice storage, follow these steps:\n\n1. **Dry properly**: Ensure moisture content is below 14%\n2. **Clean storage area**: Remove old grains and debris\n3. **Use airtight containers**: Hermetic bags work great\n4. **Monitor regularly**: Check for pests every 2 weeks\n5. **Keep dry**: Avoid areas prone to flooding\n\nWould you like more specific advice for your situation?",
  pest: "Common storage pests in Bangladesh include:\n\n• **Rice weevils**: Small beetles that bore into grains\n• **Lesser grain borer**: Creates holes and dust\n• **Khapra beetle**: Serious pest for stored grains\n\n**Prevention tips:**\n- Use airtight containers\n- Apply neem leaves (natural repellent)\n- Maintain cleanliness\n- Consider hermetic storage bags\n\nAre you seeing any specific signs of pest damage?",
  weather:
    "Based on current forecasts for your area:\n\n**This Week:**\n- Rain expected Thursday-Friday\n- Good drying conditions until Wednesday\n\n**Recommendations:**\n- Complete harvesting by Wednesday if possible\n- Ensure storage areas are waterproof\n- Delay selling if prices typically rise after rain\n\nWould you like me to explain more about weather-based planning?",
  price:
    "Current market insights:\n\n**Rice prices** are trending upward due to:\n- Strong domestic demand\n- Limited imports this season\n\n**Best practices:**\n- Monitor prices weekly\n- Consider storing for 2-3 months post-harvest when prices typically peak\n- Connect with multiple buyers for better rates\n\nWould you like tips on finding the best market for your produce?",
}

const suggestedQuestions = [
  "How should I store my rice?",
  "How do I prevent pests?",
  "What's the weather forecast?",
  "When should I sell my harvest?",
]

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: sampleResponses.default,
    },
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
    if (lowerQuestion.includes("storage") || lowerQuestion.includes("store")) {
      return sampleResponses.storage
    }
    if (lowerQuestion.includes("pest") || lowerQuestion.includes("insect") || lowerQuestion.includes("bug")) {
      return sampleResponses.pest
    }
    if (lowerQuestion.includes("weather") || lowerQuestion.includes("rain") || lowerQuestion.includes("forecast")) {
      return sampleResponses.weather
    }
    if (lowerQuestion.includes("price") || lowerQuestion.includes("sell") || lowerQuestion.includes("market")) {
      return sampleResponses.price
    }
    return "That's a great question! In the full version, I'll provide personalized advice based on your location, crops, and current conditions. For now, you can ask me about:\n\n• Storage best practices\n• Pest prevention\n• Weather planning\n• Market timing\n\nWhat would you like to explore?"
  }

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: messageText,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const assistantMessage: Message = {
      id: messages.length + 2,
      role: "assistant",
      content: getResponse(messageText),
    }

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
    <div className="flex min-h-screen flex-col bg-[#FAF8F5]">
      {/* Header */}
      <div className="border-b border-[#2D5016]/10 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF8F5] text-[#2D5016] transition-colors hover:bg-[#2D5016]/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D5016]">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-[#2D5016]">AI Assistant</h1>
                <p className="text-xs text-[#8B7355]">
                  <span className="mr-1 inline-block h-2 w-2 rounded-full bg-green-500" />
                  Online • Demo Mode
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#E8A838]" />
            <span className="text-sm font-medium text-[#8B7355]">Powered by AI</span>
          </div>
        </div>
      </div>

      {/* Demo Banner */}
      <div className="bg-[#E8A838]/10 px-4 py-2 text-center">
        <p className="text-sm text-[#8B7355]">
          <Lightbulb className="mr-1 inline-block h-4 w-4 text-[#E8A838]" />
          <strong>Demo Mode:</strong> Try asking about storage, pests, weather, or market prices!
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
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    message.role === "user" ? "bg-[#E8A838]" : "bg-[#2D5016]"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-[#E8A838] text-white"
                      : "border border-[#2D5016]/10 bg-white text-[#2D5016]"
                  }`}
                >
                  <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2D5016]">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-2xl border border-[#2D5016]/10 bg-white px-4 py-3">
                  <div className="flex gap-1">
                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-[#8B7355]"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-[#8B7355]"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-[#8B7355]"
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
        <div className="border-t border-[#2D5016]/10 bg-white px-4 py-4">
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 text-xs font-medium text-[#8B7355]">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(question)}
                  className="rounded-full border border-[#2D5016]/20 bg-[#FAF8F5] px-4 py-2 text-sm text-[#2D5016] transition-colors hover:border-[#E8A838] hover:bg-[#E8A838]/10"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-[#2D5016]/10 bg-white px-4 py-4">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-end gap-3">
            <div className="flex gap-2">
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF8F5] text-[#8B7355] transition-colors hover:bg-[#2D5016]/10"
                title="Upload image (coming soon)"
                disabled
              >
                <Camera className="h-5 w-5" />
              </button>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF8F5] text-[#8B7355] transition-colors hover:bg-[#2D5016]/10"
                title="Voice input (coming soon)"
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
                placeholder="Ask me anything about farming..."
                className="w-full resize-none rounded-2xl border border-[#2D5016]/20 bg-[#FAF8F5] px-4 py-3 pr-12 text-sm text-[#2D5016] placeholder-[#8B7355]/60 focus:border-[#E8A838] focus:outline-none focus:ring-1 focus:ring-[#E8A838]"
                rows={1}
              />
            </div>
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="h-10 w-10 rounded-full bg-[#2D5016] p-0 hover:bg-[#2D5016]/90 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-center text-xs text-[#8B7355]/60">
            AI responses are for guidance only. For critical issues, consult local experts.
          </p>
        </div>
      </div>
    </div>
  )
}
