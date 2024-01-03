import BasicShapes from './BasicShapes';
import GameEngine from './GameEngine';

export default class NoGame extends GameEngine {
	b: BasicShapes;
	constructor(
		container: HTMLDivElement,
		canvas: HTMLCanvasElement,
		hitBox: HTMLCanvasElement
	) {
		super(container, canvas, hitBox);
		this.b = new BasicShapes();
	}

	initialize() {
		this.canvas.id = 'no-game';
		this.initialState();
		this.resize();
	}

	initialState() {
		this.shapes.push(
			this.b.createRect(200, 200, {
				color: 'rgba(255,0,0,0.4)',
				strokeColor: 'rgb(0,255,255)'
			}) as Rect
		);
		this.shapes.push(
			this.b.createRect(200, 200, {
				x: 50,
				y: 50,
				color: 'rgba(0,255,0,0.4)'
			}) as Rect
		);
		this.shapes.push(
			this.b.createRect(200, 200, {
				x: -50,
				y: -50,
				color: 'rgba(0,0,255, 0.4)'
			}) as Rect
		);
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
