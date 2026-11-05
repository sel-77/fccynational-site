/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

// getViteConfig loads Astro's settings so tests can import .astro files.
// https://docs.astro.build/en/guides/testing/#vitest
export default getViteConfig({
	test: {
		include: ['tests/**/*.test.ts'],
	},
});
