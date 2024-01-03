type Shape = Line | Rect | Circle;
type Line = {
	type: 'Line';
	initialPoint: {
		x: number;
		y: number;
	};
	endPoint: {
		x: number;
		y: number;
	};
	options?: {
		thick?: number;
		lineCap?: 'round' | 'butt' | 'square';
		color?: string;
	};
};
type Rect = {
	type: 'Rect';
	width: number;
	height: number;
	centerPoint?: {
		x?: number;
		y?: number;
	};
	options?: {
		thick?: number;
		color?: string;
		strokeColor?: string;
	};
};
type Circle = {
	type: 'Circle';
	radius: number;
	centerPoint?: {
		x?: number;
		y?: number;
	};
	options?: {
		thick?: number;
		color?: string;
		strokeColor?: string;
	};
};
