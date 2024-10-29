<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import LordIcon from '$lib/components/ui/lord-icon.svelte';
	import FamilyNodeEditForm from './family-node-edit-form.svelte';
	import type { FamilyNodeType } from './types';

	interface EditDialogProps {
		onclose: () => void;
		id: FamilyNodeType['id'];
	}

	const { id, onclose }: EditDialogProps = $props();
</script>

<div
	role="presentation"
	class="absolute left-[50%] top-[4.5rem] z-40 -translate-x-[50%] rounded-md border border-border bg-background p-1"
>
	<FamilyNodeEditForm
		{id}
		onsubmit={(e) => {
			e.preventDefault();
			onclose();
		}}
	/>
</div>
<Button
	class="absolute left-[50%] top-14 z-50 size-6 -translate-x-[50%] rounded-full bg-background"
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
	></LordIcon>
</Button>
