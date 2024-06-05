<script>
  import header from '$lib/elements/header.png';
  import mine from '$lib/elements/button_mine.png';
	import claim from '$lib/elements/button_claim.png';
	import perfect from '$lib/elements/list_perfect.png';
	import proud from '$lib/elements/list_proud.png';
	import tokenomics from '$lib/elements/list_tokenomics.png';

  let refHeight = 10;
  let mtBannerMult = 1/3;
  let mtButtonMult = 1/3;
  let mtExplainerMult = 1.2;
  let yExplainer = 2/3;
</script>

<img alt="header" src={header} class="w-11/12 min-w-80" style="margin-top: {refHeight*mtBannerMult}px"/>


<div class="flex justify-around w-3/5 min-w-60" bind:clientHeight={refHeight} style="margin-top: {refHeight * mtButtonMult}px">
  <a href="https://discord.gg/TtQAZtsru6" target="_blank" class="w-2/6 hover:opacity-75 active:opacity-50" ><img alt="mint button" src={mine}/></a>
  <img alt="claim button" src={claim} class="w-2/6 opacity-25" />
</div>

<div class="flex-col justify-around w-7/12 min-w-72 mb-20" style="margin-top: {refHeight*mtExplainerMult}px">
  <img alt="explainer" src={perfect} style="margin-bottom: {refHeight*yExplainer}px" />
  <img alt="explainer" src={proud} style="margin-bottom: {refHeight*yExplainer}px" />
  <img alt="tokenomics" src={tokenomics} />
</div>
