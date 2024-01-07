export default class Button {
	el: HTMLButtonElement;
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	rot: boolean;
	constructor(
		container: HTMLDivElement,
		options?: {
			x?: number;
			y?: number;
			w?: number;
			h?: number;
			inv?: boolean;
			rot?: boolean;
		}
	) {
		this.el = document.createElement('button');
		this.el.style.position = 'absolute';

		this.width = options?.w;
		this.height = options?.h;
		this.x = options?.x || 0;
		this.y = options?.y || 0;
		this.rot = options?.rot || false;

		this.el.style.left = `calc(50% + ${this.x}px)`;
		this.el.style.top = `calc(50% + ${this.y}px)`;
		this.el.style.transform = 'translate(-50%, -50%)';

		container.appendChild(this.el);
		options?.inv && this.invisible();
	}

	invisible() {
		this.el.style.opacity = '0.0';
	}

	resize(width: number, height: number) {
		this.el.style.height = this.height + 'px' || height + 'px';
		this.el.style.width = this.width + 'px' || width + 'px';

		if (this.rot) {
			if (width > height && height < 500) {
				this.el.style.left = `calc(50% + ${this.y}px)`;
				this.el.style.top = `calc(50% + ${this.x}px)`;
			} else {
				this.el.style.left = `calc(50% + ${this.x}px)`;
				this.el.style.top = `calc(50% + ${this.y}px)`;
			}
		}
	}
}
