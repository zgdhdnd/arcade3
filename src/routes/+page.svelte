<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import GameCard from '#lib/components/home/GameCard.svelte';

	const games = [
		{
			title: 'Game 1: Dev Mini',
			description: 'A five-by-five crossword with ten clues about the web and beyond.',
			image: asset('images/crossword-preview.png'),
			href: resolve('/crossword')
		},
		{
			title: 'Game 2: 2048',
			description: 'Slide, merge and chase the 2048 tile. Your best score sticks around.',
			image: asset('images/2048-preview.svg'),
			href: resolve('/2048')
		},
		{
			title: 'Game 3: Coming soon',
			description: 'Insert coin later.',
			image: asset('images/locked.jpg')
		},
		{
			title: 'Game 4: Coming soon',
			description: 'Insert coin later.',
			image: asset('images/locked.jpg')
		}
	];
</script>

<svelte:head>
	<title>Jake Chen · Arcade</title>
</svelte:head>

<section class="hero">
	<div>
		<p class="eyebrow">Welcome to the arcade</p>
		<h1>Hi, I'm Jake. I build small, careful things for the web.</h1>
		<p class="lead">
			This is my corner of the internet: a couple of puzzle games, plus a little about who I am
			and how to reach me.
		</p>
		<p class="hero__buttons">
			<a class="button" href={resolve('/2048')}>Play 2048</a>
			<a class="button button--secondary" href={resolve('/crossword')}>Try the mini crossword</a>
		</p>
	</div>
	<img
		class="hero__art"
		src={asset('images/arcade-cabinet.avif')}
		width="320"
		height="420"
		alt=""
	/>
</section>

<section aria-labelledby="games-heading">
	<h2 id="games-heading">Now playing</h2>
	<p>2 cabinets are plugged in. 2 more coming soon.</p>

	<ul class="card-grid">
		{#each games as game (game.title)}
			<li>
				<GameCard {...game} />
			</li>
		{/each}
	</ul>
</section>

<style>
	.hero {
		display: grid;
		align-items: center;
		gap: var(--space-4);
		margin-bottom: var(--space-5);
	}

	.hero__buttons {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.hero__art {
		justify-self: center;
	}

	@media (min-width: 48rem) {
		.hero {
			grid-template-columns: 2fr 1fr;
		}

		.hero__art {
			width: 100%;
		}
	}
</style>
