import { type Viewport } from '@xyflow/svelte';
import type { FamilyNodeType } from './types';

export const viewport = $state<Viewport>({
	x: 0,
	y: 0,
	zoom: 1
});

interface EditableNode {
	id: FamilyNodeType['id'] | null;
}

export const editDialog = $state<EditableNode>({
	id: null
});
