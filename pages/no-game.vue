<template>
    <div class="flex flex-col w-full h-full align-center justify-center" id="container">
        <canvas class="mx-auto"></canvas>
    </div>
</template>

<script lang="ts" setup>
let container: HTMLDivElement;
let canvas: HTMLCanvasElement;
let engine: typeof GameEngine.prototype;

onMounted(() => {
    container = document.querySelector('#container') as HTMLDivElement;
    canvas = container.firstElementChild as HTMLCanvasElement;
    engine = new GameEngine(container, canvas);

    engine.initialize('no-game');
    engine.draw();

    window.addEventListener('resize', () => engine.resize());
})
onUnmounted(() => {
    window.removeEventListener('resize', () => engine.resize());
})
</script>