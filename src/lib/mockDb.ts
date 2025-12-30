// Mock Database for PrescriptoVault
// This simulates a backend database for the prescription management system

export interface User {
    id: string;
    type: 'doctor' | 'patient' | 'pharmacist' | 'admin';
    name: string;
    email: string;
    walletAddress?: string;
    avatar?: string;
    verified: boolean;
    createdAt: Date;
}

export interface Doctor extends User {
    type: 'doctor';
    licenseNumber: string;
    specialty: string;
    clinic: string;
    subscriptionTier: 'basic' | 'clinic_starter' | 'enterprise';
    mintLimit: number;
    mintsThisMonth: number;
}

export interface Patient extends User {
    type: 'patient';
    dateOfBirth: Date;
    bloodType?: string;
    allergies: string[];
    healthScore: number;
    streak: number;
    grantedAccessTo: string[]; // Doctor IDs
}

export interface Pharmacist extends User {
    type: 'pharmacist';
    pharmacyId: string;
    pharmacyName: string;
    pharmacyAddress: string;
}

export interface Drug {
    id: string;
    name: string;
    genericName: string;
    category: string;
    dosageForm: string;
    strengths: string[];
    standardDosage: {
        adult: string;
        child: string;
        elderly: string;
    };
    sideEffects: string[];
    contraindications: string[];
}

export interface DrugInteraction {
    drug1Id: string;
    drug2Id: string;
    severity: 'critical' | 'moderate' | 'minor';
    description: string;
    recommendation: string;
}

export interface Prescription {
    id: string;
    assetId: string; // Blockchain asset ID
    doctorId: string;
    patientId: string;
    drugs: {
        drugId: string;
        drugName: string;
        dosage: string;
        frequency: string;
        duration: string;
        quantity: number;
        notes?: string;
    }[];
    status: 'minted' | 'dispensed' | 'expired' | 'cancelled';
    createdAt: Date;
    dispensedAt?: Date;
    dispensedBy?: string; // Pharmacist ID
    dispensedAt_pharmacyId?: string;
    qrGeneratedAt?: Date;
    qrExpiresAt?: Date;
    txHash: string;
}

export interface Transaction {
    id: string;
    type: 'mint' | 'burn' | 'transfer';
    assetId: string;
    prescriptionId: string;
    initiatorId: string;
    initiatorType: 'doctor' | 'pharmacist';
    timestamp: Date;
    txHash: string;
    blockNumber: number;
}

export interface Pharmacy {
    id: string;
    name: string;
    address: string;
    city: string;
    region: string;
    inventory: { drugId: string; quantity: number }[];
    totalDispensed: number;
}

export interface NetworkStats {
    totalAssetsMinted: number;
    totalAssetsDispensed: number;
    fraudAttemptsBlocked: number;
    networkUptime: number;
    activeDoctors: number;
    activePatients: number;
    activePharmacies: number;
}

// ============ MOCK DATA ============

