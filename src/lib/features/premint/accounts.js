import { Buffer } from "buffer";

import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";

// token mints
const ENT_TOKEN_MINT = new web3.PublicKey(
  "ENTxR2RP8NtvhXzMNFCxE1HazzdV9x7SuZqGyAb4jdED"
);
const ENTALOL_TOKEN_MINT = new web3.PublicKey(
  "3ncoTcDEnLgrX2Li1iSQGt4HMzqigBetxZL4DghMpzcU"
);

// PreLaunch program and its main PDAs + main PDA ENT ATAs
const PRE_LAUNCH_PROGRAM = new web3.PublicKey(
  "DMZk98JYafH9oX4sXbVrvHrG6zwdmYyA3z6YH2ErbjNe"
);
const [globalPda] = web3.PublicKey.findProgramAddressSync(
  [Buffer.from("GLOBAL_PDA")],
  PRE_LAUNCH_PROGRAM
);
const [saleProceedsPda] = web3.PublicKey.findProgramAddressSync(
  [Buffer.from("SALE_PROCEEDS_PDA")],
  PRE_LAUNCH_PROGRAM
);
const saleProceedsPdaEntAta = token.getAssociatedTokenAddressSync(
  ENT_TOKEN_MINT,
  saleProceedsPda,
  true,
  token.TOKEN_2022_PROGRAM_ID
);
const [mintFeesPda] = web3.PublicKey.findProgramAddressSync(
  [Buffer.from("MINT_FEES_PDA")],
  PRE_LAUNCH_PROGRAM
);
const mintFeesPdaEntAta = token.getAssociatedTokenAddressSync(
  ENT_TOKEN_MINT,
  mintFeesPda,
  true,
  token.TOKEN_2022_PROGRAM_ID
);

export {
  ENT_TOKEN_MINT,
  ENTALOL_TOKEN_MINT,
  PRE_LAUNCH_PROGRAM,
  globalPda,
  saleProceedsPda,
  mintFeesPda,
  saleProceedsPdaEntAta,
  mintFeesPdaEntAta,
};
