import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface EmergencyTimerProps {
  startTime: Date;
  isActive: boolean;
}

export const EmergencyTimer: React.FC<EmergencyTimerProps> = ({ 
  startTime, 
  isActive 
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, startTime]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isActive) return null;

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="timer" size={16} color="#e74c3c" />
      <Text style={styles.timeText}>{formatTime(elapsedTime)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginLeft: 5,
  },
});
