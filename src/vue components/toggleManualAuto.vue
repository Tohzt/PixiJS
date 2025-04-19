<template>
	<div
		class="toggle-container"
		:class="{ 'auto-active': store.isAuto, disabled: isGameActive }"
		@click="handleToggle">
		<div class="option manual" :class="{ active: !store.isAuto }">MANUAL</div>
		<div class="option auto" :class="{ active: store.isAuto }">AUTO</div>
		<div class="slider" :class="{ 'slide-right': store.isAuto }"></div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMainStore } from '../store';

const store = useMainStore();
const isGameActive = computed(() => store.isGameActive);

const handleToggle = () => {
	if (!isGameActive.value) {
		store.toggleAuto();
	}
};
</script>

<style scoped>
.toggle-container {
	position: relative;
	width: 300px;
	height: 50px;
	background-color: #1a1a1a;
	border-radius: 25px;
	cursor: pointer;
	display: flex;
	overflow: hidden;
}

.option {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-weight: bold;
	font-size: 1.2em;
	z-index: 1;
	transition: color 0.3s ease;
	user-select: none;
	pointer-events: none;
}

.slider {
	position: absolute;
	width: 50%;
	height: 100%;
	background-color: #ffa500;
	border-radius: 25px;
	transition: transform 0.3s ease;
}

.slider.slide-right {
	transform: translateX(100%);
	background-color: #4caf50;
}

.option.active {
	color: white;
}

.option.manual {
	color: rgba(255, 255, 255, 0.7);
}

.option.auto {
	color: rgba(255, 255, 255, 0.7);
}

.manual.active {
	color: white;
}

.auto.active {
	color: white;
}

.toggle-container.disabled {
	opacity: 0.6;
	cursor: not-allowed;
}
</style>
