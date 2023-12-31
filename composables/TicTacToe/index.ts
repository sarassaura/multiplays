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
	played: Array<number>;
	constructor(container: HTMLDivElement) {
		super(container);

		this.scene.push(new Layer(container));
		this.scene.push(new Layer(container));

		for (let i = -100; i <= 100; i += 100) {
			for (let j = -100; j <= 100; j += 100) {
				this.button.push(new Button(container, { w: 100, h: 100, x: j, y: i }));
			}
		}

		// this.button.push(
		// 	new Button(container, { h: 50, w: 50, y: 250, rot: true })
		// );

		this.board = [
			[-50, -150, -50, 150],
			[50, -150, 50, 150],
			[-150, -50, 150, -50],
			[-150, 50, 150, 50]
		];

		this.moves = 9;
		this.played = [];

		this.lines = [0, 0, 0];
		this.columns = [0, 0, 0];
		this.diagonal = 0;
		this.reverseDiagonal = 0;

		this.initialState();
		this.resizeCanvas();

		this.renderScenes();
		this.renderBoxes();
	}

	initialState() {
		this.initialBoard();
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

	reset() {
		this.scene[1].reset();
		this.cleanScene(1);
		this.lines = [0, 0, 0];
		this.columns = [0, 0, 0];
		this.diagonal = 0;
		this.reverseDiagonal = 0;
		this.moves = 9;
		this.played = [];
	}

	async update(s: number) {
		if (this.moves % 2 == 1 && !this.played.includes(s)) {
			let player = new Player(...this.toCoord(s));
			this.scene[1].shapes.push(...player.create());
			renderShapes(player.create(), this.scene[1].c, this.width, this.height);
			this.played.push(s);
			this.checkWon(...this.toCoord(s), 1);
			this.moves--;

			if (this.moves > 0) {
				let random;
				do {
					random = randomNumber(9);
				} while (this.played.includes(random));

				let enemy = new Enemy(...this.toCoord(random));
				let shapes = enemy.create();

				this.played.push(random);

				await new Promise((r) => setTimeout(r, 200));

				this.scene[1].shapes.push(shapes);
				renderShapes([shapes], this.scene[1].c, this.width, this.height);
				this.checkWon(...this.toCoord(random), -1);
				this.moves--;
			}
		}
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

	toCoord(n: number): [number, number] {
		let line = Math.floor(n / 3);
		let col = n - line * 3;

		let x = (col - 1) * 100;
		let y = (line - 1) * 100;

		return [x, y];
	}
}
