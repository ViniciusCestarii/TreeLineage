// menuStore.ts
import { writable } from 'svelte/store';

type MenuState = {
	id: string;
	top?: number;
	left?: number;
	right?: number;
	bottom?: number;
} | null;

const createMenuStore = () => {
	const { subscribe, set } = writable<MenuState>(null);

	return {
		subscribe,
		open: (id: string, event: MouseEvent, width: number, height: number) => {
			set({
				id,
				top: event.clientY < height - 200 ? event.clientY : undefined,
				left: event.clientX < width - 200 ? event.clientX : undefined,
				right: event.clientX >= width - 200 ? width - event.clientX : undefined,
				bottom: event.clientY >= height - 200 ? height - event.clientY : undefined
			});
		},
		close: () => set(null)
	};
};

export const menuStore = createMenuStore();
