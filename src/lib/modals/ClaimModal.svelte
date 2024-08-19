<script>
  import { createEventDispatcher } from "svelte";

  const blobUrl = import.meta.env.VITE_BLOB_URL;

  const panel1 =
    blobUrl + "/assets/disclaimer-WdyCNHbQFczvH1yzJgkc9PLDuZWKTC.png";
  const panel2 =
    blobUrl + "/assets/disclaimer2-COf6KLYjfflMspRbK9f5PY7l8ua6nG.png";

  const confirm =
    blobUrl + "/assets/confirm-wz8Cofeh3CXy3eH3W6r5AW9IDo4qFA.png";

  const dispatch = createEventDispatcher();

  const confirmClick = () => {
    dispatch("select");
  };
</script>

<div
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  on:click={() => dispatch("close")}
>
  <div
    class="flex flex-col items-center justify-around min-w-60 max-w-[60vw] space-y-0 bg-flamingo p-5 rounded-3xl shadow-lg"
    on:click|stopPropagation
  >
    <img src={panel1} />
    <img src={panel2} />
    <button
      on:click={confirmClick}
      class="pt-4 w-3/12 min-w-20 max-w-40 hover:opacity-75 active:opacity-50"
    >
      <img src={confirm} />
    </button>
  </div>
</div>
