import * as PIXI from "pixi.js";
import { Player } from "./entities/Player";
import { LaneManager } from "./entities/LaneManager";

// Create the application
const app: PIXI.Application = new PIXI.Application({
	width: 800,
	height: 600,
	backgroundColor: 0x1099bb,
	resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view as unknown as Node);

// Create lanes
const laneManager = new LaneManager(app);

// Create player
const playerTexture: PIXI.Texture = PIXI.Texture.from(
	"https://pixijs.com/assets/bunny.png"
);
const player: Player = new Player(playerTexture);
player.x = laneManager.getLaneCenterX(0);
player.y = app.screen.height / 2;
app.stage.addChild(player);

// Set up button click handlers
const buttons = laneManager.getButtons();
buttons.forEach((button, index) => {
	const laneIndex = index + 1;
	button.on("pointerdown", () => {
		// Check if this is the next valid lane before moving
		if (laneIndex === player.getCurrentLane() + 1) {
			player.moveToLane(laneManager.getLaneCenterX(laneIndex), laneIndex);
			laneManager.removeButton(button);
		}
	});
});

// Game loop
app.ticker.add(() => {
	player.update();
});
