// Type definitions for Web Speech API which might be missing in some TS environments
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

// Browsers prefix handling
const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export const isSpeechRecognitionSupported = (): boolean => {
  return !!SpeechRecognition;
};

export const isSpeechSynthesisSupported = (): boolean => {
  return 'speechSynthesis' in window;
};

// --- Recognition Class ---

export class VoiceRecognizer {
  private recognition: any;
  private onResultCallback: (text: string, isFinal: boolean) => void;
  private onEndCallback: () => void;
  private onErrorCallback: (error: string) => void;

  constructor(
    onResult: (text: string, isFinal: boolean) => void,
    onEnd: () => void,
    onError: (error: string) => void
  ) {
    this.onResultCallback = onResult;
    this.onEndCallback = onEnd;
    this.onErrorCallback = onError;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'bn-BD'; // Bengali (Bangladesh)
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          this.onResultCallback(finalTranscript, true);
        } else if (interimTranscript) {
          this.onResultCallback(interimTranscript, false);
        }
      };

      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'no-speech') {
           this.onErrorCallback('কোনো কথা শোনা যায়নি। আবার চেষ্টা করুন।');
        } else if (event.error === 'not-allowed') {
           this.onErrorCallback('মাইক্রোফোন ব্যবহারের অনুমতি নেই।');
        } else {
           this.onErrorCallback('কথা বুঝতে সমস্যা হচ্ছে।');
        }
      };

      this.recognition.onend = () => {
        this.onEndCallback();
      };
    }
  }

  start() {
    if (this.recognition) {
      try {
        this.recognition.start();
      } catch (e) {
        console.warn("Recognition already started or error starting:", e);
      }
    } else {
      this.onErrorCallback("আপনার ব্রাউজারে ভয়েস সাপোর্ট নেই।");
    }
  }

  stop() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}

// --- Synthesis (TTS) Helper ---

export const speakText = (text: string, onEnd?: () => void) => {
  if (!isSpeechSynthesisSupported()) {
    if (onEnd) onEnd();
    return;
  }

  // Cancel any currently playing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Attempt to find a Bengali voice
  const voices = window.speechSynthesis.getVoices();
  const banglaVoice = voices.find(v => v.lang === 'bn-BD' || v.lang.includes('bn'));
  
  if (banglaVoice) {
    utterance.voice = banglaVoice;
  }
  
  // If no Bangla voice, it might use the default. 
  // Some browsers auto-detect language from text, some don't.
  utterance.lang = 'bn-BD';
  utterance.rate = 0.9; // Slightly slower for clarity
  utterance.pitch = 1.0;

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    console.error("TTS Error", e);
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
};