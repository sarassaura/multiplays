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

	initialize() {
		this.canvas.id = 'tictactoe';
		this.resize();
	}

	resize() {
		this.canvas.height = this.container.clientHeight;
		this.canvas.width = this.container.clientWidth;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.draw();
	}

	draw() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.createRect(200, 200, { strokeColor: 'rgb(0,255,255)', thick: 10 });
		this.createRect(200, 200, { x: 50, y: 50 });
		this.createRect(200, 200, {
			x: -50,
			y: -50,
			color: 'rgb(255,255,0)',
			strokeColor: 'rgb(0,255,255)'
		});
		this.createLine(0, 0, this.width, this.height, {
			thick: 10,
			color: 'rgba(0,255,0,0.2)'
		});
		this.createLine(10, this.height - 10, this.width - 10, 10, {
			lineCap: 'round'
		});
		this.createCircle(100, { thick: 10, color: 'rgb(255,0,255)' });
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
