<script lang="ts">
	import { Canvas } from 'svelte-canvas';
	import Board from '../../../components/board.svelte';
	import { onMount } from 'svelte';
	import { start } from '../../connection/client';

	onMount(() => {
		start();
	});

	const width = 800;
	const height = 800;

	$: roomId = '1';
</script>

<div>
	<h1 class="font-extrabold" style="font-size: xx-large; color: sienna;">Room:{roomId}</h1>
	<br />
	<Canvas {width} {height}>
		<Board />
	</Canvas>
</div>
