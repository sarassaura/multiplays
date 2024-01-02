<template>
    <div class="flex flex-col w-full h-full align-center justify-center relative" id="container">
        <canvas class="mx-auto absolute"></canvas>
        <canvas class="mx-auto absolute"></canvas>
    </div>
</template>

<script lang="ts" setup>
let container: HTMLDivElement;
let canvas: HTMLCanvasElement;
let hitBox: HTMLCanvasElement
let engine: typeof NoGame.prototype;

onMounted(() => {
    container = document.querySelector('#container') as HTMLDivElement;
    canvas = container.firstElementChild as HTMLCanvasElement;
    hitBox = container.lastElementChild as HTMLCanvasElement;
    engine = new NoGame(container, canvas, hitBox);

    engine.initialize();

    window.addEventListener('resize', () => engine.resize());
    canvas.addEventListener('click', (e) => engine.update(e))
})
onUnmounted(() => {
    window.removeEventListener('resize', () => engine.resize());
    canvas.removeEventListener('click', (e) => engine.update(e))
})
</script>