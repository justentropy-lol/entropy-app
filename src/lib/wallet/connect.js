/*
 * Test cases:
 * - try flow with all supported wallets (connect, claim, disconnect and reload page)
 * - try switching profile in the wallet. Currently done silently
 * - try browser/profile without some or all wallets
 * Done manually, passing. Could be automated at some point.
 */
import { writable } from "svelte/store";
const supportedWallets = ["phantom", "solflare", "backpack"];

// don't rely on `window.solana` as unclear which user wallet it refers
// https://docs.phantom.app/developer-powertools/wallet-standard
// https://github.com/wallet-standard/wallet-standard/blob/master/DESIGN.md
let _provider = null;
const isWalletConnected = writable(false);

const setProvider = (walletName) => {
  switch (walletName) {
    case "phantom":
      if (window.phantom) {
        _provider = window.phantom.solana;
      } else {
        window.open("https://phantom.app/", "_blank");
      }
      break;
    case "solflare":
      if (window.solflare) {
        _provider = window.solflare;
      } else {
        window.open("https://solflare.com/", "_blank");
      }
      break;
    case "backpack":
      if (window.backpack) {
        _provider = window.backpack;
      } else {
        window.open("https://backpack.app/", "_blank");
      }
      break;
    case "null":
      _provider = null;
      break;
    default:
      console.error("Error connecting a Solana wallet");
  }
};

const checkIfWalletConnectedSetProvider = async () => {
  for (const wallet of supportedWallets) {
    if (!_provider) {
      switch (wallet) {
        case "phantom":
          if (window.phantom) {
            setProvider("phantom");
            try {
              await _provider.connect({ onlyIfTrusted: true });
            } catch (error) {
              // do nothing
            } finally {
              if (checkIfWalletConnected()) {
                return true;
              } else {
                setProvider("null");
              }
            }
          }
          break;
        case "solflare":
          if (window.solflare && window.solflare.isConnected) {
            setProvider("solflare");
            //await _provider.connect();
            if (checkIfWalletConnected()) {
              return true;
            } else {
              setProvider("null");
            }
          }
          break;
        case "backpack":
          if (window.backpack && window.backpack.isConnected) {
            setProvider("backpack");
            //await _provider.connect();
            if (checkIfWalletConnected()) {
              return true;
            } else {
              setProvider("null");
            }
          }
          break;
      }
    }
  }
  return false;
};

const getPublicKey = () => {
  if (_provider && _provider.isConnected) {
    return _provider.publicKey;
  }
};

const connectWallet = async (wallet) => {
  setProvider(wallet);

  if (!checkIfWalletConnected()) {
    await _provider.connect();
    checkIfWalletConnected();
  }
};

const disconnectWallet = async () => {
  if (checkIfWalletConnected()) {
    await _provider.disconnect();
    checkIfWalletConnected();
  }
};

const checkIfWalletConnected = () => {
  const isConnected = _provider ? _provider.isConnected : false;
  isWalletConnected.set(isConnected);
  return isConnected;
};

const signMsg = async (msg) => {
  if (_provider && _provider.isConnected) {
    try {
      const encodedMessage = new TextEncoder().encode(msg);
      const signedMessage = await _provider.signMessage(encodedMessage);

      const encodedSignature = signedMessage.signature;
      const encodedKey = getPublicKey().toBytes();

      const totalLength = 32 + 64 + encodedMessage.length;

      // Create a new Uint8Array to hold all the data
      const combinedArray = new Uint8Array(totalLength);
      combinedArray.set(encodedKey, 0);
      combinedArray.set(encodedSignature, 32);
      combinedArray.set(encodedMessage, 96);

      return combinedArray;
    } catch (err) {
      console.error(err);
    }
  }
};

const signAndSubmitTx = async (transaction) => {
  if (_provider && _provider.isConnected) {
    try {
      // @solana/wallet-adapter requires us to set up our own RPC connection.
      // Luckily most browser wallets (e.g. Phantom, Solflare, Backpack) expose a `signAndSendTransaction`
      // method which allows us to leverage their optimized RPC.
      // Benefit for us: no RPC to set up. Benefit for user: submit txs via great RPCs.
      const { signature } = await _provider.signAndSendTransaction(transaction);
      console.log(signature);
    } catch (err) {
      //console.error(err);
      throw err;
    }
  }
};

export {
  checkIfWalletConnectedSetProvider,
  connectWallet,
  disconnectWallet,
  checkIfWalletConnected,
  signMsg,
  signAndSubmitTx,
  getPublicKey,
  isWalletConnected,
  supportedWallets,
};
