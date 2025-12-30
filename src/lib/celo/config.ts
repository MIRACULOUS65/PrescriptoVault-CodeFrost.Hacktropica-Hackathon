// Celo Network Configuration

export const CELO_MAINNET = {
    chainId: '0xa4ec', // 42220
    chainIdDecimal: 42220,
    chainName: 'Celo Mainnet',
    nativeCurrency: {
        name: 'CELO',
        symbol: 'CELO',
        decimals: 18,
    },
    rpcUrls: ['https://forno.celo.org'],
    blockExplorerUrls: ['https://celoscan.io'],
};

// Celo Sepolia Testnet
export const CELO_SEPOLIA = {
    chainId: '0xaa1266', // 11142220 in hex
    chainIdDecimal: 11142220,
    chainName: 'Celo Sepolia Testnet',
    nativeCurrency: {
        name: 'CELO',
        symbol: 'CELO',
        decimals: 18,
    },
    rpcUrls: ['https://forno.celo-sepolia.celo-testnet.org'],
    blockExplorerUrls: ['https://sepolia.celoscan.io'],
};

// Use Sepolia testnet for development, mainnet for production
export const CELO_NETWORK = process.env.NODE_ENV === 'production'
    ? CELO_MAINNET
    : CELO_SEPOLIA;

// Verification fee in CELO (0.001 CELO for testnet)
export const VERIFICATION_FEE = '0.001';

// Treasury address to receive verification fees
export const TREASURY_ADDRESS = '0x3bE3f44cCFF04b0DBe03ADe00710f35eBc387151';
