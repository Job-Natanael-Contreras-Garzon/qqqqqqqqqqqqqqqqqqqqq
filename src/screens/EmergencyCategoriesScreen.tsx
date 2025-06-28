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
  Dimensions,
  Modal, 
  ImageBackground} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EmergencyContactsModal } from '../components/EmergencyContactsModal';
import { emergencyCategories, getEmergencyGuideByCategory } from '../data/emergencyData';
import { EmergencyCategory } from '../types';
import { VoiceService } from '../services/VoiceService';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationParams } from '../types';

const { width, height } = Dimensions.get('window');

interface EmergencyCard extends EmergencyCategory {
  image: any;
}

const emergencyCards: EmergencyCard[] = emergencyCategories.map(category => ({
  ...category,
  image: require('../../assets/placeholder.png')
}));

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
  const [isListeningModalVisible, setListeningModalVisible] = useState(false);

  useEffect(() => {
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
      voiceService.speak(`La guía de ${category.title} aún no está disponible. Por favor, llama a emergencias inmediatamente.`);
      
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

  const renderCategory = ({ item }: { item: EmergencyCard }) => (
    <TouchableOpacity 
      style={styles.categoryCard}
      onPress={() => handleCategoryPress(item)}
      activeOpacity={0.8}
    >
      <ImageBackground source={item.image} style={styles.cardBackground}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.cardOverlay}
        />
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>EMERGENCIA</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#2c2c2c', '#1a1a1a']} style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>AYUDA</Text>
          <Text style={styles.subtitle}>
            ¡Siempre estamos aquí para emergencias!{`\n`}¡Toca para iniciar el protocolo de emergencia!
          </Text>
        </View>

        <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyCall}>
          <MaterialCommunityIcons name="phone" size={60} color="white" />
        </TouchableOpacity>

        <FlatList
          data={emergencyCards}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sliderContainer}
        />

        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <MaterialCommunityIcons name="home-variant" size={28} color="#e94e4e" />
            <Text style={[styles.navText, { color: '#e94e4e' }]}>Emergencia</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem} onPress={() => setListeningModalVisible(true)}>
            <View style={styles.micButton}>
              <MaterialCommunityIcons name="microphone" size={32} color="white" />
            </View>
            <Text style={styles.navText}>Asistente</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            <MaterialCommunityIcons name="view-dashboard" size={28} color="#8e8e93" />
            <Text style={styles.navText}>Dashboard</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isListeningModalVisible}
        onRequestClose={() => setListeningModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setListeningModalVisible(false)}>
              <MaterialCommunityIcons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}><MaterialCommunityIcons name="microphone" size={24} color="#e94e4e" /> Escuchando...</Text>
            <Text style={styles.modalSubtitle}>Describe tu emergencia</Text>
            <Text style={styles.modalDescription}>Explica claramente qué está pasando para poder ayudarte mejor.</Text>
            <View style={styles.exampleContainer}>
              <Text style={styles.exampleText}>Ejemplo: 'Mi hijo se está asfixiando' o 'Me corté profundamente la mano'.</Text>
            </View>
            <TouchableOpacity style={styles.sendMessageButton}>
              <MaterialCommunityIcons name="send" size={24} color="white" />
              <Text style={styles.sendMessageText}>Enviar mensaje</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {showContacts && (
        <EmergencyContactsModal onClose={() => setShowContacts(false)} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
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
    textAlign: 'center',
    lineHeight: 22,
  },
  emergencyButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e94e4e',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 30,
    shadowColor: '#e94e4e',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  sliderContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    height: 220,
  },
  categoryCard: {
    width: width * 0.4,
    height: 200,
    borderRadius: 16,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  cardBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 15,
  },
  cardSubtitle: {
    color: '#e94e4e',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#2c2c2c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#8e8e93',
    marginTop: 4,
  },
  micButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e94e4e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#2c2c2c',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 20,
  },
  exampleContainer: {
    backgroundColor: '#3a3a3a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '100%',
  },
  exampleText: {
    fontSize: 14,
    color: 'white',
    fontStyle: 'italic',
  },
  sendMessageButton: {
    flexDirection: 'row',
    backgroundColor: '#e94e4e',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
  },
  sendMessageText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
