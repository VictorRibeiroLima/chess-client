<script lang="ts">
	export let i: number;
	export let j: number;
	let color: string;

	if ((i + j) % 2) {
		color = '#ac7d58';
	} else {
		color = '#eed4ac';
	}
</script>

<div
	style="
    position: absolute;
    top: {i * 100}px;
    left: {j * 100}px;
    width: 100px;
    height: 100px;
    background-color: {color};
    z-index: 9;
    "
	draggable="false"
>
	<slot />
</div>
