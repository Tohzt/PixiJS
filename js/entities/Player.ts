import * as PIXI from "pixi.js";

export class Player extends PIXI.Sprite {
	private speed: number = 5;
	private targetX: number;
	private isMoving: boolean = false;
	private currentLane: number = 0;

	constructor(texture: PIXI.Texture) {
		super(texture);
		this.anchor.set(0.5);
		this.targetX = this.x;
	}

	public moveToLane(laneX: number, laneIndex: number): void {
		// Only allow moving one lane to the right
		if (laneIndex === this.currentLane + 1) {
			this.targetX = laneX;
			this.isMoving = true;
			this.currentLane = laneIndex;
		}
	}

	public update(): void {
		if (this.isMoving) {
			const dx = this.targetX - this.x;
			if (Math.abs(dx) < this.speed) {
				this.x = this.targetX;
				this.isMoving = false;
			} else {
				this.x += Math.sign(dx) * this.speed;
			}
		}
	}

	public getCurrentLane(): number {
		return this.currentLane;
	}
}
