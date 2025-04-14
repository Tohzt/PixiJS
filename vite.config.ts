import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
	plugins: [vue()],
	server: {
		port: 3000,
		host: "localhost",
		strictPort: true,
		hmr: {
			protocol: "ws",
			host: "localhost",
		},
	},
	esbuild: {
		supported: {
			"top-level-await": true,
		},
	},
});
