<template>
    <div class="flex flex-col w-full h-full align-center justify-center" id="container">
        <span class="bg-slate-500 w-fit h-fit mx-auto"></span>
    </div>
</template>

<script lang="ts" setup>
let container
let screen

onMounted(() => {
    container = document.querySelector('#container')
    screen = container?.firstElementChild

    const canvas = document.createElement('canvas')

    canvas.id = "tic-tac-toe"
    canvas.width = container?.clientWidth || 0
    canvas.height = container?.clientHeight || 0

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    ctx.fillRect(100, 100, 200, 200);
    ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
    ctx.fillRect(150, 150, 200, 200);
    ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
    ctx.fillRect(200, 50, 200, 200);


    screen?.appendChild(canvas)
})
</script>

<style>
canvas {
    @apply flex shrink h-full w-full;
}
</style>