import * as PIXI from 'pixi.js';
import { Settings } from '../Settings';

export class Player extends PIXI.Sprite {
	private currentLane: number = 0;
	private targetX: number = 0;
	private moveSpeed: number = 0.1;
	private readonly POSITION_THRESHOLD: number = 1;

	constructor(texture: PIXI.Texture, app: PIXI.Application) {
		super(texture);
		this.anchor.set(0.5);
		// Start in the middle of the first lane
		this.x = Settings.getInstance().getLaneWidth() / 2;
		this.targetX = this.x;
		// Set the initial position in Settings
		Settings.getInstance().setTargetPosition(this.x);
		this.y = app.screen.height / 2;
		this.width = 50;
		this.height = 50;
	}

	private getLaneWidth(): number {
		return Settings.getInstance().getLaneWidth();
	}

	public move(): void {
		if (this.currentLane < Settings.getInstance().lane_count - 1) {
			this.currentLane++;
			// Calculate target position based on lane width, adding half lane width for center
			this.targetX = this.currentLane * this.getLaneWidth() + this.getLaneWidth() / 2;
			Settings.getInstance().setTargetPosition(this.targetX);
		}
	}

	private hasReachedTarget(): boolean {
		return Math.abs(this.x - this.targetX) < this.POSITION_THRESHOLD;
	}

	public update(): void {
		// Update target position from Settings
		this.targetX = Settings.getInstance().getLaneCurrentPosition();

		// Smoothly move towards target position
		this.x += (this.targetX - this.x) * this.moveSpeed;

		// After moving, check if we've reached the second-to-last lane and our target
		if (this.currentLane === Settings.getInstance().lane_count - 2 && this.hasReachedTarget()) {
			this.currentLane = Settings.getInstance().lane_count - 1;
			Settings.getInstance().lane_current = this.currentLane;
			this.targetX = this.currentLane * this.getLaneWidth() + this.getLaneWidth() / 2;
			Settings.getInstance().setTargetPosition(this.targetX);
		}
	}
}
