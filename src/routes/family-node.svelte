<script lang="ts">
	import { Handle, Position, type NodeProps, useSvelteFlow } from '@xyflow/svelte';
	import { type FamilyNodeType } from './types';
	import { Button } from '$lib/components/ui/button';
	import PersonIcon from './person-icon.svelte';
	import { editDialog, events } from './state.svelte';
	import { cn } from '$lib/utils';
	import LordIcon from '$lib/components/ui/lord-icon.svelte';

	interface FamilyNodeProps extends NodeProps<FamilyNodeType> {}

	let { data, selected, id }: FamilyNodeProps = $props();
</script>

<div
	class={cn(
		'group relative flex w-40 flex-col gap-1 rounded-md border border-border bg-background px-3 pb-4 pt-2',
		selected && 'border-primary'
	)}
>
	{#if data.death}
		<div class="absolute left-1 top-1 z-40" title="Deceased">
			<LordIcon src="/lord-icon/coffin.json" trigger="hover" state="hover-line" class="size-8" />
		</div>
	{/if}
	<div class="flex justify-center">
		<div class="size-20">
			<PersonIcon {...data} />
		</div>
	</div>
	<Button
		class="absolute right-0 top-0 z-10 hidden border-r-0 border-t-0 group-hover:block"
		variant="outline"
		size="icon-xs"
		aria-label="edit person {data.name}"
		onclick={() => (editDialog.id === id ? (editDialog.id = undefined) : (editDialog.id = id))}
	>
		<LordIcon
			src="https://cdn.lordicon.com/exymduqj.json"
			trigger="hover"
			state="hover-line"
			class="h-full w-full"
		/>
	</Button>
	<h2 class="break-words text-center">
		{data.name}
	</h2>
	<Handle
		isConnectable={!!events.connectingLine.target && events.connectingLine.target !== id}
		type="target"
		position={Position.Top}
		class={cn(
			'mt-4 !size-10 !rounded-md !border-none !bg-transparent before:absolute before:left-1/2 before:top-0 before:z-10 before:hidden before:size-5 before:-translate-x-1/2 before:transform before:rounded-full before:bg-foreground/75',
			events.connectingLine.target &&
				events.connectingLine.target !== id &&
				'before:block before:animate-pulse'
		)}
	/>
	<Handle
		type="source"
		position={Position.Bottom}
		class="!h-4 !w-8 !rounded-md !bg-foreground/75"
	/>
</div>
