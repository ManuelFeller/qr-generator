import { resolve } from 'path';
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
	plugins: [
		viteSingleFile(),
		handlebars({
      partialDirectory: resolve(__dirname, 'fragments'),
    }),
	],
})