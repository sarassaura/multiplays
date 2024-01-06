import {
	createCircle,
	createLine,
	createRect,
	renderShapes
} from '../BasicShapes';
import { randomNumber, randomColor } from '../utils';
import GameEngine from '../GameEngine';
import Enemy from './enemy';
import Player from './player';

export default class TicTacToe extends GameEngine {
	lines: Array<number>;
	columns: Array<number>;
	diagonal: number;
	reverseDiagonal: number;
	board: Array<[number, number, number, number]>;
	moves: number;
	constructor(
		container: HTMLDivElement,
		background: number,
		clickable: number
	) {
		super(container, background, clickable);

		this.board = [
			[-50, -150, -50, 150],
			[50, -150, 50, 150],
			[-150, -50, 150, -50],
			[-150, 50, 150, 50]
		];

		this.initialState();
		this.resizeCanvas();

		this.moves = 9;

		this.lines = [0, 0, 0];
		this.columns = [0, 0, 0];
		this.diagonal = 0;
		this.reverseDiagonal = 0;

		this.scene[0].renderShapes(this.width, this.height);
		this.hitBox[0].renderBoxes(this.width, this.height);
	}

	initialState() {
		this.initialBoard();
		this.initialBoxes();
	}

	initialBoard() {
		this.board.forEach((line) => {
			this.scene[0].createShapes(
				createLine(...line, {
					lineCap: 'round',
					color: 'rgb(255,255,255)'
				}) as Line
			);
		});
	}

	initialBoxes() {
		for (let i = -100; i <= 100; i += 100) {
			for (let j = -100; j <= 100; j += 100) {
				this.hitBox[0].createBoxes(
					createRect(100, 100, {
						x: i,
						y: j
					}) as Rect
				);
			}
		}
	}

	update(e: PointerEvent) {
		let x = e.clientX - this.container.offsetLeft;
		let y = e.clientY - this.container.offsetTop;
		let rgb = this.hitBox[0].c.getImageData(x, y, 1, 1).data;
		let box = this.hitBox[0].boxes[
			rgb[0] + ',' + rgb[1] + ',' + rgb[2]
		] as Rect;

		if (box) {
			let player = new Player(box.centerPoint!.x!, box.centerPoint!.y!);
			this.scene[1].shapes.push(...player.create());
			renderShapes(player.create(), this.scene[1].c, this.width, this.height);
			delete this.hitBox[0].boxes[rgb[0] + ',' + rgb[1] + ',' + rgb[2]];
			this.checkWon(box.centerPoint!.x!, box.centerPoint!.y!, 1);
			this.moves--;

			if (this.moves > 0) {
				let random = randomNumber(this.moves);
				let [key, value] = Object.entries(this.hitBox[0].boxes)[random] as [
					string,
					Rect
				];
				let enemy = new Enemy(value.centerPoint!.x!, value.centerPoint!.y!);
				let shapes = enemy.create();

				this.scene[1].shapes.push(shapes);
				renderShapes([shapes], this.scene[1].c, this.width, this.height);
				delete this.hitBox[0].boxes[key];
				this.checkWon(value.centerPoint!.x!, value.centerPoint!.y!, -1);
				this.moves--;
			}
		}
	}

	reset() {
		this.scene[1].reset();
		this.hitBox[0].reset();
		this.scene[1].clean(this.width, this.height);
		this.initialBoxes();
		this.hitBox[0].renderBoxes(this.width, this.height);
		this.lines = [0, 0, 0];
		this.columns = [0, 0, 0];
		this.diagonal = 0;
		this.reverseDiagonal = 0;
		this.moves = 9;
	}

	checkWon(x: number, y: number, point: number) {
		this.lines[y / 100 + 1] += point;
		this.columns[x / 100 + 1] += point;

		if (Math.abs(x) == Math.abs(y)) {
			if (x == y) {
				this.diagonal += point;
			}
			if (x + y == 0) {
				this.reverseDiagonal += point;
			}
		}

		this.moves <= 5 && this.createSlash(x, y, 3 * point);
	}

	createSlash(x: number, y: number, unbroken: number) {
		if (this.lines[y / 100 + 1] == unbroken) {
			let shape = createLine(-142, y, 142, y, {
				color: 'rgb(0,255,0)',
				lineCap: 'round'
			}) as Line;
			this.scene[1].createShapes(shape);
			renderShapes([shape], this.scene[1].c, this.width, this.height);
		}
		if (this.columns[x / 100 + 1] == unbroken) {
			let shape = createLine(x, -142, x, 142, {
				color: 'rgb(0,255,0)',
				lineCap: 'round'
			}) as Line;
			this.scene[1].createShapes(shape);
			renderShapes([shape], this.scene[1].c, this.width, this.height);
		}
		if (this.diagonal == unbroken) {
			let shape = createLine(-100, -100, 100, 100, {
				color: 'rgb(0,255,0)',
				lineCap: 'round'
			}) as Line;
			this.scene[1].createShapes(shape);
			renderShapes([shape], this.scene[1].c, this.width, this.height);
		}
		if (this.reverseDiagonal == unbroken) {
			let shape = createLine(100, -100, -100, 100, {
				color: 'rgb(0,255,0)',
				lineCap: 'round'
			}) as Line;
			this.scene[1].createShapes(shape);
			renderShapes([shape], this.scene[1].c, this.width, this.height);
		}
	}
}
