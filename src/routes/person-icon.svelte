<script lang="ts">
	import type { FamilyNodeDataType } from './types';
	import LordIcon from '$lib/components/ui/lord-icon.svelte';

	interface PersonIconProps extends Pick<FamilyNodeDataType, 'gender' | 'birthDate'> {}

	let { gender, birthDate }: PersonIconProps = $props();

	type LifePhase = 'baby' | 'child' | 'adult';

	const getLifePhase = (birthDate: string | undefined): LifePhase => {
		if (!birthDate) return 'adult';
		const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
		if (age < 2) return 'baby';
		if (age < 14) return 'child';
		return 'adult';
	};

	let lifePhase: LifePhase = $derived(getLifePhase(birthDate));
</script>

{#if gender === 'M'}
	{#if lifePhase === 'baby'}
		<LordIcon src="/lord-icon/baby-boy.json" trigger="hover" state="hover-jump" />
	{:else if lifePhase === 'child'}
		<LordIcon src="/lord-icon/boy.json" trigger="hover" state="hover-jump" />
	{:else}
		<LordIcon src="https://cdn.lordicon.com/shcfcebj.json" trigger="hover" state="hover-jump" />
	{/if}
{:else if gender === 'F'}
	{#if lifePhase === 'baby'}
		<LordIcon src="/lord-icon/baby-girl.json" trigger="hover" state="hover-jump" />
	{:else if lifePhase === 'child'}
		<LordIcon src="/lord-icon/girl.json" trigger="hover" state="hover-jump" />
	{:else}
		<LordIcon src="https://cdn.lordicon.com/ugejbvui.json" trigger="hover" state="hover-jump" />
	{/if}
{:else}
	<LordIcon src="https://cdn.lordicon.com/kdduutaw.json" trigger="hover" class="h-full w-full" />
{/if}
