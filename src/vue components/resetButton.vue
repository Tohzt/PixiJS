<script setup lang="ts">
import { initGame } from '../../js/game';
import { useMainStore } from '../store';

const store = useMainStore();

const resetGame = () => {
	const currentApp = store.getApp();
	if (currentApp) currentApp.destroy(true);

	const container = document.getElementById('game-container');
	if (container) container.innerHTML = '';

	const newApp = initGame();
	store.setBetValue(0);
	store.setApp(newApp);
	store.setGameActive(false);
};
</script>

<template>
	<div class="reset-button-container">
		<button class="reset-button" @click="resetGame">Reset Game</button>
	</div>
</template>

<style scoped>
.reset-button-container {
	position: relative;
	z-index: 100;
}

.reset-button {
	background: linear-gradient(to bottom, #4a6baf, #2c4a8f);
	border: 2px solid #1a2f5f;
	border-radius: 8px;
	color: white;
	padding: 12px 24px;
	font-family: 'Arial', sans-serif;
	font-size: 16px;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	cursor: pointer;
	transition: all 0.2s ease;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.reset-button:hover {
	background: linear-gradient(to bottom, #5b7cc0, #3d5ba0);
	transform: translateY(-2px);
	box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}

.reset-button:active {
	background: linear-gradient(to bottom, #2c4a8f, #1a2f5f);
	transform: translateY(1px);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
