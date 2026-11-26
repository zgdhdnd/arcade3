<script lang="ts">
	import '../app.css';
	import SiteHeader from '#lib/components/layout/SiteHeader.svelte';
	import SiteFooter from '#lib/components/layout/SiteFooter.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<a class="skip-link" href="#main">Skip to content</a>
<SiteHeader />
<main id="main" class="container" tabindex="-1">
	{@render children()}
</main>
<SiteFooter />

<style>
	.skip-link {
		position: absolute;
		top: var(--space-2);
		left: var(--space-2);
		z-index: 20;
		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius);
		background-color: var(--color-accent);
		color: #ffffff;
		font-weight: 700;
		transform: translateY(-200%);
	}

	.skip-link:focus {
		transform: none;
	}

	main:focus {
		outline: none;
	}
</style>
