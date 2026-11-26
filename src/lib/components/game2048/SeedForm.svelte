<script lang="ts">
	interface Props {
		seed: number;
		onplay: (seed: number) => void;
	}

	let { seed, onplay }: Props = $props();

	let typed = $state<number | null>(null);
	let input: HTMLInputElement;

	function submit(event: SubmitEvent) {
		event.preventDefault();
		if (typed === null) return;
		onplay(typed);
		typed = null;
		input.blur();
	}
</script>

<form onsubmit={submit}>
	<p>This game's seed: <strong>{seed}</strong></p>
	<label for="seed-input">Replay a seed</label>
	<div class="row">
		<input
			id="seed-input"
			type="number"
			min="0"
			step="1"
			required
			bind:this={input}
			bind:value={typed}
		/>
		<button class="button button--secondary" type="submit">Play</button>
	</div>
</form>

<style>
	p {
		margin: 0;
	}

	label {
		font-weight: 700;
	}

	.row {
		display: flex;
		gap: var(--space-2);
	}

	input {
		flex: 1;
		min-width: 0;
		padding: 0 var(--space-3);
		border: 2px solid var(--color-border);
		border-radius: var(--radius);
		font: inherit;
	}
</style>
