<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { CrosswordCell } from '#lib/crossword/puzzle.js';

	interface Props {
		cells: CrosswordCell[];
		size: number;
	}

	let { cells, size }: Props = $props();

	let letters: Record<number, string> = $state({});

	const openCells = $derived(cells.filter((cell) => cell.answer));
	const filled = $derived(openCells.filter((cell) => letters[cell.id]).length);
	const solved = $derived(openCells.every((cell) => letters[cell.id] === cell.answer));

	function handleInput(id: number, event: Event & { currentTarget: HTMLInputElement }) {
		const typed = event.currentTarget.value.replace(/[^a-z]/gi, '');
		letters[id] = typed.slice(-1).toUpperCase();
		event.currentTarget.value = letters[id];
	}
</script>

<form class="play" aria-label="Crossword grid" onsubmit={(event) => event.preventDefault()}>
	<div class="board" style:--size={size}>
		{#each cells as cell (cell.id)}
			{#if cell.answer}
				<label class="cell">
					{#if cell.number}
						<span class="cell__num" aria-hidden="true">{cell.number}</span>
					{/if}
					<input
						type="text"
						maxlength="2"
						autocomplete="off"
						autocapitalize="characters"
						spellcheck="false"
						value={letters[cell.id] ?? ''}
						oninput={(event) => handleInput(cell.id, event)}
						aria-label={cell.label}
					/>
				</label>
			{:else}
				<div class="cell cell--block"></div>
			{/if}
		{/each}
	</div>

	<p class="progress">{filled} of {openCells.length} squares filled</p>

	<div class="status" role="status">
		{#if solved}
			<p class="solved" transition:fade><strong>Solved!</strong> Every letter is right.</p>
		{/if}
	</div>

	<button class="button button--secondary" type="button" onclick={() => (letters = {})}>Clear grid</button>
</form>

<style>
	.play {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-3);
	}

	.board {
		--cell: clamp(2.75rem, 16vw, 4rem);
		display: grid;
		grid-template-columns: repeat(var(--size), var(--cell));
		gap: 3px;
		padding: 3px;
		border-radius: var(--radius);
		background-color: var(--color-text);
	}

	.cell {
		position: relative;
		aspect-ratio: 1;
		border-radius: 3px;
		background-color: var(--color-surface);
	}

	.cell--block {
		background-color: transparent;
	}

	input {
		width: 100%;
		height: 100%;
		border: 0;
		border-radius: inherit;
		background-color: transparent;
		color: var(--color-text);
		font-family: var(--font-display);
		font-size: calc(var(--cell) * 0.5);
		font-weight: 700;
		text-align: center;
		text-transform: uppercase;
		transition: background-color 0.15s;
	}

	input:hover {
		background-color: var(--color-bg);
	}

	input:focus {
		background-color: var(--color-accent-soft);
	}

	input:focus-visible {
		outline-offset: -3px;
	}

	.cell__num {
		position: absolute;
		top: 2px;
		left: 4px;
		color: var(--color-text-muted);
		font-size: 0.75rem;
		font-weight: 700;
		line-height: 1;
		pointer-events: none;
	}

	.progress {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}

	.status:empty {
		display: none;
	}

	.solved {
		margin: 0;
		padding: var(--space-2) var(--space-3);
		border: 2px solid var(--color-success);
		border-radius: var(--radius);
		color: var(--color-success);
	}
</style>
