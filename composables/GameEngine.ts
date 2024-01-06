export default class GameEngine {
	container: HTMLDivElement;
	width: number;
	height: number;
	constructor(container: HTMLDivElement) {
		this.container = container;

		this.width = this.container.clientWidth;
		this.height = this.container.clientHeight;
	}

	resetDimensions() {
		this.width = this.container.clientWidth;
		this.height = this.container.clientHeight;
	}
}
