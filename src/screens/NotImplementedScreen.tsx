import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EmergencyButton } from '../components/EmergencyButton';
import { VoiceService } from '../services/VoiceService';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationParams } from '../types';

type NotImplementedScreenNavigationProp = StackNavigationProp<
  NavigationParams,
  'EmergencyCategories'
>;

interface NotImplementedScreenProps {
  navigation: NotImplementedScreenNavigationProp;
  emergencyType: string;
}

export const NotImplementedScreen: React.FC<NotImplementedScreenProps> = ({
  navigation,
  emergencyType
}) => {
  const voiceService = VoiceService.getInstance();

  React.useEffect(() => {
    const message = `Esta guía de ${emergencyType} aún no está disponible. Por la complejidad de esta situación, es vital que llames a emergencias inmediatamente.`;
    voiceService.speak(message);
  }, [emergencyType]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Icono de advertencia */}
        <View style={styles.warningContainer}>
          <MaterialCommunityIcons 
            name="alert-circle-outline" 
            size={100} 
            color="#e74c3c" 
          />
        </View>

        {/* Título */}
        <Text style={styles.title}>Guía No Disponible</Text>
        <Text style={styles.subtitle}>
          La guía para {emergencyType} aún no está implementada
        </Text>

        {/* Mensaje principal */}
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            Por la complejidad de esta situación, o si tienes dudas, es vital que llames a emergencias.
          </Text>
        </View>

        {/* Instrucciones importantes */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>
            🚨 ACCIÓN INMEDIATA REQUERIDA:
          </Text>
          <Text style={styles.instructionText}>
            • Llama al 110 ahora mismo
          </Text>
          <Text style={styles.instructionText}>
            • Describe la situación al operador
          </Text>
          <Text style={styles.instructionText}>
            • Sigue las instrucciones del operador
          </Text>
          <Text style={styles.instructionText}>
            • Mantén la calma
          </Text>
        </View>

        {/* Botón de emergencia prominente */}
        <View style={styles.emergencyButtonContainer}>
          <EmergencyButton size="large" />
        </View>

        {/* Botones de navegación */}
        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate('EmergencyCategories')}
          >
            <MaterialCommunityIcons name="home" size={24} color="white" />
            <Text style={styles.buttonText}>Inicio</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
  },
  messageContainer: {
    backgroundColor: '#fff3cd',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  message: {
    fontSize: 16,
    color: '#856404',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '600',
  },
  instructionsContainer: {
    backgroundColor: '#f8d7da',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545',
    width: '100%',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#721c24',
    marginBottom: 15,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: '#721c24',
    marginBottom: 8,
    paddingLeft: 10,
  },
  emergencyButtonContainer: {
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  backButton: {
    backgroundColor: '#6c757d',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    flex: 0.45,
    justifyContent: 'center',
  },
  homeButton: {
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    flex: 0.45,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
