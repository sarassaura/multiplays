<template>
    <div class="flex flex-col w-full h-full align-center justify-center relative" id="container">
        <canvas class="bg-slate-500 mx-auto absolute h-full w-full"></canvas>
    </div>
</template>

<script lang="ts" setup>

class GameEngine {
    container: HTMLDivElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number
    constructor(container: HTMLDivElement, canvas: HTMLCanvasElement) {
        this.container = container
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')!
        this.width = container.clientWidth
        this.height = container.clientHeight
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
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.createRect("rgba(255, 0, 0, 0.2)", 200, 200, 0, 0)
        this.createRect("rgba(0, 255, 0, 0.2)", 200, 200, 50, 50)
        this.createRect("rgba(0, 0, 255, 0.2)", 200, 200, -50, -50)
    }

    createRect(color: string, width: number, height: number, x: number, y: number) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(((this.width - width) / 2) + x, ((this.height - height) / 2) + y, width, height);
    }
}

onMounted(() => {
    const container = document.querySelector('#container') as HTMLDivElement
    const canvas = container?.firstElementChild as HTMLCanvasElement

    const engine = new GameEngine(container, canvas);

    engine.initialize()
    engine.draw()

    window.addEventListener('resize', engine.resize)
})
onUnmounted(() => {
    const container = document.querySelector('#container') as HTMLDivElement
    const canvas = container?.firstElementChild as HTMLCanvasElement

    const engine = new GameEngine(container, canvas);

    window.removeEventListener('resize', engine.resize)
})
</script>