export const mockDrugs: Drug[] = [
    {
        id: 'drug-001',
        name: 'Metformin',
        genericName: 'Metformin Hydrochloride',
        category: 'Antidiabetic',
        dosageForm: 'Tablet',
        strengths: ['500mg', '850mg', '1000mg'],
        standardDosage: { adult: '500-1000mg twice daily', child: 'Not recommended', elderly: '500mg once daily' },
        sideEffects: ['Nausea', 'Diarrhea', 'Stomach upset'],
        contraindications: ['Kidney disease', 'Liver disease']
    },
    {
        id: 'drug-002',
        name: 'Amoxicillin',
        genericName: 'Amoxicillin Trihydrate',
        category: 'Antibiotic',
        dosageForm: 'Capsule',
        strengths: ['250mg', '500mg'],
        standardDosage: { adult: '500mg three times daily', child: '25mg/kg/day in divided doses', elderly: '250mg three times daily' },
        sideEffects: ['Rash', 'Diarrhea', 'Nausea'],
        contraindications: ['Penicillin allergy']
    },
    {
        id: 'drug-003',
        name: 'Warfarin',
        genericName: 'Warfarin Sodium',
        category: 'Anticoagulant',
        dosageForm: 'Tablet',
        strengths: ['1mg', '2mg', '5mg'],
        standardDosage: { adult: '2-10mg daily', child: 'Weight-based', elderly: '2-5mg daily' },
        sideEffects: ['Bleeding', 'Bruising', 'Hair loss'],
        contraindications: ['Pregnancy', 'Active bleeding']
    },
    {
        id: 'drug-004',
        name: 'Aspirin',
        genericName: 'Acetylsalicylic Acid',
        category: 'NSAID',
        dosageForm: 'Tablet',
        strengths: ['75mg', '100mg', '300mg'],
        standardDosage: { adult: '75-100mg daily', child: 'Not recommended under 16', elderly: '75mg daily' },
        sideEffects: ['Stomach upset', 'Bleeding', 'Ringing in ears'],
        contraindications: ['Peptic ulcer', 'Bleeding disorders']
    },
    {
        id: 'drug-005',
        name: 'Lisinopril',
        genericName: 'Lisinopril',
        category: 'ACE Inhibitor',
        dosageForm: 'Tablet',
        strengths: ['2.5mg', '5mg', '10mg', '20mg'],
        standardDosage: { adult: '10-40mg daily', child: 'Weight-based', elderly: '2.5-5mg daily' },
        sideEffects: ['Dry cough', 'Dizziness', 'Headache'],
        contraindications: ['Pregnancy', 'Angioedema history']
    },
    {
        id: 'drug-006',
        name: 'Atorvastatin',
        genericName: 'Atorvastatin Calcium',
        category: 'Statin',
        dosageForm: 'Tablet',
        strengths: ['10mg', '20mg', '40mg', '80mg'],
        standardDosage: { adult: '10-80mg daily', child: '10-20mg daily', elderly: '10mg daily' },
        sideEffects: ['Muscle pain', 'Headache', 'Nausea'],
        contraindications: ['Liver disease', 'Pregnancy']
    },
    {
        id: 'drug-007',
        name: 'Omeprazole',
        genericName: 'Omeprazole',
        category: 'Proton Pump Inhibitor',
        dosageForm: 'Capsule',
        strengths: ['10mg', '20mg', '40mg'],
        standardDosage: { adult: '20-40mg daily', child: '10-20mg daily', elderly: '20mg daily' },
        sideEffects: ['Headache', 'Nausea', 'Diarrhea'],
        contraindications: ['None significant']
    },
    {
        id: 'drug-008',
        name: 'Amlodipine',
        genericName: 'Amlodipine Besylate',
        category: 'Calcium Channel Blocker',
        dosageForm: 'Tablet',
        strengths: ['2.5mg', '5mg', '10mg'],
        standardDosage: { adult: '5-10mg daily', child: 'Not established', elderly: '2.5mg daily' },
        sideEffects: ['Swelling', 'Dizziness', 'Flushing'],
        contraindications: ['Severe aortic stenosis']
    },
    {
        id: 'drug-009',
        name: 'Ciprofloxacin',
        genericName: 'Ciprofloxacin Hydrochloride',
        category: 'Fluoroquinolone Antibiotic',
        dosageForm: 'Tablet',
        strengths: ['250mg', '500mg', '750mg'],
        standardDosage: { adult: '500-750mg twice daily', child: 'Not recommended', elderly: '250mg twice daily' },
        sideEffects: ['Nausea', 'Diarrhea', 'Tendon problems'],
        contraindications: ['Children under 18', 'Tendon disorders']
    },
    {
        id: 'drug-010',
        name: 'Paracetamol',
        genericName: 'Acetaminophen',
        category: 'Analgesic',
        dosageForm: 'Tablet',
        strengths: ['325mg', '500mg', '650mg'],
        standardDosage: { adult: '500-1000mg every 4-6 hours', child: '10-15mg/kg every 4-6 hours', elderly: '500mg every 6 hours' },
        sideEffects: ['Rare at normal doses'],
        contraindications: ['Severe liver disease']
    },
    {
        id: 'drug-011',
        name: 'Ibuprofen',
        genericName: 'Ibuprofen',
        category: 'NSAID',
        dosageForm: 'Tablet',
        strengths: ['200mg', '400mg', '600mg'],
        standardDosage: { adult: '400-600mg every 6-8 hours', child: '5-10mg/kg every 6-8 hours', elderly: '200mg every 8 hours' },
        sideEffects: ['Stomach upset', 'Headache', 'Dizziness'],
        contraindications: ['Peptic ulcer', 'Kidney disease']
    },
    {
        id: 'drug-012',
        name: 'Clopidogrel',
        genericName: 'Clopidogrel Bisulfate',
        category: 'Antiplatelet',
        dosageForm: 'Tablet',
        strengths: ['75mg', '300mg'],
        standardDosage: { adult: '75mg daily', child: 'Not established', elderly: '75mg daily' },
        sideEffects: ['Bleeding', 'Bruising', 'Rash'],
        contraindications: ['Active bleeding', 'Severe liver disease']
    },
];

