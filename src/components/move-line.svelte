<script lang="ts">
	import type { Move } from '$lib/types/move';
	import ImagePiece from './image-piece.svelte';

	export let move: Move;
</script>

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
