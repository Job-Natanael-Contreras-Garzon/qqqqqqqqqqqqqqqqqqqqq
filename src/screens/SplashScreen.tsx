import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationParams } from '../types';

type SplashScreenNavigationProp = StackNavigationProp<
  NavigationParams,
  'Home'
>;

interface SplashScreenProps {
  navigation: SplashScreenNavigationProp;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    // Simular carga de recursos y navegación automática
    const timer = setTimeout(() => {
      navigation.replace('EmergencyCategories');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#e74c3c" />
      
      <View style={styles.content}>
        {/* Logo/Icon */}
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons 
            name="medical-bag" 
            size={100} 
            color="white" 
          />
        </View>

        {/* Título */}
        <Text style={styles.title}>Primeros Auxilios</Text>
        <Text style={styles.subtitle}>Guía de emergencias en tus manos</Text>

        {/* Mensaje importante */}
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            En casos graves, siempre llama al 110 primero
          </Text>
        </View>

        {/* Loading indicator */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.loadingText}>Cargando recursos...</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Esta app no reemplaza la atención médica profesional
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e74c3c',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  iconContainer: {
    marginBottom: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 30,
    borderRadius: 75,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 40,
  },
  messageContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 50,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  message: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 15,
    fontSize: 16,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
