<script>
  const currentYear = new Date().getFullYear();
  export let backgroundImageUrl = "/images/brazil.png";
</script>

<div class="bg-black text-white pt-36 pb-4 px-4 relative overflow-hidden">
  <div class="absolute inset-0 z-0">
    <div class="absolute inset-0 bg-black/50 z-10"></div>
    <img
      src={backgroundImageUrl}
      alt="Hero background"
      class="w-full h-full object-cover object-center"
    />
  </div>

  <div class="absolute inset-0 z-10 pointer-events-none">
    <svg
      class="absolute top-0 left-0 right-0 w-full h-32"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
    >
      <path
        d="
        M0,80
        C360,0 1080,0 1440,80
        L1440,0
        L0,0
        Z
      "
        fill="white"
      />
    </svg>
  </div>

  <!-- Diagonal line decorations & Accent shape -->
  <div class="absolute inset-0">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="w-full h-full">
      <line
        x1="0"
        y1="100"
        x2="100"
        y2="0"
        stroke="rgba(255,82,121,0.1)"
        stroke-width="1"
      />
      <line
        x1="15"
        y1="100"
        x2="100"
        y2="15"
        stroke="rgba(255,82,121,0.05)"
        stroke-width="1.5"
      />
    </svg>
    <div
      class="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
    />
  </div>

  <!-- Footer content -->
  <div class="container mx-auto relative z-10">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Logo & Social -->
      <div>
        <div class="flex items-center gap-2 mb-4">
          <!-- <div
            class="relative w-8 h-8 bg-primary flex items-center justify-center text-white transform -rotate-3"
          >
            <div
              class="absolute w-8 h-8 bg-primary/50 transform rotate-6 -z-10 top-1 left-1"
            ></div>
            <span class="font-display text-xl">A</span>
          </div> -->
          <h2 class="font-display text-xl">
            <span class="text-brand">ENTROPY</span><span class="text-white"
              >LOL</span
            >
          </h2>
        </div>
        <p class="text-gray-400 mb-4 ml-1 font-light">
          It's. Just. Entropy. LOL.
        </p>
      </div>

      <!-- Social Links -->
      <div>
        <h3 class="font-display text-lg mb-4 text-white">socials</h3>
        <ul class="space-y-2 font-mono text-sm">
          <li>
            <a
              href="https://discord.gg/minerseatfirst"
              target="_blank"
              class="text-gray-400 hover:text-primary transition-colors"
              >Discord</a
            >
          </li>
          <li>
            <a
              href="https://x.com/justentropylol"
              target="_blank"
              class="text-gray-400 hover:text-primary transition-colors">𝕏</a
            >
          </li>
          <li>
            <a
              href="https://tiktok.com/@justentropylol"
              target="_blank"
              class="text-gray-400 hover:text-primary transition-colors"
              >Tik Tok</a
            >
          </li>
        </ul>
      </div>

      <!-- web3 Links -->
      <div>
        <h3 class="font-display text-lg mb-4 text-white">web3</h3>
        <ul class="space-y-2 font-mono text-sm">
          <li>
            <a
              href="https://www.coingecko.com/en/coins/entropy-2"
              target="_blank"
              class="text-gray-400 hover:text-primary transition-colors"
              >Coingecko</a
            >
          </li>
          <li>
            <a
              href="https://drip.haus/entropy"
              target="_blank"
              class="text-gray-400 hover:text-primary transition-colors">DRiP</a
            >
          </li>
          <li>
            <a
              href="https://jup.ag/swap/SOL-ENT"
              target="_blank"
              class="text-gray-400 hover:text-primary transition-colors"
              >Jupiter</a
            >
          </li>
          <li>
            <a
              href="https://raydium.io/swap/?inputMint=sol&outputMint=ENTxR2RP8NtvhXzMNFCxE1HazzdV9x7SuZqGyAb4jdED"
              target="_blank"
              class="text-gray-400 hover:text-primary transition-colors"
              >Raydium</a
            >
          </li>
          <li>
            <a
              href="https://dexscreener.com/solana/bmqaswyd6zw6xpyyquoeowphfhtoeq1bsybebzxwt6gj"
              target="_blank"
              class="text-gray-400 hover:text-primary transition-colors"
              >Dexscreener</a
            >
          </li>
        </ul>
      </div>

      <!-- Social Links -->
      <div>
        <h3 class="font-display text-lg mb-4 text-white">tech</h3>
        <ul class="space-y-2 font-mono text-sm">
          <li>
            <a
              href="https://github.com/justentropy-lol"
              target="_blank"
              class="text-gray-400 hover:text-primary transition-colors"
              >GitHub</a
            >
          </li>
          <li>
            <a
              href="https://docs.puredepin.com"
              target="_blank"
              class="text-gray-400 hover:text-primary transition-colors">Docs</a
            >
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom bar -->
    <div
      class="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
    >
      <p class="text-gray-500 text-sm mb-4 md:mb-0 font-mono">
        © {currentYear} Just Entropy, Inc. All rights reserved.
      </p>
      <div class="flex space-x-6">
        <a
          href="/info/privacy-policy"
          class="text-gray-500 text-sm font-mono hover:text-gray-400 transition-colors"
          >Privacy Policy</a
        >
        <a
          href="/info/tos"
          class="text-gray-500 text-sm font-mono hover:text-gray-400 transition-colors"
          >Terms of Service</a
        >
        <!-- <a
          href="#"
          class="text-gray-500 text-sm font-mono hover:text-gray-400 transition-colors"
          >Cookie Policy</a
        > -->
      </div>
    </div>
  </div>
</div>
