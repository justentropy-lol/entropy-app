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
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  on:click={() => dispatch("close")}
>
  <div
    class="flex flex-col items-center justify-around min-w-60 max-w-[60vw] bg-flamingo p-5 rounded-3xl shadow-lg font-display text-2xl text-center"
    on:click|stopPropagation
  >
    {#if code === "ADDRESS_NOT_REGISTERED"}
      No wallet found.
    {:else if code === "CLAIM_EMPTY"}
      There is nothing to claim right now.
    {:else if code === "ENT_LOW_CURRENT"}
      <p>Your balance is low by the following amount...</p>
      <p>{detail} $ENT</p>
    {:else if code === "ENT_LOW_RECENT"}
      <p>Your balance was too low in the past seven days.</p>
      <p>Please wait {detail}.</p>
    {:else if code === "CLAIM_PROCESSING"}
      A claim is in process.
    {/if}
  </div>
</div>
