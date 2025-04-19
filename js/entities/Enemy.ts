import * as PIXI from 'pixi.js';
import { Settings } from '../Settings';
import { LaneButton } from './LaneButton';

export class Enemy extends PIXI.Container {
	private sprite!: PIXI.Graphics;
	private speed: number = 15;
	private laneIndex: number;
	private laneButton: LaneButton | null = null;
	private readonly size: number = 30;

	constructor(laneIndex: number, laneButton: LaneButton) {
		super();
		this.laneIndex = laneIndex;
		this.laneButton = laneButton;
		this.createEnemy();
		this.setupPosition();
	}

	private createEnemy(): void {
		this.sprite = new PIXI.Graphics();
		this.sprite.beginFill(0xff0000); // Red enemy
		this.sprite.drawCircle(0, 0, this.size);
		this.sprite.endFill();
		this.addChild(this.sprite);

		// Disable the lane button when enemy is created
		if (this.laneButton) {
			this.laneButton.eventMode = 'none';
			this.laneButton.alpha = 0.5;
		}
	}

	private setupPosition(): void {
		const laneWidth = Settings.getInstance().getLaneWidth();
		this.x = this.laneIndex * laneWidth + laneWidth / 2;
		this.y = -this.size; // Start above the screen
	}

	public update(): void {
		this.y += this.speed;

		// Check if enemy has reached the bottom of the screen
		const container = document.getElementById('game-container');
		const screenHeight = container ? container.clientHeight : 0;

		if (this.y > screenHeight + this.size) {
			// Re-enable the lane button when enemy is destroyed
			if (this.laneButton) {
				this.laneButton.eventMode = 'static';
				this.laneButton.alpha = 1;
			}
			this.destroy();
		}
	}

	public getLaneIndex(): number {
		return this.laneIndex;
	}
}
