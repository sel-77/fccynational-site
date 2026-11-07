import { describe, expect, it } from 'vitest';
import { isCurrent } from '../../src/data/navigation';

describe('isCurrent', () => {
	it('matches the exact page', () => {
		expect(isCurrent('/about', '/about')).toBe(true);
	});

	it('ignores a trailing slash', () => {
		expect(isCurrent('/about', '/about/')).toBe(true);
	});

	it('matches pages inside a section', () => {
		expect(isCurrent('/chapters', '/chapters/manila')).toBe(true);
	});

	it('does not match a page that only starts with the same letters', () => {
		expect(isCurrent('/about', '/about-us')).toBe(false);
	});

	it('matches home only on the home page', () => {
		expect(isCurrent('/', '/')).toBe(true);
		expect(isCurrent('/', '/about')).toBe(false);
	});
});
