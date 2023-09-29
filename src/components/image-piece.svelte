<script context="module">
	import { images } from '$lib/assets/images';
</script>

<script lang="ts">
	import type { Piece } from '$lib/types/piece';
	export let piece: Piece;
</script>

<img
	class="piece-image"
	src={images[piece.color + piece.type]}
	alt={`this is a ${piece.color} ${piece.type}`}
/>

<style>
	.piece-image {
		width: 100%;
		height: 100%;
		z-index: -9;
	}
</style>
