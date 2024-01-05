import { createRect } from '../BasicShapes';
import GameEngine from '../GameEngine';

export default class NoGame extends GameEngine {
	shapes: Array<Shape>;
	constructor(
		container: HTMLDivElement,
		canvas: HTMLCanvasElement,
		hitBox: HTMLCanvasElement
	) {
		super(container, canvas, hitBox);
		this.shapes = [];
		this.initialState();
		this.resize();
	}

	resize() {
		this.resizeCanvas();
		this.render();
	}

	initialState() {
		this.shapes.push(
			createRect(200, 200, {
				color: 'rgba(255,0,0,0.4)',
				strokeColor: 'rgb(0,255,255)'
			}) as Rect
		);
		this.shapes.push(
			createRect(200, 200, {
				x: 50,
				y: 50,
				color: 'rgba(0,255,0,0.4)'
			}) as Rect
		);
		this.shapes.push(
			createRect(200, 200, {
				x: -50,
				y: -50,
				color: 'rgba(0,0,255, 0.4)'
			}) as Rect
		);
	}

	cleanCanvas() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.c.clearRect(0, 0, this.width, this.height);
	}

	render() {
		this.cleanCanvas();
		renderShapes(this.shapes, this.ctx, this.width, this.height);
	}

	update(e: PointerEvent) {
		this.shapes?.forEach((shape) => {
			if (shape.type == 'Rect') {
				if (shape.options?.strokeColor) {
					shape.options.strokeColor = undefined;
				} else {
					shape.options!.strokeColor = 'rgb(0,255,255)';
				}
			}
		});
		this.render();
	}
}
