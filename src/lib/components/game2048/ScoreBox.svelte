<script lang="ts">
	let { label, value }: { label: string; value: number } = $props();
</script>

<div class="score">
	<span class="label">{label}</span>
	<span class="value">{value}</span>
</div>

<style>
	.score {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--space-2);
		border-radius: var(--radius);
		background-color: var(--color-text);
		color: #ffffff;
	}

	.label {
		font-size: var(--text-sm);
		font-weight: 700;
		text-transform: uppercase;
	}

	.value {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: 700;
	}
</style>
