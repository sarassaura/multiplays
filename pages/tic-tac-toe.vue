<template>
    <div class="flex flex-col w-full h-full relative" id="container">
    </div>
</template>

<script lang="ts" setup>
let container: HTMLDivElement;
let engine: typeof TicTacToe.prototype;
let resize: () => void
let reset: () => void

onMounted(() => {
    container = document.querySelector('#container') as HTMLDivElement;

    engine = new TicTacToe(container);

    resize = () => {
        engine.resize()
    }

    reset = () => {
        engine.reset()
    }

    window.addEventListener('resize', resize);
    engine.hitBox[0].canvas.addEventListener('pointerup', (e) => engine.update(e, 0))
    engine.hitBox[1].canvas.addEventListener('pointerup', (e) => engine.update(e, 1))
    engine.hitBox[2].canvas.addEventListener('pointerup', (e) => engine.update(e, 2))
    engine.hitBox[3].canvas.addEventListener('pointerup', (e) => engine.update(e, 3))
    engine.hitBox[4].canvas.addEventListener('pointerup', (e) => engine.update(e, 4))
    engine.hitBox[5].canvas.addEventListener('pointerup', (e) => engine.update(e, 5))
    engine.hitBox[6].canvas.addEventListener('pointerup', (e) => engine.update(e, 6))
    engine.hitBox[7].canvas.addEventListener('pointerup', (e) => engine.update(e, 7))
    engine.hitBox[8].canvas.addEventListener('pointerup', (e) => engine.update(e, 8))
    engine.hitBox[9].canvas.addEventListener('pointerup', reset)
});
onUnmounted(() => {
    window.removeEventListener('resize', resize);
    engine.hitBox[0].canvas.addEventListener('pointerup', (e) => engine.update(e, 0))
    engine.hitBox[1].canvas.addEventListener('pointerup', (e) => engine.update(e, 1))
    engine.hitBox[2].canvas.addEventListener('pointerup', (e) => engine.update(e, 2))
    engine.hitBox[3].canvas.addEventListener('pointerup', (e) => engine.update(e, 3))
    engine.hitBox[4].canvas.addEventListener('pointerup', (e) => engine.update(e, 4))
    engine.hitBox[5].canvas.addEventListener('pointerup', (e) => engine.update(e, 5))
    engine.hitBox[6].canvas.addEventListener('pointerup', (e) => engine.update(e, 6))
    engine.hitBox[7].canvas.addEventListener('pointerup', (e) => engine.update(e, 7))
    engine.hitBox[8].canvas.addEventListener('pointerup', (e) => engine.update(e, 8))
    engine.hitBox[9].canvas.addEventListener('pointerup', reset)
});
</script>
