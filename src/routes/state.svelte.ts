import { type Viewport } from '@xyflow/svelte';
import type { FamilyNodeType } from './types';

export const viewport = $state<Viewport>({
	x: 0,
	y: 0,
	zoom: 1
});

interface EditableNode {
	id?: FamilyNodeType['id'];
}

export const editDialog = $state<EditableNode>({});

interface FlowEvents {
	connectingLine: {
		target?: FamilyNodeType['id'];
	};
}

export const events = $state<FlowEvents>({
	connectingLine: {}
});
