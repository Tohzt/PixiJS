<script setup lang="ts">
import { useMainStore } from '../store';
import { computed, ref } from 'vue';

const store = useMainStore();
const lastValue = ref(0.0);

const handleInput = (event: Event) => {
	const input = event.target as HTMLInputElement;
	const newValue = parseFloat(input.value) || 0.0;

	store.setBetValue(newValue);

	lastValue.value = store.betValue;
};

const displayValue = computed(() => {
	return store.betValue.toFixed(1);
});
</script>

<template>
	<div class="input-bet">
		<input
			type="number"
			:value="displayValue"
			@input="handleInput"
			min="0.0"
			step="1.0"
			placeholder="Enter bet amount" />
		<button @click="store.resetBetValue" class="reset-button">×</button>
	</div>
</template>

<style scoped>
.input-bet {
	display: flex;
	align-items: center;
	gap: 8px;
}

input {
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	width: 120px;
}

.reset-button {
	background: none;
	border: none;
	font-size: 24px;
	cursor: pointer;
	color: #666;
	padding: 0;
	line-height: 1;
}

.reset-button:hover {
	color: #333;
}
</style>
