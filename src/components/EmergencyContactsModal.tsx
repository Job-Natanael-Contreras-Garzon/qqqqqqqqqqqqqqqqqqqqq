import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EmergencyService } from '../services/EmergencyService';

interface EmergencyContact {
  name: string;
  number: string;
  icon: string;
  description: string;
}

const emergencyContacts: EmergencyContact[] = [
  {
    name: 'Emergencias Generales',
    number: '110',
    icon: 'phone-alert',
    description: 'Policía, Bomberos, Ambulancia'
  },
  {
    name: 'Bomberos',
    number: '119',
    icon: 'fire-truck',
    description: 'Incendios y rescates'
  },
  {
    name: 'Cruz Roja',
    number: '165',
    icon: 'medical-bag',
    description: 'Emergencias médicas'
  },
  {
    name: 'Tránsito',
    number: '122',
    icon: 'car-emergency',
    description: 'Accidentes de tráfico'
  }
];

export const EmergencyContactsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const emergencyService = EmergencyService.getInstance();

  const callNumber = (number: string) => {
    emergencyService.setEmergencyNumber(number);
    emergencyService.callEmergency();
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <View style={styles.header}>
          <Text style={styles.title}>📞 Contactos de Emergencia</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={24} color="#7f8c8d" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.contactsList}>
          {emergencyContacts.map((contact, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contactCard}
              onPress={() => callNumber(contact.number)}
            >
              <View style={styles.contactIcon}>
                <MaterialCommunityIcons 
                  name={contact.icon as any} 
                  size={32} 
                  color="#e74c3c" 
                />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactNumber}>{contact.number}</Text>
                <Text style={styles.contactDescription}>{contact.description}</Text>
              </View>
              <MaterialCommunityIcons 
                name="chevron-right" 
                size={24} 
                color="#bdc3c7" 
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            💡 Toca cualquier número para llamar directamente
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  closeButton: {
    padding: 5,
  },
  contactsList: {
    maxHeight: 400,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  contactIcon: {
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 2,
  },
  contactNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 2,
  },
  contactDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  footer: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  footerText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
