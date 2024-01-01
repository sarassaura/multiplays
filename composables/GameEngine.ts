export default class GameEngine {
	container: HTMLDivElement;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	width: number;
	height: number;
	constructor(container: HTMLDivElement, canvas: HTMLCanvasElement) {
		this.container = container;
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d')!;
		this.width = this.container.clientWidth;
		this.height = this.container.clientHeight;
	}

	initialize(title: string, draw: () => void) {
		this.canvas.id = title;
		this.resize(draw);
	}

	resize(draw: () => void) {
		this.canvas.height = this.container.clientHeight;
		this.canvas.width = this.container.clientWidth;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		draw();
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
		this.ctx.beginPath();
		this.ctx.moveTo(px1, py1);
		this.ctx.lineTo(px2, py2);

		this.ctx.lineWidth = options?.thick || 5;
		this.ctx.strokeStyle = options?.color || 'rgb(0,0,0)';
		this.ctx.lineCap = options?.lineCap || 'butt';

		this.ctx.stroke();
		this.ctx.closePath();
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
}
