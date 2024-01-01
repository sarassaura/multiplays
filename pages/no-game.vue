<template>
    <div class="flex flex-col w-full h-full align-center justify-center" id="container">
        <canvas class="mx-auto"></canvas>
    </div>
</template>

<script lang="ts" setup>
let container: HTMLDivElement;
let canvas: HTMLCanvasElement;
let engine: typeof NoGame.prototype;
let draw: () => void;

onMounted(() => {
    container = document.querySelector('#container') as HTMLDivElement;
    canvas = container.firstElementChild as HTMLCanvasElement;
    engine = new NoGame(container, canvas);

    draw = () => {
        engine.ctx.clearRect(0, 0, engine.width, engine.height);
        engine.createRect(200, 200, { color: 'rgba(255,0,0,0.4)', strokeColor: 'rgb(0,255,255)' });
        engine.createRect(200, 200, { x: 50, y: 50, color: 'rgba(0,255,0,0.4)' });
        engine.createRect(200, 200, { x: -50, y: -50, color: 'rgba(0,0,255, 0.4)' });
    }

    engine.initialize('no-game', draw);

    window.addEventListener('resize', () => engine.resize(draw));
})
onUnmounted(() => {
    window.removeEventListener('resize', () => engine.resize(draw));
})
</script>