import { renderShape } from './BasicShapes';

export default class GameEngine {
	container: HTMLDivElement;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	hitBox: HTMLCanvasElement;
	c: CanvasRenderingContext2D;
	width: number;
	height: number;
	shapes: Array<Shape>;
	boxes: Record<string, Shape>;
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
		this.shapes = [];
		this.boxes = {};
	}

	resize() {
		this.width = this.container.clientWidth;
		this.height = this.container.clientHeight;
		this.canvas.height = this.height;
		this.canvas.width = this.width;
		this.hitBox.height = this.height;
		this.hitBox.width = this.width;
		this.render();
	}

	render() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.c.clearRect(0, 0, this.width, this.height);
		this.shapes.forEach((shape) =>
			renderShape(shape, this.ctx, this.width, this.height)
		);
		Object.values(this.boxes).forEach((shape) =>
			renderShape(shape, this.c, this.width, this.height)
		);
	}
}
