import GameEngine from './GameEngine';

export default class NoGame extends GameEngine {
	initialize() {
		this.canvas.id = 'no-game';
		this.initialState();
		this.resize();
	}

	initialState() {
		this.createRect(200, 200, this.ctx, {
			color: 'rgba(255,0,0,0.4)',
			strokeColor: 'rgb(0,255,255)'
		});
		this.createRect(200, 200, this.ctx, {
			x: 50,
			y: 50,
			color: 'rgba(0,255,0,0.4)'
		});
		this.createRect(200, 200, this.ctx, {
			x: -50,
			y: -50,
			color: 'rgba(0,0,255, 0.4)'
		});
	}

	update(e: MouseEvent) {
		// let x = e.pageX - canvas.offsetLeft;
		// let y = e.pageY - canvas.offsetTop;
		this.shapes?.forEach((shape) => {
			if (shape.type == 'Rect') {
				if (shape.options?.strokeColor) {
					shape.options.strokeColor = undefined;
				} else {
					shape.options!.strokeColor = 'rgb(0,255,255)';
				}
			}
		});
		this.render();
	}
}
