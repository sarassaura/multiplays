<template>
    <div class="flex flex-col w-full h-full align-center justify-center relative" id="container">
        <canvas id="no-game" class="absolute"></canvas>
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
    hitBox = document.createElement('canvas') as HTMLCanvasElement;
    hitBox.style.position = 'absolute';
    hitBox.style.opacity = '0.0';
    container.appendChild(hitBox);
    engine = new NoGame(container, canvas, hitBox);

    engine.initialize();

    window.addEventListener('resize', () => engine.resize());
    hitBox.addEventListener('pointerdown', (e) => engine.update(e))
})
onUnmounted(() => {
    window.removeEventListener('resize', () => engine.resize());
    hitBox.removeEventListener('pointerdown', (e) => engine.update(e))
})
</script>