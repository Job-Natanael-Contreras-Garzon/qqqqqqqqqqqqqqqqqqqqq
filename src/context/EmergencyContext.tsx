import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EmergencyCategory, EmergencyGuide } from '../types';

interface EmergencyContextType {
  currentEmergency: EmergencyCategory | null;
  currentGuide: EmergencyGuide | null;
  emergencyStartTime: Date | null;
  isInEmergency: boolean;
  setCurrentEmergency: (category: EmergencyCategory | null) => void;
  setCurrentGuide: (guide: EmergencyGuide | null) => void;
  startEmergency: (category: EmergencyCategory, guide: EmergencyGuide) => void;
  endEmergency: () => void;
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

interface EmergencyProviderProps {
  children: ReactNode;
}

export const EmergencyProvider: React.FC<EmergencyProviderProps> = ({ children }) => {
  const [currentEmergency, setCurrentEmergency] = useState<EmergencyCategory | null>(null);
  const [currentGuide, setCurrentGuide] = useState<EmergencyGuide | null>(null);
  const [emergencyStartTime, setEmergencyStartTime] = useState<Date | null>(null);

  const isInEmergency = currentEmergency !== null && currentGuide !== null;

  const startEmergency = (category: EmergencyCategory, guide: EmergencyGuide) => {
    setCurrentEmergency(category);
    setCurrentGuide(guide);
    setEmergencyStartTime(new Date());
  };

  const endEmergency = () => {
    setCurrentEmergency(null);
    setCurrentGuide(null);
    setEmergencyStartTime(null);
  };

  const value: EmergencyContextType = {
    currentEmergency,
    currentGuide,
    emergencyStartTime,
    isInEmergency,
    setCurrentEmergency,
    setCurrentGuide,
    startEmergency,
    endEmergency,
  };

  return (
    <EmergencyContext.Provider value={value}>
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = (): EmergencyContextType => {
  const context = useContext(EmergencyContext);
  if (context === undefined) {
    throw new Error('useEmergency must be used within an EmergencyProvider');
  }
  return context;
};
