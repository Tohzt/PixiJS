<script setup lang="ts">
import { computed } from 'vue';
import { useMainStore } from '../store';

const store = useMainStore();
const isPlaying = computed(() => store.isGameActive);
const buttonText = computed(() => {
	if (isPlaying.value) return 'GAME IN PROGRESS';
	return store.betValue === 0 ? 'PRACTICE BET' : 'PLACE BET';
});

const handleBetClick = () => {
	store.setGameActive(true);
};
</script>

<template>
	<button
		class="place-bet-button"
		:class="{ playing: isPlaying }"
		:disabled="isPlaying"
		@click="handleBetClick">
		{{ buttonText }}
	</button>
</template>

<style scoped>
.place-bet-button {
	width: 100%;
	padding: 15px 30px;
	font-size: 1.2em;
	font-weight: bold;
	text-transform: uppercase;
	border: none;
	border-radius: 25px;
	cursor: pointer;
	background: linear-gradient(to bottom, #7ed957, #4caf50);
	color: white;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	transition: all 0.3s ease;
}

.place-bet-button:not(:disabled):hover {
	transform: translateY(-2px);
	box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.place-bet-button:not(:disabled):active {
	transform: translateY(1px);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.place-bet-button.playing {
	background: linear-gradient(to bottom, #5c9944, #3d8b40);
	cursor: not-allowed;
	opacity: 0.9;
}
</style>
