<script lang="ts">
	import { mode } from 'mode-watcher';
	import type { FamilyNodeDataType } from './types';
	import LordIcon from '$lib/components/ui/lord-icon.svelte';

	interface PersonIconProps extends Pick<FamilyNodeDataType, 'gender' | 'birthDate'> {}

	const { gender, birthDate }: PersonIconProps = $props();
</script>

{#if gender === 'M'}
	<LordIcon src="https://cdn.lordicon.com/shcfcebj.json" trigger="hover" state="hover-jump" />
{:else if gender === 'F'}
	<LordIcon
		src="https://cdn.lordicon.com/ugejbvui.json"
		trigger="hover"
		state="hover-jump"
		class="h-full w-full"
	/>
{:else}
	<LordIcon src="https://cdn.lordicon.com/kdduutaw.json" trigger="hover" class="h-full w-full" />
{/if}
