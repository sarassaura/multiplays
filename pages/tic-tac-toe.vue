<template>
    <div class="flex flex-col w-full h-full align-center justify-center" id="container">
        <canvas class="mx-auto"></canvas>
    </div>
</template>

<script lang="ts" setup>
let container: HTMLDivElement
let canvas: HTMLCanvasElement
let engine: GameEngine
class GameEngine {
    container: HTMLDivElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number
    constructor(container: HTMLDivElement, canvas: HTMLCanvasElement) {
        this.container = container
        this.canvas = canvas
        this.ctx = this.canvas.getContext('2d')!
        this.width = this.container.clientWidth
        this.height = this.container.clientHeight
    }

    initialize() {
        this.canvas.id = "tictactoe"
        this.resize()
    }

    resize() {
        this.canvas.height = this.container.clientHeight
        this.canvas.width = this.container.clientWidth
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.draw()
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.createRect(200, 200, undefined, undefined, {})
        this.createRect(200, 200, 50, 50, { color: "rgba(0, 255, 0, 0.2)" })
        this.createRect(200, 200, -50, -50)
        this.createLine(0, 0, this.width, this.height, { thick: 10 })
        this.createLine(0, this.height, this.width, 0, {})
        this.createCircle(100, 0, 0, { thick: 2 })
    }

    createRect(width: number, height: number, x: number = 0, y: number = 0, options?: { color?: string }) {
        let centerX = (this.width - width) / 2;
        let centerY = (this.height - height) / 2;

        this.ctx.fillStyle = options?.color || "rgb(0,0,0)"

        this.ctx.fillRect(centerX + x, centerY + y, width, height);
    }

    createLine(px1: number, py1: number, px2: number, py2: number, options?: { thick?: number }) {
        this.ctx.beginPath();
        this.ctx.moveTo(px1, py1);
        this.ctx.lineTo(px2, py2);

        this.ctx.lineWidth = options?.thick || 5;

        this.ctx.stroke();
    }

    createCircle(radius: number, x: number = 0, y: number = 0, options?: { thick?: number }) {
        this.ctx.beginPath();

        let startAngle = 0;
        let endAngle = 2 * Math.PI;

        let centerX = (this.width) / 2;
        let centerY = (this.height) / 2;

        this.ctx.lineWidth = options?.thick || 5;

        this.ctx.arc(centerX + x, centerY + y, radius, startAngle, endAngle);
        this.ctx.stroke();
    }
}

onMounted(() => {
    container = document.querySelector('#container') as HTMLDivElement
    canvas = container.firstElementChild as HTMLCanvasElement
    engine = new GameEngine(container, canvas);

    engine.initialize()
    engine.draw()

    window.addEventListener('resize', () => engine.resize())
})
onUnmounted(() => {
    window.removeEventListener('resize', () => engine.resize())
})
</script>