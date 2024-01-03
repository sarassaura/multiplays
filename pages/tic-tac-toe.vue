<template>
    <div class="flex flex-col w-full h-full align-center justify-center" id="container">
        <canvas id="tic-tac-toe"></canvas>
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
    let hitBox = document.createElement('canvas') as HTMLCanvasElement;
    hitBox.style.position = 'absolute';
    hitBox.style.opacity = '0.0';
    container.appendChild(hitBox);
    engine = new TicTacToe(container, canvas, hitBox);

    engine.initialize();

    window.addEventListener('resize', () => engine.resize());
    hitBox.addEventListener('click', (e) => engine.update(e))
});
onUnmounted(() => {
    window.removeEventListener('resize', () => engine.resize());
    hitBox.removeEventListener('click', (e) => engine.update(e))
});
</script>
