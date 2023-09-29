<script lang="ts">
	import type { Board } from '$lib/types/board';
	import type { Move } from '$lib/types/move';
	import ImagePiece from './image-piece.svelte';

	export let board: Board;
	let reversedMoves: Move[] = [];

	$: {
		reversedMoves = board.moves.slice().reverse();
	}
</script>

<div class="history">
	{#each reversedMoves as move}
		<div class="line">
			<div>
				<ImagePiece piece={move.piece} />
			</div>
			<div class="desc">
				{#if move.type === 'movement'}
					<p>{move.from} -> {move.to}</p>
				{:else if move.type === 'promotion'}
					<p>-></p>
					<div style="width: 40%;">
						<ImagePiece piece={move.promotion} />
					</div>
					<p>| {move.on}</p>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	.line {
		display: flex;
		flex-direction: row;
	}
	.history {
		margin-left: 10px;
		width: 155px;
		height: 800px;
		display: flex;
		flex-direction: column;
		overflow: auto;
		background-color: rgba(238, 212, 172, 0.75);
	}

	.desc {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: sienna;
		font-size: large;
	}
</style>
