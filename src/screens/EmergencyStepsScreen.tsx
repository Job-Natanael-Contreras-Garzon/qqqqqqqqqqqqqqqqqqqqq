import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  BackHandler
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { EmergencyStepCard } from '../components/EmergencyStepCard';
import { NavigationParams, EmergencyStep } from '../types';
import { emergencyGuides, getEmergencyStepById } from '../data/emergencyData';
import { VoiceService } from '../services/VoiceService';

type EmergencyStepsScreenNavigationProp = StackNavigationProp<
  NavigationParams,
  'EmergencySteps'
>;

type EmergencyStepsScreenRouteProp = RouteProp<
  NavigationParams,
  'EmergencySteps'
>;

interface EmergencyStepsScreenProps {
  navigation: EmergencyStepsScreenNavigationProp;
  route: EmergencyStepsScreenRouteProp;
}

export const EmergencyStepsScreen: React.FC<EmergencyStepsScreenProps> = ({
  navigation,
  route
}) => {
  const { guideId, currentStepId } = route.params;
  const [currentStep, setCurrentStep] = useState<EmergencyStep | null>(null);
  const [stepHistory, setStepHistory] = useState<string[]>([currentStepId]);
  const [guide, setGuide] = useState(emergencyGuides.find(g => g.id === guideId));
  
  const voiceService = VoiceService.getInstance();

  useEffect(() => {
    if (guide) {
      // Buscar el paso actual
      let step = getEmergencyStepById(guideId, currentStepId);
      
      // Si no se encuentra en los pasos normales, buscar en la pregunta inicial
      if (!step && guide.initialQuestion?.id === currentStepId) {
        step = guide.initialQuestion;
      }
      
      setCurrentStep(step || null);
    }
  }, [guideId, currentStepId, guide]);

  useEffect(() => {
    // Prevenir que el usuario salga accidentalmente durante una emergencia
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert(
        '¿Salir de la guía?',
        'Estás en medio de una emergencia. ¿Estás seguro de que quieres salir?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Salir',
            style: 'destructive',
            onPress: () => navigation.goBack(),
          },
        ]
      );
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const getNextStep = (): EmergencyStep | null => {
    if (!guide || !currentStep) return null;

    const currentIndex = guide.steps.findIndex(step => step.id === currentStep.id);
    
    if (currentIndex >= 0 && currentIndex < guide.steps.length - 1) {
      return guide.steps[currentIndex + 1];
    }
    
    return null;
  };

  const getPreviousStep = (): EmergencyStep | null => {
    if (stepHistory.length <= 1) return null;
    
    const previousStepId = stepHistory[stepHistory.length - 2];
    return getEmergencyStepById(guideId, previousStepId) || 
           (guide?.initialQuestion?.id === previousStepId ? guide.initialQuestion : null);
  };

  const handleNextStep = () => {
    const nextStep = getNextStep();
    
    if (nextStep) {
      navigateToStep(nextStep.id);
    } else {
      // Llegamos al final de la guía
      showPostCareInstructions();
    }
  };

  const handlePreviousStep = () => {
    if (stepHistory.length > 1) {
      const newHistory = [...stepHistory];
      newHistory.pop(); // Remover el paso actual
      const previousStepId = newHistory[newHistory.length - 1];
      
      setStepHistory(newHistory);
      navigation.setParams({
        guideId,
        currentStepId: previousStepId
      });
    }
  };

  const handleQuestionAnswer = (optionId: string) => {
    if (!currentStep?.questionOptions) return;

    const selectedOption = currentStep.questionOptions.find(opt => opt.id === optionId);
    
    if (selectedOption?.nextStepId) {
      navigateToStep(selectedOption.nextStepId);
    } else if (selectedOption?.nextFlow) {
      handleSpecialFlow(selectedOption.nextFlow);
    }
  };

  const navigateToStep = (stepId: string) => {
    setStepHistory(prev => [...prev, stepId]);
    navigation.setParams({
      guideId,
      currentStepId: stepId
    });
  };

  const handleSpecialFlow = (flowType: string) => {
    switch (flowType) {
      case 'mild_choking':
        voiceService.speak('Si la persona puede toser, anímala a seguir tosiendo. Vigila que no empeore.');
        showMildChokingInstructions();
        break;
      case 'post_care':
        showPostCareInstructions();
        break;
      default:
        console.warn('Flujo no reconocido:', flowType);
    }
  };

  const showMildChokingInstructions = () => {
    Alert.alert(
      '✅ Atragantamiento Leve',
      'La persona puede toser o hablar:\n\n• Anímala a seguir tosiendo\n• No golpees la espalda\n• Vigila que no empeore\n• Si no puede toser, vuelve a empezar',
      [
        {
          text: 'Empezar de nuevo',
          onPress: () => navigation.setParams({
            guideId,
            currentStepId: guide?.initialQuestion?.id || guide?.steps[0]?.id || ''
          })
        },
        {
          text: 'Finalizar',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const showPostCareInstructions = () => {
    const instructions = guide?.postCareInstructions || [];
    const instructionsText = instructions.map((inst, idx) => `${idx + 1}. ${inst}`).join('\n');

    voiceService.speak('¡Excelente trabajo! Has completado los primeros auxilios correctamente.');

    Alert.alert(
      '🎉 ¡Bien hecho!',
      `Has completado los primeros auxilios correctamente.\n\nCuidados posteriores:\n\n${instructionsText}\n\nRecuerda: La ayuda profesional debe evaluar a la persona.`,
      [
        {
          text: 'Nueva emergencia',
          onPress: () => navigation.navigate('EmergencyCategories')
        },
        {
          text: 'Finalizar',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  useEffect(() => {
    if (!currentStep) {
      Alert.alert(
        'Error',
        'No se pudo cargar la guía de emergencia. Por favor, llama al 110 inmediatamente.',
        [
          { text: 'Volver', onPress: () => navigation.goBack() }
        ]
      );
    }
  }, [currentStep, navigation]);

  if (!currentStep) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
        </View>
      </SafeAreaView>
    );
  }

  const totalSteps = guide?.steps.length || 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <EmergencyStepCard
        step={currentStep}
        totalSteps={totalSteps}
        onNextStep={handleNextStep}
        onPreviousStep={handlePreviousStep}
        onQuestionAnswer={handleQuestionAnswer}
        canGoBack={stepHistory.length > 1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
