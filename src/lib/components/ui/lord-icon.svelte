<script lang="ts">
	import { cn } from '$lib/utils';
	import { mode } from 'mode-watcher';

	interface LordIconProps {
		src: string;
		trigger: string;
		animation?: string;
		state?: string;
		class?: string;
	}

	let { class: className, ...props }: LordIconProps = $props();

	const getColor = (mode: string | undefined) => (mode === 'dark' ? '#EFEFEF' : '#545454');

	let color = $state(getColor($mode));

	$effect(() => {
		color = getColor($mode);
	});
</script>

<lord-icon
	{...props}
	colors="primary:{color},secondary:{color}"
	class={cn('h-full w-full', className)}
></lord-icon>
