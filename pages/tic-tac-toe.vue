<template>
    <div class="flex flex-col w-full h-full align-center justify-center" id="container">
        <canvas class="mx-auto"></canvas>
    </div>
</template>

<script lang="ts" setup>
let container: HTMLDivElement;
let canvas: HTMLCanvasElement;
let engine: typeof TicTacToe.prototype;
let draw: () => void;

onMounted(() => {
    container = document.querySelector('#container') as HTMLDivElement;
    canvas = container.firstElementChild as HTMLCanvasElement;
    engine = new TicTacToe(container, canvas);

    draw = () => {
        engine.ctx.clearRect(0, 0, engine.width, engine.height);
        engine.createRect(200, 200, { strokeColor: 'rgb(0,255,255)', thick: 10 });
        engine.createRect(200, 200, { x: 50, y: 50 });
        engine.createRect(200, 200, {
            x: -50,
            y: -50,
            color: 'rgb(255,255,0)',
            strokeColor: 'rgb(0,255,255)'
        });
        engine.createLine(0, 0, engine.width, engine.height, {
            thick: 10,
            color: 'rgba(0,255,0,0.2)'
        });
        engine.createLine(10, engine.height - 10, engine.width - 10, 10, {
            lineCap: 'round'
        });
        engine.createCircle(100, { thick: 10, color: 'rgb(255,0,255)' });
    }

    engine.initialize('tictactoe', draw);

    window.addEventListener('resize', () => engine.resize(draw));
});
onUnmounted(() => {
    window.removeEventListener('resize', () => engine.resize(draw));
});
</script>
