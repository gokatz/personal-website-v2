import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	renderers: ['@astrojs/renderer-preact'],
	buildOptions: {
		site: 'https://gokatz.me/',
	},
	integrations: [
		mdx()
	]
});
