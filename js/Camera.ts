import * as PIXI from 'pixi.js';
import { Settings } from './Settings';

export class Camera {
	private container: PIXI.Container;
	private app: PIXI.Application;
	private target: PIXI.Container | null = null;
	private bounds: { minX: number; maxX: number } = { minX: 0, maxX: 0 };
	private isFollowing: boolean = false;
	private cameraSpeed: number = 20; // Increased speed for more noticeable movement

	constructor(app: PIXI.Application) {
		this.app = app;
		this.container = new PIXI.Container();
		app.stage.addChild(this.container);
	}

	public setTarget(target: PIXI.Container): void {
		this.target = target;
	}

	public setBounds(totalWidth: number): void {
		this.bounds = {
			minX: -(totalWidth - this.app.screen.width), // Leftmost position (showing rightmost content)
			maxX: 0 // Rightmost position (showing leftmost content)
		};
	}

	public update(): void {
		if (!this.target) return;

		const halfScreenWidth = this.app.screen.width / 2;
		const targetRelativeX = this.target.x;

		// Check if player has reached the middle of the screen
		if (!this.isFollowing && targetRelativeX >= halfScreenWidth) {
			this.isFollowing = true;
		}

		// If following, move camera to keep player at middle
		if (this.isFollowing) {
			// Calculate desired camera position to keep player centered
			const desiredX = -(targetRelativeX - halfScreenWidth);

			// Clamp camera to game bounds
			this.container.x = Math.max(this.bounds.minX, Math.min(this.bounds.maxX, desiredX));
		}
	}

	public getContainer(): PIXI.Container {
		return this.container;
	}
}
