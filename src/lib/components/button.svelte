<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface ButtonProps extends HTMLButtonAttributes {
		size?: 'sm' | 'md' | 'lg';
	}

	const { children, ...props }: ButtonProps = $props();
</script>

<button {...props} class="button">
	{@render children?.()}
</button>

<style>
	.button {
		background-color: var(--primary);
		border-radius: var(--radius);
		border: none;
		color: white;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 4px 2px;
		cursor: pointer;
	}
</style>
