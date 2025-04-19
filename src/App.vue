<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import * as PIXI from 'pixi.js';
import { initGame } from '../js/game';
import { useMainStore } from './store';

import ToggleManualAuto from './vue components/toggleManualAuto.vue';
import PlaceBet from './vue components/placeBet.vue';
import InputBet from './vue components/inputBet.vue';
import ResetButton from './vue components/resetButton.vue';

const store = useMainStore();

onMounted(() => {
	const app = initGame();
	store.setApp(app);
});

onUnmounted(() => {
	const app = store.getApp();
	if (app) app.destroy(true);
});
</script>

<template>
	<div class="game-wrapper">
		<div id="input-container">
			<ToggleManualAuto />
			<PlaceBet />
			<InputBet />
			<ResetButton />
		</div>
		<div id="game-container"></div>
	</div>
</template>
