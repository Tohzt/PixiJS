import * as PIXI from 'pixi.js';
import { Player } from './entities/Player';
import { LaneManager } from './entities/LaneManager';
import { Camera } from './Camera';
import { Settings } from './Settings';

export function initGame(): PIXI.Application {
	console.log('Initializing game...');

	// Create the application
	const app: PIXI.Application = new PIXI.Application({
		width: 800,
		height: 600,
		backgroundColor: 0x1099bb,
		resolution: window.devicePixelRatio || 1
	});

	const container = document.getElementById('game-container');
	if (!container) {
		throw new Error('Could not find game container element');
	}
	if (!app.view) {
		throw new Error('PIXI Application failed to initialize');
	}

	container.appendChild(app.view as unknown as Node);
	console.log('PIXI application created and view added to container');

	// Create camera
	const camera = new Camera(app);
	console.log('Camera created');

	// Create lanes first (they will be added directly to the stage)
	const laneManager = new LaneManager(app);
	console.log('LaneManager created');

	// Create player and add to stage (on top of lanes)
	const playerTexture: PIXI.Texture = PIXI.Texture.from('https://pixijs.com/assets/bunny.png');
	console.log('Player texture loaded');

	const player = new Player(playerTexture, app);
	player.y = app.screen.height / 2;
	app.stage.addChild(player);
	console.log('Player created and added to stage at position:', player.x, player.y);

	// Set up camera
	camera.setTarget(player);
	camera.setBounds(Settings.getInstance().getTotalWidth());
	console.log('Camera set up with bounds:', Settings.getInstance().getTotalWidth());

	// Add debug text
	const debugText = new PIXI.Text('Debug View', { fill: 0xffffff });
	debugText.x = 10;
	debugText.y = 10;
	app.stage.addChild(debugText);
	console.log('Debug text added');

	// Game loop
	app.ticker.add(() => {
		player.update();
		camera.update();

		// Update debug text
		debugText.text = `Player X: ${player.x.toFixed(2)}\nCamera X: ${camera
			.getContainer()
			.x.toFixed(2)}\nPlayer Lane: ${Settings.getInstance().lane_current}`;
	});
	console.log('Game loop started');

	return app;
}
