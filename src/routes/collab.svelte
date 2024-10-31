<script lang="ts">
	import { onMount } from 'svelte';
	import { io } from 'socket.io-client';
	import ThemeSwitch from '$lib/components/theme-switch.svelte';
  import { env } from '$env/dynamic/public';

	let dotPositions: Array<{ x: number; y: number }> = $state([]);
	let lastSentTime = $state(0);

	const sendInterval = 100;

	onMount(() => {
		const socket = io(env.PUBLIC_SERVER_URL, { secure: true });

		const handleMouseMove = (event: MouseEvent) => {
			const mouseData = {
				x: event.clientX,
				y: event.clientY
			};

			const currentTime = Date.now();
			if (currentTime - lastSentTime > sendInterval) {
				socket.emit('mouseMove', mouseData);
				lastSentTime = currentTime;
			}
		};

		window.addEventListener('mousemove', handleMouseMove);

		socket.on('mouseMove', (positions) => {
			dotPositions.push(positions);
		});

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			socket.disconnect();
		};
	});

	$inspect(dotPositions);
</script>

{#each dotPositions as pos (Math.random())}
	<!-- Unique key for each position -->
	<div class="absolute z-50 size-10" style="left: {pos.x}px; top: {pos.y}px;">
		<ThemeSwitch />
	</div>
{/each}
