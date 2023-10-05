<script lang="ts">
	import type { Move, MoveCapture, MoveHistory, MoveValid, Promotion } from '$lib/types/move';
	import type { Piece } from '$lib/types/piece';
	import ImagePiece from './image-piece.svelte';

	export let move: MoveHistory;
	let piece: Piece;
	let from: string;
	let to: string;
	let movement: Move;
	let promotion: Promotion;

	$: {
		piece = move.piece;

		promotion = move.promotion;

		movement = move.movement;

		if (movement) {
			const type = Object.keys(movement)[0];
			const moveT = movement[type];

			if (type === 'castling') {
				const kingMove: [string, string] = move[0];

				from = kingMove[0];
				to = kingMove[1];
			} else {
				from = moveT[0];
				to = moveT[1];
			}
		}
	}

	//TODO: fix movement
</script>

<div class="line">
	<div>
		<ImagePiece {piece} />
	</div>
	<div class="desc">
		{#if movement}
			<p>{from} -> {to}</p>
		{:else if promotion}
			<p>-></p>
			<div style="width: 40%;">
				<ImagePiece piece={promotion.to} />
			</div>
			<p>| {promotion.on}</p>
		{/if}
	</div>
</div>

<style>
	.line {
		display: flex;
		flex-direction: row;
	}
	.desc {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: sienna;
		font-size: large;
	}
</style>
