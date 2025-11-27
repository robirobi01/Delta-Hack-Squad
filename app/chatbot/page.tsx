"use client"

import { useEdgeRuntime } from "@assistant-ui/react-ai-sdk";
import {
  AssistantRuntimeProvider,
  useThread,
  useComposer,
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive
} from "@assistant-ui/react";
import Link from "next/link";
import { ArrowLeft, Bot, Sparkles, Lightbulb, User, Camera, Mic, Send, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import "@assistant-ui/react/styles/index.css";

// Custom Message Component to match existing UI
const CustomMessage = ({ message }: { message: any }) => {
  return (
    <MessagePrimitive.Root message={message} className="flex w-full flex-col gap-2 py-4">
      <div className={`flex items-start gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${message.role === "user" ? "bg-amber-500" : "bg-emerald-600"}`}>
          {message.role === "user" ? (
            <User className="h-4 w-4 text-white" />
          ) : (
            <Bot className="h-4 w-4 text-white" />
          )}
        </div>

        <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === "user" ? "bg-amber-500 text-white" : "bg-white border border-emerald-100 text-emerald-800"}`}>
          <MessagePrimitive.Content />
          {/* Render attachments if any (for user messages) */}
          {message.attachments?.map((attachment: any, index: number) => (
            <div key={index} className="mt-2">
              {attachment.type === "image" && (
                <img src={attachment.content} alt="attachment" className="max-w-full rounded-lg" />
              )}
            </div>
          ))}
        </div>
      </div>
    </MessagePrimitive.Root>
  );
};

// Custom Composer to match existing UI
const CustomComposer = ({ isEn }: { isEn: boolean }) => {
  const composer = useComposer();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      composer.addAttachment(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <ComposerPrimitive.Root className="flex w-full flex-col gap-2">
      {/* Attachment Preview */}
      {composer.attachments.length > 0 && (
        <div className="flex gap-2 px-4 pb-2">
          {composer.attachments.map((attachment, index) => (
            <div key={index} className="relative h-16 w-16 overflow-hidden rounded-lg border border-emerald-200 bg-white">
              {attachment.file && (
                <img
                  src={URL.createObjectURL(attachment.file)}
                  alt="preview"
                  className="h-full w-full object-cover"
                  onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                />
              )}
              <button
                onClick={() => composer.removeAttachment(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-3 bg-white px-4 py-4 border-t border-emerald-100">
        <div className="flex gap-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button
            onClick={handleFileClick}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-gray-500 transition-colors hover:bg-emerald-100"
            title={isEn ? "Upload image" : "ছবি আপলোড করুন"}
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
          <ComposerPrimitive.Input
            placeholder={isEn ? "Ask me anything about farming..." : "কৃষি সম্পর্কে যেকোনো কিছু জিজ্ঞাসা করুন..."}
            className="w-full resize-none rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 pr-12 text-sm text-emerald-800 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            rows={1}
          />
        </div>
        <ComposerPrimitive.Send asChild>
          <Button
            className="h-10 w-10 rounded-full bg-emerald-600 p-0 hover:bg-emerald-700 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </Button>
        </ComposerPrimitive.Send>
      </div>
    </ComposerPrimitive.Root>
  );
};

const ChatInterface = () => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const { messages } = useThread();

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
                  {isEn ? "Online • Gemini 1.5 Flash" : "অনলাইন • জেমিনি ১.৫ ফ্ল্যাশ"}
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
      <div className="bg-amber-100 px-4 py-2 text-center">
        <p className="text-sm text-amber-800">
          <Lightbulb className="mr-1 inline-block h-4 w-4 text-amber-600" />
          <strong>{isEn ? "AI Mode:" : "এআই মোড:"}</strong>{" "}
          {isEn
            ? "Ask anything about farming, weather, or prices! You can also upload images."
            : "কৃষি, আবহাওয়া বা দাম সম্পর্কে যেকোনো কিছু জিজ্ঞাসা করুন! আপনি ছবিও আপলোড করতে পারেন।"}
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-6">
          {messages.map((m) => (
            <CustomMessage key={m.id} message={m} />
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="mx-auto w-full max-w-4xl">
        <CustomComposer isEn={isEn} />
      </div>
    </div>
  );
};

export default function ChatbotPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const runtime = useEdgeRuntime({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: isEn
          ? "I'm your AI farming assistant! I can help you with:\n\n• Post-harvest storage advice\n• Weather-related questions\n• Pest and disease identification\n• Crop management tips\n• Market timing guidance\n\nWhat would you like to know?"
          : "আমি আপনার এআই কৃষি সহকারী! আমি আপনাকে সাহায্য করতে পারি:\n\n• ফসল পরবর্তী সংরক্ষণ পরামর্শ\n• আবহাওয়া সম্পর্কিত প্রশ্ন\n• কীটপতঙ্গ এবং রোগ সনাক্তকরণ\n• ফসল ব্যবস্থাপনা টিপস\n• বাজার সময় নির্দেশিকা\n\nআপনি কী জানতে চান?"
      }
    ]
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <ChatInterface />
    </AssistantRuntimeProvider>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Loader } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  image?: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(
    [
      {
        id: '1',
        text: 'Hello! I\'m your farming assistant. How can I help you today? You can ask me questions or share images related to farming.',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]
  );
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const GEMINI_API_KEY = 'AIzaSyDcNpWmdbWgKo9oRvXls8wewXsUAfL24ok';
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
    });
  };

  const getMimeType = (file: File): string => {
    const mimeType = file.type;
    if (mimeType.startsWith('image/')) {
      return mimeType;
    }
    return 'image/jpeg';
  };

  const sendMessageToGemini = async (text: string, imageBase64?: string) => {
    try {
      setIsLoading(true);

      const requestBody: any = {
        contents: [
          {
            parts: [],
          },
        ],
      };

      if (text.trim()) {
        requestBody.contents[0].parts.push({
          text: text,
        });
      }

      if (imageBase64) {
        requestBody.contents[0].parts.push({
          inlineData: {
            mimeType: 'image/jpeg',
            data: imageBase64,
          },
        });
      }

      const response = await fetch(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I couldn\'t process that. Please try again.';

      const botMessage: Message = {
        id: Date.now().toString(),
        text: botReply,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'Sorry, there was an error processing your request. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputText.trim() && !selectedImage) {
      return;
    }

    let imageBase64: string | undefined;
    if (selectedImage) {
      const base64Data = selectedImage.split(',')[1];
      imageBase64 = base64Data;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      image: selectedImage || undefined,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setSelectedImage(null);

    await sendMessageToGemini(inputText, imageBase64);
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await convertImageToBase64(file);
        setSelectedImage(`data:${file.type};base64,${base64}`);
      } catch (error) {
        console.error('Error converting image:', error);
      }
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">🌾 Farming Assistant</h1>
          <p className="text-green-100 text-sm mt-1">Get instant help with farming questions and image analysis</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md rounded-lg px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-md'
              }`}
            >
              {message.image && (
                <div className="mb-2 rounded overflow-hidden">
                  <img
                    src={message.image}
                    alt="User uploaded"
                    className="max-w-full h-auto max-h-48"
                  />
                </div>
              )}
              <p className="text-sm leading-relaxed">{message.text}</p>
              <span
                className={`text-xs mt-2 block ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border border-gray-200 rounded-lg rounded-bl-none shadow-md px-4 py-3">
              <div className="flex items-center space-x-2">
                <Loader className="w-4 h-4 animate-spin text-green-600" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {selectedImage && (
            <div className="mb-4 flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
              <img
                src={selectedImage}
                alt="Selected"
                className="h-16 w-16 object-cover rounded"
              />
              <span className="text-sm text-gray-600 flex-1">Image selected</span>
              <button
                onClick={handleRemoveImage}
                className="text-red-600 hover:text-red-800 font-semibold text-sm"
              >
                Remove
              </button>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="flex-shrink-0 bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              title="Upload image"
            >
              <ImageIcon className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about farming, pest control, crops..."
              disabled={isLoading}
              className="flex-1 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={isLoading || (!inputText.trim() && !selectedImage)}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white p-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
