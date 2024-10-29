<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { fly } from 'svelte/transition';
	import LordIcon from '$lib/components/ui/lord-icon.svelte';
	import FamilyNodeEditForm from './family-node-edit-form.svelte';
	import type { FamilyNodeType } from './types';
	import { trapFocus } from './actions.svelte';

	interface EditDialogProps {
		onclose: () => void;
		id: FamilyNodeType['id'];
	}

	let { id, onclose }: EditDialogProps = $props();
</script>

<div
	use:trapFocus
	transition:fly={{ y: -5, duration: 100 }}
	role="presentation"
	class="absolute left-[50%] top-[4.5rem] z-40 -translate-x-[50%] rounded-md border border-border bg-background p-1"
>
	<span class="absolute -top-4 left-0 text-sm">
		Node: {id}
	</span>
	<Button
		class="absolute -right-5 -top-3 z-50 size-6 -translate-x-[50%] rounded-full bg-background"
		variant="ghost"
		size="icon-xs"
		aria-label="close edit menu"
		onclick={onclose}
	>
		<LordIcon
			src="https://cdn.lordicon.com/nqtddedc.json"
			trigger="hover"
			animation="hover-cross-1"
			class="h-full w-full"
		/>
	</Button>
	<FamilyNodeEditForm
		{id}
		onsubmit={(e) => {
			e.preventDefault();
			onclose();
		}}
	/>
</div>
