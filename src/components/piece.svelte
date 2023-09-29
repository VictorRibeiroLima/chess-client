<script lang="ts">
	import type { Piece as PieceType } from '../lib/types/piece';
	import ImagePiece from './image-piece.svelte';
	export let piece: PieceType;
</script>

{#if piece}
	<div class="piece">
		<ImagePiece {piece} />
	</div>
{/if}

<style>
	.piece {
		width: 100px;
		height: 100px;
		z-index: 1;
	}
</style>
