import { EmergencyCategory, EmergencyGuide, EmergencyStep } from '../types';

export const emergencyCategories: EmergencyCategory[] = [
  {
    id: 'choking',
    title: 'Atragantamiento',
    icon: 'account-alert',
    color: '#FF6B6B', // Rosa coral suave
    description: 'Persona que no puede respirar por obstrucción en vías respiratorias'
  },
  {
    id: 'cuts',
    title: 'Cortes y Heridas',
    icon: 'bandage',
    color: '#4ECDC4', // Verde azulado suave
    description: 'Heridas sangrantes que requieren atención inmediata'
  },
  {
    id: 'burns',
    title: 'Quemaduras',
    icon: 'fire',
    color: '#FFE66D', // Amarillo suave
    description: 'Lesiones causadas por calor, químicos o electricidad'
  },
  {
    id: 'fainting',
    title: 'Desmayo',
    icon: 'head',
    color: '#A8E6CF', // Verde menta suave
    description: 'Pérdida súbita de consciencia'
  },
  {
    id: 'cpr',
    title: 'RCP',
    icon: 'heart-pulse',
    color: '#FF8B94', // Rosa salmón suave
    description: 'Reanimación cardiopulmonar para paro cardíaco'
  },
  {
    id: 'heatstroke',
    title: 'Golpe de Calor',
    icon: 'weather-sunny',
    color: '#FFAAA5', // Coral suave
    description: 'Temperatura corporal elevada peligrosamente'
  }
];

// Pasos para atragantamiento
const chokingSteps: EmergencyStep[] = [
  {
    id: 'choking_assessment',
    stepNumber: 0,
    title: 'Evaluación Inicial',
    instruction: '¿La persona puede toser o hablar?',
    voiceText: 'Para un atragantamiento, ¿la persona puede toser o hablar? Toca Sí o No.',
    isQuestion: true,
    questionOptions: [
      {
        id: 'can_cough',
        text: 'Sí, puede toser/hablar',
        nextFlow: 'mild_choking'
      },
      {
        id: 'cannot_cough',
        text: 'No, está totalmente bloqueado',
        nextStepId: 'choking_position'
      }
    ]
  },
  {
    id: 'choking_position',
    stepNumber: 1,
    title: 'Posicionarse',
    instruction: 'Colócate detrás de la persona. Abraza su cintura con tus brazos.',
    voiceText: 'Paso uno: Coloca tus brazos alrededor de la cintura de la persona desde atrás.',
    image: 'choking_position.png'
  },
  {
    id: 'fist_placement',
    stepNumber: 2,
    title: 'Colocar el Puño',
    instruction: 'Haz un puño con una mano. Colócalo entre el ombligo y el esternón de la persona.',
    voiceText: 'Paso dos: Forma un puño y colócalo entre el ombligo y el pecho de la persona.',
    image: 'fist_placement.png'
  },
  {
    id: 'heimlich_thrust',
    stepNumber: 3,
    title: 'Compresión de Heimlich',
    instruction: 'Con la otra mano, agarra el puño. Presiona hacia adentro y hacia arriba con fuerza.',
    voiceText: 'Paso tres: Agarra el puño con la otra mano y presiona fuerte hacia adentro y arriba.',
    image: 'heimlich_thrust.png'
  },
  {
    id: 'repeat_check',
    stepNumber: 4,
    title: 'Verificar y Repetir',
    instruction: 'Repite las compresiones hasta que el objeto salga o la persona pueda respirar.',
    voiceText: 'Continúa con las compresiones hasta que el objeto salga. ¿El objeto ha salido?',
    isQuestion: true,
    questionOptions: [
      {
        id: 'object_out',
        text: 'Sí, el objeto salió',
        nextFlow: 'post_care'
      },
      {
        id: 'still_choking',
        text: 'No, sigue atragantada',
        nextStepId: 'heimlich_thrust'
      }
    ]
  }
];

