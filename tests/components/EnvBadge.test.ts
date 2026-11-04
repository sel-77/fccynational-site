import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { afterEach, describe, expect, it, vi } from 'vitest';

async function renderWithEnv(siteEnv: string) {
	vi.doMock('astro:env/client', () => ({ SITE_ENV: siteEnv }));
	const { default: EnvBadge } = await import('../../src/components/EnvBadge.astro');
	const container = await AstroContainer.create();
	return container.renderToString(EnvBadge);
}

describe('EnvBadge', () => {
	afterEach(() => {
		vi.doUnmock('astro:env/client');
		vi.resetModules();
	});

	it('shows STAGING on staging', async () => {
		expect(await renderWithEnv('staging')).toContain('STAGING');
	});

	it('shows DEVELOPMENT locally', async () => {
		expect(await renderWithEnv('development')).toContain('DEVELOPMENT');
	});

	it('renders nothing on production', async () => {
		expect(await renderWithEnv('production')).not.toContain('env-badge');
	});
});
