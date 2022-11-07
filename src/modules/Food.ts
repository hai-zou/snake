// 定义 Food 类
export default class Food {
	// 表示food的元素
	element: HTMLElement;

	constructor() {
		// !表示food元素不可能为空
		this.element = document.getElementById('food')!;
	}

	get X() {
		return this.element.offsetLeft;
	}

	get Y() {
		return this.element.offsetTop;
	}

	// 改变位置
	changePosition() {
		// 生成随机数(0 - 290) 一个大小为10
		const left = Math.round(Math.random() * 29) * 10;
		const top = Math.round(Math.random() * 29) * 10;

		this.element.style.left = left + 'px';
		this.element.style.top = top + 'px';
	}
}