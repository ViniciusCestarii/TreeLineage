<script lang="ts">
	import { writable } from 'svelte/store';
	import {
		SvelteFlow,
		Background,
		MiniMap,
		BackgroundVariant,
		type Edge,
		Controls,
		type NodeTypes
	} from '@xyflow/svelte';

	import '@xyflow/svelte/dist/style.css';
	import FamilyNode from './family-node.svelte';
	import type { FamilyNodeType } from './types';
	import ContextMenu from './context-menu.svelte';
	import { menuStore } from './menu-store';
	import { browser } from '$app/environment';
	import { viewport as viewportStore} from './state.svelte';
	import { loadFromLocalStorage, saveToLocalStorage } from './utils';

	const initialNodes: FamilyNodeType[] = loadFromLocalStorage('nodes', [
		{
			id: '0',
			type: 'family',
			data: { name: 'Teste Seila', gender: 'F' },
			position: { x: 100, y: 150 }
		},
		{
			id: '1',
			type: 'family',
			data: { name: 'Jorginho Sabio', gender: 'M' },
			position: { x: 300, y: 150 }
		},
		{
			id: '2',
			type: 'family',
			data: { name: 'Vinicius Cestari', gender: 'M' },
			position: { x: 200, y: 300 }
		}
	]);
	const initialEdges: Edge[] = loadFromLocalStorage('edges', [
		{
			id: '0',
			source: '0',
			target: '2'
		},
		{
			id: '1',
			source: '1',
			target: '2'
		}
	]);

  function calculateInitialViewport(node: FamilyNodeType, width: number, height: number) {
		const { x, y } = node.position;
		const zoom = 1;
		const centerX = width / 2 - x -90;
		const centerY = height / 2 - y -44;
		return { x: centerX, y: centerY, zoom };
	}

	const initialViewport = loadFromLocalStorage('viewport', calculateInitialViewport(initialNodes[2], browser ? window.innerWidth : 0, browser ? window.innerHeight : 0));

	function handlePaneClick() {
		menuStore.close();
	}

	let nodes = writable<FamilyNodeType[]>(initialNodes);
	let edges = writable<Edge[]>(initialEdges);
	const viewport = writable(initialViewport)

	viewport.subscribe((value) => {
		saveToLocalStorage('viewport', value)
		viewportStore.x = value.x;
		viewportStore.y = value.y;
		viewportStore.zoom = value.zoom;
	});
	nodes.subscribe((value) => saveToLocalStorage('nodes', value));
	edges.subscribe((value) => saveToLocalStorage('edges', value));

	export const nodeTypes: NodeTypes = {
		family: FamilyNode as any // Svelte 5 $props changed type
	};

  let width = $state<number>(0);
  let height= $state<number>(0);
</script>

<svelte:window />

<div class="wrapper" bind:clientWidth={width} bind:clientHeight={height}>
	<SvelteFlow
		{nodes}
		{edges}
		{nodeTypes}
    viewport={viewport}
		on:nodecontextmenu={({ detail: { event, node } }) => {
			const hasCoords = 'clientX' in event;
			if (!hasCoords) {
				return;
			}
			event.preventDefault();
			menuStore.open(node.id, event, width, height);
		}}
		on:paneclick={handlePaneClick}
	>
		<Controls />
		<MiniMap />
		<Background variant={BackgroundVariant.Dots} />
		{#if $menuStore}
			<ContextMenu
				onClick={handlePaneClick}
				id={$menuStore.id}
				top={$menuStore.top}
				left={$menuStore.left}
				right={$menuStore.right}
				bottom={$menuStore.bottom}
			/>
		{/if}
	</SvelteFlow>
</div>

<style>
	.wrapper {
		height: 100dvh;
		width: 100dvw;
	}
</style>
