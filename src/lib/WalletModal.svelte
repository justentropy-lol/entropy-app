<script>
  import { createEventDispatcher } from "svelte";
  import { loadWallets } from "./wallet.js";

  const dispatch = createEventDispatcher();

  let wallets = loadWallets();
  let selectedWallet = null;

  const selectWallet = (wallet) => {
    selectedWallet = wallet;
    dispatch("select", wallet);
  };
</script>

<div class="modal-background" on:click={() => dispatch("close")}>
  <div class="modal-content" on:click|stopPropagation>
    <h2>Select a Wallet</h2>
    <ul class="wallet-list">
      {#each wallets as wallet}
        <li on:click={() => selectWallet(wallet)}>{wallet.name}</li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background: black;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .wallet-list {
    list-style: none;
    padding: 0;
  }
  .wallet-list li {
    margin: 10px 0;
    cursor: pointer;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .wallet-list li:hover {
    background-color: #f0f0f0;
  }
</style>
