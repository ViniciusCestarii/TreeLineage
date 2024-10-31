<script lang="ts">
	import { writable } from 'svelte/store';
	import {
		SvelteFlow,
		Background,
		MiniMap,
		BackgroundVariant,
		type Edge,
		Controls
	} from '@xyflow/svelte';

	import '@xyflow/svelte/dist/style.css';
	import { mode } from 'mode-watcher';
	import { type FamilyNodeType, nodeTypes } from './types';
	import ContextMenu from './context-menu.svelte';
	import { menuStore } from './menu-store';
	import { editDialog, events, viewport as viewportStore } from './state.svelte';
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
	nodes.subscribe((value) => {
		saveToLocalStorage('nodes', value);

		const selectedNode = value.find((node) => node.selected === true);
		if (selectedNode && editDialog.id) {
			editDialog.id = selectedNode.id;
		}
	});
	edges.subscribe((value) => saveToLocalStorage('edges', value));

	let width = $state<number>(0);
	let height = $state<number>(0);

	const defaultEdgeOptions: Partial<Edge> = {
		type: 'straight',
		style: 'stroke-width: 2px; margin-top: 1rem'
	};
</script>

<svelte:window />

<div class="h-[100dvh] w-[100dvw]" bind:clientWidth={width} bind:clientHeight={height}>
	<SvelteFlow
		{nodes}
		{edges}
		{nodeTypes}
		{viewport}
		maxZoom={2}
		minZoom={0.15}
		connectionLineStyle="stroke-width: 2px;"
		onconnectstart={(connectStart) => {
			const target = connectStart?.target as any
			events.connectingLine.target = target?.__attributes?.["data-nodeid"] as string | null ?? undefined
			editDialog.id = undefined;
			menuStore.close();
		}}
		onconnectend={() => {
			events.connectingLine.target = undefined
		}}
		{defaultEdgeOptions}
		colorMode={$mode ?? 'light'}
		ondelete={(deleted) => {
			deleted.nodes.some((node) => node.id == editDialog.id) && (editDialog.id = undefined);
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
			editDialog.id = undefined;
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
			<EditDialog id={editDialog.id} onclose={() => (editDialog.id = undefined)} />
		{/if}
	</SvelteFlow>
</div>
