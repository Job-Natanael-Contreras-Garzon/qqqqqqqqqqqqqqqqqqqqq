import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationParams } from '../types';
import { SplashScreen } from '../screens/SplashScreen';
import { EmergencyCategoriesScreen } from '../screens/EmergencyCategoriesScreen';
import { EmergencyStepsScreen } from '../screens/EmergencyStepsScreen';

const Stack = createStackNavigator<NavigationParams>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // Sin header para una experiencia más limpia en emergencias
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="EmergencyCategories" 
          component={EmergencyCategoriesScreen}
          options={{
            headerShown: false,
            gestureEnabled: false, // Prevenir gestos accidentales en emergencias
          }}
        />
        <Stack.Screen 
          name="EmergencySteps" 
          component={EmergencyStepsScreen}
          options={{
            headerShown: false,
            gestureEnabled: false, // Prevenir salida accidental durante emergencia
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
