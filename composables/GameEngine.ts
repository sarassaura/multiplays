export default class GameEngine {
	container: HTMLDivElement;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	hitBox: HTMLCanvasElement;
	c: CanvasRenderingContext2D;
	width: number;
	height: number;
	constructor(
		container: HTMLDivElement,
		canvas: HTMLCanvasElement,
		hitBox: HTMLCanvasElement
	) {
		this.container = container;
		this.canvas = canvas;
		this.hitBox = hitBox;
		this.ctx = this.canvas.getContext('2d')!;
		this.c = this.hitBox.getContext('2d')!;
		this.width = this.container.clientWidth;
		this.height = this.container.clientHeight;
	}

	resizeCanvas() {
		this.width = this.container.clientWidth;
		this.height = this.container.clientHeight;
		this.canvas.height = this.height;
		this.canvas.width = this.width;
		this.hitBox.height = this.height;
		this.hitBox.width = this.width;
	}
}
