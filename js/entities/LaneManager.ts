import * as PIXI from 'pixi.js';
import { Settings } from '../Settings';
import { LaneButton } from './LaneButton';

export class LaneManager {
	private lanes: PIXI.Graphics[] = [];
	private laneWidth: number;
	private app: PIXI.Application;
	private buttons: LaneButton[] = [];
	private container: PIXI.Container;

	constructor(app: PIXI.Application, container: PIXI.Container) {
		this.app = app;
		this.container = container;
		this.laneWidth = this.app.screen.width / Settings.getInstance().visible_lanes;
		Settings.getInstance().setLaneWidth(this.laneWidth);
		Settings.getInstance().reset();
		this.createLanes();
	}

	private createLanes(): void {
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
				const button = new LaneButton(i);
				const buttonSize = 50;
				button.setPosition(
					(this.laneWidth - buttonSize) / 2,
					this.app.screen.height / 2 + buttonSize
				);
				lane.addChild(button);
				this.buttons.push(button);
			}

			this.lanes.push(lane);
			this.container.addChild(lane);
		}
	}
}
