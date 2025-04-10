import * as PIXI from "pixi.js";

export class LaneManager {
	private lanes: PIXI.Graphics[] = [];
	private buttons: PIXI.Graphics[] = [];
	private buttonLaneMap: Map<PIXI.Graphics, number> = new Map();
	private laneWidth: number;
	private laneCount: number = 6;
	private app: PIXI.Application;
	private buttonRadius: number;
	private buttonY: number;

	constructor(app: PIXI.Application) {
		this.app = app;
		this.laneWidth = app.screen.width / this.laneCount;
		this.buttonRadius = this.laneWidth * 0.4; // Button size relative to lane width
		this.buttonY = app.screen.height * 0.25; // Position buttons at 1/4 of screen height
		this.createLanes();
		this.createButtons();
	}

	private createLanes(): void {
		for (let i = 0; i < this.laneCount; i++) {
			const lane = new PIXI.Graphics();

			// Set lane color (green for first and last, grey for middle)
			const isGreenLane = i === 0 || i === this.laneCount - 1;
			lane.beginFill(isGreenLane ? 0x00ff00 : 0x808080);

			// Draw lane
			lane.drawRect(
				i * this.laneWidth,
				0,
				this.laneWidth,
				this.app.screen.height
			);
			lane.endFill();

			// Add white divider line (except after last lane)
			if (i < this.laneCount - 1) {
				lane.lineStyle(2, 0xffffff);
				lane.moveTo((i + 1) * this.laneWidth, 0);
				lane.lineTo((i + 1) * this.laneWidth, this.app.screen.height);
			}

			this.lanes.push(lane);
			this.app.stage.addChild(lane);
		}
	}

	private createButtons(): void {
		// Create buttons only for middle lanes (indices 1-4)
		for (let i = 1; i < this.laneCount - 1; i++) {
			const button = new PIXI.Graphics();
			const centerX = this.getLaneCenterX(i);

			// Draw blue circle
			button.beginFill(0x0000ff);
			button.drawCircle(0, 0, this.buttonRadius);
			button.endFill();

			// Position button
			button.x = centerX;
			button.y = this.buttonY;

			// Make button interactive
			button.interactive = true;
			button.cursor = "pointer";

			this.buttons.push(button);
			this.buttonLaneMap.set(button, i); // Store the lane index for each button
			this.app.stage.addChild(button);
		}
	}

	public getLaneCenterX(laneIndex: number): number {
		return laneIndex * this.laneWidth + this.laneWidth / 2;
	}

	public getButtons(): PIXI.Graphics[] {
		return this.buttons;
	}

	public getLaneIndexFromX(x: number): number {
		return Math.floor(x / this.laneWidth);
	}

	public removeButton(button: PIXI.Graphics): void {
		const index = this.buttons.indexOf(button);
		if (index !== -1) {
			this.app.stage.removeChild(button);
			this.buttons.splice(index, 1);
			this.buttonLaneMap.delete(button);
		}
	}
}
