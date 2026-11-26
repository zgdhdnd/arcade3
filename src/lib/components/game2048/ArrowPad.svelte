<script lang="ts">
	import type { Direction } from '@jakechen/arcade-core';

	let { onmove }: { onmove: (direction: Direction) => void } = $props();

	const arrows: { direction: Direction; symbol: string }[] = [
		{ direction: 'up', symbol: '↑' },
		{ direction: 'left', symbol: '←' },
		{ direction: 'down', symbol: '↓' },
		{ direction: 'right', symbol: '→' }
	];
</script>

<div class="pad" role="group" aria-label="Move tiles">
	{#each arrows as arrow (arrow.direction)}
		<button
			type="button"
			style:grid-area={arrow.direction}
			aria-label="Move {arrow.direction}"
			onclick={() => onmove(arrow.direction)}
		>
			{arrow.symbol}
		</button>
	{/each}
</div>

<style>
	.pad {
		display: none;
		grid-template-areas:
			'. up .'
			'left down right';
		grid-template-columns: repeat(3, 3.5rem);
		gap: var(--space-2);
		justify-content: center;
	}

	@media (pointer: coarse), (max-width: 40rem) {
		.pad {
			display: grid;
		}
	}

	button {
		height: 3.5rem;
		border: 2px solid var(--color-accent);
		border-radius: var(--radius);
		background-color: var(--color-surface);
		color: var(--color-accent);
		font-size: var(--text-xl);
		cursor: pointer;
	}
</style>
