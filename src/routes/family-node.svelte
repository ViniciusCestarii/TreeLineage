<script lang="ts">
	import { Handle, Position, type NodeProps, useSvelteFlow } from '@xyflow/svelte';
	import { type FamilyNodeType } from './types';
	import { Button } from '$lib/components/ui/button';
	import PersonIcon from './person-icon.svelte';
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
	import FamilyNodeEditForm from './family-node-edit-form.svelte';
	import { cn } from '$lib/utils';

	interface FamilyNodeProps extends NodeProps<FamilyNodeType> {}

	const { data, id }: FamilyNodeProps = $props();

	let editMode = $state(false);
</script>

<div class="relative flex w-40 flex-col gap-1 border border-border bg-background rounded-md group">
	{#if editMode}
	<!-- transform this into a global menu like context menu -->
		<div role="presentation" class="absolute left-full -top-[1px] border border-border rounded-md p-1 bg-background">
			<FamilyNodeEditForm {data} {id} onsubmit={(e) => {
				e.preventDefault();
				editMode = false;
			}}  />
		</div>
		<Button
			class="absolute left-[calc(200%+1rem)] size-6 -top-3 z-10 rounded-full bg-background"
			variant="ghost"
			size="icon-xs"
			aria-label="close edit menu"
			onclick={() => (editMode = false)}
		>
		<lord-icon
    src="https://cdn.lordicon.com/nqtddedc.json"
    trigger="hover"
		animation="hover-cross-1"
		colors="primary:#545454,secondary:#545454"
		class="h-full w-full"
  >
</lord-icon>
		</Button>
	{/if}

	<div class="mx-auto size-20">
		<PersonIcon {...data} />
	</div>
	<Button
		class="absolute right-0 top-0 z-10 border-t-0 border-r-0 hidden group-hover:block"
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
