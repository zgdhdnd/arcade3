<script lang="ts">
	import { onMount } from 'svelte';
	import type { Direction } from '@jakechen/arcade-core';
	import { game } from '#lib/game/game2048.svelte.js';
	import Board from '#lib/components/game2048/Board.svelte';
	import ScoreBox from '#lib/components/game2048/ScoreBox.svelte';
	import ArrowPad from '#lib/components/game2048/ArrowPad.svelte';
	import GameOverlay from '#lib/components/game2048/GameOverlay.svelte';
	import SeedForm from '#lib/components/game2048/SeedForm.svelte';

	const keys: Record<string, Direction> = {
		ArrowUp: 'up',
		ArrowDown: 'down',
		ArrowLeft: 'left',
		ArrowRight: 'right'
	};

	onMount(() => game.start());

	function handleKey(event: KeyboardEvent) {
		const direction = keys[event.key];
		if (!direction || event.altKey || event.target instanceof HTMLInputElement) return;

		event.preventDefault();
		game.move(direction);
	}
</script>

<svelte:window onkeydown={handleKey} />

<svelte:head>
	<title>Jake Chen · 2048</title>
</svelte:head>

<p class="eyebrow">Game 2 · Sliding puzzle</p>
<h1>2048</h1>
<p class="lead">
	Use the arrow keys (or swipe) to slide every tile at once. Two equal tiles merge into their sum.
	Reach 2048 to win.
</p>

<div class="game">
	<div class="scores">
		<ScoreBox label="Score" value={game.score} />
		<ScoreBox label="Best" value={game.best} />
	</div>

	<Board tiles={game.tiles} onswipe={(direction) => game.move(direction)}>
		{#if game.showWin}
			<GameOverlay title="You made 2048!" message="Keep going for a bigger tile?">
				<button class="button" type="button" onclick={() => game.continueAfterWin()}>
					Keep playing
				</button>
				<button class="button button--secondary" type="button" onclick={() => game.newGame()}>
					New game
				</button>
			</GameOverlay>
		{:else if game.over}
			<GameOverlay title="Game over" message="No moves left. Final score {game.score}.">
				<button class="button" type="button" onclick={() => game.newGame()}>Try again</button>
			</GameOverlay>
		{/if}
	</Board>

	<ArrowPad onmove={(direction) => game.move(direction)} />

	<button class="button" type="button" onclick={() => game.newGame()}>New game</button>
	<SeedForm seed={game.seed} onplay={(seed) => game.newGame(seed)} />
</div>

<p class="visually-hidden" aria-live="polite">{game.status}</p>

<style>
	.game {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		max-width: 28rem;
		margin: var(--space-4) auto 0;
	}

	.scores {
		display: flex;
		gap: var(--space-2);
	}
</style>
