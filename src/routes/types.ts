import type { Node, NodeTypes } from '@xyflow/svelte';
import FamilyNode from './family-node.svelte';

export const genderArray = [
	{ value: 'M', label: 'Male' },
	{ value: 'F', label: 'Female' },
	{ value: 'O', label: 'Other' }
] as const;

export interface FamilyNodeType extends Node {
	data: {
		name: string;
		gender: (typeof genderArray)[number]['value'];
		birthDate?: string;
		death?: {
			date?: string;
		};
	};
}

export type FamilyNodeDataType = FamilyNodeType['data'];

export const nodeTypes: NodeTypes = {
	// Svelte 5 $props changed type
	family: FamilyNode as unknown as NodeTypes[string]
};
