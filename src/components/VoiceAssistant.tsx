import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, X, Volume2, Loader2 } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { useAuth } from '@/lib/auth-context';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = 'AIzaSyBkCBvWrFLXZbWuQYTmYdJqQnXlJKpTqFM';

export function VoiceAssistant() {
    const { language } = useLanguage();
    const { user } = useAuth();
    const isEn = language === 'en';

    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');

    const [textInput, setTextInput] = useState('');

    const suggestedQuestions = [
        "আজকের আবহাওয়া?",
        "আমার ধানের অবস্থা?",
        "গুদামে কী করব?",
        "কবে কাটব?"
    ];

    const recognitionRef = useRef<any>(null);
    const synthRef = useRef<SpeechSynthesis | null>(null);

    useEffect(() => {
        // Initialize speech synthesis
        synthRef.current = window.speechSynthesis;

        // Initialize speech recognition
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'bn-BD'; // Bangla language

            recognitionRef.current.onresult = async (event: any) => {
                const speechResult = event.results[0][0].transcript;
                setTranscript(speechResult);
                setIsListening(false);

                // Process the question
                await processQuestion(speechResult);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            if (synthRef.current) {
                synthRef.current.cancel();
            }
        };
    }, []);

    const startListening = () => {
        if (recognitionRef.current) {
            setTranscript('');
            setResponse('');
            setIsListening(true);
            recognitionRef.current.start();
        } else {
            alert(isEn ? 'Speech recognition not supported in this browser' : 'এই ব্রাউজারে ভয়েস রিকগনিশন সমর্থিত নয়');
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    const handleTextSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!textInput.trim()) return;

        setTranscript(textInput);
        await processQuestion(textInput);
        setTextInput('');
    };

    const processQuestion = async (question: string) => {
        setIsProcessing(true);

        try {
            // Get user context
            const isLoggedIn = !!user;

            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            let systemContext = `You are a friendly agricultural expert for Bangladeshi farmers.
            Current Context:
            - Location: Bangladesh
            - Season: Late Autumn (Agrahayan)
            `;

            if (!isLoggedIn) {
                systemContext += `\nUser is NOT logged in. If they ask about their specific crops/weather, politely advise them to log in first.`;
            } else {
                systemContext += `\nUser IS logged in. If they ask about specific crops, tell them to check the Dashboard for detailed analysis.`;
            }

            const prompt = `${systemContext}
            
            User Question: "${question}"
            
            Instructions:
            1. Answer in spoken Bangla (Bengali).
            2. Keep it concise (2-3 sentences).
            3. If they ask about THEIR crops/weather and data is missing, politely ask them to add crops/check dashboard.
            4. For general questions, give general advice.
            
            Answer in Bangla script.`;

            const result = await model.generateContent(prompt);
            const answer = result.response.text();

            setResponse(answer);
            speakText(answer);

        } catch (error: any) {
            console.error('Error processing question:', error);

            // Fallback/Demo mode if API fails
            const fallbackAnswer = getFallbackAnswer(question);
            if (fallbackAnswer) {
                setResponse(fallbackAnswer + " (অফলাইন মোড)");
                speakText(fallbackAnswer);
            } else {
                let errorDetail = error.message || 'Unknown error';
                if (errorDetail.includes('API key')) errorDetail = 'API Key Invalid';

                const errorMsg = `দুঃখিত, সংযোগে সমস্যা হচ্ছে (${errorDetail})।`;
                setResponse(errorMsg);
                speakText('দুঃখিত, একটি সমস্যা হয়েছে।');
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const getFallbackAnswer = (question: string): string | null => {
        const q = question.toLowerCase();
        if (q.includes('আবহাওয়া') || q.includes('weather')) {
            return "আজকের আকাশ আংশিক মেঘলা, তাপমাত্রা ৩০ ডিগ্রি সেলসিয়াস। বিকেলে হালকা বৃষ্টির সম্ভাবনা আছে।";
        }
        if (q.includes('ধান') || q.includes('rice') || q.includes('অবস্থা')) {
            return "আপনার ধানের বৃদ্ধি স্বাভাবিক মনে হচ্ছে। তবে পাতায় কোনো দাগ আছে কিনা খেয়াল রাখুন।";
        }
        if (q.includes('গুদাম') || q.includes('storage') || q.includes('store')) {
            return "গুদাম ঘরটি শুকনো ও পরিষ্কার রাখুন। ধানের বস্তা মাচা বা পলেটের উপর রাখুন।";
        }
        if (q.includes('কাটব') || q.includes('harvest') || q.includes('সময়')) {
            return "ধানের শীষের ৮০% সোনালী রঙ ধারণ করলে ধান কাটার উপযুক্ত সময়।";
        }
        return null;
    };

    const speakText = (text: string) => {
        if (synthRef.current) {
            // Cancel any ongoing speech
            synthRef.current.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'bn-BD';
            utterance.rate = 0.9;
            utterance.pitch = 1;

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            synthRef.current.speak(utterance);
        }
    };

    const stopSpeaking = () => {
        if (synthRef.current) {
            synthRef.current.cancel();
            setIsSpeaking(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-2xl transition-all hover:scale-110 hover:shadow-emerald-500/50 active:scale-95"
                    aria-label="Ask Question"
                >
                    <div className="relative">
                        <Mic className="h-7 w-7" />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75"></span>
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400"></span>
                        </span>
                    </div>
                </button>
            )}

            {/* Voice Assistant Modal */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-96 rounded-2xl border border-emerald-100 bg-white shadow-2xl flex flex-col max-h-[80vh]">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-emerald-100 bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 rounded-t-2xl shrink-0">
                        <div className="flex items-center gap-2">
                            <Mic className="h-5 w-5 text-white" />
                            <h3 className="font-semibold text-white">
                                {isEn ? 'Ask Question' : 'প্রশ্ন করুন'}
                            </h3>
                        </div>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                stopListening();
                                stopSpeaking();
                            }}
                            className="rounded-full p-1 text-white hover:bg-white/20 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4 overflow-y-auto grow">
                        {/* Instructions */}
                        <p className="text-sm text-gray-600 text-center">
                            {isEn
                                ? 'Click the microphone to ask your question in Bangla'
                                : 'বাংলায় প্রশ্ন করতে মাইক্রোফোনে ক্লিক করুন'}
                        </p>

                        {/* Microphone Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={isListening ? stopListening : startListening}
                                disabled={isProcessing || isSpeaking}
                                className={`flex h-20 w-20 items-center justify-center rounded-full transition-all ${isListening
                                    ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                                    : 'bg-emerald-500 hover:bg-emerald-600'
                                    } text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {isListening ? (
                                    <MicOff className="h-10 w-10" />
                                ) : (
                                    <Mic className="h-10 w-10" />
                                )}
                            </button>
                        </div>

                        {/* Status */}
                        {isListening && (
                            <p className="text-center text-sm font-medium text-red-600 animate-pulse">
                                {isEn ? 'Listening...' : 'শুনছি...'}
                            </p>
                        )}

                        {isProcessing && (
                            <div className="flex items-center justify-center gap-2 text-emerald-600">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <p className="text-sm font-medium">
                                    {isEn ? 'Processing...' : 'প্রক্রিয়া করা হচ্ছে...'}
                                </p>
                            </div>
                        )}

                        {/* Suggested Questions */}
                        {!transcript && !response && (
                            <div className="space-y-2">
                                <p className="text-xs font-medium text-gray-500 text-center">
                                    {isEn ? 'Suggested Questions:' : 'প্রস্তাবিত প্রশ্ন:'}
                                </p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {suggestedQuestions.map((q, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                setTranscript(q);
                                                processQuestion(q);
                                            }}
                                            className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100 hover:bg-emerald-100 transition-colors"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Transcript */}
                        {transcript && (
                            <div className="rounded-lg bg-emerald-50 p-3 border border-emerald-200">
                                <p className="text-xs font-semibold text-emerald-700 mb-1">
                                    {isEn ? 'Your Question:' : 'আপনার প্রশ্ন:'}
                                </p>
                                <p className="text-sm text-gray-800">{transcript}</p>
                            </div>
                        )}

                        {/* Response */}
                        {response && (
                            <div className="rounded-lg bg-amber-50 p-3 border border-amber-200">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-xs font-semibold text-amber-700">
                                        {isEn ? 'Answer:' : 'উত্তর:'}
                                    </p>
                                    {isSpeaking && (
                                        <Volume2 className="h-4 w-4 text-amber-600 animate-pulse" />
                                    )}
                                </div>
                                <p className="text-sm text-gray-800 leading-relaxed">{response}</p>
                            </div>
                        )}
                    </div>

                    {/* Footer / Text Input Fallback */}
                    <div className="border-t border-emerald-100 bg-gray-50 px-4 py-3 rounded-b-2xl shrink-0">
                        <form onSubmit={handleTextSubmit} className="flex gap-2">
                            <input
                                type="text"
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                                placeholder={isEn ? "Or type your question..." : "অথবা আপনার প্রশ্ন লিখুন..."}
                                className="flex-1 text-sm rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                            />
                            <button
                                type="submit"
                                disabled={!textInput.trim() || isProcessing}
                                className="bg-emerald-600 text-white rounded-full p-2 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
