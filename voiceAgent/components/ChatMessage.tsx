import React from 'react';
import { Message } from '../types';
import { User, Bot, Volume2 } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
        
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 
          ${isUser ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>

        {/* Bubble */}
        <div className={`px-4 py-3 rounded-2xl shadow-sm text-base leading-relaxed relative
          ${isUser 
            ? 'bg-green-600 text-white rounded-br-none' 
            : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
          }`}>
          {message.text}
          
          {/* Audio Indicator for Assistant */}
          {!isUser && (
             <div className="absolute -top-2 -right-2 bg-orange-100 text-orange-600 p-1 rounded-full shadow-sm">
                <Volume2 size={12} />
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;