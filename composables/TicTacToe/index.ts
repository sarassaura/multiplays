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
	scene: Array<typeof Layer.prototype>;
	hitBox: Array<typeof Layer.prototype>;
	constructor(
		container: HTMLDivElement,
		background: number,
		clickable: number
	) {
		super(container);
		this.scene = [];
		this.hitBox = [];

		for (let i = 0; i < background; i++) {
			this.scene.push(new Layer(container, []));
		}

		for (let i = 0; i < clickable; i++) {
			let layer = new Layer(container, {});
			layer.invisible();
			this.hitBox.push(layer);
		}

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

		renderShapes(
			this.scene[0].storage as Shape[],
			this.scene[0].c,
			this.width,
			this.height
		);
		renderShapes(
			Object.values(this.hitBox[0].storage as Record<string, Shape>),
			this.hitBox[0].c,
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

	cleanCanvas() {
		this.scene[0].clean(this.width, this.height);
		this.hitBox[0].clean(this.width, this.height);
	}

	render() {
		this.cleanCanvas();

		renderShapes(
			this.scene[0].storage as Shape[],
			this.scene[0].c,
			this.width,
			this.height
		);
		renderShapes(
			Object.values(this.hitBox[0].storage as Record<string, Shape>),
			this.hitBox[0].c,
			this.width,
			this.height
		);
	}

	initialState() {
		this.board.forEach((line) => {
			(this.scene[0].storage as Shape[]).push(
				createLine(...line, {
					lineCap: 'round',
					color: 'rgb(255,255,255)'
				}) as Line
			);
		});

		for (let i = -100; i <= 100; i += 100) {
			for (let j = -100; j <= 100; j += 100) {
				let random = randomColor(
					this.hitBox[0].storage as Record<string, Shape>
				);
				(this.hitBox[0].storage as Record<string, Shape>)[random] = createRect(
					100,
					100,
					{
						x: i,
						y: j,
						color: `rgb(${random})`
					}
				) as Rect;
			}
		}
	}

	update(e: PointerEvent) {
		let x = e.clientX - this.container.offsetLeft;
		let y = e.clientY - this.container.offsetTop;
		let rgb = this.hitBox[0].c.getImageData(x, y, 1, 1).data;
		let box = (this.hitBox[0].storage as Record<string, Shape>)[
			rgb[0] + ',' + rgb[1] + ',' + rgb[2]
		] as Rect;

		if (box) {
			let player = new Player(box.centerPoint!.x!, box.centerPoint!.y!);
			(this.scene[0].storage as Shape[]).push(...player.create());
			delete (this.hitBox[0].storage as Record<string, Shape>)[
				rgb[0] + ',' + rgb[1] + ',' + rgb[2]
			];
			this.checkWon(box.centerPoint!.x!, box.centerPoint!.y!, 1);
			this.moves--;

			if (this.moves > 0) {
				let random = randomNumber(this.moves);
				let [key, value] = Object.entries(
					this.hitBox[0].storage as Record<string, Shape>
				)[random] as [string, Rect];
				let enemy = new Enemy(value.centerPoint!.x!, value.centerPoint!.y!);
				let shapes = enemy.create();

				(this.scene[0].storage as Shape[]).push(shapes);
				delete (this.hitBox[0].storage as Record<string, Shape>)[key];
				this.checkWon(value.centerPoint!.x!, value.centerPoint!.y!, -1);
				this.moves--;
			}

			this.render();
		}
	}

	reset() {
		(this.scene[0].storage as Shape[]) = [];
		(this.hitBox[0].storage as Record<string, Shape>) = {};
		this.lines = [0, 0, 0];
		this.columns = [0, 0, 0];
		this.diagonal = 0;
		this.reverseDiagonal = 0;
		this.moves = 9;
		this.initialState();
		this.render();
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
			(this.scene[0].storage as Shape[]).push(
				createLine(-142, y, 142, y, {
					color: 'rgb(0,255,0)',
					lineCap: 'round'
				}) as Line
			);
		}
		if (this.columns[x / 100 + 1] == unbroken) {
			(this.scene[0].storage as Shape[]).push(
				createLine(x, -142, x, 142, {
					color: 'rgb(0,255,0)',
					lineCap: 'round'
				}) as Line
			);
		}
		if (this.diagonal == unbroken) {
			(this.scene[0].storage as Shape[]).push(
				createLine(-100, -100, 100, 100, {
					color: 'rgb(0,255,0)',
					lineCap: 'round'
				}) as Line
			);
		}
		if (this.reverseDiagonal == unbroken) {
			(this.scene[0].storage as Shape[]).push(
				createLine(100, -100, -100, 100, {
					color: 'rgb(0,255,0)',
					lineCap: 'round'
				}) as Line
			);
		}
	}
}
