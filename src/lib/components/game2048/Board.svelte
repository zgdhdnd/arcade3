<script lang="ts">
	import { scale } from 'svelte/transition';
	import type { Snippet } from 'svelte';
	import type { Direction } from '@jakechen/arcade-core';
	import type { Tile } from '#lib/game/game2048.svelte.js';

	interface Props {
		tiles: Tile[];
		onswipe: (direction: Direction) => void;
		children: Snippet;
	}

	let { tiles, onswipe, children }: Props = $props();

	let startX = 0;
	let startY = 0;

	function pointerDown(event: PointerEvent) {
		startX = event.clientX;
		startY = event.clientY;
	}

	function pointerUp(event: PointerEvent) {
		const dx = event.clientX - startX;
		const dy = event.clientY - startY;
		if (Math.max(Math.abs(dx), Math.abs(dy)) < 30) return;

		if (Math.abs(dx) > Math.abs(dy)) {
			onswipe(dx > 0 ? 'right' : 'left');
		} else {
			onswipe(dy > 0 ? 'down' : 'up');
		}
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="board" onpointerdown={pointerDown} onpointerup={pointerUp}>
	<div class="grid" aria-hidden="true">
		{#each { length: 16 }}
			<div class="cell"></div>
		{/each}
	</div>

	<ul class="tiles" aria-label="Tiles on the board">
		{#each tiles as tile (tile.id)}
			<li
				class="tile"
				style:--row={tile.row}
				style:--col={tile.col}
				aria-label="{tile.value} at row {tile.row + 1}, column {tile.col + 1}"
			>
				{#key tile.value}
					<span
						class="face"
						class:light={tile.value >= 64}
						style:background-color="var(--tile-{tile.value <= 2048 ? tile.value : 'super'})"
						style:--digits={String(tile.value).length}
						in:scale={{ start: 0.5, duration: 160 }}
					>
						{tile.value}
					</span>
				{/key}
			</li>
		{/each}
	</ul>

	{@render children()}
</div>

<style>
	.board {
		--gap: 0.5rem;
		position: relative;
		aspect-ratio: 1;
		border-radius: var(--radius);
		background-color: var(--color-border);
		container-type: inline-size;
		touch-action: none;
		user-select: none;
	}

	.grid,
	.tiles {
		position: absolute;
		inset: var(--gap);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--gap);
	}

	.cell {
		border-radius: var(--space-2);
		background-color: rgb(255 255 255 / 0.55);
	}

	.tile {
		position: absolute;
		width: calc((100% - 3 * var(--gap)) / 4);
		aspect-ratio: 1;
		transform: translate(
			calc(var(--col) * (100% + var(--gap))),
			calc(var(--row) * (100% + var(--gap)))
		);
		transition: transform 110ms ease-in-out;
	}

	.face {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		border-radius: var(--space-2);
		color: var(--color-text);
		font-family: var(--font-display);
		font-weight: 700;
		font-size: calc(30cqi / (var(--digits) + 1.2));
	}

	.light {
		color: #ffffff;
	}
</style>
