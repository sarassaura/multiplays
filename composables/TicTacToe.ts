import { createCircle, createLine, createRect } from './BasicShapes';
import GameEngine from './GameEngine';

export default class TicTacToe extends GameEngine {
	tiles;
	Xtime: boolean;
	constructor(
		container: HTMLDivElement,
		canvas: HTMLCanvasElement,
		hitBox: HTMLCanvasElement
	) {
		super(container, canvas, hitBox);
		this.initialState();
		this.resize();
		this.tiles = {};
		this.Xtime = true;
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
		this.boxes['0,200,0'] = createRect(100, 100, {
			x: -100,
			y: -100,
			color: 'rgb(0,200,0)'
		}) as Rect;
		this.boxes['200,0,0'] = createRect(100, 100, {
			x: 0,
			y: -100,
			color: 'rgb(200,0,0)'
		}) as Rect;
		this.boxes['0,0,200'] = createRect(100, 100, {
			x: 100,
			y: -100,
			color: 'rgb(0,0,200)'
		}) as Rect;
		this.boxes['0,100,0'] = createRect(100, 100, {
			x: -100,
			y: 0,
			color: 'rgb(0,100,0)'
		}) as Rect;
		this.boxes['100,0,0'] = createRect(100, 100, {
			x: 0,
			y: 0,
			color: 'rgb(100,0,0)'
		}) as Rect;
		this.boxes['0,0,100'] = createRect(100, 100, {
			x: 100,
			y: 0,
			color: 'rgb(0,0,100)'
		}) as Rect;
		this.boxes['0,50,0'] = createRect(100, 100, {
			x: -100,
			y: 100,
			color: 'rgb(0,50,0)'
		}) as Rect;
		this.boxes['50,0,0'] = createRect(100, 100, {
			x: 0,
			y: 100,
			color: 'rgb(50,0,0)'
		}) as Rect;
		this.boxes['0,0,50'] = createRect(100, 100, {
			x: 100,
			y: 100,
			color: 'rgb(0,0,50)'
		}) as Rect;
	}

	update(e: PointerEvent) {
		let x = e.clientX - this.container.offsetLeft;
		let y = e.clientY - this.container.offsetTop;
		let rgb = this.c.getImageData(x, y, 1, 1).data;
		let box = this.boxes[rgb[0] + ',' + rgb[1] + ',' + rgb[2]] as Rect;

		if (box) {
			switch (this.Xtime) {
				case true:
					this.createO(box.centerPoint!.x!, box.centerPoint!.y!);
					break;
				case false:
					this.createX(box.centerPoint!.x!, box.centerPoint!.y!);
					break;
			}
			this.Xtime = !this.Xtime;
		}
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
}
