import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import VoiceControls from './components/VoiceControls';
import { Message, AppState, SUGGESTED_QUESTIONS } from './types';
import { generateAgriResponse } from './services/geminiService';
import { VoiceRecognizer, speakText, stopSpeaking, isSpeechRecognitionSupported } from './services/speechUtils';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [messages, setMessages] = useState<Message[]>([]);
  const [transcript, setTranscript] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const recognizerRef = useRef<VoiceRecognizer | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    const greeting: Message = {
      id: 'init-1',
      role: 'assistant',
      text: 'নমস্কার! আমি কৃষি বন্ধু। আবহাওয়া, ধান বা ফসলের ব্যাপারে আমাকে প্রশ্ন করতে পারেন।',
      timestamp: new Date()
    };
    setMessages([greeting]);
    
    // Check support
    if (!isSpeechRecognitionSupported()) {
      setErrorMsg("আপনার ডিভাইসে সরাসরি ভয়েস সাপোর্ট নেই। দয়া করে কিবোর্ড ব্যবহার করুন।");
      setShowKeyboard(true);
    }
  }, []);

  const handleStartListening = () => {
    stopSpeaking(); // Stop any current TTS
    setTranscript('');
    setErrorMsg(null);
    
    // Initialize recognizer if not exists
    if (!recognizerRef.current) {
      recognizerRef.current = new VoiceRecognizer(
        // onResult
        (text, isFinal) => {
          setTranscript(text);
          if (isFinal) {
             // Small delay to allow user to see what they said
             setTimeout(() => handleUserSubmit(text), 500);
          }
        },
        // onEnd
        () => {
          if (appState === AppState.LISTENING) {
             // If stopped naturally without final result
             // Note: VoiceRecognizer logic usually handles final result via onResult.
             // This is mostly cleanup.
          }
        },
        // onError
        (err) => {
          setAppState(AppState.IDLE);
          setErrorMsg(err);
        }
      );
    }

    try {
      recognizerRef.current.start();
      setAppState(AppState.LISTENING);
    } catch (e) {
      console.error(e);
      setAppState(AppState.IDLE);
    }
  };

  const handleStopListening = () => {
    if (recognizerRef.current) {
      recognizerRef.current.stop();
    }
    // State will be updated by onResult (final) or onEnd
  };

  const handleCancel = () => {
    if (recognizerRef.current) recognizerRef.current.stop();
    stopSpeaking();
    setAppState(AppState.IDLE);
    setTranscript('');
  };

  const handleUserSubmit = async (text: string) => {
    if (!text.trim()) return;

    setAppState(AppState.PROCESSING);
    
    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);

    // Get AI Response
    const responseText = await generateAgriResponse(text);

    // Add Bot Message
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: responseText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMsg]);

    // Speak Response
    setAppState(AppState.SPEAKING);
    speakText(responseText, () => {
      setAppState(AppState.IDLE);
    });
  };

  const handleSuggestionClick = (text: string) => {
    handleUserSubmit(text);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 relative">
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 pb-48">
        
        {/* Error Banner */}
        {errorMsg && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-center">
            {errorMsg}
          </div>
        )}

        {/* Chat History */}
        <div className="space-y-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions (Suggestion Chips) - Show only if Idle or few messages */}
        {appState === AppState.IDLE && (
           <div className="mt-8">
             <h3 className="text-sm font-semibold text-slate-400 mb-3 ml-1 uppercase tracking-wider">দ্রুত প্রশ্ন (Quick Actions)</h3>
             <div className="flex flex-wrap gap-2">
               {SUGGESTED_QUESTIONS.map((q, idx) => (
                 <button
                   key={idx}
                   onClick={() => handleSuggestionClick(q)}
                   className="bg-white border border-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-green-50 hover:border-green-300 transition-colors active:scale-95"
                 >
                   {q}
                 </button>
               ))}
             </div>
           </div>
        )}
      </main>

      {/* Voice/Text Controls */}
      <VoiceControls 
        appState={appState}
        transcript={transcript}
        onStartListening={handleStartListening}
        onStopListening={handleStopListening}
        onCancelListening={handleCancel}
        onSendText={handleUserSubmit}
        onToggleKeyboard={() => setShowKeyboard(!showKeyboard)}
        showKeyboard={showKeyboard}
      />
    </div>
  );
}