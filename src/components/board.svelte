<script lang="ts">
	import { Color } from '$lib/enums/color';
	import type { Board as BoardType } from '../lib/types/board';
	import Piece from './piece.svelte';
	import Square from './square.svelte';

	export let board: BoardType;

	let rows = [0, 1, 2, 3, 4, 5, 6, 7];
	let columns = [0, 1, 2, 3, 4, 5, 6, 7];

	if (board.playerColor === Color.White) {
		rows = rows.reverse();
	}

	let from: string;
	let to: string;

	const onDragStart = (event: DragEvent) => {
		const square = event.currentTarget as HTMLDivElement;
		from = square.id;
	};

	const onDragDrop = (event: DragEvent) => {
		event.stopPropagation();
		const square = event.currentTarget as HTMLDivElement;
		to = square.id;
		console.log(from, to);
	};
</script>

<div>
	{#await board}
		<p>Loading...</p>
	{:then board}
		<div class="board" draggable="false">
			{#each rows as row, x}
				{#each columns as column, y}
					{#if board.pieces[row][column]}
						<Square {x} {y} {row} {column} {onDragStart} {onDragDrop} role="button"
							><Piece piece={board.pieces[row][column]} /></Square
						>
					{:else}
						<Square {x} {y} {row} {column} {onDragDrop} role="none" />
					{/if}
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