export const mockInteractions: DrugInteraction[] = [
    {
        drug1Id: 'drug-003', // Warfarin
        drug2Id: 'drug-004', // Aspirin
        severity: 'critical',
        description: 'Significantly increases bleeding risk. Aspirin inhibits platelet function while Warfarin inhibits clotting factors.',
        recommendation: 'Avoid combination unless specifically indicated. If necessary, use lowest aspirin dose and monitor INR closely.'
    },
    {
        drug1Id: 'drug-003', // Warfarin
        drug2Id: 'drug-011', // Ibuprofen
        severity: 'critical',
        description: 'NSAIDs increase bleeding risk and may reduce Warfarin metabolism.',
        recommendation: 'Avoid combination. Consider paracetamol as alternative analgesic.'
    },
    {
        drug1Id: 'drug-003', // Warfarin
        drug2Id: 'drug-012', // Clopidogrel
        severity: 'critical',
        description: 'Both drugs affect blood clotting through different mechanisms, greatly increasing bleeding risk.',
        recommendation: 'Use only under specialist supervision with close monitoring.'
    },
    {
        drug1Id: 'drug-004', // Aspirin
        drug2Id: 'drug-011', // Ibuprofen
        severity: 'moderate',
        description: 'Ibuprofen may reduce antiplatelet effects of aspirin and increase GI bleeding risk.',
        recommendation: 'Take aspirin at least 30 minutes before ibuprofen if both needed.'
    },
    {
        drug1Id: 'drug-005', // Lisinopril
        drug2Id: 'drug-011', // Ibuprofen
        severity: 'moderate',
        description: 'NSAIDs may reduce antihypertensive effect and increase risk of kidney damage.',
        recommendation: 'Monitor blood pressure and kidney function. Consider alternative pain relief.'
    },
    {
        drug1Id: 'drug-009', // Ciprofloxacin
        drug2Id: 'drug-003', // Warfarin
        severity: 'moderate',
        description: 'Ciprofloxacin may increase Warfarin effect by inhibiting its metabolism.',
        recommendation: 'Monitor INR more frequently during and after antibiotic course.'
    },
    {
        drug1Id: 'drug-001', // Metformin
        drug2Id: 'drug-009', // Ciprofloxacin
        severity: 'minor',
        description: 'Fluoroquinolones may rarely cause blood sugar changes in diabetic patients.',
        recommendation: 'Monitor blood glucose more frequently during antibiotic treatment.'
    },
];

export const mockDoctors: Doctor[] = [
    {
        id: 'doc-001',
        type: 'doctor',
        name: 'Dr. Priya Sharma',
        email: 'priya.sharma@medclinic.in',
        walletAddress: 'ALGO...XYZ1',
        verified: true,
        createdAt: new Date('2024-01-15'),
        licenseNumber: 'MCI-2019-12345',
        specialty: 'General Medicine',
        clinic: 'MedCare Clinic, Mumbai',
        subscriptionTier: 'clinic_starter',
        mintLimit: 100,
        mintsThisMonth: 47
    },
    {
        id: 'doc-002',
        type: 'doctor',
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh.kumar@healthplus.in',
        walletAddress: 'ALGO...ABC2',
        verified: true,
        createdAt: new Date('2024-02-20'),
        licenseNumber: 'MCI-2018-67890',
        specialty: 'Cardiology',
        clinic: 'Heart Care Hospital, Delhi',
        subscriptionTier: 'enterprise',
        mintLimit: 1000,
        mintsThisMonth: 234
    },
];

