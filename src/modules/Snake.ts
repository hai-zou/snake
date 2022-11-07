// 定义一个蛇的类
export default class Snake {
	// 蛇容器
	element: HTMLElement;
	// 蛇头
	head: HTMLElement;
	// 蛇身体
	bodies: HTMLCollection;

	constructor() {
		this.element = document.getElementById('snake')!;
		this.head = document.querySelector('#snake > div') as HTMLElement;
		this.bodies = this.element.getElementsByTagName('div');
	}

	// 获取蛇头坐标
	get X() {
		return this.head.offsetLeft;
	}
	get Y() {
		return this.head.offsetTop;
	}

	// 设置蛇头的坐标
	set X(val: number) {
		if (this.X === val) return;
		if (val < 0 || val > 290) {
			throw new Error('蛇撞墙了!');
		}
		if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === val) {
			if (val > this.X) {
				val = this.X - 10;
			} else {
				val = this.X + 10;
			}
		}
		this.moveBody();
		this.head.style.left = val + 'px';
		this.isEatSelf();
	}
	set Y(val: number) {
		if (this.Y === val) return;
		if (val < 0 || val > 290) {
			throw new Error('蛇撞墙了!');
		}
		if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === val) {
			if (val > this.Y) {
				val = this.Y - 10;
			} else {
				val = this.Y + 10;
			}
		}
		this.moveBody();
		this.head.style.top = val + 'px';
		this.isEatSelf();
	}

	// 蛇吃食物
	eatFood() {
		this.element.insertAdjacentHTML('beforeend', '<div></div>');
	}

	// 移动身体
	moveBody() {
		for (let i = this.bodies.length - 1; i > 0; i--) {
			const X = (this.bodies[i-1] as HTMLElement).offsetLeft;
			const Y = (this.bodies[i-1] as HTMLElement).offsetTop;

			(this.bodies[i] as HTMLElement).style.left = X + 'px';
			(this.bodies[i] as HTMLElement).style.top = Y + 'px';
		}
	}

	// 检查是否撞到自己
	isEatSelf() {
		for (let i = 1; i < this.bodies.length; i++) {
			const bodyItem = this.bodies[i] as HTMLElement;
			if (this.X === bodyItem.offsetLeft && this.Y === bodyItem.offsetTop) {
				throw new Error('撞到自己了!');
			}
		}
	}
}