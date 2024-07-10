<script>
  const blobUrl = import.meta.env.VITE_BLOB_URL

  const header = blobUrl + '/assets/header-pWmEYuXFGGsFeMZJaBaTxpWlJxCFC2.png';
  const mine = blobUrl + '/assets/button_mine-WeIhEkBTM1t32j7KNQk7qdFueMkXhZ.png';
	const claim = blobUrl + '/assets/button_claim-UEXufrlMCoopPp6KJowfwSI7GSaIBB.png';
	const perfect = blobUrl + '/assets/list_perfect-6GzGJgYZHv4IPtT2e2il9IMUVqyQ8O.png';
	const proud = blobUrl + '/assets/list_proud-Pl0lD0rbwghrIXxmhWUDy89qBYNtE8.png';
	const tokenomics = blobUrl + '/assets/list_tokenomics-piNIt02iNaz9qY9IIbrJnoQyFpTVEa.png';

  let refHeight = 10;
  let mtBannerMult = 1/3;
  let mtButtonMult = 1/3;
  let mtExplainerMult = 1.2;
  let yExplainer = 1/2;
  let mtSocialsMult = 1.5;

  const discordLink = "https://discord.gg/puredepin";
  const twitterLink = "https://twitter.com/justentropylol"
</script>


<div class="flex flex-col items-center justify-center">

  <img alt="ENTROPY: The world's first DePIN meme coin." src={header} class="w-11/12 min-w-80 max-w-4xl" style="margin-top: {refHeight*mtBannerMult}px"/>

  <div class="flex justify-around w-3/5 min-w-60 max-w-lg" bind:clientHeight={refHeight} style="margin-top: {refHeight * mtButtonMult}px">
    <a href={discordLink} target="_blank" class="w-2/6 hover:opacity-75 active:opacity-50" ><img alt="mint button" src={mine}/></a>
    <img alt="claim button" src={claim} class="w-2/6 opacity-25" />
  </div>

  <div class="flex-col justify-around w-7/12 min-w-72 max-w-md" style="margin-top: {refHeight*mtExplainerMult}px">
    <h2 class="hidden">
      ENTROPY is the perfect DePIN:
      <ul>
        <li>Ambiguous utility</li>
        <li>Centralized oracle</li>
        <li>People-owned</li>
        <li>Miner-focused</li>
      </ul>
    </h2>
    <img alt="ENTROPY is the perfect DePIN" src={perfect} style="margin-bottom: {refHeight*yExplainer}px" />
    
    <h2 class="hidden">
      ENTROPY is proud to have:
      <ul>
        <li>No VC allocation</li>
        <li>No founder allocation</li>
        <li>No airdrop</li>
        <li>Perfect product-market fit</li>
      </ul>
    </h2>
    <img alt="ENTROPY is proud" src={proud} style="margin-bottom: {refHeight*yExplainer}px" />
    
    <h2 class="hidden">
      Tokenomics:
      <ul>
        <li>One-year halving schedule</li>
        <li>22.3B max supply</li>
        <li>2.38% platform fee (on claims only)</li>
        <li>Requires hardware to mine</li>
        <li>Unclaimed tokens get burned</li>
      </ul>
    </h2>
    <img alt="ENTROPY tokenomics" src={tokenomics} />
  </div>

  <div class="space-x-2 mb-4 text-md" style="margin-top: {refHeight*mtSocialsMult}px">
    <a href={discordLink} target="_blank" class="hover:opacity-75 active:opacity-50"><i class="fab fa-discord"></i></a>
    <a href={twitterLink} target="_blank" class="hover:opacity-75 active:opacity-50"><i class="fab fa-x-twitter"></i></a>
  </div>

</div>