<script>
  import "../app.css";
  import { onMount } from "svelte";
  import {
    checkIfWalletConnectedSetProvider,
    disconnectWallet,
    isWalletConnected,
  } from "$lib/wallet/connect.js";
  import { activeModal } from "$lib/modals/modalControl.js";
  import WalletModal from "$lib/modals/WalletModal.svelte";
  import Footer from "$lib/Footer.svelte";

  onMount(() => {
    checkIfWalletConnectedSetProvider();
  });

  const handleDisconnect = async () => {
    await disconnectWallet();
  };

  const closeModal = () => {
    activeModal.set(null);
  };
</script>

{#if $isWalletConnected}
  <button
    on:click={handleDisconnect}
    class="absolute top-0 right-0 p-4 text-2xl"
  >
    <i class="fa-solid fa-right-from-bracket"></i>
  </button>
{/if}

<div class="flex flex-col items-center justify-center min-h-screen">
  <slot />

  {#if $activeModal === "wallet"}
    <WalletModal on:close={closeModal} />
  {/if}

  <div class="flex justify-around space-x-2 mb-4 text-md">
    <Footer />
  </div>
</div>
