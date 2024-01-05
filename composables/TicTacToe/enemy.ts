export default class Enemy {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	create() {
		let x = this.x;
		let y = this.y;
		return createCircle(38, {
			x,
			y,
			strokeColor: 'rgb(255,255,255)'
		}) as Circle;
	}
}
