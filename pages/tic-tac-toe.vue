<template></template>

<script lang="ts" setup>
definePageMeta({
    layout: 'game'
})
let container: HTMLDivElement;
let engine: typeof TicTacToe.prototype;
let resize: () => void
let reset: () => void
let enter: (e: KeyboardEvent, s: number) => void

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

    enter = (e: KeyboardEvent, s: number) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            engine.update(s)
        }
    }

    window.addEventListener('resize', resize);
    engine.button.forEach((button, id) => {
        button.el.addEventListener('pointerup', () => engine.update(id))
        engine.button[id].el.addEventListener('keypress', (e) => enter(e, id))
    })
});
onUnmounted(() => {
    window.removeEventListener('resize', resize);
    engine.button.forEach((button, id) => {
        button.el.removeEventListener('pointerup', () => engine.update(id))
        engine.button[id].el.removeEventListener('keypress', (e) => enter(e, id))
    })
});
</script>
