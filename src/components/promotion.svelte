<script lang="ts">
	import { promote } from '$lib/connection/client';
	import type { Color } from '$lib/enums/color';
	import { PieceType } from '$lib/enums/piece-type';
	import type { Piece as PieceStruct } from '$lib/types/piece';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import Piece from './piece.svelte';
	import Square from './square.svelte';

	export let color: Color;

	const modalStore = getModalStore();

	const column = 'a';

	const onClick = (event: DragEvent) => {
		const currentTarget = event.currentTarget as HTMLDivElement;
		const id = currentTarget.id;
		const index = id.charAt(1);
		const piece = pieces[index];
		promote(piece);
		modalStore.close();
	};

	const role = 'button';

	let pieces: PieceStruct[] = [
		{
			color,
			type: PieceType.Queen
		},
		{
			color,
			type: PieceType.Knight
		}
	];
</script>

<div class="promotion">
	{#each pieces as piece, y}
		<Square {y} {column} {role} {onClick} x={0} row={y}>
			<Piece {piece} />
		</Square>
	{/each}
</div>

<style>
	.promotion {
		position: relative;
		width: 200px;
		height: 200px;
		z-index: 10;
	}
</style>
