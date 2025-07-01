import { Buffer } from "buffer";

import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";

// token mints
const ENT_TOKEN_MINT = new web3.PublicKey(
  "ENTxR2RP8NtvhXzMNFCxE1HazzdV9x7SuZqGyAb4jdED"
);
const ENTALOL_TOKEN_MINT = new web3.PublicKey(
  "ENTA22nLx2nv8UdFBWgDaxrsNjnqd7fDY5GmsPnUizSM"
);

// PreLaunch program and its main PDAs + main PDA ENT ATAs
const PRE_LAUNCH_PROGRAM = new web3.PublicKey(
  "preGi48RF98zxxJJ8YG4ZBLTVRADL4anb5qhgLehnfn"
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
