"use client";

import { BrowserProvider, parseEther, formatEther } from 'ethers';
import { CELO_NETWORK, VERIFICATION_FEE, TREASURY_ADDRESS } from './config';

declare global {
    interface Window {
        ethereum?: any;
    }
}

export interface WalletState {
    address: string | null;
    balance: string | null;
    chainId: number | null;
    isConnected: boolean;
    isCorrectNetwork: boolean;
}

export class CeloWallet {
    private provider: BrowserProvider | null = null;

    // Check if MetaMask is installed
    isMetaMaskInstalled(): boolean {
        return typeof window !== 'undefined' && !!window.ethereum?.isMetaMask;
    }

    // Connect to MetaMask
    async connect(): Promise<WalletState> {
        if (!this.isMetaMaskInstalled()) {
            throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
        }

        try {
            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            if (!accounts || accounts.length === 0) {
                throw new Error('No accounts found. Please unlock MetaMask.');
            }

            this.provider = new BrowserProvider(window.ethereum);

            return await this.getWalletState();
        } catch (error: any) {
            if (error.code === 4001) {
                throw new Error('Connection rejected. Please approve the connection in MetaMask.');
            }
            throw error;
        }
    }

    // Get current wallet state
    async getWalletState(): Promise<WalletState> {
        if (!window.ethereum) {
            return {
                address: null,
                balance: null,
                chainId: null,
                isConnected: false,
                isCorrectNetwork: false,
            };
        }

        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            if (!accounts || accounts.length === 0) {
                return {
                    address: null,
                    balance: null,
                    chainId: null,
                    isConnected: false,
                    isCorrectNetwork: false,
                };
            }

            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            const chainIdDecimal = parseInt(chainId, 16);

            this.provider = new BrowserProvider(window.ethereum);
            const balance = await this.provider.getBalance(accounts[0]);

            return {
                address: accounts[0],
                balance: formatEther(balance),
                chainId: chainIdDecimal,
                isConnected: true,
                isCorrectNetwork: chainIdDecimal === CELO_NETWORK.chainIdDecimal,
            };
        } catch (error) {
            console.error('Error getting wallet state:', error);
            return {
                address: null,
                balance: null,
                chainId: null,
                isConnected: false,
                isCorrectNetwork: false,
            };
        }
    }

    // Switch to Celo network
    async switchToCelo(): Promise<boolean> {
        if (!window.ethereum) {
            throw new Error('MetaMask is not installed');
        }

        try {
            // First, try to switch to the network
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: CELO_NETWORK.chainId }],
            });
            return true;
        } catch (switchError: any) {
            console.log('Switch error code:', switchError.code, switchError.message);

            // Error code 4902 = chain not added, try to add it
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: CELO_NETWORK.chainId,
                                chainName: CELO_NETWORK.chainName,
                                nativeCurrency: CELO_NETWORK.nativeCurrency,
                                rpcUrls: CELO_NETWORK.rpcUrls,
                                blockExplorerUrls: CELO_NETWORK.blockExplorerUrls,
                            },
                        ],
                    });
                    return true;
                } catch (addError: any) {
                    // If network already exists with different settings, just return true
                    // The user manually added it, so we should proceed
                    if (addError.code === -32603 || addError.message?.includes('same RPC')) {
                        console.log('Network already exists, proceeding...');
                        return true;
                    }
                    throw new Error('Failed to add Celo network to MetaMask');
                }
            }

            // Error code -32603 = RPC error (network exists with different config)
            if (switchError.code === -32603 || switchError.message?.includes('same RPC')) {
                console.log('Network already exists with different config, checking current chain...');
                // Check if we're already on the right network
                const state = await this.getWalletState();
                if (state.isCorrectNetwork) {
                    return true;
                }
                // If not on correct network, ask user to switch manually
                throw new Error('Please switch to Celo Sepolia Testnet manually in MetaMask');
            }

            // User rejected the switch
            if (switchError.code === 4001) {
                throw new Error('Please approve the network switch in MetaMask');
            }

            throw switchError;
        }
    }

    // Send verification transaction
    async sendVerificationTransaction(): Promise<string> {
        if (!this.provider) {
            throw new Error('Wallet not connected');
        }

        const signer = await this.provider.getSigner();
        const address = await signer.getAddress();

        // Check balance
        const balance = await this.provider.getBalance(address);
        const requiredAmount = parseEther(VERIFICATION_FEE);

        if (balance < requiredAmount) {
            throw new Error(`Insufficient balance. You need at least ${VERIFICATION_FEE} CELO.`);
        }

        // Send transaction to treasury
        const tx = await signer.sendTransaction({
            to: TREASURY_ADDRESS,
            value: requiredAmount,
        });

        console.log('Transaction sent:', tx.hash);

        // Wait for confirmation
        const receipt = await tx.wait();

        if (!receipt || receipt.status === 0) {
            throw new Error('Transaction failed');
        }

        console.log('Transaction confirmed:', receipt.hash);
        return receipt.hash;
    }

    // Sign a message (alternative to transaction for verification)
    async signMessage(message: string): Promise<string> {
        if (!this.provider) {
            throw new Error('Wallet not connected');
        }

        const signer = await this.provider.getSigner();
        return await signer.signMessage(message);
    }

    // Listen for account changes
    onAccountsChanged(callback: (accounts: string[]) => void): void {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', callback);
        }
    }

    // Listen for chain changes
    onChainChanged(callback: (chainId: string) => void): void {
        if (window.ethereum) {
            window.ethereum.on('chainChanged', callback);
        }
    }

    // Remove listeners
    removeListeners(): void {
        if (window.ethereum) {
            window.ethereum.removeAllListeners?.();
        }
    }
}

// Singleton instance
export const celoWallet = new CeloWallet();
