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

export const drawLine = (
	px1: number,
	py1: number,
	px2: number,
	py2: number,
	ctx: CanvasRenderingContext2D,
	canvasWidth: number,
	canvasHeight: number,
	options?: {
		thick?: number;
		lineCap?: 'round' | 'butt' | 'square';
		color?: string;
	}
) => {
	let centerX = canvasWidth / 2;
	let centerY = canvasHeight / 2;
	ctx.beginPath();
	ctx.moveTo(px1 + centerX, py1 + centerY);
	ctx.lineTo(px2 + centerX, py2 + centerY);

	ctx.lineWidth = options?.thick || 5;
	ctx.strokeStyle = options?.color || 'rgb(0,0,0)';
	ctx.lineCap = options?.lineCap || 'butt';

	ctx.stroke();
	ctx.closePath();
};

export const drawRect = (
	width: number,
	height: number,
	ctx: CanvasRenderingContext2D,
	canvasWidth: number,
	canvasHeight: number,
	options?: {
		x?: number;
		y?: number;
		thick?: number;
		color?: string;
		strokeColor?: string;
	}
) => {
	let centerX = (canvasWidth - width) / 2;
	let centerY = (canvasHeight - height) / 2;
	let x = options?.x || 0;
	let y = options?.y || 0;

	ctx.beginPath();

	ctx.rect(centerX + x, centerY + y, width, height);

	if (options?.color) {
		ctx.fillStyle = options?.color || 'rgb(0,0,0)';
		ctx.fill();
	}

	if (options?.strokeColor || (!options?.color && !options?.strokeColor)) {
		ctx.strokeStyle = options?.strokeColor || 'rgb(255,255,255)';
		ctx.lineWidth = options?.thick || 5;
		ctx.rect(centerX + x, centerY + y, width, height);
		ctx.stroke();
	}

	ctx.closePath();
};

export const drawCircle = (
	radius: number,
	ctx: CanvasRenderingContext2D,
	canvasWidth: number,
	canvasHeight: number,
	options?: {
		x?: number;
		y?: number;
		thick?: number;
		color?: string;
		strokeColor?: string;
	}
) => {
	ctx.beginPath();

	let startAngle = 0;
	let endAngle = 2 * Math.PI;

	let centerX = canvasWidth / 2;
	let centerY = canvasHeight / 2;
	let x = options?.x || 0;
	let y = options?.y || 0;

	ctx.arc(centerX + x, centerY + y, radius, startAngle, endAngle);

	if (options?.color) {
		ctx.fillStyle = options?.color || 'rgb(0,0,0)';
		ctx.fill();
	}

	if (options?.strokeColor || (!options?.color && !options?.strokeColor)) {
		ctx.lineWidth = options?.thick || 5;
		ctx.strokeStyle = options?.strokeColor || 'rgb(0,0,0)';
		ctx.stroke();
	}

	ctx.closePath();
};

export const renderShape = (
	shape: Shape,
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number
) => {
	switch (shape.type) {
		case 'Line':
			drawLine(
				shape.initialPoint.x,
				shape.initialPoint.y,
				shape.endPoint.x,
				shape.endPoint.y,
				ctx,
				width,
				height,
				{
					thick: shape.options?.thick,
					lineCap: shape.options?.lineCap,
					color: shape.options?.color
				}
			);
			break;

		case 'Rect':
			drawRect(shape.width, shape.height, ctx, width, height, {
				x: shape.centerPoint?.x,
				y: shape.centerPoint?.y,
				color: shape.options?.color,
				strokeColor: shape.options?.strokeColor,
				thick: shape.options?.thick
			});
			break;

		case 'Circle':
			drawCircle(shape.radius, ctx, width, height, {
				x: shape.centerPoint?.x,
				y: shape.centerPoint?.y,
				color: shape.options?.color,
				strokeColor: shape.options?.strokeColor,
				thick: shape.options?.thick
			});
			break;

		default:
			console.log('Invalid shape');
	}
};
