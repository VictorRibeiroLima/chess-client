<script lang="ts">
	import type { MoveHistory } from '$lib/types/move';
	import ImagePiece from './image-piece.svelte';

	export let move: MoveHistory;

	//TODO: fix movement
</script>

<div class="line">
	<div>
		<ImagePiece piece={move.piece} />
	</div>
	<div class="desc">
		{#if move.movement}
			<p>{move.movement} -> {move.movement}</p>
		{:else if move.promotion}
			<p>-></p>
			<div style="width: 40%;">
				<ImagePiece piece={move.promotion.to} />
			</div>
			<p>| {move.promotion.on}</p>
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
