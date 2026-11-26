<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		message: string;
		children: Snippet;
	}

	let { title, message, children }: Props = $props();

	function focusButton(node: HTMLElement) {
		node.querySelector('button')?.focus();
	}
</script>

<div class="overlay" transition:fade={{ duration: 200 }} {@attach focusButton}>
	<h2>{title}</h2>
	<p>{message}</p>
	<div class="actions">
		{@render children()}
	</div>
</div>

<style>
	.overlay {
		position: absolute;
		inset: 0;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		border-radius: var(--radius);
		background-color: rgb(247 246 251 / 0.92);
		text-align: center;
	}

	h2 {
		margin: 0;
		font-size: var(--text-xl);
	}

	p {
		margin: 0;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-2);
	}
</style>
