import { useState, useEffect } from 'react';
import { VoiceService } from '../services/VoiceService';

export const useVoice = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const voiceService = VoiceService.getInstance();

  useEffect(() => {
    voiceService.setEnabled(isEnabled);
  }, [isEnabled]);

  const speak = (text: string, options?: {
    language?: string;
    pitch?: number;
    rate?: number;
  }) => {
    if (isEnabled) {
      voiceService.speak(text, options);
    }
  };

  const stop = () => {
    voiceService.stop();
  };

  const toggle = () => {
    setIsEnabled(!isEnabled);
  };

  return {
    isEnabled,
    speak,
    stop,
    toggle,
    setEnabled: setIsEnabled
  };
};
