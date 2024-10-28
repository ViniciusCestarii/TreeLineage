<script>
	import ThemeSwitch from '$lib/components/theme-switch.svelte';
	import { Button } from '$lib/components/ui/button';
	import CreateFamilyNodeButton from './create-family-node-button.svelte';
</script>

<header class="fixed top-0 z-40 flex w-full justify-between bg-background px-4 py-2">
	<h1>TreeLineage</h1>
	<CreateFamilyNodeButton />
	<div class="flex space-x-2">
		<Button variant="outline">Share</Button>
		<ThemeSwitch />
	</div>
</header>
