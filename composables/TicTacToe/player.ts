export default class Player {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	create() {
		let x = this.x;
		let y = this.y;

		return [
			createLine(x - 38, y - 38, x + 38, y + 38, {
				lineCap: 'round',
				color: 'rgb(255,255,255)'
			}) as Line,
			createLine(x - 38, y + 38, x + 38, y - 38, {
				lineCap: 'round',
				color: 'rgb(255,255,255)'
			}) as Line
		];
	}
}
