export default class Layer {
	canvas: HTMLCanvasElement;
	c: CanvasRenderingContext2D;
	storage: Array<Shape> | Record<string, Shape>;
	constructor(
		container: HTMLDivElement,
		storage: Array<Shape> | Record<string, Shape>
	) {
		this.canvas = document.createElement('canvas') as HTMLCanvasElement;
		this.canvas.style.position = 'absolute';
		this.c = this.canvas.getContext('2d')!;
		container.appendChild(this.canvas);
		this.storage = storage;
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
}