// Pasos para cortes y heridas
const cutsSteps: EmergencyStep[] = [
  {
    id: 'assess_bleeding',
    stepNumber: 1,
    title: 'Evaluar el Sangrado',
    instruction: 'Observa la herida. ¿Está sangrando mucho?',
    voiceText: 'Primero evalúa el sangrado. ¿La herida está sangrando abundantemente?',
    isQuestion: true,
    questionOptions: [
      {
        id: 'heavy_bleeding',
        text: 'Sí, sangra mucho',
        nextStepId: 'call_emergency_cuts'
      },
      {
        id: 'light_bleeding',
        text: 'No, sangra poco',
        nextStepId: 'clean_hands'
      }
    ]
  },
  {
    id: 'call_emergency_cuts',
    stepNumber: 2,
    title: 'Llamar Emergencias',
    instruction: 'Para sangrado abundante, llama al 110 inmediatamente mientras aplicas los siguientes pasos.',
    voiceText: 'Es importante llamar al 110 ahora por el sangrado abundante.',
    image: 'call_emergency.png'
  },
  {
    id: 'clean_hands',
    stepNumber: 3,
    title: 'Limpiar las Manos',
    instruction: 'Lávate las manos con agua y jabón, o usa alcohol gel si está disponible.',
    voiceText: 'Lávate las manos para evitar infecciones.',
    image: 'wash_hands.png'
  },
  {
    id: 'stop_bleeding',
    stepNumber: 4,
    title: 'Detener el Sangrado',
    instruction: 'Presiona directamente sobre la herida con un paño limpio o gasa. Mantén presión constante.',
    voiceText: 'Presiona firmemente sobre la herida con un paño limpio. No quites la presión.',
    image: 'direct_pressure.png'
  },
  {
    id: 'elevate_wound',
    stepNumber: 5,
    title: 'Elevar la Herida',
    instruction: 'Si es posible, eleva la parte herida por encima del nivel del corazón.',
    voiceText: 'Si puedes, eleva la parte herida más arriba que el corazón.',
    image: 'elevate_limb.png'
  }
];

// Pasos para RCP
const cprSteps: EmergencyStep[] = [
  {
    id: 'check_consciousness',
    stepNumber: 1,
    title: 'Verificar Consciencia',
    instruction: 'Toca los hombros de la persona y grita: "¿Estás bien?"',
    voiceText: 'Paso uno: Toca los hombros firmemente y pregunta en voz alta si está bien.',
    image: 'check_consciousness.png'
  },
  {
    id: 'call_emergency',
    stepNumber: 2,
    title: 'Llamar Emergencias',
    instruction: 'Si no responde, llama al 110 inmediatamente o pide a alguien que lo haga.',
    voiceText: 'Si no responde, es vital llamar al 110 ahora mismo.',
    image: 'call_emergency.png'
  },
  {
    id: 'position_hands',
    stepNumber: 3,
    title: 'Posición de las Manos',
    instruction: 'Coloca la base de una mano en el centro del pecho, entre los pezones. La otra mano encima.',
    voiceText: 'Coloca la base de una mano en el centro del pecho y la otra mano encima, entrelazando los dedos.',
    image: 'hand_position.png'
  },
  {
    id: 'chest_compressions',
    stepNumber: 4,
    title: 'Compresiones',
    instruction: 'Presiona fuerte y rápido al menos 5 cm de profundidad, 100-120 veces por minuto.',
    voiceText: 'Presiona fuerte y rápido, al menos cinco centímetros de profundidad. Cuenta: uno, dos, tres...',
    image: 'compressions.png'
  }
];

export const emergencyGuides: EmergencyGuide[] = [
  {
    id: 'choking_guide',
    categoryId: 'choking',
    title: 'Guía para Atragantamiento',
    initialQuestion: chokingSteps[0],
    steps: chokingSteps,
    postCareInstructions: [
      'Asegúrate de que la persona pueda respirar normalmente',
      'Acompaña a la persona hasta que llegue ayuda médica',
      'Vigila que no vuelva a atragantarse',
      'Si la persona pierde el conocimiento, inicia RCP'
    ]
  },
  {
    id: 'cuts_guide',
    categoryId: 'cuts',
    title: 'Guía para Cortes y Heridas',
    initialQuestion: cutsSteps[0],
    steps: cutsSteps,
    postCareInstructions: [
      'Mantén la herida limpia y seca',
      'Cambia el vendaje regularmente',
      'Vigila signos de infección (enrojecimiento, hinchazón, pus)',
      'Busca atención médica si la herida es profunda'
    ]
  },
  {
    id: 'cpr_guide',
    categoryId: 'cpr',
    title: 'Guía de RCP',
    steps: cprSteps,
    postCareInstructions: [
      'Continúa RCP hasta que llegue ayuda médica',
      'No dejes sola a la persona',
      'Si la persona recupera la consciencia, colócala en posición de recuperación',
      'Mantén las vías respiratorias despejadas'
    ]
  }
];

export const getEmergencyGuideByCategory = (categoryId: string): EmergencyGuide | undefined => {
  return emergencyGuides.find(guide => guide.categoryId === categoryId);
};

export const getEmergencyStepById = (guideId: string, stepId: string): EmergencyStep | undefined => {
  const guide = emergencyGuides.find(g => g.id === guideId);
  return guide?.steps.find(step => step.id === stepId);
};
