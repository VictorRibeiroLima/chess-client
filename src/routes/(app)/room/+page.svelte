<script lang="ts">
	import Board from '../../../components/board.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { createBoard, disconnect, roomStore, start } from '$lib';

	const width = 800;
	const height = 800;

	let roomId = '';

	const board = createBoard();

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
	<Board {board} />
</div>
