<template></template>

<script lang="ts" setup>
definePageMeta({
    layout: 'game'
})
let container: HTMLDivElement;
let engine: typeof TicTacToe.prototype;
let resize: () => void
let reset: () => void

onMounted(() => {
    container = document.querySelector('#game') as HTMLDivElement;
    if (document.fullscreenEnabled) {
        container.requestFullscreen({ navigationUI: "hide" })
    }

    engine = new TicTacToe(container);

    resize = () => {
        engine.resize()
    }

    reset = () => {
        engine.reset()
    }

    window.addEventListener('resize', resize);
    engine.button[0].el.addEventListener('pointerup', () => engine.update(0))
    engine.button[1].el.addEventListener('pointerup', () => engine.update(1))
    engine.button[2].el.addEventListener('pointerup', () => engine.update(2))
    engine.button[3].el.addEventListener('pointerup', () => engine.update(3))
    engine.button[4].el.addEventListener('pointerup', () => engine.update(4))
    engine.button[5].el.addEventListener('pointerup', () => engine.update(5))
    engine.button[6].el.addEventListener('pointerup', () => engine.update(6))
    engine.button[7].el.addEventListener('pointerup', () => engine.update(7))
    engine.button[8].el.addEventListener('pointerup', () => engine.update(8))
    engine.button[9].el.addEventListener('pointerup', reset)
});
onUnmounted(() => {
    window.removeEventListener('resize', resize);
    engine.button[0].el.addEventListener('pointerup', () => engine.update(0))
    engine.button[1].el.addEventListener('pointerup', () => engine.update(1))
    engine.button[2].el.addEventListener('pointerup', () => engine.update(2))
    engine.button[3].el.addEventListener('pointerup', () => engine.update(3))
    engine.button[4].el.addEventListener('pointerup', () => engine.update(4))
    engine.button[5].el.addEventListener('pointerup', () => engine.update(5))
    engine.button[6].el.addEventListener('pointerup', () => engine.update(6))
    engine.button[7].el.addEventListener('pointerup', () => engine.update(7))
    engine.button[8].el.addEventListener('pointerup', () => engine.update(8))
    engine.button[9].el.addEventListener('pointerup', reset)
});
</script>
