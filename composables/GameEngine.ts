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
		canvas: typeof Layer.prototype,
		hitBox: typeof Layer.prototype
	) {
		this.container = container;

		this.canvas = canvas.canvas;
		this.hitBox = hitBox.canvas;

		this.ctx = canvas.c;
		this.c = hitBox.c;

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
