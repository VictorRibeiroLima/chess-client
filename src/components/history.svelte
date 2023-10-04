<script lang="ts">
	import MoveLine from './move-line.svelte';
	import type { Board } from '$lib/types/board';
	import type { Move } from '$lib/types/move';

	export let board: Board;
	let reversedMoves: Move[] = [];

	$: {
		reversedMoves = board.moves.slice().reverse();
	}
</script>

<div class="history">
	{#each reversedMoves as move, index}
		{#if reversedMoves.length % 2 !== 0}
			{#if index === 0}
				<div class="box">
					<div class="line">
						<div class="desc">
							<p>Turn {move.turn + 1}</p>
						</div>
					</div>
					<MoveLine {move} />
				</div>
			{:else if index % 2 !== 0}
				<div class="box">
					<div class="line">
						<div class="desc">
							<p>Turn {move.turn + 1}</p>
						</div>
					</div>
					<MoveLine {move} />
					<MoveLine move={reversedMoves[index + 1]} />
				</div>
			{/if}
		{:else if index % 2 === 0}
			<div class="box">
				<div class="line">
					<div class="desc">
						<p>Turn {move.turn + 1}</p>
					</div>
				</div>
				<MoveLine {move} />
				<MoveLine move={reversedMoves[index + 1]} />
			</div>
		{/if}
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

	.box {
		border-bottom: 2px solid black;
	}
</style>