export const mockPatients: Patient[] = [
    {
        id: 'pat-001',
        type: 'patient',
        name: 'Amit Patel',
        email: 'amit.patel@gmail.com',
        walletAddress: 'ALGO...PAT1',
        verified: true,
        createdAt: new Date('2024-03-10'),
        dateOfBirth: new Date('1985-07-22'),
        bloodType: 'B+',
        allergies: ['Penicillin'],
        healthScore: 78,
        streak: 12,
        grantedAccessTo: ['doc-001', 'doc-002']
    },
    {
        id: 'pat-002',
        type: 'patient',
        name: 'Sunita Devi',
        email: 'sunita.devi@yahoo.com',
        walletAddress: 'ALGO...PAT2',
        verified: true,
        createdAt: new Date('2024-04-05'),
        dateOfBirth: new Date('1972-11-15'),
        bloodType: 'O+',
        allergies: [],
        healthScore: 65,
        streak: 5,
        grantedAccessTo: ['doc-001']
    },
    {
        id: 'pat-003',
        type: 'patient',
        name: 'Rahul Verma',
        email: 'rahul.verma@hotmail.com',
        walletAddress: 'ALGO...PAT3',
        verified: true,
        createdAt: new Date('2024-05-18'),
        dateOfBirth: new Date('1990-03-08'),
        bloodType: 'A+',
        allergies: ['Sulfa drugs'],
        healthScore: 92,
        streak: 30,
        grantedAccessTo: ['doc-002']
    },
];

export const mockPharmacists: Pharmacist[] = [
    {
        id: 'pharm-001',
        type: 'pharmacist',
        name: 'Vikram Singh',
        email: 'vikram@apollopharmacy.in',
        walletAddress: 'ALGO...PHM1',
        verified: true,
        createdAt: new Date('2024-01-01'),
        pharmacyId: 'pharmacy-001',
        pharmacyName: 'Apollo Pharmacy',
        pharmacyAddress: 'MG Road, Mumbai'
    },
];

export const mockPharmacies: Pharmacy[] = [
    {
        id: 'pharmacy-001',
        name: 'Apollo Pharmacy',
        address: 'MG Road, Mumbai',
        city: 'Mumbai',
        region: 'Maharashtra',
        inventory: mockDrugs.map(d => ({ drugId: d.id, quantity: Math.floor(Math.random() * 500) + 100 })),
        totalDispensed: 1247
    },
    {
        id: 'pharmacy-002',
        name: 'MedPlus',
        address: 'Connaught Place, New Delhi',
        city: 'New Delhi',
        region: 'Delhi',
        inventory: mockDrugs.map(d => ({ drugId: d.id, quantity: Math.floor(Math.random() * 500) + 100 })),
        totalDispensed: 892
    },
];

