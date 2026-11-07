// Links shown in the site header and footer.
// Only list pages that exist in the current release, so visitors never hit a 404.
// v1.1 adds Chapters, v1.2 Activities, v1.3 NDO (see docs/site-plan.md).
export interface NavLink {
	label: string;
	href: string;
}

export const mainNav: NavLink[] = [
	{ label: 'About', href: '/about' },
	{ label: 'Contact', href: '/contact' },
];

/** True when `href` is the current page or a page inside that section (e.g. /chapters/manila under /chapters). */
export function isCurrent(href: string, pathname: string): boolean {
	const path = pathname.replace(/\/+$/, '') || '/';
	if (href === '/') return path === '/';
	return path === href || path.startsWith(`${href}/`);
}
