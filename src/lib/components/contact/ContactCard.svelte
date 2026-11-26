<script lang="ts">
	interface Props {
		channel: string;
		href: string;
		label: string;
		note: string;
	}

	let { channel, href, label, note }: Props = $props();
</script>

<li class="card">
	<h3>{channel}</h3>
	<p><a {href}>{label}</a></p>
	<p>{note}</p>
</li>

<style>
	a {
		display: inline-flex;
		align-items: center;
		min-height: var(--tap);
		font-weight: 700;
		overflow-wrap: anywhere;
	}
</style>
