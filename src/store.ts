import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Application } from 'pixi.js';

export const useMainStore = defineStore('main', () => {
	const app = ref<Application | null>(null);
	const isGameActive = ref(false);
	const isAuto = ref(false);
	// betValue can be any number (int or float)
	const betValue = ref<number>(0);

	const setApp = (newApp: Application) => {
		app.value = newApp;
	};

	const getApp = () => app.value;

	const setGameActive = (active: boolean) => {
		isGameActive.value = active;
	};

	const getGameActive = () => isGameActive.value;

	const setBetValue = (value: number) => {
		betValue.value = value;
	};

	const resetBetValue = () => {
		betValue.value = 0;
	};

	const toggleAuto = () => {
		isAuto.value = !isAuto.value;
	};

	return {
		app,
		isGameActive,
		betValue,
		isAuto,
		setApp,
		getApp,
		setGameActive,
		getGameActive,
		setBetValue,
		resetBetValue,
		toggleAuto
	};
});
