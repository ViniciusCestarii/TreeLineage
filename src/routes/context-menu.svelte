<script lang="ts">
	import { useEdges, useNodes } from '@xyflow/svelte';
	import { generateId } from './utils';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { editDialog } from './state.svelte';
	import { useSvelteFlow } from '@xyflow/svelte';

	interface NodeContextMenuProps {
		id: string;
		top: number | undefined;
		left: number | undefined;
		right: number | undefined;
		bottom: number | undefined;
		onClick: () => void;
	}

	const { bottom, id, left, onClick, right, top }: NodeContextMenuProps = $props();

	const nodes = useNodes();
	const edges = useEdges();

	const { updateNode } = useSvelteFlow();

	function duplicateNode() {
		const node = $nodes.find((node) => node.id === id);
		if (node) {
			$nodes.push({
				...node,
				selected: true,
				id: generateId(),
				position: {
					x: node.position.x + 50,
					y: node.position.y + 50
				}
			});
			updateNode(id, { selected: false });
		}
		$nodes = $nodes;
	}

	function deleteNode() {
		$nodes = $nodes.filter((node) => node.id !== id);
		$edges = $edges.filter((edge) => edge.source !== id && edge.target !== id);
	}

	function editNode() {
		editDialog.id = id;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	style="top: {top}px; left: {left}px; right: {right}px; bottom: {bottom}px;"
	class="absolute z-10 rounded-md border border-border bg-background"
	onclick={onClick}
>
	{#snippet menuItem(text: string, onclick: () => void)}
		<Button variant="ghost" class="w-full justify-start font-normal" size="sm" {onclick}
			>{text}</Button
		>
	{/snippet}
	{@render menuItem('Duplicate', duplicateNode)}
	{@render menuItem('Edit', editNode)}
	<Separator />
	{@render menuItem('Delete', deleteNode)}
	<Separator />
	<p style="margin: 0.5em;">
		<small>Node: {id}</small>
	</p>
</div>
