// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	env: {
		schema: {
			// Set as a build variable on each Cloudflare Worker. Anything but "production" shows the environment badge.
			SITE_ENV: envField.enum({
				context: 'client',
				access: 'public',
				values: ['development', 'staging', 'production'],
				default: 'development',
			}),
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
