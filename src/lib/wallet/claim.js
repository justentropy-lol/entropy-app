// node.js polyfill from https://github.com/feross/buffer
import * as buffer from "buffer";
const { Buffer } = buffer;

import * as web3 from "@solana/web3.js";

import { getPublicKey, signAndSubmitTx } from "./connect.js";

const getClaimTx = async (minerPubkey) => {
  const oracleHost = import.meta.env.VITE_ORACLE_HOST;

  const httpRes = await fetch(`${oracleHost}/claim`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify({
      minerPubkey: minerPubkey,
    }),
  });

  if (httpRes.status === 400) {
    const errorData = await httpRes.json();
    throw { code: errorData.error, detail: errorData.message || null };
  }

  if (httpRes.status != 200) {
    // unlike in node, unhandled errors are painless, simply write a message to console
    throw new Error(`${httpRes.status}`);
  }

  const httpBody = await httpRes.json();

  console.log("claimTx: ", httpBody.claimTx);

  const bufferedTx = Buffer.from(httpBody.claimTx, "base64");
  const claimTx = web3.Transaction.from(bufferedTx);

  return claimTx;
};

const handleMinerClaimTx = async () => {
  const pubkey = getPublicKey().toBase58();
  try {
    const claimTx = await getClaimTx(pubkey);
    console.log(claimTx);
    await signAndSubmitTx(claimTx);
  } catch (error) {
    throw error;
  }
};

export { handleMinerClaimTx };
