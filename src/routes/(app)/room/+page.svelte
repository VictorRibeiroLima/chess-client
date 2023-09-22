<script lang="ts">
	import { Canvas } from 'svelte-canvas';
	import Board from '../../../components/board.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { disconnect, idStore, roomStore, start } from '../../connection/client';

	const width = 800;
	const height = 800;

	let roomId = '';

	onMount(() => {
		start();
		roomStore.subscribe((room) => {
			roomId = room;
		});
	});

	onDestroy(() => {
		disconnect();
	});
</script>

<div>
	<h1 class="font-extrabold" style="font-size: xx-large; color: sienna;">Room: {roomId}</h1>
	<br />
	<Canvas {width} {height}>
		<Board />
	</Canvas>
</div>
