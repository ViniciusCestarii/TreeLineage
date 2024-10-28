<script lang="ts">
	import { useSvelteFlow } from '@xyflow/svelte';
	import { genderArray, type FamilyNodeDataType, type FamilyNodeType } from './types';
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
	import PersonIcon from './person-icon.svelte';
	import { cn } from '$lib/utils';

	interface FamilyNodeEditFormProps extends Pick<FamilyNodeType, 'id'> {
		onsubmit: (evt: Event) => void;
	}

	const { id, onsubmit }: FamilyNodeEditFormProps = $props();

	const { updateNodeData, getNode } = useSvelteFlow();

	$effect(() => {
		const node = getNode(id);
		if (!node) {
			throw new Error(`Node with id ${id} not found`);
		}

		data = node.data as FamilyNodeDataType;
	});

	const initialData = getNode(id)!.data as FamilyNodeDataType;

	let data = $state(initialData);

	const updateData = (updatedData: Partial<FamilyNodeDataType>) => {
		data = { ...data, ...updatedData };
		updateNodeData(id, updatedData);
	};
</script>

<form {onsubmit} class="flex flex-col items-center">
	<RadioGroup
		class="flex"
		value={data.gender}
		onValueChange={(value) =>
			updateData({
				gender: value as FamilyNodeDataType['gender']
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
		bind:value={data.name}
		oninput={(evt) => updateNodeData(id, { name: evt.currentTarget.value })}
	/>
</form>
