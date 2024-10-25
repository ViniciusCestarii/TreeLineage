<script lang="ts">
	import { Handle, Position, type NodeProps, useSvelteFlow } from '@xyflow/svelte';
	import type { FamilyNodeType } from './types';

	interface FamilyNodeProps extends NodeProps<FamilyNodeType> {}

	const { data, id }: FamilyNodeProps = $props();

	let editMode = $state(false)

	const { updateNodeData } = useSvelteFlow();
</script>

<div class="container">
	{#if editMode}
	<div role="presentation" class="edit-menu">
		<input
		id="name-{id}"
		placeholder="name"
		value={data.name}
		oninput={(evt) => updateNodeData(id, { name: evt.currentTarget.value })}
	/>
	</div>
	{/if}

	<div class="icon-container">
		{#if data.gender === 'M'}
			<lord-icon
				src="https://cdn.lordicon.com/shcfcebj.json"
				trigger="hover"
				state="hover-jump"
				colors="primary:#545454,secondary:#545454"
				style="width:100%;height:100%"
			>
			</lord-icon>
		{:else}
			<lord-icon
				src="https://cdn.lordicon.com/ugejbvui.json"
				trigger="hover"
				state="hover-jump"
				colors="primary:#545454,secondary:#545454"
				style="width:100%;height:100%"
			>
			</lord-icon>
		{/if}
	</div>
	<button class="edit-button" aria-label="edit person" onclick={() => editMode = !editMode}>
		<lord-icon
    src="https://cdn.lordicon.com/exymduqj.json"
    trigger="hover"
    state="hover-line"
		colors="primary:#545454,secondary:#545454"
    style="width:100%;height:100%">
</lord-icon>	
</button>
	<h2>
		{data.name}
	</h2>
	<Handle type="target" position={Position.Top} />
	<Handle type="source" position={Position.Bottom} />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		position: relative;
		width: 10rem;
	}

	.icon-container {
		width: 5rem;
		height: 5rem;
		margin: 0 auto;
	}

	.edit-button {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 100;
		width: 2rem;
		aspect-ratio: 1 / 1;
		padding: 0;
		margin: 0;
	}

	.edit-menu {
		position: absolute;
		top: 0;
		left: 100%;
	}
</style>
