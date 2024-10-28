<script lang="ts">
	import { Button } from '$lib/components/ui/button';
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
	class="absolute z-40 top-[4.5rem] left-[50%] -translate-x-[50%] rounded-md border border-border bg-background p-1"
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
	class="absolute top-14 left-[50%] -translate-x-[50%] z-50 size-6 rounded-full bg-background"
	variant="ghost"
	size="icon-xs"
	aria-label="close edit menu"
	onclick={onclose}
>
	<lord-icon
		src="https://cdn.lordicon.com/nqtddedc.json"
		trigger="hover"
		animation="hover-cross-1"
		colors="primary:#545454,secondary:#545454"
		class="h-full w-full"
	/>
</Button>
