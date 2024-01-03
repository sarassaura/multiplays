export const createLine = (
	px1: number,
	py1: number,
	px2: number,
	py2: number,
	options?: {
		thick?: number;
		lineCap?: 'round' | 'butt' | 'square';
		color?: string;
	}
) => {
	return {
		type: 'Line',
		initialPoint: {
			x: px1,
			y: py1
		},
		endPoint: {
			x: px2,
			y: py2
		},
		options: {
			thick: options?.thick,
			lineCap: options?.lineCap,
			color: options?.color
		}
	};
};

export const createRect = (
	width: number,
	height: number,
	options?: {
		x?: number;
		y?: number;
		thick?: number;
		color?: string;
		strokeColor?: string;
	}
) => {
	return {
		type: 'Rect',
		width,
		height,
		centerPoint: {
			x: options?.x,
			y: options?.y
		},
		options: {
			thick: options?.thick,
			color: options?.color,
			strokeColor: options?.strokeColor
		}
	};
};

export const createCircle = (
	radius: number,
	options?: {
		x?: number;
		y?: number;
		thick?: number;
		color?: string;
		strokeColor?: string;
	}
) => {
	return {
		type: 'Circle',
		radius,
		centerPoint: {
			x: options?.x,
			y: options?.y
		},
		options: {
			thick: options?.thick,
			color: options?.color,
			strokeColor: options?.strokeColor
		}
	};
};
