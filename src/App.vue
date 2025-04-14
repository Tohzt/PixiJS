<template>
	<div id="game-container"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import * as PIXI from 'pixi.js';
import { initGame } from '../js/game';

let app: PIXI.Application;

onMounted(() => {
	app = initGame();
});

onUnmounted(() => {
	if (app) {
		app.destroy(true);
	}
});
</script>
