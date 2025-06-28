import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EmergencyStep } from '../types';
import { VoiceService } from '../services/VoiceService';
import { EmergencyButton } from './EmergencyButton';

interface EmergencyStepCardProps {
  step: EmergencyStep;
  totalSteps: number;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onQuestionAnswer: (optionId: string) => void;
  canGoBack: boolean;
}

export const EmergencyStepCard: React.FC<EmergencyStepCardProps> = ({
  step,
  totalSteps,
  onNextStep,
  onPreviousStep,
  onQuestionAnswer,
  canGoBack
}) => {
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const voiceService = VoiceService.getInstance();

  useEffect(() => {
    if (voiceEnabled) {
      // Pequeño delay para que la UI se renderice antes de hablar
      setTimeout(() => {
        voiceService.speak(step.voiceText);
      }, 500);
    }
  }, [step.id, voiceEnabled]);

  const toggleVoice = () => {
    const newState = !voiceEnabled;
    setVoiceEnabled(newState);
    voiceService.setEnabled(newState);
    
    if (newState) {
      voiceService.speak(step.voiceText);
    } else {
      voiceService.stop();
    }
  };

  const handleQuestionAnswer = (optionId: string) => {
    voiceService.speak('Perfecto, continuemos.');
    onQuestionAnswer(optionId);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header con progreso */}
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {step.isQuestion ? 'Evaluación' : `Paso ${step.stepNumber} de ${totalSteps}`}
          </Text>
          {!step.isQuestion && (
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(step.stepNumber / totalSteps) * 100}%` }
                ]} 
              />
            </View>
          )}
        </View>
        
        {/* Botón de voz */}
        <TouchableOpacity 
          style={[styles.voiceButton, !voiceEnabled && styles.voiceButtonDisabled]}
          onPress={toggleVoice}
        >
          <MaterialCommunityIcons 
            name={voiceEnabled ? "volume-high" : "volume-off"} 
            size={24} 
            color={voiceEnabled ? "#3498db" : "#95a5a6"} 
          />
        </TouchableOpacity>
      </View>

      {/* Mensaje de calma */}
      <View style={styles.calmMessage}>
        <Text style={styles.calmText}>
          Mantén la calma. Estás haciendo un gran trabajo. 💪
        </Text>
      </View>

      {/* Tarjeta principal del paso */}
      <View style={styles.stepCard}>
        <Text style={styles.stepTitle}>{step.title}</Text>
        <Text style={styles.stepInstruction}>{step.instruction}</Text>
        
        {/* Placeholder para imagen */}
        {step.image && (
          <View style={styles.imagePlaceholder}>
            <MaterialCommunityIcons name="image" size={40} color="#bdc3c7" />
            <Text style={styles.imageText}>Ilustración: {step.image}</Text>
          </View>
        )}

        {/* Opciones de pregunta */}
        {step.isQuestion && step.questionOptions && (
          <View style={styles.optionsContainer}>
            {step.questionOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionButton}
                onPress={() => handleQuestionAnswer(option.id)}
              >
                <Text style={styles.optionText}>{option.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Botones de navegación para pasos normales */}
        {!step.isQuestion && (
          <View style={styles.navigationButtons}>
            {canGoBack && (
              <TouchableOpacity
                style={[styles.navButton, styles.backButton]}
                onPress={onPreviousStep}
              >
                <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
                <Text style={styles.navButtonText}>Anterior</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={[styles.navButton, styles.nextButton]}
              onPress={onNextStep}
            >
              <Text style={styles.navButtonText}>Siguiente</Text>
              <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Botón de emergencia siempre visible */}
      <View style={styles.emergencyButtonContainer}>
        <EmergencyButton size="large" />
      </View>

      {/* Recordatorio importante */}
      <View style={styles.reminderCard}>
        <MaterialCommunityIcons name="alert-circle" size={24} color="#e74c3c" />
        <Text style={styles.reminderText}>
          Si aún no lo has hecho, llama al 110. La ayuda profesional está en camino.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  progressContainer: {
    flex: 1,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#ecf0f1',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 2,
  },
  voiceButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#ecf0f1',
  },
  voiceButtonDisabled: {
    backgroundColor: '#f8f9fa',
  },
  calmMessage: {
    backgroundColor: '#d5f4e6',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
  },
  calmText: {
    fontSize: 16,
    color: '#27ae60',
    fontWeight: '600',
    textAlign: 'center',
  },
  stepCard: {
    backgroundColor: 'white',
    margin: 20,
    padding: 25,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  stepInstruction: {
    fontSize: 18,
    color: '#34495e',
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    backgroundColor: '#f8f9fa',
    height: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ecf0f1',
    borderStyle: 'dashed',
  },
  imageText: {
    color: '#95a5a6',
    marginTop: 10,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: '#95a5a6',
  },
  nextButton: {
    backgroundColor: '#27ae60',
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 5,
  },
  emergencyButtonContainer: {
    margin: 20,
    alignItems: 'center',
  },
  reminderCard: {
    backgroundColor: '#ffeaa7',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#e17055',
  },
  reminderText: {
    flex: 1,
    fontSize: 14,
    color: '#d63031',
    fontWeight: '600',
    marginLeft: 10,
  },
});
