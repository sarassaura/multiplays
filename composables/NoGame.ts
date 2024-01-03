import GameEngine from './GameEngine';

export default class NoGame extends GameEngine {
	initialize() {
		this.canvas.id = 'no-game';
		this.initialState();
		this.resize();
	}

	initialState() {
		this.shapes.push(
			this.createRect(200, 200, {
				color: 'rgba(255,0,0,0.4)',
				strokeColor: 'rgb(0,255,255)'
			}) as Rect
		);
		this.shapes.push(
			this.createRect(200, 200, {
				x: 50,
				y: 50,
				color: 'rgba(0,255,0,0.4)'
			}) as Rect
		);
		this.shapes.push(
			this.createRect(200, 200, {
				x: -50,
				y: -50,
				color: 'rgba(0,0,255, 0.4)'
			}) as Rect
		);
	}

	update(e: MouseEvent) {
		// let x = e.pageX - canvas.offsetLeft;
		// let y = e.pageY - canvas.offsetTop;
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
