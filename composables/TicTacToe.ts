import GameEngine from './GameEngine';

export default class TicTacToe extends GameEngine {
	initialize() {
		this.canvas.id = 'tic-tac-toe';
		this.initialState();
		this.resize();
	}

	initialState() {
		this.createRect(200, 200, { strokeColor: 'rgb(0,255,255)', thick: 10 });
		this.createRect(200, 200, { x: 50, y: 50 });
		this.createRect(200, 200, {
			x: -50,
			y: -50,
			color: 'rgb(255,255,0)',
			strokeColor: 'rgb(0,255,255)'
		});
		this.createLine(0, 0, this.width, this.height, {
			thick: 10,
			color: 'rgba(0,255,0,0.2)'
		});
		this.createLine(10, this.height - 10, this.width - 10, 10, {
			lineCap: 'round'
		});
		this.createCircle(100, { thick: 10, color: 'rgb(255,0,255)' });
	}

	update(e: MouseEvent) {
		// let x = e.pageX - canvas.offsetLeft;
		// let y = e.pageY - canvas.offsetTop;
		console.log('Clicked');
	}
}
