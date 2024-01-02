export default class GameEngine {
	container: HTMLDivElement;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	width: number;
	height: number;
	shapes?: Array<Shape>;
	constructor(container: HTMLDivElement, canvas: HTMLCanvasElement) {
		this.container = container;
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d')!;
		this.width = this.container.clientWidth;
		this.height = this.container.clientHeight;
		this.shapes = [];
	}

	resize() {
		this.canvas.height = this.container.clientHeight;
		this.canvas.width = this.container.clientWidth;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.render();
	}

	render() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.shapes?.forEach((shape) => {
			if (shape.type == 'Line') {
				this.drawLine(
					shape.initialPoint.x,
					shape.initialPoint.y,
					shape.endPoint.x,
					shape.endPoint.y,
					{
						thick: shape.options?.thick,
						lineCap: shape.options?.lineCap,
						color: shape.options?.color
					}
				);
			}
			if (shape.type == 'Rect') {
				this.drawRect(shape.width, shape.height, {
					x: shape.centerPoint?.x,
					y: shape.centerPoint?.y,
					color: shape.options?.color,
					strokeColor: shape.options?.strokeColor,
					thick: shape.options?.thick
				});
			}
			if (shape.type == 'Circle') {
				this.drawCircle(shape.radius, {
					x: shape.centerPoint?.x,
					y: shape.centerPoint?.y,
					color: shape.options?.color,
					strokeColor: shape.options?.strokeColor,
					thick: shape.options?.thick
				});
			}
		});
	}

	drawLine(
		px1: number,
		py1: number,
		px2: number,
		py2: number,
		options?: {
			thick?: number;
			lineCap?: 'round' | 'butt' | 'square';
			color?: string;
		}
	) {
		let centerX = this.width / 2;
		let centerY = this.height / 2;
		this.ctx.beginPath();
		this.ctx.moveTo(px1 + centerX, py1 + centerY);
		this.ctx.lineTo(px2 + centerX, py2 + centerY);

		this.ctx.lineWidth = options?.thick || 5;
		this.ctx.strokeStyle = options?.color || 'rgb(0,0,0)';
		this.ctx.lineCap = options?.lineCap || 'butt';

		this.ctx.stroke();
		this.ctx.closePath();
	}

	drawRect(
		width: number,
		height: number,
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

		this.ctx.beginPath();

		this.ctx.rect(centerX + x, centerY + y, width, height);

		if (options?.color) {
			this.ctx.fillStyle = options?.color || 'rgb(0,0,0)';
			this.ctx.fill();
		}

		if (options?.strokeColor || (!options?.color && !options?.strokeColor)) {
			this.ctx.strokeStyle = options?.strokeColor || 'rgb(255,255,255)';
			this.ctx.lineWidth = options?.thick || 5;
			this.ctx.rect(centerX + x, centerY + y, width, height);
			this.ctx.stroke();
		}

		this.ctx.closePath();
	}

	drawCircle(
		radius: number,
		options?: {
			x?: number;
			y?: number;
			thick?: number;
			color?: string;
			strokeColor?: string;
		}
	) {
		this.ctx.beginPath();

		let startAngle = 0;
		let endAngle = 2 * Math.PI;

		let centerX = this.width / 2;
		let centerY = this.height / 2;
		let x = options?.x || 0;
		let y = options?.y || 0;

		this.ctx.arc(centerX + x, centerY + y, radius, startAngle, endAngle);

		if (options?.color) {
			this.ctx.fillStyle = options?.color || 'rgb(0,0,0)';
			this.ctx.fill();
		}

		if (options?.strokeColor || (!options?.color && !options?.strokeColor)) {
			this.ctx.lineWidth = options?.thick || 5;
			this.ctx.strokeStyle = options?.strokeColor || 'rgb(0,0,0)';
			this.ctx.stroke();
		}

		this.ctx.closePath();
	}

	createLine(
		px1: number,
		py1: number,
		px2: number,
		py2: number,
		options?: {
			thick?: number;
			lineCap?: 'round' | 'butt' | 'square';
			color?: string;
		}
	) {
		this.shapes?.push({
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
		options?: {
			x?: number;
			y?: number;
			thick?: number;
			color?: string;
			strokeColor?: string;
		}
	) {
		this.shapes?.push({
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
		options?: {
			x?: number;
			y?: number;
			thick?: number;
			color?: string;
			strokeColor?: string;
		}
	) {
		this.shapes?.push({
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
