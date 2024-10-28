<script lang="ts">
	import { Handle, Position, type NodeProps, useSvelteFlow } from '@xyflow/svelte';
	import { type FamilyNodeType } from './types';
	import { Button } from '$lib/components/ui/button';
	import PersonIcon from './person-icon.svelte';
	import { editDialog } from './state.svelte';

	interface FamilyNodeProps extends NodeProps<FamilyNodeType> {}

	const { data, id }: FamilyNodeProps = $props();
</script>

<div class="relative flex w-40 flex-col gap-1 border border-border bg-background rounded-md group p-2">
	<div class="mx-auto size-20">
		<PersonIcon {...data} />
	</div>
	<Button
		class="absolute right-0 top-0 z-10 border-t-0 border-r-0 hidden group-hover:block"
		variant="outline"
		size="icon-xs"
		aria-label="edit person {data.name}"
		onclick={() => editDialog.id === id ? editDialog.id = null : editDialog.id = id}
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
