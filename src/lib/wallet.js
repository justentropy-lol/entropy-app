// wallet.js
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    LedgerWalletAdapter,
    CoinbaseWalletAdapter,
    TrustWalletAdapter,
    MathWalletAdapter,
} from '@solana/wallet-adapter-wallets';

export const network = WalletAdapterNetwork.Mainnet;
const walletAdapters = [
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    LedgerWalletAdapter,
    CoinbaseWalletAdapter,
    TrustWalletAdapter,
    MathWalletAdapter,
];

export let selectedWallet = null;

export const loadWallets = () => {
    return walletAdapters.map(Adapter => new Adapter({ network }));
};

export const connectWallet = async (wallet) => {
    selectedWallet = wallet;
    if (!wallet.connected) {
        await wallet.connect();
    }
};

export const disconnectWallet = async () => {
    if (selectedWallet && selectedWallet.connected) {
        await selectedWallet.disconnect();
    }
};
