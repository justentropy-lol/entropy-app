<script>
  import { createEventDispatcher } from "svelte";

  export let code;
  export let detail;

  // const blobUrl = import.meta.env.VITE_BLOB_URL;

  // const panel1 = blobUrl + "/assets/disclaimer-WdyCNHbQFczvH1yzJgkc9PLDuZWKTC.png";
  // const panel2 = blobUrl + "/assets/disclaimer2-COf6KLYjfflMspRbK9f5PY7l8ua6nG.png";

  // const confirm = blobUrl + "/assets/confirm-wz8Cofeh3CXy3eH3W6r5AW9IDo4qFA.png";

  const dispatch = createEventDispatcher();
</script>

<div
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  on:click={() => dispatch("close")}
>
  <div
    class="flex flex-col items-center justify-around min-w-60 max-w-[60vw] bg-flamingo p-5 rounded-3xl shadow-lg font-display text-2xl text-center"
    on:click|stopPropagation
  >
    {#if code === "NOT_REGISTERED"}
      No wallet found
    {:else if code === "CLAIM_EMPTY"}
      There is nothing to claim right now
    {:else if code === "BANNED_MINER"}
      Your credentials have been deactivated
    {:else if code === "SRCFUL_CONDITIONS_NOT_MET"}
      <p>You are not meeting the conditions to claim:</p>
      <p>1. Own an Elemental NFT</p>
      <p>2. Participate as a miner in Sourceful</p>
    {:else if code === "TRY_AGAIN_LATER"}
      <p>System under maintenance.</p>
      <p>Try again later.</p>
    {:else if code === "SECOND_LAW_BROKEN_CURRENT"}
      <p>Obey The Second Law...</p>
      <p>Check console for details.</p>
    {:else if code === "SECOND_LAW_BROKEN_RECENT"}
      <p>You broke The Second Law.</p>
      <p>Wait {detail}.</p>
    {:else if code === "LACK_MINING_NFT_NOW"}
      NFT requirement not met
    {:else if code === "LACK_MINING_NFT_RECENT"}
      <p>NFT requirement cooldown period.</p>
      <p>Wait {detail}.</p>
    {:else if code === "CLAIM_PROCESSING"}
      A claim is in process
    {/if}
  </div>
</div>
