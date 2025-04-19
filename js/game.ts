import * as PIXI from 'pixi.js';
import { Player } from './entities/Player';
import { LaneManager } from './entities/LaneManager';
import { Camera } from './Camera';
import { Settings } from './Settings';

export function initGame(): PIXI.Application {
	const settings = Settings.getInstance();

	const container = document.getElementById('game-container');
	if (!container) {
		throw new Error('Could not find game container element');
	}

	// Get the actual dimensions of the container
	const containerWidth = container.clientWidth;
	const containerHeight = container.clientHeight;

	const app: PIXI.Application = new PIXI.Application({
		width: containerWidth,
		height: containerHeight,
		backgroundColor: 0x1099bb,
		resolution: window.devicePixelRatio || 1,
		autoDensity: true,
		antialias: true // Enable antialiasing for smoother rendering
	});

	if (!app.view) {
		throw new Error('PIXI Application failed to initialize');
	}

	// Set canvas size to match container
	const canvas = app.view as HTMLCanvasElement;
	canvas.style.width = '100%';
	canvas.style.height = '100%';

	container.appendChild(canvas);

	// Create camera
	const camera = new Camera(app);

	// Create lanes first (they will be added to camera container)
	const laneManager = new LaneManager(app, camera.getContainer());

	// Create player and add to camera container
	const playerTexture: PIXI.Texture = PIXI.Texture.from('https://pixijs.com/assets/bunny.png');

	const player = new Player(playerTexture, app);
	player.y = app.screen.height / 2;
	camera.getContainer().addChild(player);

	// Set up camera
	camera.setTarget(player);
	camera.setBounds(settings.getTotalWidth());

	// Game loop
	app.ticker.add((delta) => {
		player.update();
		camera.update();
		laneManager.update(delta); // Add lane manager update with delta time
	});

	return app;
}
