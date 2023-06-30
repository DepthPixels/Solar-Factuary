<script>
  import { onMount } from 'svelte';
  import { createScene } from "./scene";
  let el;
  onMount(() => {
    createScene(el)
  });
</script>

<canvas bind:this={el}></canvas>

<style>
  html, body {
  margin: 0;
  padding: 0;
  }

  canvas {
    width: 100vw;
    height: 100vh;
    display: block;
  }
</style>