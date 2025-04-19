import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Application } from 'pixi.js';

export const useMainStore = defineStore('main', () => {
	const app = ref<Application | null>(null);
	const isGameActive = ref(false);
	const betValue = ref(0);
	const isAuto = ref(false);

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
