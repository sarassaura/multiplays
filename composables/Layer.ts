export default class Layer {
	canvas: HTMLCanvasElement;
	c: CanvasRenderingContext2D;
	shapes: Array<Shape>;
	boxes: Record<string, Shape>;
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	rot: boolean;
	constructor(
		container: HTMLDivElement,
		options?: {
			x?: number;
			y?: number;
			w?: number;
			h?: number;
			inv?: boolean;
			rot?: boolean;
		}
	) {
		this.canvas = document.createElement('canvas');
		this.canvas.style.position = 'absolute';
		this.c = this.canvas.getContext('2d')!;

		this.width = options?.w;
		this.height = options?.h;
		this.x = options?.x || 0;
		this.y = options?.y || 0;
		this.rot = options?.rot || false;

		this.canvas.style.left = `calc(50% + ${this.x}px)`;
		this.canvas.style.top = `calc(50% + ${this.y}px)`;
		this.canvas.style.transform = 'translate(-50%, -50%)';

		container.appendChild(this.canvas);
		this.shapes = [];
		this.boxes = {};
		options?.inv && this.invisible();
	}

	invisible() {
		this.canvas.style.opacity = '0.0';
	}

	clean(width: number, height: number) {
		this.c.clearRect(0, 0, this.width || width, this.height || height);
	}

	resize(width: number, height: number) {
		this.canvas.height = this.height || height;
		this.canvas.width = this.width || width;

		if (this.rot) {
			if (width > height && height < 500) {
				this.canvas.style.left = `calc(50% + ${this.y}px)`;
				this.canvas.style.top = `calc(50% + ${this.x}px)`;
			} else {
				this.canvas.style.left = `calc(50% + ${this.x}px)`;
				this.canvas.style.top = `calc(50% + ${this.y}px)`;
			}
		}
	}

	renderShapes(width: number, height: number) {
		renderShapes(
			this.shapes,
			this.c,
			this.width || width,
			this.height || height
		);
	}

	renderBoxes(width: number, height: number) {
		renderShapes(
			Object.values(this.boxes),
			this.c,
			this.width || width,
			this.height || height
		);
	}

	createShapes(shape: Shape) {
		this.shapes.push(shape);
	}

	createBoxes(shape: Shape) {
		let random = randomColor(this.boxes);
		shape.options!.color = `rgb(${random})`;
		this.boxes[random] = shape;
	}

	getPixelColor(e: PointerEvent) {
		let rect = this.canvas.getBoundingClientRect();
		let x = e.pageX - rect.left;
		let y = e.pageY - rect.top;
		let color = this.c.getImageData(x, y, 1, 1).data;

		return color[0] + ',' + color[1] + ',' + color[2];
	}

	reset() {
		this.shapes = [];
		this.boxes = {};
	}
}
