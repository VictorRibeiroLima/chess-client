<script lang="ts">
	import { move } from '$lib/connection/client';
	import { Color } from '$lib/enums/color';
	import { afterUpdate } from 'svelte';
	import type { Board as BoardType } from '../lib/types/board';
	import Piece from './piece.svelte';
	import Square from './square.svelte';

	export let board: BoardType;

	let rows = [1, 2, 3, 4, 5, 6, 7, 8];
	let columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

	if (board.playerColor === Color.White) {
		rows = rows.reverse();
	}

	let from: string;
	let to: string;
	let movement: HTMLAudioElement = new Audio(
		'https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/promote.mp3'
	);
	let capture: HTMLAudioElement = new Audio(
		'http://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/capture.mp3'
	);

	const onDragStart = (event: DragEvent) => {
		const square = event.currentTarget as HTMLDivElement;
		from = square.id;
	};

	const onDragDrop = (event: DragEvent) => {
		event.stopPropagation();
		const square = event.currentTarget as HTMLDivElement;
		to = square.id;
		if (from !== to) {
			move(from, to);
		}
	};

	afterUpdate(() => {
		const lastMove = board?.lastMove;
		if (board && lastMove) {
			if (lastMove.type === 'movement' && lastMove.capture) {
				capture.play();
			} else {
				movement.play();
			}
		}
	});
</script>

<div>
	{#await board}
		<p>Loading...</p>
	{:then board}
		<div class="board" draggable="false">
			{#each rows as row, x}
				{#each columns as column, y}
					{#if board.pieces[row - 1][y]}
						<Square {x} {y} {row} {column} {onDragStart} {onDragDrop} role="button"
							><Piece piece={board.pieces[row - 1][y]} /></Square
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
