<template>
    <div class="flex flex-col w-full h-full align-center justify-center relative" id="container">
        <canvas id="no-game" class="absolute"></canvas>
    </div>
</template>

<script lang="ts" setup>
let container: HTMLDivElement;
let hitBox: typeof Layer.prototype;
let engine: typeof NoGame.prototype;

onMounted(() => {
    container = document.querySelector('#container') as HTMLDivElement;

    let background = new Layer(container);
    hitBox = new Layer(container);
    hitBox.invisible();

    engine = new NoGame(container, background, hitBox);

    window.addEventListener('resize', () => engine.resize());
    hitBox.canvas.addEventListener('pointerup', (e) => engine.update(e))
})
onUnmounted(() => {
    window.removeEventListener('resize', () => engine.resize());
    hitBox.canvas.removeEventListener('pointerup', (e) => engine.update(e))
})
</script>