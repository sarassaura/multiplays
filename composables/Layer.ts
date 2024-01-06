export default class Layer {
	canvas: HTMLCanvasElement;
	c: CanvasRenderingContext2D;
	shapes: Array<Shape>;
	boxes: Record<string, Shape>;
	constructor(container: HTMLDivElement) {
		this.canvas = document.createElement('canvas') as HTMLCanvasElement;
		this.canvas.style.position = 'absolute';
		this.c = this.canvas.getContext('2d')!;
		container.appendChild(this.canvas);
		this.shapes = [];
		this.boxes = {};
	}

	invisible() {
		this.canvas.style.opacity = '0.0';
	}

	clean(width: number, height: number) {
		this.c.clearRect(0, 0, width, height);
	}

	resize(width: number, height: number) {
		this.canvas.height = height;
		this.canvas.width = width;
	}

	renderShapes(width: number, height: number) {
		renderShapes(this.shapes, this.c, width, height);
	}

	renderBoxes(width: number, height: number) {
		renderShapes(Object.values(this.boxes), this.c, width, height);
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
