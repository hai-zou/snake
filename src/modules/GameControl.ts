import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

// 定义一个游戏控制的类
export default class GameControl {
	snake: Snake;
	food: Food;
	scorePanel: ScorePanel;

	// 键盘按下的方向（不兼容IE）'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'
	direction: string = '';
	isLive: boolean = true;

	constructor() {
		this.snake = new Snake();
		this.food = new Food();
		this.scorePanel = new ScorePanel(10, 1);

		this.init();
	}

	// 游戏初始化
	init() {
		// 监听键盘事件
		document.addEventListener('keydown', this.keydownHandel.bind(this));
		this.run();
	}

	// 键盘按下响应函数
	keydownHandel(event: KeyboardEvent) {
		this.direction = event.key;
	}

	// 蛇移动
	run() {

		let X = this.snake.X;
		let Y = this.snake.Y;

		switch (this.direction) {
			case 'ArrowUp':
				Y -= 10;
				break;
			case 'ArrowDown':
				Y += 10;
				break;
			case 'ArrowLeft':
				X -= 10;
				break;
			case 'ArrowRight':
				X += 10;
				break;
		}

		if (X === this.food.X && Y === this.food.Y) {
			this.snake.eatFood();
			this.scorePanel.addScore();
			this.food.changePosition();
		}

		try {
			this.snake.X = X;
			this.snake.Y = Y;
		} catch(e) {
			alert(e);
			this.isLive = false;
		}
		if (!this.isLive) return;
		setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
	}
}