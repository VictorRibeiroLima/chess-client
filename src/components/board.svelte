<script lang="ts">
	import { move } from '$lib/connection/client';
	import { Color } from '$lib/enums/color';
	import { afterUpdate } from 'svelte';
	import type { Board as BoardType } from '../lib/types/board';
	import Piece from './piece.svelte';
	import Square from './square.svelte';
	import { capture, movement } from '$lib/assets/sounds';
	import type { MoveCapture } from '$lib/types/move';

	export let board: BoardType;

	let rows = [1, 2, 3, 4, 5, 6, 7, 8];
	let columns = [
		{
			label: 'a',
			index: 0
		},
		{
			label: 'b',
			index: 1
		},
		{
			label: 'c',
			index: 2
		},
		{
			label: 'd',
			index: 3
		},
		{
			label: 'e',
			index: 4
		},
		{
			label: 'f',
			index: 5
		},
		{
			label: 'g',
			index: 6
		},
		{
			label: 'h',
			index: 7
		}
	];

	if (board.playerColor === Color.White) {
		rows = rows.reverse();
	} else {
		columns = columns.reverse();
	}

	let from: string;
	let to: string;

	let fromClick: string;
	let toClick: string;

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

	const onClick = (event: MouseEvent) => {
		const square = event.currentTarget as HTMLDivElement;
		if (!fromClick && square.role === 'button') {
			fromClick = square.id;
		} else if (fromClick) {
			toClick = square.id;
			if (fromClick !== toClick) {
				move(fromClick, toClick);
			}
			fromClick = '';
			toClick = '';
		}
	};

	afterUpdate(() => {
		const lastMove = board?.lastMove;
		if (board && lastMove) {
			if ((lastMove.movement as MoveCapture).capture) {
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
					{#if board.pieces[row - 1][column.index]}
						<Square
							{x}
							{y}
							{row}
							column={column.label}
							{onDragStart}
							{onDragDrop}
							{onClick}
							role="button"><Piece piece={board.pieces[row - 1][column.index]} /></Square
						>
					{:else}
						<Square {x} {y} {row} column={column.label} {onDragDrop} {onClick} role="none" />
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
