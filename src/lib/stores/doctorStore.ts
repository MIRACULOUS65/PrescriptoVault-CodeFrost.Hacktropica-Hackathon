import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockPatients, mockPrescriptions, mockDrugs } from '../mockDb';
import type { Patient, Prescription, Drug } from '../mockDb';

interface DoctorStore {
    patients: Patient[];
    prescriptions: Prescription[];
    drugs: Drug[];

    // Patient actions
    addPatient: (patient: Omit<Patient, 'id' | 'createdAt'>) => void;
    updatePatient: (id: string, patient: Partial<Patient>) => void;
    deletePatient: (id: string) => void;

    // Prescription actions
    addPrescription: (prescription: Omit<Prescription, 'id' | 'createdAt' | 'assetId' | 'txHash'>) => void;
    updatePrescription: (id: string, prescription: Partial<Prescription>) => void;
    deletePrescription: (id: string) => void;
}

export const useDoctorStore = create<DoctorStore>()(
    persist(
        (set) => ({
            patients: mockPatients,
            prescriptions: mockPrescriptions,
            drugs: mockDrugs,

            addPatient: (patient) =>
                set((state) => ({
                    patients: [
                        ...state.patients,
                        {
                            ...patient,
                            id: `pat-${Date.now()}`,
                            createdAt: new Date(),
                        } as Patient,
                    ],
                })),

            updatePatient: (id, patient) =>
                set((state) => ({
                    patients: state.patients.map((p) =>
                        p.id === id ? { ...p, ...patient } : p
                    ),
                })),

            deletePatient: (id) =>
                set((state) => ({
                    patients: state.patients.filter((p) => p.id !== id),
                })),

            addPrescription: (prescription) =>
                set((state) => ({
                    prescriptions: [
                        ...state.prescriptions,
                        {
                            ...prescription,
                            id: `rx-${Date.now()}`,
                            assetId: `ASA-${Math.floor(Math.random() * 10000)}`,
                            createdAt: new Date(),
                            txHash: `0x${Math.random().toString(16).substring(2, 18)}...`,
                        } as Prescription,
                    ],
                })),

            updatePrescription: (id, prescription) =>
                set((state) => ({
                    prescriptions: state.prescriptions.map((p) =>
                        p.id === id ? { ...p, ...prescription } : p
                    ),
                })),

            deletePrescription: (id) =>
                set((state) => ({
                    prescriptions: state.prescriptions.filter((p) => p.id !== id),
                })),
        }),
        {
            name: 'doctor-store',
        }
    )
);
