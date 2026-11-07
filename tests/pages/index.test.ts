import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';
import Index from '../../src/pages/index.astro';

describe('home page', () => {
	let html: string;

	beforeAll(async () => {
		const container = await AstroContainer.create();
		html = await container.renderToString(Index);
	});

	it('renders an h1 heading', () => {
		// Match <h1> with or without attributes, so adding a class doesn't break the test.
		expect(html).toMatch(/<h1[\s>]/);
	});

	it('renders the Starwind button as plain HTML', () => {
		expect(html).toContain('data-slot="button"');
	});

	it('loads the brand fonts (Inter and Cinzel)', () => {
		expect(html).toContain('--font-inter');
		expect(html).toContain('--font-cinzel');
	});

	it('uses the FCCY seal as the favicon', () => {
		expect(html).toMatch(/<link rel="icon"[^>]+fccy-logo/);
	});

	it('ships no client-side JavaScript', () => {
		expect(html).not.toContain('<script');
	});
});
