import * as PIXI from 'pixi.js';
import { Settings } from '../Settings';
import { LaneButton } from './LaneButton';
import { Enemy } from './Enemy';

export class LaneManager {
	private lanes: PIXI.Graphics[] = [];
	private laneWidth: number;
	private app: PIXI.Application;
	private buttons: LaneButton[] = [];
	private container: PIXI.Container;
	private enemies: Enemy[] = [];
	private spawnTimer: number = 0;
	private readonly spawnInterval: number = 0.15;
	private readonly spawnChance: number = 0.7;

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

	public update(deltaTime: number): void {
		// Convert deltaTime from milliseconds to seconds
		const deltaSeconds = deltaTime / 60; // PIXI ticker runs at 60fps

		// Update spawn timer
		this.spawnTimer += deltaSeconds;
		if (this.spawnTimer >= this.spawnInterval) {
			this.spawnTimer = 0;
			this.trySpawnEnemy();
		}

		// Update all enemies
		for (let i = this.enemies.length - 1; i >= 0; i--) {
			const enemy = this.enemies[i];
			enemy.update();

			// Remove destroyed enemies
			if (enemy.destroyed) {
				this.enemies.splice(i, 1);
			}
		}
	}

	private trySpawnEnemy(): void {
		// Only spawn if random chance succeeds
		if (Math.random() > this.spawnChance) {
			return;
		}

		// Get current player lane
		const playerLane = Settings.getInstance().lane_current;

		// Find available lanes (lanes without enemies and not the player's lane)
		const availableLanes = this.buttons.filter((button) => {
			return (
				button.laneIndex !== playerLane &&
				!this.enemies.some((enemy) => enemy.getLaneIndex() === button.laneIndex)
			);
		});

		if (availableLanes.length === 0) {
			return;
		}

		// Pick a random available lane
		const randomIndex = Math.floor(Math.random() * availableLanes.length);
		const targetButton = availableLanes[randomIndex];

		// Create and add the enemy
		const enemy = new Enemy(targetButton.laneIndex, targetButton);
		this.container.addChild(enemy);
		this.enemies.push(enemy);
	}

	public getButtons(): LaneButton[] {
		return this.buttons;
	}
}
