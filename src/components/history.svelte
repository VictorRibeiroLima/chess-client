<script lang="ts">
	import MoveLine from './move-line.svelte';
	import type { Board } from '$lib/types/board';
	import type { MoveHistory } from '$lib/types/move';

	export let board: Board;
	let reversedMoves: MoveHistory[] = [];

	$: {
		reversedMoves = board.moves.slice().reverse();
		console.log(reversedMoves);
	}
</script>

<div class="history">
	{#each reversedMoves as move, i}
		{#if move.turnNumber !== reversedMoves[i - 1]?.turnNumber}
			<div class="desc">
				<p>Turn {move.turnNumber}</p>
			</div>
		{/if}

		<MoveLine {move} />
	{/each}
</div>

<style>
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
		border-top: 2px solid black;
		display: flex;
		flex-direction: row;
		align-items: center;
		color: sienna;
		font-size: large;
	}
</style>
