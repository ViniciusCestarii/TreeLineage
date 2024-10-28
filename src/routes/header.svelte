<script>
	import { Button } from "$lib/components/ui/button";
	import CreateFamilyNodeButton from "./create-family-node-button.svelte";

</script>
<header class="fixed top-0 z-40 flex justify-between w-full px-4 py-2">
  <h1>TreeLineage</h1>
  <CreateFamilyNodeButton />
  <Button>
    Share
  </Button>
</header>