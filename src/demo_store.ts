import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useMainStore = defineStore('main', () => {
	const count = ref(0);
	const name = ref('Pinia Store');
	const items = ref<string[]>([]);

	const doubleCount = computed(() => count.value * 2);
	const itemCount = computed(() => items.value.length);

	function increment() {
		count.value++;
	}

	function decrement() {
		count.value--;
	}

	function addItem(item: string) {
		items.value.push(item);
	}

	function removeItem(index: number) {
		items.value.splice(index, 1);
	}

	function reset() {
		count.value = 0;
		items.value = [];
	}

	return {
		// state
		count,
		name,
		items,
		// getters
		doubleCount,
		itemCount,
		// actions
		increment,
		decrement,
		addItem,
		removeItem,
		reset
	};
});
