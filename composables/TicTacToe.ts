import { createCircle, createLine, createRect } from './BasicShapes';
import GameEngine from './GameEngine';

export default class TicTacToe extends GameEngine {
	tiles;
	constructor(
		container: HTMLDivElement,
		canvas: HTMLCanvasElement,
		hitBox: HTMLCanvasElement
	) {
		super(container, canvas, hitBox);
		this.initialState();
		this.resize();
		this.tiles = {};
	}

	initialState() {
		this.shapes.push(
			createLine(-50, -150, -50, 150, {
				lineCap: 'round',
				color: 'rgb(255,255,255)'
			}) as Line
		);
		this.shapes.push(
			createLine(50, -150, 50, 150, {
				lineCap: 'round',
				color: 'rgb(255,255,255)'
			}) as Line
		);
		this.shapes.push(
			createLine(-150, -50, 150, -50, {
				lineCap: 'round',
				color: 'rgb(255,255,255)'
			}) as Line
		);
		this.shapes.push(
			createLine(-150, 50, 150, 50, {
				lineCap: 'round',
				color: 'rgb(255,255,255)'
			}) as Line
		);

		for (let i = -100; i <= 100; i += 100) {
			for (let j = -100; j <= 100; j += 100) {
				let random = this.randomColor();
				this.boxes[random] = createRect(100, 100, {
					x: i,
					y: j,
					color: `rgb(${random})`
				}) as Rect;
			}
		}
	}

	update(e: PointerEvent) {
		let x = e.clientX - this.container.offsetLeft;
		let y = e.clientY - this.container.offsetTop;
		let rgb = this.c.getImageData(x, y, 1, 1).data;
		let box = this.boxes[rgb[0] + ',' + rgb[1] + ',' + rgb[2]] as Rect;
		let keys = Object.keys(this.boxes);
		let length = keys.length;

		if (box) {
			this.createX(box.centerPoint!.x!, box.centerPoint!.y!);
			delete this.boxes[rgb[0] + ',' + rgb[1] + ',' + rgb[2]];
			length--;

			if (length > 0) {
				let random = this.random(length);

				let randomBox = Object.values(this.boxes)[random] as Rect;

				this.createO(randomBox.centerPoint!.x!, randomBox.centerPoint!.y!);
				delete this.boxes[Object.keys(this.boxes)[random]];
			}

			this.render();
		} else {
			if (length == 0) {
				this.reset();
			}
		}
	}

	reset() {
		this.shapes = [];
		this.boxes = {};
		this.initialState();
		this.render();
	}

	createO(x: number, y: number) {
		this.shapes.push(
			createCircle(38, {
				x,
				y,
				strokeColor: 'rgb(255,255,255)'
			}) as Circle
		);
	}

	createX(x: number, y: number) {
		this.shapes.push(
			createLine(x - 38, y - 38, x + 38, y + 38, {
				lineCap: 'round',
				color: 'rgb(255,255,255)'
			}) as Line
		);
		this.shapes.push(
			createLine(x - 38, y + 38, x + 38, y - 38, {
				lineCap: 'round',
				color: 'rgb(255,255,255)'
			}) as Line
		);
	}

	random(length: number) {
		return Math.floor(Math.random() * length);
	}

	randomColor(): string {
		let r = this.random(256);
		let g = this.random(256);
		let b = this.random(256);

		let color = r + ',' + g + ',' + b;

		if (this.boxes[color]) {
			return this.randomColor();
		}
		return color;
	}
}
