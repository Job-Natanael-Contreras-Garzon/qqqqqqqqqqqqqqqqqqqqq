# 🚨 App de Primeros Auxilios

Una aplicación móvil completa de primeros auxilios diseñada para situaciones de emergencia, con interfaz intuitiva, guía por voz y acceso rápido a servicios de emergencia.

## 🎯 Características Principales

### ✅ Funcionalidades Implementadas

- **🏥 Guías de Emergencia Completas**
  - Atragantamiento (Maniobra de Heimlich)
  - Cortes y Heridas
  - RCP (Reanimación Cardiopulmonar)
  - Más categorías en desarrollo

- **📞 Llamadas de Emergencia**
  - Botón de emergencia siempre visible
  - Marcado directo al 110 (Bolivia)
  - Lista de contactos de emergencia
  - Confirmación antes de realizar llamadas

- **🗣️ Guía por Voz (Text-to-Speech)**
  - Instrucciones habladas paso a paso
  - Control activable/desactivable
  - Mensajes de calma y tranquilización
  - Optimizado para situaciones de pánico

- **🎮 Interfaz de Emergencia**
  - Botones grandes y claros
  - Navegación intuitiva
  - Prevención de salida accidental
  - Diseño optimizado para estrés

## 🚀 Instalación y Ejecución

### Requisitos Previos
- Node.js (versión 16 o superior)
- npm o yarn
- Expo CLI
- Dispositivo móvil con Expo Go (para pruebas)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [tu-repositorio]
   cd primerosauxilios
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm start
   ```

4. **Ejecutar en dispositivo**
   - Escanea el código QR con Expo Go (Android)
   - O usa la app Cámara (iOS)

## 📱 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── EmergencyButton.tsx
│   ├── EmergencyCategoryCard.tsx
│   ├── EmergencyStepCard.tsx
│   ├── EmergencyTimer.tsx
│   └── EmergencyContactsModal.tsx
├── screens/            # Pantallas principales
│   ├── SplashScreen.tsx
│   ├── EmergencyCategoriesScreen.tsx
│   ├── EmergencyStepsScreen.tsx
│   └── NotImplementedScreen.tsx
├── services/           # Servicios y lógica de negocio
│   ├── VoiceService.ts
│   └── EmergencyService.ts
├── data/              # Datos y configuración
│   └── emergencyData.ts
├── types/             # Definiciones TypeScript
│   └── index.ts
├── hooks/             # Hooks personalizados
│   └── useVoice.ts
├── context/           # Contextos de React
│   └── EmergencyContext.tsx
└── navigation/        # Configuración de navegación
    └── AppNavigator.tsx
```

## 🎨 Flujo de Usuario

### 1. Pantalla de Inicio
- Splash screen con información de seguridad
- Carga automática de recursos
- Transición a categorías de emergencia

### 2. Selección de Emergencia
- Grid de categorías visuales
- Botón de emergencia prominente
- Acceso a contactos de emergencia
- Guía por voz de bienvenida

### 3. Guía Paso a Paso
- Evaluación inicial con preguntas
- Instrucciones claras y visuales
- Navegación secuencial
- Mensajes de calma constantes
- Botón de emergencia siempre visible

### 4. Finalización
- Instrucciones post-cuidado
- Opciones para nueva emergencia
- Recordatorios de atención médica

## 🔧 Tecnologías Utilizadas

- **React Native** - Framework principal
- **Expo** - Plataforma de desarrollo
- **TypeScript** - Tipado estático
- **React Navigation** - Navegación entre pantallas
- **Expo Speech** - Text-to-Speech
- **Expo Linking** - Llamadas telefónicas
- **Material Community Icons** - Iconografía

## 🛡️ Características de Seguridad

- **Prevención de Errores**: Confirmaciones antes de acciones críticas
- **Navegación Segura**: Prevención de salida accidental durante emergencias
- **Acceso Rápido**: Botón de emergencia siempre accesible
- **Offline Ready**: Funciona sin conexión a internet
- **Feedback Háptico**: Vibraciones para confirmación de acciones

## 📋 Próximas Características

- [ ] Más categorías de emergencia (Quemaduras, Desmayos, Insolación)
- [ ] Modo sin conexión completo
- [ ] Múltiples idiomas
- [ ] Geolocalización para emergencias
- [ ] Historial de emergencias
- [ ] Integración con servicios de salud
- [ ] Modo entrenamiento/práctica

## ⚠️ Importante

**Esta aplicación NO reemplaza la atención médica profesional. Siempre busca ayuda médica calificada en emergencias reales.**

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contactos de Emergencia (Bolivia)

- **110** - Emergencias Generales
- **119** - Bomberos
- **165** - Cruz Roja
- **122** - Tránsito

---

**⚡ Diseñado para salvar vidas en situaciones críticas ⚡**
