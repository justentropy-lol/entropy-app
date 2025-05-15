<script>
  import { activeModal } from "./modals/modalControl.js";
  import { isWalletConnected } from "./wallet/connect.js";

  import Hero from "$lib/components/Hero.svelte";
  import Hero2 from "$lib/components/Hero2.svelte";
  import Hero3 from "$lib/components/Hero3.svelte";
  import Hero4 from "$lib/components/Hero4.svelte";

  const blobUrl = import.meta.env.VITE_BLOB_URL;

  const handleClaim = async () => {
    if ($isWalletConnected) {
      activeModal.set("claim");
    } else {
      activeModal.set("wallet");
    }
  };
</script>

<Hero />
<Hero2 />
<Hero3 />
<Hero4 />
