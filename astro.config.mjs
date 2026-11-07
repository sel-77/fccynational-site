// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	// Downloaded from Fontsource at build time and served from our own site (no third-party requests).
	// Both fonts are free under the SIL Open Font License. Used via --font-sans / --font-heading in src/styles/starwind.css.
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'Inter',
			cssVariable: '--font-inter',
			weights: ['100 900'], // variable font: one file covers every weight
			styles: ['normal'],
			fallbacks: ['sans-serif'],
		},
		{
			provider: fontProviders.fontsource(),
			name: 'Cinzel',
			cssVariable: '--font-cinzel',
			weights: ['400 900'],
			styles: ['normal'],
			fallbacks: ['serif'],
		},
	],
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
