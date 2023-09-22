<script lang="ts">
	import { Color } from '$lib/enums/color';
	import type { Board as BoardType } from '../lib/types/board';
	import Piece from './piece.svelte';
	import Square from './square.svelte';

	export let board: BoardType;

	if (board.playerColor === Color.White) {
		board.pieces = board.pieces.reverse();
	}

	const light = '#eed4ac';
	const dark = '#ac7d58';
</script>

<div>
	{#await board}
		<p>Loading...</p>
	{:then board}
		<div class="board" draggable="false">
			{#each board.pieces as row, i}
				{#each row as piece, j}
					<Square {i} {j}><Piece {piece} /></Square>
				{/each}
			{/each}
		</div>
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>

<style>
	.board {
		position: relative;
		width: 800px;
		height: 800px;
		z-index: 10;
	}
</style>
