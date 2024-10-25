<script lang="ts">
	import { SvelteFlowProvider } from '@xyflow/svelte';
	import Flow from './flow.svelte';
	import { browser } from '$app/environment';
	import Header from './header.svelte';
</script>

<svelte:head>
	<title>TreeLineage</title>
	<meta name="description" content="TreeLineage" />
	{#if browser}
		<script src="https://cdn.lordicon.com/lordicon.js"></script>
	{/if}
</svelte:head>

<SvelteFlowProvider>
	<Header />
	<Flow />
</SvelteFlowProvider>
