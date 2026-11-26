<script lang="ts">
	interface Props {
		title: string;
		description: string;
		image: string;
		href?: string;
	}

	let { title, description, image, href }: Props = $props();
</script>

<article class="card" class:locked={!href}>
	<img src={image} width="240" height="150" alt="" />
	<h3>
		{#if href}
			<a {href}>{title}</a>
		{:else}
			{title}
		{/if}
	</h3>
	<p>{description}</p>
</article>

<style>
	.card {
		position: relative;
		height: 100%;
		transition: transform 0.15s, box-shadow 0.15s;
	}

	.card:not(.locked):hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 18px rgb(26 23 38 / 0.08);
	}

	a::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: var(--radius);
	}

	img {
		width: 100%;
		border-radius: calc(var(--radius) / 2);
		aspect-ratio: 8 / 5;
		object-fit: cover;
	}

	h3 {
		margin-top: var(--space-2);
	}

	p {
		margin: 0;
		color: var(--color-text-muted);
	}

	.locked {
		border-style: dashed;
		background-color: transparent;
	}
</style>
