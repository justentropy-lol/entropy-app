<script>
  import { writable } from "svelte/store";

  import { handleMinerClaimTx } from "$lib/wallet/claim.js";
  import { activeModal } from "$lib/modals/modalControl.js";

  import FrontPage from "$lib/FrontPage.svelte";
  import ClaimModal from "$lib/modals/ClaimModal.svelte";
  import ErrorModal from "$lib/modals/ErrorModal.svelte";

  $: errorCode = null;
  $: errorDetail = null;

  let claimingInProcess = false;

  const confirmClaim = async () => {
    claimingInProcess = true;
    try {
      await handleMinerClaimTx();
      activeModal.set(null);
    } catch (err) {
      if (err.code) {
        errorCode = err.code;
        if (err.detail) {
          errorDetail = err.detail;
        }
      } else {
        errorCode = "UNEXPECTED";
      }
      activeModal.set("error");
    } finally {
      claimingInProcess = false;
    }
  };

  const closeModal = () => {
    activeModal.set(null);
  };
</script>

<FrontPage />

{#if $activeModal === "claim"}
  <ClaimModal on:select={confirmClaim} on:close={closeModal} />
{/if}
{#if $activeModal === "error"}
  <ErrorModal code={errorCode} detail={errorDetail} on:close={closeModal} />
{/if}

{#if claimingInProcess}
  <div class="relative">
    <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div
        class="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-transparent border-t-white"
      ></div>
    </div>
  </div>
{/if}
