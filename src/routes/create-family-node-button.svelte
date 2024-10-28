<script lang="ts">
	import { useNodes } from '@xyflow/svelte';
	import { generateNodeFamily } from './utils';
	import { Button } from '$lib/components/ui/button';
	import { editDialog } from './state.svelte';

	const nodes = useNodes();

	function duplicateNode() {
		const nodeToPush = generateNodeFamily({ selected: true });
		const diselectedNodes = $nodes.map((node) => ({ ...node, selected: false }));
		$nodes = [...diselectedNodes, nodeToPush];
		editDialog.id = nodeToPush.id;
	}
</script>

<Button onclick={duplicateNode}>Add new Person +</Button>
