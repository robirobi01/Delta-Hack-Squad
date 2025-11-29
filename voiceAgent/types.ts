export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: Date;
  isAudioPlaying?: boolean;
}

export enum AppState {
  IDLE = 'IDLE',
  LISTENING = 'LISTENING',
  PROCESSING = 'PROCESSING',
  SPEAKING = 'SPEAKING',
  ERROR = 'ERROR'
}

export interface WeatherData {
  temp: number;
  condition: string;
  location: string;
}

export const SUGGESTED_QUESTIONS = [
  "আজকের আবহাওয়া কেমন?",
  "আমার ধানের অবস্থা কী?",
  "গুদামে কী করব?",
  "কবে ধান কাটব?"
];