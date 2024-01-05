export default class Layer {
	canvas: HTMLCanvasElement;
	constructor(container: HTMLDivElement) {
		this.canvas = document.createElement('canvas') as HTMLCanvasElement;
		this.canvas.style.position = 'absolute';
		container.appendChild(this.canvas);
	}

	invisible() {
		this.canvas.style.opacity = '0.0';
	}
}
