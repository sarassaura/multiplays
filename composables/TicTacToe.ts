import GameEngine from './GameEngine';

export default class TicTacToe extends GameEngine {
	initialize() {
		this.initialState();
		this.resize();
	}

	initialState() {
		this.shapes.push(
			this.createLine(-50, -150, -50, 150, {
				lineCap: 'round',
				color: 'rgb(255,255,255)'
			}) as Line
		);
		this.shapes.push(
			this.createLine(50, -150, 50, 150, {
				lineCap: 'round',
				color: 'rgb(255,255,255)'
			}) as Line
		);
		this.shapes.push(
			this.createLine(-150, -50, 150, -50, {
				lineCap: 'round',
				color: 'rgb(255,255,255)'
			}) as Line
		);
		this.shapes.push(
			this.createLine(-150, 50, 150, 50, {
				lineCap: 'round',
				color: 'rgb(255,255,255)'
			}) as Line
		);
		this.boxes['0,200,0'] = this.createRect(100, 100, {
			x: -100,
			y: -100,
			color: 'rgb(0,200,0)'
		}) as Rect;
		this.boxes['200,0,0'] = this.createRect(100, 100, {
			x: 0,
			y: -100,
			color: 'rgb(200,0,0)'
		}) as Rect;
		this.boxes['0,0,200'] = this.createRect(100, 100, {
			x: 100,
			y: -100,
			color: 'rgb(0,0,200)'
		}) as Rect;
		this.boxes['0,100,0'] = this.createRect(100, 100, {
			x: -100,
			y: 0,
			color: 'rgb(0,100,0)'
		}) as Rect;
		this.boxes['100,0,0'] = this.createRect(100, 100, {
			x: 0,
			y: 0,
			color: 'rgb(100,0,0)'
		}) as Rect;
		this.boxes['0,0,100'] = this.createRect(100, 100, {
			x: 100,
			y: 0,
			color: 'rgb(0,0,100)'
		}) as Rect;
		this.boxes['0,50,0'] = this.createRect(100, 100, {
			x: -100,
			y: 100,
			color: 'rgb(0,50,0)'
		}) as Rect;
		this.boxes['50,0,0'] = this.createRect(100, 100, {
			x: 0,
			y: 100,
			color: 'rgb(50,0,0)'
		}) as Rect;
		this.boxes['0,0,50'] = this.createRect(100, 100, {
			x: 100,
			y: 100,
			color: 'rgb(0,0,50)'
		}) as Rect;
	}

	update(e: MouseEvent) {
		let x = e.clientX - this.container.offsetLeft;
		let y = e.clientY - this.container.offsetTop;
		let rgb = this.c.getImageData(x, y, 1, 1).data;
		let box = this.boxes[rgb[0] + ',' + rgb[1] + ',' + rgb[2]] as Rect;

		if (box) {
			this.shapes.push(
				this.createCircle(38, {
					x: box.centerPoint?.x,
					y: box.centerPoint?.y,
					strokeColor: 'rgb(255,255,255)'
				}) as Circle
			);
		}
		this.render();
	}
}

type Shape = Line | Rect | Circle;
type Line = {
	type: 'Line';
	initialPoint: {
		x: number;
		y: number;
	};
	endPoint: {
		x: number;
		y: number;
	};
	options?: {
		thick?: number;
		lineCap?: 'round' | 'butt' | 'square';
		color?: string;
	};
};
type Rect = {
	type: 'Rect';
	width: number;
	height: number;
	centerPoint?: {
		x?: number;
		y?: number;
	};
	options?: {
		thick?: number;
		color?: string;
		strokeColor?: string;
	};
};
type Circle = {
	type: 'Circle';
	radius: number;
	centerPoint?: {
		x?: number;
		y?: number;
	};
	options?: {
		thick?: number;
		color?: string;
		strokeColor?: string;
	};
};
