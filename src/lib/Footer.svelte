<script>
  export let discordLink = "https://discord.gg/minerseatfirst";
  export let jupiterLink = "https://jup.ag/swap/SOL-ENT";
  export let dripLink = "https://drip.haus/entropy";
  export let twitterLink = "https://twitter.com/justentropylol";
  export let tiktokLink = "https://www.tiktok.com/@justentropylol";
  export let githubLink = "https://github.com/justentropy-lol";
  export let docsLink = "https://docs.justentropy.lol/";
  export let explorerLink = "/explorer";
  export let consoleLink = "/console";
  export let coingeckoLink = "https://www.coingecko.com/en/coins/entropy-2";
  export let coingeckoLogo =
    import.meta.env.VITE_BLOB_URL +
    "/assets/coingecko_logo-lQXaAWPEntOvBovMEbmQrICJeSl6in.png";
</script>

<a href={explorerLink} target="_self" class="hover:opacity-75 active:opacity-50"
  ><i class="fa-solid fa-globe"></i></a
>
<a href="/" target="_self" class="hover:opacity-75 active:opacity-50"
  ><i class="fa-solid fa-house-chimney"></i></a
>
<a href={discordLink} target="_blank" class="hover:opacity-75 active:opacity-50"
  ><i class="fab fa-discord"></i></a
>
<a href={twitterLink} target="_blank" class="hover:opacity-75 active:opacity-50"
  ><i class="fab fa-x-twitter"></i></a
>
<a href={tiktokLink} target="_blank" class="hover:opacity-75 active:opacity-50"
  ><i class="fa-brands fa-tiktok"></i></a
>
<a href={dripLink} target="_blank" class="hover:opacity-75 active:opacity-50"
  ><i class="fa-solid fa-droplet"></i></a
>
<a href={jupiterLink} target="_blank" class="hover:opacity-75 active:opacity-50"
  ><i class="fa-solid fa-arrow-trend-up"></i></a
>
<a href={githubLink} target="_blank" class="hover:opacity-75 active:opacity-50"
  ><i class="fa-brands fa-github"></i></a
>
<a href={docsLink} target="_blank" class="hover:opacity-75 active:opacity-50"
  ><i class="fa-solid fa-book"></i></a
>
<a href={consoleLink} target="_self" class="hover:opacity-75 active:opacity-50"
  ><i class="fa-solid fa-terminal"></i></a
>
<a
  href={coingeckoLink}
  target="_blank"
  class="hover:opacity-75 active:opacity-50"
>
  <img
    src={coingeckoLogo}
    alt="CoinGecko"
    class="w-4 h-4 inline-block align-middle -mt-1"
  />
</a>
