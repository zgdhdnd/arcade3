<script lang="ts">
	import type { Clue } from '#lib/crossword/puzzle.js';

	interface Props {
		id: string;
		heading: string;
		clues: Clue[];
	}

	let { id, heading, clues }: Props = $props();
</script>

<section aria-labelledby={id}>
	<h3 {id}>{heading}</h3>
	<ol>
		{#each clues as clue (clue.number)}
			<li value={clue.number}>
				{#each clue.text.split('`') as part, i}{#if i % 2 === 1}<code>{part}</code>{:else}{part}{/if}{/each}
			</li>
		{/each}
	</ol>
</section>

<style>
	ol {
		padding-left: var(--space-4);
	}

	li::marker {
		color: var(--color-accent);
		font-weight: 700;
	}
</style>
