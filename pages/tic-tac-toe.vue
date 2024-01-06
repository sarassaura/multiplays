<template>
    <div class="flex flex-col w-full h-full relative" id="container">
    </div>
</template>

<script lang="ts" setup>
let container: HTMLDivElement;
let engine: typeof TicTacToe.prototype;
let update: (e: PointerEvent) => void
let resize: () => void

onMounted(() => {
    container = document.querySelector('#container') as HTMLDivElement;

    engine = new TicTacToe(container);

    update = (e: PointerEvent) => {
        engine.update(e)
    }

    resize = () => {
        engine.resize()
    }

    window.addEventListener('resize', resize);
    engine.hitBox[0].canvas.addEventListener('pointerup', update)
});
onUnmounted(() => {
    window.removeEventListener('resize', resize);
    engine.hitBox[0].canvas.removeEventListener('pointerup', update)
});
</script>
