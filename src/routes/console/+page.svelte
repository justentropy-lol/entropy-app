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

  let result = "";
  let errorMsg = "";
  let latestValueHex = "";
  let latestTimestampFormatted = "";
  let minerName = "";
  let consecutiveReports = 0;
  let valueMean = 0.5;
  let intervalMean = 0.0;
  let entropyMean = 1;
  let rank = 0;
  let totalRanked = 0;
  let score = 0;
  let ent_needed = 0;
  let days_of_rewards = 0;
  let to_claim = 0;
  let days_since_violation = 0;
  let dataBoxDisplay = false;
  let dataReceived = false;
  let message = null;

  $: submitDisabled = (isWalletConnected && !message) || dataReceived;

  onMount(async () => {
    const response = await fetch(generate_message_endpoint, {
      method: "POST",
    });
    message = await response.json();
  });

  const processResponse = (data) => {
    errorMsg = "";
    const valueLatest = BigInt(data[0].value_latest_str);
    latestValueHex = `0x${valueLatest.toString(16)}`;
    latestTimestampFormatted = getDate(data[0].timestamp_latest);
    valueMean = data[0].value_mean;
    entropyMean = -(
      valueMean * Math.log2(valueMean) +
      (1 - valueMean) * Math.log2(1 - valueMean)
    ).toFixed(3);
    minerName = data[0].miner_name;
    consecutiveReports = data[0].consecutive_reports;
    intervalMean = data[0].interval_mean.toFixed(3);
    rank = data[0].rank;
    totalRanked = data[0].total_ranked;
    score = data[0].score.toFixed(3);
    ent_needed = Number(data[0].ent_needed.toFixed(0)).toLocaleString("en-US");
    days_of_rewards = data[0].days_of_rewards;
    to_claim = Number(data[0].rewards_to_claim.toFixed(0)).toLocaleString(
      "en-US"
    );
    days_since_violation = data[0].days_since_violation;
    dataBoxDisplay = true;
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

          const data = await response.json();

          if (response.ok) {
            processResponse(data);
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
</script>

<button
  type="submit"
  class="flex justify-around mt-4 px-4 py-2 transition duration-300"
>
  <img
    alt="submit button"
    src={submit}
    on:click={handleConnect}
    class="w-3/12 transition duration-300 active:opacity-50"
    style="opacity: {submitDisabled ? 0.5 : 1}; pointer-events: {submitDisabled
      ? 'none'
      : 'auto'};"
  />
</button>
{#if errorMsg}
  <div class="font-display text-2xl text-center">
    {errorMsg}
  </div>
{/if}
<div
  id="result"
  class="flex-grow space-y-1 p-4 text-white text-xl tracking-wider font-sans max-w-xl mx-auto transition-opacity duration-500"
  style="opacity: {dataBoxDisplay ? 1 : 0}; pointer-events: {dataBoxDisplay
    ? 'auto'
    : 'none'};"
>
  <LabelPair label="Miner name:" desc={minerName} />
  <LabelPair label="Latest value:" desc={latestValueHex} />
  <LabelPair label="Latest receipt:" desc={latestTimestampFormatted} />
  <LabelPair label="Mean entropy:" desc={entropyMean} />
  <LabelPair label="Mean interval:" desc="{intervalMean} h" />
  <LabelPair label="Consecutive reports:" desc={consecutiveReports} />
  <LabelPair label="Rank:" desc="{rank} of {totalRanked}" />
  <LabelPair label="Score:" desc={score} />
  <LabelPair
    label="Amount accumulated:"
    desc="{to_claim} $ENT over past {days_of_rewards} day(s)"
  />
  <LabelPair label="Second Law requirement:" desc="{ent_needed} $ENT" />
  <div>
    {#if days_since_violation}
      {#if days_since_violation < 8}
        No claim allowed. The Second Law was violated within the past {days_since_violation}
        day(s).
      {/if}
    {/if}
  </div>
</div>
