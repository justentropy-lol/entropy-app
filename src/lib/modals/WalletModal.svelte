<script>
  import { createEventDispatcher } from "svelte";
  import { supportedWallets, connectWallet } from "$lib/wallet/connect.js";

  const blobUrl = import.meta.env.VITE_BLOB_URL;

  const phantom =
    blobUrl + "/assets/phantom-pGdqPyQCACbxyNNnWO6kNNUTsg8kmg.png";
  const solflare =
    blobUrl + "/assets/solflare-WgRkHypRcCedYZI4NN68kyRxy8BA7D.png";
  const backpack =
    blobUrl + "/assets/backpack-mCkj7EgImaSU0ChkSGVWx85tUJo2uK.png";

  const walletImage = {
    phantom: phantom,
    solflare: solflare,
    backpack: backpack,
  };

  const dispatch = createEventDispatcher();

  const handleConnect = async (wallet) => {
    await connectWallet(wallet);
    dispatch("close");
  };

  // const selectWallet = (wallet) => {
  //   dispatch("select", { wallet: wallet });
  // };
</script>

<div
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  on:click={() => dispatch("close")}
>
  <div
    class="flex flex-col items-center justify-around w-5/12 min-w-48 max-w-60 space-y-6 bg-flamingo p-5 rounded-3xl shadow-lg"
    on:click|stopPropagation
  >
    {#each supportedWallets as wallet}
      <button
        on:click={() => handleConnect(wallet)}
        class="hover:opacity-75 active:opacity-50"
      >
        <img src={walletImage[wallet]} />
      </button>
    {/each}
  </div>
</div>
