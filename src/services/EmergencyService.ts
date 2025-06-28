import { Linking, Alert } from 'react-native';

export class EmergencyService {
  private static instance: EmergencyService;
  private emergencyNumber: string = '110'; // Número de emergencia en Bolivia

  private constructor() {}

  static getInstance(): EmergencyService {
    if (!EmergencyService.instance) {
      EmergencyService.instance = new EmergencyService();
    }
    return EmergencyService.instance;
  }

  async callEmergency(): Promise<void> {
    try {
      const url = `tel:${this.emergencyNumber}`;
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          'Error',
          'No se puede realizar la llamada. Por favor, marca manualmente el número de emergencia: ' + this.emergencyNumber
        );
      }
    } catch (error) {
      console.error('Error al realizar llamada de emergencia:', error);
      Alert.alert(
        'Error',
        'Hubo un problema al intentar llamar. Por favor, marca manualmente: ' + this.emergencyNumber
      );
    }
  }

  confirmAndCallEmergency(): void {
    Alert.alert(
      '🚨 Llamada de Emergencia',
      `¿Desea llamar al ${this.emergencyNumber} ahora?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Llamar',
          style: 'destructive',
          onPress: () => this.callEmergency(),
        },
      ],
      { cancelable: true }
    );
  }

  setEmergencyNumber(number: string): void {
    this.emergencyNumber = number;
  }

  getEmergencyNumber(): string {
    return this.emergencyNumber;
  }
}
