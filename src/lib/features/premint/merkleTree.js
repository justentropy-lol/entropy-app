import { Buffer } from "buffer";
import * as web3 from "@solana/web3.js";

const LEAF_PREFIX = Buffer.from([0]);
const INTERMEDIATE_PREFIX = Buffer.from([1]);

function uintToBufferLE(num, byteLength = 8) {
  const buff = Buffer.alloc(byteLength);
  buff.writeBigUInt64LE(BigInt(num), 0);
  return buff;
}

async function hashv(buffers) {
  let combined = Buffer.concat(buffers);
  const hashBuffer = await crypto.subtle.digest("SHA-256", combined);
  return Buffer.from(hashBuffer);
}

function compareBuffs(a, b) {
  const minLength = Math.min(a.length, b.length);

  for (let i = 0; i < minLength; i++) {
    if (a[i] !== b[i]) {
      return a[i] - b[i];
    }
  }

  return a.length - b.length;
}

/**
 * Generates a Merkle inclusion proof for a given leaf.
 * @param {Buffer[]} leaves - Array of 32-byte leaf values.
 * @param {Buffer} leafToProve - The specific leaf to generate a proof for.
 * @returns {Promise<Buffer[] | null>} Promise resolving to the inclusion proof as an array of 32-byte hashes, or null if proof can't be generated.
 */
async function generateInclusionProof(leaves, leafToProve) {
  if (leaves.length === 0) {
    return null;
  }

  // Find the index of the leaf to prove
  const leafIndex = leaves.findIndex(
    (leaf) =>
      leaf.length === leafToProve.length &&
      leaf.every((byte, i) => byte === leafToProve[i])
  );

  if (leafIndex === -1) {
    return null;
  }

  // Start with leaf hashes
  let currentLevel = [];
  for (const leaf of leaves) {
    currentLevel.push(await hashv([LEAF_PREFIX, leaf]));
  }

  const proof = [];
  let currentIndex = leafIndex;

  // Build tree levels and collect proof hashes
  while (currentLevel.length > 1) {
    const nextLevel = [];

    // Process pairs and build next level
    for (let i = 0; i < currentLevel.length; i += 2) {
      let parent;
      if (i + 1 < currentLevel.length) {
        // We have a pair
        const left = currentLevel[i];
        const right = currentLevel[i + 1];
        // Order them consistently - smaller one goes first
        if (compareBuffs(left, right) <= 0) {
          parent = await hashv([INTERMEDIATE_PREFIX, left, right]);
        } else {
          parent = await hashv([INTERMEDIATE_PREFIX, right, left]);
        }
      } else {
        // Odd number case - duplicate the node
        const node = currentLevel[i];
        parent = await hashv([INTERMEDIATE_PREFIX, node, node]);
      }
      nextLevel.push(parent);
    }

    // Add the sibling to proof
    let siblingIndex;
    if (currentIndex % 2 === 0) {
      // We're on the left, get right sibling if exists
      siblingIndex =
        currentIndex + 1 < currentLevel.length
          ? currentIndex + 1
          : currentIndex;
    } else {
      // We're on the right, get left sibling
      siblingIndex = currentIndex - 1;
    }
    proof.push(currentLevel[siblingIndex]);

    // Update for next level
    currentIndex = Math.floor(currentIndex / 2);
    currentLevel = nextLevel;
  }

  return proof;
}

async function hashLeaves(minerAllocations) {
  const leavesHashes = [];
  for (let leaf of minerAllocations) {
    const pubkey = new web3.PublicKey(leaf[0]);
    leavesHashes.push(
      await hashv([pubkey.toBuffer(), uintToBufferLE(leaf[1])])
    );
  }
  return leavesHashes;
}

export { hashLeaves, generateInclusionProof };
