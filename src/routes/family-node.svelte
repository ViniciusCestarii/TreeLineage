<script lang="ts">
	import { Handle, Position, type NodeProps, useSvelteFlow } from '@xyflow/svelte';
	import type { FamilyNodeType } from './types';

	interface FamilyNodeProps extends NodeProps<FamilyNodeType> {}
	type $$Props = FamilyNodeProps;

	export let id: $$Props['id'];
	export let data: $$Props['data'];

	const { updateNodeData } = useSvelteFlow();
</script>

<div class="container">
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
		<input
			id="name-{id}"
      placeholder="name"
			value={data.name}
			oninput={(evt) => updateNodeData(id, { name: evt.currentTarget.value })}
		/>
	<Handle type="target" position={Position.Top} />
	<Handle type="source" position={Position.Bottom} />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

  .icon-container {
    width: 5rem;
    height: 5rem;
    margin: 0 auto;
  }
</style>
