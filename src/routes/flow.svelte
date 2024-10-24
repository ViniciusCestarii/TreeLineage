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

	function saveToLocalStorage(key: string, value: any) {
		if (browser) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	}

	function loadFromLocalStorage<T>(key: string, fallback: T): T {
		const savedData = browser ? localStorage.getItem(key) : undefined;
		return savedData ? JSON.parse(savedData) : fallback;
	}

	const initialNodes: FamilyNodeType[] = loadFromLocalStorage('nodes', [
		{
			id: '0',
			type: 'family',
			data: { name: 'Teste Seila', gender: 'F' },
			position: { x: -100, y: -150 }
		},
		{
			id: '1',
			type: 'family',
			data: { name: 'Jorginho Sabio', gender: 'M' },
			position: { x: 100, y: -150 }
		},
		{
			id: '2',
			type: 'family',
			data: { name: 'Vinicius Cestari', gender: 'M' },
			position: { x: 0, y: 50 }
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

	const initialViewport = loadFromLocalStorage('viewport', {
		zoom: 1,
		x: 175,
		y: 400
	});

	function handlePaneClick() {
		menuStore.close();
	}

	let nodes = writable<FamilyNodeType[]>(initialNodes);
	let edges = writable<Edge[]>(initialEdges);
	const viewport = writable(initialViewport)

	viewport.subscribe((value) => saveToLocalStorage('viewport', value));
	nodes.subscribe((value) => saveToLocalStorage('nodes', value));
	edges.subscribe((value) => saveToLocalStorage('edges', value));

	export const nodeTypes: NodeTypes = {
		family: FamilyNode
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
		height: 100vh;
		width: 100vw;
	}
</style>
