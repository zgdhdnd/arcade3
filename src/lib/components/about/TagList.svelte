<script lang="ts">
	let { tags }: { tags: string[] } = $props();
</script>

<ul class="tags">
	{#each tags as tag (tag)}
		<li>{tag}</li>
	{/each}
</ul>

<style>
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		padding: 0;
		list-style: none;
	}

	li {
		padding: var(--space-1) var(--space-3);
		border: 1px solid var(--color-border);
		border-radius: 999px;
		background-color: var(--color-surface);
		font-size: var(--text-sm);
	}
</style>
