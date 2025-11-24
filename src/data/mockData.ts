// Mock data for the complete system simulation

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'consultation' | 'treatment' | 'followup' | 'telemedicine';
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  treatment?: string;
  notes?: string;
}

export interface Treatment {
  id: string;
  patientId: string;
  name: string;
  type: 'facial' | 'body' | 'iv-therapy' | 'aesthetic';
  date: string;
  doctorId: string;
  doctorName: string;
  status: 'completed' | 'in-progress' | 'scheduled';
  price: number;
  notes?: string;
  nextSession?: string;
}

export interface Payment {
  id: string;
  patientId: string;
  amount: number;
  date: string;
  method: 'card' | 'cash' | 'transfer';
  status: 'paid' | 'pending' | 'failed';
  concept: string;
  treatmentId?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
  avatar?: string;
  membershipType?: 'gold' | 'platinum' | 'premium';
  totalSpent: number;
  lastVisit: string;
  nextAppointment?: string;
  medicalHistory: string[];
  allergies: string[];
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialization: string;
  phone: string;
  avatar?: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  patientsCount: number;
  rating: number;
}

// Mock data
export const mockPatients: Patient[] = [
  {
    id: '2',
    name: 'María López',
    email: 'maria@ejemplo.com',
    phone: '+34 666 777 888',
    birthDate: '1985-06-15',
    gender: 'female',
    membershipType: 'gold',
    totalSpent: 2450,
    lastVisit: '2024-01-15',
    nextAppointment: '2024-02-10',
    medicalHistory: ['Botox facial', 'Sueroterapia antiestrés'],
    allergies: ['Ninguna conocida']
  },
  {
    id: '4',
    name: 'Carlos Ruiz',
    email: 'carlos@ejemplo.com',
    phone: '+34 666 888 999',
    birthDate: '1978-03-22',
    gender: 'male',
    membershipType: 'platinum',
    totalSpent: 4200,
    lastVisit: '2024-01-20',
    nextAppointment: '2024-02-05',
    medicalHistory: ['Suero Performance IV', 'HIFU corporal'],
    allergies: ['Penicilina']
  }
];

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Ana García',
    email: 'doctor@ilumina.com',
    specialization: 'Medicina Estética',
    phone: '+34 666 555 777',
    patientsCount: 142,
    rating: 4.9,
    schedule: [
      { day: 'Lunes', startTime: '09:00', endTime: '18:00' },
      { day: 'Martes', startTime: '09:00', endTime: '18:00' },
      { day: 'Miércoles', startTime: '09:00', endTime: '18:00' },
      { day: 'Jueves', startTime: '09:00', endTime: '18:00' },
      { day: 'Viernes', startTime: '09:00', endTime: '16:00' }
    ]
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '2',
    patientName: 'María López',
    doctorId: '1',
    doctorName: 'Dr. Ana García',
    date: '2024-02-10',
    time: '10:00',
    type: 'treatment',
    status: 'scheduled',
    treatment: 'Botox facial',
    notes: 'Primera sesión de retoque'
  },
  {
    id: '2',
    patientId: '4',
    patientName: 'Carlos Ruiz',
    doctorId: '1',
    doctorName: 'Dr. Ana García',
    date: '2024-02-05',
    time: '15:30',
    type: 'consultation',
    status: 'scheduled',
    treatment: 'Consulta sueroterapia'
  },
  {
    id: '3',
    patientId: '2',
    patientName: 'María López',
    doctorId: '1',
    doctorName: 'Dr. Ana García',
    date: '2024-01-15',
    time: '11:00',
    type: 'treatment',
    status: 'completed',
    treatment: 'Sueroterapia antiestrés',
    notes: 'Sesión completada sin incidencias'
  }
];

export const mockTreatments: Treatment[] = [
  {
    id: '1',
    patientId: '2',
    name: 'Botox facial - Entrecejo y patas de gallo',
    type: 'facial',
    date: '2024-01-10',
    doctorId: '1',
    doctorName: 'Dr. Ana García',
    status: 'completed',
    price: 350,
    notes: 'Resultado excelente. Próxima cita en 4-6 meses',
    nextSession: '2024-06-10'
  },
  {
    id: '2',
    patientId: '2',
    name: 'Sueroterapia Antiestrés + Vitaminas',
    type: 'iv-therapy',
    date: '2024-01-15',
    doctorId: '1',
    doctorName: 'Dr. Ana García',
    status: 'completed',
    price: 120,
    notes: 'Paciente reporta mejora en energía y estado de ánimo'
  },
  {
    id: '3',
    patientId: '4',
    name: 'Suero Performance IV',
    type: 'iv-therapy',
    date: '2024-01-20',
    doctorId: '1',
    doctorName: 'Dr. Ana García',
    status: 'completed',
    price: 180,
    notes: 'Protocolo para ejecutivo con jet lag frecuente'
  }
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    patientId: '2',
    amount: 350,
    date: '2024-01-10',
    method: 'card',
    status: 'paid',
    concept: 'Botox facial',
    treatmentId: '1'
  },
  {
    id: '2',
    patientId: '2',
    amount: 120,
    date: '2024-01-15',
    method: 'card',
    status: 'paid',
    concept: 'Sueroterapia antiestrés',
    treatmentId: '2'
  },
  {
    id: '3',
    patientId: '4',
    amount: 180,
    date: '2024-01-20',
    method: 'transfer',
    status: 'paid',
    concept: 'Suero Performance IV',
    treatmentId: '3'
  }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    senderId: '1',
    senderName: 'Dr. Ana García',
    message: 'Hola María, ¿cómo te encuentras después del último tratamiento?',
    timestamp: '2024-01-16T10:30:00Z',
    type: 'text'
  },
  {
    id: '2',
    senderId: '2',
    senderName: 'María López',
    message: 'Muy bien doctora, me siento con mucha más energía. ¿Cuándo sería recomendable la próxima sesión?',
    timestamp: '2024-01-16T11:15:00Z',
    type: 'text'
  },
  {
    id: '3',
    senderId: '1',
    senderName: 'Dr. Ana García',
    message: 'Perfecto. Te recomiendo esperar 2-3 semanas. Te contactaré para programar la cita.',
    timestamp: '2024-01-16T11:20:00Z',
    type: 'text'
  }
];