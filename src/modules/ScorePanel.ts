// 定义记分牌的类
export default class ScorePanel {
	score: number = 0;
	level: number = 1;
	// 最大等级
	maxLevel: number;
	// 多少分升级
	upScore: number;
	scoreEle: HTMLElement;
	levelEle: HTMLElement;

	constructor(maxLevel: number = 10, upScore: number = 10) {
		this.maxLevel = maxLevel;
		this.upScore = upScore;
		this.scoreEle = document.getElementById('score')!;
		this.levelEle = document.getElementById('level')!;
	}

	// 加分
	addScore() {
		this.scoreEle.innerHTML = `${++this.score}`;
		if (this.score % this.upScore === 0) {
			this.levelUp();
		}
	}

	// 升级
	levelUp() {
		if (this.level > this.maxLevel) return;
		this.levelEle.innerHTML = `${++this.level}`;
	}
}