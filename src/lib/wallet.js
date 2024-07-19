// TODO: try with all of them
const supportedWallets = ["Phantom", "Solflare", "Backpack"];

const getProvider = () => {
  return window.solana;
};

const checkIfWalletConnected = () => {
  const provider = getProvider();

  return provider.isConnected;
};

const getPublicKey = () => {
  const provider = getProvider();

  if (provider.isConnected) {
    return provider.publicKey;
  }
};

const connectWallet = async () => {
  const provider = getProvider();

  if (!provider.isConnected) {
    await provider.connect();
  }
};

const disconnectWallet = async () => {
  const provider = getProvider();

  if (provider.isConnected) {
    await provider.disconnect();
  }
};

const signAndSubmitTx = async (transaction) => {
  const provider = getProvider();

  if (provider.isConnected) {
    try {
      // @solana/wallet-adapter requires us to set up our own RPC connection.
      // Luckily most browser wallets (e.g. Phantom, Solflare, Backpack) expose a `signAndSendTransaction`
      // method which allows us to leverage their optimized RPC.
      // Benefit for us: no RPC to set up. Benefit for user: submit txs via great RPCs.
      const { signature } = await provider.signAndSendTransaction(transaction);
      console.log(signature);
    } catch (err) {
      console.error(err);
    }
  }
};

export {
  checkIfWalletConnected,
  connectWallet,
  disconnectWallet,
  signAndSubmitTx,
  getPublicKey,
  supportedWallets,
};
