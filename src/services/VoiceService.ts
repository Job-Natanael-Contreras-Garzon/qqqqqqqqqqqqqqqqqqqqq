import * as Speech from 'expo-speech';

export class VoiceService {
  private static instance: VoiceService;
  private isEnabled: boolean = true;

  private constructor() {}

  static getInstance(): VoiceService {
    if (!VoiceService.instance) {
      VoiceService.instance = new VoiceService();
    }
    return VoiceService.instance;
  }

  async speak(text: string, options?: {
    language?: string;
    pitch?: number;
    rate?: number;
  }): Promise<void> {
    if (!this.isEnabled) return;

    try {
      // Detener cualquier speech en progreso
      Speech.stop();
      
      await Speech.speak(text, {
        language: options?.language || 'es-ES',
        pitch: options?.pitch || 1.0,
        rate: options?.rate || 0.8, // Un poco más lento para emergencias
        voice: undefined, // Usar voz por defecto del sistema
      });
    } catch (error) {
      console.warn('Error al reproducir voz:', error);
    }
  }

  stop(): void {
    Speech.stop();
  }

  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    if (!enabled) {
      this.stop();
    }
  }

  isVoiceEnabled(): boolean {
    return this.isEnabled;
  }

  async getAvailableVoices(): Promise<Speech.Voice[]> {
    try {
      return await Speech.getAvailableVoicesAsync();
    } catch (error) {
      console.warn('Error al obtener voces disponibles:', error);
      return [];
    }
  }
}
