import GameEngine from './GameEngine';

export default class TicTacToe extends GameEngine {
	initialize() {
		this.canvas.id = 'tic-tac-toe';
		this.initialState();
		this.resize();
	}

	initialState() {
		this.createLine(-50, -150, -50, 150, {
			lineCap: 'round',
			color: 'rgb(255,255,255)'
		});
		this.createLine(50, -150, 50, 150, {
			lineCap: 'round',
			color: 'rgb(255,255,255)'
		});
		this.createLine(-150, -50, 150, -50, {
			lineCap: 'round',
			color: 'rgb(255,255,255)'
		});
		this.createLine(-150, 50, 150, 50, {
			lineCap: 'round',
			color: 'rgb(255,255,255)'
		});
	}

	update(e: MouseEvent) {
		// let x = e.pageX - canvas.offsetLeft;
		// let y = e.pageY - canvas.offsetTop;
		// this.render();
	}
}
