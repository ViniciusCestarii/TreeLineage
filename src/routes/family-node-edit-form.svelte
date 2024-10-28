<script lang="ts">
	import { useSvelteFlow } from '@xyflow/svelte';
	import { genderArray, type FamilyNodeType } from './types';
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
	import PersonIcon from './person-icon.svelte';
	import { cn } from '$lib/utils';

	interface FamilyNodeEditFormProps extends Pick<FamilyNodeType, 'id' | 'data'> {
		onsubmit: (evt: Event) => void;
	}

	const { data, id, onsubmit }: FamilyNodeEditFormProps = $props();

	const { updateNodeData } = useSvelteFlow();
</script>

<form {onsubmit} class="flex flex-col items-center">
	<RadioGroup
		class="flex"
		value={data.gender}
		onValueChange={(value) =>
			updateNodeData(id, {
				gender: value
			})}
	>
		{#each genderArray as gender}
			<label
				for={gender.label}
				class={cn(
					'size-12 cursor-pointer rounded-md border border-transparent',
					data.gender === gender.value && 'border border-primary'
				)}
			>
				<PersonIcon gender={gender.value} birthDate={data.birthDate} />
			</label>
			<RadioGroupItem id={gender.label} value={gender.value} class="sr-only" />
		{/each}
	</RadioGroup>
	<input
		id="name-{id}"
		placeholder="name"
		value={data.name}
		oninput={(evt) => updateNodeData(id, { name: evt.currentTarget.value })}
	/>
</form>
