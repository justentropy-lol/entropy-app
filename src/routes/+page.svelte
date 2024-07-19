<script>
  import Footer from "$lib/Footer.svelte";

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

  let refHeight = 10;
  let mtBannerMult = 1 / 3;
  let mtButtonMult = 1 / 3;
  let mtExplainerMult = 1.2;
  let yExplainer = 1 / 2;
  let mtSocialsMult = 1.5;

  const discordLink = "https://discord.gg/puredepin";

  import { onMount } from "svelte";
  import {
    checkIfWalletConnected,
    connectWallet,
    disconnectWallet,
  } from "$lib/wallet.js";
  import { handleMinerClaimTx } from "$lib/claim.js";
  import WalletModal from "$lib/WalletModal.svelte";

  let walletConnected = false;
  let showModal = false;

  onMount(() => {
    walletConnected = checkIfWalletConnected();
  });

  const handleClaim = async () => {
    if (walletConnected) {
      // TODO: show some spinning wheel while waiting
      // Also deactivate the button while the operation is going on, otherwise user can click several times
      await handleMinerClaimTx();
    } else {
      openModal();
    }
  };

  const handleConnect = async () => {
    await connectWallet();
    showModal = false;
    walletConnected = true;
  };

  const handleDisconnect = async () => {
    await disconnectWallet();
    walletConnected = false;
  };

  const openModal = () => {
    showModal = true;
  };

  const closeModal = () => {
    showModal = false;
  };
</script>

{#if walletConnected}
  <button
    on:click={handleDisconnect}
    class="absolute top-0 right-0 p-4 text-2xl"
  >
    <i class="fa-solid fa-right-from-bracket"></i>
  </button>
{/if}

<div class="flex flex-col items-center justify-center">
  <img
    alt="ENTROPY: The world's first DePIN memecoin."
    src={header}
    class="w-11/12 min-w-80 max-w-4xl"
    style="margin-top: {refHeight * mtBannerMult}px"
  />
  <h1 class="hidden">ENTROPY</h1>
  <h2 class="hidden">THE WORLD'S FIRST DEPIN MEME COIN</h2>
  <div
    class="flex justify-around w-3/5 min-w-60 max-w-lg"
    bind:clientHeight={refHeight}
    style="margin-top: {refHeight * mtButtonMult}px"
  >
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

  {#if showModal}
    <WalletModal on:select={handleConnect} on:close={closeModal} />
  {/if}

  <div
    class="flex-col justify-around w-7/12 min-w-72 max-w-md"
    style="margin-top: {refHeight * mtExplainerMult}px"
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
    <img
      alt="ENTROPY is the perfect DePIN"
      src={perfect}
      style="margin-bottom: {refHeight * yExplainer}px"
    />

    <h3 class="hidden">
      ENTROPY is proud to have:
      <ul>
        <li>No VC allocation</li>
        <li>No founder allocation</li>
        <li>No airdrop</li>
        <li>Perfect product-market fit</li>
      </ul>
    </h3>
    <img
      alt="ENTROPY is proud"
      src={proud}
      style="margin-bottom: {refHeight * yExplainer}px"
    />

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

  <div
    class="flex justify-around space-x-2 mb-4 text-md"
    style="margin-top: {refHeight * mtSocialsMult}px"
  >
    <Footer />
  </div>
</div>
