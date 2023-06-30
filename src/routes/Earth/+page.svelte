<script>
  import { onMount } from 'svelte';
  import { createScene } from "./earth";
  let el;
  onMount(() => {
    createScene(el)
  });
</script>

<canvas bind:this={el}></canvas>

<style>
  canvas {
    width: 100vw;
    height: 100vh;
    display: block;
  }
</style>