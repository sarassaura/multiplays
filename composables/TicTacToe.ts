import GameEngine from './GameEngine';

export default class TicTacToe extends GameEngine {
	initialize() {
		this.initialState();
		this.resize();
	}

	initialState() {
		this.createLine(-50, -150, -50, 150, this.shapes, {
			lineCap: 'round',
			color: 'rgb(255,255,255)'
		});
		this.createLine(50, -150, 50, 150, this.shapes, {
			lineCap: 'round',
			color: 'rgb(255,255,255)'
		});
		this.createLine(-150, -50, 150, -50, this.shapes, {
			lineCap: 'round',
			color: 'rgb(255,255,255)'
		});
		this.createLine(-150, 50, 150, 50, this.shapes, {
			lineCap: 'round',
			color: 'rgb(255,255,255)'
		});
		this.createRect(100, 100, this.boxes, {
			x: -100,
			y: -100,
			color: 'rgb(0,200,0)'
		});
		this.createRect(100, 100, this.boxes, {
			x: 0,
			y: -100,
			color: 'rgb(200,0,0)'
		});
		this.createRect(100, 100, this.boxes, {
			x: 100,
			y: -100,
			color: 'rgb(0,0,200)'
		});
		this.createRect(100, 100, this.boxes, {
			x: -100,
			y: 0,
			color: 'rgb(0,100,0)'
		});
		this.createRect(100, 100, this.boxes, {
			x: 0,
			y: 0,
			color: 'rgb(100,0,0)'
		});
		this.createRect(100, 100, this.boxes, {
			x: 100,
			y: 0,
			color: 'rgb(0,0,100)'
		});
		this.createRect(100, 100, this.boxes, {
			x: -100,
			y: 100,
			color: 'rgb(0,50,0)'
		});
		this.createRect(100, 100, this.boxes, {
			x: 0,
			y: 100,
			color: 'rgb(50,0,0)'
		});
		this.createRect(100, 100, this.boxes, {
			x: 100,
			y: 100,
			color: 'rgb(0,0,50)'
		});
	}

	update(e: MouseEvent) {
		let x = e.pageX - this.canvas.offsetLeft;
		let y = e.pageY - this.canvas.offsetTop;
		let rgb = this.c.getImageData(x, y, 1, 1).data;
		console.log(rgb);
		// this.render();
	}
}
