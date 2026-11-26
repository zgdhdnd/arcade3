<script lang="ts">
	import { asset } from '$app/paths';
	import TagList from '#lib/components/about/TagList.svelte';

	const coursework = [
		'Web Programming',
		'Data Structures & Algorithms',
		'Digital Circuits',
		'Computer Architecture',
		'Human-Computer Interaction'
	];

	const skills = [
		'HTML',
		'CSS',
		'JavaScript',
		'TypeScript',
		'Svelte',
		'Python',
		'Java',
		'C',
		'SystemVerilog',
		'Git & GitHub',
		'Figma',
		'Linux'
	];
</script>

<svelte:head>
	<title>Jake Chen · About</title>
</svelte:head>

<div class="intro">
	<img
		class="intro__photo"
		src={asset('images/images.jpg')}
		width="160"
		height="160"
		alt="Illustrated portrait of Jake Chen"
	/>
	<div>
		<p class="eyebrow">About</p>
		<h1>About me</h1>
		<p class="lead">
			I'm a computer engineering student who likes working where hardware meets the screen. I care
			about interfaces that feel obvious, code the next person can read, and puzzles of almost every
			kind.
		</p>
	</div>
</div>

<section class="block" aria-labelledby="experience-heading">
	<h2 id="experience-heading">Experience</h2>
	<article>
		<h3>Campus Makerspace</h3>
		<h4>Student Technician</h4>
		<p class="meta">Part-time · September 2030 to present</p>
		<p>
			I help students get their projects off the ground: training people on the laser cutter and 3D
			printers, debugging circuits at the help desk, and keeping the equipment running.
		</p>

		<h5>Selected projects</h5>
		<ul>
			<li>
				<h6>Arcade controller kit</h6>
				A joystick and button panel that plugs into an FPGA board over USB, now used in two intro lab
				sections.
			</li>
			<li>
				<h6>Equipment booking pages</h6>
				Rebuilt the makerspace's sign-up pages so they work on phones and with screen readers.
			</li>
		</ul>
	</article>
</section>

<section class="block" aria-labelledby="education-heading">
	<h2 id="education-heading">Education</h2>
	<article>
		<h3>Northeastern University</h3>
		<h4>M.S. in Computer Science</h4>
		<p class="meta">Expected June 2028</p>
		<h5>Relevant coursework</h5>
		<TagList tags={coursework} />
	</article>
</section>

<section class="block" aria-labelledby="skills-heading">
	<h2 id="skills-heading">Skills</h2>
	<TagList tags={skills} />
</section>

<section class="block" aria-labelledby="outside-heading">
	<h2 id="outside-heading">Outside of class</h2>
	<p>
		You can usually find me doing the daily crossword (slowly), bouldering, or hunting for the best
		bowl of noodles in town. I also collect old handheld games, which is partly why this site turned
		into an arcade.
	</p>
</section>

<style>
	.intro {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-4);
	}

	.intro > div {
		flex: 1 1 20rem;
	}

	.intro__photo {
		width: 8rem;
		border-radius: 50%;
		outline: 4px solid var(--color-accent);
		outline-offset: 4px;
	}

	.block {
		margin-top: var(--space-5);
		padding-top: var(--space-4);
		border-top: 1px solid var(--color-border);
	}

	h4 {
		margin-bottom: 0;
		color: var(--color-accent);
	}

	h5 {
		margin-top: var(--space-3);
		color: var(--color-text-muted);
		text-transform: uppercase;
	}

	h6 {
		display: inline;
		font-size: var(--text-md);
	}

	.meta {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
</style>
