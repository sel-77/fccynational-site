import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';
import BaseLayout from '../../src/layouts/BaseLayout.astro';

describe('BaseLayout', () => {
	let container: AstroContainer;

	beforeAll(async () => {
		container = await AstroContainer.create();
	});

	const render = (props: Record<string, unknown> = {}, path = '/') =>
		container.renderToString(BaseLayout, {
			props,
			slots: { default: '<p>Page content</p>' },
			request: new Request(`http://localhost${path}`),
		});

	it('uses the site name as the title on the home page', async () => {
		expect(await render()).toContain('<title>FCCY National</title>');
	});

	it('puts the page name before the site name', async () => {
		expect(await render({ title: 'About' })).toContain('<title>About | FCCY National</title>');
	});

	it('renders the page content inside <main>', async () => {
		expect(await render()).toMatch(/<main id="main"[^>]*>\s*<p>Page content<\/p>/);
	});

	it('has a skip link to the main content', async () => {
		expect(await render()).toContain('href="#main"');
	});

	it('marks the current page in the navigation', async () => {
		const html = await render({ title: 'About' }, '/about');
		expect(html).toMatch(/href="\/about"[^>]*aria-current="page"/);
	});

	it('shows the current year in the footer', async () => {
		expect(await render()).toContain(`© ${new Date().getFullYear()} FCCY National`);
	});
});
