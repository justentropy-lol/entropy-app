<script>
  const blobUrl = import.meta.env.VITE_BLOB_URL;

  export let backgroundImageUrl =
    blobUrl + "/art/deleter-cIPJY71NvWUPqjNm4xKJGX96GGW78b.png";
</script>

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

<div
  class="relative h-full z-20 flex flex-col justify-center items-center container mx-auto px-4 text-sm text-center space-y-4"
>
  <slot />
</div>
