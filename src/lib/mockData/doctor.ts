import { Patient, Prescription, Appointment, Drug, DoctorStats, TimeSeriesData } from "../types/doctor";

export const mockPatients: Patient[] = [
    {
        id: "P001",
        name: "Rajesh Kumar",
        email: "rajesh.kumar@email.com",
        phone: "+91 98765 43210",
        dateOfBirth: "1985-03-15",
        gender: "male",
        bloodGroup: "O+",
        address: "123 MG Road, Bangalore, Karnataka 560001",
        emergencyContact: {
            name: "Priya Kumar",
            phone: "+91 98765 43211",
            relation: "Spouse"
        },
        medicalHistory: ["Hypertension", "Type 2 Diabetes"],
        allergies: ["Penicillin"],
        currentMedications: ["Metformin 500mg", "Amlodipine 5mg"],
        lastVisit: "2024-12-15",
        nextAppointment: "2025-01-10",
        status: "active"
    },
    {
        id: "P002",
        name: "Anita Sharma",
        email: "anita.sharma@email.com",
        phone: "+91 98765 43212",
        dateOfBirth: "1992-07-22",
        gender: "female",
        bloodGroup: "A+",
        address: "456 Park Street, Mumbai, Maharashtra 400001",
        emergencyContact: {
            name: "Vikram Sharma",
            phone: "+91 98765 43213",
            relation: "Father"
        },
        medicalHistory: ["Asthma"],
        allergies: [],
        currentMedications: ["Salbutamol Inhaler"],
        lastVisit: "2024-12-20",
        status: "active"
    },
    {
        id: "P003",
        name: "Mohammed Ali",
        email: "mohammed.ali@email.com",
        phone: "+91 98765 43214",
        dateOfBirth: "1978-11-30",
        gender: "male",
        bloodGroup: "B+",
        address: "789 Gandhi Nagar, Delhi 110001",
        emergencyContact: {
            name: "Fatima Ali",
            phone: "+91 98765 43215",
            relation: "Spouse"
        },
        medicalHistory: ["Migraine", "Anxiety"],
        allergies: ["Sulfa drugs"],
        currentMedications: ["Propranolol 40mg"],
        lastVisit: "2024-12-18",
        nextAppointment: "2025-01-05",
        status: "active"
    }
];

export const mockPrescriptions: Prescription[] = [
    {
        id: "RX001",
        patientId: "P001",
        patientName: "Rajesh Kumar",
        doctorId: "D001",
        doctorName: "Dr. Priya Sharma",
        date: "2024-12-15",
        diagnosis: "Type 2 Diabetes - Follow-up",
        medications: [
            {
                id: "M001",
                drugName: "Metformin",
                dosage: "500mg",
                frequency: "Twice daily",
                duration: "30 days",
                instructions: "Take with meals"
            },
            {
                id: "M002",
                drugName: "Glimepiride",
                dosage: "2mg",
                frequency: "Once daily",
                duration: "30 days",
                instructions: "Take before breakfast"
            }
        ],
        notes: "Monitor blood sugar levels. Follow-up in 30 days.",
        status: "active",
        blockchainHash: "0x1234...5678"
    },
    {
        id: "RX002",
        patientId: "P002",
        patientName: "Anita Sharma",
        doctorId: "D001",
        doctorName: "Dr. Priya Sharma",
        date: "2024-12-20",
        diagnosis: "Acute Bronchitis",
        medications: [
            {
                id: "M003",
                drugName: "Azithromycin",
                dosage: "500mg",
                frequency: "Once daily",
                duration: "5 days",
                instructions: "Take on empty stomach"
            }
        ],
        notes: "Rest and increase fluid intake.",
        status: "active",
        blockchainHash: "0xabcd...efgh"
    }
];

export const mockAppointments: Appointment[] = [
    {
        id: "A001",
        patientId: "P001",
        patientName: "Rajesh Kumar",
        date: "2025-01-10",
        time: "10:00 AM",
        duration: 30,
        type: "follow-up",
        status: "scheduled",
        reason: "Diabetes follow-up"
    },
    {
        id: "A002",
        patientId: "P003",
        patientName: "Mohammed Ali",
        date: "2025-01-05",
        time: "2:00 PM",
        duration: 45,
        type: "consultation",
        status: "scheduled",
        reason: "Migraine consultation"
    },
    {
        id: "A003",
        patientId: "P002",
        patientName: "Anita Sharma",
        date: "2024-12-30",
        time: "11:00 AM",
        duration: 30,
        type: "checkup",
        status: "scheduled",
        reason: "General checkup"
    }
];

export const mockDrugs: Drug[] = [
    {
        id: "D001",
        name: "Metformin",
        genericName: "Metformin Hydrochloride",
        category: "Antidiabetic",
        manufacturer: "Sun Pharma",
        description: "Used to treat type 2 diabetes",
        dosageForms: ["Tablet", "Extended Release"],
        commonDosages: ["500mg", "850mg", "1000mg"],
        sideEffects: ["Nausea", "Diarrhea", "Stomach upset"],
        contraindications: ["Kidney disease", "Liver disease"],
        interactions: ["Alcohol", "Contrast dye"],
        price: 45,
        inStock: true
    },
    {
        id: "D002",
        name: "Amlodipine",
        genericName: "Amlodipine Besylate",
        category: "Antihypertensive",
        manufacturer: "Cipla",
        description: "Calcium channel blocker for high blood pressure",
        dosageForms: ["Tablet"],
        commonDosages: ["2.5mg", "5mg", "10mg"],
        sideEffects: ["Swelling", "Dizziness", "Fatigue"],
        contraindications: ["Severe hypotension"],
        interactions: ["Grapefruit juice", "Simvastatin"],
        price: 60,
        inStock: true
    }
];

export const mockDoctorStats: DoctorStats = {
    totalPatients: 47,
    activePrescriptions: 53,
    appointmentsThisMonth: 28,
    completedAppointments: 25,
    prescriptionsThisMonth: 47,
    patientAdherence: 87,
    averageConsultationTime: 32,
    revenueThisMonth: 125000
};

export const mockTimeSeriesData: TimeSeriesData[] = [
    { date: "Dec 1", prescriptions: 12, appointments: 8, patients: 3 },
    { date: "Dec 8", prescriptions: 15, appointments: 12, patients: 5 },
    { date: "Dec 15", prescriptions: 18, appointments: 15, patients: 4 },
    { date: "Dec 22", prescriptions: 20, appointments: 18, patients: 6 },
    { date: "Dec 29", prescriptions: 22, appointments: 20, patients: 7 }
];
