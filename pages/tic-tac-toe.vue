<template>
    <div class="flex flex-col w-full h-full relative" id="container">
    </div>
</template>

<script lang="ts" setup>
let container: HTMLDivElement;
let engine: typeof TicTacToe.prototype;

onMounted(() => {
    container = document.querySelector('#container') as HTMLDivElement;

    engine = new TicTacToe(container, 2, 1);

    window.addEventListener('resize', () => engine.resize());
    engine.hitBox[0].canvas.addEventListener('pointerup', (e) => engine.update(e))
});
onUnmounted(() => {
    window.removeEventListener('resize', () => engine.resize());
    engine.hitBox[0].canvas.removeEventListener('pointerup', (e) => engine.update(e))
});
</script>
