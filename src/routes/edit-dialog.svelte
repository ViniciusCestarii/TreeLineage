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

	const { id, onclose }: EditDialogProps = $props();
</script>

<div
	use:trapFocus
	transition:fly={{ y: -5, duration: 100 }}
	role="presentation"
	class="absolute left-[50%] top-[4.5rem] z-40 -translate-x-[50%] rounded-md border border-border bg-background p-1"
>
	<Button
		class="absolute -top-3 left-[50%] z-50 size-6 -translate-x-[50%] rounded-full bg-background"
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
