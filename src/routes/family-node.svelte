<script lang="ts">
	import { Handle, Position, type NodeProps, useSvelteFlow } from '@xyflow/svelte';
	import type { FamilyNodeType } from './types';
	import { Button } from '$lib/components/ui/button';

	interface FamilyNodeProps extends NodeProps<FamilyNodeType> {}

	const { data, id }: FamilyNodeProps = $props();

	let editMode = $state(false);

	const { updateNodeData } = useSvelteFlow();
</script>

<div class="flex flex-col gap-1 relative w-36">
	{#if editMode}
		<div role="presentation" class="absolute top-0 left-full">
			<form onsubmit={(e) => {
				e.preventDefault();
				editMode = false;
			}}>
				<input
					id="name-{id}"
					placeholder="name"
					value={data.name}
					oninput={(evt) => updateNodeData(id, { name: evt.currentTarget.value })}
				/>
			</form>
		</div>
	{/if}

	<div class="size-20 mx-auto">
		{#if data.gender === 'M'}
			<lord-icon
				src="https://cdn.lordicon.com/shcfcebj.json"
				trigger="hover"
				state="hover-jump"
				colors="primary:#545454,secondary:#545454"
				class="h-full w-full"
				>
			</lord-icon>
		{:else}
			<lord-icon
				src="https://cdn.lordicon.com/ugejbvui.json"
				trigger="hover"
				state="hover-jump"
				colors="primary:#545454,secondary:#545454"
				class="h-full w-full"
				>
			</lord-icon>
		{/if}
	</div>
	<Button
		class="absolute right-0 top-0 z-10"
		variant="outline"
		size="icon-xs"
		aria-label="edit person {data.name}"
		onclick={() => (editMode = !editMode)}
	>
		<lord-icon
			src="https://cdn.lordicon.com/exymduqj.json"
			trigger="hover"
			state="hover-line"
			colors="primary:#545454,secondary:#545454"
			class="h-full w-full"
		>
		</lord-icon>
	</Button>
	<h2 class="text-center">
		{data.name}
	</h2>
	<Handle type="target" position={Position.Top} />
	<Handle type="source" position={Position.Bottom} />
</div>