<script>
	import CreateFamilyNodeButton from "./create-family-node-button.svelte";

</script>
<header>
  <h1>TreeLineage</h1>
  <CreateFamilyNodeButton />
  <button>
    Share
  </button>
</header>

<style>
  header {
    position: fixed;
    top: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 1rem;
  }
</style>