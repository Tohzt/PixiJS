import * as PIXI from 'pixi.js';
import { Settings } from './Settings';

export class Camera {
	private container: PIXI.Container;
	private app: PIXI.Application;
	private target: PIXI.Container | null = null;
	private bounds: { minX: number; maxX: number } = { minX: 0, maxX: 0 };
	private isFollowing: boolean = false;
	private followSpeed: number = 0.1; // Speed for following (0.1 = 10% of distance per frame)
	private targetX: number = 0;
	private zoom: number = 1;
	private minZoom: number = 0.5;
	private maxZoom: number = 2;
	private zoomSpeed: number = 0.1;
	private lane_count: number = 0;
	private visible_lanes: number = 0;

	constructor(app: PIXI.Application) {
		this.app = app;
		this.container = new PIXI.Container();
		app.stage.addChild(this.container);

		// Initialize lane properties
		const settings = Settings.getInstance();
		this.lane_count = settings.lane_count;
		this.visible_lanes = settings.visible_lanes;

		// Add mouse wheel event listener
		if (app.view instanceof HTMLCanvasElement) {
			app.view.addEventListener('wheel', this.handleWheel.bind(this) as EventListener);
		}
	}

	private handleWheel(event: WheelEvent): void {
		event.preventDefault();

		// Calculate zoom direction (negative for zoom out, positive for zoom in)
		const zoomDelta = -event.deltaY * this.zoomSpeed * 0.01;

		// Update zoom level
		this.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.zoom + zoomDelta));

		// Apply zoom to container
		this.container.scale.set(this.zoom);

		// Recalculate bounds when zoom changes
		this.recalculateBounds();
	}

	private recalculateBounds(): void {
		const totalWidth = this.app.screen.width * (this.lane_count / this.visible_lanes);
		const effectiveScreenWidth = this.app.screen.width / this.zoom;
		this.bounds = {
			minX: -(totalWidth - effectiveScreenWidth), // Leftmost position (showing rightmost content)
			maxX: 0 // Rightmost position (showing leftmost content)
		};
	}

	public setTarget(target: PIXI.Container): void {
		this.target = target;
	}

	public setBounds(totalWidth: number): void {
		this.recalculateBounds();
	}

	public update(): void {
		if (!this.target) return;

		const halfScreenWidth = this.app.screen.width / 2;
		const targetRelativeX = this.target.x;

		// Check if player has reached the middle of the screen
		if (!this.isFollowing && targetRelativeX >= halfScreenWidth) {
			this.isFollowing = true;
		}

		// If following, calculate target position to keep player at middle
		if (this.isFollowing) {
			// Calculate desired camera position to keep player centered
			this.targetX = -(targetRelativeX - halfScreenWidth);

			// Clamp target position to game bounds
			this.targetX = Math.max(this.bounds.minX, Math.min(this.bounds.maxX, this.targetX));

			// Smoothly move towards target position
			this.container.x += (this.targetX - this.container.x) * this.followSpeed;
		}
	}

	public getContainer(): PIXI.Container {
		return this.container;
	}
}
