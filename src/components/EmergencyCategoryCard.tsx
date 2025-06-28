import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EmergencyCategory } from '../types';

interface EmergencyCategoryCardProps {
  category: EmergencyCategory;
  onPress: (category: EmergencyCategory) => void;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // 2 columnas con margen

export const EmergencyCategoryCard: React.FC<EmergencyCategoryCardProps> = ({
  category,
  onPress
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: category.color }]}
      onPress={() => onPress(category)}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={category.icon as any}
          size={50}
          color="white"
        />
      </View>
      <Text style={styles.title}>{category.title}</Text>
      <Text style={styles.description}>{category.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: 180,
    borderRadius: 20,
    padding: 15,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  iconContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 16,
  },
});
