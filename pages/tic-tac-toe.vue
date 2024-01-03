<template>
    <div class="flex flex-col w-full h-full relative" id="container">
        <canvas id="tic-tac-toe" class="absolute"></canvas>
    </div>
</template>

<script lang="ts" setup>
let container: HTMLDivElement;
let canvas: HTMLCanvasElement;
let hitBox: HTMLCanvasElement
let engine: typeof TicTacToe.prototype;

onMounted(() => {
    container = document.querySelector('#container') as HTMLDivElement;
    canvas = container.firstElementChild as HTMLCanvasElement;
    hitBox = document.createElement('canvas') as HTMLCanvasElement;
    hitBox.style.position = 'absolute';
    hitBox.style.opacity = '0.0';
    container.appendChild(hitBox);
    engine = new TicTacToe(container, canvas, hitBox);

    window.addEventListener('resize', () => engine.resize());
    hitBox.addEventListener('pointerdown', (e) => engine.update(e))
});
onUnmounted(() => {
    window.removeEventListener('resize', () => engine.resize());
    hitBox.removeEventListener('pointerdown', (e) => engine.update(e))
});
</script>
