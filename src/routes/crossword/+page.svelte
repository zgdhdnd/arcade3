<script lang="ts">
	import CrosswordGrid from '#lib/components/crossword/CrosswordGrid.svelte';
	import ClueList from '#lib/components/crossword/ClueList.svelte';
	import RevealSolution from '#lib/components/crossword/RevealSolution.svelte';
	import { across, cells, down, size } from '#lib/crossword/puzzle.js';
</script>

<svelte:head>
	<title>Jake Chen · Crossword</title>
</svelte:head>

<p class="eyebrow">Game 1 · Mini crossword</p>
<h1>Dev Mini</h1>
<p class="lead">
	Five by five, mostly about the web. Tap a square and type. Tab moves forward, Shift + Tab goes
	back.
</p>

<section class="puzzle" aria-labelledby="puzzle-heading">
	<h2 id="puzzle-heading" class="visually-hidden">Puzzle</h2>

	<CrosswordGrid {cells} {size} />

	<div class="clues">
		<ClueList id="across-heading" heading="Across" clues={across} />
		<ClueList id="down-heading" heading="Down" clues={down} />
		<RevealSolution {across} {down} />
	</div>
</section>

<style>
	.puzzle {
		display: grid;
		gap: var(--space-5);
		align-items: start;
	}

	@media (min-width: 52rem) {
		.puzzle {
			grid-template-columns: auto 1fr;
		}
	}
</style>
