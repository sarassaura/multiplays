export default class GameEngine {
	container: HTMLDivElement;
	width: number;
	height: number;
	scene: Array<typeof Layer.prototype>;
	hitBox: Array<typeof Layer.prototype>;
	constructor(container: HTMLDivElement) {
		this.container = container;

		this.width = this.container.clientWidth;
		this.height = this.container.clientHeight;

		this.scene = [];
		this.hitBox = [];
	}

	resetDimensions() {
		this.width = this.container.clientWidth;
		this.height = this.container.clientHeight;
	}

	resizeCanvas() {
		this.resetDimensions();
		this.scene.forEach((layer) => layer.resize(this.width, this.height));
		this.hitBox.forEach((layer) => layer.resize(this.width, this.height));
	}

	resize() {
		this.resizeCanvas();
		this.render();
	}

	cleanCanvas() {
		this.scene.forEach((layer) => layer.clean(this.width, this.height));
		this.hitBox.forEach((layer) => layer.clean(this.width, this.height));
	}

	cleanBoxes() {
		this.hitBox.forEach((layer) => layer.clean(this.width, this.height));
	}

	cleanScenes() {
		this.scene.forEach((layer) => layer.clean(this.width, this.height));
	}

	cleanBox(id: number) {
		this.hitBox[id].clean(this.width, this.height);
	}

	cleanScene(id: number) {
		this.scene[id].clean(this.width, this.height);
	}

	render() {
		this.cleanCanvas();

		this.scene.forEach((layer) => layer.renderShapes(this.width, this.height));
		this.hitBox.forEach((layer) => layer.renderBoxes(this.width, this.height));
	}

	renderBoxes() {
		this.hitBox.forEach((layer) => layer.renderBoxes(this.width, this.height));
	}

	renderScenes() {
		this.scene.forEach((layer) => layer.renderShapes(this.width, this.height));
	}
}
