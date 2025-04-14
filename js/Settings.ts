export class Settings {
	private static instance: Settings;
	public lane_current: number;
	public lane_count: number = 10;
	public visible_lanes: number = 5;
	private lane_width: number = 0;
	private lane_current_position: number = 0;

	private constructor() {
		this.lane_current = 0;
	}

	public static getInstance(): Settings {
		if (!Settings.instance) {
			Settings.instance = new Settings();
		}
		return Settings.instance;
	}

	public reset(): void {
		this.lane_current = 0;
		this.lane_current_position = this.lane_width / 2;
	}

	public getTotalWidth(): number {
		const container = document.getElementById('game-container');
		return container ? container.clientWidth * this.lane_count : 0;
	}

	public setLaneWidth(width: number): void {
		this.lane_width = width;
	}

	public getLaneWidth(): number {
		return this.lane_width;
	}

	public setTargetPosition(position: number): void {
		this.lane_current_position = position;
	}

	public getLaneCurrentPosition(): number {
		return this.lane_current_position;
	}
}
