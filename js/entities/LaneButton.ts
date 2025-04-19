import * as PIXI from 'pixi.js';
import { Settings } from '../Settings';
import { useMainStore } from '../../src/store';

export class LaneButton extends PIXI.Container {
	private button: PIXI.Graphics;
	private buttonText: PIXI.Text;
	private readonly buttonSize: number = 50;
	public readonly laneIndex: number;
	private store: any;

	constructor(laneIndex: number) {
		super();
		this.laneIndex = laneIndex;
		this.button = new PIXI.Graphics();
		this.buttonText = new PIXI.Text('→', {
			fill: 0xffffff,
			fontSize: 24,
			fontWeight: 'bold'
		});
		this.store = useMainStore();
		this.createButton();
		this.setupInteractivity();
	}

	private createButton(): void {
		// Button background
		this.button.beginFill(0x2c3e50);
		this.button.drawRoundedRect(0, 0, this.buttonSize, this.buttonSize, this.buttonSize / 2);
		this.button.endFill();

		// Button border
		this.button.lineStyle(2, 0x34495e);
		this.button.drawRoundedRect(0, 0, this.buttonSize, this.buttonSize, this.buttonSize / 2);

		// Position text
		this.buttonText.x = this.buttonSize / 2 - this.buttonText.width / 2;
		this.buttonText.y = this.buttonSize / 2 - this.buttonText.height / 2;

		this.addChild(this.button);
		this.addChild(this.buttonText);
	}

	private setupInteractivity(): void {
		this.eventMode = 'static';
		this.cursor = 'pointer';

		// Hover effects
		this.on('pointerover', () => {
			if (this.store.isGameActive) {
				this.button.tint = 0xcccccc;
			}
		});

		this.on('pointerout', () => {
			this.button.tint = 0xffffff;
		});

		// Click handler
		this.on('pointerdown', () => {
			if (this.store.isGameActive && this.laneIndex === Settings.getInstance().lane_current + 1) {
				// Calculate the world position for this lane, adding half lane width for center
				const targetX =
					this.laneIndex * Settings.getInstance().getLaneWidth() +
					Settings.getInstance().getLaneWidth() / 2;
				// Store the target position in Settings
				Settings.getInstance().setTargetPosition(targetX);
				Settings.getInstance().lane_current = this.laneIndex;
				this.destroy();
			}
		});
	}

	public setPosition(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}
}
