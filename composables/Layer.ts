export default class Layer {
	canvas: HTMLCanvasElement;
	c: CanvasRenderingContext2D;
	constructor(container: HTMLDivElement) {
		this.canvas = document.createElement('canvas') as HTMLCanvasElement;
		this.canvas.style.position = 'absolute';
		this.c = this.canvas.getContext('2d')!;
		container.appendChild(this.canvas);
	}

	invisible() {
		this.canvas.style.opacity = '0.0';
	}
}
