import { createRect } from '../BasicShapes';
import GameEngine from '../GameEngine';

export default class NoGame extends GameEngine {
	constructor(container: HTMLDivElement) {
		super(container);

		this.scene.push(new Layer(container));
		this.hitBox.push(new Layer(container, { inv: true }));

		this.initialState();
		this.resizeCanvas();

		this.scene[0].renderShapes(this.width, this.height);
	}

	initialState() {
		this.scene[0].createShapes(
			createRect(200, 200, {
				color: 'rgba(255,0,0,0.4)',
				strokeColor: 'rgb(0,255,255)'
			}) as Rect
		);
		this.scene[0].createShapes(
			createRect(200, 200, {
				x: 50,
				y: 50,
				color: 'rgba(0,255,0,0.4)'
			}) as Rect
		);
		this.scene[0].createShapes(
			createRect(200, 200, {
				x: -50,
				y: -50,
				color: 'rgba(0,0,255, 0.4)'
			}) as Rect
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
