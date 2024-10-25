<script lang="ts">
  import { useNodes } from '@xyflow/svelte';
  import { generateNodeFamily } from './utils';

  const nodes = useNodes();

  function duplicateNode() {
    const nodeToPush = generateNodeFamily();
    $nodes.push(nodeToPush);
    $nodes = $nodes;
  }
</script>

<button onclick={duplicateNode}>Add new Person +</button>