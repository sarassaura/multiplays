<template>
    <div class="flex flex-col w-full h-full relative" id="container">
    </div>
</template>

<script lang="ts" setup>
let container: HTMLDivElement;
let engine: typeof TicTacToe.prototype;
let update: (e: PointerEvent) => void
let resize: () => void
let reset: () => void

onMounted(() => {
    container = document.querySelector('#container') as HTMLDivElement;

    engine = new TicTacToe(container);

    update = (e: PointerEvent) => {
        engine.update(e)
    }

    resize = () => {
        engine.resize()
    }

    reset = () => {
        engine.reset()
    }

    window.addEventListener('resize', resize);
    engine.hitBox[0].canvas.addEventListener('pointerup', update)
    engine.hitBox[1].canvas.addEventListener('pointerup', reset)
});
onUnmounted(() => {
    window.removeEventListener('resize', resize);
    engine.hitBox[0].canvas.removeEventListener('pointerup', update)
    engine.hitBox[1].canvas.removeEventListener('pointerup', reset)
});
</script>
