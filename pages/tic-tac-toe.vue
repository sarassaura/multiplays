<template>
    <div class="flex flex-col w-full h-full align-center justify-center" id="container">
        <canvas class="bg-slate-500 mx-auto"></canvas>
    </div>
</template>

<script lang="ts" setup>
let container

onMounted(() => {
    container = document.querySelector('#container')

    const canvas = container?.firstElementChild as HTMLCanvasElement

    canvas.id = "tic-tac-toe"
    canvas.height = container?.clientHeight || 0
    canvas.width = container?.clientWidth || 0

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    ctx.fillRect((canvas.width / 2) - 100, (canvas.height / 2) - 100, 200, 200);
    ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
    ctx.fillRect((canvas.width / 2) - 100 + 50, (canvas.height / 2) - 100 + 50, 200, 200);
    ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
    ctx.fillRect((canvas.width / 2) - 100 - 50, (canvas.height / 2) - 100 - 50, 200, 200);
})
</script>

<style></style>