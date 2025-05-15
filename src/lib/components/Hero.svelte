<script>
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";

  const blobUrl = import.meta.env.VITE_BLOB_URL;

  export let backgroundImageUrl =
    blobUrl + "/ashlar/center-zNJyfsLs7LqbH3ruGQzgIUkEHV0XSr.png";
</script>

<div class="relative w-screen h-screen min-h-[600px] overflow-hidden">
  <!-- Background Image with Overlay -->
  <div class="absolute inset-0 z-0">
    <div class="absolute inset-0 bg-black/50 z-10"></div>
    <img
      src={backgroundImageUrl}
      alt="Hero background"
      class="w-full h-full object-cover object-center"
    />
  </div>

  <!-- Jagged Edge Overlay -->
  <div class="absolute inset-0 z-10 pointer-events-none">
    <!-- Optional corner accents can stay or go here -->
    <!-- Curved bottom edge -->
    <svg
      class="absolute bottom-0 left-0 right-0 w-full h-32"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
    >
      <path
        d="
        M0,0
        C360,80 1080,80 1440,0
        L1440,80
        L0,80
        Z
      "
        fill="white"
      />
    </svg>
  </div>

  <!-- Diagonal lines decoration -->
  <div class="absolute inset-0 z-0 opacity-20">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="diagonalLines"
          patternUnits="userSpaceOnUse"
          width="40"
          height="40"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="40" stroke="white" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diagonalLines)" />
    </svg>
  </div>

  <!-- Content -->
  <div
    class="relative h-full z-20 flex flex-col justify-center items-center container mx-auto px-4 text-center"
  >
    <h1
      in:slide={{ y: 30, duration: 800, delay: 200 }}
      class="font-sans text-2xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight"
    >
      BE EXTRAORDINARY.
      <br />DISCOVER ASHLAR.
    </h1>

    <p
      in:slide={{ y: 30, duration: 800, delay: 400 }}
      class="max-w-2xl text-white/90 text-lg md:text-xl font-sans"
    >
      Generate entropy. Earn $ENT.
    </p>

    <div in:fade={{ duration: 800, delay: 600 }} class="mt-10">
      <a
        href="#gallery"
        class="px-8 py-3 bg-brand text-white font-sans text-sm hover:bg-brand/90 transform hover:translate-x-2 hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(128,128,128,0.4)] transition-all"
      >
        OWN EXTRAORDINARY
      </a>
    </div>

    <!-- Scroll Indicator -->
    <div
      in:fade={{ delay: 1000, duration: 1000 }}
      class="absolute bottom-20 left-1/2 transform -translate-x-1/2 hidden md:block"
    >
      <div class="flex flex-col items-center">
        <span class="text-white/70 font-mono text-xs mb-2">SCROLL</span>
        <div
          class="w-5 h-9 border-2 border-white/50 rounded-full flex justify-center animate-bounce"
        >
          <div class="w-1 h-1 bg-white/80 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  </div>
</div>
