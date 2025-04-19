import { createApp } from 'vue';
import App from './App.vue';
import '../css/styles.css';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(createPinia());
app.mount('#app');
