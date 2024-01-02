<template>
    <div class="flex flex-col w-full h-full align-center justify-center" id="container">
        <canvas class="mx-auto"></canvas>
    </div>
</template>

<script lang="ts" setup>
let container: HTMLDivElement;
let canvas: HTMLCanvasElement;
let engine: typeof TicTacToe.prototype;

onMounted(() => {
    container = document.querySelector('#container') as HTMLDivElement;
    canvas = container.firstElementChild as HTMLCanvasElement;
    engine = new TicTacToe(container, canvas);

    engine.initialize();

    window.addEventListener('resize', () => engine.resize());
    canvas.addEventListener('click', (e) => engine.update(e))
});
onUnmounted(() => {
    window.removeEventListener('resize', () => engine.resize());
    canvas.removeEventListener('click', (e) => engine.update(e))
});
</script>
