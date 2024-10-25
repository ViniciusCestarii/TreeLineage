<script>
  import "../app.css";
	import Header from "./header.svelte";

  let { children } = $props();
</script>

{@render children()}

