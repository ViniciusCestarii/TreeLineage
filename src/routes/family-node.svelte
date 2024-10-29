<script lang="ts">
	import { Handle, Position, type NodeProps, useSvelteFlow } from '@xyflow/svelte';
	import { type FamilyNodeType } from './types';
	import { Button } from '$lib/components/ui/button';
	import PersonIcon from './person-icon.svelte';
	import { editDialog } from './state.svelte';
	import { cn } from '$lib/utils';
	import LordIcon from '$lib/components/ui/lord-icon.svelte';

	interface FamilyNodeProps extends NodeProps<FamilyNodeType> {}

	const { data, selected, id }: FamilyNodeProps = $props();
</script>

<div
	class={cn(
		'group relative flex w-40 flex-col gap-1 rounded-md border border-border bg-background p-2',
		selected && 'border-primary'
	)}
>
	<div class="mx-auto size-20">
		<PersonIcon {...data} />
	</div>
	<Button
		class="absolute right-0 top-0 z-10 hidden border-r-0 border-t-0 group-hover:block"
		variant="outline"
		size="icon-xs"
		aria-label="edit person {data.name}"
		onclick={() => (editDialog.id === id ? (editDialog.id = null) : (editDialog.id = id))}
	>
		<LordIcon
			src="https://cdn.lordicon.com/exymduqj.json"
			trigger="hover"
			state="hover-line"
			class="h-full w-full"
		/>
	</Button>
	<h2 class="text-center">
		{data.name}
	</h2>
	<Handle type="target" position={Position.Top} />
	<Handle type="source" position={Position.Bottom} />
</div>
