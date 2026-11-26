<script lang="ts">
	import ContactCard from '#lib/components/contact/ContactCard.svelte';

	const channels = [
		{
			channel: 'Email',
			href: 'mailto:jake.chen@arcade.com',
			label: 'jake.chen@arcade.com',
			note: 'Best for anything time-sensitive. I reply within two days.'
		},
		{
			channel: 'GitHub',
			href: 'https://github.com/my_arcade',
			label: 'github.com/my_arcade',
			note: "The code for this site and everything else I'm building."
		},
		{
			channel: 'LinkedIn',
			href: 'https://www.linkedin.com/in/me',
			label: 'linkedin.com/in/me',
			note: 'Experience, education and the occasional update.'
		}
	];

	const reasons = [
		'Internships, part-time roles or research positions',
		'Teaming up on a game, a puzzle or a hardware project',
		'Feedback on this site'
	];
</script>

<svelte:head>
	<title>Jake Chen · Contact</title>
</svelte:head>

<p class="eyebrow">Contact</p>
<h1>Let's talk</h1>
<p class="lead">
	I'm looking for software and web internships for summer 2030, and I'm always happy to chat about
	puzzles and games. Email is the fastest way to reach me.
</p>

<section aria-labelledby="channels-heading">
	<h2 id="channels-heading">Where to find me</h2>
	<ul class="card-grid">
		{#each channels as channel (channel.channel)}
			<ContactCard {...channel} />
		{/each}
	</ul>
</section>

<section class="reasons" aria-labelledby="reasons-heading">
	<h2 id="reasons-heading">Good reasons to reach out</h2>
	<ul>
		{#each reasons as reason (reason)}
			<li>{reason}</li>
		{/each}
	</ul>
</section>

<style>
	.reasons {
		margin-top: var(--space-5);
	}

	.reasons li::marker {
		color: var(--color-accent);
	}
</style>
