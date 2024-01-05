export function randomNumber(length: number) {
	return Math.floor(Math.random() * length);
}

export function randomColor(store: Record<string, Shape>): string {
	let r = randomNumber(256);
	let g = randomNumber(256);
	let b = randomNumber(256);

	let color = r + ',' + g + ',' + b;

	if (store[color]) {
		return randomColor(store);
	}
	return color;
}
