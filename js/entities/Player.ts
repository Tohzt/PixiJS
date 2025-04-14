import * as PIXI from 'pixi.js';
import { Settings } from '../Settings';

export class Player extends PIXI.Sprite {
	private app: PIXI.Application;
	public isCenterScreen: boolean = false;
	private currentLane: number = 0;

	constructor(texture: PIXI.Texture, app: PIXI.Application) {
		super(texture);
		console.log('Player constructor called');
		this.app = app;
		this.anchor.set(0.5);
		this.x = Settings.getInstance().lane_width / 2; // Start in middle of first lane
		this.y = app.screen.height / 2;
		this.width = 50;
		this.height = 50;
		console.log('Player initialized at position:', this.x, this.y);

		// Add keyboard event listeners
		window.addEventListener('keydown', this.handleKeyDown.bind(this));
	}

	private handleKeyDown(event: KeyboardEvent): void {
		switch (event.key.toLowerCase()) {
			case 'a':
				this.move_left();
				break;
			case 'd':
				this.move_right();
				break;
		}
	}

	public move_right(): void {
		if (this.currentLane < Settings.getInstance().lane_count - 1) {
			this.currentLane++;
			this.x =
				this.currentLane * Settings.getInstance().lane_width +
				Settings.getInstance().lane_width / 2;
			console.log('Player moved right to lane', this.currentLane, 'at position', this.x);
		}
	}

	public move_left(): void {
		if (this.currentLane > 0) {
			this.currentLane--;
			this.x =
				this.currentLane * Settings.getInstance().lane_width +
				Settings.getInstance().lane_width / 2;
			console.log('Player moved left to lane', this.currentLane, 'at position', this.x);
		}
	}

	public update(): void {
		// Check if player is in the center of the screen
		const halfScreenWidth = this.app.screen.width / 2;
		this.isCenterScreen = this.x >= halfScreenWidth;

		// If Settings.lane_current changed, update our position
		if (this.currentLane !== Settings.getInstance().lane_current) {
			this.currentLane = Settings.getInstance().lane_current;
			this.x =
				this.currentLane * Settings.getInstance().lane_width +
				Settings.getInstance().lane_width / 2;
			console.log('Player position updated to lane', this.currentLane, 'at position', this.x);
		}
	}
}
