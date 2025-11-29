import React, { useState, useEffect } from 'react';
import { AppState } from '../types';
import { Mic, MicOff, Send, X, Keyboard } from 'lucide-react';

interface VoiceControlsProps {
  appState: AppState;
  transcript: string;
  onStartListening: () => void;
  onStopListening: () => void;
  onCancelListening: () => void;
  onSendText: (text: string) => void;
  onToggleKeyboard: () => void;
  showKeyboard: boolean;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({
  appState,
  transcript,
  onStartListening,
  onStopListening,
  onCancelListening,
  onSendText,
  onToggleKeyboard,
  showKeyboard
}) => {
  const [inputText, setInputText] = useState('');

  // Sync transcript to input when listening
  useEffect(() => {
    if (appState === AppState.LISTENING) {
      setInputText(transcript);
    }
  }, [transcript, appState]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendText(inputText);
      setInputText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  // State-based styling
  const isListening = appState === AppState.LISTENING;
  const isProcessing = appState === AppState.PROCESSING;
  const isSpeaking = appState === AppState.SPEAKING;

  if (showKeyboard) {
    return (
      <div className="bg-white border-t p-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20">
        <div className="flex items-center gap-2">
           <button 
             onClick={onToggleKeyboard}
             className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
           >
             <Mic size={24} />
           </button>
           <input
             type="text"
             value={inputText}
             onChange={(e) => setInputText(e.target.value)}
             onKeyDown={handleKeyDown}
             placeholder="এখানে আপনার প্রশ্ন লিখুন..."
             className="flex-1 border border-slate-300 rounded-full px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
             autoFocus
           />
           <button 
             onClick={handleSend}
             disabled={!inputText.trim() || isProcessing}
             className="p-3 rounded-full bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
           >
             <Send size={24} />
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center justify-end pointer-events-none z-20">
      
      {/* Live Transcript Bubble */}
      {isListening && transcript && (
        <div className="mb-6 bg-slate-900/80 backdrop-blur-sm text-white px-6 py-3 rounded-2xl max-w-[90%] text-center text-lg animate-fade-in pointer-events-auto">
          "{transcript}"
        </div>
      )}

      {/* Main Control Bar */}
      <div className="pointer-events-auto flex items-center gap-6">
        
        {/* Keyboard Toggle */}
        <button 
          onClick={onToggleKeyboard}
          className="p-4 bg-white text-slate-600 rounded-full shadow-lg hover:bg-slate-50 transition-transform active:scale-95"
          title="লিখুন"
        >
          <Keyboard size={24} />
        </button>

        {/* Main Microphone Button */}
        <div className="relative">
          {isListening && (
             <div className="absolute inset-0 rounded-full bg-green-500 animate-ripple -z-10"></div>
          )}
          
          <button
            onClick={isListening ? onStopListening : onStartListening}
            disabled={isProcessing || isSpeaking}
            className={`
              w-20 h-20 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300
              ${isListening ? 'bg-red-500 hover:bg-red-600 scale-110' : 'bg-green-600 hover:bg-green-700'}
              ${(isProcessing || isSpeaking) ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isListening ? (
              <MicOff size={32} className="text-white" />
            ) : (
              <Mic size={32} className="text-white" />
            )}
          </button>
        </div>

        {/* Cancel/Reset (only visible if active) */}
        <button 
          onClick={onCancelListening}
          disabled={!isListening && !isProcessing && !isSpeaking}
          className={`
            p-4 bg-white text-red-500 rounded-full shadow-lg hover:bg-slate-50 transition-all active:scale-95
            ${(!isListening && !isProcessing && !isSpeaking) ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'}
          `}
          title="বন্ধ করুন"
        >
          <X size={24} />
        </button>

      </div>

      {/* Status Label */}
      <div className="mt-4 h-6 text-sm font-semibold text-slate-500 uppercase tracking-widest pointer-events-auto">
        {isListening && <span className="text-green-600 animate-pulse">শোনা হচ্ছে... (Listening)</span>}
        {isProcessing && <span className="text-blue-600 animate-pulse">ভাবা হচ্ছে... (Processing)</span>}
        {isSpeaking && <span className="text-orange-600 animate-pulse">বলা হচ্ছে... (Speaking)</span>}
        {!isListening && !isProcessing && !isSpeaking && <span>কথা বলতে বাটন চাপুন</span>}
      </div>
    </div>
  );
};

export default VoiceControls;