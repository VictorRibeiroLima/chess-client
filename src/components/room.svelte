<script lang="ts">
	import type { Board as BoardType } from '$lib/types/board';
	import { onDestroy, onMount } from 'svelte';
	import { disconnect, roomStore } from '$lib';
	import Board from './board.svelte';

	let roomId = '';

	let board: BoardType;

	onMount(() => {
		roomStore.subscribe((state) => {
			if (state.board) {
				roomId = state.roomId;
				board = state.board;
			}
		});
	});

	onDestroy(() => {
		disconnect();
	});
</script>

<div>
	{#if board}
		<h1 class="font-extrabold" style="font-size: xx-large; color: sienna;">Room: {roomId}</h1>
		<br />
		<Board {board} />
	{:else}
		<h1 class="font-extrabold" style="font-size: xx-large; color: sienna;">Loading...</h1>
	{/if}
</div>
