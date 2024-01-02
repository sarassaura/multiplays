export default class GameEngine {
	container: HTMLDivElement;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	hitBox: HTMLCanvasElement;
	c: CanvasRenderingContext2D;
	width: number;
	height: number;
	shapes: Array<Shape>;
	boxes: Array<Shape>;
	constructor(
		container: HTMLDivElement,
		canvas: HTMLCanvasElement,
		hitBox: HTMLCanvasElement
	) {
		this.container = container;
		this.canvas = canvas;
		this.hitBox = hitBox;
		this.ctx = this.canvas.getContext('2d')!;
		this.c = this.hitBox.getContext('2d')!;
		this.width = this.container.clientWidth;
		this.height = this.container.clientHeight;
		this.shapes = [];
		this.boxes = [];
	}

	resize() {
		this.canvas.height = this.container.clientHeight;
		this.canvas.width = this.container.clientWidth;
		this.hitBox.height = this.container.clientHeight;
		this.hitBox.width = this.container.clientWidth;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.render();
	}

	render() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.c.clearRect(0, 0, this.width, this.height);
		this.shapes.forEach((shape) => this.renderShape(shape, this.ctx));
		this.boxes.forEach((shape) => this.renderShape(shape, this.c));
	}

	renderShape(shape: Shape, ctx: CanvasRenderingContext2D) {
		if (shape.type == 'Line') {
			this.drawLine(
				shape.initialPoint.x,
				shape.initialPoint.y,
				shape.endPoint.x,
				shape.endPoint.y,
				ctx,
				{
					thick: shape.options?.thick,
					lineCap: shape.options?.lineCap,
					color: shape.options?.color
				}
			);
		}
		if (shape.type == 'Rect') {
			this.drawRect(shape.width, shape.height, ctx, {
				x: shape.centerPoint?.x,
				y: shape.centerPoint?.y,
				color: shape.options?.color,
				strokeColor: shape.options?.strokeColor,
				thick: shape.options?.thick
			});
		}
		if (shape.type == 'Circle') {
			this.drawCircle(shape.radius, ctx, {
				x: shape.centerPoint?.x,
				y: shape.centerPoint?.y,
				color: shape.options?.color,
				strokeColor: shape.options?.strokeColor,
				thick: shape.options?.thick
			});
		}
	}

	drawLine(
		px1: number,
		py1: number,
		px2: number,
		py2: number,
		ctx: CanvasRenderingContext2D,
		options?: {
			thick?: number;
			lineCap?: 'round' | 'butt' | 'square';
			color?: string;
		}
	) {
		let centerX = this.width / 2;
		let centerY = this.height / 2;
		ctx.beginPath();
		ctx.moveTo(px1 + centerX, py1 + centerY);
		ctx.lineTo(px2 + centerX, py2 + centerY);

		ctx.lineWidth = options?.thick || 5;
		ctx.strokeStyle = options?.color || 'rgb(0,0,0)';
		ctx.lineCap = options?.lineCap || 'butt';

		ctx.stroke();
		ctx.closePath();
	}

	drawRect(
		width: number,
		height: number,
		ctx: CanvasRenderingContext2D,
		options?: {
			x?: number;
			y?: number;
			thick?: number;
			color?: string;
			strokeColor?: string;
		}
	) {
		let centerX = (this.width - width) / 2;
		let centerY = (this.height - height) / 2;
		let x = options?.x || 0;
		let y = options?.y || 0;

		ctx.beginPath();

		ctx.rect(centerX + x, centerY + y, width, height);

		if (options?.color) {
			ctx.fillStyle = options?.color || 'rgb(0,0,0)';
			ctx.fill();
		}

		if (options?.strokeColor || (!options?.color && !options?.strokeColor)) {
			ctx.strokeStyle = options?.strokeColor || 'rgb(255,255,255)';
			ctx.lineWidth = options?.thick || 5;
			ctx.rect(centerX + x, centerY + y, width, height);
			ctx.stroke();
		}

		ctx.closePath();
	}

	drawCircle(
		radius: number,
		ctx: CanvasRenderingContext2D,
		options?: {
			x?: number;
			y?: number;
			thick?: number;
			color?: string;
			strokeColor?: string;
		}
	) {
		ctx.beginPath();

		let startAngle = 0;
		let endAngle = 2 * Math.PI;

		let centerX = this.width / 2;
		let centerY = this.height / 2;
		let x = options?.x || 0;
		let y = options?.y || 0;

		ctx.arc(centerX + x, centerY + y, radius, startAngle, endAngle);

		if (options?.color) {
			ctx.fillStyle = options?.color || 'rgb(0,0,0)';
			ctx.fill();
		}

		if (options?.strokeColor || (!options?.color && !options?.strokeColor)) {
			ctx.lineWidth = options?.thick || 5;
			ctx.strokeStyle = options?.strokeColor || 'rgb(0,0,0)';
			ctx.stroke();
		}

		ctx.closePath();
	}

	createLine(
		px1: number,
		py1: number,
		px2: number,
		py2: number,
		elements: Array<Shape>,
		options?: {
			thick?: number;
			lineCap?: 'round' | 'butt' | 'square';
			color?: string;
		}
	) {
		elements.push({
			type: 'Line',
			initialPoint: {
				x: px1,
				y: py1
			},
			endPoint: {
				x: px2,
				y: py2
			},
			options: {
				thick: options?.thick,
				lineCap: options?.lineCap,
				color: options?.color
			}
		});
	}

	createRect(
		width: number,
		height: number,
		elements: Array<Shape>,
		options?: {
			x?: number;
			y?: number;
			thick?: number;
			color?: string;
			strokeColor?: string;
		}
	) {
		elements.push({
			type: 'Rect',
			width,
			height,
			centerPoint: {
				x: options?.x,
				y: options?.y
			},
			options: {
				thick: options?.thick,
				color: options?.color,
				strokeColor: options?.strokeColor
			}
		});
	}

	createCircle(
		radius: number,
		elements: Array<Shape>,
		options?: {
			x?: number;
			y?: number;
			thick?: number;
			color?: string;
			strokeColor?: string;
		}
	) {
		elements?.push({
			type: 'Circle',
			radius,
			centerPoint: {
				x: options?.x,
				y: options?.y
			},
			options: {
				thick: options?.thick,
				color: options?.color,
				strokeColor: options?.strokeColor
			}
		});
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
