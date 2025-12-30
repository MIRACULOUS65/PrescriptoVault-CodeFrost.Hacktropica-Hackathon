// Mock Blockchain Operations for PrescriptoVault
// Simulates Algorand ASA minting, burning, and verification

import {
    mockPrescriptions,
    mockTransactions,
    generateAssetId,
    generateTxHash,
    type Prescription,
    type Transaction
} from './mockDb';

const prescriptions = [...mockPrescriptions];
const transactions = [...mockTransactions];
let blockNumber = 45892500;

export interface MintResult {
    success: boolean;
    assetId?: string;
    txHash?: string;
    blockNumber?: number;
    error?: string;
}

export interface BurnResult {
    success: boolean;
    txHash?: string;
    blockNumber?: number;
    error?: string;
}

export interface VerificationResult {
    valid: boolean;
    status: 'VERIFIED' | 'FRAUD_ALERT' | 'NOT_FOUND' | 'EXPIRED';
    prescription?: Prescription;
    message: string;
    dispensedAt?: Date;
    dispensedBy?: string;
}

export async function mintPrescription(
    doctorId: string,
    patientId: string,
    drugs: Prescription['drugs']
): Promise<MintResult> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
        const assetId = generateAssetId();
        const txHash = generateTxHash();
        blockNumber++;

        const newPrescription: Prescription = {
            id: `rx-${Date.now()}`,
            assetId,
            doctorId,
            patientId,
            drugs,
            status: 'minted',
            createdAt: new Date(),
            txHash
        };

        const newTransaction: Transaction = {
            id: `tx-${Date.now()}`,
            type: 'mint',
            assetId,
            prescriptionId: newPrescription.id,
            initiatorId: doctorId,
            initiatorType: 'doctor',
            timestamp: new Date(),
            txHash,
            blockNumber
        };

        prescriptions.push(newPrescription);
        transactions.push(newTransaction);

        return {
            success: true,
            assetId,
            txHash,
            blockNumber
        };
    } catch {
        return {
            success: false,
            error: 'Failed to mint prescription token'
        };
    }
}

export async function burnToken(
    assetId: string,
    pharmacistId: string,
    pharmacyId: string
): Promise<BurnResult> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
        const prescriptionIndex = prescriptions.findIndex(p => p.assetId === assetId);
        if (prescriptionIndex === -1) {
            return { success: false, error: 'Token not found' };
        }

        const prescription = prescriptions[prescriptionIndex];
        if (prescription.status === 'dispensed') {
            return { success: false, error: 'Token already dispensed' };
        }

        const txHash = generateTxHash();
        blockNumber++;

        // Update prescription
        prescriptions[prescriptionIndex] = {
            ...prescription,
            status: 'dispensed',
            dispensedAt: new Date(),
            dispensedBy: pharmacistId,
            dispensedAt_pharmacyId: pharmacyId
        };

        const newTransaction: Transaction = {
            id: `tx-${Date.now()}`,
            type: 'burn',
            assetId,
            prescriptionId: prescription.id,
            initiatorId: pharmacistId,
            initiatorType: 'pharmacist',
            timestamp: new Date(),
            txHash,
            blockNumber
        };

        transactions.push(newTransaction);

        return {
            success: true,
            txHash,
            blockNumber
        };
    } catch {
        return {
            success: false,
            error: 'Failed to burn token'
        };
    }
}

export async function verifyToken(assetId: string): Promise<VerificationResult> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const prescription = prescriptions.find(p => p.assetId === assetId);

    if (!prescription) {
        return {
            valid: false,
            status: 'NOT_FOUND',
            message: 'Token not found in the ledger. This may be a fraudulent token.'
        };
    }

    if (prescription.status === 'dispensed') {
        return {
            valid: false,
            status: 'FRAUD_ALERT',
            prescription,
            message: `⚠️ FRAUD ALERT: This token was already dispensed`,
            dispensedAt: prescription.dispensedAt,
            dispensedBy: prescription.dispensedBy
        };
    }

    if (prescription.status === 'expired' || prescription.status === 'cancelled') {
        return {
            valid: false,
            status: 'EXPIRED',
            prescription,
            message: `Token is ${prescription.status}`
        };
    }

    return {
        valid: true,
        status: 'VERIFIED',
        prescription,
        message: '✓ Token verified successfully. Ready for dispensing.'
    };
}

export function getAuditLog(): Transaction[] {
    return [...transactions].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export function getPrescriptionByAssetId(assetId: string): Prescription | undefined {
    return prescriptions.find(p => p.assetId === assetId);
}

export function getAllPrescriptions(): Prescription[] {
    return [...prescriptions];
}

export function getPatientPrescriptions(patientId: string): Prescription[] {
    return prescriptions.filter(p => p.patientId === patientId);
}

export function getDoctorPrescriptions(doctorId: string): Prescription[] {
    return prescriptions.filter(p => p.doctorId === doctorId);
}

// QR Code generation helpers
export interface QRPayload {
    assetId: string;
    generatedAt: number;
    expiresAt: number;
    patientId: string;
}

export function generateQRPayload(assetId: string, patientId: string): QRPayload {
    const now = Date.now();
    return {
        assetId,
        generatedAt: now,
        expiresAt: now + 5 * 60 * 1000, // 5 minutes
        patientId
    };
}

export function isQRExpired(payload: QRPayload): boolean {
    return Date.now() > payload.expiresAt;
}

export function encodeQRPayload(payload: QRPayload): string {
    return btoa(JSON.stringify(payload));
}

export function decodeQRPayload(encoded: string): QRPayload | null {
    try {
        return JSON.parse(atob(encoded));
    } catch {
        return null;
    }
}
