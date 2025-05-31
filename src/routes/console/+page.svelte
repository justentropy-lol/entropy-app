<script>
  import { onMount } from "svelte";
  import { activeModal } from "$lib/modals/modalControl.js";
  import { signMsg, isWalletConnected } from "$lib/wallet/connect.js";
  import LabelPair from "$lib/elements/LabelPair.svelte";

  const generate_message_endpoint = import.meta.env
    .VITE_API_GENERATE_MESSAGE_ENDPOINT;
  const verify_signature_api_endpoint = import.meta.env
    .VITE_API_VERIFY_SIGNATURE_ENDPOINT;
  const blobUrl = import.meta.env.VITE_BLOB_URL;

  function getDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    let Year;

    if (month > 9 || (month === 9 && day >= 1)) {
      Year = year + 5509;
    } else {
      Year = year + 5508;
    }

    const formattedMonth = String(month).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${Year}-${formattedMonth}-${formattedDay} ${hours}:${minutes}:${seconds}`;
  }

  const submit =
    blobUrl + "/assets/button_connect-CFWhbxmaPvLxFxVeH17Y9rtXSMwRV9.png";

  let errorMsg = "";
  let dataBoxDisplay = false;
  let dataReceived = false;
  let message = null;

  let resultDiv;
  let bottomDiv;

  let data = [];
  let currentPage = 0;
  $: totalPages = data.length;
  $: currentData = totalPages ? data[currentPage] : null;
  $: latestValueHex = currentData
    ? `0x${BigInt(currentData.value_latest).toString(16)}`
    : null;
  $: latestTimestampFormatted = currentData
    ? getDate(currentData.timestamp_latest)
    : null;
  $: valueMean = currentData ? currentData.value_mean : null;
  $: entropyMean = currentData
    ? -(
        valueMean * Math.log2(valueMean) +
        (1 - valueMean) * Math.log2(1 - valueMean)
      ).toFixed(6)
    : null;
  $: minerName = currentData ? currentData.miner_name : null;
  $: solAddy = currentData
    ? currentData.sol_addy.slice(0, 4) + "..." + currentData.sol_addy.slice(-4)
    : null;
  $: consecutiveReports = currentData ? currentData.consecutive_reports : null;
  $: intervalMean = currentData ? currentData.interval_mean.toFixed(3) : null;
  $: rank = currentData ? currentData.rank : null;
  $: totalRanked = currentData ? currentData.total_ranked : null;
  $: score = currentData ? currentData.score.toFixed(3) : null;
  $: ent_burned = currentData
    ? Number(currentData.ent_burned.toFixed(0)).toLocaleString("en-US")
    : null;
  $: ent_needed = currentData
    ? Number(currentData.ent_needed.toFixed(0)).toLocaleString("en-US")
    : null;
  $: days_of_rewards = currentData ? currentData.days_of_rewards : null;
  $: to_claim = currentData
    ? Number(currentData.rewards_to_claim.toFixed(0)).toLocaleString("en-US")
    : null;
  $: brokeEntropyTimestampFormatted = currentData
    ? getDate(currentData.timestamp_broke_entropy)
    : null;
  $: hours_since_violation = brokeEntropyTimestampFormatted
    ? Math.floor(
        (new Date() - new Date(currentData.timestamp_broke_entropy)) /
          (1000 * 60 * 60)
      )
    : null;
  $: displayPage = totalPages > 1 ? " #" + (currentPage + 1) : "";
  $: submitDisabled = (isWalletConnected && !message) || dataReceived;

  const handleClaim = async () => {
    errorMsg = "";
    if ($isWalletConnected) {
      activeModal.set("claim");
    } else {
      activeModal.set("wallet");
    }
  };

  const handleConnect = async () => {
    if (!submitDisabled) {
      if ($isWalletConnected) {
        dataReceived = true;
        try {
          const encodedPkg = await signMsg(message);

          const response = await fetch(verify_signature_api_endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/octet-stream",
            },
            body: encodedPkg.buffer,
          });

          data = await response.json();

          if (response.ok) {
            currentPage = 0;
            totalPages = data.length;
            errorMsg = "";
            dataBoxDisplay = true;
          } else {
            dataReceived = false;
            if (data.error === "INVALID_ADDRESS") {
              errorMsg = "No miner found that corresponds to your SOL address";
            } else {
              errorMsg = "Signature invalid, try and refresh the console";
            }
          }
        } catch (error) {
          dataReceived = false;
          errorMsg = "Signature invalid, try and refresh the console";
        }
      } else {
        activeModal.set("wallet");
      }
    }
  };

  function changePage(direction) {
    if (currentPage + direction >= 0 && currentPage + direction < totalPages) {
      currentPage += direction;
    }
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowUp") {
      changePage(-1);
    } else if (event.key === "ArrowDown") {
      changePage(1);
    }
  }

  function handleTouch(event) {
    // if (!resultDiv || !bottomDiv) return; // guard
    const touchY = event.touches ? event.touches[0].clientY : event.clientY;

    const bbResult = resultDiv.getBoundingClientRect();
    const bbBotom = bottomDiv.getBoundingClientRect();
    const divHeight = bbResult.bottom - bbResult.top;

    if (touchY >= bbResult.top && touchY <= bbResult.top + divHeight * 0.25) {
      changePage(-1);
    } else if (
      touchY >= bbResult.bottom - divHeight * 0.33 &&
      touchY <= bbBotom.bottom
    ) {
      changePage(1);
    }
  }

  onMount(async () => {
    const response = await fetch(generate_message_endpoint, {
      method: "POST",
    });
    message = await response.json();

    // window.addEventListener("keydown", handleKeyDown);
    // window.addEventListener("click", handleTouch);

    // return () => {
    //   window.removeEventListener("keydown", handleKeyDown);
    //   window.removeEventListener("click", handleTouch);
    // };
  });
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === "ArrowUp") changePage(-1);
    else if (e.key === "ArrowDown") changePage(1);
  }}
  on:click={handleTouch}
/>

<div class="absolute inset-0 z-0 bg-bground w-full h-full min-h-[1100px]"></div>

<div class="z-10 mt-16 w-9/12">
  <div class="flex">
    <button
      type="submit"
      class="flex justify-around m-4 px-4 py-2 w-full max-w-xs mx-auto transition duration-300"
      on:click={handleClaim}
    >
      <span
        class="px-4 py-2 bg-brand border-2 border-b-white text-white font-sans text-xl hover:bg-brand/80 transition-colors hover:shadow-[2px_2px_0px_0px_rgba(128,128,128,0.4)] duration-200"
      >
        CLAIM
      </span>
    </button>
    <button
      type="submit"
      class="flex justify-around m-4 px-4 py-2 w-full max-w-xs mx-auto transition duration-300"
      on:click={handleConnect}
      style="opacity: {submitDisabled
        ? 0.5
        : 1}; pointer-events: {submitDisabled ? 'none' : 'auto'};"
    >
      <span
        class="px-4 py-2 bg-brand border-2 border-b-white text-white font-sans text-xl hover:bg-brand/80 transition-colors hover:shadow-[2px_2px_0px_0px_rgba(128,128,128,0.4)] duration-200"
      >
        STATUS
      </span>
    </button>
  </div>

  {#if errorMsg}
    <div class="font-sans text-md text-center">
      {errorMsg}
    </div>
  {/if}
  <div
    bind:this={resultDiv}
    id="result"
    class="flex-none space-y-1 p-4 text-white sm:text-lg md:text-xl tracking-wider font-sans w-full max-w-xl mx-auto transition-opacity duration-500"
    style="opacity: {dataBoxDisplay ? 1 : 0}; pointer-events: {dataBoxDisplay
      ? 'auto'
      : 'none'};"
  >
    <LabelPair label="Miner{displayPage}:" desc={minerName} />
    <LabelPair label="Address:" desc={solAddy} />
    <LabelPair label="Latest value:" desc={latestValueHex} />
    <LabelPair label="Latest receipt:" desc={latestTimestampFormatted} />
    <LabelPair label="Mean entropy:" desc={entropyMean} />
    <LabelPair label="Mean interval:" desc="{intervalMean} h" />
    <LabelPair label="Consecutive reports:" desc={consecutiveReports} />
    {#if rank > 0}
      <LabelPair label="Rank:" desc="{rank} of {totalRanked}" />
      <LabelPair label="Score:" desc={score} />
    {/if}

    {#if to_claim}
      <LabelPair
        label="Amount accumulated:"
        desc="{to_claim} $ENT over past {days_of_rewards} day(s)"
      />
      <LabelPair label="Lifetime burn:" desc="{ent_burned} $ENT" />
      <LabelPair label="Second Law requirement:" desc="{ent_needed} $ENT" />

      {#if rank === 0}
        <div>
          Miner was unresponsive during the most recent epoch and was not
          ranked.
        </div>
      {/if}

      {#if brokeEntropyTimestampFormatted && hours_since_violation < 168 * totalPages}
        {#if hours_since_violation > 4}
          <div>
            No claim allowed. The Second Law was last violated on {brokeEntropyTimestampFormatted}.
          </div>
        {:else}
          <div>
            You are or have recently been in violation of The Second Law. When
            you come into compliance, please wait 6 hours before checking.
          </div>
        {/if}
      {/if}
    {:else}
      <div>Miner has reported but has not yet been ranked.</div>
    {/if}
  </div>
</div>
<div bind:this={bottomDiv} id="bottom" class="flex-grow"></div>

<style>
  #result {
    transition: opacity 2s ease-in-out;
  }
</style>
