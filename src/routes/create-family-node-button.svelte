<script lang="ts">
  import { useNodes } from '@xyflow/svelte';
  import { generateNodeFamily } from './utils';
	import { Button } from '$lib/components/ui/button';

  const nodes = useNodes();

  function duplicateNode() {
    const nodeToPush = generateNodeFamily();
    $nodes.push(nodeToPush);
    $nodes = $nodes;
  }
</script>

<Button onclick={duplicateNode}>Add new Person +</Button>