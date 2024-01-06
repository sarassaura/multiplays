export default class GameEngine {
	container: HTMLDivElement;
	width: number;
	height: number;
	scene: Array<typeof Layer.prototype>;
	hitBox: Array<typeof Layer.prototype>;
	constructor(
		container: HTMLDivElement,
		background: number,
		clickable: number
	) {
		this.container = container;

		this.width = this.container.clientWidth;
		this.height = this.container.clientHeight;

		this.scene = [];
		this.hitBox = [];

		for (let i = 0; i < background; i++) {
			this.scene.push(new Layer(container));
		}

		for (let i = 0; i < clickable; i++) {
			let layer = new Layer(container);
			layer.invisible();
			this.hitBox.push(layer);
		}
	}

	resetDimensions() {
		this.width = this.container.clientWidth;
		this.height = this.container.clientHeight;
	}

	resizeCanvas() {
		this.resetDimensions();
		this.scene[0].resize(this.width, this.height);
		this.hitBox[0].resize(this.width, this.height);
	}

	resize() {
		this.resizeCanvas();
		this.render();
	}

	cleanCanvas() {
		this.scene[0].clean(this.width, this.height);
		this.hitBox[0].clean(this.width, this.height);
	}

	render() {
		this.cleanCanvas();

		this.scene[0].renderShapes(this.width, this.height);
		this.hitBox[0].renderBoxes(this.width, this.height);
	}
}
