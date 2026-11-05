import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import Index from '../../src/pages/index.astro';

describe('home page', () => {
	it('renders an h1 heading', async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(Index);

		expect(html).toContain('<h1>');
	});
});
