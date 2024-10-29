<script lang="ts">
	import { toPng } from 'html-to-image';
	import { getNodesBounds, getViewportForBounds, useNodes } from '@xyflow/svelte';
	import { Button } from '$lib/components/ui/button';
	import { mode } from 'mode-watcher';

	const nodes = useNodes();
	const imageWidth = 1024;
	const imageHeight = 768;
	let loading = $state(false);

	async function handleClick() {
		const nodesBounds = getNodesBounds($nodes);
		const viewport = getViewportForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2.0, 0.2);
		const viewportDomNode = document.querySelector<HTMLElement>('.svelte-flow__viewport')!;

		if (viewport) {
			loading = true;

			const dataUrl = await toPng(viewportDomNode, {
				backgroundColor: $mode === 'dark' ? '#111' : '#fff',
				width: imageWidth,
				height: imageHeight,
				style: {
					width: `${imageWidth}px`,
					height: `${imageHeight}px`,
					transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`
				}
			});
			const link = document.createElement('a');
			link.download = 'svelte-flow.png';
			link.href = dataUrl;
			link.click();
			loading = false;
		}
	}
</script>

<Button class="min-w-[6.5rem]" onclick={handleClick} variant="outline" disabled={loading}>
	{#if loading}
		Loading...
	{:else}
		Download
	{/if}
</Button>
