import * as PIXI from 'pixi.js';
import { Settings } from './Settings';

export class Camera {
	private container: PIXI.Container;
	private app: PIXI.Application;
	private target: PIXI.Container | null = null;
	private bounds: { minX: number; maxX: number } = { minX: 0, maxX: 0 };
	private isFollowing: boolean = false;
	private cameraSpeed: number = 10;

	constructor(app: PIXI.Application) {
		this.app = app;
		this.container = new PIXI.Container();
		app.stage.addChild(this.container);

		// Add keyboard event listeners
		window.addEventListener('keydown', this.handleKeyDown.bind(this));
	}

	private handleKeyDown(event: KeyboardEvent): void {
		// Only handle camera movement if we're not following the player
		if (!this.isFollowing) {
			switch (event.key) {
				case 'ArrowLeft':
					this.moveLeft();
					break;
				case 'ArrowRight':
					this.moveRight();
					break;
			}
		}
	}

	private moveLeft(): void {
		const newX = this.container.x + this.cameraSpeed;
		if (newX <= this.bounds.minX) {
			this.container.x = newX;
		}
	}

	private moveRight(): void {
		const newX = this.container.x - this.cameraSpeed;
		if (newX >= this.bounds.maxX) {
			this.container.x = newX;
		}
	}

	public setTarget(target: PIXI.Container): void {
		this.target = target;
	}

	public setBounds(totalWidth: number): void {
		this.bounds = {
			minX: 0,
			maxX: -(totalWidth - this.app.screen.width)
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
			this.container.x = Math.max(this.bounds.maxX, Math.min(this.bounds.minX, desiredX));
		}
	}

	public getContainer(): PIXI.Container {
		return this.container;
	}
}
