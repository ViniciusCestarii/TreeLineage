<script lang="ts">
	import type { FamilyNodeDataType } from './types';

	interface PersonIconProps extends Pick<FamilyNodeDataType, 'gender' | 'birthDate'> {}

	const { gender, birthDate }: PersonIconProps = $props();
</script>

{#if gender === 'M'}
	<lord-icon
		src="https://cdn.lordicon.com/shcfcebj.json"
		trigger="hover"
		state="hover-jump"
		colors="primary:#545454,secondary:#545454"
		class="h-full w-full"
	>
	</lord-icon>
{:else if gender === 'F'}
	<lord-icon
		src="https://cdn.lordicon.com/ugejbvui.json"
		trigger="hover"
		state="hover-jump"
		colors="primary:#545454,secondary:#545454"
		class="h-full w-full"
	>
	</lord-icon>
{:else}
	<lord-icon
		src="https://cdn.lordicon.com/kdduutaw.json"
		trigger="hover"
		colors="primary:#545454,secondary:#545454"
		class="h-full w-full"
	>
	</lord-icon>
{/if}
