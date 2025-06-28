import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Alert,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EmergencyCategoryCard } from '../components/EmergencyCategoryCard';
import { EmergencyButton } from '../components/EmergencyButton';
import { EmergencyContactsModal } from '../components/EmergencyContactsModal';
import { emergencyCategories, getEmergencyGuideByCategory } from '../data/emergencyData';
import { EmergencyCategory } from '../types';
import { VoiceService } from '../services/VoiceService';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationParams } from '../types';

const { width, height } = Dimensions.get('window');

type EmergencyCategoriesScreenNavigationProp = StackNavigationProp<
  NavigationParams,
  'EmergencyCategories'
>;

interface EmergencyCategoriesScreenProps {
  navigation: EmergencyCategoriesScreenNavigationProp;
}

export const EmergencyCategoriesScreen: React.FC<EmergencyCategoriesScreenProps> = ({
  navigation
}) => {
  const voiceService = VoiceService.getInstance();
  const [showContacts, setShowContacts] = useState(false);

  useEffect(() => {
    // Mensaje de bienvenida
    const welcomeMessage = 'Bienvenido a la guía de primeros auxilios. Selecciona el tipo de emergencia tocando una de las opciones.';
    setTimeout(() => {
      voiceService.speak(welcomeMessage);
    }, 1000);
  }, []);

  const handleCategoryPress = (category: EmergencyCategory) => {
    const guide = getEmergencyGuideByCategory(category.id);
    
    if (guide) {
      voiceService.speak(`Has seleccionado ${category.title}. Iniciando guía de primeros auxilios.`);
      
      navigation.navigate('EmergencySteps', {
        guideId: guide.id,
        currentStepId: guide.initialQuestion?.id || guide.steps[0]?.id || ''
      });
    } else {
      // Categoría no implementada aún
      voiceService.speak(`La guía de ${category.title} aún no está disponible. Por favor, llama a emergencias inmediatamente.`);
      
      // Navegar a pantalla de no implementado
      // Para este ejemplo, mostramos un alert
      setTimeout(() => {
        Alert.alert(
          `${category.title} - No Disponible`,
          'Esta guía aún no está implementada.\n\n🚨 IMPORTANTE: Para esta emergencia, llama al 110 inmediatamente y describe la situación al operador.',
          [
            {
              text: 'Llamar 110',
              style: 'destructive',
              onPress: () => {
                const emergencyService = require('../services/EmergencyService').EmergencyService.getInstance();
                emergencyService.callEmergency();
              }
            },
            {
              text: 'Entendido',
              style: 'default'
            }
          ]
        );
      }, 1000);
    }
  };

  const handleEmergencyCall = () => {
    const emergencyService = require('../services/EmergencyService').EmergencyService.getInstance();
    emergencyService.confirmAndCallEmergency();
  };

  const renderCategory = ({ item }: { item: EmergencyCategory }) => (
    <TouchableOpacity 
      style={styles.categoryCard}
      onPress={() => handleCategoryPress(item)}
      activeOpacity={0.8}
    >
      <View style={[styles.categoryContent, { backgroundColor: item.color }]}>
        {/* Ícono más centrado y compacto */}
        <View style={styles.categoryIllustration}>
          <MaterialCommunityIcons 
            name={item.icon as any} 
            size={32} 
            color="white" 
          />
        </View>
        <View style={styles.categoryTextContainer}>
          <Text style={styles.categoryTitle}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#1a1a1a', '#2d3436', '#636e72']}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AYUDA</Text>
        <Text style={styles.subtitle}>
          ¡Siempre estamos aquí para emergencias!
        </Text>
        <Text style={styles.subtitle}>
          ¡Toca para iniciar el protocolo de emergencia!
        </Text>
      </View>

      {/* Botón central de emergencia */}
      <View style={styles.emergencyButtonContainer}>
        <TouchableOpacity 
          style={styles.emergencyButton}
          onPress={handleEmergencyCall}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons 
            name="phone" 
            size={60} 
            color="white" 
          />
        </TouchableOpacity>
      </View>

      {/* Categorías en grid 3x2 */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Selecciona el tipo de emergencia</Text>
        <FlatList
          data={emergencyCategories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false}
          contentContainerStyle={styles.categoriesGrid}
        />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="home" size={24} color="#8e8e93" />
          <Text style={styles.navText}>Live</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="heart" size={24} color="#8e8e93" />
          <Text style={styles.navText}>Medic</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <View style={styles.micButton}>
            <MaterialCommunityIcons name="microphone" size={28} color="white" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="car" size={24} color="#8e8e93" />
          <Text style={styles.navText}>Vehicle</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setShowContacts(true)}
        >
          <MaterialCommunityIcons name="account" size={24} color="#8e8e93" />
          <Text style={styles.navText}>Contacts</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de contactos */}
      {showContacts && (
        <EmergencyContactsModal onClose={() => setShowContacts(false)} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 22,
    textAlign: 'left',
  },
  emergencyButtonContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  emergencyButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff4757',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ff4757',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  categoriesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  categoriesGrid: {
    paddingBottom: 20,
  },
  categoryCard: {
    width: (width - 80) / 3, // 3 columnas
    height: 100,
    marginHorizontal: 5,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  categoryContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  categoryIllustration: {
    marginBottom: 8,
  },
  categoryTextContainer: {
    alignSelf: 'center',
  },
  categoryTitle: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  navText: {
    fontSize: 12,
    color: '#8e8e93',
    marginTop: 4,
  },
  activeNavItem: {
    backgroundColor: 'transparent',
  },
  micButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff4757',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
