<template></template>

<script lang="ts" setup>
definePageMeta({
    layout: 'game'
})
let container: HTMLDivElement;
let engine: typeof NoGame.prototype;

onMounted(() => {
    container = document.querySelector('#game') as HTMLDivElement;

    engine = new NoGame(container);

    window.addEventListener('resize', () => engine.resize());
    engine.hitBox[0].canvas.addEventListener('pointerup', (e) => engine.update(e))
})
onUnmounted(() => {
    window.removeEventListener('resize', () => engine.resize());
    engine.hitBox[0].canvas.removeEventListener('pointerup', (e) => engine.update(e))
})
</script>