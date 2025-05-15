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
    <nav class="hidden md:flex items-center space-x-8">
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

    <nav class="flex md:hidden items-center space-x-8">
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

    <!-- Mobile Hamburger -->
    <button
      class="md:hidden p-2"
      aria-label="Toggle menu"
      on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
    >
      {#if mobileMenuOpen}
        ✕
      {:else}
        ☰
      {/if}
    </button>
  </div>

  <!-- Mobile Menu -->
  {#if mobileMenuOpen}
    <nav
      class="md:hidden absolute right-4 inline-flex flex-col bg-white shadow-lg"
    >
      <ul class="flex flex-col divide-y text-black text-sm">
        <li>
          <a href="https://bodega.justentropy.lol" class="block px-4 py-3"
            >SHOP</a
          >
        </li>
        <li><a href="/explorer" class="block px-4 py-3">EXPLORER</a></li>
      </ul>
    </nav>
  {/if}
</div>
