<script lang="ts">
	import { writable } from 'svelte/store';
	import {
		SvelteFlow,
		Background,
		MiniMap,
		BackgroundVariant,
		type Edge,
		Controls,
	} from '@xyflow/svelte';

	import '@xyflow/svelte/dist/style.css';
	import { type FamilyNodeType, nodeTypes } from './types';
	import ContextMenu from './context-menu.svelte';
	import { menuStore } from './menu-store';
	import { editDialog, viewport as viewportStore } from './state.svelte';
	import { loadFromLocalStorage, saveToLocalStorage } from './utils';
	import EditDialog from './edit-dialog.svelte';

	const initialNodes: FamilyNodeType[] = loadFromLocalStorage('nodes', []);
	const initialEdges: Edge[] = loadFromLocalStorage('edges', []);
	const initialViewport = loadFromLocalStorage('viewport', {
		zoom: 1,
		x: 0,
		y: 0
	});

	let nodes = writable(initialNodes);
	let edges = writable(initialEdges);
	const viewport = writable(initialViewport);

	viewport.subscribe((value) => {
		saveToLocalStorage('viewport', value);
		viewportStore.x = value.x;
		viewportStore.y = value.y;
		viewportStore.zoom = value.zoom;
	});
	nodes.subscribe((value) => saveToLocalStorage('nodes', value));
	edges.subscribe((value) => saveToLocalStorage('edges', value));

	let width = $state<number>(0);
	let height = $state<number>(0);
</script>

<svelte:window />

<div class="h-[100dvh] w-[100dvw]" bind:clientWidth={width} bind:clientHeight={height}>
	<SvelteFlow
		{nodes}
		{edges}
		{nodeTypes}
		{viewport}
		ondelete={(deleted) => {
			deleted.nodes.some(node => node.id == editDialog.id) && (editDialog.id = null);
		}}
		on:nodecontextmenu={({ detail: { event, node } }) => {
			const hasCoords = 'clientX' in event;
			if (!hasCoords) {
				return;
			}
			event.preventDefault();
			menuStore.open(node.id, event, width, height);
		}}
		on:paneclick={() => {
			menuStore.close();
			editDialog.id = null;
		}}
	>
		<Controls />
		<MiniMap />
		<Background variant={BackgroundVariant.Dots} />
		{#if $menuStore}
			<ContextMenu
				onClick={menuStore.close}
				id={$menuStore.id}
				top={$menuStore.top}
				left={$menuStore.left}
				right={$menuStore.right}
				bottom={$menuStore.bottom}
			/>
		{/if}
		{#if editDialog.id}
			<EditDialog id={editDialog.id} onclose={() => (editDialog.id = null)} />
		{/if}
	</SvelteFlow>
</div>
