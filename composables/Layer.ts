export default class Layer {
	canvas: HTMLCanvasElement;
	c: CanvasRenderingContext2D;
	shapes: Array<Shape>;
	boxes: Record<string, Shape>;
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	constructor(
		container: HTMLDivElement,
		options?: { x?: number; y?: number; w?: number; h?: number; inv?: boolean }
	) {
		this.canvas = document.createElement('canvas') as HTMLCanvasElement;
		this.canvas.style.position = 'absolute';
		this.c = this.canvas.getContext('2d')!;
		// this.canvas.style.border = '1px solid red';

		this.width = options?.w;
		this.height = options?.h;
		this.x = options?.x || 0;
		this.y = options?.y || 0;

		this.canvas.style.left = '50%';
		this.canvas.style.top = '50%';
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

	reset() {
		this.shapes = [];
		this.boxes = {};
	}
}
