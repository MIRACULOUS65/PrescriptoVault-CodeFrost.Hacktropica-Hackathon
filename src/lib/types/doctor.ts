// Patient Types
export interface Patient {
    id: string;
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: "male" | "female" | "other";
    bloodGroup: string;
    address: string;
    emergencyContact: {
        name: string;
        phone: string;
        relation: string;
    };
    medicalHistory: string[];
    allergies: string[];
    currentMedications: string[];
    lastVisit: string;
    nextAppointment?: string;
    status: "active" | "inactive";
    avatar?: string;
}

// Prescription Types
export interface Medication {
    id: string;
    drugName: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
}

export interface Prescription {
    id: string;
    patientId: string;
    patientName: string;
    doctorId: string;
    doctorName: string;
    date: string;
    medications: Medication[];
    diagnosis: string;
    notes: string;
    status: "active" | "completed" | "cancelled";
    qrCode?: string;
    blockchainHash?: string;
}

// Appointment Types
export interface Appointment {
    id: string;
    patientId: string;
    patientName: string;
    patientAvatar?: string;
    date: string;
    time: string;
    duration: number; // in minutes
    type: "consultation" | "follow-up" | "emergency" | "checkup";
    status: "scheduled" | "completed" | "cancelled" | "no-show";
    reason: string;
    notes?: string;
}

// Drug Database Types
export interface Drug {
    id: string;
    name: string;
    genericName: string;
    category: string;
    manufacturer: string;
    description: string;
    dosageForms: string[];
    commonDosages: string[];
    sideEffects: string[];
    contraindications: string[];
    interactions: string[];
    price: number;
    inStock: boolean;
}

// Analytics Types
export interface DoctorStats {
    totalPatients: number;
    activePrescriptions: number;
    appointmentsThisMonth: number;
    completedAppointments: number;
    prescriptionsThisMonth: number;
    patientAdherence: number; // percentage
    averageConsultationTime: number; // in minutes
    revenueThisMonth: number;
}

export interface ChartData {
    name: string;
    value: number;
}

export interface TimeSeriesData {
    date: string;
    prescriptions: number;
    appointments: number;
    patients: number;
}
