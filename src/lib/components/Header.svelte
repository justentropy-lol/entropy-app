<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { activeModal } from "$lib/modals/modalControl.js";
  import { disconnectWallet, isWalletConnected } from "$lib/wallet/connect.js";

  let scrolled = false;
  let mobileMenuOpen = false;

  const handleDisconnect = async () => {
    await disconnectWallet();
  };

  const handleScroll = () => {
    scrolled = window.scrollY > 50;
  };

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<div
  class="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
  class:bg-white={scrolled}
  class:shadow-md={scrolled}
  class:my-2={scrolled}
  class:py-1={scrolled}
  class:bg-transparent={!scrolled}
  class:my-4={!scrolled}
>
  <div class="container mx-auto px-4 flex justify-between items-center">
    <!-- Logo -->
    <a href="/" class="flex items-center space-x-2">
      <div
        class="relative p-[1px] w-8 h-8 flex items-center justify-center"
        class:bg-white={!scrolled}
        class:bg-black={scrolled}
      >
        <img src="/logo.png" alt="Logo" />
      </div>
      <h1 class="font-sans text-xl">
        <span class:text-black={scrolled} class:text-white={!scrolled}
          >ENTROPY</span
        ><span
          class="hidden md:inline"
          class:text-white={scrolled}
          class:text-brand={!scrolled}>LOL</span
        >
      </h1>
    </a>

    <!-- Desktop Navigation -->
    <nav class="flex items-center space-x-8">
      <a
        href="https://bodega.justentropy.lol"
        target="_blank"
        class="font-display text-sm tracking-wide transition-colors"
        class:text-black={scrolled}
        class:text-white={!scrolled}
        class:hover:text-primary={true}
      >
        SHOP
      </a>
      <a
        href="/explorer"
        class="font-display text-sm tracking-wide transition-colors"
        class:text-black={scrolled}
        class:text-white={!scrolled}
        class:hover:text-primary={true}
      >
        EXPLORER
      </a>
      <div
        class="px-4 py-2 bg-brand text-white font-sans text-sm hover:bg-brand/80 transition-colors hover:shadow-[2px_2px_0px_0px_rgba(128,128,128,0.4)] duration-200"
      >
        {#if $isWalletConnected && $page.url.pathname === "/console"}
          <button on:click={handleDisconnect}>DISCONNECT</button>
        {:else}
          <a href="/console" data-sveltekit-reload>CONSOLE</a>
        {/if}
      </div>
    </nav>

    <!-- Mobile Menu Button -->
    <!-- <button
      class="md:hidden text-2xl"
      on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
    >
      <i
        class="ri-menu-line"
        class:text-black={scrolled}
        class:text-white={!scrolled}
      ></i>
    </button> -->
  </div>

  <!-- Mobile Navigation Overlay
  {#if mobileMenuOpen}
    <div class="fixed inset-0 bg-black z-40" in:fade out:fade>
      <div class="flex flex-col h-full">
        <div class="flex justify-between items-center p-4">
          <a
            href="/"
            class="flex items-center space-x-2"
            on:click={() => (mobileMenuOpen = false)}
          >
            <div
              class="relative w-8 h-8 bg-primary flex items-center justify-center text-white transform -rotate-3"
            >
              <div
                class="absolute w-8 h-8 bg-primary/50 transform rotate-6 -z-10 top-1 left-1"
              ></div>
              <span class="font-display text-xl">A</span>
            </div>
            <h1 class="font-display text-xl text-white">
              <span class="text-primary">FLAMINGO</span><span>ART</span>
            </h1>
          </a>
          <button
            class="text-2xl text-white"
            on:click={() => (mobileMenuOpen = false)}
          >
            <i class="ri-close-line"></i>
          </button>
        </div>

        <nav
          class="flex flex-col items-center justify-center flex-grow space-y-8 p-4"
        >
          {#each [["/", "HOME"], ["/collections", "COLLECTIONS"], ["/artists", "ARTISTS"], ["/about", "ABOUT"]] as [href, label]}
            <a
              {href}
              class="font-mono text-xl text-white hover:text-primary transition-colors"
              on:click={() => (mobileMenuOpen = false)}
            >
              {label}
            </a>
          {/each}
          <a
            href="/contact"
            class="px-6 py-3 bg-primary text-white font-mono text-sm hover:bg-primary/90 transition-colors"
            on:click={() => (mobileMenuOpen = false)}
          >
            CONTACT
          </a>
        </nav>
      </div>
    </div>
  {/if} -->
</div>
