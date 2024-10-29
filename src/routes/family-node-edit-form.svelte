<script lang="ts">
	import { useSvelteFlow } from '@xyflow/svelte';
	import { genderArray, type FamilyNodeDataType, type FamilyNodeType } from './types';
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
	import PersonIcon from './person-icon.svelte';
	import { cn } from '$lib/utils';
	import { Input } from '$lib/components/ui/input';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';

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

<form {onsubmit} class="flex flex-col gap-3 p-2">
	<RadioGroup
		class="mx-auto flex"
		value={data.gender}
		onValueChange={(value) =>
			updateData({
				gender: value as FamilyNodeDataType['gender']
			})}
	>
		{#each genderArray as gender}
			<label
				for="{gender.label}-{id}"
				class={cn(
					'size-12 cursor-pointer rounded-md border border-transparent ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
					data.gender === gender.value && 'border border-primary'
				)}
			>
				<PersonIcon gender={gender.value} birthDate={data.birthDate} />
				<RadioGroupItem id="{gender.label}-{id}" value={gender.value} class="sr-only" />
			</label>
		{/each}
	</RadioGroup>
	<div class="flex flex-col gap-1">
		<Label for="name-{id}">Name</Label>
		<Input
			id="name-{id}"
			placeholder="Person name"
			bind:value={data.name}
			oninput={(evt) => updateNodeData(id, { name: evt.currentTarget.value })}
		/>
	</div>
	<div class="flex flex-col gap-1">
		<Label for="birthDate-{id}">Birth Date</Label>
		<Input
			id="birthDate-{id}"
			placeholder="birth date"
			type="date"
			bind:value={data.birthDate}
			oninput={(evt) => updateNodeData(id, { birthDate: evt.currentTarget.value })}
		/>
	</div>

	<div class="flex items-center space-x-2">
		<Checkbox
			id="isDead-{id}"
			checked={!!data.death}
			onCheckedChange={(value) => updateNodeData(id, { death: value ? {} : undefined })}
		/>
		<Label
			id="terms-label"
			for="isDead-{id}"
			class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		>
			Deceased
		</Label>
	</div>
</form>
