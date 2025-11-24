// Mock data para planes de vitalidad

export interface VitalityPlan {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  createdAt: string;
  status: 'active' | 'completed' | 'paused';
  biologicalAge: number;
  chronologicalAge: number;
  energyLevel: number;
  emotionalWellbeing: number;
  
  // Nutrition
  nutritionPlan: {
    dailyCalories: number;
    proteins: number;
    carbs: number;
    fats: number;
    meals: Array<{
      name: string;
      time: string;
      calories: number;
    }>;
  };
  
  // Training
  trainingPlan: {
    weeklyGoal: number;
    sessionsCompleted: number;
    routines: Array<{
      day: string;
      type: string;
      duration: number;
      intensity: string;
    }>;
  };
  
  // Supplements
  supplementsPlan: {
    supplements: Array<{
      name: string;
      dosage: string;
      time: string;
      purpose: string;
    }>;
  };
  
  // Epigenetics
  epigeneticsPlan: {
    mindfulnessMinutes: number;
    purposeScore: number;
    stressLevel: number;
    recommendations: string[];
  };
  
  // Progress tracking
  weeklyProgress: number;
  notes: string;
}

export const mockVitalityPlans: VitalityPlan[] = [
  {
    id: "vp-001",
    patientId: "1",
    patientName: "María López",
    doctorId: "doc-001",
    doctorName: "Dr. Carlos Mendoza",
    createdAt: "2024-01-01",
    status: "active",
    biologicalAge: 32,
    chronologicalAge: 38,
    energyLevel: 85,
    emotionalWellbeing: 78,
    nutritionPlan: {
      dailyCalories: 1800,
      proteins: 120,
      carbs: 180,
      fats: 60,
      meals: [
        { name: "Desayuno Energético", time: "08:00", calories: 450 },
        { name: "Snack Proteico", time: "11:00", calories: 200 },
        { name: "Almuerzo Balance", time: "14:00", calories: 600 },
        { name: "Merienda Vital", time: "17:00", calories: 180 },
        { name: "Cena Ligera", time: "20:00", calories: 370 }
      ]
    },
    trainingPlan: {
      weeklyGoal: 5,
      sessionsCompleted: 3,
      routines: [
        { day: "Lunes", type: "HIIT Cardiovascular", duration: 45, intensity: "Alta" },
        { day: "Miércoles", type: "Fuerza Funcional", duration: 60, intensity: "Media" },
        { day: "Viernes", type: "Yoga Restaurativo", duration: 50, intensity: "Baja" },
        { day: "Sábado", type: "Natación", duration: 45, intensity: "Media" }
      ]
    },
    supplementsPlan: {
      supplements: [
        { name: "Omega 3 Plus", dosage: "2 cápsulas", time: "Mañana", purpose: "Salud cardiovascular" },
        { name: "Multivitamínico Vital", dosage: "1 cápsula", time: "Desayuno", purpose: "Energía celular" },
        { name: "Colágeno Hidrolizado", dosage: "10g", time: "Noche", purpose: "Regeneración tisular" },
        { name: "Probióticos Advanced", dosage: "1 cápsula", time: "Mañana", purpose: "Salud intestinal" }
      ]
    },
    epigeneticsPlan: {
      mindfulnessMinutes: 15,
      purposeScore: 82,
      stressLevel: 3,
      recommendations: [
        "Meditación diaria de 15 minutos",
        "Journaling de propósito vital",
        "Ejercicios de respiración consciente",
        "Conexión con la naturaleza 2 veces/semana"
      ]
    },
    weeklyProgress: 78,
    notes: "Excelente adherencia al plan. Continuar con el protocolo actual."
  },
  {
    id: "vp-002",
    patientId: "2",
    patientName: "Carlos Ruiz",
    doctorId: "doc-001",
    doctorName: "Dr. Carlos Mendoza",
    createdAt: "2024-01-05",
    status: "active",
    biologicalAge: 48,
    chronologicalAge: 52,
    energyLevel: 72,
    emotionalWellbeing: 68,
    nutritionPlan: {
      dailyCalories: 2000,
      proteins: 140,
      carbs: 200,
      fats: 70,
      meals: [
        { name: "Desayuno Proteico", time: "07:30", calories: 500 },
        { name: "Snack Pre-Entreno", time: "10:30", calories: 220 },
        { name: "Almuerzo Completo", time: "13:30", calories: 650 },
        { name: "Merienda Recovery", time: "16:30", calories: 200 },
        { name: "Cena Balanceada", time: "19:30", calories: 430 }
      ]
    },
    trainingPlan: {
      weeklyGoal: 4,
      sessionsCompleted: 2,
      routines: [
        { day: "Martes", type: "Entrenamiento de Fuerza", duration: 60, intensity: "Alta" },
        { day: "Jueves", type: "Cardio Moderado", duration: 40, intensity: "Media" },
        { day: "Sábado", type: "Pilates", duration: 50, intensity: "Baja" },
        { day: "Domingo", type: "Caminata Activa", duration: 45, intensity: "Baja" }
      ]
    },
    supplementsPlan: {
      supplements: [
        { name: "Coenzima Q10", dosage: "100mg", time: "Mañana", purpose: "Energía mitocondrial" },
        { name: "Vitamina D3+K2", dosage: "5000 UI", time: "Desayuno", purpose: "Salud ósea" },
        { name: "Magnesio Bisglicinato", dosage: "400mg", time: "Noche", purpose: "Recuperación muscular" }
      ]
    },
    epigeneticsPlan: {
      mindfulnessMinutes: 10,
      purposeScore: 75,
      stressLevel: 4,
      recommendations: [
        "Práctica de mindfulness matutina",
        "Técnicas de gestión del estrés",
        "Establecer objetivos claros semanales"
      ]
    },
    weeklyProgress: 65,
    notes: "Ajustar intensidad de entrenamiento. Aumentar adherencia a suplementación."
  }
];

export const planTemplates = [
  {
    id: "template-rejuvenecimiento",
    name: "Plan Rejuvenecimiento Integral",
    description: "Plan completo para revertir edad biológica y optimizar vitalidad",
    category: "anti-aging"
  },
  {
    id: "template-energia",
    name: "Plan Energía & Rendimiento",
    description: "Enfocado en maximizar energía y rendimiento físico-mental",
    category: "performance"
  },
  {
    id: "template-equilibrio",
    name: "Plan Equilibrio Hormonal",
    description: "Optimización hormonal y bienestar emocional",
    category: "hormonal"
  },
  {
    id: "template-longevidad",
    name: "Plan Longevidad Activa",
    description: "Estrategias de longevidad y prevención",
    category: "longevity"
  }
];
