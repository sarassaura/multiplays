import { createRect } from '../BasicShapes';
import GameEngine from '../GameEngine';

export default class NoGame extends GameEngine {
	scene: Array<typeof Layer.prototype>;
	hitBox: Array<typeof Layer.prototype>;
	constructor(
		container: HTMLDivElement,
		background: number,
		clickable: number
	) {
		super(container, background, clickable);
		this.scene = [];
		this.hitBox = [];

		for (let i = 0; i < background; i++) {
			this.scene.push(new Layer(container));
		}

		for (let i = 0; i < clickable; i++) {
			let layer = new Layer(container);
			layer.invisible();
			this.hitBox.push(layer);
		}

		this.initialState();
		this.resizeCanvas();

		renderShapes(
			this.scene[0].shapes,
			this.scene[0].c,
			this.width,
			this.height
		);
	}

	resize() {
		this.resizeCanvas();
		this.render();
	}

	resizeCanvas() {
		this.resetDimensions();
		this.scene[0].resize(this.width, this.height);
		this.hitBox[0].resize(this.width, this.height);
	}

	initialState() {
		this.scene[0].shapes.push(
			createRect(200, 200, {
				color: 'rgba(255,0,0,0.4)',
				strokeColor: 'rgb(0,255,255)'
			}) as Rect
		);
		this.scene[0].shapes.push(
			createRect(200, 200, {
				x: 50,
				y: 50,
				color: 'rgba(0,255,0,0.4)'
			}) as Rect
		);
		this.scene[0].shapes.push(
			createRect(200, 200, {
				x: -50,
				y: -50,
				color: 'rgba(0,0,255, 0.4)'
			}) as Rect
		);
	}

	cleanCanvas() {
		this.scene[0].clean(this.width, this.height);
		this.hitBox[0].clean(this.width, this.height);
	}

	render() {
		this.cleanCanvas();
		renderShapes(
			this.scene[0].shapes,
			this.scene[0].c,
			this.width,
			this.height
		);
	}

	update(e: PointerEvent) {
		this.scene[0].shapes?.forEach((shape) => {
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
