<script lang="ts">
	import type { Clue } from '#lib/crossword/puzzle.js';

	let { across, down }: { across: Clue[]; down: Clue[] } = $props();

	const list = (clues: Clue[]) => clues.map((clue) => `${clue.number} ${clue.answer}`).join(' · ');
</script>

<details class="reveal">
	<summary>Reveal the solution</summary>
	<h4>Across</h4>
	<p>{list(across)}</p>
	<h4>Down</h4>
	<p>{list(down)}</p>
</details>

<style>
	.reveal {
		padding: var(--space-3);
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background-color: var(--color-surface);
	}

	summary {
		display: flex;
		align-items: center;
		min-height: var(--tap);
		color: var(--color-accent);
		font-family: var(--font-display);
		font-weight: 700;
		cursor: pointer;
	}

	summary::before {
		content: '▸';
		margin-right: var(--space-2);
		transition: transform 0.15s;
	}

	details[open] summary::before {
		transform: rotate(90deg);
	}
</style>