export const mockPrescriptions: Prescription[] = [
    {
        id: 'rx-001',
        assetId: 'ASA-9921',
        doctorId: 'doc-001',
        patientId: 'pat-001',
        drugs: [
            { drugId: 'drug-001', drugName: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '30 days', quantity: 60, notes: 'Take with meals' },
            { drugId: 'drug-005', drugName: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days', quantity: 30, notes: 'Take in morning' },
        ],
        status: 'minted',
        createdAt: new Date('2024-12-28T10:30:00'),
        txHash: '0x8f7e6d5c4b3a2910...',
    },
    {
        id: 'rx-002',
        assetId: 'ASA-9920',
        doctorId: 'doc-002',
        patientId: 'pat-002',
        drugs: [
            { drugId: 'drug-002', drugName: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', duration: '7 days', quantity: 21, notes: 'Complete full course' },
        ],
        status: 'dispensed',
        createdAt: new Date('2024-12-25T14:15:00'),
        dispensedAt: new Date('2024-12-25T16:30:00'),
        dispensedBy: 'pharm-001',
        dispensedAt_pharmacyId: 'pharmacy-001',
        txHash: '0x7e6d5c4b3a291087...',
    },
    {
        id: 'rx-003',
        assetId: 'ASA-9919',
        doctorId: 'doc-001',
        patientId: 'pat-003',
        drugs: [
            { drugId: 'drug-007', drugName: 'Omeprazole', dosage: '20mg', frequency: 'Once daily', duration: '14 days', quantity: 14, notes: 'Take before breakfast' },
            { drugId: 'drug-010', drugName: 'Paracetamol', dosage: '500mg', frequency: 'As needed', duration: '7 days', quantity: 20, notes: 'Max 4 times daily' },
        ],
        status: 'minted',
        createdAt: new Date('2024-12-29T09:00:00'),
        txHash: '0x6d5c4b3a29108765...',
    },
];

export const mockTransactions: Transaction[] = [
    {
        id: 'tx-001',
        type: 'mint',
        assetId: 'ASA-9921',
        prescriptionId: 'rx-001',
        initiatorId: 'doc-001',
        initiatorType: 'doctor',
        timestamp: new Date('2024-12-28T10:30:00'),
        txHash: '0x8f7e6d5c4b3a2910...',
        blockNumber: 45892341
    },
    {
        id: 'tx-002',
        type: 'mint',
        assetId: 'ASA-9920',
        prescriptionId: 'rx-002',
        initiatorId: 'doc-002',
        initiatorType: 'doctor',
        timestamp: new Date('2024-12-25T14:15:00'),
        txHash: '0x7e6d5c4b3a291087...',
        blockNumber: 45890123
    },
    {
        id: 'tx-003',
        type: 'burn',
        assetId: 'ASA-9920',
        prescriptionId: 'rx-002',
        initiatorId: 'pharm-001',
        initiatorType: 'pharmacist',
        timestamp: new Date('2024-12-25T16:30:00'),
        txHash: '0x5c4b3a2910876543...',
        blockNumber: 45890456
    },
];

export const mockNetworkStats: NetworkStats = {
    totalAssetsMinted: 15847,
    totalAssetsDispensed: 14293,
    fraudAttemptsBlocked: 127,
    networkUptime: 99.97,
    activeDoctors: 342,
    activePatients: 8921,
    activePharmacies: 156
};

// ============ HELPER FUNCTIONS ============

export function getDrugById(id: string): Drug | undefined {
    return mockDrugs.find(d => d.id === id);
}

export function getDrugByName(name: string): Drug | undefined {
    return mockDrugs.find(d =>
        d.name.toLowerCase().includes(name.toLowerCase()) ||
        d.genericName.toLowerCase().includes(name.toLowerCase())
    );
}

export function searchDrugs(query: string): Drug[] {
    const lowerQuery = query.toLowerCase();
    return mockDrugs.filter(d =>
        d.name.toLowerCase().includes(lowerQuery) ||
        d.genericName.toLowerCase().includes(lowerQuery) ||
        d.category.toLowerCase().includes(lowerQuery)
    );
}

export function checkDrugInteractions(drugIds: string[]): DrugInteraction[] {
    const interactions: DrugInteraction[] = [];
    for (let i = 0; i < drugIds.length; i++) {
        for (let j = i + 1; j < drugIds.length; j++) {
            const interaction = mockInteractions.find(
                int => (int.drug1Id === drugIds[i] && int.drug2Id === drugIds[j]) ||
                    (int.drug1Id === drugIds[j] && int.drug2Id === drugIds[i])
            );
            if (interaction) {
                interactions.push(interaction);
            }
        }
    }
    return interactions;
}

export function getPatientPrescriptions(patientId: string): Prescription[] {
    return mockPrescriptions.filter(p => p.patientId === patientId);
}

export function getDoctorPrescriptions(doctorId: string): Prescription[] {
    return mockPrescriptions.filter(p => p.doctorId === doctorId);
}

export function verifyToken(assetId: string): { valid: boolean; prescription?: Prescription; error?: string } {
    const prescription = mockPrescriptions.find(p => p.assetId === assetId);
    if (!prescription) {
        return { valid: false, error: 'Token not found' };
    }
    if (prescription.status === 'dispensed') {
        return { valid: false, error: `Token already dispensed at ${prescription.dispensedAt?.toLocaleString()}`, prescription };
    }
    if (prescription.status === 'expired' || prescription.status === 'cancelled') {
        return { valid: false, error: `Token is ${prescription.status}` };
    }
    return { valid: true, prescription };
}

export function calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
        age--;
    }
    return age;
}

export function calculateDosage(drugId: string, patientAge: number): string {
    const drug = getDrugById(drugId);
    if (!drug) return 'Unknown';

    if (patientAge < 18) {
        return drug.standardDosage.child;
    } else if (patientAge >= 65) {
        return drug.standardDosage.elderly;
    }
    return drug.standardDosage.adult;
}

export function generateAssetId(): string {
    const num = Math.floor(Math.random() * 10000);
    return `ASA-${num.toString().padStart(4, '0')}`;
}

export function generateTxHash(): string {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 20; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash + '...';
}
