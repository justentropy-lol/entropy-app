<script>
  import Footer from "$lib/Footer.svelte" 

  const api_endpoint = import.meta.env.VITE_API_MINER_QUERY_ENDPOINT;
  const blobUrl = import.meta.env.VITE_BLOB_URL;

  const submit = blobUrl + "/assets/button_submit-00dEiJQcR1pzyfl804W8U0cBd73o1j.png";

  let input = '';
  let result = '';
  let errorMsg = '';
  let latestValueHex = '';
  let latestTimestampFormatted = '';
  let valueMean = 0.5;
  let intervalMean = 0.0;
  let entropyMean = 1;
  let dataBoxDisplay = false;
  let submitDisabled = false;


  async function handleSubmit(e) {
    e.preventDefault();

    if(!submitDisabled) {
      submitDisabled = true;

      try {
        const response = await fetch(api_endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input }),
        });

        const data = await response.json();
        processResponse(data);
      } catch (error) {
        result = `Error: ${error.message}`;
      }
      setTimeout(() => { submitDisabled = false; }, 700); 
    }
  }

  function processResponse(data) {
    if (data.error) {
      errorMsg = data.error;
      dataBoxDisplay = false;
    } else {
      errorMsg = '';
      latestValueHex = `0x${parseInt(data.value_latest, 10).toString(16)}`;
      const date = new Date(data.timestamp_latest);
      latestTimestampFormatted = date.toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      valueMean = data.value_mean
      entropyMean = -(valueMean*Math.log2(valueMean)+(1-valueMean)*Math.log2(1-valueMean)).toFixed(3);
      intervalMean = data.interval_mean.toFixed(3);
      dataBoxDisplay = true;
    }
    result=data;
  }
</script>

<div class="flex flex-col min-h-screen">
  <form on:submit|preventDefault={handleSubmit} class="flex flex-col items-center pt-20 space-y-8 mb-8">
    <input type="text" bind:value={input} name="input" required class="bg-transparent border-b-2 border-white outline-none text-center text-white text-2xl tracking-wider placeholder-white transition duration-300 w-full max-w-lg p-2" placeholder="enter your entropy miner name..."/>
    <button type="submit" class="flex justify-around mt-4 px-4 py-2 transition duration-300">
      <img alt="submit button" src={submit} class:disabled={submitDisabled} class="w-2/6 hover:opacity-75 active:opacity-50 transition duration-300"/>
    </button>
  </form>
  {#if errorMsg}
    <div class="font-display text-2xl text-center">
      {errorMsg}
    </div>
  {/if}
  <div id="result" class="flex-grow space-y-4 p-4 text-white text-2xl tracking-wider font-display max-w-md mx-auto whitespace-pre-wrap transition-opacity duration-500" style="opacity: {dataBoxDisplay ? 1 : 0}; pointer-events: {dataBoxDisplay ? 'auto' : 'none'};">
    <div>
    Latest received:
    <span class="font-sans">{latestValueHex}
    at {latestTimestampFormatted}</span>
    </div>
    <div>
    Mean entropy:
    <span class="font-sans">{entropyMean} (normalized)</span>
    </div>
    <div>
    Mean interval:
    <span class="font-sans">{intervalMean} hours</span>
    </div>
  </div>

  <div class="flex items-center justify-center space-x-2 mb-4 text-md">
    <Footer />
  </div>
</div>

<style>
  .disabled {
    opacity: 0.5;
  }
</style>