<template>
	<div class="game-wrapper">
		<button class="reset-button" @click="resetGame">Reset Game</button>
		<div id="game-container"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import * as PIXI from 'pixi.js';
import { initGame } from '../js/game';
import { Settings } from '../js/Settings';

let app: PIXI.Application;

const resetGame = () => {
	if (app) app.destroy(true);

	const container = document.getElementById('game-container');
	if (container) container.innerHTML = '';

	app = initGame();
};

onMounted(() => (app = initGame()));

onUnmounted(() => {
	if (app) app.destroy(true);
});
</script>
