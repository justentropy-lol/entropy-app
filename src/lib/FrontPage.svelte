<script>
  import { activeModal } from "./modals/modalControl.js";
  import { isWalletConnected } from "./wallet/connect.js";

  const blobUrl = import.meta.env.VITE_BLOB_URL;

  const header = blobUrl + "/assets/header-pWmEYuXFGGsFeMZJaBaTxpWlJxCFC2.png";
  const mine =
    blobUrl + "/assets/button_mine-WeIhEkBTM1t32j7KNQk7qdFueMkXhZ.png";
  const claim =
    blobUrl + "/assets/button_claim-UEXufrlMCoopPp6KJowfwSI7GSaIBB.png";
  const perfect =
    blobUrl + "/assets/list_perfect-6GzGJgYZHv4IPtT2e2il9IMUVqyQ8O.png";
  const proud =
    blobUrl + "/assets/list_proud-Pl0lD0rbwghrIXxmhWUDy89qBYNtE8.png";
  const tokenomics =
    blobUrl + "/assets/list_tokenomics-piNIt02iNaz9qY9IIbrJnoQyFpTVEa.png";

  const discordLink = "https://discord.gg/puredepin";

  const handleClaim = async () => {
    if ($isWalletConnected) {
      activeModal.set("claim");
    } else {
      activeModal.set("wallet");
    }
  };
</script>

<img
  alt="ENTROPY: The world's first DePIN memecoin."
  src={header}
  class="w-11/12 min-w-80 max-w-4xl"
/>
<h1 class="hidden">ENTROPY</h1>
<h2 class="hidden">THE WORLD'S FIRST DEPIN MEME COIN</h2>
<div class="flex justify-around w-3/5 min-w-60 max-w-lg">
  <a
    href={discordLink}
    target="_blank"
    class="w-2/6 hover:opacity-75 active:opacity-50"
  >
    <img alt="mine button" src={mine} />
  </a>
  <button
    on:click={handleClaim}
    class="w-2/6 hover:opacity-75 active:opacity-50"
  >
    <img alt="claim button" src={claim} />
  </button>
</div>

<div
  class="flex-col space-y-4 mt-4 mb-4 justify-around w-7/12 min-w-72 max-w-md"
>
  <h3 class="hidden">
    ENTROPY is the perfect DePIN:
    <ul>
      <li>Ambiguous utility</li>
      <li>Centralized oracle</li>
      <li>People-owned</li>
      <li>Miner-focused</li>
    </ul>
  </h3>
  <img alt="ENTROPY is the perfect DePIN" src={perfect} />

  <h3 class="hidden">
    ENTROPY is proud to have:
    <ul>
      <li>No VC allocation</li>
      <li>No founder allocation</li>
      <li>No airdrop</li>
      <li>Perfect product-market fit</li>
    </ul>
  </h3>
  <img alt="ENTROPY is proud" src={proud} d />

  <h3 class="hidden">
    Tokenomics:
    <ul>
      <li>One-year halving schedule</li>
      <li>55.5B max supply</li>
      <li>2.38% platform fee (on claims only)</li>
      <li>Requires hardware to mine</li>
      <li>Unclaimed tokens get burned</li>
    </ul>
  </h3>
  <img alt="ENTROPY tokenomics" src={tokenomics} />
</div>
