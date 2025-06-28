import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  View, 
  Vibration 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EmergencyService } from '../services/EmergencyService';

interface EmergencyButtonProps {
  style?: any;
  size?: 'small' | 'medium' | 'large';
}

export const EmergencyButton: React.FC<EmergencyButtonProps> = ({ 
  style, 
  size = 'medium' 
}) => {
  const emergencyService = EmergencyService.getInstance();

  const handlePress = () => {
    // Vibración para feedback háptico
    Vibration.vibrate(200);
    emergencyService.confirmAndCallEmergency();
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          button: { padding: 12, minHeight: 50 },
          icon: 24,
          text: { fontSize: 14 }
        };
      case 'large':
        return {
          button: { padding: 20, minHeight: 80 },
          icon: 40,
          text: { fontSize: 18, fontWeight: 'bold' as const }
        };
      default:
        return {
          button: { padding: 16, minHeight: 60 },
          icon: 32,
          text: { fontSize: 16, fontWeight: '600' as const }
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      style={[
        styles.emergencyButton,
        sizeStyles.button,
        style
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.buttonContent}>
        <MaterialCommunityIcons 
          name="phone" 
          size={sizeStyles.icon} 
          color="white" 
        />
        <Text style={[styles.buttonText, sizeStyles.text]}>
          Llamar 110
        </Text>
        <Text style={styles.emergencyText}>
          EMERGENCIA
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  emergencyButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#c0392b',
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
  emergencyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
    letterSpacing: 1,
  },
});
