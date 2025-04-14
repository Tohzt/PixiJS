import * as PIXI from 'pixi.js';
import { Settings } from '../Settings';

export class LaneManager {
	private lanes: PIXI.Graphics[] = [];
	private laneWidth: number;
	private app: PIXI.Application;
	private buttons: PIXI.Graphics[] = [];
	private container: PIXI.Container;

	constructor(app: PIXI.Application, container: PIXI.Container) {
		this.app = app;
		this.container = container;
		this.laneWidth = Settings.getInstance().lane_width;
		this.createLanes();
	}

	private createLanes(): void {
		// Create a background for the entire game area
		const background = new PIXI.Graphics();
		background.beginFill(0x000000);
		background.drawRect(0, 0, Settings.getInstance().getTotalWidth(), this.app.screen.height);
		background.endFill();
		this.container.addChild(background);

		for (let i = 0; i < Settings.getInstance().lane_count; i++) {
			const lane = new PIXI.Graphics();
			const isGreenLane = i === 0 || i === Settings.getInstance().lane_count - 1;

			// Make lanes very visible with bright colors
			lane.beginFill(isGreenLane ? 0x00ff00 : 0x333333);
			lane.drawRect(0, 0, this.laneWidth, this.app.screen.height);
			lane.endFill();

			// Add lane number text
			const laneText = new PIXI.Text(i.toString(), {
				fill: 0xffffff,
				fontSize: 24,
				fontWeight: 'bold'
			});
			laneText.x = this.laneWidth / 2 - laneText.width / 2;
			laneText.y = 20;
			lane.addChild(laneText);

			// Add white divider line
			if (i < Settings.getInstance().lane_count - 1) {
				lane.lineStyle(4, 0xffffff); // Thicker white lines
				lane.moveTo(this.laneWidth, 0);
				lane.lineTo(this.laneWidth, this.app.screen.height);
			}

			// Position lane
			lane.x = i * this.laneWidth;
			lane.y = 0;

			// Create and position button
			if (i != 0 && i != Settings.getInstance().lane_count - 1) {
				const button = new PIXI.Graphics();
				button.beginFill(0xff0000); // Red button for visibility
				const buttonSize = 40;
				button.drawRect(0, 0, buttonSize, buttonSize);
				button.endFill();
				button.x = (this.laneWidth - buttonSize) / 2;
				button.y = this.app.screen.height / 2 - 100 - buttonSize / 2;
				button.eventMode = 'static';
				button.cursor = 'pointer';

				// Add click handler
				button.on('pointerdown', () => {
					if (i == Settings.getInstance().lane_current + 1) {
						Settings.getInstance().lane_current = i;
						button.destroy();
					}
				});

				lane.addChild(button);
				this.buttons.push(button);
			}

			this.lanes.push(lane);
			this.container.addChild(lane);
		}
	}
}
