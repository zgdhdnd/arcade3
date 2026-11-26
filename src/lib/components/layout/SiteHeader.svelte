<script lang="ts">
	import { page } from '$app/state';
	import { asset, resolve } from '$app/paths';

	const links = [
		{ route: '/', label: 'Home' },
		{ route: '/crossword', label: 'Crossword' },
		{ route: '/2048', label: '2048' },
		{ route: '/about', label: 'About' },
		{ route: '/contact', label: 'Contact' }
	] as const;
</script>

<header class="site-header">
	<a class="brand" href={resolve('/')}>
		<img src={asset('images/favicon.svg')} width="32" height="32" alt="" />
		Jake Chen's Arcade
	</a>
	<nav class="site-nav" aria-label="Main">
		<ul class="nav-list">
			{#each links as link (link.route)}
				<li>
					<a
						class="nav-link"
						href={resolve(link.route)}
						aria-current={page.route.id === link.route ? 'page' : undefined}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		padding: var(--space-2) var(--space-3);
		border-bottom: 1px solid var(--color-border);
		background-color: var(--color-bg);
	}

	.brand {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		min-height: var(--tap);
		color: var(--color-text);
		font-size: var(--text-lg);
		font-weight: 700;
		text-decoration: none;
	}

	.nav-list {
		display: flex;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.nav-link {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: var(--tap);
		padding: 0 var(--space-3);
		color: var(--color-text-muted);
		text-decoration: none;
		transition: color 0.15s;
	}

	.nav-link:hover,
	.nav-link[aria-current='page'] {
		color: var(--color-accent);
	}

	.nav-link[aria-current='page']::after {
		content: '';
		position: absolute;
		right: var(--space-3);
		bottom: 4px;
		left: var(--space-3);
		height: 3px;
		background-color: var(--color-accent);
	}

	@media (max-width: 48rem) {
		:global(body) {
			padding-bottom: 3.5rem;
		}

		.site-nav {
			position: fixed;
			right: 0;
			bottom: 0;
			left: 0;
			border-top: 1px solid var(--color-border);
			background-color: var(--color-surface);
		}

		.nav-list li {
			flex: 1;
			min-width: 0;
		}

		.nav-link {
			min-height: 3.5rem;
			padding: 0;
			font-size: 0.8rem;
		}

		.nav-link[aria-current='page']::after {
			top: 0;
			bottom: auto;
			left: 25%;
			right: 25%;
		}
	}
</style>
