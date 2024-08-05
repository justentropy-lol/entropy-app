/*
 * Test cases:
 * - try flow with all supported wallets (connect, claim, disconnect and reload page)
 * - try switching profile in the wallet. Currently done silently
 * - try browser/profile without some or all wallets
 * Done manually, passing. Could be automated at some point.
 */
const supportedWallets = ["phantom", "solflare", "backpack"];

// don't rely on `window.solana` as unclear which user wallet it refers
// https://docs.phantom.app/developer-powertools/wallet-standard
// https://github.com/wallet-standard/wallet-standard/blob/master/DESIGN.md
let _provider = null;

const setProvider = (walletName) => {
  switch (walletName) {
    case "phantom":
      if (window.phantom) {
        _provider = window.phantom.solana;
        console.log("connected wallet: phantom");
      } else {
        window.open("https://phantom.app/", "_blank");
      }
      break;
    case "solflare":
      if (window.solflare) {
        _provider = window.solflare;
        console.log("connected wallet: solflare");
      } else {
        window.open("https://solflare.com/", "_blank");
      }
      break;
    case "backpack":
      if (window.backpack) {
        _provider = window.backpack;
        console.log("connected wallet: backpack");
      } else {
        window.open("https://backpack.app/", "_blank");
      }
      break;
    default:
      console.error("Error connecting a Solana wallet");
  }
};

const checkIfWalletConnectedSetProvider = () => {
  for (const wallet of supportedWallets) {
    switch (wallet) {
      case "phantom":
        if (window.phantom && window.phantom.solana.isConnected) {
          setProvider("phantom");
          return true;
        }
        break;
      case "solflare":
        if (window.solflare && window.solflare.isConnected) {
          setProvider("solflare");
          return true;
        }
        break;
      case "backpack":
        if (window.backpack && window.backpack.isConnected) {
          setProvider("backpack");
          return true;
        }
        break;
    }
  }
  return false;
};

const getPublicKey = () => {
  if (_provider.isConnected) {
    return _provider.publicKey;
  }
};

const connectWallet = async (wallet) => {
  setProvider(wallet);

  if (!checkIfWalletConnected()) {
    await _provider.connect();
  }
};

const disconnectWallet = async () => {
  if (checkIfWalletConnected()) {
    await _provider.disconnect();
  }
};

const checkIfWalletConnected = () => {
  return _provider.isConnected;
};

const signAndSubmitTx = async (transaction) => {
  if (_provider.isConnected) {
    try {
      // @solana/wallet-adapter requires us to set up our own RPC connection.
      // Luckily most browser wallets (e.g. Phantom, Solflare, Backpack) expose a `signAndSendTransaction`
      // method which allows us to leverage their optimized RPC.
      // Benefit for us: no RPC to set up. Benefit for user: submit txs via great RPCs.
      const { signature } = await _provider.signAndSendTransaction(transaction);
      console.log(signature);
    } catch (err) {
      console.error(err);
    }
  }
};

export {
  checkIfWalletConnectedSetProvider,
  connectWallet,
  disconnectWallet,
  checkIfWalletConnected,
  signAndSubmitTx,
  getPublicKey,
  supportedWallets,
};
