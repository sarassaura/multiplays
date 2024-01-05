import { createCircle, createLine, createRect } from './BasicShapes';
import GameEngine from './GameEngine';

export default class TicTacToe extends GameEngine {
	tiles;
	lines: Array<number>;
	columns: Array<number>;
	diagonal: number;
	reverseDiagonal: number;
	constructor(
		container: HTMLDivElement,
		canvas: HTMLCanvasElement,
		hitBox: HTMLCanvasElement
	) {
		super(container, canvas, hitBox);
		this.initialState();
		this.resize();
		this.tiles = {};
		this.lines = [0, 0, 0];
		this.columns = [0, 0, 0];
		this.diagonal = 0;
		this.reverseDiagonal = 0;
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
			this.checkXwon(box.centerPoint!.x!, box.centerPoint!.y!);

			if (length >= 2) {
				let random = this.random(length - 1);
				let randomBox = Object.values(this.boxes)[random] as Rect;

				this.createO(randomBox.centerPoint!.x!, randomBox.centerPoint!.y!);
				delete this.boxes[Object.keys(this.boxes)[random]];
				this.checkOwon(randomBox.centerPoint!.x!, randomBox.centerPoint!.y!);
			}

			this.render();
		}
	}

	reset() {
		this.shapes = [];
		this.boxes = {};
		this.lines = [0, 0, 0];
		this.columns = [0, 0, 0];
		this.diagonal = 0;
		this.reverseDiagonal = 0;
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

	checkXwon(x: number, y: number) {
		this.lines[y / 100 + 1]++;
		this.columns[x / 100 + 1]++;

		if (Math.abs(x) == Math.abs(y)) {
			if (x == y) {
				this.diagonal++;
			}
			if (x + y == 0) {
				this.reverseDiagonal++;
			}
		}

		switch (3) {
			case this.lines[y / 100 + 1]:
				this.shapes.push(
					createLine(-142, y, 142, y, {
						color: 'rgb(0,255,0)',
						lineCap: 'round'
					}) as Line
				);
				break;
			case this.columns[x / 100 + 1]:
				this.shapes.push(
					createLine(x, -142, x, 142, {
						color: 'rgb(0,255,0)',
						lineCap: 'round'
					}) as Line
				);
				break;
			case this.diagonal:
				this.shapes.push(
					createLine(-100, -100, 100, 100, {
						color: 'rgb(0,255,0)',
						lineCap: 'round'
					}) as Line
				);
				break;
			case this.reverseDiagonal:
				this.shapes.push(
					createLine(100, -100, -100, 100, {
						color: 'rgb(0,255,0)',
						lineCap: 'round'
					}) as Line
				);
				break;
		}
	}

	checkOwon(x: number, y: number) {
		this.lines[y / 100 + 1]--;
		this.columns[x / 100 + 1]--;

		if (Math.abs(x) == Math.abs(y)) {
			if (x == y) {
				this.diagonal--;
			}
			if (x + y == 0) {
				this.reverseDiagonal--;
			}
		}

		switch (-3) {
			case this.lines[y / 100 + 1]:
				this.shapes.push(
					createLine(-142, y, 142, y, {
						color: 'rgb(0,255,0)',
						lineCap: 'round'
					}) as Line
				);
				break;
			case this.columns[x / 100 + 1]:
				this.shapes.push(
					createLine(x, -142, x, 142, {
						color: 'rgb(0,255,0)',
						lineCap: 'round'
					}) as Line
				);
				break;
			case this.diagonal:
				this.shapes.push(
					createLine(-100, -100, 100, 100, {
						color: 'rgb(0,255,0)',
						lineCap: 'round'
					}) as Line
				);
				break;
			case this.reverseDiagonal:
				this.shapes.push(
					createLine(100, -100, -100, 100, {
						color: 'rgb(0,255,0)',
						lineCap: 'round'
					}) as Line
				);
				break;
		}
	}
}
