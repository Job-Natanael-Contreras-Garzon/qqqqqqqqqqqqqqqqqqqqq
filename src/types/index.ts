export interface EmergencyCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
}

export interface EmergencyStep {
  id: string;
  stepNumber: number;
  title: string;
  instruction: string;
  image?: string;
  voiceText: string;
  isQuestion?: boolean;
  questionOptions?: QuestionOption[];
}

export interface QuestionOption {
  id: string;
  text: string;
  nextStepId?: string;
  nextFlow?: string;
}

export interface EmergencyGuide {
  id: string;
  categoryId: string;
  title: string;
  initialQuestion?: EmergencyStep;
  steps: EmergencyStep[];
  postCareInstructions: string[];
}

export interface NavigationParams {
  Home: undefined;
  EmergencyCategories: undefined;
  EmergencyGuide: {
    categoryId: string;
    guideId: string;
  };
  EmergencySteps: {
    guideId: string;
    currentStepId: string;
  };
  [key: string]: any;
}
