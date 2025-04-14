export class Settings {
	private static instance: Settings;
	public lane_width: number;
	public lane_current: number;
	public lane_count: number = 10;
	public visible_lanes: number = 5;

	private constructor() {
		// Calculate lane width based on screen width and visible lanes
		this.lane_width = 800 / this.visible_lanes; // Using fixed width of 800 to match app width
		this.lane_current = 0;
		console.log(`Lane width: ${this.lane_width}`);
	}

	public static getInstance(): Settings {
		if (!Settings.instance) {
			Settings.instance = new Settings();
		}
		return Settings.instance;
	}

	public getTotalWidth(): number {
		const totalWidth = this.lane_count * this.lane_width;
		console.log(`Total game width: ${totalWidth}`);
		return totalWidth;
	}
}
