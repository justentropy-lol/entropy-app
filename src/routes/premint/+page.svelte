<script>
  import { onMount } from "svelte";
  import { activeModal } from "$lib/modals/modalControl.js";
  import { isWalletConnected } from "$lib/wallet/connect.js";
  import { getPublicKey } from "$lib/wallet/connect.js";
  import {
    getAllocations,
    getBuyNftsTx,
  } from "$lib/features/premint/instructions.js";

  const blobUrl = import.meta.env.VITE_BLOB_URL;

  const check =
    blobUrl + "/assets/button_check-gslieJeclGnVSM2fmMOIInQh4xGTFc.png";
  const confirm =
    blobUrl + "/assets/confirm-wz8Cofeh3CXy3eH3W6r5AW9IDo4qFA.png";

  let premintAllocation = null;
  let pubKey = null;
  $: sliderValue = Math.floor((premintAllocation + 1) / 2);

  const handleAllocation = async () => {
    if ($isWalletConnected) {
      pubKey = await getPublicKey();
      console.log(pubKey);
      premintAllocation = await getAllocations(pubKey);
    } else {
      pubKey = null;
      premintAllocation = null;
      activeModal.set("wallet");
    }
  };

  const handleSubmit = async (nftsNb) => {
    if ($isWalletConnected) {
      pubKey = await getPublicKey();
      await getBuyNftsTx(pubKey.toBase58(), nftsNb);
    } else {
      activeModal.set("wallet");
    }
  };
</script>

<div
  class="font-display text-lg text-center p-10 flex flex-col items-center gap-6 min-w-72 max-w-lg w-11/12"
>
  <button
    type="submit"
    on:click={handleAllocation}
    class="pb-4 w-4/12 min-w-20 max-w-40 hover:opacity-75 active:opacity-50"
  >
    <img src={check} />
  </button>

  {#if $isWalletConnected && pubKey && typeof premintAllocation === "number"}
    {#if premintAllocation > 0}
      <div>
        Wallet {pubKey.toBase58().slice(0, 4)}...{pubKey.toBase58().slice(-4)} may
        pre-mint up to {premintAllocation}
        NFTs.
      </div>
      <div class="text-2xl">
        {#if premintAllocation > 1}
          Slide and
        {/if}
        Confirm below:
      </div>

      {#if premintAllocation > 1}
        <input
          type="range"
          min="1"
          max={premintAllocation}
          step="1"
          bind:value={sliderValue}
          class="w-full custom-slider"
        />
      {/if}

      <div>
        I wish to pre-mint {sliderValue} ENTROPY NFT{#if sliderValue > 1}s{/if}
        to my whitelisted wallet address. I understand that the collectible{#if sliderValue > 1}s{/if}
        will be airdropped upon the launch of ENTROPY: The Awakening. The tokens
        I am offering in exchange were rightfully earned by me for the entropy I
        generated. I confirm that I am not a snake&mdash;I am an ENTROPY whale.
      </div>

      <button
        type="submit"
        on:click={() => handleSubmit(sliderValue)}
        class="pt-4 w-4/12 min-w-20 max-w-40 hover:opacity-75 active:opacity-50"
      >
        <img src={confirm} />
      </button>
    {:else}
      <div>
        Wallet {pubKey.toBase58().slice(0, 4)}...{pubKey.toBase58().slice(-4)} has
        no allocation for pre-mint.
      </div>
    {/if}
  {:else}
    <div>Check wallet allocation above.</div>
  {/if}
</div>

<style>
  input[type="range"].custom-slider {
    -webkit-appearance: none;
    width: 100%;
    background: transparent;
  }

  input[type="range"].custom-slider::-webkit-slider-runnable-track {
    height: 4px;
    background: white;
  }

  input[type="range"].custom-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 20px;
    width: 6px;
    background: white;
    margin-top: -9px;
    cursor: pointer;
  }

  input[type="range"].custom-slider::-moz-range-track {
    height: 2px;
    background: white;
  }

  input[type="range"].custom-slider::-moz-range-thumb {
    height: 20px;
    width: 2px;
    background: white;
    cursor: pointer;
  }
</style>
