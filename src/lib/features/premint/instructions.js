import { Buffer } from "buffer";
globalThis.Buffer = Buffer;

import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";

import {
  ENT_TOKEN_MINT,
  ENTALOL_TOKEN_MINT,
  PRE_LAUNCH_PROGRAM,
  globalPda,
  saleProceedsPda,
  mintFeesPda,
  saleProceedsPdaEntAta,
  mintFeesPdaEntAta,
} from "./accounts.js";
import { hashLeaves, generateInclusionProof } from "./merkleTree.js";
import allocations from "./allocations.js";

import { signAndSubmitTx } from "$lib/wallet/connect.js";

const rpcHost = import.meta.env.VITE_PREMINT_RPC_URL;
const CONNECTION = new web3.Connection(rpcHost);

const getAllocations = async (pubKey) => {
  // get ENT on wallet
  const minerEntAta = token.getAssociatedTokenAddressSync(
    ENT_TOKEN_MINT,
    pubKey,
    true,
    token.TOKEN_2022_PROGRAM_ID
  );

  const accountInfoEnt = await CONNECTION.getAccountInfo(minerEntAta);

  let balanceEnt = 0;
  if (accountInfoEnt) {
    const balanceEntResponse = await CONNECTION.getTokenAccountBalance(
      minerEntAta
    );
    balanceEnt = balanceEntResponse.value.uiAmount;
  }

  const fundsBasedMintLimit = Math.floor(balanceEnt / 2_020_202);

  // get ENTALOL on wallet
  const minerEntalolAta = token.getAssociatedTokenAddressSync(
    ENTALOL_TOKEN_MINT,
    pubKey,
    true,
    token.TOKEN_2022_PROGRAM_ID
  );

  const accountInfoEntalol = await CONNECTION.getAccountInfo(minerEntalolAta);

  let balanceEntalol = 0;
  if (accountInfoEntalol) {
    const balanceEntalolResponse = await CONNECTION.getTokenAccountBalance(
      minerEntalolAta
    );
    balanceEntalol = balanceEntalolResponse.value.uiAmount;
  }

  // find remaining ENTALOL allocation
  const leafIdx = allocations.findIndex(
    (alloc) => alloc[0] === pubKey.toBase58()
  );

  let allocation = 0;
  if (leafIdx > -1) {
    allocation = allocations[leafIdx][1] - balanceEntalol;
  }

  return { allocation, fundsBasedMintLimit };
};

const _getBuyNftsIx = (miner, nftsNb, minerAllocations, proof) => {
  // prepare accounts
  const minerEntAta = token.getAssociatedTokenAddressSync(
    ENT_TOKEN_MINT,
    miner,
    true,
    token.TOKEN_2022_PROGRAM_ID
  );

  const minerEntalolAta = token.getAssociatedTokenAddressSync(
    ENTALOL_TOKEN_MINT,
    miner,
    true,
    token.TOKEN_2022_PROGRAM_ID
  );

  // prepare ix data
  const createU64 = (num) => {
    const buff = Buffer.alloc(8);
    buff.writeBigUInt64LE(BigInt(num));
    return buff;
  };

  const createU32 = (num) => {
    const buff = Buffer.alloc(4);
    buff.writeUInt32LE(num);
    return buff;
  };

  const buyNftsBuff = Buffer.concat([
    Buffer.from([0]),
    createU64(nftsNb),
    createU64(minerAllocations),
    createU32(proof.length), // borsh expects u32 (4 bytes) for the length of dynamic containers
    Buffer.concat(proof),
  ]);

  const ix = new web3.TransactionInstruction({
    programId: PRE_LAUNCH_PROGRAM,
    keys: [
      // miner
      { pubkey: miner, isSigner: true, isWritable: false },
      // solana system programs
      {
        pubkey: web3.SystemProgram.programId,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: token.TOKEN_2022_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: token.ASSOCIATED_TOKEN_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
      // PDAs
      { pubkey: globalPda, isSigner: false, isWritable: false },
      { pubkey: saleProceedsPda, isSigner: false, isWritable: false },
      { pubkey: mintFeesPda, isSigner: false, isWritable: false },
      // ENT mint + ENT ATAs
      { pubkey: ENT_TOKEN_MINT, isSigner: false, isWritable: true },
      { pubkey: minerEntAta, isSigner: false, isWritable: true },
      { pubkey: saleProceedsPdaEntAta, isSigner: false, isWritable: true },
      { pubkey: mintFeesPdaEntAta, isSigner: false, isWritable: true },
      // ENTALOL mint + ENTALOL ATAs
      { pubkey: ENTALOL_TOKEN_MINT, isSigner: false, isWritable: true },
      { pubkey: minerEntalolAta, isSigner: false, isWritable: true },
    ],
    data: buyNftsBuff,
  });

  return ix;
};

const getBuyNftsTx = async (miner, nftsNb) => {
  const pubKey = new web3.PublicKey(miner);

  const leafIdx = allocations.findIndex(
    (alloc) => alloc[0] === pubKey.toBase58()
  );
  const minerAllocations = BigInt(allocations[leafIdx][1]);

  const hashedLeaves = await hashLeaves(allocations);
  const proof = await generateInclusionProof(
    hashedLeaves,
    hashedLeaves[leafIdx]
  );

  if (proof === null) {
    return null;
  }

  const latestBlock = await CONNECTION.getLatestBlockhash();
  const { blockhash, lastValidBlockHeight } = latestBlock;

  const transaction = new web3.Transaction({
    blockhash,
    lastValidBlockHeight,
    feePayer: pubKey,
  });

  const ix = _getBuyNftsIx(pubKey, nftsNb, minerAllocations, proof);
  transaction.add(ix);

  const txid = await signAndSubmitTx(transaction);
  // try {

  // } catch (err) {
  //   console.error("Error during signAndSubmitTx:", err);
  //   throw err;
  // }

  return txid;
};

export { getAllocations, getBuyNftsTx };
