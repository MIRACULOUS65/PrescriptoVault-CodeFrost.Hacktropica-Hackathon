import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface InventoryItem {
    id: string;
    name: string;
    genericName: string;
    stock: number;
    minStock: number;
    unit: string;
    price: number;
    category: string;
}

export interface Provider {
    id: string;
    name: string;
    rating: number;
    deliveryTime: string;
}

export interface ProviderPrice {
    providerId: string;
    providerName: string;
    price: number;
    rating: number;
    deliveryTime: string;
    inStock: boolean;
}

export interface Order {
    id: string;
    itemId: string;
    itemName: string;
    quantity: number;
    providerId: string;
    providerName: string;
    price: number;
    totalCost: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
    orderDate: Date;
    estimatedDelivery: string;
}

interface PharmacyStore {
    inventory: InventoryItem[];
    orders: Order[];
    providers: Provider[];

    // Inventory actions
    addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
    updateInventoryItem: (id: string, updates: Partial<InventoryItem>) => void;
    updateStock: (id: string, newStock: number) => void;

    // Order actions
    createOrder: (order: Omit<Order, 'id' | 'orderDate' | 'status'>) => void;
    updateOrderStatus: (orderId: string, status: Order['status']) => void;

    // Provider actions
    getProviderPrices: (itemName: string) => ProviderPrice[];
}

const initialInventory: InventoryItem[] = [
    { id: "1", name: "Metformin", genericName: "Metformin HCl", stock: 450, minStock: 100, unit: "tablets", price: 0.15, category: "Diabetes" },
    { id: "2", name: "Lisinopril", genericName: "Lisinopril", stock: 320, minStock: 100, unit: "tablets", price: 0.20, category: "Cardiovascular" },
    { id: "3", name: "Amoxicillin", genericName: "Amoxicillin", stock: 85, minStock: 100, unit: "capsules", price: 0.25, category: "Antibiotic" },
    { id: "4", name: "Atorvastatin", genericName: "Atorvastatin Calcium", stock: 45, minStock: 100, unit: "tablets", price: 0.30, category: "Cardiovascular" },
    { id: "5", name: "Omeprazole", genericName: "Omeprazole", stock: 280, minStock: 100, unit: "capsules", price: 0.18, category: "Gastrointestinal" },
    { id: "6", name: "Aspirin", genericName: "Acetylsalicylic Acid", stock: 520, minStock: 150, unit: "tablets", price: 0.10, category: "Pain Relief" }
];

const initialProviders: Provider[] = [
    { id: "p1", name: "MedSupply India", rating: 4.8, deliveryTime: "2-3 days" },
    { id: "p2", name: "PharmaDirect", rating: 4.5, deliveryTime: "3-5 days" },
    { id: "p3", name: "HealthCare Wholesale", rating: 4.9, deliveryTime: "1-2 days" },
    { id: "p4", name: "QuickMeds", rating: 4.3, deliveryTime: "4-6 days" }
];

export const usePharmacyStore = create<PharmacyStore>()(
    persist(
        (set, get) => ({
            inventory: initialInventory,
            orders: [],
            providers: initialProviders,

            addInventoryItem: (item) => {
                const newItem: InventoryItem = {
                    ...item,
                    id: `item-${Date.now()}`
                };
                set((state) => ({
                    inventory: [...state.inventory, newItem]
                }));
            },

            updateInventoryItem: (id, updates) => {
                set((state) => ({
                    inventory: state.inventory.map(item =>
                        item.id === id ? { ...item, ...updates } : item
                    )
                }));
            },

            updateStock: (id, newStock) => {
                set((state) => ({
                    inventory: state.inventory.map(item =>
                        item.id === id ? { ...item, stock: newStock } : item
                    )
                }));
            },

            createOrder: (orderData) => {
                const newOrder: Order = {
                    ...orderData,
                    id: `order-${Date.now()}`,
                    orderDate: new Date(),
                    status: 'pending'
                };
                set((state) => ({
                    orders: [newOrder, ...state.orders]
                }));

                // Simulate order confirmation after 2 seconds
                setTimeout(() => {
                    get().updateOrderStatus(newOrder.id, 'confirmed');
                }, 2000);
            },

            updateOrderStatus: (orderId, status) => {
                set((state) => ({
                    orders: state.orders.map(order =>
                        order.id === orderId ? { ...order, status } : order
                    )
                }));
            },

            getProviderPrices: (itemName) => {
                const providers = get().providers;
                // Mock price variations based on provider
                return providers.map((provider, idx) => {
                    const basePrice = 0.20;
                    const variation = (Math.random() * 0.1) - 0.05; // ±5% variation
                    const price = basePrice + variation + (idx * 0.02);

                    return {
                        providerId: provider.id,
                        providerName: provider.name,
                        price: parseFloat(price.toFixed(2)),
                        rating: provider.rating,
                        deliveryTime: provider.deliveryTime,
                        inStock: Math.random() > 0.2 // 80% chance in stock
                    };
                }).sort((a, b) => a.price - b.price); // Sort by price
            }
        }),
        {
            name: 'pharmacy-store'
        }
    )
);
